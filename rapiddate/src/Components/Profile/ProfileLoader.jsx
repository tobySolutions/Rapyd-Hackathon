import React from 'react'
import style from './ProfileLoader.module.css'

const ProfileLoader = () => {
  return (
    <div className={style.body}>
      <svg
        className={style.svg}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 16 13.86'
      >
        <defs>
          <polygon
            id='hexagon'
            points='4.29 13.36 0.58 6.93 4.29 0.5 11.71 0.5 15.42 6.93 11.71 13.36 4.29 13.36'
          />
          <g id='inner-shadow' transform='translate(-2, -2)'>
            <use
              xlinkHref='#hexagon'
              className={style.innerShadow}
              transform='scale(1.25)'
            />
          </g>
          <g id='inner-shadow-animated' transform='translate(-2, -2)'>
            <use
              xlinkHref='#hexagon'
              className={style.innerShadowAnimated}
              transform='scale(1.25)'
            />
          </g>
        </defs>
        <mask id='mask'>
          <rect x={-4} y={-4} width={24} height={24} fill='black' />
          <use xlinkHref='#hexagon' fill='white' />
        </mask>
        {/*  White hexagon fill  */}
        <use xlinkHref='#hexagon' className={style.fill} />
        {/*  Animated blue fill */}
        <use xlinkHref='#hexagon' className={style.fillAnimated} />
        <use xlinkHref='#inner-shadow' mask='url(#mask)' />
        <use xlinkHref='#inner-shadow-animated' mask='url(#mask)' />
      </svg>
    </div>
  )
}

export default ProfileLoader
