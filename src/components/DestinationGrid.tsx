import React from 'react';

interface DestinationGridProps {
  onSelectDestination: (destination: string) => void;
}

export const DestinationGrid: React.FC<DestinationGridProps> = ({ onSelectDestination }) => {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-neutral-200/80">
      {/* Expansive width container matching the full browser viewport with tight, balanced side padding */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-14">
        
        {/* Header: "Choose your space" */}
        <div className="text-center mb-7 sm:mb-9">
          <h2 className="text-3xl sm:text-4xl text-neutral-900 font-sans tracking-wide">
            Choose <span className="font-bold">your space</span>
          </h2>
        </div>

        {/* 3-Column Mosaic Grid spanning the full width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          
          {/* ========================================================
              COLUMN 1: Bathroom (Tall) + Commercial (Square)
             ======================================================== */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {/* Card 1: Bathroom (Tall) */}
            <div
              onClick={() => onSelectDestination('Bathroom')}
              className="relative h-[380px] sm:h-[440px] md:h-[480px] lg:h-[520px] rounded-xs overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition-shadow"
            >
              <img
                src="/products/bathtub-black.jpg"
                alt="Bathroom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-6 text-white text-lg sm:text-xl font-medium font-sans tracking-wide drop-shadow-md">
                Bathroom
              </span>
            </div>

            {/* Card 2: Sintered Stones (Square/Landscape) */}
            <div
              onClick={() => onSelectDestination('Commercial')}
              className="relative h-[220px] sm:h-[260px] md:h-[280px] lg:h-[300px] rounded-xs overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition-shadow"
            >
              <img
                src="/products/tile-nero-marquina.jpg"
                alt="Sintered Stones"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-6 text-white text-lg sm:text-xl font-medium font-sans tracking-wide drop-shadow-md">
                Sintered Stones
              </span>
            </div>
          </div>

          {/* ========================================================
              COLUMN 2: Livingroom (Tall) + Outdoor (Square)
             ======================================================== */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {/* Card 3: Livingroom (Tall) */}
            <div
              onClick={() => onSelectDestination('Living')}
              className="relative h-[380px] sm:h-[440px] md:h-[480px] lg:h-[520px] rounded-xs overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition-shadow"
            >
              <img
                src="/products/tile-statuario.jpg"
                alt="Livingroom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-6 text-white text-lg sm:text-xl font-medium font-sans tracking-wide drop-shadow-md">
                Livingroom
              </span>
            </div>

            {/* Card 4: Outdoor (Square/Landscape) */}
            <div
              onClick={() => onSelectDestination('Outdoor')}
              className="relative h-[220px] sm:h-[260px] md:h-[280px] lg:h-[300px] rounded-xs overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition-shadow"
            >
              <img
                src="/products/tile-paver-grigio.jpg"
                alt="Outdoor"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-6 text-white text-lg sm:text-xl font-medium font-sans tracking-wide drop-shadow-md">
                Outdoor
              </span>
            </div>
          </div>

          {/* ========================================================
              COLUMN 3: Kitchen + Bedroom + Swimming Pool (Horizontal 3-stack)
             ======================================================== */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            {/* Card 5: Kitchen */}
            <div
              onClick={() => onSelectDestination('Kitchen')}
              className="relative h-[186px] sm:h-[220px] md:h-[240px] lg:h-[260px] rounded-xs overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition-shadow"
            >
              <img
                src="/products/tile-terrazzo.jpg"
                alt="Kitchen"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-6 text-white text-lg sm:text-xl font-medium font-sans tracking-wide drop-shadow-md">
                Kitchen
              </span>
            </div>

            {/* Card 6: Bedroom */}
            <div
              onClick={() => onSelectDestination('Bedroom')}
              className="relative h-[186px] sm:h-[220px] md:h-[240px] lg:h-[260px] rounded-xs overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition-shadow"
            >
              <img
                src="/products/tile-wood-rover.jpg"
                alt="Bedroom"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-6 text-white text-lg sm:text-xl font-medium font-sans tracking-wide drop-shadow-md">
                Bedroom
              </span>
            </div>

            {/* Card 7: Swimming Pool */}
            <div
              onClick={() => onSelectDestination('Outdoor')}
              className="relative h-[186px] sm:h-[220px] md:h-[240px] lg:h-[260px] rounded-xs overflow-hidden group cursor-pointer shadow-xs hover:shadow-md transition-shadow"
            >
              <img
                src="/products/pool-tiles-luxury.jpg"
                alt="Swimming Pool Tiles"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-6 text-white text-lg sm:text-xl font-medium font-sans tracking-wide drop-shadow-md">
                Swimming Pool
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
