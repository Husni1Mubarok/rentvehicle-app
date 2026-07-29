import React, { useState } from 'react';
import Image from 'next/image';
import { VehicleImage } from '@/lib/types';

export default function VehicleGallery({ images }: { images: VehicleImage[] }) {
  const [selected, setSelected] = useState<VehicleImage>(images[0]);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="space-y-4">
      <div className="relative h-96 w-full cursor-pointer" onClick={openModal}>
        <Image src={selected.image_url} alt="Vehicle image" layout="fill" objectFit="cover" className="rounded-lg" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((img) => (
          <button key={img.id} onClick={() => setSelected(img)} className={`relative h-24 w-full rounded ${img.id === selected.id ? 'ring-2 ring-blue-600' : ''}`}>
            <Image src={img.image_url} alt="thumb" layout="fill" objectFit="cover" className="rounded" />
          </button>
        ))}
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="relative w-11/12 max-w-3xl h-3/4" onClick={(e) => e.stopPropagation()}>
            <Image src={selected.image_url} alt="Vehicle large" layout="fill" objectFit="contain" className="rounded" />
            <button onClick={closeModal} className="absolute top-2 right-2 text-white text-2xl">&times;</button>
          </div>
        </div>
      )}
    </div>
  );
}
