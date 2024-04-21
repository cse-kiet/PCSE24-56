import { useState }  from 'react';
import React from 'react';
import { Modal, Button, Input } from 'antd';
// import { TimePicker } from 'antd';
// import { DatePicker, Space } from 'antd';

import moment from 'moment';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

import {Url} from '../backenedUrl';

const UpdateNoteModal = ({ visible, onClose,  id, updatenote }) => {
    const [note, setNote] = useState(updatenote);

  //  change the appointment  differnt state

    const handleChange = (event) => {
  const { name, value } = event.target;
  if (name === "appointmentDate") {
    setUpdaterecord({
      ...updaterecord,
      [name]: value ? dayjs(value).format("YYYY-MM-DD") : null,
    });
  } else if (name === "appointmentTime") {
    setUpdaterecord({
      ...updaterecord,
      [name]: value ? dayjs(value).format("HH:mm") : null,
    });
  } else if (name === "file") {
    setFile(event.target.files[0]);
  } else {
    setUpdaterecord({
      ...updaterecord,
      [name]: value,
    });
  }
};

      
      
// upddate new states in the appoiment
    
      const handleSubmit = async (id) => {
        
        const response = await fetch(`${Url}/api/modifynotes/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(note)
        });
        const data = await response.json();
        setNote(data);
        onClose();
      };

     

  return (
    <Modal
  open={visible} 
  title="Add Note"
  onCancel={onClose}
  footer={[
    <Button key="cancel" className='border-2 rounded-md' onClick={onClose}>Cancel</Button>,
    <Button key="save" className='bg-blue-600 text-white border-3 rounded-md' onClick={() => handleSubmit(id)}>Save</Button>
  ]}
>
<div className='flex items-center justify-center border-2 rounded-md'>
        <Input.TextArea rows={4} value={note.note} onChange={handleChange} placeholder="Enter your note here" />

      </div>
  <div className='mt-3  border-2 rounded-md'>
    <Input
      placeholder="Doctor Name"
      name="doctorName"
      value={note.doctorName}
      onChange={handleChange}
    />
  </div>
  <div className='mt-3  border-2 rounded-md'>
    <Input
      placeholder="Treatment"
      name="treatment"
      value={note.treatment}
      onChange={handleChange}
    />
  </div>
  <div className='flex items-center justify-between space-x-3 mt-3  '>
    <div className=''>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker
            className="border-2 rounded-md"
            label="Select Date"
            name="appointmentDate"
            value={note.appointmentDate ? dayjs(note.appointmentDate) : null}
            onChange={(value) => handleChange({ target: { name: "appointmentDate", value: value } })}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['TimePicker', 'TimePicker']}>
          <TimePicker
            label="Select Time"
            name="appointmentTime"
            value={note.appointmentTime ? dayjs(note.appointmentTime, "HH:mm") : null}
            onChange={(value) => handleChange({ target: { name: "appointmentTime", value: value } })}
          />
        </DemoContainer>
      </LocalizationProvider>
    </div>
  </div>
</Modal>

  );
};


export default UpdateNoteModal;
