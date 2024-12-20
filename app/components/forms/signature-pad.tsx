'use client';

import { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface SignaturePadProps {
  id: string;
  label: string;
  error?: string;
  value?: string;
  onChange: (signature: string) => void;
  disabled?: boolean;
}

export function SignaturePad({
  id,
  label,
  error,
  onChange,
  disabled,
}: SignaturePadProps) {
  const signaturePad = useRef<SignatureCanvas>(null);

  const handleClear = () => {
    signaturePad.current?.clear();
    onChange('');
  };

  const handleEnd = () => {
    const signature = signaturePad.current?.toDataURL();
    if (signature) {
      onChange(signature);
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="mt-1">
        <div className="rounded-lg border border-light-border dark:border-dark-border bg-white">
          <SignatureCanvas
            ref={signaturePad}
            canvasProps={{
              id,
              className: 'w-full h-40',
              style: { borderRadius: '0.5rem' },
            }}
            onEnd={handleEnd}
            backgroundColor="white"
          />
        </div>
        <div className="mt-2 flex justify-end">
          <button
            type="button"
            onClick={handleClear}
            className="btn-secondary text-sm"
            disabled={disabled}
          >
            Clear signature
          </button>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
