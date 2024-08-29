import React from 'react'
import anime from '../../assets/anime.jpg'

const HorizentalImages = () => {
  return (
    <div className="flex  w-full justify-center items-center">
      <div
        className="w-96 h-2xl -mr-40 shadow-[10px_0_15px_rgba(0,0,0,0.5)]"
        style={{ clipPath: 'polygon(40% 0%, 100% 0%, 60% 100%, 0% 100%)' }}
      >
        <img
          src={anime}
          alt="Anime"
          className="w-full h-full object-cover hover:brightness-50"
        />
      </div>
      <div
        className="w-96 h-2xl -mr-40 shadow-[10px_0_15px_rgba(0,0,0,0.5)]"
        style={{ clipPath: 'polygon(40% 0%, 100% 0%, 60% 100%, 0% 100%)' }}
      >
        <img
          src={anime}
          alt="Anime"
          className="w-full h-full object-cover hover:brightness-50"
        />
      </div>
      <div
        className="w-96 h-2xl -mr-40 shadow-[10px_0_15px_rgba(0,0,0,0.5)]"
        style={{ clipPath: 'polygon(40% 0%, 100% 0%, 60% 100%, 0% 100%)' }}
      >
        <img
          src={anime}
          alt="Anime"
          className="w-full h-full object-cover hover:brightness-50"
        />
      </div>
      <div
        className="w-96 h-2xl shadow-[10px_0_15px_rgba(0,0,0,0.5)]"
        style={{ clipPath: 'polygon(40% 0%, 100% 0%, 60% 100%, 0% 100%)' }}
      >
        <img
          src={anime}
          alt="Anime"
          className="w-full h-full object-cover hover:brightness-50"
        />
      </div>
    </div>
  )
}

export default HorizentalImages
