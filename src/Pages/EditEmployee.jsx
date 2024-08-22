import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditEmployee() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/employee/${id}`).then((res) => {
      const data = res.data;
      setName(data.name);
      setEmail(data.email);
      setMobile(data.mobile);
      setDesignation(data.designation);
      setGender(data.gender);
      setCourse(data.course);
    });
  }, [id]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    const data = {
      name: name,
      email: email,
      mobile: mobile,
      designation: designation,
      gender: gender,
      course: course
    };
    axios.put(`http://localhost:3000/employee/edit/${id}`, data)
      .then(() => {
        navigate('/employee');
      })
      .catch((error) => {
        alert("An error occurred. Please check the details.");
      });
  };

  return (
    <div className='flex justify-center items-center h-[100vh] bg-employee-home'>
      <form onSubmit={handleSubmit} className='flex flex-col justify-start gap-y-2 p-8 rounded-md w-[460px] mb-6 mx-auto border-2 shadow-white '>
        <h1 className='text-3xl mb-5 font-bold'>Edit Employee</h1>
        <label className='font-bold'>Name</label>
        <input
          className='border-2 border-slate-400 w-[400px] p-2 rounded-xl'
          type='text'
          placeholder='Enter Name'
          value={name}
          onChange={handleNameChange}
          key='name'
        />
        <label className='font-bold'>Email</label>
        <input
          className='border-2 border-slate-400 w-[400px] p-2 rounded-xl'
          type='email'
          placeholder='Enter Email'
          value={email}
          onChange={handleEmailChange}
          key='email'
        />
        <label className='font-bold'>Mobile</label>
        <input
          className='border-2 border-slate-400 w-[400px] p-2 rounded-xl'
          type='number'
          placeholder='Enter Mobile'
          value={mobile}
          onChange={handleMobileChange}
          key='mobile'
        />
        <label className='font-bold'>Designation</label>
        <select
          className='border-2 border-slate-400 w-[400px] p-2 rounded-xl'
          value={designation}
          onChange={handleDesignationChange}
          key='designation'
        >
          <option value=''>Select Designation</option>
          <option value='HR'>HR</option>
          <option value='Manager'>Manager</option>
          <option value='Sales'>Sales</option>
        </select>
        <label className='font-bold'>Gender</label>
        <div>
          <input
            type='radio'
            id='male'
            name='gender'
            value='male'
            checked={gender === 'male'}
            onChange={handleGenderChange}
            key='male'
          />
          <label htmlFor='male'>Male</label>
          <input
            type='radio'
            id='female'
            name='gender'
            value='female'
            checked={gender === 'female'}
            onChange={handleGenderChange}
            key='female'
          />
          <label htmlFor='female'>Female</label>
        </div>
        <label className='font-bold'>Course</label>
        <select
          className='border-2 border-slate-400 w-[400px] p-2 rounded-xl'
          value={course}
          onChange={handleCourseChange}
          key='course'
        >
          <option value=''>Select Course</option>
          <option value='MCA'>MCA</option>
          <option value='BCA'>BCA</option>
          <option value='BSC'>BSC</option>
        </select>
        <button type='submit' className='p-2 text-center text-white w-[400px] font-bold bg-sky-950 rounded-xl mt-2  transition-all duration-500 hover:scale-110'>Submit</button>
      </form>
    </div>
  );
}

export default EditEmployee;
