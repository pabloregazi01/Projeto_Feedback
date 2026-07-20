import { BrowserRouter, Routes, Route } from "react-router-dom";

<<<<<<< Updated upstream
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Feedback from "../pages/Feedback";
import Reports from "../pages/Reports";
import NotFound from "../pages/NotFound";
import NovaAvaliacao from "../pages/NovaAvaliacao";
import MinhasAvaliacoes from "../pages/MinhasAvaliacoes";
=======
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
import CicloAvaliacao from "@/pages/cicloAvaliacao";
import CompetenciasLista from "@/pages/CompetenciasLista";
import ClonarTemplate from "@/pages/ClonarTemplate";
>>>>>>> Stashed changes

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

<<<<<<< Updated upstream
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

=======
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
            <Route path="/cicloAvaliacao" element={<CicloAvaliacao />} />
            <Route path="/templates-competencias" element={<CompetenciasLista />} />
            {/* o path do route, tem que ser igual a url do sidebar */}
            <Route path="/CompetenciasLista/ClonarTemplate" element={<ClonarTemplate />} />

          </Route>
>>>>>>> Stashed changes
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;