import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router"

// Components
const  Loading =  lazy(()=>  import("./components/small/Loading"))
const  Product =  lazy(()=>  import("./components/Tabs/Products"))
const  Orders =  lazy(()=>  import("./components/Tabs/Orders"))
const  Users =  lazy(()=>  import("./components/Tabs/User"))
const  Analytics =  lazy(()=>  import("./components/Tabs/Analytics"))
const  Reports =  lazy(()=>  import("./components/Tabs/Reports"))
const  EditProduct =  lazy(()=>  import("./components/screen/AditProduct"))
const Header = lazy(()=> import("./pages/Header"))
const Dashboard = lazy(()=> import("./pages/Dashboard"))
const AddProduct  = lazy(()=> import("./components/screen/AddProduct"))
const MangeOrder  = lazy(()=> import("./components/screen/MangeOrder"))

const App = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <BrowserRouter>
      <Header/>
        <Routes>
          {/* Tabs */}
          <Route path="/" element={<Dashboard/>} />
          <Route path="/products" element={<Product/>} />  
          <Route path="/orders" element={<Orders/>} />  
          <Route path="/users" element={<Users/>} />  
          <Route path="/analytics" element={<Analytics/>} />  
          <Route path="/reports" element={<Reports/>} />  
          {/* Screen */}
          <Route path="/addproduct" element={<AddProduct/>} /> 
          {/* Dynamic Route */}
          <Route path="/product/:productId" element={<EditProduct/>} />  
          <Route path="/order/:orderId" element={<MangeOrder/>} />  
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App