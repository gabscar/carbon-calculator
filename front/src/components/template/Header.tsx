import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Button, Box, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from '@/@core/contexts/ThemeContext';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:900px)');
  const { mode, toggleTheme } = useThemeMode();

  const menuItems = [
    { label: 'Calculator', path: '/' },
  ];

  return (
    <AppBar position="static" color="primary">
      
      <Toolbar sx={{ justifyContent: 'space-between', position: 'relative' }}>
        {isMobile ? (
          <IconButton color="inherit" onClick={() => setDrawerOpen(true)} edge="start">
            <MenuIcon />
          </IconButton>
        ) : (
          <Typography variant="h6" sx={{ flexShrink: 0 }}>Carbon Footprint</Typography>
        )}

        {isMobile && (
          <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <Typography variant="h6" noWrap>
              Carbon Footprint
            </Typography>
          </Box>
        )}

        {!isMobile && (
          <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {menuItems.map((item) => (
              <Button key={item.path} color="inherit" onClick={() => navigate(item.path)}>
                {item.label}
              </Button>
            ))}
          </Box>
        )}
        <Box position="fixed" top={16} right={16} zIndex={9999}>
          <IconButton onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
      {isMobile && (
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
          <List sx={{ width: 250 }}>
            {menuItems.map((item) => (
              <ListItem
                component="button"
                key={item.path}
                className="bg-primary text-white"
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false);
                }}
              >
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
    </AppBar>
  );
}