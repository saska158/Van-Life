import React from 'react'
import ReactDOM from 'react-dom/client'
//import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom"
import Layout from './components/Layout'
import HostLayout from './components/HostLayout'
import Home from "./pages/Home"
import About from "./pages/About"
import Login, { loader as loginLoader, action as loginAction } from "./pages/Login"
import Vans, { loader as vansLoader } from './pages/Vans/Vans'
import VanDetail, { loader as vanDetailLoader } from './pages/Vans/VanDetail'
import Dashboard, { loader as dashboardLoader } from './pages/Host/Dashboard'
import Income from './pages/Host/Income'
import Reviews from './pages/Host/Reviews'
import HostVans, { loader as hostVansLoader } from './pages/Host/HostVans'
import HostVanDetail, { loader as hostVanDetailLoader } from './pages/Host/HostVanDetail'
import HostVanInfo from './pages/Host/HostVanInfo'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import HostVanPricing from './pages/Host/HostVanPricing'
import NotFound from './pages/NotFound'
import Error from './components/Error'
import { requireAuth } from './utils'

import "./server"
//import { action } from './pages/Login'
/*
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path='vans' element={<Vans />} />
          <Route path='vans/:id' element={<VanDetail />} />

          <Route path='host' element={<HostLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="income" element={<Income />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="vans" element={<HostVans />} />
            <Route path='vans/:id' element={<HostVanDetail />}>
              <Route index element={<HostVanInfo />}/>
              <Route path="pricing" element={<HostVanPricing />} />
              <Route path="photos" element={<HostVanPhotos />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}*/
const router = createBrowserRouter(createRoutesFromElements(
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route 
            path='login' 
            element={<Login />} 
            loader={loginLoader}
            action={loginAction} 
          />
          <Route path='vans' element={<Vans />} errorElement={<Error />} loader={vansLoader} />
          <Route path='vans/:id' element={<VanDetail />} errorElement={<Error />} loader={vanDetailLoader} />

           <Route path='host' element={<HostLayout />}>
            <Route 
              index 
              element={<Dashboard />}
              errorElement={<Error />}
              loader={dashboardLoader} //arrow function, pa ima implicit return 
            />
            <Route 
              path="income" 
              element={<Income />} 
              loader={async ({request}) => await requireAuth(request)}
            />
            <Route 
              path="reviews" 
              element={<Reviews />}
              loader={async ({request}) => await requireAuth(request)}
            />
            <Route 
              path="vans" 
              element={<HostVans />} 
              errorElement={<Error />} 
              loader={hostVansLoader}
            />
            <Route 
              path='vans/:id' 
              element={<HostVanDetail />} 
              errorElement={<Error />} 
              loader={hostVanDetailLoader}
            >
              <Route 
                index 
                element={<HostVanInfo />}
                loader={async ({request}) => await requireAuth(request)}
              />
              <Route 
                path="pricing" 
                element={<HostVanPricing />}
                loader={async ({request}) => await requireAuth(request)}
              />
              <Route 
                path="photos" 
                element={<HostVanPhotos />}
                loader={async ({request}) => await requireAuth(request)}
              />
            </Route>
           </Route>
          <Route path="*" element={<NotFound />}/>
        </Route>
))

function App() {
  return (
    <RouterProvider router={router} />
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);