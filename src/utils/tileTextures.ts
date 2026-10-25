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
      textureUrl: '/products/mat-stone.jpg',
      tileScale: '340px 340px',
      groutColor: 'rgba(90, 90, 90, 0.35)',
      glossOpacity: 0.14,
      finishLabel: 'Model 66008 Honed Matte Porcelain',
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
      textureUrl: '/products/mat-marquina.jpg',
      tileScale: '380px 380px',
      groutColor: 'rgba(20, 20, 20, 0.45)',
      glossOpacity: finish.includes('satin') ? 0.18 : 0.32,
      finishLabel: 'Velvet Obsidian Black Marble',
    };
  }

  // 2. Calacatta Gold / Warm Golden Veined Marble
  if (name.includes('calacatta') || name.includes('gold')) {
    return {
      textureUrl: '/products/mat-calacatta.jpg',
      tileScale: '420px 420px',
      groutColor: 'rgba(215, 195, 160, 0.3)',
      glossOpacity: 0.32,
      finishLabel: 'Crystal Polished Calacatta Gold',
    };
  }

  // 3. Statuario / Carrara / Pure White Marble
  if (name.includes('statuario') || name.includes('carrara') || (look === 'marble' && !name.includes('grigio'))) {
    return {
      textureUrl: '/products/mat-calacatta.jpg',
      tileScale: '400px 400px',
      groutColor: 'rgba(180, 180, 180, 0.3)',
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
    (product.category as string) === 'SPC Flooring'
  ) {
    return {
      textureUrl: '/products/mat-wood.jpg',
      tileScale: '380px 380px',
      groutColor: 'rgba(80, 50, 20, 0.25)',
      glossOpacity: 0.1,
      finishLabel: 'French Oak Timber Parquet',
    };
  }

  // 5. Venetian Terrazzo
  if (name.includes('terrazzo') || look === 'pattern') {
    return {
      textureUrl: '/products/mat-terrazzo.jpg',
      tileScale: '320px 320px',
      groutColor: 'rgba(140, 140, 140, 0.25)',
      glossOpacity: 0.18,
      finishLabel: 'Artisanal Venetian Terrazzo',
    };
  }

  // 6. Concrete / Industrial Minimalist
  if (look === 'concrete' || name.includes('concrete') || name.includes('cement')) {
    return {
      textureUrl: '/products/mat-stone.jpg',
      tileScale: '340px 340px',
      groutColor: 'rgba(100, 100, 100, 0.25)',
      glossOpacity: 0.1,
      finishLabel: 'Honed Industrial Concrete Slab',
    };
  }

  // 7. Stone / Grigio / Slate / Outdoor Paver (Model 66008, Model 6203, Model 6071, Grigio Milano)
  if (
    name.includes('paver') ||
    name.includes('grigio') ||
    name.includes('slate') ||
    name.includes('outdoor') ||
    (product.destinations as string[] | undefined)?.includes('Outdoor')
  ) {
    return {
      textureUrl: '/products/mat-stone.jpg',
      tileScale: '340px 340px',
      groutColor: 'rgba(70, 70, 70, 0.35)',
      glossOpacity: 0.12,
      finishLabel: 'Architectural Grigio Paver Stone',
    };
  }

  // Default: Model 66008 Matte Porcelain (authentic top-down material scan)
  return {
    textureUrl: '/products/mat-stone.jpg',
    tileScale: '340px 340px',
    groutColor: 'rgba(80, 80, 80, 0.3)',
    glossOpacity: 0.14,
    finishLabel: 'Model 66008 Honed Matte Porcelain',
  };
}
