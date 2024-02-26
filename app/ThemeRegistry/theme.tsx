'use client';

import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#C26040',
    },
    secondary: {
      main: '#19857b',
    },
    text: {
      primary: '#565656',
      secondary: '#C26040',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
  },

  typography: { 
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    // MuiButton: {
    //   styleOverrides: {
    //     root: ({ ownerState }) => ({
    //       ...(ownerState.variant === 'contained' &&
    //         ownerState.color === 'primary' && {
    //           backgroundColor: '#202020',
    //           color: '#fff',
    //         }),
    //     }),
    //   },
    // },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === 'info' && {
            backgroundColor: '#60a5fa',
          }),
        }),
      },
    },
  },
});

export default theme;