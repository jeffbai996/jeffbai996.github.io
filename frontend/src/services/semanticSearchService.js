/**
 * Semantic Search Service
 *
 * Uses Gemini's embedding API to enable semantic similarity matching
 * for chatbot queries. This allows users to ask questions in any phrasing
 * and still get accurate matches.
 *
 * Features:
 * - Vector embeddings for knowledge base entries
 * - Cosine similarity matching
 * - Caching for performance
 * - Fallback to keyword matching
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

class SemanticSearchService {
  constructor() {
    this.initialized = false;
    this.embeddingModel = null;
    this.knowledgeEmbeddings = new Map(); // Cache for knowledge base embeddings
    this.queryCache = new Map(); // Cache for recent query embeddings
    this.maxCacheSize = 100;

    this.initialize();
  }

  async initialize() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_api_key_here') {
      console.warn('Semantic Search: API key not configured');
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      this.embeddingModel = genAI.getGenerativeModel({
        model: 'text-embedding-004'
      });
      this.initialized = true;
      console.log('Semantic Search Service initialized');
    } catch (error) {
      console.error('Failed to initialize semantic search:', error);
    }
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  cosineSimilarity(vecA, vecB) {
    if (!vecA || !vecB || vecA.length !== vecB.length) return 0;

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    const denominator = Math.sqrt(normA) * Math.sqrt(normB);
    return denominator === 0 ? 0 : dotProduct / denominator;
  }

  /**
   * Get embedding for a text string
   */
  async getEmbedding(text) {
    if (!this.initialized || !this.embeddingModel) {
      return null;
    }

    // Check cache first
    const cacheKey = text.toLowerCase().trim();
    if (this.queryCache.has(cacheKey)) {
      return this.queryCache.get(cacheKey);
    }

    try {
      const result = await this.embeddingModel.embedContent(text);
      const embedding = result.embedding.values;

      // Cache the result
      if (this.queryCache.size >= this.maxCacheSize) {
        // Remove oldest entry
        const firstKey = this.queryCache.keys().next().value;
        this.queryCache.delete(firstKey);
      }
      this.queryCache.set(cacheKey, embedding);

      return embedding;
    } catch (error) {
      console.error('Error getting embedding:', error);
      return null;
    }
  }

  /**
   * Pre-compute embeddings for knowledge base entries
   */
  async indexKnowledgeBase(knowledgeEntries) {
    if (!this.initialized) {
      console.warn('Cannot index: Semantic search not initialized');
      return;
    }

    console.log(`Indexing ${knowledgeEntries.length} knowledge entries...`);

    for (const entry of knowledgeEntries) {
      // Create a searchable text from keywords and key response phrases
      const searchableText = [
        ...(entry.keywords || []),
        entry.title || '',
        entry.summary || ''
      ].join(' ').toLowerCase();

      if (searchableText.trim() && !this.knowledgeEmbeddings.has(entry.id)) {
        try {
          const embedding = await this.getEmbedding(searchableText);
          if (embedding) {
            this.knowledgeEmbeddings.set(entry.id, {
              embedding,
              entry
            });
          }
        } catch (error) {
          console.warn(`Failed to embed entry ${entry.id}:`, error);
        }
      }
    }

    console.log(`Indexed ${this.knowledgeEmbeddings.size} entries`);
  }

  /**
   * Search knowledge base using semantic similarity
   * @param {string} query - User's query
   * @param {object[]} knowledgeBase - Array of knowledge entries
   * @param {number} threshold - Minimum similarity score (0-1)
   * @param {number} topK - Number of results to return
   */
  async semanticSearch(query, knowledgeBase, threshold = 0.5, topK = 3) {
    if (!this.initialized) {
      return { results: [], method: 'fallback' };
    }

    try {
      const queryEmbedding = await this.getEmbedding(query);
      if (!queryEmbedding) {
        return { results: [], method: 'fallback' };
      }

      const results = [];

      // Compare with pre-indexed entries if available
      if (this.knowledgeEmbeddings.size > 0) {
        for (const [id, data] of this.knowledgeEmbeddings) {
          const similarity = this.cosineSimilarity(queryEmbedding, data.embedding);
          if (similarity >= threshold) {
            results.push({
              ...data.entry,
              similarity,
              matchType: 'semantic'
            });
          }
        }
      } else {
        // Fallback: embed on-the-fly (slower but works without pre-indexing)
        for (const entry of knowledgeBase) {
          const searchableText = [
            ...(entry.keywords || []),
            entry.title || '',
            entry.summary || ''
          ].join(' ');

          const entryEmbedding = await this.getEmbedding(searchableText);
          if (entryEmbedding) {
            const similarity = this.cosineSimilarity(queryEmbedding, entryEmbedding);
            if (similarity >= threshold) {
              results.push({
                ...entry,
                similarity,
                matchType: 'semantic'
              });
            }
          }
        }
      }

      // Sort by similarity and return top K
      results.sort((a, b) => b.similarity - a.similarity);
      return {
        results: results.slice(0, topK),
        method: 'semantic'
      };
    } catch (error) {
      console.error('Semantic search error:', error);
      return { results: [], method: 'error' };
    }
  }

  /**
   * Hybrid search: combines semantic and keyword matching
   * @param {string} query - User's query
   * @param {object[]} knowledgeBase - Array of knowledge entries
   */
  async hybridSearch(query, knowledgeBase, options = {}) {
    const {
      semanticWeight = 0.6,
      keywordWeight = 0.4,
      threshold = 0.4,
      topK = 5
    } = options;

    const results = new Map();

    // 1. Semantic search
    const semanticResults = await this.semanticSearch(query, knowledgeBase, threshold, topK * 2);
    for (const result of semanticResults.results) {
      const id = result.id || result.keywords?.join('-');
      results.set(id, {
        ...result,
        score: result.similarity * semanticWeight,
        matchTypes: ['semantic']
      });
    }

    // 2. Keyword matching
    const queryWords = query.toLowerCase().split(/\s+/);
    for (const entry of knowledgeBase) {
      const id = entry.id || entry.keywords?.join('-');
      const keywords = entry.keywords || [];

      let keywordScore = 0;
      let matchedKeywords = [];

      for (const keyword of keywords) {
        const kwLower = keyword.toLowerCase();
        for (const qWord of queryWords) {
          if (kwLower.includes(qWord) || qWord.includes(kwLower)) {
            keywordScore += 1;
            matchedKeywords.push(keyword);
          }
        }
      }

      // Normalize keyword score
      if (keywordScore > 0) {
        const normalizedScore = Math.min(keywordScore / Math.max(queryWords.length, 3), 1);

        if (results.has(id)) {
          const existing = results.get(id);
          existing.score += normalizedScore * keywordWeight;
          existing.matchTypes.push('keyword');
          existing.matchedKeywords = matchedKeywords;
        } else {
          results.set(id, {
            ...entry,
            score: normalizedScore * keywordWeight,
            matchTypes: ['keyword'],
            matchedKeywords
          });
        }
      }
    }

    // Sort by combined score and return top K
    const sortedResults = Array.from(results.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, topK);

    return {
      results: sortedResults,
      method: this.initialized ? 'hybrid' : 'keyword-only'
    };
  }

  /**
   * Find the most semantically similar intent
   */
  async findSimilarIntent(query, intents) {
    if (!this.initialized) {
      return null;
    }

    try {
      const queryEmbedding = await this.getEmbedding(query);
      if (!queryEmbedding) return null;

      let bestMatch = null;
      let bestScore = 0;

      for (const [intentName, intent] of Object.entries(intents)) {
        // Create a representative text for the intent
        const intentText = [
          intentName.replace(/([A-Z])/g, ' $1').toLowerCase(),
          intent.response || '',
          ...(intent.patterns?.map(p => p.source?.replace(/[^a-zA-Z\s]/g, ' ')) || [])
        ].join(' ').substring(0, 500);

        const intentEmbedding = await this.getEmbedding(intentText);
        if (intentEmbedding) {
          const similarity = this.cosineSimilarity(queryEmbedding, intentEmbedding);
          if (similarity > bestScore && similarity > 0.5) {
            bestScore = similarity;
            bestMatch = {
              intent: intentName,
              ...intent,
              similarity,
              matchType: 'semantic'
            };
          }
        }
      }

      return bestMatch;
    } catch (error) {
      console.error('Error finding similar intent:', error);
      return null;
    }
  }

  /**
   * Get semantic similarity between two texts
   */
  async getSimilarity(text1, text2) {
    if (!this.initialized) return 0;

    try {
      const [embedding1, embedding2] = await Promise.all([
        this.getEmbedding(text1),
        this.getEmbedding(text2)
      ]);

      if (!embedding1 || !embedding2) return 0;
      return this.cosineSimilarity(embedding1, embedding2);
    } catch (error) {
      console.error('Error calculating similarity:', error);
      return 0;
    }
  }

  /**
   * Check if service is available
   */
  isAvailable() {
    return this.initialized;
  }

  /**
   * Get service status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      indexedEntries: this.knowledgeEmbeddings.size,
      cachedQueries: this.queryCache.size
    };
  }

  /**
   * Clear caches
   */
  clearCache() {
    this.queryCache.clear();
  }
}

// Create singleton instance
const semanticSearchService = new SemanticSearchService();

export default semanticSearchService;
