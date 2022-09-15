// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { auth, db } from '../../../database/firebase'
// import { setDoc, doc, Timestamp } from 'firebase/firestore'
// /**
//   * Takes in Data from the Login Page and then computes to add the user to the database
// */
// const emailAuth = async (setData, data) => {
//   const { name, email, password } = data
//   if (!name || !email || !password) {
//     setData({ ...data, error: 'All fields are required' })
//   } else {
//     try {
//       const result = await createUserWithEmailAndPassword(auth, email, password)
//       const dbResult = {
//         uid: result.user.uid,
//         name,
//         email,
//         createdAt: Timestamp.fromDate(new Date()),
//         isOnline: true
//       }
//       await setDoc(doc(db, 'Users', result.user.uid), dbResult)
//       setData({
//         name: '',
//         email: '',
//         password: '',
//         error: null,
//       })
//       localStorage.setItem('user', JSON.stringify(dbResult))
//     } catch (err) {
//       setData({ ...data, error: err.message, loading: false })
//     }
//   }
//   return data
// }
// export default emailAuth
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../../database/firebase'
import { setDoc, doc, Timestamp } from 'firebase/firestore'

/**
 * Takes in an Obect containing the user's name, email and password
 * @param {{name, email, password}} data 
 * Returns an error if there is any
 * @returns {{error}} 
 */
const emailAuth = async data => {
  const { name, email, password } = data
  console.log(name, email,password)
  let resultObj = {error:null}
  if (!name || !email || !password) {
    resultObj = {...resultObj, error:'All fields are required'}
    return resultObj
  } 
  try{
    const result = await createUserWithEmailAndPassword(auth, email, password)
    const dbResult = {
      uid: result.user.uid,
      name,
      email,
      createdAt: Timestamp.fromDate(new Date()),
      isOnline: true
    }
    await setDoc(doc(db, 'Users', result.user.uid), dbResult)
    localStorage.setItem('user', JSON.stringify(dbResult))
  }catch(err){
    resultObj = {...resultObj, error:err.message}
  }
  return resultObj
}

export default emailAuth