import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the Home Page</p>

            <Link to="/users">Users</Link>
            <Link to="/products">Products</Link>
        </div>
    )

}
export default Home;