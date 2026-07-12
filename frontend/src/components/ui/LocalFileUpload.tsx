import React, { useRef, useState } from 'react';
import type { LocalFileMetadata } from '../../types';

interface Props { label: string; accept: string; allowedTypes: string[]; maxSizeMb?: number; imagePreview?: boolean; value?: LocalFileMetadata; onChange: (metadata: LocalFileMetadata, file: File | null) => void; }

export const LocalFileUpload: React.FC<Props> = ({ label, accept, allowedTypes, maxSizeMb = 5, imagePreview = false, value, onChange }) => {
  const ref = useRef<HTMLInputElement>(null); const [error, setError] = useState('');
  const metadata = value || { fileName: null, fileType: null, fileSize: null, previewUrl: null, storageUrl: null };
  const select = (event: React.ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; event.target.value = ''; if (!file) return; if (!allowedTypes.includes(file.type)) { setError('Unsupported file type.'); return; } if (file.size > maxSizeMb * 1024 * 1024) { setError(`File must be ${maxSizeMb} MB or smaller.`); return; } const previewUrl = URL.createObjectURL(file); setError(''); onChange({ fileName: file.name, fileType: file.type, fileSize: file.size, previewUrl, storageUrl: null }, file); };
  const remove = () => { setError(''); onChange({ fileName: null, fileType: null, fileSize: null, previewUrl: null, storageUrl: null }, null); };
  return <div className="rounded-xl border border-slate-200 bg-slate-50 p-4"><input ref={ref} type="file" accept={accept} onChange={select} className="hidden"/><p className="text-sm font-semibold text-gray-700">{label}</p>{metadata.fileName ? <div className="mt-3 flex items-center gap-4">{imagePreview && metadata.previewUrl ? <img src={metadata.previewUrl} alt={`${label} preview`} className="h-16 w-16 rounded-xl object-cover"/> : <span className="text-3xl">📄</span>}<div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{metadata.fileName}</p><div className="mt-2 flex gap-2"><button type="button" onClick={() => ref.current?.click()} className="text-sm font-semibold text-blue-700">Replace</button><button type="button" onClick={remove} className="text-sm font-semibold text-red-600">Remove</button></div></div></div> : <button type="button" onClick={() => ref.current?.click()} className="mt-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white">Choose File</button>}{error && <p className="mt-2 text-sm text-red-600">{error}</p>}</div>;
};

