import { Link } from "react-router-dom";
import { useAuth } from "./Utils/AuthContext";

function Home() {

    const {isAuthenticated, logout} = useAuth();
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the Home Page</p>

            <Link to="/users">Users</Link>
            <Link to="/products">Products</Link>

            {isAuthenticated &&

            <button className="btn btn-primary" onClick={logout}>Logout</button>
}
        </div>
    )

}
export default Home;