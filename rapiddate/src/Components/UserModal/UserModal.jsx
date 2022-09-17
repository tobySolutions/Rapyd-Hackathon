// import React from 'react'
// import ReactDOM from 'react-dom'

// const modalRoot = document.getElementById('user-info')
// const UserModal = () => {
//   return ReactDOM.createPortal(
//     <div style={{height:'100vh', backgroundColor:'red'}}>UserModal</div>, modalRoot
//   )
// }

// export default UserModal
import React from 'react'
import ReactDOM from 'react-dom'
import { BsX } from 'react-icons/bs'
import style from './UserModal.module.css'

const UserModal = props => {
  return ReactDOM.createPortal(
    <div className={style.userModal} >
      <div className={style.innerModal}>
        <BsX onClick={props.onClose} className={style.closeIcon} />
        {props.children}
      </div>
    </div>,
    document.getElementById('user-info')
  )
}

export default UserModal
