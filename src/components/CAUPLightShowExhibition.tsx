import { useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Calendar, MapPin, Ticket, Sparkles, Check, 
  Heart, Sliders, Play, Pause, RefreshCw, Layers, Users, ShieldAlert, Award, Zap, Library
} from 'lucide-react';
import type { Language } from '../App';

interface CAUPLightShowProps {
  lang: Language;
}

interface StudentProject {
  id: string;
  titleCN: string;
  titleEN: string;
  categoryCN: string;
  categoryEN: string;
  baseLikes: number;
  hue: number;
  speed: 'slow' | 'medium' | 'fast';
  mode: 'ripple' | 'pulse' | 'flow' | 'matrix';
  descriptionCN: string;
  descriptionEN: string;
  techCN: string;
  techEN: string;
}

const PROJECTS: StudentProject[] = [
  {
    id: '1',
    titleCN: '《The Waltzing Cat 跳华尔兹的猫》',
    titleEN: '《The Waltzing Cat》',
    categoryCN: '3D Mapping 投影 / 动作捕捉',
    categoryEN: '3D Mapping / Motion Capture',
    baseLikes: 11,
    hue: 275,
    speed: 'medium',
    mode: 'flow',
    descriptionCN: '抽象的猫咪伴侣在3D Mapping投影中起舞，流动的轨迹伴随音乐展现温暖柔和的姿态。',
    descriptionEN: 'An abstract feline companion dancing in a 3D mapping projection, tracing elegant light trails in step with the music.',
    techCN: '3D Mapping / 骨骼姿态传感器 / Unity开发',
    techEN: '3D Mapping / Skeleton Joints Sensor / Unity Runtime'
  },
  {
    id: '2',
    titleCN: '《The Resonant Epic 史诗余响》',
    titleEN: '《The Resonant Epic》',
    categoryCN: '非线性声学 / 激光流体',
    categoryEN: 'Nonlinear Acoustics / Laser Fluids',
    baseLikes: 10,
    hue: 150,
    speed: 'slow',
    mode: 'pulse',
    descriptionCN: '管弦乐交织与高对比度激光交错起伏，光束随着古老建筑钟声产生共鸣起伏。',
    descriptionEN: 'Orchestral acoustics matched with high-contrast laser fluid flows, resonating deep within the physical arches of CAUP.',
    techCN: '激光散射板 / 多声道音画合成器',
    techEN: 'Scatter Wave Plates / Multi-channel Audio Assembler'
  },
  {
    id: '3',
    titleCN: '《Urban population big data 城市人口大数据》',
    titleEN: '《Urban Population Big Data》',
    categoryCN: '高维数据可视化 / LED点阵',
    categoryEN: 'Dynamic Data Viz / LED Dot Matrix',
    baseLikes: 13,
    hue: 15,
    speed: 'fast',
    mode: 'matrix',
    descriptionCN: '实时将上海大都市核心区域的移动客流热力，转化为起伏的橙红色数字点阵波。',
    descriptionEN: 'Translating real-time mobile population density metrics of metropolitan Shanghai into kinetic amber-red grids.',
    techCN: 'API实时热力抓取 / SPI控制点阵控制协议',
    techEN: 'API Live Data Streams / SPI Dot Matrix Protocol'
  },
  {
    id: '4',
    titleCN: '《Through the Eyes of the Zodiac 十二生肖异瞳视界》',
    titleEN: '《Through the Eyes of the Zodiac》',
    categoryCN: '人工神经网络 / 生物演化模拟',
    categoryEN: 'Artificial Neural Network / Biomorphic Sim',
    baseLikes: 12,
    hue: 190,
    speed: 'medium',
    mode: 'ripple',
    descriptionCN: '在宏大画幅上复刻不同动物视网膜的红绿紫单色感知矩阵，展现非人类的光影感官。',
    descriptionEN: 'Simulating the non-human responsive color-spectrum matrices through simulated biological retinal filters.',
    techCN: 'Stable Diffusion 瞬态转译 / 边缘传感器',
    techEN: 'Stable Diffusion Latent Translation / Boundary Array'
  },
  {
    id: '5',
    titleCN: '《Rhythm Health 律动健康》',
    titleEN: '《Rhythm Health》',
    categoryCN: '生物肌电信号 / 呼吸舒缓装置',
    categoryEN: 'Bio-feedback Signal / Breathing Aid',
    baseLikes: 13,
    hue: 35,
    speed: 'slow',
    mode: 'pulse',
    descriptionCN: '实时捕捉现场观众的脉搏跳动，生成平缓温润的金黄色光芒微波，倡导光与身心协调。',
    descriptionEN: 'Capturing live heart rate telemetry to project synchronous golden ripples, promoting physical-mental light therapy.',
    techCN: '心率脉搏贴片 / Arduino数据转换 / DMX512变色灯具',
    techEN: 'Photoplethysmography / Arduino Converter / DMX512 Fixtures'
  },
  {
    id: '6',
    titleCN: '《Green Apple Paradise 青苹果乐园粒子光影舞蹈秀》',
    titleEN: '《Green Apple Paradise》',
    categoryCN: '流体粒子动力学 / 多模感知交互',
    categoryEN: 'Fluid Dynamics / Multi-modal Interaction',
    baseLikes: 10,
    hue: 85,
    speed: 'fast',
    mode: 'flow',
    descriptionCN: '青绿色的数字粒子围绕投影立面翻滚起伏，随着舞者的肢体轨迹留下大片流星雨般的炫绿光幕。',
    descriptionEN: 'A swirling constellation of lime-green particles on the brick facade tracking dynamic choreography in real-time.',
    techCN: 'Kinect 姿态数据流 / Fluid Core 粒子物理引擎',
    techEN: 'Kinect Spatial Stream / Fluid Core Physics Engine'
  },
  {
    id: '7',
    titleCN: '《Frequency Resonance 频率共振——基于MIDI实时信号》',
    titleEN: '《Frequency Resonance - MIDI Interactive》',
    categoryCN: 'MIDI声控触发 / 同步泛光映射',
    categoryEN: 'MIDI Audio Trigger / Synchronous Ambient',
    baseLikes: 10,
    hue: 325,
    speed: 'fast',
    mode: 'matrix',
    descriptionCN: '声音发生的每一个高低音频点变动，将瞬间引发红蓝紫激光光谱在红楼表面的精确爆破。',
    descriptionEN: 'Every frequency transition triggers real-time visual transient explosions of violet and cyan neon bands.',
    techCN: 'MIDI实时音频解码 / 投影图层掩膜映射',
    techEN: 'MIDI Audio Decoding / Projection Mapping Masks'
  },
  {
    id: '8',
    titleCN: '《Emotion in Motion 心结流转》',
    titleEN: '《Emotion In Motion》',
    categoryCN: '脑电波（EEG）读取 / 情绪流体渲染',
    categoryEN: 'EEG Sensing / Mental Fluid Rendering',
    baseLikes: 14,
    hue: 345,
    speed: 'medium',
    mode: 'ripple',
    descriptionCN: '读取观众即时情绪状态并转化为流动的极光色色彩，展示情绪张力向物理空间的外溢。',
    descriptionEN: 'Translating real-time EEG brain telemetry into glowing northern-light vectors of cognitive tension.',
    techCN: '脑电波电极头戴设备 / Processing流体运算引擎',
    techEN: 'Wireless EEG Headband / Processing Fluidic Solver'
  },
  {
    id: '9',
    titleCN: '《Breath of the Ice 冰原的呼吸》',
    titleEN: '《Breath of the Ice》',
    categoryCN: '低频数字正弦波 / 极光生态透射',
    categoryEN: 'Low-Frequency Sine Waves / Glacial Projection',
    baseLikes: 8,
    hue: 205,
    speed: 'slow',
    mode: 'pulse',
    descriptionCN: '深邃的冰蓝色极地波形以极低速度潮汐般律动，无声呼吁应对温室效应带来的极地融化危机。',
    descriptionEN: 'Deep glacial cyan waves moving in tide-like rhythms, a haunting projection protest on Arctic ice retreat.',
    techCN: '极地监测气温数据集 / LFO低频振荡声光同步',
    techEN: 'Polar Temperature Datasets / LFO Ambient Synced Oscillators'
  }
];

