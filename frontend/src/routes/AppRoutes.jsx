import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Feedback from "../pages/Feedback";
import Reports from "../pages/Reports";
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login sem layout */}
        <Route path="/" element={<Login />} />

        {/* Rotas protegidas com layout */}
        <Route element={<MainLayout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/users" element={<Users />} />

          <Route path="/feedback" element={<Feedback />} />

          <Route path="/reports" element={<Reports />} />

        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;