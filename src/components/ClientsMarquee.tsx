import { useRef, useEffect, useState } from 'react';
import { ClientLogo } from '../types';

function ClientCard({ name, logo }: { name: string; logo: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        border: '1.5px solid #e8edf2',
        borderRadius: 14,
        padding: '16px 28px',
        minWidth: 180,
        height: 80,
        flexShrink: 0,
        boxShadow: '0 2px 12px rgba(10,22,40,.05)',
        userSelect: 'none',
      }}
    >
      <img
        src={logo}
        alt={name}
        loading="lazy"
        decoding="async"
        style={{
          maxHeight: 36,
          maxWidth: 130,
          objectFit: 'contain',
          filter: 'grayscale(100%)',
          opacity: 0.6,
          transition: 'filter .3s, opacity .3s',
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLImageElement).style.filter = 'grayscale(0%)';
          (e.target as HTMLImageElement).style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLImageElement).style.filter = 'grayscale(100%)';
          (e.target as HTMLImageElement).style.opacity = '0.6';
        }}
        onError={(e) => {
          const el = e.target as HTMLImageElement;
          el.style.display = 'none';
          el.insertAdjacentHTML(
            'afterend',
            `<span style="font-weight:700;font-size:.85rem;color:#94a3b8;font-family:Plus Jakarta Sans,sans-serif">${name}</span>`
          );
        }}
      />
    </div>
  );
}

export function ClientsMarquee({ clients }: { clients: ClientLogo[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  const visibleClients = clients.length > 0 ? clients : [];
  const doubled = [...visibleClients, ...visibleClients];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || doubled.length === 0) return;

    let x = 0;
    let raf: number;

    const loop = () => {
      if (!paused) {
        x -= 0.55;

        if (Math.abs(x) >= track.scrollWidth / 2) {
          x = 0;
        }

        track.style.transform = `translateX(${x}px)`;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(raf);
  }, [paused, doubled.length]);

  if (clients.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        background: '#faf8f5',
        padding: '76px 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 120,
          zIndex: 2,
          background: 'linear-gradient(90deg, #faf8f5, transparent)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 120,
          zIndex: 2,
          background: 'linear-gradient(270deg, #faf8f5, transparent)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="fade-up"
        style={{
          textAlign: 'center',
          marginBottom: 44,
          padding: '0 24px',
        }}
      >
        <p
          className="t-eyebrow"
          style={{ marginBottom: 12, justifyContent: 'center' }}
        >
          Trusted By
        </p>

        <h2
          className="t-display-sm"
          style={{
            color: '#0d1b2a',
            fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
          }}
        >
          Clients across the UAE
        </h2>

        <p
          style={{
            color: '#64748b',
            fontSize: '.9rem',
            marginTop: 10,
            lineHeight: 1.7,
          }}
        >
          Residential, commercial and real-estate developers who rely on Fast
          Service.
        </p>
      </div>

      <div
        style={{ overflow: 'hidden', cursor: 'grab' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: 14,
            width: 'max-content',
            padding: '4px 0 8px',
            willChange: 'transform',
          }}
        >
          {doubled.map((client, index) => (
            <ClientCard key={`${client.id}-${index}`} {...client} />
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 40,
          marginTop: 44,
          flexWrap: 'wrap',
          padding: '0 24px',
        }}
      >
        {[
          { num: '200+', label: 'Happy Clients' },
          { num: '500+', label: 'Projects Done' },
          { num: '25+', label: 'Years Trusted' },
          { num: '100%', label: 'On-Time Rate' },
        ].map(({ num, label }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div
              style={{
                fontFamily: 'Fraunces, serif',
                fontWeight: 700,
                fontSize: '2rem',
                color: '#0d1b2a',
                letterSpacing: '-.03em',
                lineHeight: 1,
              }}
            >
              {num}
            </div>

            <div
              style={{
                fontSize: '.78rem',
                color: '#94a3b8',
                marginTop: 6,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '.06em',
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}