import { Outlet } from "react-router-dom";

import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";

function MainLayout() {

  return (

    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">

        <Header />

        <main className="flex-1 p-8 bg-slate-100 overflow-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default MainLayout;