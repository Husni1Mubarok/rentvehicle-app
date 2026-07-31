import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaginationControls({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.replace(`/vehicles?${params.toString()}`);
  };

  const pages = [] as number[];
  const maxPages = Math.max(1, totalPages || 3);
  for (let i = 1; i <= maxPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 flex items-center justify-center text-sm disabled:opacity-40 shadow-sm"
      >
        ‹
      </button>
      
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => goToPage(p)}
          className={`w-9 h-9 rounded-full text-xs font-bold transition-all flex items-center justify-center ${
            p === currentPage 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
              : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600 shadow-sm'
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= maxPages}
        className="w-9 h-9 rounded-full bg-white border border-gray-200 text-gray-500 hover:bg-gray-50 flex items-center justify-center text-sm disabled:opacity-40 shadow-sm"
      >
        ›
      </button>
    </div>
  );
}
