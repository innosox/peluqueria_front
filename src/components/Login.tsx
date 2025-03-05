import { useState } from "react";
   import { api } from "../services/api";
   import Swal from "sweetalert2";
   import { AxiosError } from "axios";

   function Login() {
       const [email, setEmail] = useState("");
       const [password, setPassword] = useState("");

       const handleLogin = async (e: React.FormEvent) => {
           e.preventDefault();
           try {
               const response = await api.post("/login", { email, password });
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
               <h2>Iniciar Sesión</h2>
               <form onSubmit={handleLogin}>
                   <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input" />
                   <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required className="input" />
                   <button type="submit" className="button">Ingresar</button>
               </form>
           </div>
       );
   }

   export default Login;