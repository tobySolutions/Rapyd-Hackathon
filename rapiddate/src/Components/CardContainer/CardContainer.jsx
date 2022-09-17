import React from 'react'
import style from './CardContainer.module.css'
import UserCard from '../UserCard/UserCard'
import { useSelector } from 'react-redux'
import { showUsers } from '../../redux/Users/UsersSlice'

const CardContainer = () => {
  const users = useSelector(showUsers)
  return (
    <div className={style.cardContainer}>
      {users?.map((user) => {
        return (
          <UserCard key={user.uid} user={user} />
        )
      })}
    </div>
  )
}

export default CardContainer