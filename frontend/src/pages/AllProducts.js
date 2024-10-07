import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {

    const [openUploadProduct, setopenUploadProduct] = useState(false)
    const [allProducts, setallProducts] = useState([])

    const fetchAllProduct = async () => {
        const response = await fetch(SummaryApi.allProduct.url)
        const dataResponse = await response.json()

        console.log("Product Data", dataResponse)

        setallProducts(dataResponse?.data || [])
    }

    useEffect(() => {
        fetchAllProduct()
    }, [])

    return (
        <div>
            <div className='bg-white py-2 px-4 flex justify-between items-center'>
                <h2 className='font-bold text-lg'>All Products</h2>
                <button className='border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white transition-all py-1 px-3 rounded-full'
                    onClick={() => setopenUploadProduct(true)}
                >
                    Upload a new product
                </button>
            </div>

            {/**All Products */}
            <div className='flex items-center flex-wrap gap-5 py-4 pl-3 overflow-y-scroll h-[calc(100vh-190px)]'>
                {
                    allProducts.map((product, index) => {
                        return (
                            <AdminProductCard data={product} key={index + "allProduct"} fetchData={fetchAllProduct} />
                        )
                    })
                }
            </div>

            {/**Upload Product Component */}
            {
                openUploadProduct && (
                    <UploadProduct onClose={() => setopenUploadProduct(false)} fetchData={fetchAllProduct} />
                )
            }
        </div>
    )
}

export default AllProducts
