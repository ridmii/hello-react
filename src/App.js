import logo from './logo.svg';
import "../node_modules/bootstrap/dist/css/bootstrap.css"; 
import './App.css';
import Users from './Users';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './Products';
import Orders from './Orders';
import EditOrder from './EditOrder';

function App() { //Component
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/users" element = {<Users/>} />
      <Route path="/products" element = {<Product/>} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id/editOrder" element={<EditOrder />} />

      <Route path="/" element= {<Home/>} />
    </Routes>
    </BrowserRouter>
  ) 
}
export default App;