import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function MainLayout({ hideSidebar = false }) {
  return (
    <div className="d-flex flex-column vh-100 bg-body-tertiary">
      {!hideSidebar && <Navbar />}
      <div className="flex-grow-1 d-flex overflow-hidden">
        {!hideSidebar && <Sidebar />}
        {/* This div now just flexes and can scroll internally if needed */}
        <div
          className="flex-grow-1 overflow-auto"
          style={{
            marginLeft: hideSidebar ? "0" : "280px",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
