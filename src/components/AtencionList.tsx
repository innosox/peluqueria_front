import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Container, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface Cliente {
    id: number;
    name: string;
    email: string;
    phone: string;
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
}

interface Atencion {
    id: number;
    detail: string;
    price: string;
    cita: Cita;
    servicio: Servicio;
}

function AtencionList() {
    const [atencions, setAtencions] = useState<Atencion[]>([]);

    useEffect(() => {
        const fetchAtencions = async () => {
            try {
                const response = await api.get("/atenciones");
                setAtencions(response.data.data);
            } catch (error) {
                console.error("Error al obtener las atenciones", error);
            }
        };
        fetchAtencions();
    }, []);

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "white" }}>
                <Typography variant="h5" gutterBottom>Lista de Atenciones</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Cliente</TableCell>
                                <TableCell>Servicio</TableCell>
                                <TableCell>Fecha Cita</TableCell>
                                <TableCell>Hora Cita</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Detalle</TableCell>
                                <TableCell>Precio</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {atencions.map((atencion) => (
                                <TableRow key={atencion.id}>
                                    <TableCell>{atencion.id}</TableCell>
                                    <TableCell>{atencion.cita?.cliente?.name || "N/A"}</TableCell>
                                    <TableCell>{atencion.servicio?.name || "N/A"}</TableCell>
                                    <TableCell>{atencion.cita?.appointment_date || "N/A"}</TableCell>
                                    <TableCell>{atencion.cita?.appointment_time || "N/A"}</TableCell>
                                    <TableCell>{atencion.cita?.status || "N/A"}</TableCell>
                                    <TableCell>{atencion.detail}</TableCell>
                                    <TableCell>${atencion.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Container>
    );
}

export default AtencionList;