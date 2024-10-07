import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import moment from 'moment'

const OrderPage = () => {

  const [data, setData] = useState([])

  const fetchOrderDetails = async () => {
    const response = await fetch(SummaryApi.getOrder.url, {
      method: SummaryApi.getOrder.method,
      credentials: 'include'
    })

    const responseData = await response.json()
    setData(responseData.data)
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  return (
    <div>
      {
        !data[0] && (
          <p>No orders found</p>
        )
      }

      <div>
        {
          data?.map((item, index) => {
            return (
              <div key={item.userId + index}>
                <p className='font-medium text-lg'>{moment(item.createdAt).format('LLL')}</p>
                <div>
                  {
                    item?.productDetails.map((product, index) => {
                      return (
                        <div>
                          <img
                            src={product?.image[0]}
                            className='w-28 h-28 bg-slate-200'
                          />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>

    </div>
  )
}

export default OrderPage
