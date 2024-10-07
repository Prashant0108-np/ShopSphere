import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";

import image1 from '../assest/assests/banner/img1.webp'
import image2 from '../assest/assests/banner/img2.webp'
import image3 from '../assest/assests/banner/img3.jpg'
import image4 from '../assest/assests/banner/img4.jpg'
import image5 from '../assest/assests/banner/img5.webp'

import image1Mobile from '../assest/assests/banner/img1_mobile.jpg'
import image2Mobile from '../assest/assests/banner/img2_mobile.webp'
import image3Mobile from '../assest/assests/banner/img3_mobile.jpg'
import image4Mobile from '../assest/assests/banner/img4_mobile.jpg'
import image5Mobile from '../assest/assests/banner/img5_mobile.png'

const BannerProduct = () => {

    const [currentImage, setcurrentImage] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setcurrentImage(preve => preve + 1)
        }
    }

    const preveImage = () => {
        if (currentImage != 0) {
            setcurrentImage(preve => preve - 1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {

            if (desktopImages.length - 1 > currentImage) {
                nextImage()
            } else {
                setcurrentImage(0)
            }
        }, 3000)
        return () => clearInterval(interval)
    }, [currentImage])

    return (
        <div className='container mx-auto px-12'>
            <div className='h-56 md:h-72 w-full bg-slate-200 rounded relative'>

                <div className='absolute z-10 w-full h-full md:flex items-center hidden'>
                    <div className='flex justify-between p-2 w-full text-3xl'>
                        <button onClick={preveImage} className='bg-white shadow-md rounded-full p-2 opacity-50'><FaAngleLeft /></button>
                        <button onClick={nextImage} className='bg-white shadow-md rounded-full p-2 opacity-50'><FaAngleRight /></button>
                    </div>
                </div>

                {/**Desktop and Tablet Version */}
                <div className='hidden md:flex h-full w-full overflow-hidden'>
                    {
                        desktopImages.map((imageURL, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageURL} alt='' className='w-full h-full' />
                                </div>
                            )
                        })
                    }
                </div>

                {/**Mobile Version */}
                <div className='flex h-full w-full overflow-hidden md:hidden'>
                    {
                        mobileImages.map((imageURL, index) => {
                            return (
                                <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURL} style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                    <img src={imageURL} alt='' className='w-full h-full object-cover' />
                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default BannerProduct
