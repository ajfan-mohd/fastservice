import { Building2, Home, Zap, Utensils, PanelsTopLeft, Grid3X3, Hammer, Armchair, Paintbrush, PaintBucket, Trees, Car, Factory, Ruler, Blocks, Wrench } from 'lucide-react';

const icons: Record<string, any> = { Building2, Home, Zap, Utensils, PanelsTopLeft, Grid3X3, Hammer, Armchair, Paintbrush, PaintBucket, Trees, Car, Factory, Ruler, Blocks, Wrench };

export const AVAILABLE_ICONS = Object.keys(icons).map((name) => ({ name, label: name }));

export function IconResolver({ name, className = '' }: { name: string; className?: string }) {
  const Icon = icons[name] || Wrench;
  return <Icon className={className} />;
}
