import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import { Container, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface Cliente {
    id: number;
    name: string;
    identificacion: string;
    email: string;
    phone: string;
}

function ClientesList() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await api.get("/clientes");
                setClientes(response.data.data);
            } catch (error) {
                console.error("Error al obtener los clientes", error);
            }
        };
        fetchClientes();
    }, []);

    return (
        <Container maxWidth="lg">
            <Menu />
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "white" }}>
                <Typography variant="h5" gutterBottom>Lista de Clientes</Typography>
                <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={() => navigate("/clientes/crear")}>Crear Cliente</Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Teléfono</TableCell>
                                <TableCell>Acción</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clientes.map((cliente) => (
                                <TableRow key={cliente.id}>
                                    <TableCell>{cliente.id}</TableCell>
                                    <TableCell>{cliente.name}</TableCell>
                                    <TableCell>{cliente.email}</TableCell>
                                    <TableCell>{cliente.phone}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => navigate(`/citas/cliente/${cliente.id}`)}>
                                            Ver Citas
                                        </Button>
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

export default ClientesList;