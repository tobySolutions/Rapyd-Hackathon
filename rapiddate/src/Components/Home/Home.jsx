import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { db } from '../../database/firebase';
import { setUsers } from '../../redux/Users/UsersSlice';
import CardContainer from '../CardContainer/CardContainer';
import Loading from '../Loader/Loading';
import Navbar from '../NavBar/NavBar'
import style from './Home.module.css'

const Home = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [onlineChecked, setOnlineChecked] = useState(false)
    const userRef = collection(db, "Users")
    const getAllUsers = async () => {
        const q = query(userRef);
        const querySnapshot = await getDocs(q);
        let users = []
        querySnapshot.forEach((doc) => {
            users.push(doc.data())
        });
        dispatch(setUsers(users))
    }
    useEffect(() => {
        getAllUsers()
    }, [])

    // Fetches the list of people who are online at the moment
    const handleOnline = async () => {
        if(!onlineChecked) {
            setIsLoading(true)
            const q = query(userRef, where("isOnline", "==", true));
            const unsub =  onSnapshot(q, (querySnapshot) => {
                let users = []
                querySnapshot.forEach((doc) => {
                    users.push(doc.data())
                });
                dispatch(setUsers(users))
            });
            setIsLoading(false)
            return () => unsub();

        }else{
            getAllUsers()
        }
    }

    return (
        <div className='home'>
            <Navbar />
            <div className={style.headers}>
                <h1 className={style.head}>Explore</h1>
                <div className={style.onlineButton}>
                    <input 
                    type="checkbox" 
                    className={style.checkbox}
                    checked={onlineChecked}
                    onChange={e => setOnlineChecked(e.target.checked)}
                    onClick={handleOnline}
                    />
                    <p>Online</p>
                </div>
            </div>

            {isLoading ? <Loading /> : 
            <CardContainer />
            
            }
        </div>
    )
}

export default Home