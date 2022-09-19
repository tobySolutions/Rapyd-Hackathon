import { Delete } from '@material-ui/icons'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject
} from 'firebase/storage'
import { useState } from 'react'
import { BsCloudUpload } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { db, storage } from '../../database/firebase'
import { showUser } from '../../redux/User/UserSlice'
import style from './Profile.module.css'
import ProfileLoader from './ProfileLoader'

const Profile = () => {
  const user = useSelector(showUser)
  const [isLoading, setIsLoading] = useState(false)
  const [msg, setMsg] = useState(null)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    show_gender: false,
    gender_identity: 'man',
    gender_interest: 'woman',
    url: '',
    about: '',
    age: ''
  })

  const navigate = useNavigate()
  const uploadImage = async e => {
    setIsLoading(true)
    const imageFile = e.target.files[0]
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on(
      'state_changed',
      snapshot => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log(imageFile)
      },
      error => {
        console.log(error)
        setMsg('Error while uploading : Try Again')
        setIsLoading(false)
        setTimeout(() => {}, 4000)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setFormData({ ...formData, url: downloadURL })
          setIsLoading(false)
          setMsg('image uploaded successfully')
          setTimeout(() => {}, 4000)
        })
      }
    )
  }
  const deleteImage = () => {
    setIsLoading(true)
    const deleteRef = ref(storage, formData.url)
    deleteObject(deleteRef).then(() => {
      setFormData({ ...formData, url: '' })
      setIsLoading(false)
      setMsg('Image Deleted Successfully')
    })
  }
  const handleChange = e => {
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const name = e.target.name
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  const verifyUser = async () => {
    const userRef = collection(db, 'Users')
    const docRef = doc(userRef, user.uid)
    try {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        localStorage.setItem('user', JSON.stringify(docSnap.data()))
        console.log(docSnap.data())
      }
    } catch (err) {
      return err
    }
  }
  const handleSubmit = async e => {
    e.preventDefault()
    await updateDoc(doc(db, 'Users', user.uid), formData)
    await verifyUser()
    navigate('/dashboard')
    navigate(0)
  }

  return (
    <div className={style.form}>
      <div className={style.formContainer}>
        <div className={style.logo}>Rapyd</div>
        <form onSubmit={handleSubmit}>
          <div className={style.innerContainer}>
            <section className={style.formContent}>
              <div className={style.name}>
                <div className={style.inputBox}>
                  <label htmlFor='first_name'>First Name</label>
                  <input
                    id='first_name'
                    type='text'
                    name='first_name'
                    placeholder='First Name'
                    required={true}
                    value={formData.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className={style.inputBox}>
                  <label htmlFor='first_name'>Last Name</label>
                  <input
                    id='last_name'
                    type='text'
                    name='last_name'
                    placeholder='Last Name'
                    required={true}
                    value={formData.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={style.inputBox}>
                <label>Birthday</label>
                <div className={style.multipleInputContainer}>
                  <input
                    id='dob_day'
                    type='number'
                    name='dob_day'
                    placeholder='DD'
                    maxLength='2'
                    required={true}
                    value={formData.dob_day}
                    onChange={handleChange}
                  />

                  <input
                    id='dob_month'
                    type='number'
                    name='dob_month'
                    placeholder='MM'
                    maxLength='2'
                    required={true}
                    value={formData.dob_month}
                    onChange={handleChange}
                  />

                  <input
                    id='dob_year'
                    type='number'
                    name='dob_year'
                    placeholder='YYYY'
                    maxLength='4'
                    minLength='4'
                    required={true}
                    value={formData.dob_year}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={style.inputBox}>
                <label>Gender</label>
                <div className={style.multipleInputContainer}>
                  <input
                    id='man-gender-identity'
                    type='radio'
                    name='gender_identity'
                    value='man'
                    onChange={handleChange}
                    checked={formData.gender_identity === 'man'}
                  />
                  <label htmlFor='man-gender-identity'>Man</label>
                  <input
                    id='woman-gender-identity'
                    type='radio'
                    name='gender_identity'
                    value='woman'
                    onChange={handleChange}
                    checked={formData.gender_identity === 'woman'}
                  />
                  <label htmlFor='woman-gender-identity'>Woman</label>
                  <input
                    id='more-gender-identity'
                    type='radio'
                    name='gender_identity'
                    value='more'
                    onChange={handleChange}
                    checked={formData.gender_identity === 'more'}
                  />
                  <label htmlFor='more-gender-identity'>More</label>
                </div>
              </div>
              <div className={style.genderInputBox}>
                <input
                  id='show-gender'
                  type='checkbox'
                  name='show_gender'
                  onChange={handleChange}
                  checked={formData.show_gender}
                />
                <label htmlFor='show-gender'>Show Gender on my Profile</label>
                <div className={style.inputBox}>
                  <label htmlFor='age'>Age</label>
                  <input
                    id='age'
                    type='number'
                    name='age'
                    placeholder='Age'
                    required={true}
                    value={formData.age}
                    onChange={handleChange}
                    style={{ width: '50%' }}
                  />
                </div>
              </div>
              <div className={style.inputBox}>
                <label style={{ marginBottom: '.5em' }}>Show Me</label>
                <div className={style.multipleInputContainer}>
                  <input
                    id='man-gender-interest'
                    type='radio'
                    name='gender_interest'
                    value='man'
                    onChange={handleChange}
                    checked={formData.gender_interest === 'man'}
                  />
                  <label htmlFor='man-gender-interest'>Man</label>
                  <input
                    id='woman-gender-interest'
                    type='radio'
                    name='gender_interest'
                    value='woman'
                    onChange={handleChange}
                    checked={formData.gender_interest === 'woman'}
                  />
                  <label htmlFor='woman-gender-interest'>Woman</label>
                  <input
                    id='everyone-gender-interest'
                    type='radio'
                    name='gender_interest'
                    value='everyone'
                    onChange={handleChange}
                    checked={formData.gender_interest === 'everyone'}
                  />
                  <label htmlFor='everyone-gender-interest'>Everyone</label>
                </div>
              </div>
              <div style={{ marginTop: '1em' }} className={style.inputBox}>
                <label htmlFor='about'>About me</label>
                <input
                  id='about'
                  type='text'
                  name='about'
                  required={true}
                  placeholder='I like long walks...'
                  value={formData.about}
                  onChange={handleChange}
                />
              </div>
            </section>
            <section className={style.formPhoto}>
              {isLoading ? (
                <ProfileLoader />
              ) : (
                <>
                  {msg ? <p>{msg}</p> : ''}
                  {formData.url ? (
                    <>
                      <div className={style.imageMainDiv}>
                        <h1>Profile Photo</h1>
                        <div className={style.profileImage}>
                          <img
                            src={formData.url}
                            alt='uploaded'
                            className={style.uploadedImage}
                          />
                        </div>
                        <button
                          className={style.deleteButton}
                          onClick={deleteImage}
                        >
                          <Delete />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <label className={style.imageLabel}>
                        <div className={style.imageDiv}>
                          <BsCloudUpload className={style.imageIcon} />
                          <p className={style.imageText}>
                            Click here to upload
                          </p>
                        </div>
                        <input
                          type='file'
                          name='file'
                          accept='image/*'
                          onChange={uploadImage}
                          required={true}
                          className={style.uploadSection}
                        />
                      </label>
                    </>
                  )}
                </>
              )}
            </section>
          </div>
          <input type='submit' />
        </form>
      </div>
    </div>
  )
}
export default Profile
