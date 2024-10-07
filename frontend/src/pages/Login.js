import React, { useContext, useState } from 'react'
import loginIcon from "../assest/assests/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom"
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.Signin.url, {
            method: SummaryApi.Signin.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if (dataApi.success) {
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }

        if (dataApi.error) {
            toast.error(dataApi.message)
        }

    }
    console.log("data login", data)

    return (
        <div>
            <section id='login'>
                <div className='mx-auto container p-4'>
                    <div className='bg-white p-4 w-full max-w-sm mx-auto rounded'>
                        <div className='w-20 h-20 mx-auto py-5'>
                            <img src={loginIcon} alt="login icon" />
                        </div>
                        <form className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit} action="">
                            <div className='grid'>
                                <label htmlFor="">Email</label>
                                <div className='bg-slate-100 rounded p-2'>
                                    <input
                                        type="email"
                                        placeholder='Enter you email'
                                        name='email'
                                        value={data.email}
                                        onChange={handleOnChange}
                                        className='w-full h-full outline-none bg-transparent' />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="">Password</label>
                                <div className='bg-slate-100 rounded p-2 flex'>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder='Enter your password'
                                        name='password'
                                        value={data.password}
                                        onChange={handleOnChange}
                                        className='w-full h-full outline-none bg-transparent' />
                                    <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                                        <span>
                                            {
                                                showPassword ? (
                                                    <FaEyeSlash />
                                                ) : (<FaEye />)
                                            }
                                        </span>
                                    </div>
                                </div>
                                <Link to={'/forgot-password'} className="block w-fit ml-auto text-blue-500 hover:underline hover:text-blue-700">Forgot Password ?</Link>
                            </div>
                            <button className='bg-green-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:bg-green-600 hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                        </form>
                        <p className='my-5'>Don't have account ? <Link to={"/signup"} className='my-5 text-blue-500 hover:text-blue-700 hover:underline'>Sign Up</Link></p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login
