import React from 'react'
import {Grid,Box,Typography, Button,styled} from "@mui/material"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';


const Image=styled('img')({
  height:'12rem',
  width:'23rem'
})
const Published=styled(Typography)`
font-weight:600;
color:grey;
text-align:justify;
`
const Container=styled(Box)`
padding:10px 20px;
margin-top:10px;
`
const Heads=styled(Typography)`
font-weight:600;
color:#212121;
text-align:left;
margin:10px 0;
`
const StyleButton=styled(Button)`
padding:10px 4rem;
margin:7px;
background-color: #068DA9;
`
const responsive = {
   
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const Card = ({data}) => {
  
  const publish=new Date();
  const yr=publish.getFullYear()
  const mon=publish.getMonth()
  const dt=publish.getDate()

  const detailNews=()=>{
    
  }
  return (
    
    <Carousel
    responsive={responsive}
    swipeable={true}
    draggable={false}
    infinite={true}
     autoPlay={true}
     autoPlaySpeed={4000}
     keyBoardControl={true}
     centerMode={true}
     containerClass="carousel-container"
     dotListClass="custom-dot-list-style"
     itemClass="carousel-item-padding-40-px"
     >
        {
          
           data.map(data=>(
            
           (data.urlToImage && data.description.length>107 && data.title.length>60 )&&
            <Container textAlign={'center'}>
            <Image src={data.urlToImage}  alt="prod" />
            <Published>Pubished: {dt}-{mon}-{yr}</Published>
            <Heads >{(data.title).substring(0,60)}</Heads>
            <Typography style={{textAlign:'justify'}}>{(data.description).slice(0,107)}</Typography>
            
            <StyleButton onClick={detailNews} variant="contained"><a href={data.url} target='_blank'>Read More</a></StyleButton>
            </Container>
           
           ))
        }
    </Carousel>
    
  )
}
export default Card