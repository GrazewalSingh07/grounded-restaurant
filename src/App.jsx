import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Order from './pages/Order'
import Reservations from './pages/Reservations'

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Navbar />
        <CartDrawer />
        <main>
          <Routes>
            <Route path="/"             element={<Menu />} />
            <Route path="/story"        element={<Home />} />
            <Route path="/about"        element={<About />} />
            <Route path="/order"        element={<Order />} />
            <Route path="/reservations" element={<Reservations />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  )
}
