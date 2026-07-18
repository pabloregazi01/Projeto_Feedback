import { Bell, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-8">
      {/* Título */}
      <div>
        <h2 className="text-xl font-semibold text-foreground">Bem-vindo</h2>
        <p className="text-xs text-muted-foreground">Sistema de Feedback 360°</p>
      </div>

      {/* Ações */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notificações">
          <Bell size={18} />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Alternar tema"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </Button>

        {/* Avatar do usuário */}
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold select-none">
            P
          </div>
          <span className="hidden md:block text-sm text-muted-foreground">
            Administrador
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;