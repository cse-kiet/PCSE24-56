import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { useState,useContext } from 'react';
import { DataContext } from './context';
import { logos } from '../images';
//loginpage
import LoginPage from '../pages/LoginPage'
import {styled} from '@mui/material'

const MainContainer=styled(Toolbar)`
padding:0 11rem;
`


function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [person,setPerson]=useState('');
  const [open,setOpen]=useState(false);
  const [isAuthenticated,setIsAuthenticated]=useState(false);
 
  const userid=person;

  //context call
  const{unique,setUnique}=useContext(DataContext);
  setUnique(userid);

  //authentication checked pages
  const pages = isAuthenticated
  ? ['Profile', 'Record', 'Appointment', 'Remainder']
  : [];

  const settings = [ 'Logout'];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const logout=()=>{
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <>
    <AppBar position="static" style={{backgroundColor:'#3A98B9'}}>
      <Container maxWidth="xl">
        <MainContainer disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            My Health Hub
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
  
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component={Link}
                    to={'/' + page.toLowerCase()}
                  >
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>        
    
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                onClick={handleCloseNavMenu}
                to={"/"+page.toLowerCase()}
                color="inherit"
                sx={{ fontWeight: 600 }}
                userid={userid}
              >
                {page}
              </Button>
            ))}
          </Box>
    
          {isAuthenticated ? (
          <>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Tooltip title="User  Setting">
                <Avatar
                  alt={person.username}
                  sx={{ cursor: 'pointer' }}
                  onClick={handleOpenUserMenu}
                />
                
              </Tooltip>
              <Menu
                id="user-menu"
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={
                      setting === 'Logout'
                        ? () => logout
                        : handleCloseUserMenu
                    }
                  >
                    {setting}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                color="inherit"
              >
                {/* <Avatar alt={person.name} src={user.picture} /> */}
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={
                      setting === 'Logout'
                        ? () => logout({ returnTo: window.location.origin })
                        : handleCloseUserMenu
                    }
                  >
                    {setting}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </>
        ) : (
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <p style={{fontWeight:'600'}} onClick={()=>setOpen(true)}>Login</p>
            <LoginPage open={open} setopen={setOpen} setuser={setPerson}  setAuthent={setIsAuthenticated}/>
          </Box>   
        )}
      </MainContainer>
    </Container>
  </AppBar>
  
  </>
);
}

export default Navbar;  