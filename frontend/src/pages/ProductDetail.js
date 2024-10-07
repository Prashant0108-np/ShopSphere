import React, { useCallback, useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';


const ProductDetails = () => {

    const [data, setData] = useState({
        produtName: "",
        brandName: "",
        category: "",
        productImage: [],
        description: "",
        price: "",
        sellingPrice: ""
    })

    const params = useParams()
    const [loading, setLoading] = useState(true)
    const productImageListLoading = new Array(4).fill(null)
    const [activeImage, setActiveImage] = useState("")

    const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
        x: 0,
        y: 0
    })

    const [zoomImage, setZoomImage] = useState(false)

    const { fetchUserAddToCart } = useContext(Context)
    const navigate = useNavigate()

    const fetchProductDetails = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.productDetails.url, {
            method: SummaryApi.productDetails.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                productId: params?.id
            })
        })
        setLoading(false)
        const dataResponse = await response.json()

        setData(dataResponse?.data)
        setActiveImage(dataResponse?.data.productImage[0])
    }

    console.log("data", data)

    useEffect(() => {
        fetchProductDetails()
    }, [params])

    const handleMouseEnterProduct = (imgURL) => {
        setActiveImage(imgURL)
    }

    const handleZoomImage = useCallback((e) => {
        setZoomImage(true)
        const { left, top, width, height } = e.target.getBoundingClientRect()
        console.log("coordinate", left, top, width, height)

        const x = (e.clientX - left) / width
        const y = (e.clientY - top) / height

        setZoomImageCoordinate({
            x,
            y
        })
    }, [zoomImageCoordinate])

    const handleLeaveImageZoom = () => {
        setZoomImage(false)
    }

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    const handleBuyProduct = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
        navigate("/cart")
    }

    return (
        <div className='container mx-auto px-12 p-4'>
            <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
                {/**Product Image */}
                <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

                    <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-3'>
                        <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} alt="" />

                        {/**Product zoom */}
                        {
                            zoomImage && (
                                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                                    <div
                                        className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                                        style={{
                                            backgroundImage: `url(${activeImage})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                                        }}
                                    >

                                    </div>
                                </div>
                            )
                        }
                    </div>

                    <div className='h-full'>
                        {
                            loading ? (
                                <div className='flex gap-3 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                    {
                                        productImageListLoading.map((el, index) => {
                                            return (
                                                <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage" + index}>

                                                </div>)
                                        })
                                    }
                                </div>
                            ) :
                                (
                                    <div className='flex gap-3 lg:flex-col overflow-scroll scrollbar-none h-full'>
                                        {
                                            data?.productImage?.map((imgURL, index) => {
                                                return (
                                                    <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                                                        <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)} alt="" />
                                                    </div>)
                                            })
                                        }
                                    </div>
                                )
                        }
                    </div>
                </div>
                {/**Product Details */}
                {
                    loading ? (
                        <div className='grid gap-2 w-full'>
                            <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block'></p>
                            <h2 className='text-2xl lg:text-4xl font-medium rounded-full h-6 lg:h-8 bg-slate-200 animate-pulse w-full'></h2>
                            <p className='capitalize text-slate-400 bg-slate-200 min-w-[200px] animate-pulse h-6 lg:h-8 rounded-full w-full'></p>
                            <div className='flex text-green-700 bg-slate-200 h-6 lg:h-8 animate-pulse rounded-full items-center w-full gap-1'>

                            </div>
                            <div className='flex items-center gap-2 text-xl lg:text-2xl font-medium my-1 h-6 lg:h-8 animate-pulse w-full'>
                                <p className='text-red-600 bg-slate-200 w-full'></p>
                                <p className='text-slate-500 bg-slate-200 w-full line-through'></p>
                            </div>

                            <div className='flex items-center gap-3 my-2'>
                                <button className='h-6 lg:h-8 bg-slate-200 rounded-full animate-pulse w-full'></button>
                                <button className='h-6 lg:h-8 bg-slate-200 rounded-full animate-pulse w-full'></button>
                            </div>
                            <div>
                                <p className='text-slate-600 font-medium my-1 h-6 lg:h-12 bg-slate-200 rounded-full animate-pulse text-xl w-full'></p>
                                <p></p>
                            </div>
                        </div>
                    ) :
                        (
                            <div className='flex flex-col gap-1'>
                                <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
                                <h2 className='text-2xl lg:text-4xl font-medium'>{data?.produtName}</h2>
                                <p className='capitalize text-slate-400'>{data?.category}</p>
                                <div className='flex text-green-700 items-center gap-1'>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStarHalf />
                                </div>
                                <div className='flex items-center gap-2 text-xl lg:text-2xl font-medium my-1'>
                                    <p className='text-red-600'>{displayINRCurrency(data?.sellingPrice)}</p>
                                    <p className='text-slate-500 line-through'>{displayINRCurrency(data?.price)}</p>
                                </div>

                                <div className='flex items-center gap-3 my-2'>
                                    <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-white bg-orange-400 font-medium hover:bg-orange-600' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy Now</button>
                                    <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-700 font-medium hover:bg-orange-600 hover:text-white' onClick={(e) => handleAddToCart(e, data?._id)}>Add to Cart</button>
                                </div>
                                <div>
                                    <p className='text-slate-600 font-medium my-1 text-xl'>Decription</p>
                                    <p>{data?.description}</p>
                                </div>
                            </div>
                        )
                }
            </div>

            {
                data.category && (
                    <CategoryWiseProductDisplay category={data?.category} heading={"Recomended Products"} />
                )
            }

        </div>
    )
}

export default ProductDetails
