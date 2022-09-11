import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../database/firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";

const emailAuth = async (setData, data, history) => {
    const { name, email, password} = data;

    setData({ ...data, error: null, loading: true });
    if (!name || !email || !password) {
        setData({ ...data, error: "All fields are required" });
    }
    try {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        await setDoc(doc(db, "Users", result.user.uid), {
            uid: result.user.uid,
            name,
            email,
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: true,
        });
        history("/login");
    } catch (err) {
        setData({ ...data, error: err.message, loading: false });
    }
    return data
}
export default emailAuth