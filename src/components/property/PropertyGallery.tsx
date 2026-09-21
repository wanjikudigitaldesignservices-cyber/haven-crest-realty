import React, { useState } from 'react';
import { PropertyImage } from '../../types/database';
import { ChevronLeft, ChevronRight, X, Grid } from 'lucide-react';

interface PropertyGalleryProps {
  images?: PropertyImage[];
  title: string;
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images = [], title }) => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const fallbackImages = [
    { id: '1', property_id: '', storage_path: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80', position: 0 },
    { id: '2', property_id: '', storage_path: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80', position: 1 },
    { id: '3', property_id: '', storage_path: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80', position: 2 },
    { id: '4', property_id: '', storage_path: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80', position: 3 },
  ];

  const gallery = images.length > 0 ? images : fallbackImages;

  const handleNext = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % gallery.length);
    }
  };

  const handlePrev = () => {
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + gallery.length) % gallery.length);
    }
  };

  return (
    <div>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-2xl overflow-hidden shadow-card max-h-[520px]">
        {/* Main large image */}
        <div
          className="md:col-span-2 md:row-span-2 relative aspect-[4/3] md:aspect-auto cursor-pointer group overflow-hidden"
          onClick={() => setActiveIdx(0)}
        >
          <img
            src={gallery[0]?.storage_path}
            alt={`${title} - Primary`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        </div>

        {/* Supporting images */}
        {gallery.slice(1, 5).map((img, idx) => (
          <div
            key={img.id || idx}
            className="relative hidden md:block aspect-[4/3] cursor-pointer group overflow-hidden"
            onClick={() => setActiveIdx(idx + 1)}
          >
            <img
              src={img.storage_path}
              alt={`${title} - Preview ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {idx === 3 && gallery.length > 5 && (
              <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-xs flex items-center justify-center text-white font-semibold text-sm gap-1.5">
                <Grid className="w-4 h-4 text-brand-gold" />
                <span>+{gallery.length - 4} Photos</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Button for Mobile or Direct Fullscreen Access */}
      <div className="mt-3 flex justify-end">
        <button
          onClick={() => setActiveIdx(0)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-stone-300 text-xs font-semibold text-brand-stone-700 hover:bg-white bg-brand-stone-50 transition-colors"
        >
          <Grid className="w-3.5 h-3.5 text-brand-gold" />
          <span>View All ({gallery.length}) High-Res Photos</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      {activeIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-between p-4 md:p-8 backdrop-blur-md">
          <div className="w-full flex items-center justify-between text-white/80">
            <span className="text-sm font-medium">
              Photo {activeIdx + 1} of {gallery.length} · {title}
            </span>
            <button
              onClick={() => setActiveIdx(null)}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative max-w-5xl max-h-[80vh] flex items-center justify-center my-auto">
            <img
              src={gallery[activeIdx]?.storage_path}
              alt={title}
              className="max-h-[75vh] w-auto object-contain rounded-lg shadow-2xl"
            />

            <button
              onClick={handlePrev}
              className="absolute left-2 md:-left-12 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 md:-right-12 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto max-w-2xl py-2">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                  activeIdx === i ? 'border-brand-gold scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.storage_path} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
