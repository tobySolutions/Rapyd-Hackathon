import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db,auth } from "../../../database/firebase";
import { Timestamp, setDoc, doc, } from "firebase/firestore"; 

const signUpWithGoogle = async (user ) => {
    const provider = new GoogleAuthProvider()
    let resultObj = {error: null}
    try {
        const result = await signInWithPopup(auth, provider)
        const {uid, displayName,email} = result.user
        const dbResult = {
            uid: uid,
            name:displayName,
            email:email,
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: true,
        }
        await setDoc(doc(db, "Users", result.user.uid), dbResult);
        localStorage.setItem('user', JSON.stringify(dbResult))
    } catch (err) {
        resultObj = {...resultObj, error:err.message}
        return resultObj
    }

}
export default signUpWithGoogle