import { Outlet } from "react-router-dom";
import SideBar from "../component/Admin/user/SideBar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <main className="flex-1 overflow-auto">
        <Outlet />  
      </main>
    </div>
  );
};
export default AdminLayout