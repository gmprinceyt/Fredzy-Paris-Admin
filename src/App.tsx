import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router"

// Components
import Loading from "./components/small/Loading";
const Dashboard = lazy(()=> import("./pages/Dashboard"))
const AddProduct  = lazy(()=> import("./components/screen/AddProduct"))
const App = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/addproduct" element={<AddProduct/>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App