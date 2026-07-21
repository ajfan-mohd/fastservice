import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { SiteConfig } from '../types';
import logo from '../assets/images/final-logo.png';

export function Header({ siteConfig }: { siteConfig: SiteConfig }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const links = [
    ['/', 'Home'],
    ['/about', 'About Us'],
    ['/services', 'Services'],
    ['/gallery', 'Gallery'],
    ['/contact', 'Contact'],
  ];

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-200/70 bg-white/92 shadow-sm backdrop-blur-2xl">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center text-left">
          <img
            src={logo}
            alt={siteConfig?.companyName || 'Fast Service Contracting LLc'}
            className="h-18 w-auto object-contain lg:h-21"
          />
        </NavLink>

        {/* Nav group — no border, no background, just clean spacing */}
        <nav className="hidden items-center gap-10 lg:flex">
          {links.map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `relative py-1 text-sm font-extrabold transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-[2px] after:rounded-full after:bg-[#1E4ED8] after:transition-all after:duration-300 ${
                  isActive
                    ? 'text-[#1E4ED8] after:w-full'
                    : 'text-slate-700 after:w-0 hover:text-[#1E4ED8] hover:after:w-full'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#1E4ED8] px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-blue-500/20 transition-colors duration-300 hover:bg-[#3B82F6]"
          >
            <Phone size={16} />
            Get Quote
          </NavLink>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-[#07111f] transition-colors duration-300 lg:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-slate-200/70 bg-white/96 backdrop-blur-xl transition-all duration-300 ease-out lg:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {links.map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block w-full rounded-lg px-4 py-3 text-left font-bold transition-colors duration-300 ${
                  isActive ? 'bg-blue-50 text-[#1E4ED8]' : 'text-slate-800 hover:bg-blue-50 hover:text-[#1E4ED8]'
                }`
              }
            >
              {label}
            </NavLink>
          ))}

          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#1E4ED8] px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-500/20 transition hover:bg-[#3B82F6]"
          >
            <Phone size={16} />
            Get Quote
          </NavLink>
        </div>
      </div>
    </header>
  );
}