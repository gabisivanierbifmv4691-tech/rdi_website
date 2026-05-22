import React from 'react';
import { Link } from 'react-router-dom';
import type { Language } from '../App';
import { useProjects } from '../context/ProjectContext';
import { 
  XiaohongshuIcon, 
  TikTokIcon, 
  WeChatIcon, 
  YoutubeIcon, 
  BilibiliIcon, 
  FacebookIcon, 
  InstagramIcon, 
  LinkedinIcon 
} from './SocialIcons';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const { homeConfig } = useProjects();

  const getSocialIcon = (key: string, DefaultComponent: React.ComponentType<any>) => {
    const url = homeConfig?.icons?.[key];
    if (url) {
      return (
        <img 
          src={url} 
          alt={key} 
          className="w-5 h-5 object-contain invert opacity-30 hover:opacity-100 transition-opacity"
          referrerPolicy="no-referrer"
        />
      );
    }
    return <DefaultComponent size={20} />;
  };

  const content = {
    company: lang === 'cn' ? 'RDI瑞国际照明设计' : 'RDESIGN INTERNATIONAL LIGHTING',
    links: lang === 'cn' 
      ? [
          { name: '联络我们', link: '/contact' },
          { name: '加入我们', link: '/join' },
          { name: '隐私政策', link: '/privacy' },
          { name: '法律声明', link: '/imprint' },
        ]
      : [
          { name: 'CONTACT', link: '/contact' },
          { name: 'JOIN US', link: '/join' },
          { name: 'PRIVACY POLICY', link: '/privacy' },
          { name: 'IMPRINT', link: '/imprint' },
        ],
    copy: lang === 'cn' ? '© 2026 RDI瑞照明国际照明设计. 版权所有.' : '© 2026 RDESIGN LIGHTING. ALL RIGHTS RESERVED.',
  };

  return (
    <footer className="bg-[#111111] text-white py-20 px-8">
      <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-12 text-center">
        <h2 className="text-[23px] md:text-[27px] font-light tracking-[0.2em] uppercase max-w-lg">
          {content.company}
        </h2>
        
        <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-12 gap-y-4 text-[11px] md:text-[13px] font-bold uppercase tracking-[0.15em] md:tracking-[0.3em] text-white/50 w-full px-4">
          {content.links.map(link => (
            link.link.startsWith('/') ? (
              <Link key={link.name} to={link.link} className="hover:text-white transition-colors">
                {link.name}
              </Link>
            ) : (
              <a key={link.name} href={link.link} className="hover:text-white transition-colors">
                {link.name}
              </a>
            )
          ))}
        </div>

        <div className="flex gap-6 text-white/30">
          <a href="#" className="hover:text-white transition-colors">{getSocialIcon('wechat', WeChatIcon)}</a>
          <a href="#" className="hover:text-white transition-colors">{getSocialIcon('tiktok', TikTokIcon)}</a>
          <a href="#" className="hover:text-white transition-colors">{getSocialIcon('rednote', XiaohongshuIcon)}</a>
          <a href="#" className="hover:text-white transition-colors">{getSocialIcon('bilibili', BilibiliIcon)}</a>
          <a href="#" className="hover:text-white transition-colors">{getSocialIcon('instagram', InstagramIcon)}</a>
          <a href="#" className="hover:text-white transition-colors">{getSocialIcon('facebook', FacebookIcon)}</a>
          <a href="#" className="hover:text-white transition-colors">{getSocialIcon('linkedin', LinkedinIcon)}</a>
          <a href="#" className="hover:text-white transition-colors">{getSocialIcon('youtube', YoutubeIcon)}</a>
        </div>
        
        <div className="text-[11px] uppercase tracking-[0.4em] text-white/20 mt-8">
          {content.copy}
        </div>
      </div>
    </footer>
  );
}
