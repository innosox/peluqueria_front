import { Link, useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, Button, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Menu() {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    if (!isAuthenticated) return null;

    return (
        <>
            <IconButton 
                color="inherit" 
                aria-label="open drawer" 
                edge="start" 
                onClick={() => setMobileOpen(!mobileOpen)}
                sx={{ display: { sm: "none" }, position: "absolute", top: 10, left: 10 }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer 
                variant="temporary" 
                open={mobileOpen} 
                onClose={() => setMobileOpen(false)}
                sx={{ display: { xs: "block", sm: "none" } }}
            >
                <Sidebar handleLogout={handleLogout} />
            </Drawer>
            <Drawer 
                variant="permanent" 
                sx={{ display: { xs: "none", sm: "block" } }}
            >
                <Sidebar handleLogout={handleLogout} />
            </Drawer>
        </>
    );
}

function Sidebar({ handleLogout }: { handleLogout: () => void }) {
    return (
        <List>
            <Typography variant="h6" sx={{ padding: 2 }}>Peluquería Anita</Typography>
            <ListItem component={Link} to="/dashboard">
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem component={Link} to="/clientes">
                <ListItemText primary="Clientes" />
            </ListItem>
            <ListItem component={Link} to="/citas">
                <ListItemText primary="Citas" />
            </ListItem>
            <ListItem component={Link} to="/atenciones">
                <ListItemText primary="Atenciones" />
            </ListItem>
            <ListItem>
                <Button fullWidth variant="contained" color="error" onClick={handleLogout}>
                    Cerrar Sesión
                </Button>
            </ListItem>
        </List>
    );
}

export default Menu;
