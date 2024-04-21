import { fontSize } from '@mui/system';
import React, { useState, useEffect,useContext } from 'react';


import { BsPerson, } from "react-icons/bs";
import { AiOutlineSearch ,AiOutlineDelete,AiOutlineDown,AiOutlinePlus, AiTwotoneBell, AiOutlineRight,AiFillPrinter} from "react-icons/ai";
import Badge from '@mui/material/Badge';
import {BiEdit, BiCommentAdd, BiDownload} from 'react-icons/bi'
import { Button, Timeline } from 'antd';
import { Image } from 'antd';
import moment from 'moment';

import {  Modal, Space } from 'antd';
import { DataContext } from '../components/context';

import { Url } from '../backenedUrl';

import {Docu,AddNoteModal, AddRecord} from "../components"
import { HiOutlineDocumentText,HiOutlineExclamationCircle } from "react-icons/hi";
import axios from 'axios';
import { Loading, Spacer } from "@nextui-org/react";

import { Input } from 'antd';
import Form from '../components/Form';

let mid;

const Profile = () => {
  const{unique,setUnique}=useContext(DataContext);
  const [reverse, setReverse] = useState(false);
  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Upcomming Appoinments");
  const [show, setShow] = useState(true);
  const [notes, setNotes] = useState([]);
  const [latestNote, setLatestNote] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isrecordModalVisible, setIsrecordModalVisible] = useState(false);
  const [records, setRecords] = useState([]);
  const [formData,setFromdata]= useState([]);
  const [loading,setLoading]= useState(false);
 
  const half = Math.ceil(notes.length / 2);
  const firstHalf = notes.slice(0, half);
  const secondHalf = notes.slice(half);



  const { confirm } = Modal;

  // const handleSaveNote = (newNote) => {
  //   const updatedNotes = [...notes, { ...newNote }];
  //   setNotes(updatedNotes);
  //   setIsModalVisible(false);
  // };
  
