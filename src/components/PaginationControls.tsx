import React from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

export default function PaginationControls({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.replace(`/vehicles?${params.toString()}`);
  };

  const pages = [] as number[];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Prev
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => goToPage(p)}
          className={`px-3 py-1 rounded ${p === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
