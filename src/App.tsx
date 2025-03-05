import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Menu from "./components/Menu";
import Dashboard from "./components/Dashboard";
import ClientesList from "./components/ClientesList";
import CitasPorCliente from "./components/CitasPorCliente";
import AtencionList from "./components/AtencionList";
import Login from "./components/Login";
import { Box } from "@mui/material";
import ClientesCrear from "./components/ClientesCrear";
import AgendarCita from "./components/AgendarCita";
import CitasList from "./components/CitasList";
import AtencionForm from "./components/AtencionForm";

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
    const token = localStorage.getItem("access_token");
    return token ? element : <Navigate to="/" replace />;
};

function App() {
    const token = localStorage.getItem("access_token");

    return (
        <Router>
            <Box sx={{ display: "flex" }}>
                {token && <Menu />}
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                        <Route path="/clientes" element={<PrivateRoute element={<ClientesList />} />} />
                        <Route path="/citas/cliente/:id" element={<PrivateRoute element={<CitasPorCliente />} />} />
                        <Route path="/atenciones" element={<PrivateRoute element={<AtencionList />} />} />
                        <Route path="/clientes/crear" element={<PrivateRoute element={<ClientesCrear />} />} />
                        <Route path="/citas" element={<PrivateRoute element={<CitasList />} />} />
                        <Route path="/citas/crear" element={<PrivateRoute element={<AgendarCita />} />} />
                        <Route path="/atenciones/:id/:id" element={<PrivateRoute element={<AtencionForm />} />} />

                        
                    </Routes>
                </Box>
            </Box>
        </Router>
    );
}

export default App;