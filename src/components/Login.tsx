import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import { Container, Box, Typography, TextField, Button } from "@mui/material";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/login", { email, password });
            localStorage.setItem("access_token", response.data.access_token);
            navigate("/dashboard");
        } catch (err: unknown) {
            const error = err as AxiosError<{ detail?: string[] }>;
            Swal.fire({
                icon: "error",
                title: "Error de autenticación",
                text: error.response?.data?.detail?.[0] || "Ocurrió un error inesperado",
            });
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ mt: 8, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "white" }}>
                <Typography variant="h5" gutterBottom textAlign="center">Iniciar Sesión</Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        fullWidth
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Ingresar</Button>
                </form>
            </Box>
        </Container>
    );
}

export default Login;