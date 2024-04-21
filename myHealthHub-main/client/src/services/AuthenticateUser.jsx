import axios from "axios"
// const Url="http://localhost:3001"
import { Url } from "../backenedUrl";
export const Authenticatelogin= async(data)=>{

    try{
        const response=await axios.post(`${Url}/login`,data);
        return response;
    }catch(error){
        return error.response;
    }
}


export const AuthenticateSignup= async(data)=>{
   try{
        const response= await axios.post(`${Url}/signup`,data);
        return response;
    }catch(error){
        return error.response;
    }
}