import { NAVBAR_HEIGHT } from "../../constants/Layout";
import "./Sidebar.css";

import { ProjectList } from "../project/ProjectList";

function Sidebar() {
  return (
    <>
      <div
        className="sidebar bg-body-tertiary border-end"
        style={{
          width: "280px",
          height: `100vh`,
          position: "fixed",
          left: 0,
          top: `${NAVBAR_HEIGHT}px`,
          overflowY: "auto",
          overflowX: "hidden",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ProjectList />
      </div>
    </>
  );
}

export default Sidebar;
