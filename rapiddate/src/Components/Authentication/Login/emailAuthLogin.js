import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../database/firebase'
/**
 * 
 * @param {{email:String, password:String}} data 
 * @returns 
 */
const emailAuthLogin = async data => {
  const { email, password } = data
  let resultObj = {error:null, data: {}}
  if (!email || !password) {
    resultObj = {...resultObj, error: "All Fields Are Required" }
    return resultObj
  } 
  try{
    const result = await signInWithEmailAndPassword(auth, email, password)
    resultObj = {...resultObj, data: result}
  }catch(err){
    resultObj = {...resultObj, error:err.message}
  }
  return resultObj
}

export default emailAuthLogin
