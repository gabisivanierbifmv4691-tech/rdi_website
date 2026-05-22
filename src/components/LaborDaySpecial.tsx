import { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Calendar, MapPin, Heart, Share2, Star, 
  MessageSquare, Send, Check, Sparkles, Award, ThumbsUp, Clock
} from 'lucide-react';
import type { Language } from '../App';

interface LaborDaySpecialProps {
  lang: Language;
}

interface Wish {
  id: string;
  name: string;
  text: string;
  timestamp: string;
  likes: number;
  hasLiked: boolean;
}

const PRESET_WISHES_CN = [
  "致敬在每个岗位默默奉献的设计师、建设者，节日快乐！",
  "向所有城市建设和守护者致敬，劳有所获，耕耘皆有芬芳！",
  "复兴公园的夜间灯光非常温馨，能感受到光影背后的温暖人文关怀。",
  "光影流动自然而治愈，祝大家五一劳动节岁岁安康！",
  "为辛勤工作的同仁和每一位劳动者点赞！劳动节快乐！"
];

const PRESET_WISHES_EN = [
  "Respect to all designers and creators! Happy Labor Day!",
  "Salute to everyone crafting our urban nightscapes, hard work pays off!",
  "Fuxing Park's lights are beautiful. Thank you for making cities warmer.",
  "What an incredibly poetic lighting intervention. Happy Holiday!",
  "Happy Labor Day! A beautiful tribute to dedication and talent!"
];

