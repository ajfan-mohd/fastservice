import { SiteConfig } from '../types';

export function Footer({ siteConfig, onNavigate }: { siteConfig: SiteConfig; onNavigate:(p:string)=>void }) {
  const links = ['home', 'about', 'services', 'gallery', 'contact'];
  return (
    <footer className="bg-slate-950 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_auto] gap-8 justify-between">
        <div>
          <div className="flex items-center gap-3"><div className="h-11 w-11 rounded-xl bg-gradient-to-br from-[#1E4ED8] to-[#3B82F6] flex items-center justify-center font-black">FS</div><div><div className="font-black text-xl">FAST SERVICE</div><div className="text-xs text-slate-500">Electro Mechanical Works LLC</div></div></div>
          <p className="text-slate-400 mt-4 max-w-md leading-7">{siteConfig.tagline}</p>
        </div>
        <div className="flex flex-wrap gap-3 lg:items-start">
          {links.map(p => <button key={p} onClick={() => onNavigate(p)} className="text-slate-300 hover:text-[#1E4ED8] capitalize rounded-full px-4 py-2 bg-white/5 hover:bg-white/10 text-sm font-semibold">{p === 'about' ? 'About Us' : p}</button>)}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-white/10 text-sm text-slate-500">© {new Date().getFullYear()} Fast Service Electro Mechanical Works LLC. All rights reserved.</div>
    </footer>
  );
}
