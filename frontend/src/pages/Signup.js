import React, { useState } from 'react'
import loginIcon from "../assest/assests/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom"
import imageToBase64 from '../helpers/imageToBase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import imageCompression from 'browser-image-compression';

const Signup = () => {

    const [showPassword, setShowPassword] = useState(false)

    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        ConfirmPassword: "",
        profilePic: ""
    })

    const navigate = useNavigate()

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadPic = async (e) => {
        const file = e.target.files[0];  // Get the first file

        if (file) {
            try {
                // Compress the image
                const compressedFile = await imageCompression(file, { maxSizeMB: 1, maxWidthOrHeight: 1024 });

                // Convert the compressed image to base64 or send it directly
                const imagePic = await imageToBase64(compressedFile);

                setData((prev) => ({
                    ...prev,
                    profilePic: imagePic,  // Set the base64 string as profilePic
                }));
            } catch (error) {
                console.error('Error compressing or converting image:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.password === data.ConfirmPassword) {
            const dataResponse = await fetch(SummaryApi.Signup.url, {
                method: SummaryApi.Signup.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data),
            })

            const dataApi = await dataResponse.json()

            if (dataApi.success) {
                toast.success(dataApi.message)
                navigate("/Login")
            }

            if (dataApi.error) {
                toast.error(dataApi.message)
            }

        } else {
            toast.error("Password Mismatch")
        }

    }

    return (
        <section id='signup'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto rounded'>

                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                        <div>
                            <img src={data.profilePic || loginIcon} alt="login icon" />
                        </div>
                        <form action="">
                            <label htmlFor="uploadPhoto">
                                <div className='text-xs bg-opacity-70 bg-slate-200 text-center pb-4 py-1 cursor-pointer absolute bottom-0 w-full'>
                                    Upload Photo
                                </div>
                                <input id="uploadPhoto" type="file" className='hidden' onChange={handleUploadPic} />
                            </label>
                        </form>

                    </div>
                    <form className='pt-6 flex flex-col gap-3' onSubmit={handleSubmit} action="">
                        <div className='grid'>
                            <label htmlFor="">Name</label>
                            <div className='bg-slate-100 rounded p-2'>
                                <input
                                    type="text"
                                    placeholder='enter you name'
                                    name='name'
                                    value={data.name}
                                    onChange={handleOnChange}
                                    required={true}
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>
                        <div className='grid'>
                            <label htmlFor="">Email</label>
                            <div className='bg-slate-100 rounded p-2'>
                                <input
                                    type="email"
                                    placeholder='enter you email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    required={true}
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="">Password</label>
                            <div className='bg-slate-100 rounded p-2 flex'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='enter password'
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                    required={true}
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
                        </div>

                        <div>
                            <label htmlFor="">Confirm password</label>
                            <div className='bg-slate-100 rounded p-2 flex'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='enter confirm password'
                                    name='ConfirmPassword'
                                    value={data.ConfirmPassword}
                                    onChange={handleOnChange}
                                    required={true}
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((preve) => !preve)}>
                                    <span>
                                        {
                                            showConfirmPassword ? (
                                                <FaEyeSlash />
                                            ) : (<FaEye />)
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button className='bg-green-500 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:bg-green-600 hover:scale-110 transition-all mx-auto block mt-6'>Sign up</button>
                    </form>
                    <p className='my-5'>Already have account ? <Link to={"/Login"} className='my-5 text-blue-500 hover:text-blue-700 hover:underline'>Login</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Signup
