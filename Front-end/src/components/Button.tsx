import React from "react";

const backgroundClasses: any = {
  blue: "bg-blue-500",
  white: "bg-white",
};

const colorClasses: any = {
  white: "text-white",
  blue: "text-[#1EADFF]",
};

const fontSizeClasses: any = {
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
};

const hoverClasses: any = {
  blue: "hover:bg-[#249de4]",
  slate: "hover:bg-slate-200",
};

const borderClasses: any = {
  blue: "border-1 border-[#1EADFF]",
  black: "border-1 border-black",
};

interface ButtonProps {
  background?: string;
  color?: string;
  fontsize?: string;
  hover?: string;
  border?: string;
  text: string;
  onClick?: any;
  type?: any;
}

export const Button = ({
  background,
  color,
  fontsize,
  hover,
  border,
  text,
  onClick,
  type,
}: ButtonProps) => {
  const bgClass = background ? backgroundClasses[background]: "";
  const textClass = color? colorClasses[color]: "";
  const fontClass = fontsize ? fontSizeClasses[fontsize] : "";
  const hoverClass = hover ? hoverClasses[hover] : "";
  const borderClass = border ? borderClasses[border] : "border-none";

  return (
    <button type={type} onClick={onClick}
      className={`${bgClass} ${textClass} ${fontClass} ${hoverClass} ${borderClass} py-2 px-3 rounded`}
    >
      {text}
    </button>
  );
};
