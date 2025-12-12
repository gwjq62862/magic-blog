import React from 'react'

const CateogroyCard = () => {
  return (
   <div className="flex gap-3 p-3 flex-wrap justify-center">
      <div className="flex h-10 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full glassmorphism pl-5 pr-5 hover:bg-white/10 ring-2 ring-primary transition-all shadow-md">
        <p className="text-white text-sm font-medium leading-normal">Mindfulness</p>
      </div>
      <div className="flex h-10 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full glassmorphism pl-5 pr-5 hover:bg-white/10 transition-all">
        <p className="text-[#a19db9] hover:text-white transition-colors text-sm font-medium leading-normal">Productivity</p>
      </div>
      <div className="flex h-10 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full glassmorphism pl-5 pr-5 hover:bg-white/10 transition-all">
        <p className="text-[#a19db9] hover:text-white transition-colors text-sm font-medium leading-normal">Technology</p>
      </div>
      <div className="flex h-10 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full glassmorphism pl-5 pr-5 hover:bg-white/10 transition-all">
        <p className="text-[#a19db9] hover:text-white transition-colors text-sm font-medium leading-normal">Neuroscience</p>
      </div>
      <div className="flex h-10 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full glassmorphism pl-5 pr-5 hover:bg-white/10 transition-all">
        <p className="text-[#a19db9] hover:text-white transition-colors text-sm font-medium leading-normal">Creativity</p>
      </div>
    </div>
  )
}

export default CateogroyCard