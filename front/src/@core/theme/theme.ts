import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    resultBox: Palette['primary'];
  }
  interface PaletteOptions {
    resultBox?: PaletteOptions['primary'];
  }
}

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0d47a1', 
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64b5f6', 
      contrastText: '#ffffff',
    },
    background: {
      default: '#f0f4f8', 
      paper: '#ffffff',
    },
    text: {
      primary: '#222',
      secondary: '#555',
    },
    resultBox: {
      main: '#eaf2f8', 
      contrastText: '#222',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#0d47a1',
          color: '#fff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', 
      contrastText: '#000',
    },
    secondary: {
      main: '#64b5f6',
      contrastText: '#000',
    },
    background: {
      default: '#0a1929', 
      paper: '#121e2d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbb',
    },
    resultBox: {
      main: '#152a41', 
      contrastText: '#fff',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: '#0d47a1',
          color: '#fff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});