// save the appoinment globally
  const handleSaveNote = async (newNote) => {
    try {
      const response = await fetch(`${Url}/api/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newNote)
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
  
      // console.log('Success:', data);
  
      const updatedNotes = [...notes, { ...data }];
      setNotes(updatedNotes);
  
      setIsModalVisible(false);
  
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  //fetching user from data

  useEffect(() => {
    async function fetchForm(unique) {
      setLoading(true);
      const response = await axios.get(`${Url}/form/${unique}`);
      setLoading(false);
      setFromdata(response.data);
      console.log(formData);
    }
    fetchForm(unique);
  }, []);

  // const {fname,lname,phone,age,blood,height,weight,place,uname}=formData[0];
  

  // const handleDeleteNote = (noteIndex) => {
  //   const noteId = notes[noteIndex]._id;
  //   fetch(`http://localhost:3001/api/notes/${noteId}`, {
  //     method: 'DELETE'
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     // console.log('Success:', data);
  //     const updatedNotes = [...notes];
  //     updatedNotes.splice(noteIndex, 1);
  //     setNotes(updatedNotes);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
  // };

  

  // useEffect((unique) => {
  //   fetch(`http://localhost:3001/api/notes/${unique}`)
  //     .then(response => response.json())
  //     .then(data => {
  //       // console.log('Success:', data);
  //       console.log(data);
  //       setNotes(data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log("hello this is error")
  //       console.error('Error:', error.message);
  //       setIsLoading(false);
  //     });
  // }, [setNotes]);

  useEffect(() => {
    async function fetchNotes(unique) {
      const response = await axios.get(`${Url}/api/notes/${unique}`);
      setNotes(response.data);
    }
    fetchNotes(unique);
  }, [setNotes]);

//fetching the latest added appointment
  useEffect(() => {
    async function fetchLatestNote(unique) {
      const response = await fetch(`${Url}/api/latest/${unique}`);
      const data = await response.json();
      setLatestNote(data);
    }
    fetchLatestNote(unique);
  }, []);
  
  mid = notes.length/2;

  
  // const documents = [
  //   { id: 1, date: '26 Nov 19', time: '19:00' },
  //   { id: 2, date: '26 Nov 19', time: '19:00' },
  //   { id: 3, date: 'D26 Nov 19', time: '19:00' },
  // ];

  

  const handleClick = (tabName) => {
    setActiveTab(tabName);
  };
  const handleReverse = () => {
    setReverse(!reverse);
  }
  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    {
      file && (
        handleUploadButtonClick()
      )
    }
  };
 

  const handleUploadButtonClick = async () => {
     const userid=unique;
    if (!file) {
      alert('Please select a file');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('userid',userid);
    setIsLoading(true);
    try {
      const response = await axios.post(`${Url}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFileId(response.data.fileId);
      alert('File uploaded successfully!');
    } catch (err) {
      console.log(err);
      alert('An error occurred while uploading the file');
    }
    finally {
      setIsLoading(false);
    }
  };

  async function deleteFile(fileId) {
    try {
      const response = await fetch(`${Url}/files/${fileId}`, {
        method: 'DELETE'
      });
  
      const data = await response.json();
    } catch (err) {
      console.log(err);
    }
  }
   
  // useEffect((unique) => {
  //   fetch(`http://localhost:3001/files/${unique}`) 
  //     .then((response) => response.json())
  //     .then((data) => setFiles(data));
  // }, [setFiles]);

  useEffect(() => {
    async function fetchFiles(unique) {
      const response = await fetch(`${Url}/files/${unique}`);
      const data = await response.json();
      setFiles(data);
      
    }
    fetchFiles(unique);
  }, [setFiles]);

  useEffect(() => {
    async function fetchRecords(unique) {
      const response = await fetch(`${Url}/api/add-record/${unique}`);
      const data = await response.json();
      setRecords(data);
      
    }
    fetchRecords(unique);
  }, [setRecords]);
   
  const handleDownloadButtonClick = async (id) => { 
    try {
      const response = await axios.get(`${Url}/download/${id}`, {
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

  const handleAddRecord = () => {
    setIsrecordModalVisible(true);
  };

  const handleCancel = () => {
    setIsrecordModalVisible(false);
  };

  return (
    <>
    {
      formData.length === 0 ? (
        <Form />
      ) :
      (
        <>   
        <div className='flex  items-center justify-between  '>
      <div className='flex  items-center gap-1 '>
       <div className='flex items-center'>
       <BsPerson  style={{color:'#2d3ed6', fontSize: 40} } />
       </div>
        <p className='font-inter font-bold text-3xl  text-slate-800  '>Daina Prince</p>
      </div>
      <div className='flex items-center '>
      <Input size="large" placeholder="Search" prefix={<AiOutlineSearch   />} className="w-full" />
      <div>
      <button className='bg-#068DA9 p-0.5 rounded-full ml-6 h-15 ' onClick={handleAddRecord}><AiOutlinePlus style={{color:'#d4d6e3', fontSize: 30}} >
      
      </AiOutlinePlus>
      
      </button>
      </div>
      {isrecordModalVisible && (
        <AddRecord
          visible={isrecordModalVisible}
          onClose={handleCancel}
          // onSave={handleSaveNote}
          onCancel={handleCancel}
        />
      )}

        
      <div className='flex items-center  bg-white  z-10 rounded-full p-0.5 ml-4 border-2 border-blue-700 '>
      <Badge badgeContent={4} color="primary" >
      <AiTwotoneBell style={{color:'#068DA9', fontSize: 30}} />
    </Badge>
      </div>
      </div>
    </div>
    <div className='w-full h-px mt-4 bg-slate-300' />

    <div className='w-full flex mt-2 items-center justify-between'>
      <div>
        <div className='flex items-center justify-center gap-1'>
        <p className='font-inter font-bold text-lg  text-black-00 m-2 '>Patient List</p>
        <AiOutlineRight style={{color:'#068DA9', fontSize: 25}} />
        <p className='font-inter font-semibold text-lg  text-slate-600 m-2 '>Daina Prince</p>
        
        </div>
    
      </div>
      <div className='flex items-center justify-between'>
      <div className='flex items-center   justify-center bg-white z-50 p-2 border-2 rounded-md '>
        < AiFillPrinter style={{color:'#068DA9', fontSize: 18}}  />
        </div>
        <div className='flex items-center ml-4  justify-center bg-white z-50 p-1 pr-2 border-2 rounded-md '>
        < BiEdit style={{color:'#068DA9', fontSize: 25}}  />
        <span className='font-inter font-semibold text-lg ml-1 text-slate-600 '>Edit Patient</span>
        </div>
      </div>

    </div>
    <div className='w-full h-px mt-4 bg-slate-300' />
     
    <div className='grid grid-cols-8 gap-4'>
    <div className='col-span-6'>
      <div className='grid grid-cols-6 gap-2'>
      <div className='col-span-2'>
        <div className='flex  flex-col  justify-center items-center p-8 mt-4 w-full h-auto rounded-md border-2 bg-white '>
           <div className=' relative  flex items-center  overflow-hidden h-24 w-24  object-contain rounded-full '>
            {/* <img src="https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt=""   /> */}
            <Image.PreviewGroup
            preview={{
             onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
          }}
          >
          <Image width={200} src="https://th.bing.com/th/id/OIP.jryuUgIHWL-1FVD2ww8oWgHaHa?w=180&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" />
    
          </Image.PreviewGroup>
          {/* <Image
    width={200}
    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  /> */}
           </div>
           <div className='flex flex-col justify-center items-center mt-2'>
           <p className='font-inter font-bold text-3xl  text-slate-800  '>Daina Prince</p>
           <p className='font-inter font-medium text-lg  text-slate-600 m-2 '>dainaprince655@gmail.com</p>
           </div>
           <div className='grid grid-cols-3 gap-3 items-center '>
               <div className='flex flex-col items-center justify-center'>
               <p>15</p>
              <h1>Posts</h1>
             
              </div> 
             < div  className='w-px h-8 ml-7 bg-slate-300' />
             <div className='flex  flex-col items-center justify-center'>
             <p>15</p>
              <h1>Upcoming</h1>
              
              </div> 
           </div>
           <Button className='flex items-center justify-center w-full h-auto border-2 mt-4 bg-white  rounded-md'>
           <p className='font-inter font-semibold text-lg   text-slate-600 m-2 '>Send Message</p>
           </Button>
        </div>
         
      </div>
      <div className='col-span-4 mt-4 '>
        <div className='flex  flex-col  p-4 w-full h-auto  rounded-md border-2 bg-white '>
         <div className='flex justify-around items-center gap-16 pt-8   '>
           <div className='flex flex-col items-center justify-center  '>
             <p className='font-inter font-semibold text-lg  text-slate-400 '>Gender</p>
             <p className='font-inter font-medium text-lg  text-slate-600 m-2'>Female</p>
           </div>
           <div className='flex flex-col items-center justify-center  '>
             <p className='font-inter font-semibold text-lg  text-slate-400 '>Birthday</p>
             <p className='font-inter font-medium text-lg  text-slate-600 m-2'>Feb 24,1997</p>
           </div>
           <div className='flex flex-col items-center justify-center'>
             <p className='font-inter font-semibold text-lg  text-slate-400 '>Phone No.</p>
             <p className='font-inter font-medium text-lg  text-slate-600 m-2'>944488484839</p>
           </div>
         </div>
         <div className='w-full h-px mt-1 bg-slate-300' />
         <div className='flex justify-around items-center gap-16 pt-8   '>
           <div className='flex flex-col items-center justify-center  '>
             <p className='font-inter font-semibold text-lg  text-slate-400 '>Street Address</p>
             <p className='font-inter font-medium text-lg  text-slate-600 m-2'>Shiva Colony</p>
           </div>
           <div className='flex flex-col items-center justify-center   '>
             <p className='font-inter font-semibold text-lg  text-slate-400 '>City</p>
             <p className='font-inter font-medium text-lg  text-slate-600  m-2'>Ghaziabhad</p>
           </div>
           <div className='flex flex-col items-center justify-center'>
             <p className='font-inter font-semibold text-lg  text-slate-400 '>ZIP Code</p>
             <p className='font-inter font-medium text-lg  text-slate-600 m-2'>484839</p>
           </div>
         </div>
          <div className='w-full h-px mt-1 bg-slate-300' />
          <div className='flex justify-around items-center gap-16 pt-8   '>
           <div className='flex flex-col items-center justify-center  '>
             <p className='font-inter font-semibold text-lg  text-slate-400 '>Member Status</p>
             <p className='font-inter font-medium text-lg  text-slate-600 m-2'>Active Member</p>
           </div>
           <div className='flex flex-col items-center justify-center  '>
             <p className='font-inter font-semibold text-lg  text-slate-400 '>Registerd Date</p>
             <p className='font-inter font-medium text-lg  text-slate-600 m-2'>Feb 24,2023</p>
           </div>
           <div className='flex flex-col items-center justify-center'>
             <p className='font-inter font-semibold text-lg  text-slate-400 '>Phone No.</p>
             <p className='font-inter font-medium text-lg  text-slate-600 m-2'>944488484839</p>
           </div>
         </div>
         <div className='w-full h-px mt-1 bg-slate-300' />
        </div>
        
      </div>
      </div>
     </div>
     <div className='col-span-2'>
      <div className='flex  flex-col mt-4  p-1 w-full h-full  rounded-lg border-2 bg-white'>
        <div className='flex justify-between p-4 items-center'>
          <p className='font-inter font-semibold text-sm  text-slate-500 m-2'>Notes</p>
          <p className='font-inter font-semibold text-sm  text-slate-500'>See All</p>
        </div>
        <div className='flex  w-full -mt-3 h-4/6  overflow-hidden'>
          <div className='flex flex-col  items-center border rounded-md  gap-20 justify-between w-full p-4 bg-slate-100 h-full m-2'>
            <div className='flex  flex-col w-full'>
              
                
                  <div className='flex items-center w-full justify-start' >
                    <p className='font-inter font-medium text-sm  text-slate-500'> - {latestNote.note}</p>
                  </div>
                
             
            </div>
            <div className='flex justify-end w-full'>
              <Button className='w-7/12 h-10 flex items-center justify-center border-2  rounded-lg p-2 bg-blue-600 ' onClick={() => setIsModalVisible(true)}>
                <p className='font-inter w-full font-semibold text-sm  text-white m-2 '>Add Appoinment</p>
              </Button>
            </div>
          </div>
        </div>
         {
           
            <div className='flex flex-col w-full items-center mt-3 justify-center'>
         <div className='flex items-center justify-start w-full ml-5'>
         <p className='font-inter font-medium text-sm  text-slate-500 '>
          {latestNote.treatment}
         </p>
         </div>
         <div className='flex items-center  w-full mt-2 justify-between'>
         
              <div className='flex items-center  ml-4 justify-center'>
           <BsPerson/>
           <span  className='font-inter font-medium text-sm  ml-3 text-slate-500 '>{`Dr ${latestNote.doctorName}`}</span>
          </div>          
             <div className='mr-4'>
            <p  className='font-inter font-medium text-sm  text-slate-500 '>{moment(latestNote.appointmentDate).format("MMM Do YYYY")}</p>
          </div>
             

         </div>
         </div>
           
         }
      </div>
     </div>
     {isModalVisible && (
  <AddNoteModal
    visible ={isModalVisible}
    onClose={() => setIsModalVisible(false)}
    onSave={handleSaveNote}
    onCancel={() => setIsModalVisible(false)}

  />
)}

    
    </div>

    <div className='grid grid-cols-8 gap-4 mt-5'>
      <div className='col-span-6 '>
        <div className='flex flex-col  bg-white  p-2 border rounded-lg w-full h-full'>
        <div className='flex flex-col mt-6 ml-3 h-13 items-center justify-start border-2 rounded-md bg-slate-200 w-3/4 p-1 '>
          <div className='flex items-center justify-between w-full'>
            <div className={`${activeTab === "Upcomming Appoinments" ? 'bg-white' : 'bg-slate-200'} cursor-pointer flex h-10 items-center border-2 rounded-md justify-center p-4`} onClick={() => handleClick("Upcomming Appoinments")} >
            <p className='font-inter font-bold text-sm  text-slate-500 ' >Upcomming Appoinments</p>
            </div>
            <div className={`${activeTab === "Past Appoinments" ? 'bg-white' : 'bg-slate-200'} cursor-pointer flex h-10 items-center border-2 rounded-md justify-center p-4`} onClick={() => handleClick("Past Appoinments")} >
            <p className='font-inter font-bold text-sm  text-slate-500 '>Past Appoinments</p>
            </div>
            <div className={`${activeTab === "Medical Records" ? 'bg-white' : 'bg-slate-200'} cursor-pointer flex h-10 items-center border-2 rounded-md justify-center p-4`} onClick={() => handleClick("Medical Records")} >
            <p className='font-inter font-bold text-sm  text-slate-500 '>Medical Records</p>
            </div>

          </div>
        </div>
        <div className='flex flex-col mt-5 p-4 rounded-md border-2 bg-slate-200 w-full h-full'>
         <div className='flex items-center justify-around '>
            <p className='font-inter font-bold text-sm ml-4 w-full  text-slate-500'>Appoinments</p>
            <div className='flex justify-end w-full  '>
               <div className='flex items-center justify-between p-2 border-2 rounded-md bg-white '   >
                {
                  !show ? <AiOutlineRight onClick={()=> setShow(!show) } className=" cursor-pointer"/> 
                  :
                  <AiOutlineDown onClick={()=> setShow(!show) } className=" cursor-pointer"/> 
                }
              
                 <span className='font-inter font-semibold text-sm ml-4  text-slate-500'>Show Appoinments</span>
               </div>
            </div>
         </div>
         <div className='w-full h-px mt-4 bg-slate-300' />

         <div className={`${show ? "flex" : 'hidden' }  items-center justify-start mt-5 ml-6`}  >
        <div>
          {
            activeTab === "Past Appoinments" && (
              <>
              <Timeline
        pending="Show More..."  reverse={reverse} >
        {secondHalf.map((doc) => (
          <Timeline.Item key={doc.id}>
            <Docu date={doc.appointmentDate} time={doc.appointmentTime} note={doc.note} treatment={doc.treatment} doctorName={doc.doctorName}  tab= "Past Appoinments" />
          </Timeline.Item>
        ))}
      </Timeline>
              </>
            )
          }
       {
          activeTab === "Upcomming Appoinments" && (
            <>
             <Timeline
        pending="Show More..."  reverse={reverse} >
        {firstHalf.map((doc) => (
          <Timeline.Item key={doc.id}>
            <Docu date={doc.appointmentDate} time={doc.appointmentTime} note={doc.note} treatment={doc.treatment} doctorName={doc.doctorName} tab="Upcomming Appoinments"/>
          </Timeline.Item>
        ))}
      </Timeline>
            </>
          )
       }
       {
            activeTab === "Medical Records" && (
              <>
              <Timeline
        pending="Show More..."  reverse={reverse} >
        {records.map((doc) => (
          <Timeline.Item key={doc.id}>
            <Docu date={doc.appointmentDate} time={doc.appointmentTime} file={doc.filename} treatment={doc.treatment} doctorName={doc.doctorName} id ={doc._id}  tab= "Medical Records" />
          </Timeline.Item>
        ))}
      </Timeline>
              </>
            )
          }
      <Button
        type="primary"
        style={{
          marginTop: 16,
          background: '#3e41e1',
        }}
        onClick={handleReverse}
      >
       Reverse
      </Button>

        </div>
      
         </div>
        </div>
        </div>
      </div>
      <div className='col-span-2'>
         <div className='flex flex-col items-center w-full h-auto   p-2  bg-white mt-5 border-2 rounded-lg'>
          <div className='flex items-center justify-between ml-3 mr-3 w-full mt-4'>
          <p className='font-inter font-semibold text-sm  text-slate-600'>Files / Documents</p>
          <div className='flex items-center justify-center gap-2'>
         <label>

          <input type="file" className='hidden cursor-pointer' onChange={handleFileInputChange}/>
          <BiCommentAdd />
         </label>
        
          
          
          <span className='font-inter font-semibold text-sm  text-sky-500'>Add Files</span>
          </div>
          </div>
          {
          isLoading ? (
          <>
          <div>
          <Loading size="xl" />
         <Spacer />
          </div>
          </>
          ) : (
    <>
       <div className='w-full'>
        {files.map((file) => (
          <div key={file._id} className='flex items-center justify-center w-full mt-5'>
            <div className='flex items-center w-full justify-between p-4 border-2 rounded-md bg-white'>
              <div className='flex items-center justify-center gap-2 '>
                <HiOutlineDocumentText />
                <span className='font-inter font-medium text-sm  text-slate-500 '>
                  {`${file.filename}.pdf`}
                </span>
              </div>
              <div className='flex items-center justify-center gap-2  '>
                <Space wrap >
                  <div className='cursor-pointer'>
                  <AiOutlineDelete 
                    onClick={() => {
                      confirm({
                        title: 'Do you want to delete these items?',
                        icon: <HiOutlineExclamationCircle />,
                        content: 'When clicked the OK button, this dialog will be closed after 1 second',
                        okButtonProps: {
                          style: {
                            backgroundColor: 'blue',
                            color: 'white'
                          }
                        },
                        onOk() {
                          return new Promise((resolve, reject) => {
                            setTimeout(() => {
                              if (Math.random() > 0.5) {
                                deleteFile(file._id)
                                  .then(() => resolve())
                                  .catch(() => reject(new Error('Delete file failed')));
                              } else {
                                reject(new Error('Random number is less than or equal to 0.5'));
                              }
                            }, 1000);
                          });
                        },
                        onCancel() {},
                      });
                    }}
                  />
                  </div>

                  <BiDownload
                 
                    onClick={() => {
                      Modal.confirm({
                        title: 'Do you want to download this file?',
                        icon: <HiOutlineExclamationCircle />,
                        
                        content: 'Some descriptions',
                        okButtonProps: {
                          style: {
                            backgroundColor: 'blue',
                            color: 'white'
                          }
                        },
                        onOk() {
                          handleDownloadButtonClick(file._id);
                        },
                        onCancel() {
                          console.log('Cancel');
                        },
                      });
                    }}
                  />
                  
                
                </Space>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

          

         </div>
      </div>

    </div>
        
        </>
      )
    }
    </>
  )
}
export default Profile