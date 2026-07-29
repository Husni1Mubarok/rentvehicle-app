import React from 'react';

export default function EmptyState({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6h6v6m-3-9a9 9 0 100-18 9 9 0 000 18z" />
      </svg>
      <p className="text-lg text-gray-600">
        {message ?? 'Kendaraan tidak tersedia'}
      </p>
    </div>
  );
}
