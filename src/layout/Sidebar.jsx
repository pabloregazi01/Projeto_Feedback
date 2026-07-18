import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  BarChart3,
  LogOut,
  FileEdit,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LINKS_GESTOR = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Usuários", path: "/users", icon: Users },
  { name: "Feedbacks", path: "/feedback", icon: MessageSquare },
  { name: "Relatórios", path: "/reports", icon: BarChart3 },
];

const LINKS_COLABORADOR = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Nova Avaliação", path: "/NovaAvaliacao", icon: FileEdit },
  { name: "Minhas Avaliações", path: "/MinhasAvaliacoes", icon: ClipboardList },
];

function Sidebar() {
  const [perfilAtivo, setPerfilAtivo] = useState("colaborador");

  const links = perfilAtivo === "colaborador" ? LINKS_COLABORADOR : LINKS_GESTOR;

  return (
    <aside className="w-64 h-screen bg-sidebar text-sidebar-foreground flex flex-col border-r border-sidebar-border shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-lg font-bold text-sidebar-primary">Feedback 360°</h1>
        <p className="text-xs text-sidebar-foreground/60 mt-0.5">Gestão de desempenho</p>
      </div>

      {/* Toggle de Perfil */}
      <div className="px-4 pt-5 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50 px-2 mb-2">
          Perfil
        </p>
        <div className="flex gap-1 bg-sidebar-accent/40 p-1 rounded-lg">
          {["colaborador", "gestor"].map((perfil) => (
            <button
              key={perfil}
              onClick={() => setPerfilAtivo(perfil)}
              className={cn(
                "flex-1 py-1.5 text-xs font-medium rounded-md transition-all capitalize",
                perfilAtivo === perfil
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              {perfil}
            </button>
          ))}
        </div>
      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-1 flex-1 px-3 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/50 px-2 mb-1">
          Menu
        </p>
        {links.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )
            }
          >
            <Icon size={17} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Rodapé */}
      <div className="p-3 border-t border-sidebar-border">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground/60 hover:text-destructive hover:bg-destructive/10"
        >
          <LogOut size={17} />
          Sair
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;
