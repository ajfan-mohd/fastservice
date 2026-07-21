import { Quote } from 'lucide-react';
import ceoimg from '../assets/images/ceo.jpeg';
export function CeoNote() {
  return (
    <section style={{ background: '#fff', padding: '80px 0' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{
          display: 'grid', alignItems: 'center', gap: 56
        }} className="lg:grid-cols-2">

          {/* Photo side */}
          <div className="fade-up" style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: -16,
              background: '#fef3e8', borderRadius: 32,
              transform: 'rotate(-2deg)'
            }} />
            <div className="card" style={{ borderRadius: 24, overflow: 'hidden', position: 'relative' }}>
              <img
                src={ceoimg}
                alt="CEO Fast Service"
                style={{ width: '100%', height: 550, objectFit: 'cover', objectPosition: 'top' }}
              />
              {/* Name plate */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '28px 28px',
                background: 'linear-gradient(to top, rgba(10,22,40,.92) 0%, transparent 100%)',
              }}>
                <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '1.4rem', color: '#fff', letterSpacing: '-.02em' }}>
                  Engr. Sulaiman Mohamed Al Sheezawy
                </div>
                <div style={{ fontSize: '.8rem', color: 'rgba(255,255,255,.60)', marginTop: 5, fontWeight: 600 }}>
                 CEO · Fast Service Contracting LLc
                </div>
              </div>
            </div>

            {/* Years badge */}
            <div style={{
              position: 'absolute', top: 28, right: -18, zIndex: 2,
              background: 'linear-gradient(135deg, #1E4ED8, #3b82f6)',
              borderRadius: 16, padding: '14px 18px',
              boxShadow: '0 8px 32px rgba(232,117,26,.35)',
              color: '#fff', textAlign: 'center'
            }}>
              <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '1.8rem', lineHeight: 1 }}>20+</div>
              <div style={{ fontSize: '.65rem', fontWeight: 700, opacity: .85, marginTop: 4, textTransform: 'uppercase', letterSpacing: '.06em' }}>Years</div>
            </div>
          </div>

          {/* Note side */}
          <div className="fade-up delay-2">
          <p className="t-eyebrow" style={{ marginBottom: 18 }}>
  Ceo's Message
</p>
            <h2 className="t-display-sm" style={{ color: '#0d1b2a', marginBottom: 28 }}>
               Committed to Quality, Reliability & Excellence.
            </h2>

            <div style={{ position: 'relative', marginBottom: 28 }}>
              <Quote size={48} color="rgba(30,78,216,.15)" style={{ position: 'absolute', top: -8, left: -8 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingLeft: 8 }}>
                <p className="t-body">
                  When I started Fast Service over two decades ago, the goal was simple — give people in the UAE a contractor they can actually rely on. No vague quotes, no delays, no surprises on handover day.
                </p>
                <p className="t-body">
                  Today, our team handles everything from villa renovations to full MEP fit-outs, and that same principle guides every single project. We show up, we listen, we deliver clean work on time.
                </p>
                <p className="t-body">
                  I'm proud of what this team has built, and I personally ensure that every client experience reflects the values we started with.
                </p>
              </div>
            </div>

            {/* Signature */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 24, borderTop: '1px solid #e2e8f0' }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'linear-gradient(135deg, #1E4ED8, #3b82f6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 900, fontSize: '1rem', flexShrink: 0
              }}>SM</div>
              <div>
                <div style={{ fontFamily: 'Fraunces, serif', fontWeight: 700, fontSize: '1.1rem', color: '#0d1b2a', fontStyle: 'italic' }}>Engr. Sulaiman Mohamed Al Sheezawy</div>
                <div style={{ fontSize: '.78rem', color: '#94a3b8', marginTop: 3, fontWeight: 600 }}>Ceo</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}