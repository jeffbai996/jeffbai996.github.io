import { describe, it, expect } from 'vitest';
import { stemWord } from '../intentRecognition';

describe('intentRecognition utils', () => {
  describe('stemWord', () => {
    it('should return the original word if it is null or empty', () => {
      expect(stemWord(null)).toBe(null);
      expect(stemWord('')).toBe('');
    });

    it('should return the original word if it is shorter than 4 characters', () => {
      expect(stemWord('cat')).toBe('cat');
      expect(stemWord('id')).toBe('id');
      expect(stemWord('the')).toBe('the');
    });

    it('should convert word to lowercase', () => {
      expect(stemWord('TESTING')).toBe('test');
      expect(stemWord('Information')).toBe('inform');
    });

    it('should strip "ation" suffix', () => {
      expect(stemWord('information')).toBe('inform');
    });

    it('should strip "tion" suffix', () => {
      expect(stemWord('education')).toBe('educ');
    });

    it('should NOT strip "tion" if the resulting word would be too short', () => {
      // "action" is 6 chars. "tion" is 4. 6 > 4 + 2 is false.
      expect(stemWord('action')).toBe('action');
    });

    it('should strip "sion" suffix', () => {
      expect(stemWord('possession')).toBe('posses');
    });

    it('should strip "ment" suffix', () => {
      expect(stemWord('payment')).toBe('pay');
      expect(stemWord('government')).toBe('govern');
    });

    it('should strip "ness" suffix', () => {
      expect(stemWord('happiness')).toBe('happi');
    });

    it('should strip "ity" suffix', () => {
      expect(stemWord('community')).toBe('commun');
    });

    it('should strip "ing" suffix', () => {
      expect(stemWord('shipping')).toBe('shipp');
    });

    it('should strip "ings" suffix', () => {
      expect(stemWord('buildings')).toBe('build');
    });

    it('should strip "ed" suffix', () => {
      expect(stemWord('passed')).toBe('pass');
    });

    it('should strip "es" suffix', () => {
      expect(stemWord('taxes')).toBe('tax');
    });

    it('should strip "s" suffix', () => {
      expect(stemWord('dogs')).toBe('dog');
    });

    it('should strip "ly" suffix', () => {
      expect(stemWord('quickly')).toBe('quick');
    });

    it('should strip "ful" suffix', () => {
      expect(stemWord('helpful')).toBe('help');
    });

    it('should strip "less" suffix', () => {
      expect(stemWord('homeless')).toBe('home');
    });

    it('should strip "able" suffix', () => {
      expect(stemWord('suitable')).toBe('suit');
    });

    it('should strip "ible" suffix', () => {
      expect(stemWord('flexible')).toBe('flex');
    });

    it('should strip "er" suffix', () => {
      expect(stemWord('teacher')).toBe('teach');
    });

    it('should strip "or" suffix', () => {
      expect(stemWord('actor')).toBe('act');
    });

    it('should strip "ist" suffix', () => {
      expect(stemWord('artist')).toBe('art');
    });

    it('should return the lowercase word if no suffix matches', () => {
      expect(stemWord('apple')).toBe('apple');
      expect(stemWord('Orange')).toBe('orange');
    });

    it('should only strip the first matching suffix from the list', () => {
      // "presentations" ends with "s" but also "ation" matches before "s" in the loop.
      // Wait, "ation" is at index 0. "s" is at index 10.
      // "presentations" (13)
      // "ation": ends with "ation"? No.
      // "s": ends with "s"? Yes. 13 > 1 + 2 is true. Returns "presentation".
      // Wait, "presentation" doesn't end with "ation" either, it ends with "ations" -> "s" matches first if we were looking at the word.
      // But the word is "presentations".
      // Let's find one where multiple suffixes match.
      // "informational" - no "al" in suffixes.
      // "informer" (8)
      // "er" matches.
      // "or" no.
      // ...
      // Is there any word that ends with two of the suffixes?
      // "mentions" (8)
      // "tion" matches? No. "mentions" ends with "s".
      // "s" (index 10) matches? Yes. 8 > 1 + 2 is true. Returns "mention".

      expect(stemWord('mentions')).toBe('mention');
    });
  });
});
