import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Feedback from "../pages/Feedback";
import Reports from "../pages/Reports";
import NotFound from "../pages/NotFound";
import NovaAvaliacao from "../pages/NovaAvaliacao";
import MinhasAvaliacoes from "../pages/MinhasAvaliacoes";

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
          
          {/* O path='' tem que estar da mesma forma que está no Sidebar.jsx */}
          <Route path="/MinhasAvaliacoes" element={<MinhasAvaliacoes />} />

          <Route path="/NovaAvaliacao" element={<NovaAvaliacao />} />

        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;