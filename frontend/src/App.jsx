import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Navigation from "./components/Navigation"
import Home from "./components/Home"
import RegisterTalent from "./components/RegisterTalent"
import RegisterClient from "./components/RegisterClient"
import Login from "./components/Login"
import ViewTalents from "./components/ViewTalents"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register-talent" element={<RegisterTalent />} />
          <Route path="/register-client" element={<RegisterClient />} />
          <Route path="/login" element={<Login />} />
          <Route path="/view-talents" element={<ViewTalents />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

