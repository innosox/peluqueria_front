import { useEffect, useState } from "react";
import { api } from "../services/api";

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
        <div className="container">
            <h2>Lista de Atenciones</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Cliente</th>
                            <th>Servicio</th>
                            <th>Fecha Cita</th>
                            <th>Hora Cita</th>
                            <th>Estado</th>
                            <th>Detalle</th>
                            <th>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {atencions.map((atencion) => (
                            <tr key={atencion.id}>
                                <td>{atencion.id}</td>
                                <td>{atencion.cita?.cliente?.name || "N/A"}</td>
                                <td>{atencion.servicio?.name || "N/A"}</td>
                                <td>{atencion.cita?.appointment_date || "N/A"}</td>
                                <td>{atencion.cita?.appointment_time || "N/A"}</td>
                                <td>{atencion.cita?.status || "N/A"}</td>
                                <td>{atencion.detail}</td>
                                <td>${atencion.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AtencionList;