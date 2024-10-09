import logo from './logo.svg';
import "../node_modules/bootstrap/dist/css/bootstrap.css"; 
import './App.css';
import Users from './Users';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './Products';
import Orders from './Orders';
import EditOrder from './EditOrder';
import { AuthProvider } from './Utils/AuthContext';
import LoginPage from './Login';
import ProtectedRoutes from './Utils/ProtectedRouters';

function App() { //Component
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Protected routes */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Product />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/orders/:id/editOrder" element={<EditOrder />} />
          </Route>

          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
