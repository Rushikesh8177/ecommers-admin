import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Category from './pages/Category'
import Brand from './pages/Brand'
import Products from './pages/Products'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="d-flex">
        {/* Sidebar on left */}
        <Sidebar />

        {/* Main content on right */}
        <div className="p-4" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category" element={<Category />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/products" element={<Products />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
