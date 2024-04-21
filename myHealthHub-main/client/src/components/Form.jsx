import React, { useState,useContext } from 'react';
import { RegisterUser } from '../services/api';
import { DataContext } from './context';
import doctorMadam from '../images/doctorMadam.png'
export default function FormComponent() {

  const{unique,setUnique}=useContext(DataContext);
  const [values,setValues]=useState(
    {
      fname:'',
      lname:'',
      email:'',
      phone:'',
      place:'',
      height:'',
      weight:'',
      blood:'',
      age:''
  });

  const handleChange=(e)=>{
    setValues({...values,[e.target.name]: e.target.value})
  }

  const handleSubmit = async() =>{
    value.userid = unique;
    console.log(values);
    const response = await RegisterUser(values);
    if(!response)
      return;
    console.log(response);
  }

  return (
    <div>
      <div className="w-full h-full">
        <div className="grid grid-cols-4 items-center">

          <div className="col-span-2">
            <img src={doctorMadam} alt="doctor" />
          </div>

          <div className="col-span-2 mt-5">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                {/* fname */}
                <div className="sm:col-span-3">
                  <label htmlFor="fname" className="block text-sm font-medium leading-6 text-gray-900">First name</label>
                  <div className="mt-2">
                    <input type="text" name='fname' onChange={(e)=>handleChange(e)}
                    id="first-name" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                {/* lname */}
                <div className="sm:col-span-3">
                  <label htmlFor="lname" className="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                  <div className="mt-2">
                    <input type="text" name="lname" onChange={(e)=>handleChange(e)} id="last-name" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                {/* username */}
                <div className="sm:col-span-3">
                  <label htmlFor="uname" className="block text-sm font-medium leading-6 text-gray-900">User Name</label>
                  <div className="mt-2">
                    <input type="text" name="uname" id="uname" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                {/* email */}
                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                  <div className="mt-2">
                    <input id="email" name="email" type="email" 
                    onChange={(e)=>handleChange(e)} className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                {/* Phone number */}
                <div className="sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                  <div className="mt-2">
                    <input id="phone" name="phone" type="text" placeholder='Enter Phone number'
                    onChange={(e)=>handleChange(e)} className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                {/* gender */}
                <div className="sm:col-span-2">
                  <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">Gender</label>
                  <div className="mt-2">
                    <select id="gender" name="gender" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Others</option>
                    </select>
                  </div>
                </div>

                {/* Blood */}
                <div className="sm:col-span-2">
                  <label htmlFor="blood" className="block text-sm font-medium leading-6 text-gray-900">Blood Group</label>
                  <div className="">
                    <select id="blood" name="blood" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                    <option value="A+"> A+ </option>
                    <option value="A-"> A- </option>
                    <option value="B+"> B+ </option>
                    <option value="B-"> B- </option>
                    <option value="AB+"> AB+ </option>
                    <option value="AB-"> AB- </option>
                    <option value="O+"> O+ </option>
                    <option value="O-"> O- </option>
                    </select>
                  </div>
                </div>

                {/* Height */}
                <div className='sm:col-span-2'>
                  <label htmlFor="height"  className="block text-sm font-medium leading-6 text-gray-900">Height</label>
                  <input type="text" name="height"
                    onChange={(e)=>handleChange(e)} id="height" placeholder='Enter height in cm' className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>

                {/* Age */}
                <div className='sm:col-span-2'>
                  <label htmlFor="age"  className="block text-sm font-medium leading-6 text-gray-900">Age</label>
                  <input type="text" name="age"
                    onChange={(e)=>handleChange(e)} id="age" placeholder='Enter age' className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>

                {/* Weight */}
                <div className='sm:col-span-2'>
                  <label htmlFor="weight"  className="block text-sm font-medium leading-6 text-gray-900">Weight</label>
                  <input type="text" name="weight"
                    onChange={(e)=>handleChange(e)} id="height" placeholder='Enter weight in kg' className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>

                {/* place */}
                <div className="col-span-4">
                  <label htmlFor="place" className="block text-sm font-medium leading-6 text-gray-900">Place</label>
                  <div className="">
                    <input type="text" name="place"
                    onChange={(e)=>handleChange(e)} id="place" className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>


                <div className='sm:col-span-full ml-auto'>
                  <button onClick={()=>{handleSubmit()}} className='px-4 py-2 bg-[#0F5BFF] rounded-md text-white'>Submit</button>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>

  );
}
