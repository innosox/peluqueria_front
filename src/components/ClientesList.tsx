import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

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
        <div className="container">
            <h2>Lista de Clientes</h2>
            <button onClick={() => navigate("/clientes/crear")}>Crear Cliente</button>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.name}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.phone}</td>
                                <td>
                                    <button onClick={() => navigate(`/citas/cliente/${cliente.id}`)}>
                                        Ver Citas
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ClientesList;