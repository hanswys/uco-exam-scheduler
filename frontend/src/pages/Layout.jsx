import { Outlet, useNavigate } from "react-router-dom";
import "../App.css";
import Aurora from "../components/Aurora.jsx";
import ClickSpark from "../components/ClickSpark.jsx";
import Dock from "../components/Dock.jsx";
import HomeIcon from "@mui/icons-material/Home";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmailIcon from "@mui/icons-material/Email";


const Layout = () => {
  const navigate = useNavigate();

  const items = [
  { icon: <HomeIcon size={18} />, label: "Home", onClick: () => navigate("/") },
  { icon: <HelpOutlineIcon size={18} />, label: "View All Exams", onClick: () => window.open("https://www.uco.edu/admissions/dates/exams/", "_blank", "noopener,noreferrer") },
  { icon: <CalendarTodayIcon size={18} />, label: "Schedule", onClick: () => navigate("/schedule")  },
  { icon: <EmailIcon size={18} />, label: "Contact", onClick: () => navigate("/contact")  },
];

  const handleItemClick = (item) => {
    if (item.to) navigate(item.to);
  };

  return (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        {/* Aurora as background */}
        <Aurora
          colorStops={["#1628b1", "#eee617", "#1628b1"]}
          blend={0.5}
          amplitude={3.0}
          speed={0.5}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
        {/* Foreground content */}
        <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
          <Outlet />
          <div
            style={{
              position: "fixed",
              left: 0,
              bottom: 0,
              width: "100vw",
              zIndex: 10,
            }}
          >
            <Dock
              items={items}
              panelHeight={68}
              baseItemSize={50}
              magnification={70}
            />
          </div>
        </div>
      </div>
    </ClickSpark>
  );
};

export default Layout;