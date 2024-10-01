import { StyleClases } from '@/interfaces/interfaces'
import React, { MouseEventHandler } from 'react'

const backgroundClasses: StyleClases = {
  blue: 'bg-blue-500',
  white: 'bg-white',
}

const colorClasses: StyleClases = {
  white: 'text-white',
  blue: 'text-[#1EADFF]',
}

const fontSizeClasses: StyleClases = {
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
}

const hoverClasses: StyleClases = {
  blue: 'hover:bg-[#249de4]',
  slate: 'hover:bg-slate-200',
}

const borderClasses: StyleClases = {
  blue: 'border-1 border-[#1EADFF]',
  black: 'border-1 border-black',
}

interface ButtonProps {
  background?: string
  color?: string
  fontsize?: string
  hover?: string
  border?: string
  text: string
  onClick?: () => MouseEventHandler
  type?: 'submit' | 'reset' | 'button' | undefined
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
  const bgClass = background ? backgroundClasses[background] : ''
  const textClass = color ? colorClasses[color] : ''
  const fontClass = fontsize ? fontSizeClasses[fontsize] : ''
  const hoverClass = hover ? hoverClasses[hover] : ''
  const borderClass = border ? borderClasses[border] : 'border-none'

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${bgClass} ${textClass} ${fontClass} ${hoverClass} ${borderClass} py-2 px-3 rounded`}
    >
      {text}
    </button>
  )
}
