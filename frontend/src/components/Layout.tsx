import React from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

type LayoutProps = {
  children: React.ReactNode; // Bu, sarmaladığı sayfayı temsil eder
};

export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Anasayfa", icon: <HomeIcon />, path: "/" },
    { text: "Ürünler", icon: <InventoryIcon />, path: "/products" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* ÜST BAR*/}
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Yönetim Paneli
          </Typography>
        </Toolbar>
      </AppBar>

      {/* SOL MENÜ*/}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* ANA İÇERİK*/}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar /> {/* AppBar'ın altında boşluk bırakmak için */}
        {children}
      </Box>
    </Box>
  );
};
