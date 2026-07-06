import React from "react";

interface APTranscoLogoProps {
  className?: string;
  isHighContrast?: boolean;
}

export const APTranscoLogo: React.FC<APTranscoLogoProps> = ({ 
  className = "w-12 h-12", 
  isHighContrast = false 
}) => {
  // Define colors based on High Contrast setting
  const towerColor = isHighContrast ? "#f59e0b" : "#1059cd"; // Amber vs Royal Blue
  const lightningColor = isHighContrast ? "#f59e0b" : "#dc2626"; // Amber vs Red
  const boxFill = isHighContrast ? "#000000" : "#1059cd"; // Black vs Royal Blue
  const boxStroke = isHighContrast ? "#f59e0b" : "none"; // Amber border in high contrast
  const textColor = isHighContrast ? "#f59e0b" : "#ffffff"; // Amber vs White

  return (
    <svg 
      viewBox="0 0 300 300" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 1. RED LIGHTNING BOLTS (Dynamic & Sharp Vectors) */}
      {/* Left Lightning Bolt (pointing down-left/down) */}
      <path 
        d="M 35,115 L 68,90 L 53,120 L 85,105 L 40,155 L 56,125 L 35,115 Z" 
        fill={lightningColor}
        stroke={isHighContrast ? "#000000" : "none"}
        strokeWidth="1"
      />
      {/* Right Lightning Bolt (pointing down-right/down) */}
      <path 
        d="M 265,115 L 232,90 L 247,120 L 215,105 L 260,155 L 244,125 L 265,115 Z" 
        fill={lightningColor}
        stroke={isHighContrast ? "#000000" : "none"}
        strokeWidth="1"
      />

      {/* 2. TRANSMISSION TOWER (Detailed engineering truss vector lines) */}
      <g stroke={towerColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Main Converging Legs */}
        <line x1="108" y1="210" x2="142" y2="35" />
        <line x1="192" y1="210" x2="158" y2="35" />

        {/* Outer leg bases extending slightly outwards */}
        <line x1="108" y1="210" x2="103" y2="220" />
        <line x1="192" y1="210" x2="197" y2="220" />

        {/* Center Vertical Spire / Top Extension */}
        <line x1="150" y1="35" x2="150" y2="22" strokeWidth="2.5" />

        {/* Horizontal Crossbeams & Diagonal Trusses */}
        
        {/* LEVEL 1: Bottom Crossarm (Wide) */}
        <line x1="85" y1="165" x2="215" y2="165" />
        {/* Diagonals returning to body */}
        <line x1="85" y1="165" x2="124" y2="145" />
        <line x1="215" y1="165" x2="176" y2="145" />
        {/* Bottom Insulators */}
        <line x1="88" y1="165" x2="88" y2="177" strokeWidth="2" />
        <line x1="212" y1="165" x2="212" y2="177" strokeWidth="2" />

        {/* LEVEL 2: Middle Crossarm (Widest) */}
        <line x1="75" y1="120" x2="225" y2="120" />
        {/* Diagonals returning to body */}
        <line x1="75" y1="120" x2="131" y2="100" />
        <line x1="225" y1="120" x2="169" y2="100" />
        {/* Middle Insulators */}
        <line x1="78" y1="120" x2="78" y2="132" strokeWidth="2" />
        <line x1="222" y1="120" x2="222" y2="132" strokeWidth="2" />

        {/* LEVEL 3: Top Crossarm (Narrower) */}
        <line x1="90" y1="75" x2="210" y2="75" />
        {/* Diagonals returning to body */}
        <line x1="90" y1="75" x2="139" y2="58" />
        <line x1="210" y1="75" x2="161" y2="58" />
        {/* Top Insulators */}
        <line x1="93" y1="75" x2="93" y2="87" strokeWidth="2" />
        <line x1="207" y1="75" x2="207" y2="87" strokeWidth="2" />

        {/* Tower Body Internal Bracing (X-Trusses) */}
        {/* Level 0 to 1 Bracing */}
        <line x1="117" y1="210" x2="183" y2="210" />
        <line x1="108" y1="210" x2="122" y2="165" />
        <line x1="192" y1="210" x2="178" y2="165" />
        <line x1="108" y1="210" x2="178" y2="165" />
        <line x1="192" y1="210" x2="122" y2="165" />

        {/* Level 1 to 2 Bracing */}
        <line x1="122" y1="165" x2="178" y2="165" />
        <line x1="122" y1="165" x2="131" y2="120" />
        <line x1="178" y1="165" x2="169" y2="120" />
        <line x1="122" y1="165" x2="169" y2="120" />
        <line x1="178" y1="165" x2="131" y2="120" />

        {/* Level 2 to 3 Bracing */}
        <line x1="131" y1="120" x2="169" y2="120" />
        <line x1="131" y1="120" x2="139" y2="75" />
        <line x1="169" y1="120" x2="161" y2="75" />
        <line x1="131" y1="120" x2="161" y2="75" />
        <line x1="169" y1="120" x2="139" y2="75" />

        {/* Level 3 to Peak Bracing */}
        <line x1="139" y1="75" x2="161" y2="75" />
        <line x1="139" y1="75" x2="150" y2="35" />
        <line x1="161" y1="75" x2="150" y2="35" />
        <line x1="139" y1="75" x2="150" y2="55" />
        <line x1="161" y1="75" x2="150" y2="55" />
      </g>

      {/* 3. CORPORATE TEXT BOX BASE */}
      <rect 
        x="20" 
        y="215" 
        width="260" 
        height="70" 
        rx="10" 
        ry="10" 
        fill={boxFill} 
        stroke={boxStroke}
        strokeWidth={isHighContrast ? "3" : "0"}
      />

      {/* 4. OFFICIAL TEXT (Symmetrical & High-Legibility) */}
      <text 
        x="150" 
        y="247" 
        fill={textColor} 
        fontSize="21" 
        fontWeight="800" 
        fontFamily="Inter, system-ui, -apple-system, sans-serif" 
        textAnchor="middle"
        letterSpacing="1.2"
      >
        AP TRANSCO
      </text>
      <text 
        x="150" 
        y="273" 
        fill={textColor} 
        fontSize="12.5" 
        fontWeight="700" 
        fontFamily="Inter, system-ui, -apple-system, sans-serif" 
        textAnchor="middle"
        letterSpacing="0.8"
      >
        ISO 27001 - 2022
      </text>
    </svg>
  );
};
