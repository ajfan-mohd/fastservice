import { useEffect, useRef, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const stats = [
  { value: 20, suffix: '+', label: 'Years Experience' },
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 24, suffix: '/7', label: 'Support Available' },
  { value: 15, suffix: '+', label: 'Service Categories' },
];

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;

        started.current = true;
        let start = 0;
        const duration = 1400;
        const startTime = performance.now();

        const animate = (time: number) => {
          const progress = Math.min((time - startTime) / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(start + (value - start) * easeOut);

          setCount(current);

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.35 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function StatsStrip() {
  return (
    <section className="bg-white py-8 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((item, index) => (
          <div
            key={item.label}
            className={`premium-card fade-up ${
              index ? 'fade-up-delay-1' : ''
            } rounded-xl bg-slate-50 p-6 border border-slate-100 transition duration-500 hover:-translate-y-1 hover:border-[#1E4ED8]/30 hover:shadow-xl`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-[#1E4ED8]" size={22} />

              <div>
                <strong className="block text-3xl font-black tracking-tight text-slate-950">
                  <CountUp value={item.value} suffix={item.suffix} />
                </strong>

                <span className="text-sm text-slate-600">{item.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}