import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../database/firebase";
import { updateDoc, doc, Timestamp } from "firebase/firestore";
import { setUser } from "../../../redux/User/UserSlice";

const emailAuthLogin = async (setData, data, history, dispatch) => {
    const {email, password} = data
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
        setData({ ...data, error: "All fields are required" });
    }
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const {uid, name,photoURL} = result.user
        const dbResult = {
            uid: uid,
            name:name,
            email,
            photo:photoURL,
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: true,
        }
        await updateDoc(doc(db, "Users", result.user.uid), {
            isOnline: true,
        });
        dispatch(setUser(dbResult))
        localStorage.setItem('user', JSON.stringify(dbResult));
        history("/");
    } catch (err) {
        setData({ ...data, error: err.message, loading: false });
    }
}

export default emailAuthLogin