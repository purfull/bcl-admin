import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Crm from './container/dashboards/crm/crm.jsx'
// import Ecommerce from "./container/dashboards/ecommerce/ecommerce.jsx";
// import Aboutus from "./container/pages/aboutus/aboutus.jsx";
// import Blog from "./container/pages/blogs/blog/blog.jsx";
// import Blogdetails from "./container/pages/blogs/blogdetails/blogdetails.jsx";
// import Createblog from "./container/pages/blogs/createblog/createblog.jsx";
// import Chat from "./container/pages/chat/chat.jsx";
// import Contactus from "./container/pages/contactus/contactus.jsx";
// import Addproducts from "./container/pages/ecommerce/addproducts/addproducts.jsx";
// import Cart from "./container/pages/ecommerce/cart/cart.jsx";
// import Checkout from "./container/pages/ecommerce/checkout/checkout.jsx";
// import Editproducts from "./container/pages/ecommerce/editproducts/editproducts.jsx";
// import Orderdetails from "./container/pages/ecommerce/orderdetails/orderdetails.jsx";
// import Orders from "./container/pages/ecommerce/orders/orders.jsx";
// // import Products from './container/pages/ecommerce/products/products.jsx'
// import Productdetails from "./container/pages/ecommerce/productdetails/productdetails.jsx";
// import Productlist from "./container/pages/ecommerce/productlist/productlist.jsx";
// import Wishlist from "./container/pages/ecommerce/wishlist/wishlist.jsx";
// import Mailapp from "./container/pages/email/mailapp/mailapp.jsx";
// import Mailsettings from "./container/pages/email/mailsettings/mailsettings.jsx";
// import Empty from "./container/pages/empty/empty.jsx";
// import Faqs from "./container/pages/faqs/faqs.jsx";
// import Filemanager from "./container/pages/filemanager/filemanager/filemanager.jsx";
// import Createinvoice from "./container/pages/invoice/createinvoice/createinvoice.jsx";
// import Invoicedetails from "./container/pages/invoice/invoicedetails/invoicedetails.jsx";
// import Invoicelist from "./container/pages/invoice/invoicelist/invoicelist.jsx";
// import Notifications from "./container/pages/notifications/notifications.jsx";
// import Pricing from "./container/pages/pricing/pricing.jsx";
// import Profile from "./container/pages/profile/profile.jsx";
// import Reviews from "./container/pages/reviews/reviews.jsx";
// import Team from "./container/pages/team/team.jsx";
// import Termsconditions from "./container/pages/termsconditions/termsconditions.jsx";
// import Timeline from "./container/pages/timeline/timeline.jsx";
// import Todolist from "./container/pages/todolist/todolist.jsx";
// import Kanbanboard from "./container/task/kanbanboard/kanbanboard.jsx";
// import Listview from "./container/task/listview/listview.jsx";
// import Taskdetails from "./container/task/taskdetails/taskdetails.jsx";
// import Alerts from "./container/uielements/alerts/alerts.jsx";
// import Badge from "./container/uielements/badge/badge.jsx";
// import Breadcrumb from "./container/uielements/breadcrumb/breadcrumb.jsx";
// import Buttons from "./container/uielements/buttons/buttons.jsx";
// import Buttongroup from "./container/uielements/buttongroup/buttongroup.jsx";
// import Cards from "./container/uielements/cards/cards.jsx";
// import Dropdowns from "./container/uielements/dropdowns/dropdowns.jsx";
// import Imagesandfigure from "./container/uielements/imagesandfigure/imagesandfigure.jsx";
// import Listgroup from "./container/uielements/listgroup/listgroup.jsx";
// import Navtabs from "./container/uielements/navtabs/navtabs.jsx";
// import Objectfit from "./container/uielements/objectfit/objectfit.jsx";
// import Pagination from "./container/uielements/pagination/pagination.jsx";
// import Popovers from "./container/uielements/popovers/popovers.jsx";
// import Progress from "./container/uielements/progress/progress.jsx";
// import Spinners from "./container/uielements/spinners/spinners.jsx";
// import Toasts from "./container/uielements/toasts/toasts.jsx";
// import Tooltips from "./container/uielements/tooltips/tooltips.jsx";
// import Avatars from "./container/utilities/avatars/avatars.jsx";
// import Borders from "./container/utilities/borders/borders.jsx";
// import Colors from "./container/utilities/colors/colors.jsx";
// import Grids from "./container/utilities/grids/grids.jsx";
// import Flex from "./container/utilities/flex/flex.jsx";
// import Columns from "./container/utilities/columns/columns.jsx";
// import Inputs from "./container/forms/formelements/inputs/inputs.jsx";
// import Checkradios from "./container/forms/formelements/checkradios/checkradios.jsx";
// import Inputgroup from "./container/forms/formelements/inputgroup/inputgroup.jsx";
// import Formselect from "./container/forms/formelements/formselect/formselect.jsx";
// import Rangesliders from "./container/forms/formelements/rangeslider/rangeslider.jsx";
// // import Rangeslider from './container/forms/formelements/rangeslider/rangeslider.jsx'
// import Fileuploads from "./container/forms/formelements/fileuploads/fileuploads.jsx";
// import Datetimepicker from "./container/forms/formelements/datetimepicker/datetimepicker.jsx";
// import Colorpicker from "./container/forms/formelements/colorpicker/colorpicker.jsx";
// import Formlayouts from "./container/forms/formlayouts/formlayouts.jsx";
// import Select2 from "./container/forms/select2/select2.jsx";
// import Validation from "./container/forms/validation/validation.jsx";
// import Accordioncollapse from "./container/advancedui/accordioncollapse/accordioncollapse.jsx";
// import Draggablecards from "./container/advancedui/draggablecards/draggablecards.jsx";
// import Modalcloses from "./container/advancedui/modalcloses/modalcloses.jsx";
// import Navbar from "./container/advancedui/navbar/navbar.jsx";
// import Offcanvas from "./container/advancedui/offcanvas/offcanvas.jsx";
// import Swiperjs from "./container/advancedui/swiperjs/swiperjs.jsx";
// import Widgets from "./container/widgets/widgets.jsx";
// import Fullacalendar from "./container/apps/fullacalendar/fullacalendar.jsx";
// import Gallery from "./container/apps/gallery/gallery.jsx";
// import Projectlist from "./container/apps/projects/projectlist/projectlist.jsx";
// import Projectoverview from "./container/apps/projects/projectoverview/projectoverview.jsx";
// import Createproject from "./container/apps/projects/createproject/createproject.jsx";
// import Jobdetails from "./container/apps/jobs/jobdetails/jobdetails.jsx";
// import Searchcompany from "./container/apps/jobs/searchcompany/searchcompany.jsx";
// import Searchjobs from "./container/apps/jobs/searchjobs/searchjobs.jsx";
// import Jobpost from "./container/apps/jobs/jobpost/jobpost.jsx";
// import Joblist from "./container/apps/jobs/joblist/joblist.jsx";
// import Searchcandidate from "./container/apps/jobs/searchcandidate/searchcandidate.jsx";
// import Candidatedetails from "./container/apps/jobs/candidatedetails/candidatedetails.jsx";
// import Marketplace from "./container/apps/nft/marketplace/marketplace.jsx";
// import Nftdetails from "./container/apps/nft/nftdetails/nftdetails.jsx";
// import Createnft from "./container/apps/nft/createnft/createnft.jsx";
// import Walletintegration from "./container/apps/nft/walletintegration/walletintegration.jsx";
// import Liveauction from "./container/apps/nft/liveauction/liveauction.jsx";
// import Contactscrm from "./container/apps/crm/contactscrm/contactscrm.jsx";
// import Companies from "./container/apps/crm/companies/companies.jsx";
// import Deals from "./container/apps/crm/deals/deals.jsx";
// import Leads from "./container/apps/crm/leads/leads.jsx";
// import Transactions from "./container/apps/crypto/transactions/transactions.jsx";
// import Currencyexchange from "./container/apps/crypto/currencyexchange/currencyexchange.jsx";
// import Buysell from "./container/apps/crypto/buysell/buysell.jsx";
// import Marketcap from "./container/apps/crypto/marketcap/marketcap.jsx";
// import Wallet from "./container/apps/crypto/wallet/wallet.jsx";
// import Tables from "./container/tables/tables/tables.jsx";
// import Gridjstables from "./container/tables/gridjstables/gridjstables.jsx";
// import Datatables from "./container/tables/datatables/datatables.jsx";
// import Linechart from "./container/charts/apexcharts/linechart/linechart.jsx";
// import Areachart from "./container/charts/apexcharts/areachart/areachart.jsx";
// import Columnchart from "./container/charts/apexcharts/columnchart/columnchart.jsx";
// import Barchart from "./container/charts/apexcharts/barchart/barchart.jsx";
// import Mixedchart from "./container/charts/apexcharts/mixedchart/mixedchart.jsx";
// import Rangeareachart from "./container/charts/apexcharts/rangeareachart/rangeareachart.jsx";
// import Timelinechart from "./container/charts/apexcharts/timelinechart/timelinechart.jsx";
// import Candlestickchart from "./container/charts/apexcharts/candlestickchart/candlestickchart.jsx";
// import Boxplotchart from "./container/charts/apexcharts/boxplotchart/boxplotchart.jsx";
// import Bubblechart from "./container/charts/apexcharts/bubblechart/bubblechart.jsx";
// import Scatterchart from "./container/charts/apexcharts/scatterchart/scatterchart.jsx";
// import Heatmapchart from "./container/charts/apexcharts/heatmapchart/heatmapchart.jsx";
// import Treemapchart from "./container/charts/apexcharts/treemapchart/treemapchart.jsx";
// import Piechart from "./container/charts/apexcharts/piechart/piechart.jsx";
// import Radialbarchart from "./container/charts/apexcharts/radialbarchart/radialbarchart.jsx";
// import Polarareachart from "./container/charts/apexcharts/polarareachart/polarareachart.jsx";
// import Radarchart from "./container/charts/apexcharts/radarchart/radarchart.jsx";
// import Chartjs from "./container/charts/chartjs/chartjs.jsx";
// import Echarts from "./container/charts/echarts/echarts.jsx";
// import Leafletmaps from "./container/maps/leafletmaps/leafletmaps.jsx";
// import Vectormaps from "./container/maps/vectormaps/vectormaps.jsx";
// import Icons from "./container/icons/icons.jsx";
import "./index.scss";
// import Comingsoon from "./container/authentication/comingsoon/comingsoon.jsx";
// import Landing from "./container/pages/landing/landing.jsx";
// import Jobslanding from "./container/pages/jobslanding/jobslanding.jsx";
// import Undermaintanace from "./container/authentication/undermaintanace/undermaintanace.jsx";
// import Lockbasic from "./container/authentication/lockscreen/lockbasic/lockbasic.jsx";
// import Lockcover from "./container/authentication/lockscreen/lockcover/lockcover.jsx";
// import Resetbasic from "./container/authentication/resetpassword/resetbasic/resetbasic.jsx";
// import Resetcover from "./container/authentication/resetpassword/resetcover/resetcover.jsx";
// import Signupbasic from "./container/authentication/signup/signupbasic/signupbasic.jsx";
// import Signupcover from "./container/authentication/signup/signupcover/signupcover.jsx";
// import Signinbasic from "./container/authentication/signin/signinbasic/signinbasic.jsx";
// import Signincover from "./container/authentication/signin/signincover/signincover.jsx";
// import Twostepbasic from "./container/authentication/twostepverification/twostepbasic/twostepbasic.jsx";
// import Twostepcover from "./container/authentication/twostepverification/twostepcover/twostepcover.jsx";
// import Createbasic from "./container/authentication/createpassword/basic/basic.jsx";
// import Createcover from "./container/authentication/createpassword/cover/cover.jsx";
// import Authenticationlayout from "./pages/authenticationlayout.jsx";
// import Error401 from "./container/error/401error/401error.jsx";
// import Error404 from "./container/error/404error/404error.jsx";
// import Error500 from "./container/error/500error/500error.jsx";
// import Landinglayout from "./pages/landinglayout.jsx";
// import Contacts from "./container/pages/contacts/contacts.jsx";
// import Ratings from "./container/advancedui/rating/rating.jsx";
import Auth from "./firebase/auth.jsx";
import Login from "./firebase/login.jsx";
import Signup from "./firebase/signup.jsx";
// import Scrollspy from "./container/advancedui/scrollspy/scrollspy.jsx";
// import Indicators from "./container/uielements/indicators/indicators.jsx";
import ScrollToTop from "./components/ui/scrolltotop.jsx";
// import Suneditors from "./container/forms/formeditors/suneditors/suneditors.jsx";
// import Emp from "./container/dashboards/Emp.jsx";
// import Org from "./container/dashboards/org/Org.jsx";
// import Branch from "./container/dashboards/Branch/Branch.jsx";
// // import Customer from './container/dashboards/customer/Customer.jsx'
// import Suplier from "./container/dashboards/suplier/Suplier.jsx";
// import Bank from "./container/dashboards/bank/Bank.jsx";
// import Currency from "./container/dashboards/currency/Currency.jsx";
// import Tax from "./container/dashboards/tax/Tax.jsx";
// import Paymode from "./container/dashboards/paymode/Paymode.jsx";
// import Sales from "./container/dashboards/sales/sales.jsx";
// import Terms from "./container/dashboards/terms/Terms.jsx";
// import Country from "./container/dashboards/country/Country.jsx";

