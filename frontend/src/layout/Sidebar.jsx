import {
  LayoutDashboard,
  Users,
  MessageSquare,
  BarChart3,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";


function Sidebar() {

  const menuItem =
"flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium";


  const links = [
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

  return (

    <aside className="w-72 h-screen bg-slate-950 text-white flex flex-col shadow-xl">

      {/* Logo */}
      <div className=" p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-blue-400">
          Feedback 360°
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Gestão de desempenho
        </p>

      </div>

      {/* Menu */}
      <nav className="flex flex-col gap-3 flex-1 p-4">
        {links.map((item) => {
            const Icon = item.icon;

            return (

              <NavLink
                key={item.path}
                to={item.path}

                className={({ isActive }) =>
                  `${menuItem}
                  ${isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`
                }
              >
                <Icon size={21} />
                <span>
                  {item.name}
                </span>

              </NavLink>

            );

          })
        }

      </nav>


      {/* Rodapé */}
      <div className=" p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 w-full p-3 rounded-xl text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition">
          <LogOut size={20} />
          Sair
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;