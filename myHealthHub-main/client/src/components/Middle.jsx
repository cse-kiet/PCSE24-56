import React from 'react'
import {Grid,styled,Box,Typography,Button} from "@mui/material";
import { access } from '../images';

const Components=styled(Box)`
margin:1rem 0 0 5rem;
`
const MidBox=styled(Grid)`

`
const StyleButton=styled(Button)`
margin-Left:15px;
background-color: #0F5BFF;
`
const Middle = () => {
  return (
    <Components>
    <MidBox container spacing={2}>
      <Grid item sm={12} md={5} xs={12} style={{lineHeight:1.5}}>
        <Typography variant="h3">Access your records anywhere and anytime</Typography>
        No more worrying about forgetting your medical records. With Health Card, all your important health 
        information is at your fingertips, accessible whenever you need it.
      </Grid>
      <Grid item sm={12} md={7} xs={0}>
        <img src={access} alt="" srcset="" style={{height:'18rem', marginLeft:'auto'}}/>
      </Grid>
    </MidBox>
    </Components>
  )
}

export default Middle
