import React, {useState} from 'react'
import {  AiOutlineDelete,AiOutlineEdit, AiOutlineDownload} from "react-icons/ai";
import moment from 'moment';
import {UpdateRecordModal} from '../components'
import axios from 'axios';

import {Url} from '../backenedUrl';


const RecordDetail = ({date, time, doctorName, treatment, onDelete, onDownload, file, id}) => {
  const [updateRecord, setUpdateRecord] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);

  // update the specific record

  const UpdateRecord = async (id) => { 
    try {
      const response = await axios.get(`${Url}/api/add-record/${id}`);
      setUpdateRecord(response.data);
      setIsModalVisible(true);
    } catch (error) {
      console.error(error);
    } 
  };

  return (
    <div className='flex items-center mt-5 p-2 border-2 rounded-md bg-white justify-center w-11/12'>
    <div className='grid grid-cols-8 m-3 gap-2'>
         <div className='col-span-1'>
         <div className='flex flex-col gap-1 w-full items-center justify-between '>
              <p className='font-inter font-semibold text-sm  text-slate-500'>Date</p>
              <p className='font-inter ml-5 font-medium text-sm w-full text-slate-300'>{moment(date).format("MMM Do YYYY")}</p>
            </div>
          </div>  

          <div className='col-span-1'>
            <div className='flex flex-col gap-1 w-full items-center justify-center '>
            <p className='font-inter font-semibold text-sm  text-slate-500'>Time</p>
              <p className='font-inter font-medium text-sm  text-slate-300'>{moment(time, "HH:mm").format("h:mm A")}
          </p>
            </div>
        </div> 


        <div className='col-span-1'>
            <div className='flex flex-col gap-1 w-full items-center justify-center '>
            <p className='font-inter font-semibold text-sm  text-slate-500'>Dr Name</p>
              <p className='font-inter font-medium text-sm  text-slate-300'>{doctorName}
            </p>
            </div>
        </div>

        <div className='col-span-1'>
            <div className='flex flex-col gap-1 w-full items-center justify-center '>
            <p className='font-inter font-semibold text-sm  text-slate-500'>Treatment</p>
            <p className='font-inter font-medium text-sm  text-slate-300'>{treatment}</p>
            </div>
        </div>

        <div className='col-span-1'>
            <div className='flex flex-col gap-1 w-full items-center justify-center '>
            <p className='font-inter font-semibold text-sm  text-slate-500'>Pdf</p>
            <p className='font-inter font-medium text-sm  text-slate-300'>{file}</p>
            </div>
        </div>
        <div className='col-span-1'>
            <div className='flex flex-col gap-1 w-full items-center justify-center '>
            <p className='font-inter font-semibold text-sm  text-slate-500'>Edit</p>
            <AiOutlineEdit onClick={() => UpdateRecord(id)} style={{fontSize: '22px'}} className='cursor-pointer'/>
            </div>
        </div>
        {isModalVisible &&  (
            <UpdateRecordModal
              visible ={isModalVisible}
              onClose={() => setIsModalVisible(false)}
              onCancel={() => setIsModalVisible(false)}
              updaterecord={updateRecord}
              id ={id}
          
            />
          )}
        <div className='col-span-1'>
            <div className='flex flex-col gap-1 w-full items-center justify-center '>
            <p className='font-inter font-semibold text-sm  text-slate-500 '>Download</p>
            <AiOutlineDownload style={{fontSize: '22px'}} className='cursor-pointer' onClick={() => onDownload(id)}/>
            </div>
        </div>
        <div className='col-span-1'>
            <div className='flex flex-col  w-full items-center justify-center '>
            
            <div className='flex items-center justify-center cursor-pointer mt-1'>
            <AiOutlineDelete onClick={() => onDelete(id)} style={{fontSize: '25px'}}/>
            </div>
            </div>
        </div>
    </div>

   </div>
  )
}

export default RecordDetail
