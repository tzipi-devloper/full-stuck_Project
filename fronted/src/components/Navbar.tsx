import React from 'react';
import { NavLink } from 'react-router';
import { useState, useEffect, ReactNode, MouseEvent } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  useScrollTrigger,
  Slide,
  Container,
  Fab,
  SlideProps
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSelector } from 'react-redux';

import AuthForm from '../features/auth/AuthForm';
import { selectCurrentUser } from '../features/auth/currentUserSlice';
import UserMenu from './UserMenu';


interface ScrollTopProps {
  children: ReactNode;
}
const styles = {
  appBar: {
    background: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(78, 132, 212, 0.2)',
  },
  gradientBorder: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #ff5733, #4e84d4, #8e44ad, #00ff6a, #ff5733)',
    backgroundSize: '200% auto',
    animation: 'gradientAnimation 8s ease infinite'
  },
  navLink: {
    textTransform: 'none',
    fontWeight: 600,
    color: '#fff',
    position: 'relative' as const,
    overflow: 'hidden' as const,
    padding: '8px 16px',
    borderRadius: '8px',
    mx: 1,
    '&::after': {
      content: '""',
      position: 'absolute' as const,
      bottom: 0,
      left: '50%',
      width: 0,
      height: '2px',
      background: 'linear-gradient(90deg, #ff5733, #4e84d4)',
      transition: 'all 0.3s ease',
    },
    '&:hover': {
      background: 'rgba(142, 68, 173, 0.1)',
      '&::after': {
        width: '80%',
        left: '10%',
      }
    },
    '&.active': {
      background: 'rgba(0, 255, 106, 0.1)',
      '&::after': {
        width: '80%',
        left: '10%',
        background: 'linear-gradient(90deg, #00ff6a, #4e84d4)',
      }
    }
  },
  loginButton: {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: '30px',
    px: 3,
    py: 1,
    background: 'linear-gradient(45deg, #ff5733, #8e44ad)',
    backgroundSize: '200% auto',
    boxShadow: '0 4px 15px rgba(255, 87, 51, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundPosition: 'right center',
      boxShadow: '0 6px 20px rgba(255, 87, 51, 0.5)',
      transform: 'translateY(-2px)'
    }
  },
  dialogPaper: {
    background: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(78, 132, 212, 0.3)',
    boxShadow: '0 10px 40px rgba(142, 68, 173, 0.5)',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #ff5733, #4e84d4, #8e44ad, #00ff6a, #ff5733)',
      backgroundSize: '200% auto',
      animation: 'gradientAnimation 8s ease infinite'
    }
  },
  closeButton: {
    position: 'absolute' as const,
    right: 8,
    top: 8,
    color: '#fff',
    background: 'rgba(255, 87, 51, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 87, 51, 0.2)',
      transform: 'rotate(90deg)'
    }
  },
  scrollTopButton: {
    position: 'fixed' as const,
    bottom: 20,
    right: 20,
    background: 'linear-gradient(45deg, #ff5733, #8e44ad)',
    color: '#fff',
    borderRadius: '50%',
    boxShadow: '0 4px 20px rgba(142, 68, 173, 0.6)',
    '&:hover': {
      background: 'linear-gradient(45deg, #8e44ad, #00ff6a)',
      boxShadow: '0 6px 25px rgba(0, 255, 106, 0.6)',
    }
  }
};


function ScrollTop(props: ScrollTopProps) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Slide in={trigger} direction="up">
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}
      >
        {children}
      </Box>
    </Slide>
  );
}
interface AuthFormProps {
  onSuccess: () => void;
}
const Navbar: React.FC<AuthFormProps> = ({ onSuccess }) => {
  const user = useSelector(selectCurrentUser);
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          ...styles.appBar,
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.5)' : 'none',
        }}
      >
        <Toolbar sx={{ px: { xs: 1, sm: 3 } }}>
          <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/logo.png" 
                alt="Logo"
                style={{
                  height:80 ,
                  marginRight: 16,
                  cursor: 'pointer'
                }}
                onClick={() => window.location.href = '/'}
              />

              <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 } }}>
                <Button
                  component={NavLink}
                  to="/"
                  color="inherit"
                  sx={styles.navLink}
                >
                  Home Page
                </Button>
                <Button
                  component={NavLink}
                  to="/about"
                  color="inherit"
                  sx={styles.navLink}
                >
                  About
                </Button>
              </Box>
            </Box>

            {!user ? (
              <Button
                color="inherit"
                onClick={() => setOpenLogin(true)}
                sx={styles.loginButton}
              >
                Login
              </Button>
            ) : (
              <UserMenu />
            )}
          </Container>
        </Toolbar>
        <div style={styles.gradientBorder}></div>
      </AppBar>
      <Toolbar />

      <Dialog
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        PaperProps={{
          sx: styles.dialogPaper
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(90deg, #ff5733, #4e84d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Please Login
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpenLogin(false)}
            sx={styles.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <AuthForm onSuccess={() => setOpenLogin(false)} />
        </DialogContent>
      </Dialog>

      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top" sx={styles.scrollTopButton}>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>

      <style>{`
        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;