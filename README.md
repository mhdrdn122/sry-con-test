# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


adv
├─ adv.rar
├─ adv1.rar
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  └─ vite.svg
├─ README.md
├─ src
│  ├─ Api
│  │  ├─ baseURL.jsx
│  │  └─ baseURLLocal.jsx
│  ├─ App.css
│  ├─ App.jsx
│  ├─ assets
│  │  ├─ adv_syrian.png
│  │  ├─ agency.jpg
│  │  ├─ logo.png
│  │  └─ photo-adv.jpg
│  ├─ components
│  │  ├─ super_admin
│  │  │  ├─ add_reservation
│  │  │  │  ├─ AddReservationContainer.jsx
│  │  │  │  ├─ ModalCart.jsx
│  │  │  │  └─ ModalShowRoadSign.jsx
│  │  │  ├─ admins
│  │  │  │  ├─ AdminsContainer.jsx
│  │  │  │  ├─ ModalAddAdmin.jsx
│  │  │  │  ├─ ModalEditAdmin.jsx
│  │  │  │  └─ ModalShowAdmin.jsx
│  │  │  ├─ codings
│  │  │  │  ├─ CodingContainer.jsx
│  │  │  │  ├─ ModalAddCoding.jsx
│  │  │  │  └─ ModalEditCoding.jsx
│  │  │  ├─ contract
│  │  │  │  ├─ ContractContainer.jsx
│  │  │  │  ├─ ModalEditDiscount.jsx
│  │  │  │  └─ ModalRenewalContract.jsx
│  │  │  ├─ durations
│  │  │  │  ├─ DurationContainer.jsx
│  │  │  │  ├─ ModalAddDuration.jsx
│  │  │  │  └─ ModalEditDuration.jsx
│  │  │  ├─ employees_activities
│  │  │  │  ├─ EmployeesActivitiesContainer.jsx
│  │  │  │  └─ ModalShowActivities.jsx
│  │  │  ├─ orders
│  │  │  │  ├─ ModalConfirmed.jsx
│  │  │  │  ├─ ModalEditOrder.jsx
│  │  │  │  └─ OrdersContainer.jsx
│  │  │  ├─ payments
│  │  │  │  ├─ ModalAddCashPayment.jsx
│  │  │  │  ├─ ModalAddPayment.jsx
│  │  │  │  ├─ ModalEditPayment.jsx
│  │  │  │  ├─ ModalShowPayment.jsx
│  │  │  │  └─ PaymentsContainer.jsx
│  │  │  ├─ profile
│  │  │  │  ├─ ModalEditSuperAdminInfo.jsx
│  │  │  │  └─ ProfileDetails.jsx
│  │  │  ├─ report
│  │  │  │  └─ ReportContainer.jsx
│  │  │  ├─ reservations
│  │  │  │  ├─ ModalAddReservation.jsx
│  │  │  │  ├─ ModalEditReservation.jsx
│  │  │  │  ├─ ModalShowReservation.jsx
│  │  │  │  └─ ReservationsContainer.jsx
│  │  │  ├─ road_signs
│  │  │  │  ├─ DynamicTable.jsx
│  │  │  │  ├─ ModalAddReserveRoadSign.jsx
│  │  │  │  ├─ ModalAddRoadSign.jsx
│  │  │  │  ├─ ModalEditRoadSign.jsx
│  │  │  │  ├─ ModalShowRoadSign.jsx
│  │  │  │  └─ RoadSignsContainer.jsx
│  │  │  └─ users
│  │  │     ├─ ModalAddUser.jsx
│  │  │     ├─ ModalEditUser.jsx
│  │  │     ├─ ModalShowContract.jsx
│  │  │     ├─ ModalShowOffer.jsx
│  │  │     ├─ ModalShowUser.jsx
│  │  │     └─ UsersContainer.jsx
│  │  └─ titi
│  ├─ hooks
│  │  ├─ Admin
│  │  │  └─ useInsertData.jsx
│  │  └─ superAdmin
│  │     └─ useCacheInLocalStorage.js
│  ├─ index.css
│  ├─ Layouts
│  │  └─ LayoutSuperAdmin.jsx
│  ├─ main.jsx
│  ├─ pages
│  │  ├─ super_admin
│  │  │  ├─ add_reservation
│  │  │  │  └─ AddReservationPage.jsx
│  │  │  ├─ admins
│  │  │  │  └─ AllAdminsPage.jsx
│  │  │  ├─ auth
│  │  │  │  ├─ Login.css
│  │  │  │  └─ Login.jsx
│  │  │  ├─ box
│  │  │  │  └─ Box.jsx
│  │  │  ├─ coding
│  │  │  │  └─ CodingPage.jsx
│  │  │  ├─ contract
│  │  │  │  └─ ContractPage.jsx
│  │  │  ├─ duration
│  │  │  │  └─ DurationPage.jsx
│  │  │  ├─ employees_activities
│  │  │  │  └─ EmployeesActivitiesPage.jsx
│  │  │  ├─ orders
│  │  │  │  └─ OrdersPage.jsx
│  │  │  ├─ payments
│  │  │  │  └─ PaymentsPage.jsx
│  │  │  ├─ profile
│  │  │  │  ├─ ProfilePage.css
│  │  │  │  └─ ProfilePage.jsx
│  │  │  ├─ report
│  │  │  │  └─ ReportPage.jsx
│  │  │  ├─ reservation
│  │  │  │  └─ ReservationPage.jsx
│  │  │  ├─ road_signs
│  │  │  │  └─ RoadSignsPage.jsx
│  │  │  ├─ users
│  │  │  │  └─ AllUsersPage.jsx
│  │  │  └─ user_contracts
│  │  │     └─ UserContracts.jsx
│  │  └─ titi
│  ├─ redux
│  │  ├─ slice
│  │  │  ├─ super_admin
│  │  │  │  ├─ auth
│  │  │  │  │  └─ authSlice.jsx
│  │  │  │  ├─ box
│  │  │  │  │  └─ boxApi.jsx
│  │  │  │  ├─ codings
│  │  │  │  │  └─ codingsApi.jsx
│  │  │  │  ├─ contracts
│  │  │  │  │  └─ contractsApi.jsx
│  │  │  │  ├─ durations
│  │  │  │  │  └─ durationsApi.jsx
│  │  │  │  ├─ employees_activities
│  │  │  │  │  └─ employees_activitiesApi.jsx
│  │  │  │  ├─ orders
│  │  │  │  │  └─ ordersApi.jsx
│  │  │  │  ├─ payments
│  │  │  │  │  └─ paymentsApi.jsx
│  │  │  │  ├─ profile
│  │  │  │  │  └─ ProfileApi.jsx
│  │  │  │  ├─ report
│  │  │  │  │  └─ ReportApi.jsx
│  │  │  │  ├─ reservations
│  │  │  │  │  └─ reservationsApi.jsx
│  │  │  │  ├─ road_signs
│  │  │  │  │  ├─ roadSignsApi.jsx
│  │  │  │  │  └─ selectedSignsSlice.jsx
│  │  │  │  ├─ super_admins
│  │  │  │  │  └─ superAdminsApi.jsx
│  │  │  │  └─ users
│  │  │  │     └─ usersApi.jsx
│  │  │  └─ titi
│  │  └─ store
│  │     └─ store.jsx
│  └─ utils
│     ├─ Breadcrumb.jsx
│     ├─ Header.jsx
│     ├─ ModalDelete.jsx
│     ├─ Pagination.jsx
│     ├─ super_admin
│     │  ├─ DateFilter.jsx
│     │  ├─ SearchInput.jsx
│     │  ├─ SuperAdminSidebar.jsx
│     │  └─ super_admin
│     │     ├─ DateFilter.jsx
│     │     ├─ SearchInput.jsx
│     │     └─ SuperAdminSidebar
│     │        ├─ menuItemsConfig.jsx
│     │        ├─ SidebarItem.jsx
│     │        ├─ SuperAdminSidebar.jsx
│     │        └─ useLogout.js
│     └─ useNotification.jsx
├─ tailwind.config.js
└─ vite.config.js
