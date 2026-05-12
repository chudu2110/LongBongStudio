import React from 'react';

export const AnimatedText = ({ text }: { text: string }) => {
  return (
    <div className="relative flex overflow-hidden">
      {/* Top layer */}
      <div className="flex">
        {text.split('').map((char, i) => (
          <span
            key={`top-${i}`}
            className="inline-block group-hover:-translate-y-[120%] transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{ transitionDelay: `${i * 20}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
      {/* Bottom layer */}
      <div className="absolute inset-0 flex" aria-hidden="true">
        {text.split('').map((char, i) => (
          <span
            key={`bottom-${i}`}
            className="inline-block translate-y-[120%] group-hover:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
            style={{ transitionDelay: `${i * 20}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
};
