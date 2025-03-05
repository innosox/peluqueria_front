import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Container, Box, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

function CitasList() {
    const [citas, setCitas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCitas = async () => {
            try {
                const response = await api.get("/citas");
                setCitas(response.data.data);
            } catch (error) {
                console.error("Error al obtener las citas", error);
            }
        };
        fetchCitas();
    }, []);

    return (
        <Container maxWidth="lg">
            <Menu />
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "white" }}>
                <Typography variant="h5" gutterBottom>Lista de Citas</Typography>
                <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => navigate("/citas/crear")}>Crear Cita</Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Servicio</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Hora</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {citas.map((cita: any) => (
                                <TableRow key={cita.id}>
                                    <TableCell>{cita.id}</TableCell>
                                    <TableCell>{cita.cliente.name}</TableCell>
                                    <TableCell>{cita.servicio.name}</TableCell>
                                    <TableCell>{cita.appointment_date}</TableCell>
                                    <TableCell>{cita.appointment_time}</TableCell>
                                    <TableCell>{cita.status}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => navigate(`/atenciones/${cita.id}/${cita.service_id}`)}>Nueva Atención</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}

export default CitasList;