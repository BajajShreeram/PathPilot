import React, { useRef, useState } from 'react';

export interface ProofMetadata {
  proofFileName: string | null;
  proofFileType: string | null;
  proofFileSize: number | null;
  proofPreviewUrl: string | null;
  proofStorageUrl: string | null;
}

interface ProofUploadFieldProps {
  value: ProofMetadata;
  onChange: (metadata: ProofMetadata, selectedFile: File | null) => void;
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const ProofUploadField: React.FC<ProofUploadFieldProps> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const isImage = value.proofFileType?.startsWith('image/');
  const isPdf = value.proofFileType === 'application/pdf';

  const chooseFile = () => inputRef.current?.click();
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Unsupported file type. Choose a JPG, PNG, WebP, or PDF file.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('File is too large. The maximum proof file size is 5 MB.');
      return;
    }
    if (value.proofPreviewUrl?.startsWith('blob:')) URL.revokeObjectURL(value.proofPreviewUrl);
    const previewUrl = URL.createObjectURL(file);
    setError('');
    onChange({ proofFileName: file.name, proofFileType: file.type, proofFileSize: file.size, proofPreviewUrl: previewUrl, proofStorageUrl: null }, file);
  };
  const removeFile = () => {
    if (value.proofPreviewUrl?.startsWith('blob:')) URL.revokeObjectURL(value.proofPreviewUrl);
    setError('');
    onChange({ proofFileName: null, proofFileType: null, proofFileSize: null, proofPreviewUrl: null, proofStorageUrl: null }, null);
  };

  return <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
    <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={handleFile} className="hidden" />
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      {value.proofFileName ? <>
        {isImage && value.proofPreviewUrl ? <img src={value.proofPreviewUrl} alt="Selected proof preview" className="h-20 w-20 rounded-lg border border-gray-200 object-cover" /> : <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-gray-200 bg-white text-3xl">{isPdf ? '📄' : '📎'}</div>}
        <div className="min-w-0 flex-1"><p className="truncate font-semibold text-gray-900">{value.proofFileName}</p><p className="mt-1 text-sm text-gray-500">{value.proofFileSize ? `${(value.proofFileSize / 1024 / 1024).toFixed(2)} MB` : 'File metadata saved'}</p><div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={chooseFile} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Replace File</button><button type="button" onClick={removeFile} className="rounded-lg px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">Remove File</button></div></div>
      </> : <div className="flex w-full flex-col items-start gap-2"><button type="button" onClick={chooseFile} className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 font-semibold text-white">Upload Proof</button><p className="text-sm text-gray-500">JPG, PNG, WebP, or PDF · Maximum 5 MB</p></div>}
    </div>
    {error && <p role="alert" className="mt-3 text-sm font-medium text-red-600">{error}</p>}
  </div>;
};

