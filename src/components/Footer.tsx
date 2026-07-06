import { NavLink } from 'react-router-dom';
import { SiteConfig } from '../types';

export function Footer({ siteConfig }: { siteConfig: SiteConfig }) {
  const links = [
    ['/', 'Home'],
    ['/about', 'About Us'],
    ['/services', 'Services'],
    ['/gallery', 'Gallery'],
    ['/contact', 'Contact'],
  ];

  return (
    <footer className="bg-slate-950 py-10 text-white">
      <div className="mx-auto grid max-w-7xl justify-between gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#1E4ED8] to-[#3B82F6] font-black">
              FS
            </div>

            <div>
              <div className="text-xl font-black">FAST SERVICE</div>
              <div className="text-xs text-slate-500">
                Electro Mechanical Works LLC
              </div>
            </div>
          </div>

          <p className="mt-4 max-w-md leading-7 text-slate-400">
            {siteConfig.tagline}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 lg:items-start">
          {links.map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              className="rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-[#1E4ED8]"
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 px-4 pt-6 text-sm text-slate-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} Fast Service Contracting LLc.
        All rights reserved.
      </div>
    </footer>
  );
}