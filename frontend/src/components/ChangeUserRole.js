import React, { useState } from 'react'
import ROLE from '../common/role'
import { MdClose } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {

    const [userRole, setUserRole] = useState(role)

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)

        console.log(e.target.value)
    }

    const updateUserRole = async () => {
        const fetchResponse = await fetch(SummaryApi.updateUser.url, {
            method: SummaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                role: userRole
            })
        })

        const responseData = await fetchResponse.json()

        if (responseData.success) {
            toast.success(responseData.message)
            onClose()
            callFunc()
        }

        console.log("Role Updated", responseData)
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-55'>
            <div className='mx-auto bg-white rounded shadow-md w-full p-4 max-w-sm'>

                <button className='block ml-auto' onClick={onClose}>
                    <MdClose />
                </button>

                <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
                <p>Name : {name}</p>
                <p>Email : {email}</p>

                <div className='flex items-center justify-between my-4'>
                    <p>Role</p>
                    <select className='border rounded px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                        {
                            Object.values(ROLE).map(el => {
                                return (
                                    <option value={el} key={el}>
                                        {el}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>

                <button className='w-fit mx-auto block py-1 px-3 text-white hover:bg-blue-500 bg-blue-400 rounded-full' onClick={updateUserRole}>Change Role</button>

            </div>
        </div>
    )
}

export default ChangeUserRole
