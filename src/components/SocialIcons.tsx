import React from 'react';

export const WeChatIcon = ({ size = 18, color = 'currentColor' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M8.291 14.739c-.193 0-.381-.019-.57-.038L5.352 16l.51-2.227C4.162 12.639 3 10.96 3 9.07c0-3.328 3.123-6.026 6.974-6.026 3.85 0 6.973 2.698 6.973 6.026 0 3.328-3.123 6.026-6.973 6.026-.237 0-.464-.012-.683-.028-.464.381-1.049.67-1.049.67l.049-.028zm8.932-3.801c.145.244.225.518.225.803 0 1.942-1.894 3.522-4.229 3.522-.444 0-.867-.058-1.258-.164l-1.5 1.071.375-1.636C9.176 13.568 8.3 12.235 8.3 10.741c0-2.611 2.348-4.73 5.246-4.73 2.898 0 5.245 2.119 5.245 4.73l.032.197c.451.246.755.727.755 1.28l-.014.246c0 .4-.18.751-.462.99l.115.503-1.002-.686zM6.98 7.491a.631.631 0 1 1 0 1.261.631.631 0 0 1 0-1.261zm3.896 0a.63.63 0 1 1 0 1.261.63.63 0 0 1 0-1.261zm1.261 4.54a.632.632 0 1 1 0 1.264.632.632 0 0 1 0-1.264zm3.896 0a.631.631 0 1 1 0 1.264.631.631 0 0 1 0-1.264z"/>
  </svg>
);

export const TikTokIcon = ({ size = 18, color = 'currentColor' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12.525.023l-.022.023c0 .24 0 .48 0 .72 0 3.197 1.811 5.97 4.475 7.391V11c-1.314-.06-2.52-.516-3.525-1.272l-.001 7.272a5.5 5.5 0 1 1-5.5-5.5c.205 0 .405.011.602.03V13.5a3.5 3.5 0 1 0-.602 6.97h.001A3.5 3.5 0 0 0 11.5 17v-17h1.025z"/>
  </svg>
);

export const BilibiliIcon = ({ size = 18, color = 'currentColor' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M17.8 19.8l2.1-4.7c.4-1 .1-2.2-.8-2.6-.3-.1-.6-.2-.9-.2h-2.1c-.2-1-.7-1.9-1.4-2.6.7-.7 1.4-1.4 2.1-2.1.7-.7.7-1.8 0-2.5s-1.8-.7-2.5 0c-.7.7-1.4 1.4-2.1 2.1H7.8c-.7-.7-1.4-1.4-2.1-2.1-.7-.7-1.8-.7-2.5 0s-.7 1.8 0 2.5c.7.7 1.4 1.4 2.1 2.1-.7.7-1.2 1.6-1.4 2.6H1.8c-1 0-1.8.8-1.8 1.8 0 .4.1.7.3 1l2.1 4.7c.4 1 1.5 1.5 2.5 1.1h10.4c1 .4 2.1-.1 2.5-1.1zM6.9 14.8c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8.8-1.8 1.8-1.8zm6.2 0c1 0 1.8.8 1.8 1.8s-.8 1.8-1.8 1.8-1.8-.8-1.8-1.8.8-1.8 1.8-1.8z"/>
  </svg>
);

export const XiaohongshuIcon = ({ size = 18, color = 'currentColor' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke={color} strokeWidth="2" />
    <text x="12" y="15" fontSize="8" fontWeight="bold" textAnchor="middle" fill={color} stroke="none" style={{ fontFamily: 'sans-serif' }}>小</text>
  </svg>
);

export const YoutubeIcon = ({ size = 18, color = 'currentColor' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export const FacebookIcon = ({ size = 18, color = 'currentColor' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export const InstagramIcon = ({ size = 18, color = 'currentColor' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const LinkedinIcon = ({ size = 18, color = 'currentColor' }: { size?: number, color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M20.447 20.452h-3.554V15.034c0-1.291-.025-2.952-1.8-2.952-1.802 0-2.078 1.406-2.078 2.859v5.511h-3.556V9h3.413v1.561h.048c.475-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.454C23.205 24 24 23.227 24 22.271V1.729C24 .774 23.205 0 22.225 0z"/>
  </svg>
);
