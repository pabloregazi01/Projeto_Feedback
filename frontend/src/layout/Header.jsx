import { Bell, Moon } from "lucide-react";

function Header() {

  return (

    <header className=" h-20 bg-white border-b flex items-center justify-between px-8 shadow-sm">
      {/* Título */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Bem-vindo
        </h2>

        <p className="text-sm text-slate-500">
          Sistema de Feedback 360°
        </p>

      </div>

      {/* Ações */}
      <div className="flex items-center gap-5">
        <button className="p-2 rounded-full hover:bg-slate-100 transition">
          <Bell 
            size={22}
            className="text-slate-600"
          />
        </button>

        <button className="p-2 rounded-full hover:bg-slate-100 transition">
          <Moon
            size={22}
            className="text-slate-600"
          />
        </button>

        {/* Usuário */}
        <div className="flex items-center gap-3 ml-3">
          <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
            P
          </div>

          <div className="hidden md:block">
            <span className=" text-xs text-slate-500">
              Administrador
            </span>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;