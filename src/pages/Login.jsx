import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { useLoginMutation } from '../store/newsApi'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { data }] = useLoginMutation()
  const navigate = useNavigate()
  const handleSendRequest = async () => {
    try {
      const result = await login({ email, password }).unwrap();
      toast.success("Uğurla daxil olundu");
      localStorage.setItem('token', result?.token);
      result?.token && navigate('/admin');
    } catch (error) {
      toast.error(error?.data?.message || "Serverə qoşulmaq mümkün olmadı.");
    }
  }

  return (
    <div className='h-screen w-screen flex justify-center items-center'>
      <div className="flex flex-col w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign in</h1>
          <p className="text-sm dark:text-gray-600">Sign in to access your account</p>
        </div>
        <div noValidate="" action="" className="space-y-12">
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Email</label>
              <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter your email..." className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm">Password</label>
              </div>
              <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
            </div>
          </div>
          <div className="space-y-2">
            <div>
              <button onClick={handleSendRequest} className="w-full px-8 py-3 font-semibold rounded-md dark:bg-blue-600 dark:text-gray-50">Sign in</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
