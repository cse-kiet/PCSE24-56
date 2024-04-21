
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Box,Typography,Grid,styled} from "@mui/material"
import Card from '../components/Card';

const Container=styled(Box)`
margin:0 0 60px 5rem;
`
const Heads=styled(Typography)`
font-size:28px;
font-weight:bold;
`
const Feeds = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
const Url='https://newsapi.org/v2/everything?q=health&apiKey=659a0231369049de951e8bdbdc7c33c5'
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(Url);
        setData(response.data.articles);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);


  return (
    <Container>
      <Heads>Latest Health Related News Updates</Heads>
      <Box >
              <Card data={data}/>
      </Box>
    </Container>
  ); 
  
};

export default Feeds;