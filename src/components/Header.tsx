import { useEffect, useState } from 'react';
import { Menu, X, Phone, ArrowRight } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { SiteConfig } from '../types';
import logo from '../assets/images/final-logo.png';

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

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

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
            alt={siteConfig?.companyName || 'Fast Service Contracting LLc'}
            className="h-14 w-auto object-contain lg:h-15"
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
            className="inline-flex items-center gap-2 rounded-full bg-[#1E4ED8] px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-blue-500/20 transition hover:bg-[#3B82F6]"
          >
            <Phone size={16} />
            Get Quote
          </NavLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          className={`relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 lg:hidden ${
            isTransparent
              ? 'border-white/15 bg-white/10 text-white backdrop-blur-xl hover:bg-white/20'
              : 'border-slate-200 bg-slate-100 text-[#07111f] hover:border-[#1E4ED8]/30 hover:bg-blue-50 hover:text-[#1E4ED8]'
          }`}
        >
          <span
            className={`absolute transition-all duration-300 ${
              open ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
            }`}
          >
            <Menu size={21} />
          </span>

          <span
            className={`absolute transition-all duration-300 ${
              open ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
            }`}
          >
            <X size={21} />
          </span>
        </button>
      </div>

      <div
        className={`fixed inset-0 top-[68px] z-40 bg-[#07111f]/55 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
      />

      <div
        className={`absolute left-0 top-full z-50 w-full origin-top border-t border-slate-200/70 bg-white shadow-2xl transition-all duration-300 lg:hidden ${
          open
            ? 'visible translate-y-0 scale-y-100 opacity-100'
            : 'invisible -translate-y-3 scale-y-95 opacity-0'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[#f8fafc] p-2">
            {links.map(([path, label], index) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `group flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm font-extrabold transition ${
                    isActive
                      ? 'bg-[#1E4ED8] text-white shadow-lg shadow-blue-500/20'
                      : 'text-slate-800 hover:bg-white hover:text-[#1E4ED8] hover:shadow-sm'
                  } ${index !== links.length - 1 ? 'mb-1' : ''}`
                }
              >
                <span>{label}</span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </NavLink>
            ))}
          </div>

          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#07111f] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#1E4ED8]"
          >
            <Phone size={16} />
            Get a Free Quote
          </NavLink>

          <div className="mt-4 border-t border-slate-200 pt-4 text-center">
            <p className="text-xs font-semibold text-slate-500">
              {siteConfig.phone}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}