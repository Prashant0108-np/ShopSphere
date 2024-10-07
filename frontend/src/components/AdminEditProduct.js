import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import SummaryApi from '../common';
import { toast } from 'react-toastify'

const AdminEditProduct = ({
    onClose,
    productData,
    fetchData
}) => {

    const [data, setData] = useState({
        ...productData,
        produtName: productData?.produtName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice
    })

    const [openFullScreenImage, setopenFullScreenImage] = useState(false)

    const [fullScreenImage, setfullScreenImage] = useState("")

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]

        const uploadImageCloudinary = await uploadImage(file)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadImageCloudinary.url]
            }
        })

    }

    const handleDeleteProductImage = async (index) => {
        console.log("image index", index)

        const newProdcutImage = [...data.productImage]
        newProdcutImage.splice(index, 1)

        setData((preve) => {
            return {
                ...preve,
                productImage: [...newProdcutImage]
            }
        })
    }

    {/**Upload Product */ }
    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json()

        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchData()
        }

        if (responseData.error) {
            toast.error(responseData?.message)
        }

    }

    return (
        <div className='fixed bg-slate-200 bg-opacity-45 top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-full'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold text-lg'>
                        Edit Product
                    </h2>
                    <div className='w-fit ml-auto text-2xl hover:text-pink-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll max-h-[90%] pb-5' onSubmit={handleSubmit}>

                    <label htmlFor="productName">Product Name</label>
                    <input
                        type="text"
                        id='productName'
                        placeholder='Enter product name'
                        name='produtName'
                        value={data.produtName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor="brandName" className='mt-3'>Brand</label>
                    <input
                        type="text"
                        id='brandName'
                        placeholder='Enter product brand'
                        name='brandName'
                        value={data.brandName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor="category" className='mt-3'>Category</label>
                    <select required value={data.category} name='category' onChange={handleOnChange} className='p-2 bg-slate-100 border rounded'>
                        <option value="">Select product category</option>
                        {
                            productCategory.map((el, index) => {
                                return (
                                    <option value={el.value} key={el.value + index}>{el.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor="productImage" className='mt-3'>Product Image</label>
                    <label htmlFor="uploadImageInput">
                        <div className='p-2 bg-slate-100 border rounded h-48 w-full flex justify-center cursor-pointer items-center'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2 cursor-pointer'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Upload product image</p>
                                <input type="file" id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>
                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data.productImage.map((el, index) => {
                                            return (
                                                <div className='relative group' >
                                                    <img
                                                        src={el}
                                                        width={80}
                                                        height={80}
                                                        alt={el}
                                                        className='bg-slate-100 border cursor-pointer'
                                                        onClick={() => {
                                                            setopenFullScreenImage(true)
                                                            setfullScreenImage(el)
                                                        }}
                                                    />
                                                    <div className='absolute bottom-0 right-0 p-1 bg-red-600 text-white rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                                                        <MdDelete />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>*Please upload product image</p>
                            )
                        }
                    </div>

                    <label htmlFor="price" className='mt-3'>Price</label>
                    <input
                        type="number"
                        id='price'
                        placeholder='Enter product price'
                        name='price'
                        value={data.price}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor="sellingPrice" className='mt-3'>Selling Price</label>
                    <input
                        type="number"
                        id='sellingPrice'
                        placeholder='Enter selling price'
                        name='sellingPrice'
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100 border rounded'
                        required
                    />

                    <label htmlFor="description" className='mt-3'>Description</label>
                    <textarea
                        name="description"
                        id=""
                        className='h-50 col={5} bg-slate-100 border rounded p-1'
                        placeholder='Enter product description'
                        rows={3}
                        onChange={handleOnChange}
                        value={data.description}
                    >
                    </textarea>

                    <button className='px-3 py-2 mt-10 rounded bg-pink-500 text-white mb-10 hover:bg-pink-600'>Update Product</button>

                </form>
            </div>

            {/**Display image in full screen */}
            {
                openFullScreenImage &&
                <DisplayImage onClose={() => setopenFullScreenImage(false)} imgUrl={fullScreenImage} />
            }


        </div >
    )
}

export default AdminEditProduct
