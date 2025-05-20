import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  background:
    theme.palette.mode === 'dark'
      ? theme.palette.background.paper
      : theme.palette.background.default,
  boxShadow: theme.shadows[4],
  maxWidth: 800,
  margin: 'auto',
  marginTop: theme.spacing(4),
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      theme.palette.mode === 'dark'
        ? `radial-gradient(circle at 30% 20%, rgba(200, 200, 255, 0.15) 0%, transparent 40%), 
           radial-gradient(circle at 70% 60%, rgba(200, 200, 255, 0.2) 0%, transparent 50%), 
           radial-gradient(circle at 50% 80%, rgba(200, 200, 255, 0.1) 0%, transparent 60%)`
        : `radial-gradient(circle at 30% 20%, rgba(173, 216, 230, 0.8) 0%, transparent 40%), 
           radial-gradient(circle at 70% 60%, rgba(135, 206, 235, 0.6) 0%, transparent 50%), 
           radial-gradient(circle at 50% 80%, rgba(135, 206, 250, 0.5) 0%, transparent 60%)`,
    backgroundSize: '250% 250%, 200% 200%, 180% 180%',
    animation: 'smokeAnimation 15s ease-in-out infinite',
    zIndex: 0,
  },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
  },
  '@keyframes smokeAnimation': {
    '0%': {
      backgroundPosition: '0% 0%, 100% 100%, 50% 50%',
    },
    '50%': {
      backgroundPosition: '100% 100%, 0% 0%, 25% 75%',
    },
    '100%': {
      backgroundPosition: '0% 0%, 100% 100%, 50% 50%',
    },
  },
}));