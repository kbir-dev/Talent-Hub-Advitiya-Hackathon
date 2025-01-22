import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import TalentApproval from "../pages/TalentApproval"
import HireApproval from "../pages/HireApproval"

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/talent-approval" replace />} />
            <Route path="/talent-approval" element={<TalentApproval />} />
            <Route path="/hire-approval" element={<HireApproval />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

