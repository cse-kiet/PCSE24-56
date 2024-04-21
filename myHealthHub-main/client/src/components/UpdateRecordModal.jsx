import { useState } from 'react';
import React from 'react';
import { Modal, Button, Input } from 'antd';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

import {Url} from '../backenedUrl';
import axios from 'axios';

const UpdateRecordModal = ({ visible, onClose ,id, updaterecord}) => {
  const [updateRecord, setUpdateRecord] = useState(updaterecord);
    const [file, setFile] = useState(null);

 //  change the record  differnt state
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      if (name === "appointmentDate") {
        setUpdateRecord({
          ...updateRecord,
          [name]: value ? dayjs(value).format("YYYY-MM-DD") : null,
        });
      } else if (name === "appointmentTime") {
        setUpdateRecord({
          ...updateRecord,
          [name]: value ? dayjs(value).format("HH:mm") : null,
        });
      } else if (name === "file") {
        setFile(event.target.files[0]);
      } else if (name === "doctorName" || name === "treatment") {
        setUpdateRecord({
          ...updateRecord,
          [name]: value,
        });
      }
    };
    // upddate new states in the record
    
    const handleSave = async (id) => {
      try {
        const formData = new FormData();
        
          formData.append('file', file);
        
        formData.append('doctorName', updateRecord.doctorName);
        formData.append('treatment', updateRecord.treatment);
        formData.append('appointmentDate', updateRecord.appointmentDate);
        formData.append('appointmentTime', updateRecord.appointmentTime);
    
        // Check if a file has been selected and append it to the FormData object
        
    
        const response = await axios.put(`${Url}/api/editrecord/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        onClose();
      } catch (error) {
        console.error(error);
      }
    };
    
      
      

  return (
    <Modal
      open={visible}
      title="Add Record"
      onCancel={onClose}
      footer={[
        <Button key="cancel" className='border-2 rounded-md' onClick={onClose}>Cancel</Button>,
        <Button key="save" className='bg-blue-600 text-white border-3 rounded-md' onClick={() => handleSave(id)}>Save</Button>
      ]}
    >
      <div className='mt-3 border-2 rounded-md'>
        <Input
          placeholder="Doctor Name"
          value={updateRecord.doctorName}
          onChange={handleChange}
        />
      </div>
      <div className='mt-3 border-2 rounded-md'>
        <Input
          placeholder="Treatment"
          value={updateRecord.treatment}
          onChange={handleChange}
        />
      </div>
      <div className='mt-3 p-2 border-2 rounded-md'>
        <label htmlFor="pdf-upload">PDF:</label>
        <br />
        <input type="file" id="pdf-upload" name="file" accept="application/pdf" onChange={handleChange} />

      </div>
      <div className='flex items-center justify-between space-x-3 mt-3'>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
                className='border-2 rounded-md'
                label="Select Date"
                value={updateRecord.appointmentDate ? dayjs(updateRecord.appointmentDate) : null}
                name="appointmentDate" // added name prop
                onChange={(date) =>
                  setUpdateRecord({
                    ...updateRecord,
                    appointmentDate: date ? dayjs(date).format("YYYY-MM-DD") : null,
                  })
                }
               
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker', 'TimePicker']}>
              <TimePicker
                className='border-2 rounded-md'
                label="Select Time"
                value={updateRecord.appointmentTime ? dayjs(updateRecord.appointmentTime, "HH:mm") : null}
                name="appointmentTime" // added name prop
                onChange={(time) =>
                  setUpdateRecord({
                    ...updateRecord,
                    appointmentTime: time ? dayjs(time).format("HH:mm") : null,
                  })
                }
               
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>
    </Modal>
    
  );
};

export default UpdateRecordModal;
