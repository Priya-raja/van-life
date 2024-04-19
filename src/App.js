
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Vans from './Vans/Van';
import VanDetail from './Vans/VanDetail';
import Layout from './components/Layout';
import HostLayout from './components/HostLayout';
import Income from './pages/Host/Income';
import Reviews from './pages/Host/Reviews';
import Dashboard from './pages/Host/Dashboard';
import VansList from './pages/Host/VansList';
import HostVanDetails from './pages/Host/HostVanDetails';
import HostVanInfo from './pages/Host/HostVanInfo';
import HostVanPricing from './pages/Host/HostVanPricing';
import HostVanPhotos from './pages/Host/HostVanPhotos';
import NotFoundPage from './NotFoundPage';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home />}/>
        <Route path="about" element={<About />}/>
        <Route path="vans" element={<Vans/>}/>
        <Route path="vans/:id" element={<VanDetail/>}/>

        <Route path="host" element={<HostLayout />}>
         <Route index element={<Dashboard />}/>
         <Route path="income" element={<Income />}/>
         <Route path="vans" element={<VansList />}/>
         <Route path="vans/:id" element={<HostVanDetails />}>
              <Route index element={<HostVanInfo />} />
              <Route path="pricing" element={<HostVanPricing />} />
              <Route path="photos" element={<HostVanPhotos />} />
            </Route>
         <Route path="reviews" element={<Reviews />}/>
        </Route> 
       <Route path="*" element={<NotFoundPage/>}/>
      </Route>
      
    </Routes>
  </BrowserRouter>

  );
}

export default App;
