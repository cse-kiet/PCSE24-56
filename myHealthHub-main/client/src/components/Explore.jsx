import React from 'react'
import {Grid,styled,Box,Typography,Button} from "@mui/material";
import { img5 } from '../images';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';
import ScienceIcon from '@mui/icons-material/Science';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';


const Components=styled(Box)`
margin:-20px 0 70px 65px;
`
const MidBox=styled(Grid)`
margin:0px auto;
display:flex;
align-items:center;
`

const Category = styled(Box)`
  
`

const CategoryContainer = styled(Box)`
  padding-top : 30px;
  display: flex;
`

const SingleCategory = styled(Box)`
  border-radius: 10px;
  width: 180px;
  padding: 15px;
  margin: 0 auto;
  background-color:#ececec;
  cursor: pointer;
  &: hover{
    color:white;
    background-color: #3A98B9;
    // box-shadow: 3px 49px 111px -6px rgba(106,153,235,1);
    transform: scale(1.1);
  }
`



const Logo = styled(Box)`
  width: 25px;
  border-radius: 100%;
  background-color: #e2e2e2;
`

const About = styled(Typography)`
  font-size: 14px;
`

const Heading = styled(Typography)`
  font-weight: 600;
  font-size: 20px;
`
const Heads=styled(Typography)`
font-size:28px;
font-weight:bold;
`

const Explore = () => {
  return (
    <Components>
    <MidBox container spacing={2}>
      <Grid item sm={12} md={5} xs={12} style={{'lineHeight':1.5}}>
        <Typography variant="h3">Upload Medical Records in One Place</Typography>
        Don't worry about keeping all the lab reports or medical prescription, this is the place where you can keep all the records safe in single digital vault.
      </Grid>
      <Grid item sm={12} md={7} xs={0}>
        <img src={img5} alt="" srcset="" style={{'height':'23rem','width':'35rem'}}/>
      </Grid>
    </MidBox>


    <Category>
      
            <Heads style={{marginLeft:'20px'}}>Explore by category</Heads>
       
      <CategoryContainer>

        <SingleCategory>
          <Logo><LocalHospitalIcon/></Logo>
          <Heading>Hospital</Heading>
          <About>Lorem, ipsum dolor sit amet consectetur adipis</About>
        </SingleCategory>

        <SingleCategory>
          <Logo><PersonIcon/></Logo>
          <Heading>Doctors</Heading>
          <About>Lorem, ipsum dolor sit amet consectetur adipis</About>
        </SingleCategory>

        <SingleCategory>
          <Logo><ScienceIcon/></Logo>
          <Heading>Labs</Heading>
          <About>Lorem, ipsum dolor sit amet consectetur adipis</About>
        </SingleCategory>

        <SingleCategory>
          <Logo><AirportShuttleIcon/></Logo>
          <Heading>Emergency</Heading>
          <About>Lorem, ipsum dolor sit amet consectetur adipis</About>
        </SingleCategory>

        <SingleCategory>
          <Logo><HealthAndSafetyIcon/></Logo>
          <Heading>Insurance</Heading>
          <About>Lorem, ipsum dolor sit amet consectetur adipis</About>
        </SingleCategory>


      </CategoryContainer>



    </Category>

    </Components>
  )
}

export default Explore
