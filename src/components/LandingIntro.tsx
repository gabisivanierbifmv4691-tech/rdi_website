import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LandingIntroProps {
  onComplete: () => void;
}

type IntroStage = 'dot-breathing' | 'expanding' | 'logo-fly' | 'done';

export default function LandingIntro({ onComplete }: LandingIntroProps) {
  const [stage, setStage] = useState<IntroStage>('dot-breathing');
  const [coords, setCoords] = useState<{
    start: { left: number; top: number; width: number; height: number };
    end: { left: number; top: number; width: number; height: number };
  } | null>(null);
  const [isTargetInverted, setIsTargetInverted] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive dimensions for logo
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const finalLogoWidth = isMobile ? 150 : 220;
  const finalLogoHeight = isMobile ? 45 : 66;

  useEffect(() => {
    // 1. Gentle silent breathing stage for 4.2 seconds (two full, 2.1s breath cycles)
    const breathingTimeout = setTimeout(() => {
      setStage('expanding');
    }, 4200);

    return () => clearTimeout(breathingTimeout);
  }, []);

  useEffect(() => {
    if (stage === 'expanding') {
      // 2. Black dot expands (1.4s), white logo reveals and stabilizes
      const expandTimeout = setTimeout(() => {
        // Calculate flight bounds
        const start = {
          left: window.innerWidth / 2 - finalLogoWidth / 2,
          top: window.innerHeight / 2 - finalLogoHeight / 2,
          width: finalLogoWidth,
          height: finalLogoHeight,
        };

        const targetEl = document.getElementById('header-logo-container');
        let end = { left: 48, top: 18, width: 120, height: 36 };
        let targetInverted = true;

        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            end = {
              left: rect.left,
              top: rect.top,
              width: rect.width,
              height: rect.height,
            };
          }
          const img = targetEl.querySelector('img');
          if (img) {
            targetInverted = img.classList.contains('invert');
          }
        }

        setIsTargetInverted(targetInverted);
        setCoords({ start, end });
        setStage('logo-fly');
      }, 1400);

      return () => clearTimeout(expandTimeout);
    }
  }, [stage, finalLogoWidth, finalLogoHeight]);

  useEffect(() => {
    if (stage === 'logo-fly') {
      // 3. Smooth cinematic flight (1.2s)
      const flyTimeout = setTimeout(() => {
        setStage('done');
        onComplete();
      }, 1200);

      return () => clearTimeout(flyTimeout);
    }
  }, [stage, onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <div ref={containerRef} className="fixed inset-0 z-[9995] select-none pointer-events-none">
          {/* Main solid white canvas background (Stage 1 & 2) */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{
              opacity: stage === 'logo-fly' ? 0 : 1
            }}
            transition={{ duration: 0.1 }}
            className="absolute inset-0 bg-white z-0 pointer-events-none"
          />

          {/* Pure Black background during Stage 3 (fading out smoothly override) */}
          {stage === 'logo-fly' && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="absolute inset-0 bg-black z-10 pointer-events-none"
            />
          )}

          {/* Centered actions container */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            {/* Stage 1: Quiet breathing central black dot (no shadow, perfectly minimal) */}
            {stage === 'dot-breathing' && (
              <motion.div
                initial={{ scale: 0.75 }}
                animate={{
                  scale: [0.75, 1.25, 0.75],
                }}
                transition={{
                  duration: 2.1, // exactly 2 full breaths in 4.2 seconds
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-2.5 h-2.5 bg-black rounded-full"
              />
            )}

            {/* Stage 2: Black dot expands directly to cover screen & White Logo scaling up inside */}
            {stage === 'expanding' && (
              <div className="relative flex items-center justify-center w-full h-full">
                {/* Expanding Black Circular Backdrop - expanding from dot size (10px) to cover screen */}
                <motion.div
                  initial={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                  }}
                  animate={{
                    width: '350vmax',
                    height: '350vmax',
                  }}
                  transition={{
                    duration: 1.4,
                    ease: [0.76, 0, 0.24, 1], // highly fluid cinematic ease-in-out
                  }}
                  className="bg-black flex items-center justify-center rounded-full absolute"
                />

                {/* White RDI logo scaling up inside the widening black circle */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.9, // scaling RDI logo stabilizes before black expands fully
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    width: finalLogoWidth,
                    height: finalLogoHeight,
                  }}
                  className="relative z-30 flex items-center justify-center"
                >
                  <img
                    src="https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_logo.svg"
                    alt="RDI Logo"
                    className="w-full h-full object-contain invert brightness-200"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            )}
          </div>

          {/* Stage 3: Cinematic Smooth-flying Logo from center-bounds to top-left header */}
          {stage === 'logo-fly' && coords && (
            <motion.div
              initial={{
                left: coords.start.left,
                top: coords.start.top,
                width: coords.start.width,
                height: coords.start.height,
              }}
              animate={{
                left: coords.end.left,
                top: coords.end.top,
                width: coords.end.width,
                height: coords.end.height,
              }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="fixed z-[9999] pointer-events-none flex items-center justify-center"
            >
              {/* Transition the logo color from pure white to the target state color */}
              <motion.img
                initial={{ filter: 'invert(1) brightness(2)' }}
                animate={{
                  filter: isTargetInverted ? 'invert(1) brightness(2)' : 'invert(0) brightness(1)'
                }}
                transition={{ duration: 1.0, ease: 'easeInOut' }}
                src="https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_logo.svg"
                alt="RDI Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
