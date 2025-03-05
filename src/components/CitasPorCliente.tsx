import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import Menu from "./Menu";
import { Container, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

interface Cliente {
    id: number;
    name: string;
    email: string;
}

interface Servicio {
    id: number;
    name: string;
    price_total: string;
}

interface Cita {
    id: number;
    appointment_date: string;
    appointment_time: string;
    status: string;
    cliente: Cliente;
    servicio: Servicio;
}

function CitasPorCliente() {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const [citas, setCitas] = useState<Cita[]>([]);
    const [status, setStatus] = useState(searchParams.get("status") || "pendiente");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await api.get(`/citas/cliente/${id}?status=${status}`);
                setCitas(response.data);
            } catch (err: unknown) {
                const error = err as AxiosError<{ detail?: string[] }>;
                Swal.fire({
                    icon: "error",
                    title: "Error de autenticación",
                    text: error.response?.data?.detail?.[0] || "Ocurrió un error inesperado",
                });
            }
        };
        fetchCitas();
    }, [id, status]);

    return (
        <Container maxWidth="lg">
            <Menu />
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "white" }}>
                <Typography variant="h5" gutterBottom>Citas del Cliente</Typography>
                <Button variant="contained" color="secondary" sx={{ mb: 2 }} onClick={() => navigate(-1)}>⬅ Volver</Button>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Filtrar por estado</InputLabel>
                    <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <MenuItem value="pendiente">Pendiente</MenuItem>
                        <MenuItem value="realizada">Realizada</MenuItem>
                        <MenuItem value="cancelada">Cancelada</MenuItem>
                    </Select>
                </FormControl>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Hora</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Servicio</TableCell>
                                <TableCell>Precio</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {citas.map((cita) => (
                                <TableRow key={cita.id}>
                                    <TableCell>{cita.id}</TableCell>
                                    <TableCell>{cita.appointment_date}</TableCell>
                                    <TableCell>{cita.appointment_time}</TableCell>
                                    <TableCell>{cita.status}</TableCell>
                                    <TableCell>{cita.servicio.name}</TableCell>
                                    <TableCell>${cita.servicio.price_total}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}

export default CitasPorCliente;