import Dashboard from "./container/dashboard/dashboard.jsx";
import Testimonials from "./container/home/Testimonials/Testimonials.jsx";
import Blogs from "./container/home/Blogs/Blogs.jsx";
import Products from "./container/Product/Products.jsx";
import Customer from "./container/Customers/Customer.jsx";
import AdminUser from "./container/AdminUser/AdminUser.jsx";
import Permission from "./container/Permissions/Permissions.jsx";
import Deliveries from "./container/delivery/Deliveries.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Order from "./container/orders/Order.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.Fragment>
    <BrowserRouter>
      <React.Suspense>
        <ScrollToTop />
        <ToastContainer />
        <Routes>
          <Route path={``} element={<Auth />}>
            <Route index element={<Login />} />
            <Route path={`/`} element={<Login />} />
            <Route path={`firebase/signup`} element={<Signup />} />
          </Route>
          <Route path={``} element={<App />}>
            <Route path={`Dashboard`} element={<Dashboard />} />
            <Route path={`products`} element={<Products />} />
            <Route path={`testimonials`} element={<Testimonials />} />
            <Route path={`blogs`} element={<Blogs />} />
            <Route path={`orders`} element={<Order />} />
            <Route path={`customers`} element={<Customer />} />
            <Route path={`admin-user`} element={<AdminUser />} />
            <Route path={`permission`} element={<Permission />} />
            <Route path={`delivery`} element={<Deliveries />} />

            {/* till this  */}
          </Route>
          {/* <Route path={``} element={<Authenticationlayout />}>
            <Route path={`authentication/comingsoon`} element={<Comingsoon />} />
            <Route path={`authentication/createpassword/basic`} element={<Createbasic />} />
            <Route path={`authentication/createpassword/cover`} element={<Createcover />} />

            <Route path={`authentication/lockbasic/lockbasic`} element={<Lockbasic />} />
            <Route path={`authentication/lockcover/lockcover`} element={<Lockcover />} />

            <Route path={`authentication/resetpassword/resetbasic`} element={<Resetbasic />} />
            <Route path={`authentication/resetpassword/resetcover`} element={<Resetcover />} />

            <Route path={`authentication/signup/signupbasic`} element={<Signupbasic />} />
            <Route path={`authentication/signup/signupcover`} element={<Signupcover />} />

            <Route path={`authentication/signin/signinbasic`} element={<Signinbasic />} />
            <Route path={`authentication/signin/signincover`} element={<Signincover />} />

            <Route path={`authentication/twostepverification/twostepbasic`} element={<Twostepbasic />} />
            <Route path={`authentication/twostepverification/twostepcover`} element={<Twostepcover />} />

            <Route path={`authentication/undermaintenance`} element={<Undermaintanace />} />

            <Route path={`error/401error`} element={<Error401 />} />
            <Route path={`error/404error`} element={<Error404 />} />
            <Route path={`error/500error`} element={<Error500 />} />
          </Route> */}
          {/* <Route path={``} element={<Landinglayout />}>
            <Route path={`pages/landing`} element={<Landing />} />
            <Route path={`pages/jobslanding`} element={<Jobslanding />} />
          </Route> */}
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  </React.Fragment>
);
