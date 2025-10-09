'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Loader2, ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  maxSize?: number; // in MB
  accept?: Record<string, string[]>;
}

export default function ImageUploader({
  value,
  onChange,
  maxSize = 5,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
  },
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);

      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        setError(`File size must be less than ${maxSize}MB`);
        return;
      }

      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
      setUploading(true);

      try {
        // Create form data
        const formData = new FormData();
        formData.append('file', file);

        // Upload to API
        const response = await fetch('/api/v1/media/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const data = await response.json();

        if (data.success) {
          onChange(data.data.url);
          setPreview(data.data.url);
        } else {
          throw new Error(data.error || 'Upload failed');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed');
        setPreview(null);
      } finally {
        setUploading(false);
      }
    },
    [maxSize, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: 1,
    multiple: false,
  });

  const handleRemove = () => {
    setPreview(null);
    onChange('');
  };

  return (
    <div className="w-full">
      {preview ? (
        <div className="relative inline-block">
          <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden border border-gray-300">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            title="Remove image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary bg-primary/5'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center gap-3">
            {uploading ? (
              <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
            ) : (
              <ImageIcon className="w-12 h-12 text-gray-400" />
            )}

            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-700">
                {uploading
                  ? 'Uploading...'
                  : isDragActive
                  ? 'Drop the image here'
                  : 'Drag & drop an image here, or click to select'}
              </p>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF, WebP up to {maxSize}MB
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
