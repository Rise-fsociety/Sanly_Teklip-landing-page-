import React, { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "outline" | "icon" | "ghost" | "custom";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center transition-all duration-300";

  let variantStyle = "";
  if (variant === "primary") {
    variantStyle =
      "bg-white text-black hover:bg-white/90 rounded-full font-semibold tracking-wide";
  } else if (variant === "outline") {
    variantStyle =
      "text-white border border-white/25 hover:bg-white/10 rounded-full tracking-wide backdrop-blur-sm";
  } else if (variant === "icon") {
    variantStyle =
      "rounded-full bg-black text-white hover:bg-black/80 active:scale-95 flex items-center justify-center cursor-pointer";
  }

  return (
    <button
      className={`${variant !== "custom" ? baseStyle : ""} ${variantStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}