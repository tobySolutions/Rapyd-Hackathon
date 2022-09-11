import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db,auth } from "../../database/firebase";
import { Timestamp, doc, setDoc } from "firebase/firestore"; 

const signInWithGoogle = async (setUser, user) => {
    const {name, email} = user
    const provider = new GoogleAuthProvider()
    try {
        const result = await signInWithPopup(auth, provider)
        console.log(result)
        setUser({...user, 
            name: result.user.displayName,
            email: result.user.email,
            photo: result.user.photoURL,
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: true,
        })
        await setDoc(doc(db, "Users", result.user.uid), {
            uid: result.user.uid,
            name,
            email,
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: true,
        });
    } catch (error) {
        console.log(error)
    }
    return user
}
export default signInWithGoogle