import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Login } from './pages/login.jsx'
import { Register } from './pages/register.jsx'
import { Forgetpassword } from './pages/forgetpassword.jsx'
import { Emailverifyregister } from './pages/verify-email.jsx'
import PropTypes from "prop-types";
import { Dashboardpage } from './crm_page/dashboard.jsx'
import { Changepassword } from './pages/changepassword.jsx'
import { Topmenu } from './crm_page/topmenu.jsx'
import { Addnewcus } from './crm_page/addnewcus.jsx'
import { Allcustomer } from './crm_page/allcustomerdata.jsx'
import { CustomerData } from './crm_page/customerdetail.jsx'
import { useReducer } from 'react'
import { Addcommunication } from './communication/addcomm.jsx'
import { Allcommuication } from './communication/allcomm.jsx'
import { Addfeedback } from './feedback/addfeedback.jsx'
import { Allfeedback } from './feedback/allfeedback.jsx'
import { Allqueries } from './feedback/allqueries.jsx'
import { appreducer, initialstate } from './pages/Appreducer.js'
import AppContext from './pages/Appcontext.js'
import { Report } from './feedback/report.jsx'
import { LoginSuccess } from './pages/googleLogin.jsx'
import { NotFound } from './pages/notFound.jsx'
function App() {
  let [state, dispatch] = useReducer(appreducer, initialstate)
  let Privateroute = ({ component }) => {
    let isAuthenticated = Boolean(localStorage.getItem("useremail"))
    if (isAuthenticated) {
      return component
    }
    else {
      return <Navigate to='/' />
    }
  }
  Privateroute.propTypes = {
    component: PropTypes.node
  }
  return (
    <>
      <AppContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Routes>
            <Route element={<Topmenu />}>
              <Route path="/userpage" element={<Privateroute component={<Dashboardpage />} />} />
              <Route path="/customerdetail" element={<Privateroute component={<Allcustomer />} />} />
              <Route path="/newcustomer" element={<Privateroute component={<Addnewcus />} />} />
              <Route path="/customerdata" element={<Privateroute component={<CustomerData />} />} />
              <Route path="/addcommunication" element={<Privateroute component={<Addcommunication />} />} />
              <Route path="/allcommunication" element={<Privateroute component={<Allcommuication />} />} />
              <Route path="/allfeedback" element={<Privateroute component={<Allfeedback />} />} />
              <Route path="/allqueries" element={<Privateroute component={<Allqueries />} />} />
              <Route path="/report" element={<Privateroute component={<Report />} />} />
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/loginSuccess" element={<LoginSuccess />} />
            <Route path="/forgetpassword" element={<Forgetpassword />} />
            <Route path="/register-verify-email" element={<Emailverifyregister />} />
            <Route path='/changepassword' element={<Changepassword />} />
            <Route path="/addfeedback" element={<Addfeedback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  )
}

export default App