export default function CAUPLightShowExhibition({ lang }: CAUPLightShowProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('5'); // default to Rhythm Health
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [brightness, setBrightness] = useState<number>(85);
  const [waveSpeed, setWaveSpeed] = useState<number>(50);
  const [waveMode, setWaveMode] = useState<'ripple' | 'pulse' | 'flow' | 'matrix'>('pulse');
  const [hueOverride, setHueOverride] = useState<number | null>(null);
  
  // Likes system state
  const [userLikes, setUserLikes] = useState<Record<string, number>>(() => {
    const saved = sessionStorage.getItem('caup_exhibit_likes');
    if (saved) return JSON.parse(saved);
    return {};
  });

  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>(() => {
    const saved = sessionStorage.getItem('caup_exhibit_voted');
    if (saved) return JSON.parse(saved);
    return {};
  });

  // Ticket booking states
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingDate, setBookingDate] = useState('2026-05-22');
  const [bookingSlot, setBookingSlot] = useState<'AM' | 'PM'>('AM');
  const [slotsLeft, setSlotsLeft] = useState(15);
  const [bookedPass, setBookedPass] = useState<{
    reference: string;
    name: string;
    phone: string;
    date: string;
    slot: 'AM' | 'PM';
    timestamp: string;
  } | null>(null);

  // Auto-sync custom settings whenever a project is selected
  const activeProj = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];

  useEffect(() => {
    if (activeProj) {
      setWaveMode(activeProj.mode);
      setWaveSpeed(activeProj.speed === 'slow' ? 25 : activeProj.speed === 'medium' ? 50 : 85);
      setHueOverride(activeProj.hue);
    }
  }, [selectedProjectId]);

  // Handle randomly fluctuating capacity slots
  useEffect(() => {
    const key = `${bookingDate}-${bookingSlot}`;
    let seed = 14;
    for (let i = 0; i < key.length; i++) {
      seed = (seed + key.charCodeAt(i)) % 15;
    }
    setSlotsLeft(seed + 4);
  }, [bookingDate, bookingSlot]);

  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingPhone.trim()) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const passRef = `RDI-CAUP-${bookingDate.replace(/-/g, '')}-${bookingSlot}-${randomSuffix}`;
    
    setBookedPass({
      reference: passRef,
      name: bookingName,
      phone: bookingPhone,
      date: bookingDate,
      slot: bookingSlot,
      timestamp: new Date().toLocaleString()
    });
  };

  const toggleLike = (projId: string) => {
    const nextHasLiked = { ...hasLiked, [projId]: !hasLiked[projId] };
    const voteDiff = nextHasLiked[projId] ? 1 : -1;
    const nextLikes = { ...userLikes, [projId]: (userLikes[projId] || 0) + voteDiff };
    
    setHasLiked(nextHasLiked);
    setUserLikes(nextLikes);
    sessionStorage.setItem('caup_exhibit_likes', JSON.stringify(nextLikes));
    sessionStorage.setItem('caup_exhibit_voted', JSON.stringify(nextHasLiked));
  };

  const activeHue = hueOverride ?? activeProj.hue;

  return (
    <div className="bg-neutral-50 min-h-screen pt-24 pb-20 text-neutral-900 transition-colors duration-500">
      
      {/* Editorial Navigation Top */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 mb-8">
        <Link 
          to="/news" 
          className="group flex items-center gap-3 text-neutral-400 hover:text-black transition-colors inline-flex"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.25em]">
            {lang === 'cn' ? '返回新闻动态' : 'BACK TO PORTAL'}
          </span>
        </Link>
      </div>

      <article className="max-w-[1280px] mx-auto px-6 md:px-12">
        
        {/* Exhibition Editorial Title Header */}
        <header className="py-8 border-b border-neutral-300 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-9">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] bg-black text-white px-2 py-0.5 uppercase">
                  Tongji CAUP
                </span>
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] border border-black px-2 py-0.5 uppercase">
                  UNESCO Day of Light / 国际光日
                </span>
                <span className="text-[10px] font-mono font-bold tracking-[0.25em] bg-teal-500 text-white px-2 py-0.5 uppercase">
                  EXCLUSIVE
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-neutral-950 uppercase leading-tight font-sans">
                {lang === 'cn' 
                  ? '光语无形 智感共生 ｜ 同济CAUP光影秀璀璨闪耀，致敬国际光日' 
                  : 'Formless Light, Intelligent Coexistence | CAUP Lighting Ceremony Commences'}
              </h1>
            </div>
            <div className="lg:col-span-3 text-left lg:text-right">
              <p className="text-[10px] text-neutral-400 font-mono tracking-wider mb-1">DESIGN EVENT RELEASE</p>
              <p className="text-sm font-bold text-neutral-900 font-mono">2026.05.15 // SHANGHAI / 同济红楼</p>
            </div>
          </div>
        </header>

        {/* Dynamic Abstract Interactive Lighting Simulator Canvas */}
        <section className="mb-16">
          <div className="text-xs font-mono font-bold tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
            <Zap size={14} className="text-amber-500 animate-pulse" />
            <span>[ STAGE SIMULATOR / 同济红楼钟庭光影现场仿真 ]</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-neutral-950 p-6 md:p-8 rounded-sm overflow-hidden relative border border-neutral-800">
            {/* Ambient overlay shadows */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,0,0,0)_20%,rgba(0,0,0,0.85))] pointer-events-none" />

            {/* Left side: The Generative Live Preview Window representing the Red Building Courtyard */}
            <div className="lg:col-span-8 flex flex-col justify-between aspect-[16/10] min-h-[320px] bg-neutral-900 border border-neutral-800 rounded-sm relative p-6 overflow-hidden">
              
              {/* Matrix Background Grids */}
              <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
                <div className="w-full h-full" style={{
                  backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }} />
              </div>

              {/* LIVE LIGHTING EMISSION NODE GRID */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                
                {/* Simulated Red Building Arch Backdrop */}
                <div className="w-[85%] h-[80%] border-t-8 border-x-4 border-white/5 rounded-t-[120px] absolute top-[10%] flex flex-col justify-end p-4">
                  <div className="w-full h-[60%] border-t-2 border-x-2 border-white/5 rounded-t-[80px] relative flex items-center justify-center">
                    
                    {/* Centered Clocktower dial from CAUP Red Building */}
                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center relative bg-neutral-900/60 shadow-lg">
                      <div className="w-2 h-2 rounded-full bg-white/30" />
                      <div className="absolute top-1" style={{ width: '1px', height: '26px', backgroundColor: 'rgba(255,255,255,0.4)', transformOrigin: 'bottom', transform: 'rotate(45deg)' }} />
                      <div className="absolute top-2" style={{ width: '1px', height: '20px', backgroundColor: 'rgba(255,255,255,0.6)', transformOrigin: 'bottom', transform: 'rotate(190deg)' }} />
                    </div>

                    {/* Clock text label */}
                    <span className="absolute bottom-3 text-[8px] font-mono text-neutral-500 tracking-widest">[ CAUP 2026 ]</span>
                  </div>
                  <div className="w-full h-[30%] grid grid-cols-4 gap-2 opacity-20">
                    <div className="border border-white/10 rounded-t-sm" />
                    <div className="border border-white/10 rounded-t-sm" />
                    <div className="border border-white/10 rounded-t-sm" />
                    <div className="border border-white/10 rounded-t-sm" />
                  </div>
                </div>

                {/* Generative Lighting Render Core */}
                <AnimatePresence mode="wait">
                  {isPlaying && (
                    <motion.div 
                      key={`${selectedProjectId}-${waveMode}-${waveSpeed}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center z-0"
                    >
                      {/* Active generative lighting effects depending on mode */}
                      {waveMode === 'ripple' && (
                        <>
                          <motion.div 
                            animate={{ scale: [1, 3.2], opacity: [0, 0.5 * (brightness / 100), 0] }}
                            transition={{ duration: 4.5 * (100 / waveSpeed), repeat: Infinity, ease: 'easeOut' }}
                            className="absolute w-44 h-44 rounded-full"
                            style={{ border: `3px double hsl(${activeHue}, 100%, 60%)`, filter: 'blur(3px)' }}
                          />
                          <motion.div 
                            animate={{ scale: [0.5, 2.2], opacity: [0, 0.4 * (brightness / 100), 0] }}
                            transition={{ duration: 4.5 * (100 / waveSpeed), delay: 1.5, repeat: Infinity, ease: 'easeOut' }}
                            className="absolute w-44 h-44 rounded-full"
                            style={{ border: `2px solid hsl(${activeHue}, 90%, 55%)`, filter: 'blur(6px)' }}
                          />
                          <div 
                            className="absolute w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
                            style={{ background: `radial-gradient(circle, hsl(${activeHue}, 100%, 55%) 0%, transparent 70%)` }}
                          />
                        </>
                      )}

                      {waveMode === 'pulse' && (
                        <motion.div 
                          animate={{ scale: [0.95, 1.15, 0.95], opacity: [0.2, 0.7 * (brightness / 100), 0.2] }}
                          transition={{ duration: 3.5 * (100 / waveSpeed), repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute w-[80%] h-[75%] rounded-lg blur-2xl"
                          style={{
                            background: `radial-gradient(ellipse, hsl(${activeHue}, 100%, 50%) 0%, transparent 75%)`
                          }}
                        />
                      )}

                      {waveMode === 'flow' && (
                        <div className="absolute inset-0 flex justify-between px-12 overflow-hidden">
                          {[1, 2, 3, 4, 5].map((idx) => (
                            <motion.div
                              key={idx}
                              animate={{ y: ['-120%', '220%'], opacity: [0, 0.7 * (brightness / 100), 0] }}
                              transition={{ duration: (4 + idx) * (100 / waveSpeed), repeat: Infinity, ease: 'linear', delay: idx * 0.4 }}
                              className="w-1.5 h-36 blur-[3px]"
                              style={{
                                background: `linear-gradient(to bottom, transparent, hsl(${activeHue}, 100%, 65%), transparent)`,
                                filter: 'drop-shadow(0 0 8px hsl(${activeHue}, 100%, 50%))'
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {waveMode === 'matrix' && (
                        <div className="absolute inset-0 grid grid-cols-12 gap-1 p-8 opacity-40">
                          {Array.from({ length: 96 }).map((_, idx) => (
                            <motion.div
                              key={idx}
                              animate={{ 
                                opacity: [0.1, 0.9 * (brightness / 100), 0.1], 
                                scale: [0.95, 1.15, 0.95] 
                              }}
                              transition={{ 
                                duration: 1.5 + (idx % 4) * 0.4, 
                                repeat: Infinity, 
                                ease: 'easeInOut',
                                delay: (idx % 7) * 0.2
                              }}
                              className="aspect-square w-2 rounded-full"
                              style={{ backgroundColor: `hsl(${activeHue}, 100%, 55%)` }}
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status Header Overlay */}
              <div className="flex justify-between items-start text-[9px] font-mono text-neutral-400 relative z-20">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                  <span>[ SYSTEM STATUS: {isPlaying ? 'RENDER ACTIVE / 实时光感输出中' : 'PAUSED / 静态待机'} ]</span>
                </div>
                <div>SEC_R_02026_MAY11</div>
              </div>

              {/* Footer text Overlay inside simulator */}
              <div className="relative z-20 mt-auto pt-6 border-t border-white/5 flex flex-wrap gap-4 items-end justify-between text-neutral-400 text-[10px] font-mono">
                <div>
                  <span className="text-white font-mono block mb-0.5 uppercase tracking-wide">
                    {lang === 'cn' ? activeProj.titleCN : activeProj.titleEN}
                  </span>
                  <span className="text-neutral-500 block">
                    CODE: {activeProj.id.padStart(2, '0')} // HUE: {activeHue}° // {lang === 'cn' ? activeProj.categoryCN : activeProj.categoryEN}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-amber-500">[ MOD: {waveMode.toUpperCase()} ]</span>
                  <span className="text-neutral-500">SPD: {waveSpeed}%</span>
                </div>
              </div>
            </div>

            {/* Right side: Real-time Generative Control Panel */}
            <div className="lg:col-span-4 bg-neutral-900 border border-neutral-800 p-6 flex flex-col justify-between text-white relative z-10 font-mono">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-500">[ PRESET DESK 控制面板 ]</span>
                  <div className="flex gap-1.5">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1 rounded-sm bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
                      title={isPlaying ? 'Pause simulation' : 'Play simulation'}
                    >
                      {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedProjectId('5');
                        setBrightness(85);
                        setWaveSpeed(50);
                        setHueOverride(null);
                      }}
                      className="p-1 rounded-sm bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 transition-colors"
                      title="Reset parameters"
                    >
                      <RefreshCw size={12} />
                    </button>
                  </div>
                </div>

                {/* Slider 1: HUE Override */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-neutral-400 uppercase">
                    <span>Chromatic Spectrum / 色谱偏置</span>
                    <span className="text-amber-500 font-bold">{activeHue}°</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="360" 
                    value={activeHue}
                    onChange={(e) => setHueOverride(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-1 bg-neutral-800 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[8px] text-neutral-600">
                    <span>RED (0°)</span>
                    <span>GREEN (120°)</span>
                    <span>BLUE (240°)</span>
                    <span>PINK (320°)</span>
                  </div>
                </div>

                {/* Slider 2: Speed */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-neutral-400 uppercase">
                    <span>Refresh Rate / 信号频率</span>
                    <span className="text-white font-bold">{waveSpeed} Hz</span>
                  </div>
                  <input 
                    type="range" 
                    min="15" 
                    max="100" 
                    value={waveSpeed}
                    onChange={(e) => setWaveSpeed(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-1 bg-neutral-800 rounded-lg appearance-none"
                  />
                </div>

                {/* Slider 3: Brightness */}
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] text-neutral-400 uppercase">
                    <span>Luminance / 流明辐射度</span>
                    <span className="text-white font-bold">{brightness} lm</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="100" 
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-1 bg-neutral-800 rounded-lg appearance-none"
                  />
                </div>

                {/* Selector: Projection Mode */}
                <div className="space-y-2">
                  <span className="text-[10px] text-neutral-400 uppercase block">Modulation Algorithm / 光学解算模组</span>
                  <div className="grid grid-cols-2 gap-1 text-[9px]">
                    {(['ripple', 'pulse', 'flow', 'matrix'] as const).map(mode => (
                      <button
                        key={mode}
                        onClick={() => setWaveMode(mode)}
                        className={`py-1.5 uppercase rounded-none transition-all ${waveMode === mode ? 'bg-amber-500 text-black font-bold' : 'bg-neutral-800 text-neutral-400 hover:text-white'}`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Interaction prompt */}
              <div className="mt-8 pt-6 border-t border-neutral-800 text-[9px] text-neutral-500 flex gap-1.5 items-start">
                <Sliders size={12} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  {lang === 'cn' 
                    ? '提示：在下方作品列表点击特定作品，可瞬时载入同济学子部署在红楼钟庭的专属参数和定制算法模式！' 
                    : 'Interactive Indicator: Clicking any student portfolio card below directly mounts their custom parameter setup into this live generator.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Descriptive Article Statements */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-8 space-y-8">
            <div className="border-l-2 border-black pl-6 py-2">
              <p className="text-lg md:text-xl font-medium text-neutral-900 leading-relaxed italic block">
                {lang === 'cn' 
                  ? '“数据驱动，交互感知。在光影与数据的碰撞交错中，看见跨学科人居空间实践的重要可能。”'
                  : '“Data-driven, interactive sensing. In the intersection of lighting art and bio-metrics, we discover new boundaries of interdisciplinary space.”'}
              </p>
            </div>

            <div className="text-sm md:text-base text-neutral-700 leading-relaxed font-light space-y-6">
              <p>
                {lang === 'cn'
                  ? '5月11日晚，上海同济大学建筑与城市规划学院（CAUP）标志性的红楼钟庭，化作流光溢彩的奇幻空间。作为联合国教科文组织（UNESCO）“国际光日”的全球注册系列学术展示之一，同济大学2026年建筑物理光环境核心课程作业展示评审活动在此正式璀璨启幕。'
                  : 'On the evening of May 11, the trademark courtyard of Tongji CAUP transformed into an immense aesthetic canvas. Coinciding with the UNESCO International Day of Light, the 2026 core exhibition showcased interactive spatial light solutions engineered by emerging architectural students.'}
              </p>
              <p>
                {lang === 'cn'
                  ? '本次评审展示由建筑物理光学部分的领衔专家郝洛西教授全程进行宏观指导和统筹教学。17个由2024级研究生团队完成的课程设计作品同台呈现。这些作品高度融合了3D Mapping局部立面映射、红外动作捕捉数据流、AI智能艺术创意编程、大数据实景可视化、以及生物电容传感器交互等高维度前沿技术，致力于彻底探索物理结构、光、氛围、环境生态多专业的交织融合。'
                  : 'This extensive exhibition of 17 key works was directed by Professor Luoxi Hao, a prominent academician in architectural lighting science. Students combined advanced technologies like real-time projection mask arrays, skeletal motion telemetry, custom AI generative rendering core, big data algorithms, and biophyiscal capacitive tracking pads.'}
              </p>
            </div>
          </div>

          {/* Distinguished Attendees Quotes Sidebar */}
          <div className="lg:col-span-4 p-6 border-l border-neutral-200 bg-neutral-50/50 space-y-6">
            <h3 className="text-xs font-bold font-mono tracking-widest text-black uppercase border-b border-neutral-300 pb-2 flex gap-1.5 items-center">
              <Library size={14} />
              <span>{lang === 'cn' ? '嘉宾寄语与致辞' : 'SPEECHES & REMARKS'}</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-white border border-neutral-200 rounded-sm">
                <span className="font-bold text-neutral-900 block mb-1">王桢栋 教授 / Prof. Zhengtong Wang</span>
                <span className="text-[10px] text-neutral-400 block mb-2">同济大学建筑与城市规划学院党委书记</span>
                <p className="text-neutral-600 leading-relaxed italic">
                  {lang === 'cn'
                    ? '“建筑物理课程作业已经跨越了传统的公式推导与课本图纸。通过数据驱动和交互感知，我们正在打造属于AI人工智能时代的建筑学新实践教研范式。”'
                    : '“Physical lighting courses have broken past dry equations. Through live data driving and active sensory interactions, we are setting down AI-era pedagogy standards.”'}
                </p>
              </div>

              <div className="p-4 bg-white border border-neutral-200 rounded-sm">
                <span className="font-bold text-neutral-900 block mb-1">袁烽 教授 / Prof. Feng Yuan</span>
                <span className="text-[10px] text-neutral-400 block mb-2">同济大学建筑与城市规划学院院长</span>
                <p className="text-neutral-600 leading-relaxed italic">
                  {lang === 'cn'
                    ? '“17个作品是对光的科学边界的艺术探测。全媒体、全触达。钟庭的夜晚让我们见证了科技、光、管理与空间情感的深度碰撞。”'
                    : '“The works represent creative expansions toward the physical properties of light vectors, showing depth in structural tech, and emotional space.”'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 17 Groups Showcases - Portfolio Grid */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-baseline gap-4 mb-8 border-b border-black pb-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">[ COMPREHENSIVE REVIEWS / 17组作品选粹展示 ]</span>
              <h2 className="text-2xl font-black text-neutral-950 uppercase mt-1">
                {lang === 'cn' ? '光影创作 17组作品璀璨绽放' : '17 Creative Masterpieces of Light'}
              </h2>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">
              * {lang === 'cn' ? '点击“挂接仿真”键加载至中庭控制台，或点击心形投票选出最爱' : 'Click "Link Setup" to run simulation, or click heart to vote'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((proj) => {
              const totalVotes = proj.baseLikes + (userLikes[proj.id] || 0);
              const isLikedByMe = hasLiked[proj.id] || false;
              const isSelected = selectedProjectId === proj.id;

              return (
                <div 
                  key={proj.id} 
                  className={`border p-6 flex flex-col justify-between transition-all duration-300 relative ${isSelected ? 'border-neutral-950 bg-white shadow-md' : 'border-neutral-200 bg-neutral-100/40 hover:bg-white hover:border-neutral-400'}`}
                >
                  <div>
                    {/* Index & Category tag */}
                    <div className="flex justify-between items-center text-[9px] font-mono text-neutral-400 uppercase mb-4">
                      <span>Group {proj.id.padStart(2, '0')} // 第{proj.id}组</span>
                      <span className="text-neutral-500 font-semibold">{lang === 'cn' ? proj.categoryCN : proj.categoryEN}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-neutral-950 tracking-tight leading-snug mb-3">
                      {lang === 'cn' ? proj.titleCN : proj.titleEN}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-neutral-600 leading-relaxed mb-4 line-clamp-3">
                      {lang === 'cn' ? proj.descriptionCN : proj.descriptionEN}
                    </p>

                    {/* Tech tag details */}
                    <div className="pt-3 border-t border-neutral-200 text-[9px] font-mono text-neutral-500 mb-6">
                      <span className="block font-bold mb-1">[ {lang === 'cn' ? '技术架构 / CORE TECH' : 'TECHNICAL SETUP'} ]</span>
                      <span className="text-neutral-700">{lang === 'cn' ? proj.techCN : proj.techEN}</span>
                    </div>
                  </div>

                  {/* Operational actions footer */}
                  <div className="flex justify-between items-center pt-3 border-t border-neutral-200">
                    <button
                      onClick={() => setSelectedProjectId(proj.id)}
                      className={`text-[10px] font-mono font-bold tracking-widest uppercase transition-all px-2.5 py-1 ${isSelected ? 'bg-black text-white' : 'text-neutral-500 hover:text-black hover:bg-neutral-100'}`}
                    >
                      {isSelected 
                        ? (lang === 'cn' ? '● 已挂接仿真' : '● ACTIVE SIM') 
                        : (lang === 'cn' ? '挂接仿真 →' : 'LINK SETUP →')}
                    </button>

                    <button
                      onClick={() => toggleLike(proj.id)}
                      className={`flex items-center gap-1.5 px-2 py-1 transition-all rounded-sm border ${isLikedByMe ? 'bg-red-50 text-red-600 border-red-200 scale-105' : 'text-neutral-500 border-transparent hover:border-neutral-300'}`}
                      title="Vote for group / 点赞投赞成票"
                    >
                      <Heart size={12} fill={isLikedByMe ? 'currentColor' : 'none'} className="shrink-0" />
                      <span className="text-[10px] font-mono font-bold">{totalVotes}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Dynamic Reservation Form section matching RDI pass aesthetics */}
        <section className="mb-24 py-16 px-6 md:px-12 bg-neutral-900 text-white relative border border-transparent rounded-sm overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none select-none" style={{
            backgroundImage: `radial-gradient(ellipse at bottom left, rgba(20,184,166,0.2) 0%, rgba(0,0,0,0) 80%)`
          }} />

          <div className="max-w-[1000px] mx-auto z-10 relative">
            <div className="flex flex-col items-center text-center mb-12">
              <Ticket size={28} className="text-teal-400 mb-4" />
              <h3 className="text-xl md:text-2xl font-light uppercase tracking-widest text-white">
                {lang === 'cn' ? '国际光日第二期・观展与论坛门票申领' : 'UNESCO DAY OF LIGHT - SECOND PHASE RSVP'}
              </h3>
              <div className="w-12 h-[1px] bg-teal-400 mt-3 mb-4" />
              <p className="text-xs text-neutral-400 font-light max-w-xl leading-relaxed">
                {lang === 'cn'
                  ? '鉴于同济红楼钟庭展示引发广泛反响，“光与空间智能环境分论坛”暨第二期室内学术陈列展即将开展。单场次受中庭容量控制限制20名游客。请于下方申请登记以签发生物识别安全数字通行证。'
                  : 'Due to broad academic interest in our CAUP Light Show, tickets for our next round-table symposium and lighting lab tour are now open. Limited to 20 seats per cohort.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
              {/* Form Input Container */}
              <div className="lg:col-span-7 bg-neutral-950 p-6 md:p-8 border border-white/10 flex flex-col justify-between">
                <form onSubmit={handleBookingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold block">NAME / 申请人姓名 *</label>
                      <input 
                        type="text" 
                        required
                        placeholder={lang === 'cn' ? "请输入真实姓名" : "Your full name"}
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/10 text-xs px-4 py-3 focus:outline-none focus:border-teal-400 text-white font-light uppercase tracking-wider rounded-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold block">MOBILE PHONE / 联络电话 *</label>
                      <input 
                        type="tel" 
                        required
                        placeholder={lang === 'cn' ? "请输入联络电话" : "Active mobile line"}
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/10 text-xs px-4 py-3 focus:outline-none focus:border-teal-400 text-white font-mono tracking-wider rounded-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold block">DATE / 观展日期 *</label>
                      <select 
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-neutral-900 border border-white/10 text-xs px-4 py-3 focus:outline-none focus:border-teal-400 text-white tracking-widest rounded-none appearance-none cursor-pointer"
                      >
                        <option value="2026-05-22">2026-05-22 (SYMPOSIUM FRIDAY) / 05月22日</option>
                        <option value="2026-05-23">2026-05-23 (LAB TOUR SATURDAY) / 05月23日</option>
                        <option value="2026-05-24">2026-05-24 (LAB TOUR SUNDAY) / 05月24日</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 font-bold block">SESSION / 自选上午场或下午场 *</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setBookingSlot('AM')}
                          className={`py-3 text-xs font-mono font-bold uppercase transition-colors rounded-none ${bookingSlot === 'AM' ? 'bg-teal-400 text-black' : 'bg-neutral-900 text-neutral-400 hover:text-white'}`}
                        >
                          AM (09:00 - 12:00)
                        </button>
                        <button
                          type="button"
                          onClick={() => setBookingSlot('PM')}
                          className={`py-3 text-xs font-mono font-bold uppercase transition-colors rounded-none ${bookingSlot === 'PM' ? 'bg-teal-400 text-black' : 'bg-neutral-900 text-neutral-400 hover:text-white'}`}
                        >
                          PM (13:30 - 17:00)
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-white/5 text-[10px] font-mono">
                    <div className="flex gap-2 items-center">
                      <span className={`w-2 h-2 rounded-full ${slotsLeft > 5 ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                      <span className="text-neutral-400">
                        {lang === 'cn' ? '该时间段可用名额:' : 'Available Capacity Slots:'}
                      </span>
                      <span className="text-white font-bold">{slotsLeft} / 20</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-black font-bold uppercase tracking-[0.25em] py-4 text-xs hover:bg-neutral-100 transition-all select-none cursor-pointer"
                  >
                    {lang === 'cn' ? '申请申领大会防伪特展门票 →' : 'ACQUIRE EXCLUSIVE DAY OF LIGHT PASS →'}
                  </button>
                </form>
              </div>

              {/* Day of Light Collector Ticket Result View */}
              <div className="lg:col-span-5 h-full flex items-stretch">
                <AnimatePresence mode="wait">
                  {!bookedPass ? (
                    <div className="w-full min-h-[300px] border border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center text-neutral-500 select-none">
                      <Sparkles size={24} className="opacity-40 mb-3 text-teal-400 animate-pulse" />
                      <span className="text-[10px] font-mono uppercase tracking-widest">{lang === 'cn' ? '特展证书：等待申请' : 'WAITING GENERATOR INPUT'}</span>
                      <p className="text-[10px] font-light max-w-xs mt-2 leading-relaxed">
                        {lang === 'cn' ? '完整填写并登录左侧申请人信息，系统将在此处自动装订并签付联名认证特展准入凭据' : 'Your authentic pass preview will generate here immediately.'}
                      </p>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="w-full bg-teal-400 text-neutral-950 p-6 flex flex-col justify-between relative overflow-hidden select-none border border-black rounded-sm"
                    >
                      <div className="absolute top-0 right-0 p-3 bg-black text-teal-400 font-mono text-[8px] tracking-widest font-black uppercase">
                        Lab Tour Pass
                      </div>

                      {/* Header pass */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Award size={16} />
                          <span className="text-[9px] font-mono tracking-widest font-black uppercase">[ UNESCO DAY OF LIGHT ]</span>
                        </div>

                        <div className="border-t border-b border-black/10 py-3 space-y-1.5">
                          <div>
                            <span className="text-[8px] font-mono text-black/50 block tracking-widest uppercase font-bold">REPRESENTATIVE NAME / 参展代表</span>
                            <p className="text-sm font-black uppercase tracking-wider">{bookedPass.name}</p>
                          </div>
                          <div>
                            <span className="text-[8px] font-mono text-black/50 block tracking-widest uppercase font-bold">CONTACT INFO / 联系通路</span>
                            <p className="text-xs font-mono font-bold">{bookedPass.phone}</p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <span className="text-[8px] font-mono text-black/50 block tracking-widest uppercase font-bold">RSVP DATE / 通行日期</span>
                              <p className="text-xs font-mono font-bold">{bookedPass.date}</p>
                            </div>
                            <div>
                              <span className="text-[8px] font-mono text-black/50 block tracking-widest uppercase font-bold">SESSION / 时段控制</span>
                              <p className="text-xs font-mono font-bold uppercase">{bookedPass.slot === 'AM' ? 'Morning / 上午 09:00' : 'Afternoon / 下午 13:30'}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Visual Dot code representing ticket authenticity */}
                      <div className="my-5 flex items-center gap-4 bg-black/5 p-3 border border-black/5 rounded-sm">
                        <div className="w-16 h-16 shrink-0 bg-neutral-950 p-1 rounded-sm">
                          <svg viewBox="0 0 24 24" className="w-full h-full text-teal-400" fill="currentColor">
                            <rect x="1" y="1" width="5" height="5" />
                            <rect x="18" y="1" width="5" height="5" />
                            <rect x="1" y="18" width="5" height="5" />
                            <rect x="10" y="2" width="4" height="4" />
                            <rect x="14" y="14" width="3" height="3" />
                            <rect x="9" y="10" width="6" height="2" />
                            <rect x="18" y="18" width="5" height="5" />
                          </svg>
                        </div>
                        <div className="text-[9px] font-mono leading-relaxed space-y-0.5 text-neutral-900">
                          <div className="font-black">VERIFICATION SIGNED // 申领核批成功</div>
                          <div className="text-black/60 truncate max-w-[170px] font-semibold">{bookedPass.reference}</div>
                          <div className="text-black/50">{bookedPass.timestamp}</div>
                        </div>
                      </div>

                      <div className="border-t border-black/10 pt-3 flex justify-between items-end text-[8px] font-mono text-black/80 font-bold">
                        <div className="flex gap-1 items-center">
                          <Check size={10} />
                          <span>APPROVED BY CAUP + RDI COLLAB</span>
                        </div>
                        <span>2026 INTERNATIONAL DAY OF LIGHT</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* Footer link to lists */}
        <footer className="border-t border-neutral-200 pt-12 text-center select-none font-sans">
          <Link 
            to="/news" 
            className="text-xs font-bold uppercase tracking-[0.4em] text-neutral-800 hover:text-black hover:tracking-[0.6em] transition-all"
          >
            {lang === 'cn' ? '浏览其他行业学术动态' : 'EXPLORE OTHER EVENTS'}
          </Link>
        </footer>

      </article>
    </div>
  );
}
