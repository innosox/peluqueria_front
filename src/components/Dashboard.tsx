import Menu from "./Menu";

function Dashboard() {
    return (
        <div className="flex">
            <Menu />
            <div className="content">
                <h2>Bienvenido a Peluquería Anita</h2>
                <p>Aquí podrás administrar citas y clientes.</p>
            </div>
        </div>
    );
}

export default Dashboard;