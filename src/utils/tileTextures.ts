import { Product } from '../types';

export interface SeamlessTileTexture {
  textureUrl: string;
  tileScale: string;
  groutColor: string;
  glossOpacity: number;
  finishLabel: string;
}

/**
 * Maps any catalog product to a genuine, seamless, flat architectural tile surface texture.
 * Ensures that catalog lifestyle photos (showing swimming pools, villas, or display stands)
 * are NEVER tiled onto the room floor.
 */
export function getSeamlessTileTexture(product?: Product | null): SeamlessTileTexture {
  if (!product) {
    return {
      textureUrl: 'https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?q=80&w=1200&auto=format&fit=crop',
      tileScale: '360px 180px',
      groutColor: 'rgba(215, 195, 160, 0.3)',
      glossOpacity: 0.32,
      finishLabel: 'Crystal Polished Calacatta Gold',
    };
  }

  const name = (product.name || '').toLowerCase();
  const look = (product.look || '').toLowerCase();
  const finish = (product.finish || '').toLowerCase();
  const ref = (product.ref || '').toLowerCase();

  // 1. Black / Obsidian Marble (Nero Marquina, Ankara Noir, etc.)
  if (
    name.includes('marquina') ||
    name.includes('noir') ||
    name.includes('black') ||
    name.includes('obsidian') ||
    ref.includes('1188')
  ) {
    return {
      textureUrl: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?q=80&w=1200&auto=format&fit=crop',
      tileScale: '380px 200px',
      groutColor: 'rgba(30, 30, 30, 0.45)',
      glossOpacity: finish.includes('satin') ? 0.16 : 0.28,
      finishLabel: 'Velvet Obsidian Black Marble',
    };
  }

  // 2. Calacatta Gold / Warm Golden Veined Marble
  if (name.includes('calacatta') || name.includes('gold')) {
    return {
      textureUrl: 'https://images.unsplash.com/photo-1599696848652-f0ff23bc911f?q=80&w=1200&auto=format&fit=crop',
      tileScale: '360px 180px',
      groutColor: 'rgba(215, 195, 160, 0.3)',
      glossOpacity: 0.32,
      finishLabel: 'Crystal Polished Calacatta Gold',
    };
  }

  // 3. Statuario / Carrara / Pure White Marble
  if (name.includes('statuario') || name.includes('carrara') || (look === 'marble' && !name.includes('grigio'))) {
    return {
      textureUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200&auto=format&fit=crop',
      tileScale: '360px 180px',
      groutColor: 'rgba(180, 180, 180, 0.35)',
      glossOpacity: 0.28,
      finishLabel: 'Satin Silk White Statuario',
    };
  }

  // 4. Wood / French Oak / Timber Parquet (Planet Rover, SPC Flooring)
  if (
    look === 'wood' ||
    name.includes('wood') ||
    name.includes('parquet') ||
    name.includes('rover') ||
    name.includes('oak') ||
    product.category === 'SPC Flooring'
  ) {
    return {
      textureUrl: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=1200&auto=format&fit=crop',
      tileScale: '240px 120px',
      groutColor: 'rgba(90, 60, 30, 0.25)',
      glossOpacity: 0.1,
      finishLabel: 'French Oak Herringbone Parquet',
    };
  }

  // 5. Venetian Terrazzo
  if (name.includes('terrazzo') || look === 'pattern') {
    return {
      textureUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop',
      tileScale: '200px 200px',
      groutColor: 'rgba(150, 150, 150, 0.3)',
      glossOpacity: 0.18,
      finishLabel: 'Artisanal Venetian Terrazzo',
    };
  }

  // 6. Concrete / Industrial Minimalist
  if (look === 'concrete' || name.includes('concrete') || name.includes('cement')) {
    return {
      textureUrl: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=1200&auto=format&fit=crop',
      tileScale: '260px 260px',
      groutColor: 'rgba(100, 100, 100, 0.2)',
      glossOpacity: 0.08,
      finishLabel: 'Honed Industrial Concrete',
    };
  }

  // 7. Stone / Grigio / Slate / Outdoor Paver (Model 66008, Model 6203, Model 6071, Grigio Milano)
  return {
    textureUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=1200&auto=format&fit=crop',
    tileScale: '240px 240px',
    groutColor: 'rgba(70, 70, 70, 0.35)',
    glossOpacity: 0.12,
    finishLabel: 'Architectural Honed Slate Stone',
  };
}
