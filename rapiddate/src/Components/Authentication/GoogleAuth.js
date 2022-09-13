import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db,auth } from "../../database/firebase";
import { Timestamp, doc, setDoc } from "firebase/firestore"; 

const signInWithGoogle = async (user ) => {
    const provider = new GoogleAuthProvider()
    try {
        const result = await signInWithPopup(auth, provider)
        const {uid, displayName,email,photoURL} = result.user
        const dbResult = {
            uid: uid,
            name:displayName,
            email:email,
            photo:photoURL,
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: true,
        }
        await setDoc(doc(db, "Users", result.user.uid), dbResult);
        localStorage.setItem('user', JSON.stringify(dbResult))

    } catch (error) {
        console.log(error)
    }
    return user
}
export default signInWithGoogle