export function PageHero({
  eyebrow,
  title,
  text,
  image,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
}) {
  return (
    <section className="premium-section relative flex min-h-[50vh] items-center overflow-hidden bg-[#07111f] text-white">
      <img
        src={image}
        alt={title}
        width={1800}
        height={900}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-45"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#07111f] via-[#07111f]/78 to-[#07111f]/35" />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-3xl fade-up">
          <p className="eyebrow">{eyebrow}</p>

          <h1 className="text-[36px] font-extrabold leading-[1] tracking-[-0.045em] text-white sm:text-[48px] lg:text-[60px]">
            {title}
          </h1>

          <p className="section-copy mt-5 text-slate-300">{text}</p>
        </div>
      </div>
    </section>
  );
}