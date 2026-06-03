export function SectionHeader({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className="section-heading fade-up">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`display-title ${light ? 'text-white' : 'text-slate-950'}`}>{title}</h2>
      {text && <p className={`section-copy ${light ? 'text-slate-300' : 'text-slate-600'}`}>{text}</p>}
    </div>
  );
}
