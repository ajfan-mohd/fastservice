import { PageHero } from '../components/PageHero';
import { GalleryGrid } from '../components/GalleryGrid';
import { GalleryItem } from '../types';

export function GalleryPage({ items }: { items: GalleryItem[] }) {
  return (
    <>
      <PageHero eyebrow="Gallery" title="Image-focused project showcase." text="A clean visual gallery for renovation, fit-out, MEP, flooring, painting and outdoor project styles." image="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1800" />
      <GalleryGrid items={items} />
    </>
  );
}
