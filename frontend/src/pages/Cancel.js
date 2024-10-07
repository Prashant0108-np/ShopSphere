import React from 'react'
import { Link } from 'react-router-dom'
import cancelImage from '../assest/assests/Cancel.gif'

const Cancel = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto justify-center items-center mt-6 rounded'>
      <div className='flex mix-blend-multiply justify-center items-center flex-col p-4'>
        <img src={cancelImage} alt="" width={90} height={90} />
        <p className='text-red-600 font-bold text-xl'>Payment Cancelled</p>
        <Link to={"/cart"} className='p-2 px-3 my-3 mt-5 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white'>Go to Cart</Link>
      </div>
    </div>
  )
}

export default Cancel
