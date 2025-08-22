import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Password from "./pages/Password";
import ProtectedRoute from "./pages/ProtectedRoute";

// Components
const Loading = lazy(() => import("./components/small/Loading"));
const Product = lazy(() => import("./components/Tabs/Products"));
const Orders = lazy(() => import("./components/Tabs/Orders"));
const Users = lazy(() => import("./components/Tabs/User"));
const Analytics = lazy(() => import("./components/Tabs/Analytics"));
const Reports = lazy(() => import("./components/Tabs/Reports"));
const EditProduct = lazy(() => import("./components/screen/AditProduct"));
const Header = lazy(() => import("./pages/Header"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddProduct = lazy(() => import("./components/screen/AddProduct"));
const MangeOrder = lazy(() => import("./components/screen/MangeOrder"));
const UserDetails = lazy(() => import("./components/screen/UserDetails"));

const App = () => {
  const getPass = localStorage.getItem("password");

  if (!getPass && getPass !== `${import.meta.env.VITE_PASSWORD}`)
    return <Password />;

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Tabs */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/password" element={<Password />} />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <Product />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />
          {/* Screen */}
          <Route
            path="/addproduct"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          {/* Dynamic Route */}
          <Route
            path="/product/:productId"
            element={
              <ProtectedRoute>
                <EditProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:orderId"
            element={
              <ProtectedRoute>
                <MangeOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/:userId"
            element={
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default App;