export default function LaborDaySpecial({ lang }: LaborDaySpecialProps) {
  // Stats system
  const [likesCount, setLikesCount] = useState<number>(128);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isStarred, setIsStarred] = useState<boolean>(false);
  const [starsCount, setStarsCount] = useState<number>(45);
  const [shareFeedback, setShareFeedback] = useState<boolean>(false);

  // Guestbook wishes board
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [inputName, setInputName] = useState('');
  const [inputText, setInputText] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<number>(-1);

  // Particle states for the interactive poster
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; scale: number }>>([]);

  useEffect(() => {
    // Generate a set of sparkling fireflies/light sparks on mount for the ambient poster
    const list = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      scale: 0.3 + Math.random() * 0.7
    }));
    setParticles(list);

    // Initial guestbook entries
    const initialWishes: Wish[] = [
      {
        id: 'w-1',
        name: lang === 'cn' ? '王工 (上海设计院)' : 'Alex W. (Architect)',
        text: lang === 'cn' ? "上海复兴公园的夜间艺术灯光简直是梦幻森林！消隐式的灯具布置手法非常好，致敬每一位在现场连夜调试的设计师！" : "The Fuxing Park woodland lighting is sheer poetry. Pure respects to the lighting designers working late nights on active calibration!",
        timestamp: '2026-05-01 08:35',
        likes: 18,
        hasLiked: false
      },
      {
        id: 'w-2',
        name: lang === 'cn' ? '李默默' : 'Monica L.',
        text: lang === 'cn' ? "看到‘每一份努力都让世界更美’，眼眶有点湿润。平凡的人不平凡的心，劳动节快乐！" : "This 'Each effort makes the world more beautiful' slogan is deeply moving. Warmest greetings to every ordinary hero out there!",
        timestamp: '2026-05-01 09:12',
        likes: 12,
        hasLiked: false
      }
    ];
    setWishes(initialWishes);
  }, [lang]);

  const handleWishSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nameToUse = inputName.trim() || (lang === 'cn' ? '热心游客' : 'Warm Guest');
    const textToUse = inputText.trim();

    if (!textToUse) return;

    const newWish: Wish = {
      id: `w-${Date.now()}`,
      name: nameToUse,
      text: textToUse,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      likes: 0,
      hasLiked: false
    };

    setWishes(prev => [newWish, ...prev]);
    setInputName('');
    setInputText('');
    setSelectedPreset(-1);
  };

  const selectPreset = (idx: number) => {
    setSelectedPreset(idx);
    const presets = lang === 'cn' ? PRESET_WISHES_CN : PRESET_WISHES_EN;
    setInputText(presets[idx]);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareFeedback(true);
    setTimeout(() => setShareFeedback(false), 2500);
  };

  const toggleLikeWish = (wishId: string) => {
    setWishes(prev => prev.map(w => {
      if (w.id === wishId) {
        return {
          ...w,
          hasLiked: !w.hasLiked,
          likes: w.likes + (w.hasLiked ? -1 : 1)
        };
      }
      return w;
    }));
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleToggleStar = () => {
    setIsStarred(!isStarred);
    setStarsCount(prev => isStarred ? prev - 1 : prev + 1);
  };

  return (
    <div className="bg-[#fcfbfc] min-h-screen pt-24 pb-20 text-neutral-900 transition-colors duration-500">
      
      {/* Editorial Navigation Bar */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-8">
        <Link 
          to="/news" 
          className="group flex items-center gap-3 text-neutral-400 hover:text-black transition-colors inline-flex"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em]">
            {lang === 'cn' ? '返回新闻中心' : 'BACK TO NEWS INDEX'}
          </span>
        </Link>
      </div>

      <article className="max-w-[1280px] mx-auto px-6 md:px-12">
        
        {/* News Top Header */}
        <header className="py-8 border-b border-neutral-300 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-9">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] bg-black text-white px-2.5 py-0.5 uppercase">
                  RDI HOLIDAY
                </span>
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] border border-black px-2.5 py-0.5 uppercase">
                  {lang === 'cn' ? '节日致敬' : 'Festival Tribute'}
                </span>
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] bg-rose-500 text-white px-2 py-0.5 uppercase">
                  {lang === 'cn' ? '五一劳动节' : 'Labor Day'}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-950 uppercase leading-snug">
                {lang === 'cn' 
                  ? '致敬劳动 不负耕耘 ｜ RDI向城市守护者与耕耘者致以崇高敬意' 
                  : 'Tribute to Labor, Fulfilling Diligence | RDI Salutes Every Dedicated Space Builder'}
              </h1>
            </div>
            
            <div className="lg:col-span-3 text-left lg:text-right">
              <p className="text-[10px] text-neutral-400 font-mono tracking-wider mb-1">PUBLICATION OUTLET</p>
              <p className="text-sm font-bold text-neutral-900 font-mono">2026.05.01 // SHANGHAI / 上海</p>
            </div>
          </div>
        </header>

        {/* Content Section / Left: Poster and Editorial text */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          <div className="lg:col-span-7 space-y-10">
            
            {/* The Main Narrative Editorial Cards */}
            <div className="p-8 bg-white border border-neutral-200/80 shadow-sm relative overflow-hidden space-y-8 rounded-sm">
              <div className="absolute top-0 left-0 w-1 bg-amber-500 h-full" />
              
              {/* Profile Bar */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-black text-sm border border-neutral-200">
                  rdi
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-neutral-900">RDI瑞国际照明设计</span>
                    <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-blue-500 text-white text-[8px]" title="Authenticated Account">✓</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 block tracking-wider">2026年5月1日 08:00 · 上海</span>
                </div>
              </div>

              {/* Chinese Message Box */}
              <div className="space-y-4">
                <div className="text-sm md:text-base text-neutral-800 leading-relaxed font-normal whitespace-pre-line">
                  RDI及全体员工，向每一位辛勤耕耘的奋斗者致以诚挚敬意！祝大家五一劳动节快乐，诸事顺遂，劳有所获，岁岁安康！
                </div>
              </div>

              <div className="h-[1px] w-full bg-neutral-200/60" />

              {/* English Message Box */}
              <div className="space-y-4">
                <div className="text-sm md:text-base text-neutral-600 leading-relaxed font-light italic font-serif">
                  "RDI wishes you and your family a happy Labor Day, good health and every success in work."
                </div>
              </div>
            </div>

            {/* In-depth Highlight of Fuxing Park Art Lighting Upgrade */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-neutral-400">
                <MapPin size={14} className="text-emerald-500" />
                <span>[ SPATIAL ARCHITECTURE FEATURE / 艺术灯光专题 ]</span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-950 uppercase">
                {lang === 'cn' 
                  ? '上海复兴公园夜间艺术灯光提升：用光影筑起心灵港湾' 
                  : 'Fuxing Park Art Lighting Upgrade: Reshaping Public Woods into Healing Spaces'}
              </h2>

              <div className="text-sm md:text-base text-neutral-700 leading-relaxed font-light space-y-6">
                <p>
                  {lang === 'cn'
                    ? '作为中国唯一保存完整的典型法式园林，上海复兴公园不仅承载着百年的地标记忆，更是喧嚣繁华的淮海路商圈中市民能够与自然对话、放松身心的一方城市绿肺。'
                    : 'As a perfectly preserved classical French-style urban park in Shanghai, Fuxing Park is a priceless historic treasure and a green lung for citizens residing amidst the bustling Huaihai Road commercial area.'}
                </p>
                <p>
                  {lang === 'cn'
                    ? '在本次艺术灯光提升中，RDI瑞国际照明设计倾注了大量对光的理解与人文情怀。设计师秉承“消隐、舒适、共生”的理念，最大程度避免眩光和灯光过爆，通过树根环形隐藏投光、微风草坪低流明漫射以及悬浮空中的温柔月影，营造出一片梦幻的复古艺术树林，致敬每日在岗位默默前行的建设者，为市民夜间漫步和恢复元气提供温暖拥抱。'
                    : 'For this delicate nocturnal landscape intervention, RDI focused heavily on biophilic and glare-minimized techniques. We installed hidden landscape rings, subtle ground uplighting, and high-level soft moonlight projections. It transforms standard trees into glowing organic dreamscapes—giving urban workers an ideal retreat to breathe and heal.'}
                </p>
              </div>

              {/* Mini spec grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-neutral-100 rounded-sm font-mono text-[10px] text-neutral-500">
                <div>
                  <span className="block text-neutral-400 uppercase font-bold mb-1">PROJECT / 地标</span>
                  <span className="text-neutral-800 font-bold uppercase">{lang === 'cn' ? '复兴公园艺术灯光' : 'Fuxing Park Lighting'}</span>
                </div>
                <div>
                  <span className="block text-neutral-400 uppercase font-bold mb-1">LOCATION / 位置</span>
                  <span className="text-neutral-800 font-bold uppercase">{lang === 'cn' ? '上海 · 黄浦区' : 'Shanghai, China'}</span>
                </div>
                <div>
                  <span className="block text-neutral-400 uppercase font-bold mb-1">METHOD / 手法</span>
                  <span className="text-neutral-800 font-bold uppercase">{lang === 'cn' ? '层叠消隐照明' : 'Recessed Biophilic'}</span>
                </div>
                <div>
                  <span className="block text-neutral-400 uppercase font-bold mb-1">AWARDS / 成果</span>
                  <span className="text-neutral-800 font-bold uppercase">{lang === 'cn' ? '优秀城市光环境提升' : 'Best Nightscape'}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Bespoke Reconstructed Interactive Light Installation Poster */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="text-xs font-mono font-bold tracking-widest text-neutral-400 flex items-center gap-1.5 uppercase">
              <Sparkles size={14} className="text-amber-500" />
              <span>[ LIVING POSTER / 动态海报艺术重现 ]</span>
            </div>

            {/* Magical Glowing Poster Canvas */}
            <div className="relative aspect-[4/5] bg-neutral-950 border border-neutral-800 rounded-sm overflow-hidden flex flex-col justify-between p-8 text-white shadow-xl">
              
              {/* Twinkly and gradient lights background */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#02050f] via-[#09101f] to-[#040c14] z-0" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(20,80,60,0.2),transparent_70%)] z-0" />

              {/* Glowing Warm Moon crescent */}
              <div className="absolute top-[25%] left-[25%] pointer-events-none z-10 transition-transform duration-1000 select-none">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.75, 1, 0.75]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-full bg-amber-100 relative shadow-[0_0_40px_rgba(251,191,36,0.5)] flex items-center justify-center blur-[1px]"
                >
                  {/* Moon shadow overlay to make it crescent */}
                  <div className="absolute w-12 h-12 rounded-full bg-neutral-950 -top-1 -left-2 scale-110" style={{ backgroundColor: '#040b17' }} />
                </motion.div>
              </div>

              {/* Glowing Blue Cyber Sphere representing the Earth-Globe Lamp from Fuxing Park */}
              <div className="absolute top-[32%] right-[22%] pointer-events-none z-10 select-none">
                <motion.div 
                  animate={{ 
                    boxShadow: [
                      '0 0 15px rgba(14,165,233,0.3), inset 0 0 10px rgba(14,165,233,0.3)',
                      '0 0 35px rgba(14,165,233,0.6), inset 0 0 20px rgba(14,165,233,0.5)',
                      '0 0 15px rgba(14,165,233,0.3), inset 0 0 10px rgba(14,165,233,0.3)',
                    ]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="w-14 h-14 rounded-full border border-sky-400/40 relative flex items-center justify-center overflow-hidden bg-sky-950/20"
                >
                  {/* Matrix lines inside sphere */}
                  <div className="absolute inset-0 opacity-40 grid grid-cols-4 grid-rows-4">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="border-[0.5px] border-sky-400/30" />
                    ))}
                  </div>
                  {/* Glowing center */}
                  <div className="w-4 h-4 bg-sky-300 rounded-full blur-[2px]" />
                </motion.div>
                <span className="text-[6px] font-mono block text-sky-400 mt-1.5 text-center tracking-widest opacity-80">[ GLOBE NODE 01 ]</span>
              </div>

              {/* Flying Fireflies Particles overlay */}
              <div className="absolute inset-0 pointer-events-none z-10 select-none">
                {particles.map((p) => (
                  <motion.div
                    key={p.id}
                    animate={{
                      y: ['0%', '-30%', '0%'],
                      opacity: [0.15, 0.85, 0.15],
                    }}
                    transition={{
                      duration: 4 + p.delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: p.delay
                    }}
                    className="absolute w-1 h-1 rounded-full bg-amber-400"
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      transform: `scale(${p.scale})`,
                      boxShadow: '0 0 10px #fbbf24'
                    }}
                  />
                ))}
              </div>

              {/* Decorative Hand-Drawn Stick Figures building light vectors */}
              <div className="absolute bottom-[10%] inset-x-8 h-24 pointer-events-none z-10 select-none">
                <svg viewBox="0 0 400 120" className="w-full h-full text-white/50" fill="none" stroke="currentColor font-light">
                  {/* Ground Line */}
                  <line x1="10" y1="105" x2="390" y2="105" strokeWidth="1.5" strokeDasharray="3 3" />
                  
                  {/* Left figure climbing ladder to moon */}
                  <line x1="50" y1="105" x2="70" y2="35" strokeWidth="1" />
                  <line x1="48" y1="105" x2="68" y2="35" strokeWidth="1" />
                  {/* Rungs */}
                  <line x1="53" y1="95" x2="55" y2="95" />
                  <line x1="56" y1="80" x2="58" y2="80" strokeWidth="1" />
                  <line x1="59" y1="65" x2="61" y2="65" strokeWidth="1" />
                  <line x1="62" y1="50" x2="64" y2="50" strokeWidth="1" />
                  
                  {/* Figure climbing */}
                  <circle cx="63" cy="73" r="3" strokeWidth="1" />
                  <line x1="63" y1="76" x2="63" y2="88" strokeWidth="1" />
                  <line x1="63" y1="80" x2="56" y2="76" strokeWidth="1" />
                  <line x1="63" y1="80" x2="69" y2="76" strokeWidth="1" />
                  <line x1="63" y1="88" x2="58" y2="95" strokeWidth="1" />
                  
                  {/* Middle figures carrying glowing spheres */}
                  {/* Left carried globe */}
                  <circle cx="160" cy="100" r="1.5" strokeWidth="1" />
                  <circle cx="178" cy="95" r="4" strokeWidth="1" className="text-amber-400 animate-pulse" />
                  <line x1="160" y1="101" x2="160" y2="105" />

                  {/* Figure 2 pushing wheelbarrow carrying a mini moon */}
                  {/* Wheelbarrow */}
                  <line x1="220" y1="105" x2="250" y2="100" strokeWidth="1" />
                  <circle cx="250" cy="103" r="2.5" strokeWidth="1" />
                  <rect x="228" y="93" width="16" height="7" strokeWidth="1" />
                  <circle cx="236" cy="88" r="4.5" fill="#fef08a" className="text-amber-300 blur-[0.5px]" />
                  {/* Figure pusher */}
                  <circle cx="214" cy="95" r="3" strokeWidth="1" />
                  <line x1="214" y1="98" x2="218" y2="105" strokeWidth="1" />
                  <line x1="216" y1="101" x2="225" y2="98" strokeWidth="1" />

                  {/* Right figures celebrating below blue globe lamp */}
                  <circle cx="310" cy="97" r="3" strokeWidth="1" />
                  <line x1="310" y1="100" x2="310" y2="105" strokeWidth="1" />
                  <line x1="310" y1="101" x2="304" y2="95" strokeWidth="1" />
                  <line x1="310" y1="101" x2="316" y2="95" strokeWidth="1" />

                  <circle cx="330" cy="94" r="3" strokeWidth="1" />
                  <line x1="330" y1="97" x2="330" y2="105" strokeWidth="1" />
                  <line x1="330" y1="99" x2="324" y2="91" strokeWidth="1" />
                  <line x1="330" y1="99" x2="336" y2="91" strokeWidth="1" />
                </svg>
              </div>

              {/* Poster Header */}
              <div className="relative z-10 flex flex-col items-center text-center mt-4">
                <span className="text-[9px] font-mono tracking-[0.3em] text-white/50 uppercase block mb-1">
                  [ RDI EXCLUSIVE ANNOUNCEMENT // 艺术灯光企划 ]
                </span>
                <span className="w-10 h-[1px] bg-white/25" />
              </div>

              {/* Poster Slogan Center */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto pt-6">
                
                {/* Vertical display of artistic slogan */}
                <h3 className="text-lg md:text-xl font-light tracking-[0.5em] leading-[2] text-center uppercase text-amber-50">
                  每一份努力
                  <br />
                  都让世界更美
                </h3>
                
                <span className="text-[10px] font-mono tracking-[0.4em] bg-white text-black px-4 py-1.5 font-bold uppercase mt-8 select-none shadow-lg">
                  五一劳动节 · LABOR DAY
                </span>
              </div>

              {/* Poster Footer Info */}
              <div className="relative z-10 border-t border-white/10 pt-4 flex justify-between items-end text-[10px] font-mono text-white/55">
                <div>
                  <span className="text-white block font-bold tracking-wide uppercase">
                    上海复兴公园艺术灯光提升
                  </span>
                  <span className="text-white/40 block text-[8px] uppercase tracking-wider mt-0.5">
                    Fuxing Park Nightscape Art Upgrade
                  </span>
                </div>
                <div className="text-white font-black text-xs lowercase select-none">
                  rdi.
                </div>
              </div>

            </div>

            {/* Quick Interactive Tool bar modeled after standard PDF footer */}
            <div className="bg-white border border-neutral-200 p-6 rounded-sm space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase font-black block">[ READER REACTIONS // 双向互动 ]</span>
              
              <div className="grid grid-cols-3 gap-2 text-center">
                
                {/* Like */}
                <button 
                  onClick={handleToggleLike}
                  className={`py-3 px-2 border rounded-sm flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${isLiked ? 'bg-rose-50 text-rose-600 border-rose-200' : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-500 hover:text-black'}`}
                >
                  <Heart size={14} fill={isLiked ? "currentColor" : "none"} className={isLiked ? 'animate-bounce' : ''} />
                  <span className="text-[11px] font-bold block">{lang === 'cn' ? (isLiked ? '已致敬' : '送花致敬') : (isLiked ? 'Saluted' : 'Salute')}</span>
                  <span className="text-[9px] font-mono opacity-60 block">({likesCount})</span>
                </button>

                {/* Star Favorite */}
                <button 
                  onClick={handleToggleStar}
                  className={`py-3 px-2 border rounded-sm flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${isStarred ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-500 hover:text-black'}`}
                >
                  <Star size={14} fill={isStarred ? "currentColor" : "none"} />
                  <span className="text-[11px] font-bold block">{lang === 'cn' ? '珍藏' : 'Favorite'}</span>
                  <span className="text-[9px] font-mono opacity-60 block">({starsCount})</span>
                </button>

                {/* Share Link */}
                <button 
                  onClick={handleShare}
                  className={`py-3 px-2 border rounded-sm flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer relative ${shareFeedback ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-neutral-50 hover:bg-neutral-100 border-neutral-200 text-neutral-500 hover:text-black'}`}
                >
                  {shareFeedback ? <Check size={14} /> : <Share2 size={14} />}
                  <span className="text-[11px] font-bold block">{lang === 'cn' ? (shareFeedback ? '链接已拷贝' : '一键分享') : (shareFeedback ? 'Copied' : 'Share Link')}</span>
                  <span className="text-[9px] font-mono opacity-60 block">[ Portal ]</span>
                </button>

              </div>
            </div>

          </div>

        </div>

        {/* Dynamic Guestbook Wishing Board */}
        <section className="border-t border-neutral-200 pt-16 max-w-4xl mx-auto mb-20 space-y-10">
          
          <div className="text-center space-y-2">
            <MessageSquare size={24} className="text-amber-500 mx-auto animate-pulse" />
            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-widest text-[#111]">
              {lang === 'cn' ? '留言愿景录 ｜ 送上你的节日温馨祝福' : 'HOLIDAY WISHES BOARD // GUESTBOOK'}
            </h3>
            <p className="text-xs text-neutral-400 font-light max-w-md mx-auto leading-relaxed">
              {lang === 'cn' 
                ? '每一声轻声问候与诚意点赞，都在以温软光芒守护彼此的奋斗。提交您的诚挚寄语，向设计团队致意。' 
                : 'Your gentle wishes acts as glowing warmth protecting our community. Submit your comment, salute the creators.'}
            </p>
          </div>

          {/* Preset Buttons for easy selection */}
          <div className="space-y-3">
            <span className="text-[10px] font-mono text-neutral-400 block tracking-wider uppercase font-bold text-center">
              {lang === 'cn' ? '— 快捷导入精美预设祝词 —' : '— TAP TO AUTO-COPY EXPRESS WISHES —'}
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              {(lang === 'cn' ? PRESET_WISHES_CN : PRESET_WISHES_EN).map((wish, idx) => (
                <button
                  key={idx}
                  onClick={() => selectPreset(idx)}
                  className={`px-3 py-1.5 text-[10px] uppercase transition-all rounded-full text-left font-light border tracking-wide cursor-pointer ${selectedPreset === idx ? 'bg-amber-500 text-black border-amber-400 font-bold' : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-600'}`}
                >
                  "{wish.length > 25 ? wish.substring(0, 25) + '...' : wish}"
                </button>
              ))}
            </div>
          </div>

          {/* Form to post a Wish */}
          <div className="bg-white border border-neutral-200 p-6 md:p-8 rounded-sm shadow-sm">
            <form onSubmit={handleWishSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-1">
                  <input
                    type="text"
                    placeholder={lang === 'cn' ? "您的称呼" : "Your name"}
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-200 text-xs px-4 py-3 focus:outline-none focus:border-amber-400 focus:bg-white text-neutral-800 font-mono"
                  />
                </div>
                <div className="sm:col-span-3 flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder={lang === 'cn' ? "留下您的温馨节日寄语..." : "Type your warm holiday wishes here..."}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 bg-neutral-50 border border-neutral-200 text-xs px-4 py-3 focus:outline-none focus:border-amber-400 focus:bg-white text-neutral-800"
                  />
                  <button
                    type="submit"
                    className="bg-black hover:bg-neutral-800 text-white px-5 py-3 text-xs uppercase font-mono font-bold tracking-widest flex items-center gap-2 transition-all shrink-0 cursor-pointer"
                  >
                    <Send size={12} />
                    <span>{lang === 'cn' ? '投递' : 'POST'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* List of Posted Wishes */}
          <div className="space-y-4">
            <div className="flex justify-between items-baseline border-b border-neutral-200 pb-2">
              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                [ WISHLIST FEEDS ｜ 共有 {wishes.length} 条心愿寄语 ]
              </span>
              <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                <Clock size={10} />
                <span>REALTIME CHRONICLE</span>
              </span>
            </div>

            <div className="space-y-3.5">
              <AnimatePresence initial={false}>
                {wishes.map((w) => (
                  <motion.div
                    key={w.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                    className="p-5 bg-white border border-neutral-200/65 rounded-sm flex justify-between items-start gap-4 hover:border-neutral-300 transition-colors"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-neutral-900 font-mono uppercase bg-neutral-100 px-1.5 py-0.5 rounded-sm">{w.name}</span>
                        <span className="text-[9px] font-mono text-neutral-400">{w.timestamp}</span>
                      </div>
                      <p className="text-xs text-neutral-700 leading-relaxed font-light">{w.text}</p>
                    </div>

                    <button
                      onClick={() => toggleLikeWish(w.id)}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-sm transition-all border shrink-0 ${w.hasLiked ? 'bg-rose-50 text-rose-600 border-rose-100 scale-105' : 'text-neutral-400 border-transparent hover:border-neutral-200 hover:text-black'}`}
                    >
                      <ThumbsUp size={11} fill={w.hasLiked ? "currentColor" : "none"} />
                      <span className="text-[9px] font-mono font-bold">{w.likes}</span>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

        </section>

        {/* Outer bottom View All/Back button */}
        <footer className="border-t border-neutral-200 pt-12 text-center select-none">
          <Link 
            to="/news" 
            className="text-xs font-bold uppercase tracking-[0.4em] text-neutral-800 hover:text-black hover:tracking-[0.6em] transition-all"
          >
            {lang === 'cn' ? '查看更多新闻动态' : 'VIEW ALL NEWS'}
          </Link>
        </footer>

      </article>

    </div>
  );
}
