import React, { useState, useRef } from 'react'
import './DocumentUpload.css'

export default function DocumentUpload({
  onUpload,
  maxSize = 10 * 1024 * 1024, // 10MB default
  acceptedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
  multiple = false,
  compact = false
}) {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [errors, setErrors] = useState([])
  const fileInputRef = useRef(null)

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const validateFile = (file) => {
    const errors = []

    // Check file size
    if (file.size > maxSize) {
      errors.push(`File size exceeds ${formatFileSize(maxSize)}`)
    }

    // Check file type
    const fileExt = '.' + file.name.split('.').pop().toLowerCase()
    if (!acceptedTypes.includes(fileExt)) {
      errors.push(`File type ${fileExt} is not supported`)
    }

    return errors
  }

  const handleFiles = (newFiles) => {
    const fileArray = Array.from(newFiles)
    const validFiles = []
    const newErrors = []

    fileArray.forEach((file) => {
      const fileErrors = validateFile(file)
      if (fileErrors.length === 0) {
        validFiles.push({
          file,
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
          progress: 0
        })
      } else {
        newErrors.push({ file: file.name, errors: fileErrors })
      }
    })

    if (multiple) {
      setFiles([...files, ...validFiles])
    } else {
      setFiles(validFiles)
    }

    setErrors(newErrors)

    // Auto upload if callback provided
    if (validFiles.length > 0 && onUpload) {
      uploadFiles(validFiles)
    }
  }

  const uploadFiles = async (filesToUpload) => {
    setUploading(true)

    for (const fileObj of filesToUpload) {
      try {
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 100))
          setFiles(prevFiles =>
            prevFiles.map(f =>
              f.id === fileObj.id ? { ...f, progress } : f
            )
          )
        }

        // Call the upload callback
        if (onUpload) {
          await onUpload(fileObj.file)
        }

        setFiles(prevFiles =>
          prevFiles.map(f =>
            f.id === fileObj.id ? { ...f, uploaded: true } : f
          )
        )
      } catch (error) {
        setFiles(prevFiles =>
          prevFiles.map(f =>
            f.id === fileObj.id ? { ...f, error: 'Upload failed' } : f
          )
        )
      }
    }

    setUploading(false)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const removeFile = (id) => {
    setFiles(files.filter(f => f.id !== id))
  }

  const clearAll = () => {
    setFiles([])
    setErrors([])
  }

  if (compact) {
    return (
      <div className="document-upload-compact">
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={acceptedTypes.join(',')}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <button
          className="upload-btn-compact"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
          <span>Attach File</span>
        </button>
        {files.length > 0 && (
          <div className="compact-file-list">
            {files.map((file) => (
              <div key={file.id} className="compact-file-item">
                <span>{file.name}</span>
                <button onClick={() => removeFile(file.id)}>×</button>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="document-upload">
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={acceptedTypes.join(',')}
        onChange={handleChange}
        style={{ display: 'none' }}
      />

      <div
        className={`upload-dropzone ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="dropzone-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
            <polyline points="17 8 12 3 7 8"/>
            <line x1="12" y1="3" x2="12" y2="15"/>
          </svg>
        </div>
        <div className="dropzone-text">
          <p className="dropzone-title">
            {dragActive ? 'Drop files here' : 'Drag & drop files here'}
          </p>
          <p className="dropzone-subtitle">or click to browse</p>
          <p className="dropzone-hint">
            Accepted: {acceptedTypes.join(', ')} • Max size: {formatFileSize(maxSize)}
          </p>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="upload-errors">
          {errors.map((error, index) => (
            <div key={index} className="error-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <div>
                <strong>{error.file}</strong>
                <ul>
                  {error.errors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="upload-files-list">
          <div className="files-list-header">
            <h4>Uploaded Files ({files.length})</h4>
            <button className="clear-all-btn" onClick={clearAll}>
              Clear All
            </button>
          </div>
          {files.map((file) => (
            <div key={file.id} className="file-item">
              <div className="file-icon">
                {file.preview ? (
                  <img src={file.preview} alt={file.name} />
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                )}
              </div>
              <div className="file-info">
                <div className="file-name">{file.name}</div>
                <div className="file-size">{formatFileSize(file.size)}</div>
                {file.progress > 0 && file.progress < 100 && (
                  <div className="file-progress">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${file.progress}%` }}
                      ></div>
                    </div>
                    <span className="progress-text">{file.progress}%</span>
                  </div>
                )}
                {file.uploaded && (
                  <div className="file-status success">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Uploaded
                  </div>
                )}
                {file.error && (
                  <div className="file-status error">{file.error}</div>
                )}
              </div>
              <button
                className="file-remove"
                onClick={() => removeFile(file.id)}
                disabled={uploading}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
