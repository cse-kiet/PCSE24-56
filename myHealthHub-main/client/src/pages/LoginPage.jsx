import React from 'react'
import { useState} from 'react'
import {Dialog,Box, TextField, Typography, Button,styled} from "@mui/material"
import { useContext } from 'react'
//local modules
import { AuthenticateSignup,Authenticatelogin } from '../services/AuthenticateUser'
import { v4 as uuid } from 'uuid';
// import { DataContext } from '../components/context'

const Component=styled(Box)`
height:50vh;
width:60vh;
`
const Wrapper=styled(Box)`
display:flex;
flex-direction:column;
padding:25px 35px; 
flex:1;
&>div,&>button,&>p{
    margin-top:10px;
}
`
const Text=styled(Typography)`
font-size:12px;
color:#878787;
`
const StyleButton=styled(Button)`
color:white;
background-color:#068DA9;
padding:10px 30px;
margin:15px 5;

`

function Loginpage(props) {
const{open,setopen,setuser,setAuthent}=props

const signupInitialValues={
    username:'',
    email:'',
    password:'',
}
const loginInitialValues={
    username:'',
    password:''
}
// const {unique,setUnique}=useContext(DataContext);
const [account,setAccount]=useState(true)
const [signup,setSignup]=useState(signupInitialValues);
const [login,setLogin]=useState(loginInitialValues);
const [error,setError]=useState(false);
const [loading,setLoading]=useState(false);
const [duplicate,setDuplicate]=useState(false);


//login
   const handleVchange=(e)=>{
    setLogin({...login,[e.target.name]:e.target.value});
   }
   //signup
   const handleChange=(e)=>{
    setSignup({...signup,[e.target.name]: e.target.value})
   }

    const handleClose=()=>{
        setopen(false);
        setError(false);

    }
    //clicking on login button
    const loginUser= async()=>{
        try{
        setLoading(true);
        let res= await Authenticatelogin(login);
        if(res.status ===200){  //wrong login credentials
        setuser(res.data.data.userid);
        setLoading(false);
        setAccount(true);
        setError(false);
        setopen(false);
        setAuthent(true);
        }else{
            setError(true);
            setLoading(false);
        }
        }catch(e){
            setError(true);
            setLoading(false);
        }
    }

    const handleClick=()=>{
      setAccount(false)
    }
    //clicking on signup button
    const signupUser= async()=>{
        try{
        const unique_id = uuid();
        const small_id = unique_id.slice(0,8);
        signup.userid=small_id;
       setLoading(true);
       let response=await AuthenticateSignup(signup);
       setLoading(false);
       if(response.status===401){ //duplicate values
       setDuplicate(true);
       }else{
        setuser(small_id);
        setDuplicate(false);
        setopen(false);
        setAuthent(true);
        //generating unique identifier
       }
        }catch(e){
            setLoading(false);
            setError(true);
        }
    }
    
    

  return (

        <Dialog open={open}  onClose={()=>handleClose()}  PaperProps={{sx:{maxWidth:'unset'}}}>
            <Component>
            { 
                    account?
                    <Wrapper>
                        
                        <TextField variant="standard" label="Enter username" name='username' onChange={(e)=>handleVchange(e)}/>
                        {error && <p>Please enter valid credentials</p>}
                        <TextField variant="standard" label="Password" name='password' onChange={(e)=>handleVchange(e)}/>
                        <Text>By continuing you agree our terms of use and privacy</Text>
                        <StyleButton onClick={()=>loginUser()}>Login</StyleButton>
                        {
                            loading?<p>Loading...</p>:
                            <div>
                         <Typography style={{textAlign:'center'}}>OR</Typography>
                        <Text onClick={()=>handleClick()}>New to My Health Hub?<Box style={{fontWeight:'600',color:'#068DA9'}} component='span'> Create an account</Box></Text>
                       
                            </div>
                        }

                    </Wrapper>
                    :
                    <Wrapper>
                        {duplicate&&<p>Duplicate credentials! User already exist</p>}
                        <TextField variant="standard" label="Enter User name" name='username' onChange={(e)=>handleChange(e)}/>
                        <TextField variant="standard" label="Enter Email" name='email' onChange={(e)=>handleChange(e)} />
                        <TextField variant="standard" label="Enter Password" name='password' onChange={(e)=>handleChange(e)}/>
                        <StyleButton onClick={()=>signupUser()}>Continue</StyleButton>
                        {loading && <div>Loading...</div>}
                        
                    </Wrapper>
                    }
            </Component>
         </Dialog>
    
  )
}

export default Loginpage;