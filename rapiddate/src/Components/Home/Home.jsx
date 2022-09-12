import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../database/firebase';
import Navbar from '../NavBar/NavBar'

const Home = () => {
    const [allUsers, setAllUsers] = useState([])
    const userRef = collection(db, "Users")
    //     useEffect(() => {
    //     const getAllUsers = async () => {
    //         const q = query(userRef);
    //         const querySnapshot = await getDocs(q);
    //         querySnapshot.forEach((doc) => {
    //             setAllUsers(allUsers => [...allUsers,{
    //             [doc.id]: doc.data()
    //         }])
    //     });
    //     getAllUsers()

    // }, [])
    // }
    return (
        <div className='home'>
            <Navbar />
            {allUsers ?.((map)) =>(
                <div></div>
            )}
        </div>
    )
}

export default Home