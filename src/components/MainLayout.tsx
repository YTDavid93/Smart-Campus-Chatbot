import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <main className="flex flex-col h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
