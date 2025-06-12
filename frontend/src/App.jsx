import React from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Feature from './pages/Feature';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import Order from './pages/Order';
import Header from './components/Navbar';
import Footer from './components/Footer';
import Product from './pages/Product';
import PlaceOrder from './pages/PlaceOrder';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from './components/Serachbar';
import { useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';

const PrivateRoute = ({ element }) => {
    const { user } = useAuth();
    return user && user.role === 'admin' ? element : <Navigate to="/login" />;
};

const App = () => {
    const { user } = useAuth();
    const location = useLocation();
    
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <>
            <ToastContainer />
            {!isAdminRoute && <Header />}
            {!isAdminRoute && <SearchBar />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/feature" element={<Feature />} />
                <Route path="/place-order" element={<PlaceOrder />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/order" element={<Order />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>

            {!isAdminRoute && <Footer />}
        </>
    );
};

export default App;