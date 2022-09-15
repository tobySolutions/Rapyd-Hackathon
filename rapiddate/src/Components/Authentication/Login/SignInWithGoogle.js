import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { db,auth } from "../../../database/firebase";
import {  doc,  collection,  getDoc, updateDoc } from "firebase/firestore"; 

const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    let resultObj = {error: null}
    
    const result = await signInWithPopup(auth, provider)
    const userRef = collection(db, "Users");
    const docRef = doc(userRef, result.user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log(docSnap.data())
        await updateDoc(doc(db, 'Users', result.user.uid), { isOnline: true})
        localStorage.setItem('user', JSON.stringify(docSnap.data()))
    }else{
        resultObj = {...resultObj, error: 'Account Not Found, Please Register'}
    }
    return resultObj
    
}
export default signInWithGoogle