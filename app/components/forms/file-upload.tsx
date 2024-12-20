'use client';

import { useRef, useState } from 'react';
import { CloudArrowUpIcon, DocumentIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface FileUploadProps {
  id: string;
  accept?: string;
  label: string;
  error?: string;
  value?: File;
  onChange: (file: File | undefined) => void;
  disabled?: boolean;
}

export function FileUpload({
  id,
  accept,
  label,
  error,
  value,
  onChange,
  disabled,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onChange(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange(e.target.files[0]);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleRemove = () => {
    onChange(undefined);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="mt-1">
        <input
          ref={inputRef}
          id={id}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="sr-only"
          disabled={disabled}
        />
        <div
          onClick={handleClick}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative cursor-pointer rounded-lg border-2 border-dashed p-4 transition-colors ${
            dragActive
              ? 'border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-500/10'
              : 'border-light-border dark:border-dark-border hover:border-primary-500 dark:hover:border-primary-400'
          }`}
        >
          {value ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DocumentIcon className="h-5 w-5 text-light-text/60 dark:text-dark-text/60" />
                <span className="text-sm">{value.name}</span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="rounded-full p-1 hover:bg-light-border/10 dark:hover:bg-dark-border/10"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <CloudArrowUpIcon className="mx-auto h-8 w-8 text-light-text/60 dark:text-dark-text/60" />
              <div className="mt-2">
                <span className="text-sm">
                  Drag and drop your file here, or{' '}
                  <span className="text-primary-600 dark:text-primary-400">
                    click to browse
                  </span>
                </span>
              </div>
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
