import React from 'react'

interface RibbonProps {
  text?: string
  color?: string
  textColor?: string
}

const BestProductRibbon: React.FC<RibbonProps> = ({
  text = 'Best Product',
  color = 'bg-red-600',
  textColor = 'text-white'
}) => {
  return (
    <div className={`absolute -top-1 -right-[3rem] ${color} ${textColor} py-1 px-3 text-xs font-bold uppercase tracking-wider transform rotate-45 shadow-lg z-10`}>
      <span className="relative z-10">{text}</span>
      <div className="absolute left-0 bottom-0 w-full h-1 bg-black opacity-20"></div>
      <div className="absolute top-full left-0 w-2 h-2 -mt-0.5 bg-red-800 transform -skew-x-12"></div>
      <div className="absolute top-full right-0 w-2 h-2 -mt-0.5 bg-red-800 transform skew-x-12"></div>
    </div>
  )
}

export default BestProductRibbon

