import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { SiteConfig } from '../types';
import logo from '../assets/images/logo.png';

export function Header({ siteConfig }: { siteConfig: SiteConfig }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const links = [
    ['/', 'Home'],
    ['/about', 'About Us'],
    ['/services', 'Services'],
    ['/gallery', 'Gallery'],
    ['/contact', 'Contact'],
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = !scrolled && location.pathname === '/' && !open;

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent'
          : 'border-b border-slate-200/70 bg-white/92 shadow-sm backdrop-blur-2xl'
      }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 transition-all duration-500 sm:px-6 lg:px-8 ${
          isTransparent ? 'h-[80px]' : 'h-[68px]'
        }`}
      >
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center text-left"
        >
          <img
            src={logo}
            alt={siteConfig?.companyName || 'Fast Service'}
            className="h-12 w-auto object-contain lg:h-14"
          />
        </NavLink>

        <nav
          className={`hidden items-center gap-7 rounded-full px-6 py-2.5 lg:flex ${
            isTransparent
              ? 'border border-white/10 bg-black/10 text-white backdrop-blur-xl'
              : 'border border-slate-200 bg-slate-100/75 text-slate-700'
          }`}
        >
          {links.map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `nav-link-premium text-sm font-extrabold transition ${
                  isActive
                    ? 'active text-[#1E4ED8]'
                    : isTransparent
                    ? 'text-white/82 hover:text-[#93c5fd]'
                    : 'text-slate-700 hover:text-[#1E4ED8]'
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
            className="inline-flex items-center gap-2 rounded-full bg-[#1E4ED8] px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-blue-500/20 hover:bg-[#3B82F6]"
          >
            <Phone size={16} />
            Get Quote
          </NavLink>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
            isTransparent
              ? 'bg-white/10 text-white'
              : 'bg-slate-100 text-[#07111f]'
          }`}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200/70 bg-white/96 px-4 py-4 backdrop-blur-xl lg:hidden">
          {links.map(([path, label]) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className="block w-full rounded-lg px-3 py-3 text-left font-bold text-slate-800 hover:bg-blue-50 hover:text-[#1E4ED8]"
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}