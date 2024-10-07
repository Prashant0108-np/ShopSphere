import React from 'react'
import { Link } from 'react-router-dom'
import successImage from '../assest/assests/Success.gif'

const Success = () => {
    return (
        <div className='bg-slate-200 w-full max-w-md mx-auto justify-center items-center mt-6 rounded'>
            <div className='flex mix-blend-multiply justify-center items-center flex-col p-4'>
                <img src={successImage} alt="" width={220} height={220} />
                <p className='text-green-600 font-bold text-xl'>Payment Successful</p>
                <Link to={"/order"} className='p-2 px-3 my-3 mt-5 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white'>Track Orders</Link>
            </div>
        </div>
    )
}

export default Success
