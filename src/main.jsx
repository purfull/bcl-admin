import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Crm from './container/dashboards/crm/crm.jsx'
import './index.scss'
import Auth from './firebase/auth.jsx'
import Login from './firebase/login.jsx'
import Signup from './firebase/signup.jsx'
import ScrollToTop from './components/ui/scrolltotop.jsx'





import Dashboard from './container/dashboard/dashboard.jsx';
import FeaturedProducts from './container/home/FeaturedProducts/FeaturedProducts.jsx';
import Testimonials from './container/home/Testimonials/Testimonials.jsx'
import Blogs from './container/home/Blogs/Blogs.jsx';
import Products from './container/Marketplace/Products.jsx';
import Customer from './container/Customers/Customer.jsx'
import AdminUser from './container/AdminUser/AdminUser.jsx';
import Permission from './container/Permissions/Permissions.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <BrowserRouter>
      <React.Suspense>
        <ScrollToTop/>
        <Routes>
          <Route path={``} element={<Auth />}>
            <Route index element={<Login />} />
            <Route path={`/`} element={<Login />} />
            <Route path={`firebase/signup`} element={<Signup />} />
          </Route>
          <Route path={``} element={<App />}>

            <Route path={`Dashboard`} element={<Dashboard />} />
            <Route path={`featured-products`} element={<FeaturedProducts />} />
            <Route path={`testimonials`} element={<Testimonials />} />
            <Route path={`blogs`} element={<Blogs />} />
            <Route path={`Marketplace/products`} element={<Products />} />
            <Route path={`customers`} element={<Customer />} />
            <Route path={`admin-user`} element={<AdminUser />} />
            <Route path={`permission`} element={<Permission />} />

            
          </Route>
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </React.Fragment>
)
