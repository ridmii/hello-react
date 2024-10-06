import logo from './logo.svg';
import './App.css';
import Users from './Users';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './Products';

function App() { //Component
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/users" element = {<Users/>} />
      <Route path="/products" element = {<Product/>} />



      <Route path="/" element= {<Home/>} />
    </Routes>
    </BrowserRouter>
  ) 
}
export default App;