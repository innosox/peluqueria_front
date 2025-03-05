import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AxiosError } from "axios";


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
        <div className="container">
            <h2>Citas del Cliente</h2>
            <button onClick={() => navigate(-1)} className="button-back">⬅ Volver</button>
            <br /><br />
            <label>
                Filtrar por estado:
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="pendiente">Pendiente</option>
                    <option value="completada">Completada</option>
                    <option value="cancelada">Cancelada</option>
                </select>
            </label>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Estado</th>
                            <th>Servicio</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map((cita) => (
                            <tr key={cita.id}>
                                <td>{cita.id}</td>
                                <td>{cita.appointment_date}</td>
                                <td>{cita.appointment_time}</td>
                                <td>{cita.status}</td>
                                <td>{cita.servicio.name}</td>
                                <td>${cita.servicio.price_total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CitasPorCliente;