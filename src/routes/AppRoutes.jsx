import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Users from "@/pages/Users";
import Feedback from "@/pages/Feedback";
import Reports from "@/pages/Reports";
import NotFound from "@/pages/NotFound";
import NovaAvaliacao from "@/pages/NovaAvaliacao";
import MinhasAvaliacoes from "@/pages/MinhasAvaliacoes";
import DefinirSenha from "@/pages/DefinirSenha";
import { ProtectedRoute, RoleRoute } from "@/routes/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página de login sem layout */}
        <Route path="/" element={<Login />} />
        <Route path="/definir-senha" element={<DefinirSenha />} />

        {/* Páginas protegidas com layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route element={<RoleRoute allowedRoles={["admin", "rh"]} />}>
              <Route path="/users" element={<Users />} />
            </Route>
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/MinhasAvaliacoes" element={<MinhasAvaliacoes />} />
            <Route path="/NovaAvaliacao" element={<NovaAvaliacao />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
