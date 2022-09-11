import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db,auth } from "../../database/firebase";
import { Timestamp, doc, setDoc } from "firebase/firestore"; 

const signInWithGoogle = async (setUser, user,history, dispatch) => {
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
        dispatch(setUser(dbResult))
        history("/")
    } catch (error) {
        console.log(error)
    }
    return user
}
export default signInWithGoogle