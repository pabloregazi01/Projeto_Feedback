import { useState } from "react";
import { toast } from "react-toastify";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });

  function handleChange(e) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: integrar com Supabase auth + validação Zod
    toast.info("Autenticação será integrada com Supabase.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary">Feedback 360°</CardTitle>
          <CardDescription>Gestão de avaliações e desenvolvimento</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Usuário</Label>
              <Input
                id="email"
                name="email"
                type="text"
                placeholder="Digite seu usuário"
                value={values.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Digite sua senha"
                value={values.password}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full mt-1">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;