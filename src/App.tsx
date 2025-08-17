import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router"

// Components
import Loading from "./components/small/Loading";
const Dashboard = lazy(()=> import("./pages/Dashboard"))

const App = () => {
  return (
    <Suspense fallback={<Loading/>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App