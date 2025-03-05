import { useState } from "react";
import { api } from "../services/api";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import Menu from "./Menu";


function ClientesCrear() {
        const [name, setName] = useState("");
        const [identificacion, setIdentificacion] = useState("");
        const [email, setEmail] = useState("");
        const [phone, setPhone] = useState("");
        
       const handleLogin = async (e: React.FormEvent) => {
           e.preventDefault();
           try {
               const response = await api.post("/clientes", { name, identificacion, email, phone});
               localStorage.setItem("access_token", response.data.access_token);
               window.location.href = "/dashboard";
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
        <div className="container">
        <Menu />
        <h2>Crear Nuevo Cliente</h2>
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required className="input" />
            <input type="text" placeholder="Identificación" value={identificacion} onChange={(e) => setIdentificacion(e.target.value)} required className="input" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" />
            <input type="text" placeholder="Celular" value={phone} onChange={(e) => setPhone(e.target.value)} required className="input" />
            <button type="submit" className="button">Guardar</button>
        </form>
    </div>
    );
}

export default ClientesCrear;