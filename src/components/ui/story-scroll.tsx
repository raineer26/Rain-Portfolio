"use client";

import React from "react";

export interface FlowSectionProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const FlowSection: React.FC<FlowSectionProps> = ({ className, style = {}, children }) => (
  <section className={`relative w-full ${className || ""}`}>
    <div
      className="relative flex w-full flex-col justify-between gap-4 px-[6vw] md:px-[10vw] py-[3vw]"
      style={style}
    >
      {children}
    </div>
  </section>
);

interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
}

export const FlowArt: React.FC<FlowArtProps> = ({ children, className }) => (
  <div className={`w-full ${className || ""}`}>
    {children}
  </div>
);
