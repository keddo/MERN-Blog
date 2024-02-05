import { useState } from 'react'
import {Button, Label, TextInput} from 'flowbite-react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import OAuth from '../components/OAuth'
export default function SignUp() {
  const [formData, setFormData] = useState({})

  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/sign-up', formData, { 
        headers: {
           'Content-Type': 'application/json',
         }
       });
      if (res.status == 201) {
        // dispatch(signInSuccess(data));
        console.log(res.data)
        navigate('/signin');
      }
    } catch (error) {
      console.error(error.message)
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Kedir's</span>Blog
          </Link>
          <p className="text-sm mt-5">
            This is a demo project. You can sign up with your email and 
            password or with Google.
          </p>
        </div>
        <div className='flex-1'>
           <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div className=''>
                 <Label value="Your username" />
                 <TextInput type='text' placeholder='Username' id='username' onChange={handleChange} />
              </div>
              <div className=''>
                 <Label value="Your Email" />
                 <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange} />
              </div>
              <div className=''>
                 <Label value="Your Password" />
                 <TextInput type='password' placeholder='Password' id='password' onChange={handleChange} />
              </div>
              <Button gradientDuoTone='purpleToPink' type='submit'>
                Sign Up
              </Button>
              <OAuth/>
           </form>
           <div className='flex gap-2 text-sm mt-5'>
             <span>Have an account?</span>
             <Link to='/signin' className='text-blue-500'>
              Sign In
             </Link>
           </div>
        </div>
      </div>
    </div>
  )
}
