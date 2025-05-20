import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import "./index.css"
import Login from "./pages/super_admin/auth/Login"
import LayoutSuperAdmin from "./Layouts/LayoutSuperAdmin"
import AllAdminsPage from "./pages/super_admin/admins/AllAdminsPage"
import AllUsersPage from "./pages/super_admin/users/AllUsersPage"
import CodingPage from "./pages/super_admin/coding/CodingPage"
import DurationPage from "./pages/super_admin/duration/DurationPage"
import RoadSignsPage from "./pages/super_admin/road_signs/RoadSignsPage"
import ReservationPage from "./pages/super_admin/reservation/ReservationPage"
import OrdersPage from "./pages/super_admin/orders/OrdersPage"
import PaymentsPage from "./pages/super_admin/payments/PaymentsPage"
import ProfilePage from "./pages/super_admin/profile/ProfilePage"
import Box from "./pages/super_admin/box/Box"
import ContractPage from "./pages/super_admin/contract/ContractPage"
import AddReservationPage from "./pages/super_admin/add_reservation/AddReservationPage"
import ReportPage from "./pages/super_admin/report/ReportPage"
import EmployeesActivitiesPage from './pages/super_admin/employees_activities/EmployeesActivitiesPage'
import { useContext } from "react"
import UserContracts from "./pages/super_admin/user_contracts/UserContracts"
import SingIn from "./pages/super_admin/auth/SignInPage"
function App({toggleMode}) { 
 

  const navigate =useNavigate();
  return (
    <div>
      <Routes>
      {/* <Route path="/super_admin/login" element={<Login />} /> */}
      <Route path="/" element={<SingIn />} />

        <Route path="/super_admin" element={<LayoutSuperAdmin toggleMode={toggleMode} />}>

        <Route index element={<ProfilePage />} /> 

        <Route
              path="admins"
              element={
           
                  <AllAdminsPage
                   />
              }
            />
             <Route
              path="employees_activities"
              element={
                  <EmployeesActivitiesPage/>
              }
            />
          <Route
            path="users"
            element={
              <AllUsersPage />
            }/>
<Route 
              path="users/:id"
              element={
                <UserContracts />
              }
            />
          
           <Route 
            path="coding"
            element={
              <CodingPage />
            }
          />
           <Route 
            path="duration"
            element={
              <DurationPage />
            }
          />
            <Route 
            path="road_signs"
            element={
              <RoadSignsPage />
            }
          />
              <Route 
            path="add_reservation"
            element={
              <AddReservationPage />
            }
          />
          
            <Route 
            path="reservations"
            element={
              <ReservationPage />
            }
          />
           <Route 
            path="orders"
            element={
              <OrdersPage />
            }
          />
           <Route 
            path="payments"
            element={
              <PaymentsPage />
            }
          />
             <Route 
            path="report"
            element={
              <ReportPage />
            }
          />
              <Route 
            path="contracts"
            element={
              <ContractPage />
            }
          />
             <Route 
            path="box"
            element={
              <Box />
            }
          />
        </Route>
        
          <Route path="*" element={
              <>
              <button
                onClick={()=>navigate('/')}
                style={{
                  backgroundColor:'#595959'
                }}
              className="border-none text-center font-semibold mt-10 ms-10 p-2 rounded-lg text-white">Go Login page</button>
            <div className="text-center font-bold mt-48">No page Found</div>
            </>
}>

          </Route>
      </Routes>
    </div>
  )
}

export default App
