import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data,
    fetchData
}) => {

    const [editProduct, seteditProduct] = useState(false)

    return (
        <div className='bg-white p-4 rounded'>
            <div className='w-40 '>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]} alt="" width={120} height={120} className='mx-auto object-fill h-full' />
                </div>
                <h1 className='mt-1 text-ellipsis line-clamp-2'>{data.produtName}</h1>

                <div>
                    <p className='font-semibold'>
                        {
                            displayINRCurrency(data.sellingPrice)
                        }
                    </p>
                    <div className='w-fit ml-auto p-2 bg-green-300 mt-1 cursor-pointer hover:bg-green-500 hover:text-white rounded-full' onClick={() => seteditProduct(true)}>
                        <MdModeEditOutline />
                    </div>
                </div>


            </div>
            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={() => seteditProduct(false)} fetchData={fetchData} />
                )
            }
        </div>
    )
}

export default AdminProductCard
