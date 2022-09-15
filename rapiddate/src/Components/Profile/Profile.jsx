import { useState } from 'react'
import './profile.css'
import style from './Profile.module.css'

const Profile = () => {
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
    matches: []
  })
  const handleChange = e => {
    console.log('e', e)
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const name = e.target.name

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div className={style.form}>
      <div className={style.formContainer}>
        <form>
          <section className={style.formContent}>
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

            <div className={style.inputBox}>
              <label>Birthday</label>
              <div className='multiple-input-container'>
                <input
                  id='dob_day'
                  type='number'
                  name='dob_day'
                  placeholder='DD'
                  required={true}
                  value={formData.dob_day}
                  onChange={handleChange}
                />

                <input
                  id='dob_month'
                  type='number'
                  name='dob_month'
                  placeholder='MM'
                  required={true}
                  value={formData.dob_month}
                  onChange={handleChange}
                />

                <input
                  id='dob_year'
                  type='number'
                  name='dob_year'
                  placeholder='YYYY'
                  required={true}
                  value={formData.dob_year}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={style.inputBox}>
              <label>Gender</label>
              <div className='multiple-input-container'>
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
            <div className={style.inputBox}>
              <label htmlFor='show-gender'>Show Gender on my Profile</label>
              <input
                id='show-gender'
                type='checkbox'
                name='show_gender'
                onChange={handleChange}
                checked={formData.show_gender}
              />
            </div>
            <div className={style.inputBox}>
              <label>Show Me</label>
              <div className='multiple-input-container'>
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
            <div className={style.inputBox}>
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

            <input type='submit' />
          </section>

          <section className={style.formPhoto}>
            <label htmlFor='url'>Profile Photo</label>
            <input
              type='url'
              name='url'
              id='url'
              onChange={handleChange}
              required={true}
            />
            <div className='photo-container'>
              {formData.url && (
                <img src={formData.url} alt='profile pic preview' />
              )}
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}
export default Profile
