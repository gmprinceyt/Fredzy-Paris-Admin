import { Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router"

// Components
import Loading from "./components/Loading"
import { Dashboard } from "./pages/Dashboard"

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