import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Button, Box, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:900px)');

  const menuItems = [
    { label: 'Calculator', path: '/' },
  ];

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }} className="bg-primary text-white">
        <Typography variant="h6" sx={{ flexShrink: 0 }}>Carbon Footprint</Typography>

        {isMobile ? (
          <IconButton edge="end" color="inherit" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        ) : (
          <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {menuItems.map((item) => (
              <Button key={item.path} color="inherit" onClick={() => navigate(item.path)}>
                {item.label}
              </Button>
            ))}
          </Box>
        )}
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