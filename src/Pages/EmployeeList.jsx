import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDelete } from 'react-icons/md';
import BackButton from '../Components/BackButton.jsx';

function EmployeeList() {
  const [employeeList, setEmployeeList] = useState([]);
  const [count,setCount] = useState('')
  useEffect(() => {
    axios.get('http://localhost:3000/employee').then((res) => {
      setEmployeeList(res.data.data)
      setCount(res.data.count)
    }).catch((error) => {
      console.log(error)
    })
  })
  return (
    <div className='p-8 bg-employee-home h-[100vh] relative'>
      <BackButton className='absolute left-10 top-10'/>
      <div className='flex justify-between items-center mx-auto'>
        <h1 className='text-3xl text-white '>Employee Details</h1>
        <div className='flex justify-center items-center gap-x-3'>
          <h1 className='text-xl text-gray-400'>Total Count:{count}</h1>
          <Link to={'/employee/create'} className='p-1 border-2 rounded-md bg-neon-500 text-white'>Create Employee</Link>
        </div>
      </div>
      <table className='w-full border-separate border-spacing-2 mt-8'>
        <thead>
          <tr>
            <th className='text-white'>Id</th>
            <th className=' text-white'>Name</th>
            <th className=' text-white'>Email</th>
            <th className=' text-white'>Mobile No</th>
            <th className=' text-white'>Designation</th>
            <th className=' text-white'>Gender</th>
            <th className='text-white'>Course</th>
            <th className=' text-white'>Created Date</th>
            <th className='text-white'>Action</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee, index) => {
            return (
              <tr key={employee._id} className='h-8'>
                <td className='text-gray-300 text-center'>{index + 1}</td>
                <td className='text-gray-300 text-center'>{employee.name}</td>
                <td className='text-gray-300 text-center'>{employee.email}</td>
                <td className='text-gray-300 text-center'>{employee.mobile}</td>
                <td className='text-gray-300 text-center'>{employee.designation}</td>
                <td className='text-gray-300 text-center'>{employee.gender}</td>
                <td className='text-gray-300 text-center'>{employee.course}</td>
                <td className='text-gray-300 text-center'>{new Date(employee.createdAt).toLocaleString()}</td>
                <td className='text-gray-300 text-center'>
                  <div className='flex justify-center items-center'>
                    <Link to={`/employee/edit/${employee._id}`}>
                      <AiOutlineEdit className='text-2xl text-yellow-600' />
                    </Link>
                    <Link to={`/employee/delete/${employee._id}`}>
                      <MdOutlineDelete className='text-2xl text-red-600' />
                    </Link>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeList


