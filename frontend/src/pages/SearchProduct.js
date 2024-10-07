import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticleCard from '../components/VerticleCard'

const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    console.log("query", query.search)

    const fetchProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url + query.search)
        const dataResponse = await response.json()
        setLoading(false)

        setData(dataResponse.data)
    }

    useEffect(() => {
        fetchProduct()
    }, [query])

    return (
        <div className='container mx-auto px-12 p-4'>
            {
                loading && (
                    <p className='text-lg text-center'>Searching Products ...</p>
                )
            }
            <p className='text-lg font-semibold my-3'>Search Results: {data.length}</p>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white text-lg text-center p-4'>No Product Found</p>
                )
            }

            {
                data.length !== 0 && !loading && (
                    <VerticleCard loading={loading} data={data} />
                )
            }
        </div>
    )
}

export default SearchProduct
