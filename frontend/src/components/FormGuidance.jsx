import React, { useState } from 'react'
import {
  getFormById,
  getFormsByDepartment,
  getDocumentChecklist,
  getCommonMistakes,
  getStepByStepGuide
} from '../utils/formKnowledge'

/**
 * FormGuidance Component
 *
 * Displays detailed form guidance including:
 * - Required documents checklist
 * - Step-by-step process
 * - Common mistakes to avoid
 * - Pro tips
 *
 * Can be used on any department page to help users fill out forms correctly.
 */
export function FormGuidance({ formId }) {
  const [activeTab, setActiveTab] = useState('overview')
  const form = getFormById(formId)

  if (!form) return null

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'documents', label: 'Documents' },
    { id: 'steps', label: 'Steps' },
    { id: 'mistakes', label: 'Avoid Mistakes' },
    { id: 'tips', label: 'Tips' }
  ]

  return (
    <div className="form-guidance">
      <div className="form-guidance-header">
        <h4>{form.name}</h4>
        <div className="form-guidance-meta">
          {form.fee && (
            <span className="form-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              {typeof form.fee === 'string' ? form.fee : Object.values(form.fee)[0]}
            </span>
          )}
          {form.processingTime && (
            <span className="form-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {typeof form.processingTime === 'string' ? form.processingTime : Object.values(form.processingTime)[0]}
            </span>
          )}
        </div>
      </div>

      <div className="form-guidance-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`form-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="form-guidance-content">
        {activeTab === 'overview' && (
          <div className="form-overview">
            <p>{form.description}</p>

            {form.eligibility && form.eligibility.length > 0 && (
              <div className="form-section">
                <h5>Eligibility</h5>
                <ul>
                  {form.eligibility.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {form.url && (
              <a href={form.url} className="form-apply-btn">
                Apply Online
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="form-documents">
            <h5>Required Documents</h5>
            <div className="document-checklist">
              {form.requiredDocuments?.map((doc, i) => (
                <div key={i} className={`document-item ${doc.required ? 'required' : 'optional'}`}>
                  <div className="document-check">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                    </svg>
                  </div>
                  <div className="document-info">
                    <span className="document-name">
                      {doc.name}
                      {!doc.required && <span className="optional-tag">Optional</span>}
                    </span>
                    {doc.note && <span className="document-note">{doc.note}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'steps' && (
          <div className="form-steps">
            <h5>Step-by-Step Process</h5>
            <div className="step-list">
              {form.stepByStep?.map((step, i) => (
                <div key={i} className="step-item">
                  <div className="step-number">{i + 1}</div>
                  <div className="step-content">{step}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'mistakes' && (
          <div className="form-mistakes">
            <h5>Common Mistakes to Avoid</h5>
            <div className="mistakes-list">
              {form.commonMistakes?.map((item, i) => (
                <div key={i} className="mistake-item">
                  <div className="mistake-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>
                  <div className="mistake-content">
                    <span className="mistake-text">{item.mistake}</span>
                    <span className="mistake-fix">
                      <strong>Fix:</strong> {item.fix}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="form-tips">
            <h5>Pro Tips</h5>
            <div className="tips-list">
              {form.tips?.map((tip, i) => (
                <div key={i} className="tip-item">
                  <div className="tip-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </div>
                  <div className="tip-content">{tip}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .form-guidance {
          background: var(--bg-card, #1a1f2e);
          border: 1px solid var(--border-subtle, rgba(255,255,255,0.1));
          border-radius: 12px;
          overflow: hidden;
          margin: 24px 0;
        }

        .form-guidance-header {
          padding: 20px;
          border-bottom: 1px solid var(--border-subtle, rgba(255,255,255,0.1));
        }

        .form-guidance-header h4 {
          margin: 0 0 12px 0;
          font-size: 18px;
          font-weight: 600;
          color: var(--text-primary, #fff);
        }

        .form-guidance-meta {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .form-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-muted, #9ca3af);
        }

        .form-meta-item svg {
          opacity: 0.7;
        }

        .form-guidance-tabs {
          display: flex;
          gap: 4px;
          padding: 12px 16px;
          border-bottom: 1px solid var(--border-subtle, rgba(255,255,255,0.1));
          background: var(--bg-elevated, rgba(0,0,0,0.2));
          overflow-x: auto;
        }

        .form-tab {
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-muted, #9ca3af);
          background: transparent;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .form-tab:hover {
          color: var(--text-primary, #fff);
          background: var(--bg-hover, rgba(255,255,255,0.05));
        }

        .form-tab.active {
          color: var(--primary, #3b82f6);
          background: var(--primary-subtle, rgba(59,130,246,0.1));
        }

        .form-guidance-content {
          padding: 20px;
        }

        .form-section {
          margin-top: 20px;
        }

        .form-section h5,
        .form-documents h5,
        .form-steps h5,
        .form-mistakes h5,
        .form-tips h5 {
          margin: 0 0 16px 0;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary, #fff);
        }

        .form-overview p {
          margin: 0;
          color: var(--text-secondary, #d1d5db);
          line-height: 1.6;
        }

        .form-overview ul {
          margin: 0;
          padding-left: 20px;
          color: var(--text-secondary, #d1d5db);
        }

        .form-overview li {
          margin: 8px 0;
        }

        .form-apply-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          padding: 10px 20px;
          background: var(--primary, #3b82f6);
          color: white;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .form-apply-btn:hover {
          background: var(--primary-hover, #2563eb);
        }

        .document-checklist {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .document-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          background: var(--bg-elevated, rgba(0,0,0,0.2));
          border-radius: 8px;
        }

        .document-item.required {
          border-left: 3px solid var(--warning, #f59e0b);
        }

        .document-item.optional {
          border-left: 3px solid var(--text-muted, #6b7280);
        }

        .document-check {
          color: var(--text-muted, #6b7280);
          flex-shrink: 0;
        }

        .document-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .document-name {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary, #fff);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .optional-tag {
          font-size: 11px;
          font-weight: 400;
          color: var(--text-muted, #6b7280);
          background: var(--bg-card, rgba(0,0,0,0.3));
          padding: 2px 6px;
          border-radius: 4px;
        }

        .document-note {
          font-size: 13px;
          color: var(--text-muted, #9ca3af);
        }

        .step-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .step-item {
          display: flex;
          gap: 16px;
        }

        .step-number {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--primary, #3b82f6);
          color: white;
          font-size: 13px;
          font-weight: 600;
          border-radius: 50%;
        }

        .step-content {
          padding-top: 4px;
          font-size: 14px;
          color: var(--text-secondary, #d1d5db);
          line-height: 1.5;
        }

        .mistakes-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mistake-item {
          display: flex;
          gap: 12px;
          padding: 14px;
          background: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.15);
          border-radius: 8px;
        }

        .mistake-icon {
          flex-shrink: 0;
          color: #ef4444;
        }

        .mistake-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mistake-text {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-primary, #fff);
        }

        .mistake-fix {
          font-size: 13px;
          color: var(--text-muted, #9ca3af);
        }

        .mistake-fix strong {
          color: #10b981;
        }

        .tips-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .tip-item {
          display: flex;
          gap: 12px;
          padding: 12px;
          background: rgba(59, 130, 246, 0.05);
          border: 1px solid rgba(59, 130, 246, 0.15);
          border-radius: 8px;
        }

        .tip-icon {
          flex-shrink: 0;
          color: #3b82f6;
        }

        .tip-content {
          font-size: 14px;
          color: var(--text-secondary, #d1d5db);
          line-height: 1.5;
        }
      `}</style>
    </div>
  )
}

/**
 * DepartmentForms Component
 *
 * Shows all forms available for a specific department
 */
export function DepartmentForms({ departmentId }) {
  const forms = getFormsByDepartment(departmentId)

  if (!forms || forms.length === 0) return null

  return (
    <div className="department-forms">
      <h3>Application Forms & Guides</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
        Select a form below to view step-by-step guidance, required documents, and tips.
      </p>
      {forms.map(form => (
        <FormGuidance key={form.id} formId={form.id} />
      ))}
    </div>
  )
}

/**
 * QuickDocumentChecklist Component
 *
 * Shows a simple document checklist for a specific form
 */
export function QuickDocumentChecklist({ formId }) {
  const documents = getDocumentChecklist(formId)
  const form = getFormById(formId)

  if (!documents || documents.length === 0) return null

  return (
    <div className="quick-checklist">
      <h4>Documents Needed for {form?.name || 'Application'}</h4>
      <ul>
        {documents.filter(d => d.required).map((doc, i) => (
          <li key={i}>
            <strong>{doc.name}</strong>
            {doc.note && <span> - {doc.note}</span>}
          </li>
        ))}
      </ul>
      <style>{`
        .quick-checklist {
          background: var(--bg-card, #1a1f2e);
          border: 1px solid var(--border-subtle, rgba(255,255,255,0.1));
          border-radius: 10px;
          padding: 16px;
          margin: 16px 0;
        }
        .quick-checklist h4 {
          margin: 0 0 12px 0;
          font-size: 15px;
          color: var(--text-primary, #fff);
        }
        .quick-checklist ul {
          margin: 0;
          padding-left: 20px;
          font-size: 14px;
          color: var(--text-secondary, #d1d5db);
        }
        .quick-checklist li {
          margin: 8px 0;
        }
      `}</style>
    </div>
  )
}

export default FormGuidance
