import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../database/firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";

const emailAuth = async (setData, data, history) => {
    const { name, email, password} = data;
    if (!name || !email || !password) {
        setData({ ...data, error: "All fields are required" });
    }else{
    try {
        const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const dbResult = {
            uid: result.user.uid,
            name,
            email,
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: true,
        }
        await setDoc(doc(db, "Users", result.user.uid), dbResult);
        setData({
            name: "",
            email: "",
            password: "",
            error: null,
            loading: false,
        });
        localStorage.setItem('user', JSON.stringify(dbResult));
        
        history("/")
    } catch (err) {
        setData({ ...data, error: err.message, loading: false });
    }}
    return data
}
export default emailAuth