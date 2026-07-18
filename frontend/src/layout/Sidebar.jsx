
import { useState } from "react";

import {
  LayoutDashboard,
  Users,
  MessageSquare,
  BarChart3,
  LogOut,
  FileEdit,      // Novo ícone
  ClipboardList  // Novo ícone
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {
  // 1. Estado para controlar o perfil ativo (inicia como colaborador)
  const [perfilAtivo, setPerfilAtivo] = useState('colaborador');


  const menuItem =
    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium";

  // 2. Arrays separados para cada perfil
  const linksGestor = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Usuários",
      path: "/users",
      icon: Users,
    },
    {
      name: "Feedbacks",
      path: "/feedback",
      icon: MessageSquare,
    },
    {
      name: "Relatórios",
      path: "/reports",
      icon: BarChart3,
    },
  ];

  const linksColaborador = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Nova Avaliação",
      path: "/NovaAvaliacao",
      icon: FileEdit,
    },
    {
      name: "Minhas Avaliações",
      path: "/MinhasAvaliacoes",
      icon: ClipboardList,
    },
  ];

  // 3. Variável que decide quais links mostrar baseada no estado
  const linksAtuais = perfilAtivo === 'colaborador' ? linksColaborador : linksGestor;

  return (
    <aside className="w-72 h-screen bg-slate-950 text-white flex flex-col shadow-xl">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-blue-400">Feedback 360°</h1>
        <p className="text-sm text-slate-400 mt-1">Gestão de desempenho</p>
      </div>

      {/* Toggle de Perfil */}
      <div className="px-4 pt-6 pb-2">
        <p className="text-xs text-slate-500 mb-3 uppercase tracking-wider font-semibold px-2">
          Perfil
        </p>
        <div className="flex gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setPerfilAtivo('colaborador')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              perfilAtivo === 'colaborador'
                ? 'bg-blue-600 text-white border border-blue-800/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            Colaborador   
          </button>
            
          <button
            onClick={() => setPerfilAtivo('gestor')}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              perfilAtivo === 'gestor'
                ? 'bg-blue-600 text-white border border-blue-800/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            Gestor
          </button>
        </div>
      </div>

      {/* Menu Dinâmico */}
      <nav className="flex flex-col gap-3 flex-1 p-4">
        <p className="text-xs text-slate-500 mb-1 uppercase tracking-wider font-semibold px-2">
          Menu
        </p>
        {linksAtuais.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${menuItem} ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={21} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Rodapé */}
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 w-full p-3 rounded-xl text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition">
          <LogOut size={20} />
          Sair
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
