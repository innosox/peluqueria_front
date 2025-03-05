import { useEffect, useState } from "react";
import { api } from "../services/api";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Typography, Container, Box } from "@mui/material";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

function AgendarCita() {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [formData, setFormData] = useState({
        customer_id: "",
        service_id: "",
        appointment_date: "",
        appointment_time: "",
        reason: "",
    });

    useEffect(() => {
        const fetchClientes = async () => {
            const response = await api.get("/clientes");
            setClientes(response.data.data);
        };
        const fetchServicios = async () => {
            const response = await api.get("/servicios");
            setServicios(response.data.data);
        };
        fetchClientes();
        fetchServicios();
    }, []);

    const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setFormData({ ...formData, [e.target.name as string]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/citas", formData);
            Swal.fire({
                icon: "success",
                title: "Cita Agendada",
                text: "La cita se ha registrado con éxito",
            });
            navigate("/citas");
        }catch (err: unknown) {
            const error = err as AxiosError<{ detail?: string[] }>;
            Swal.fire({
                icon: "error",
                title: "Error de autenticación",
                text: error.response?.data?.detail?.[0] || "Ocurrió un error inesperado",
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Menu />
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "white" }}>
                <Typography variant="h5" gutterBottom>Agendar Cita</Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Cliente</InputLabel>
                        <Select name="customer_id" value={formData.customer_id} onChange={handleChange}>
                            {clientes.map((cliente: any) => (
                                <MenuItem key={cliente.id} value={cliente.id}>{cliente.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Servicio</InputLabel>
                        <Select name="service_id" value={formData.service_id} onChange={handleChange}>
                            {servicios.map((servicio: any) => (
                                <MenuItem key={servicio.id} value={servicio.id}>{servicio.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField fullWidth label="Fecha" type="date" name="appointment_date" value={formData.appointment_date} onChange={handleChange} margin="normal" InputLabelProps={{ shrink: true }} />
                    <TextField fullWidth label="Hora" type="time" name="appointment_time" value={formData.appointment_time} onChange={handleChange} margin="normal" InputLabelProps={{ shrink: true }} />
                    <TextField fullWidth label="Descripción" name="reason" value={formData.reason} onChange={handleChange} margin="normal" />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Agendar</Button>
                </form>
            </Box>
        </Container>
    );
}

export default AgendarCita;