import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Box, Typography } from "@mui/material";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

function AtencionForm() {
    const { appointmentId, serviceId } = useParams();
    const navigate = useNavigate();
    const [servicios, setServicios] = useState([]);
    const [formData, setFormData] = useState({
        appointment_id: appointmentId,
        service_id: serviceId,
        detail: "",
        price: ""
    });

    useEffect(() => {
        const fetchServicios = async () => {
            const response = await api.get("/servicios");
            setServicios(response.data.data);
        };
        fetchServicios();
    }, []);

    const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        setFormData({ ...formData, [e.target.name as string]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/atenciones", formData);
            Swal.fire("Éxito", "Atención registrada con éxito", "success");
            navigate("/citas");
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
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, p: 3, boxShadow: 3, borderRadius: 2, backgroundColor: "white" }}>
                <Typography variant="h5" gutterBottom>Registrar Atención</Typography>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="appointment_id" value={formData.appointment_id} />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Servicio</InputLabel>
                        <Select name="service_id" value={formData.service_id} onChange={handleChange}>
                            {servicios.map((servicio: any) => (
                                <MenuItem key={servicio.id} value={servicio.id}>{servicio.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField fullWidth label="Descripción" name="detail" value={formData.detail} onChange={handleChange} margin="normal" />
                    <TextField fullWidth label="Precio" name="price" value={formData.price} onChange={handleChange} margin="normal" />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Registrar</Button>
                </form>
            </Box>
        </Container>
    );
}

export default AtencionForm;