import axios from "axios";

import { Url } from '../backenedUrl';
// const URL='http://localhost:3001';

export const RegisterUser= async(data)=>{

    try{
        return await axios.post(`${Url}/form/`,data);
    }catch(error){
        console.log(data)
        console.log("error occured in registerUser api",error);
    }
}
