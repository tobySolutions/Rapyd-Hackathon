import { addDoc, collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../database/firebase';
import { showUser } from '../../redux/User/UserSlice';
import { setUsers, showUsers } from '../../redux/Users/UsersSlice';
import CardContainer from '../CardContainer/CardContainer';
import ChatRequests from '../chatRequests/chatRequests';
import Loading from '../Loader/Loading';
import Navbar from '../NavBar/NavBar'
import style from './Home.module.css'


const Home = () => {
    const dispatch = useDispatch()
    
    /// A state
    const mainUser = useSelector(showUser)
    const [isLoading, setIsLoading] = useState(false)
    const [onlineChecked, setOnlineChecked] = useState(false)
    const userRef = collection(db, "Users")
    const getAllUsers = async () => {
        const q = query(userRef, where("uid", "!=", mainUser.uid ));
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
            const q = query(
                userRef, 
                where("isOnline", "==", true), 
                // where("uid", "!=", mainUser.uid),
            );            
            const unsub =  onSnapshot(q, (querySnapshot) => {
                let users = []
                querySnapshot.forEach((doc) => {
                    users.push(doc.data())
                });
                dispatch(setUsers(users.filter((user) => user.uid !== mainUser.uid)))
            });
            setIsLoading(false)
            return () => unsub();

        }
        else{
            getAllUsers()
        }
    }

    

    return (
        <div className='home'>
            <Navbar />
            <div className={style.headers}>
                <h1 className={style.head}>Explore</h1>
                </div>
                <div className={style.headerContainer}>
                    <div style={{width: "60%"}}>
                        <div className={style.headerContainer}>
                            <div className={style.filters}>

                            </div>
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
                    <div style={{width: "30%"}}><ChatRequests /></div>
                </div>

        </div>
    )
}

export default Home