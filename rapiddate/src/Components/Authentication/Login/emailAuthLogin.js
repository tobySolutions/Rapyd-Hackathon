import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../../database/firebase'
import { updateDoc, doc, Timestamp } from 'firebase/firestore'

const emailAuthLogin = async (setData, data, history) => {
  const { email, password } = data
  setData({ ...data, error: null, loading: true })
  if (!email || !password) {
    setData({ ...data, error: 'All fields are required' })
  } else {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const { uid, name, photoURL } = result.user
      console.log(result.user)
      const dbResult = {
        uid: uid,
        name,
        email,
        photo: photoURL,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true
      }
      await updateDoc(doc(db, 'Users', result.user.uid), {
        isOnline: true
      })
      localStorage.setItem('user', JSON.stringify(dbResult))
    } catch (err) {
      setData({ ...data, error: err.message, loading: false })
    }
  }
}

export default emailAuthLogin
