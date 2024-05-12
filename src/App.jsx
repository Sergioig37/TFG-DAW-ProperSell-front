import { Route, BrowserRouter, Routes} from "react-router-dom"
import { LandingPage } from "./components/LandingPage"
import { Login } from "./components/Login"
import { Register } from "./components/Register"
import { HomePage } from "./components/HomePage"

export const App = () => {


  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/home" element={<HomePage/>}/>
          </Routes>
        </BrowserRouter>
    </>
  )
}


