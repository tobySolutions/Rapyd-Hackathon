import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../database/firebase";
import { updateDoc, doc } from "firebase/firestore";

const emailAuthLogin = async (setData, data, history) => {
    const {email, password} = data
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
        setData({ ...data, error: "All fields are required" });
    }
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        console.log(result)
        await updateDoc(doc(db, "Users", result.user.uid), {
            isOnline: true,
        });
        history("/");
    } catch (err) {
        setData({ ...data, error: err.message, loading: false });
    }
}

export default emailAuthLogin