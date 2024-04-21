import React from 'react'
import { GrNotes } from "react-icons/gr";


import { Popover, Button, Text } from "@nextui-org/react";
import moment from 'moment';
import axios from 'axios';

import {Url} from '../backenedUrl';

const Docu = ({date, time, doctorName, treatment, note, file, tab, id}) => {
   
  // download the pdf file

  const handleDownload = async (id) => { 
    try {
      const response = await axios.get(`${Url}/recordfiledownload/${id}`, {
        responseType: 'blob',
      });
  
      const contentDisposition = response.headers['content-disposition'];
      const filename =
        contentDisposition && typeof contentDisposition === 'string'
          ? contentDisposition.split('filename=')[1]
          : 'download.pdf';
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');

      link.href = url;
      link.download = `${filename}.pdf`;
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.log(err);
      alert('An error occurred while downloading the file');
    }
  };


  return (
    <div className='flex ml-3 items-center justify-center w-full p-2 border-2 rounded-lg bg-white '>
       <div className='grid grid-cols-11 mt-5 gap-3'>
            <div className='col-span-1'>
                <div className='flex flex-col w-full items-center justify-between '>
                  <p className='font-inter font-semibold text-sm  text-slate-500'>Date</p>
                  <p className='font-inter ml-5 font-medium text-sm w-full text-slate-300'>{moment(date).format("MMM Do YYYY")}</p>
                </div>
            </div>
            < div  className='w-px h-8 ml-7 bg-slate-300' />
            <div className='col-span-1'>
                <div className='flex flex-col w-full items-center justify-center '>
                <p className='font-inter font-semibold text-sm  text-slate-500'>Time</p>
                  <p className='font-inter font-medium text-sm  text-slate-300'>{moment(time, "HH:mm").format("h:mm A")}
</p>
                </div>
            </div>
            < div  className='w-px h-8 ml-7 bg-slate-300' />
            <div className='col-span-2'>
                <div className='flex flex-col w-full items-center justify-center '>
                <p className='font-inter flex items-center justify-center font-semibold text-sm  text-slate-500'>Dr. Name</p>
                <p className='font-inter flex items-center justify-center font-medium text-sm  text-slate-300'>{doctorName}</p>
                </div>
            </div>
            < div  className='w-px h-8 ml-7 bg-slate-300' />
            <div className='col-span-1'>
                <div className='flex flex-col w-full items-center justify-center '>
                <p className='font-inter font-semibold text-sm  text-slate-500'>Treatment</p>
                <p className='font-inter font-medium text-sm  text-slate-300'>{treatment}</p>
                </div>
            </div>
            < div  className='w-px h-8 ml-7 bg-slate-300' />
             <div className='col-span-2 '>
                <div className='flex items-center -ml-4 justify-start gap-2'>
                {tab === "Medical Records" ? (
                   <>
                   <GrNotes style={{color:'#2d3ed6', fontSize: 20} }/>
                  <Button  onClick={() => handleDownload(id)} auto flat>{file}</Button>
                   </>
                ) : (
                  <>
                  <GrNotes style={{color:'#2d3ed6', fontSize: 20} }/>
                  <p className='font-inter font-semibold text-sm  text-sky-500'>
                  <Popover>
                 <Popover.Trigger>
                   <Button auto flat>Open Notes</Button>
                 </Popover.Trigger>
                <Popover.Content>
              <Text css={{ p: "$10" }}>{note}</Text>
              </Popover.Content>
           </Popover>
        </p>
       </>
        )}
       </div>
      </div>
       </div>
    </div>
    );
};

export default Docu;





