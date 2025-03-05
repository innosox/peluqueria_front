import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useEffect, useState } from "react";
import { Drawer, List, ListItem, ListItemText, Button, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function Menu() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = async () => {
        try {
            await api.post("/logout");
            localStorage.removeItem("access_token");
            setIsAuthenticated(false);
            navigate("/");
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };

    if (!isAuthenticated) {
        return null;
    }

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
                <List>
                    <Typography variant="h6" sx={{ padding: 2 }}>Peluquería Anita</Typography>
                    <ListItem component={Link} to="/dashboard" onClick={() => setMobileOpen(false)}>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem component={Link} to="/clientes" onClick={() => setMobileOpen(false)}>
                        <ListItemText primary="Clientes" />
                    </ListItem>
                    <ListItem component={Link} to="/citas" onClick={() => setMobileOpen(false)}>
                        <ListItemText primary="Citas" />
                    </ListItem>
                    <ListItem component={Link} to="/atenciones" onClick={() => setMobileOpen(false)}>
                        <ListItemText primary="Atenciones" />
                    </ListItem>
                    <ListItem>
                        <Button fullWidth variant="contained" color="error" onClick={handleLogout}>
                            Cerrar Sesión
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
            <Drawer 
                variant="permanent" 
                sx={{ display: { xs: "none", sm: "block" } }}
            >
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
            </Drawer>
        </>
    );
}

export default Menu;