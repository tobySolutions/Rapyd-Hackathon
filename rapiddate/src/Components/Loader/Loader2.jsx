import React from 'react'
import style from './Loader2.module.css'
const Loader2 = () => {
  return (
    <div className={style.body}>
      <div className={style.loader}>
        <div className={style.text}></div>
        <span>
          <i />
        </span>
      </div>
    </div>
  )
}

export default Loader2
