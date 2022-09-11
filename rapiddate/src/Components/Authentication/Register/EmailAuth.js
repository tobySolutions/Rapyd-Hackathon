import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../database/firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { setUser } from "../../../redux/User/UserSlice";

const emailAuth = async (setData, data, history, dispatch) => {
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
        const dbResult = {
            uid: result.user.uid,
            name,
            email,
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: true,
        }
        await setDoc(doc(db, "Users", result.user.uid), dbResult);
        dispatch(setUser(dbResult))
        history("/login");
    } catch (err) {
        setData({ ...data, error: err.message, loading: false });
    }
    return data
}
export default emailAuth