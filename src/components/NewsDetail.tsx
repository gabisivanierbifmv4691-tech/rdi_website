import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Calendar, MapPin, Ticket, Sparkles, Check, 
  Clock, Share2, Compass, Layers, Users, ShieldAlert, Award, Tag
} from 'lucide-react';
import type { Language } from '../App';
import { useProjects } from '../context/ProjectContext';
import CAUPLightShowExhibition from './CAUPLightShowExhibition';
import LaborDaySpecial from './LaborDaySpecial';

interface NewsDetailProps {
  lang: Language;
}

export default function NewsDetail({ lang }: NewsDetailProps) {
  const { id } = useParams<{ id: string }>();
  const { getNewsItem } = useProjects();
  const newsItem = getNewsItem(id);

  // States for interactive booking system (exhibition specific)
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('2025-09-19');
  const [bookingSlot, setBookingSlot] = useState<'AM' | 'PM'>('AM');
  const [slotsLeft, setSlotsLeft] = useState(14);
  const [bookedPass, setBookedPass] = useState<{
    reference: string;
    name: string;
    phone: string;
    date: string;
    slot: 'AM' | 'PM';
    timestamp: string;
  } | null>(null);

  // Generate some simulated random remaining slots whenever date/slot changes
  useEffect(() => {
    const key = `${bookingDate}-${bookingSlot}`;
    let seed = 12;
    for (let i = 0; i < key.length; i++) {
      seed = (seed + key.charCodeAt(i)) % 17;
    }
    setSlotsLeft(seed + 3); // 3 to 19 remaining slots
  }, [bookingDate, bookingSlot]);

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingPhone.trim()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const passRef = `RDI-3X10-${bookingDate.replace(/-/g, '')}-${bookingSlot}-${randomSuffix}`;
    
    setBookedPass({
      reference: passRef,
      name: bookingName,
      phone: bookingPhone,
      date: bookingDate,
      slot: bookingSlot,
      timestamp: new Date().toLocaleString()
    });
  };

  if (!newsItem) {
    return (
      <div className="h-screen flex items-center justify-center bg-white text-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-light mb-4">News Not Found / 未找到该新闻</h2>
          <Link to="/news" className="text-sm underline uppercase tracking-widest">Back to News / 返回新闻列表</Link>
        </div>
      </div>
    );
  }

  // Check if this is the special CAUP 2026 Light Show exhibition (id '20260515_cau')
  if (newsItem.id === '20260515_cau') {
    return <CAUPLightShowExhibition lang={lang} />;
  }

  // Check if this is the special Labor Day holiday tribute (id '20260501_ld')
  if (newsItem.id === '20260501_ld') {
    return <LaborDaySpecial lang={lang} />;
  }

  // Check if this is the special 3x10 exhibition news item (id '20250909_exh')
  const isExhibition = newsItem.id === '20250909_exh';

  if (isExhibition) {
    return (
      <div className="bg-white min-h-screen pt-24 pb-20">
        {/* Back Navigation Bar */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-10">
          <Link 
            to="/news" 
            className="group flex items-center gap-3 text-neutral-400 hover:text-black transition-colors inline-flex"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em]">
              {lang === 'cn' ? '返回新闻动态' : 'BACK TO NEWSPORTAL'}
            </span>
          </Link>
        </div>

        <article className="max-w-[1280px] mx-auto px-6 md:px-12">
          
          {/* Header Section */}
          <header className="py-8 border-b border-black mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 text-amber-600 mb-4 select-none">
                  <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase bg-neutral-100 px-2 py-0.5">DSD NEWS</span>
                  <span className="text-[10px] font-mono font-bold tracking-[0.3em] uppercase border border-amber-600 px-2 py-0.5">EXHIBITION 联合展</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight text-black uppercase leading-tight">
                  {lang === 'cn' ? '10天 | 都设 + WEICO + RDI 3x10 联合展即将启幕' : 'DSD + WEICO + RDI Joint 3x10 Union Exhibition'}
                </h1>
              </div>
              <div className="lg:col-span-4 text-left lg:text-right">
                <p className="text-xs text-neutral-400 font-mono tracking-wider select-none mb-1">PUBLICATION TIMELINE</p>
                <p className="text-sm font-bold text-neutral-900 font-mono">{newsItem.date} // SHANGHAI</p>
              </div>
            </div>
          </header>

          {/* Exhibition Key Highlight Dashboard */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 select-none">
            <div className="p-8 border border-neutral-150 flex flex-col justify-between bg-neutral-50/50">
              <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">[ EXHIBITION LOG ]</span>
              <div className="my-6">
                <span className="text-2xl font-light text-neutral-400 tracking-widest">3x10 而励</span>
                <h3 className="text-xl font-bold text-black uppercase mt-1">联合设计展</h3>
              </div>
              <span className="text-[10px] text-neutral-500 font-light">{lang === 'cn' ? '三方顶尖事务所联合策划' : '联合策划 Co-Curated by Three Studios'}</span>
            </div>

            <div className="p-8 border border-neutral-150 flex flex-col justify-between bg-neutral-50/50">
              <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">[ COUNTDOWN ]</span>
              <div className="my-6">
                <span className="text-sm text-amber-600 font-mono uppercase tracking-widest">LAUNCH TIMELINE</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl font-black font-mono text-black">10</span>
                  <span className="text-base font-bold text-neutral-700">{lang === 'cn' ? '天' : 'DAYS'}</span>
                </div>
              </div>
              <span className="text-[10px] text-neutral-500 font-light">{lang === 'cn' ? '即将在9月19日重磅启幕' : 'Opening September 19.'}</span>
            </div>

            <div className="p-8 border border-neutral-150 flex flex-col justify-between bg-neutral-50/50">
              <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">[ SLOTS STATUS ]</span>
              <div className="my-6">
                <span className="text-sm text-neutral-400 font-mono uppercase tracking-widest">CAPACITY CONTROL</span>
                <div className="flex items-baseline gap-1 mt-1 text-black font-bold">
                  <span className="text-4xl font-black font-mono">20</span>
                  <span className="text-xs text-neutral-400 font-mono">/ {lang === 'cn' ? '上下午限制' : 'SESS'}</span>
                </div>
              </div>
              <span className="text-[10px] text-neutral-500 font-light">{lang === 'cn' ? '名额有限，仅对预约者开放' : 'Extremely limited entry, RSVP required'}</span>
            </div>
          </section>

          {/* Epic Geometric Poster Display (CSS Vector Illustration) */}
          <section className="mb-20">
            <div className="w-full aspect-[16/9] min-h-[380px] bg-neutral-900 text-white relative flex flex-col justify-between p-8 md:p-12 overflow-hidden border border-black rounded-sm">
              {/* Matrix Background Lines */}
              <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
                <div className="w-full h-full" style={{
                  backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                  backgroundSize: '40px 40px'
                }} />
              </div>

              {/* Animated decorative glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20" style={{
                background: 'radial-gradient(circle, rgba(217,119,6,0.15) 0%, rgba(0,0,0,0) 70%)'
              }} />

              {/* Technical indicators */}
              <div className="flex justify-between items-center text-[9px] font-mono text-neutral-500 relative z-10 tracking-[0.25em] uppercase">
                <div>[ JOINT_PROJECT_UNION_MANIFESTO_2025 ]</div>
                <div>SEC_R_09919</div>
              </div>

              {/* Giant Poster Typography */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center my-6 py-4">
                <div className="text-[12px] font-mono text-amber-500 tracking-[0.4em] uppercase mb-4 font-bold select-none">[ 3x10 ⽽励 - 联合展 ]</div>
                
                {/* Visual overlap typography of "3 x 10" */}
                <div className="flex items-center justify-center relative select-none cursor-default scale-95 md:scale-100 transition-transform">
                  <span className="text-[120px] md:text-[180px] font-black tracking-tighter text-white opacity-95 leading-none translate-x-3">3</span>
                  <span className="text-4xl md:text-6xl text-amber-500 font-light mx-2">×</span>
                  <span className="text-[120px] md:text-[180px] font-black tracking-tighter text-neutral-300 opacity-95 leading-none -translate-x-3">10</span>
                </div>

                <div className="text-[11px] font-mono text-neutral-400 tracking-[0.3em] uppercase mt-4 max-w-xl leading-relaxed">
                  {lang === 'cn' 
                    ? '设计 × 运营 × 科技 × 管理 ———— 同一叙事共同呈现'
                    : 'DESIGN × OPERATION × TECH × MANAGEMENT ———— AN INTEGRATED DIALOGUE'}
                </div>
              </div>

              {/* Poster bottom footer logos and details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-white/10 relative z-10 items-end text-neutral-400 text-[10px] font-mono select-none">
                <div>
                  <span className="text-white font-bold block mb-1">DSD</span>
                  <span>上海都设设计</span>
                </div>
                <div>
                  <span className="text-white font-bold block mb-1">WEICO</span>
                  <span>WEICO 建筑事务所</span>
                </div>
                <div>
                  <span className="text-white font-bold block mb-1">RDI</span>
                  <span>RDI 瑞国际照明设计</span>
                </div>
                <div className="text-right text-[9px] text-amber-500 font-bold">
                  <span>9.19 - 11.19 // OPEN PORTAL</span>
                </div>
              </div>
            </div>
          </section>

          {/* Exhibition Concept Statement Text Content */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
            <div className="lg:col-span-8 space-y-8">
              <div className="border-l-2 border-black pl-6 py-2">
                <p className="text-lg md:text-xl font-medium text-neutral-900 leading-relaxed italic">
                  {lang === 'cn' 
                    ? '“旬日之期，诚邀共鉴。在变局之中以知识之网联接建筑、商业运营与光影感知物理。”'
                    : '“Connecting the dimensions of design structure, commercial operations, and interactive spatial light technology.”'}
                </p>
              </div>

              <div className="text-sm md:text-base text-neutral-700 leading-relaxed font-light space-y-6">
                <p>
                  {lang === 'cn'
                    ? '本次由上海都设（DSD）、WEICO 建筑事务所以及 RDI 瑞国际照明设计三方重磅共策划的「3x10 ⽽励 - 联合展」即将在2025年9月19日正式启幕。当下，传统建筑设计和泛光照明体系正面临着新科技演进、数字化变革极速重构的语境。面临多维挑战，展览以“设计 + 运营 + 科技 + 管理”作为核心发展轴线，尝试彻底打破界限。'
                    : 'The upcoming "3x10 Union Exhibition", meticulously curated by Shanghai Dalian Spatial Design (DSD), WEICO Architects, and RDI International Lighting, launches formally on September 19, 2025. In times shaped by heavy tech paradigms, we break academic silos to unify structural blueprints, operational calculations, and physical interactive light technologies.'}
                </p>
                <p>
                  {lang === 'cn'
                    ? '在长达两个月的展览周中，核心展场空间会被赋予多功能灵活社交属性。现场不但会进行多场极具思辨性的深度多专业“非正式会谈”、轻松惬意的酒会沙龙及针对性媒体开放，更配置了神秘互动的发布会路演。这是一次将设计知识深度、商务敏锐度与智能泛置技术交互融汇的精彩大展。'
                    : 'Throughout the 2-month span, our municipal pavilion transforms into an immersive interactive playground. Besides traditional panels, it features provocative roundtables, designer night outs, media seminars, and private technical releases. A perfect synergy demonstrating modern workspace logic and atmospheric art.'}
                </p>
              </div>
            </div>

            {/* Sidebar with Exhibition Info Card */}
            <div className="lg:col-span-4 p-8 border border-neutral-150 bg-neutral-50/40 relative flex flex-col justify-between">
              <div className="space-y-6">
                <h4 className="text-xs font-bold font-mono tracking-widest text-black border-b border-neutral-200 pb-3 uppercase">Exhibition Guide / 观展信息</h4>
                
                <div className="space-y-4">
                  <div className="flex gap-3 items-start">
                    <Calendar size={15} className="text-neutral-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] font-mono text-neutral-400 block mb-0.5">DURATION / 展览时间</span>
                      <p className="text-xs font-bold text-neutral-900 font-mono">2025.09.19 - 11.19</p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <MapPin size={15} className="text-neutral-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] font-mono text-neutral-400 block mb-0.5">LOCATION / 展览地点</span>
                      <p className="text-xs font-bold text-neutral-900 leading-normal">
                        {lang === 'cn' 
                          ? '上海市静安区恒丰路436号环智国际大厦5F' 
                          : '5th Floor, Huanzhi International Plaza, No. 436 Hengfeng Road, Jingan District, Shanghai'}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 items-start">
                    <Users size={15} className="text-neutral-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] font-mono text-neutral-400 block mb-0.5">CAPACITY / 容纳名额</span>
                      <p className="text-xs font-light text-neutral-700 leading-normal">
                        {lang === 'cn' 
                          ? '每日限额 20 人。现场名额根据上下午场次分别受控。' 
                          : 'Limit 20 per morning & afternoon slot to maintain spatial experience.'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Notice */}
              <div className="mt-8 pt-6 border-t border-neutral-200 text-[10px] text-neutral-500 flex gap-2 font-mono">
                <ShieldAlert size={12} className="text-amber-500 shrink-0 mt-0.5" />
                <span>
                  {lang === 'cn' 
                    ? '注意：所有观展均须随带系统签发的“数字通行证”凭据方可通行。'
                    : 'Access requires unique digital exhibition pass presented on-screen.'}
                </span>
              </div>
            </div>
          </section>

          {/* Interactive Booking Area */}
          <section className="mb-24 py-16 px-6 md:px-12 bg-neutral-900 text-white relative border border-transparent rounded-sm">
            <div className="absolute inset-0 opacity-15 pointer-events-none select-none" style={{
              backgroundImage: `radial-gradient(ellipse at bottom left, rgba(217,119,6,0.2) 0%, rgba(0,0,0,0) 80%)`
            }} />
            
            <div className="max-w-[1000px] mx-auto z-10 relative">
              <div className="flex flex-col items-center text-center mb-12">
                <Ticket size={28} className="text-amber-500 mb-4" />
                <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest text-white">
                  {lang === 'cn' ? '预约通道 | REGISTER RESERVATION' : 'ONLINE PASS CENTER'}
                </h3>
                <div className="w-12 h-[1px] bg-amber-500 mt-3 mb-4" />
                <p className="text-xs text-neutral-400 font-light max-w-xl leading-relaxed">
                  {lang === 'cn'
                    ? '因现场展场空间条件限制，每日上下午各时段仅允许20名游客预约入场。请在下方实名录入您的观展安排以即刻签发专属数字凭据。'
                    : 'For structural safety and an uninterrupted aesthetic atmosphere, entry slots are regulated. Realtime reservation releases your entrance pass.'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* RSVP Form inputs Panel */}
                <div className="lg:col-span-7 bg-neutral-950 p-8 border border-white/10">
                  <form onSubmit={handleBookingSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold block">NAME / 观展人姓名 *</label>
                        <input 
                          type="text" 
                          required
                          placeholder={lang === 'cn' ? "请输入姓名" : "Your Name"}
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          className="w-full bg-neutral-900 border border-white/10 text-xs px-4 py-3 focus:outline-none focus:border-amber-500 text-white font-light uppercase tracking-wider rounded-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold block">PHONE / 联络电话 *</label>
                        <input 
                          type="tel" 
                          required
                          placeholder={lang === 'cn' ? "您的联络方式" : "Mobile Phone"}
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          className="w-full bg-neutral-900 border border-white/10 text-xs px-4 py-3 focus:outline-none focus:border-amber-500 text-white font-mono tracking-wider rounded-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold block">DATE / 选择日期 *</label>
                        <select 
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-neutral-900 border border-white/10 text-xs px-4 py-3 focus:outline-none focus:border-amber-500 text-white tracking-widest rounded-none appearance-none cursor-pointer"
                        >
                          <option value="2025-09-19">2025-09-19 (OPENING) / 09月19日</option>
                          <option value="2025-09-20">2025-09-20 (SATURDAY) / 09月20日</option>
                          <option value="2025-09-21">2025-09-21 (SUNDAY) / 09月21日</option>
                          <option value="2025-09-22">2025-09-22 (MONDAY) / 09月22日</option>
                          <option value="2025-09-23">2025-09-23 (TUESDAY) / 09月23日</option>
                          <option value="2025-09-24">2025-09-24 (WEDNESDAY) / 09月24日</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold block">SESSION / 场次时段 *</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setBookingSlot('AM')}
                            className={`py-3 text-xs font-mono font-bold uppercase transition-colors rounded-none ${bookingSlot === 'AM' ? 'bg-amber-500 text-black' : 'bg-neutral-900 text-neutral-400 hover:text-white'}`}
                          >
                            AM (09:00 - 12:00)
                          </button>
                          <button
                            type="button"
                            onClick={() => setBookingSlot('PM')}
                            className={`py-3 text-xs font-mono font-bold uppercase transition-colors rounded-none ${bookingSlot === 'PM' ? 'bg-amber-500 text-black' : 'bg-neutral-900 text-neutral-400 hover:text-white'}`}
                          >
                            PM (13:30 - 17:00)
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[10px] font-mono">
                      <div className="flex gap-2 items-center">
                        <span className={`w-2 h-2 rounded-full ${slotsLeft > 5 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <span className="text-neutral-400">
                          {lang === 'cn' ? '剩余预约名额:' : 'Active Slots Remaining:'}
                        </span>
                        <span className="text-white font-bold">{slotsLeft} / 20</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-white text-black font-bold uppercase tracking-[0.25em] py-4 text-xs hover:bg-neutral-100 transition-all select-none cursor-pointer"
                    >
                      {lang === 'cn' ? '立即申领数字通行证 →' : 'ACQUIRE DIGITAL ENTRANCE PASS →'}
                    </button>
                  </form>
                </div>

                {/* Digital Ticket Pass Result Panel */}
                <div className="lg:col-span-5 h-full flex items-stretch">
                  <AnimatePresence mode="wait">
                    {!bookedPass ? (
                      <div className="w-full min-h-[300px] border border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center text-neutral-500 select-none">
                        <Sparkles size={24} className="opacity-40 mb-3 text-amber-500 animate-pulse" />
                        <span className="text-[10px] font-mono uppercase tracking-widest">{lang === 'cn' ? '暂未登记' : 'STANDBY MODE'}</span>
                        <p className="text-[10px] font-light max-w-xs mt-2 leading-relaxed">
                          {lang === 'cn' ? '填写左边表单即可启动生成拥有三方水印防伪的数字观展准入凭据' : 'Your authentic pass preview will generate here immediately.'}
                        </p>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full bg-amber-500 text-black p-6 flex flex-col justify-between relative overflow-hidden select-none border border-black rounded-sm"
                      >
                        {/* Dynamic layout elements resembling ticket pass */}
                        <div className="absolute top-0 right-0 p-3 bg-black text-amber-500 font-mono text-[8px] tracking-widest font-black uppercase">
                          Exhibition Pass
                        </div>

                        {/* Top layout */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Award size={16} />
                            <span className="text-[9px] font-mono tracking-widest font-black uppercase">[ 3x10 UNION PASS ]</span>
                          </div>

                          <div className="border-t border-b border-black/10 py-3 space-y-1.5">
                            <div>
                              <span className="text-[8px] font-mono text-black/50 block tracking-widest uppercase">VISITOR NAME / 姓名</span>
                              <p className="text-sm font-black uppercase tracking-wider">{bookedPass.name}</p>
                            </div>
                            <div>
                              <span className="text-[8px] font-mono text-black/50 block tracking-widest uppercase">CONTACT PHONE / 联络电话</span>
                              <p className="text-xs font-mono font-bold">{bookedPass.phone}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <span className="text-[8px] font-mono text-black/50 block tracking-widest uppercase">SCHEDULED DATE / 日期</span>
                                <p className="text-xs font-mono font-bold">{bookedPass.date}</p>
                              </div>
                              <div>
                                <span className="text-[8px] font-mono text-black/50 block tracking-widest uppercase">SESSION / 时段</span>
                                <p className="text-xs font-mono font-bold uppercase">{bookedPass.slot === 'AM' ? 'Morning (上午)' : 'Afternoon (下午)'}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Middle: Abstract QR code vector rendering */}
                        <div className="my-6 flex items-center gap-4 bg-white/40 p-3 border border-black/5 rounded-sm">
                          <div className="w-16 h-16 shrink-0 bg-neutral-900 p-1">
                            <svg viewBox="0 0 24 24" className="w-full h-full text-white" fill="currentColor">
                              {/* Standard styled digital mosaic grid */}
                              <rect x="1" y="1" width="5" height="5" />
                              <rect x="2" y="2" width="3" height="3" fill="none" stroke="black" strokeWidth="1" />
                              <rect x="18" y="1" width="5" height="5" />
                              <rect x="1" y="18" width="5" height="5" />
                              <rect x="8" y="2" width="2" height="2" />
                              <rect x="12" y="1" width="3" height="3" />
                              <rect x="10" y="8" width="4" height="4" />
                              <rect x="14" y="6" width="2" height="2" />
                              <rect x="18" y="10" width="3" height="4" />
                              <rect x="11" y="18" width="5" height="2" />
                              <rect x="8" y="14" width="2" height="4" />
                              <rect x="18" y="18" width="4" height="4" />
                            </svg>
                          </div>
                          <div className="text-[9px] font-mono leading-relaxed space-y-0.5">
                            <div className="font-black">BOOKED SUCCESS // 申领确认</div>
                            <div className="text-black/60 truncate max-w-[160px]">{bookedPass.reference}</div>
                            <div className="text-black/50">{bookedPass.timestamp}</div>
                          </div>
                        </div>

                        {/* Pass bottom footer */}
                        <div className="border-t border-black/10 pt-3 flex justify-between items-end text-[8px] font-mono">
                          <div className="flex gap-1 items-center font-bold">
                            <Check size={10} />
                            <span>APPROVED BY RDI PORTAL</span>
                          </div>
                          <span>DSD + WEICO + RDI</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Footer View All */}
          <footer className="border-t border-neutral-200 pt-12 text-center select-none">
            <Link 
              to="/news" 
              className="text-xs font-bold uppercase tracking-[0.4em] text-neutral-800 hover:text-black hover:tracking-[0.6em] transition-all"
            >
              {lang === 'cn' ? '查看更多新闻动态' : 'VIEW ALL NEWS PORTALS'}
            </Link>
          </footer>

        </article>
      </div>
    );
  }

  // Fallback to original standard dynamic news detail rendering
  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      {/* 顶部导航 / Back Button */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <Link 
          to="/news" 
          className="group flex items-center gap-3 text-gray-400 hover:text-gray-950 transition-colors inline-flex"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
            {lang === 'cn' ? '返回新闻列表' : 'Back to News'}
          </span>
        </Link>
      </div>

      <article className="max-w-7xl mx-auto px-6">
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{newsItem.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{newsItem.category}</span>
              </div>
            </div>

            <h1 className="text-[32px] md:text-[48px] font-bold leading-[1.1] tracking-tight text-gray-900 mb-8">
              {lang === 'cn' ? newsItem.titleCN : newsItem.titleEN}
            </h1>

            <div className="h-[2px] w-20 bg-gray-900" />
          </motion.div>
        </header>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="aspect-[16/9] overflow-hidden bg-gray-100 mb-16"
        >
          <img 
            src={newsItem.image} 
            alt="Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-8">
            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-8 text-[15px]">
              <div className="space-y-6">
                <p className="text-lg font-medium text-gray-900 leading-relaxed italic border-l-2 border-gray-900 pl-6 py-2">
                  {lang === 'cn' 
                    ? "设计不仅仅是光的应用，更是空间氛围的艺术重塑。"
                    : "Design is not just the application of light, but the artistic reshaping of spatial atmosphere."}
                </p>
                <p>
                  {lang === 'cn' ? newsItem.contentCN : newsItem.contentEN}
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-gray-100 pt-12 md:pt-0 md:pl-12">
            <div className="space-y-10">
              {newsItem.location && (
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Location / 地点</h4>
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-widest">{newsItem.location}</p>
                </div>
              )}
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Share / 分享</h4>
                <div className="flex gap-4">
                  <button className="text-gray-400 hover:text-gray-900 transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {newsItem.gallery && newsItem.gallery.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
            {newsItem.gallery.map((img, index) => (
              <div key={index} className="aspect-square bg-gray-100 overflow-hidden group">
                <img 
                  src={img} 
                  alt={`Detail ${index + 1}`} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        )}

        <footer className="border-t border-gray-100 pt-12 text-center">
          <Link 
            to="/news" 
            className="text-xs font-bold uppercase tracking-[0.4em] text-gray-900 hover:tracking-[0.6em] transition-all"
          >
            {lang === 'cn' ? '查看更多动态' : 'View All News'}
          </Link>
        </footer>
      </article>
    </div>
  );
}
