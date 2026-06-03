import { Building2, Home, Landmark, Trees } from 'lucide-react';
const items=[
  ['Homes','Villas & apartments',Home],
  ['Offices','Fit-out & MEP',Building2],
  ['Buildings','Maintenance support',Landmark],
  ['Outdoor','Landscape & shades',Trees]
];
export function ClientsPartners(){return <section className="premium-section py-12 bg-[#07111f] text-white"><div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(30,78,216,.10),transparent,rgba(30,78,216,.08))]"></div><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left relative">{items.map(([title,sub,Icon]:any,i)=><div key={title} className={`premium-card fade-up glass rounded-xl p-6 ${i===1?'fade-up-delay-1':i===2?'fade-up-delay-2':i===3?'fade-up-delay-3':''}`}><Icon className="text-[#1E4ED8] mb-5" size={30}/><b className="text-2xl lg:text-3xl font-black tracking-tight">{title}</b><p className="text-slate-300 text-sm mt-2">{sub}</p></div>)}</div></section>}
