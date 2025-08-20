import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router"

// Components
import Loading from "./components/small/Loading";
import Product from "./components/Tabs/Products";
import Orders from "./components/Tabs/Orders";
import Users from "./components/Tabs/User";
import Analytics from "./components/Tabs/Analytics";
import Reports from "./components/Tabs/Reports";
import AditProduct from "./components/screen/AditProduct";
const Header = lazy(()=> import("./pages/Header"))
const Dashboard = lazy(()=> import("./pages/Dashboard"))
const AddProduct  = lazy(()=> import("./components/screen/AddProduct"))
const App = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/addproduct" element={<AddProduct/>} /> 
          <Route path="/products" element={<Product/>} />  
          <Route path="/orders" element={<Orders/>} />  
          <Route path="/users" element={<Users/>} />  
          <Route path="/analytics" element={<Analytics/>} />  
          <Route path="/reports" element={<Reports/>} />  
          <Route path="/product/:productId" element={<AditProduct/>} />  
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App