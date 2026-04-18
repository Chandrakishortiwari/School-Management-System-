import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({open,setOpen}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  

  // detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setOpen(false); // reset mobile state
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { id: "/dashboard", label: "Dashboard", icon: "🏠" },
    { id: "/students", label: "Students", icon: "🎓" },
    { id: "/teachers", label: "Teachers", icon: "👨‍🏫" },
    { id: "/attendance", label: "Attendance", icon: "📅" },
    { id: "/fees", label: "Fees", icon: "💰" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 h-screen bg-white border-r transition-all duration-300 z-50
        
        ${isMobile
          ? open
            ? "w-64"
            : "w-0 overflow-hidden"
          : "w-20 hover:w-64 group"}
      `}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between">
          {/* Show text only when expanded */}
          <h1 className={`font-bold text-lg ${!isMobile ? "hidden group-hover:block" : ""}`}>
            EduDash
          </h1>

          {/* Mobile close button */}
          {isMobile && (
            <button onClick={() => setOpen(false)}>✖</button>
          )}
        </div>

        {/* Menu */}
        <div className="mt-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(item.id);
                  if (isMobile) setOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition
                ${isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}
              >
                <span className="text-xl">{item.icon}</span>

                {/* Hide text on desktop unless hover */}
                <span
                  className={`
                  ${isMobile ? "block" : "hidden group-hover:block"}
                `}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Toggle Button (Header me use karna) */}
      {/* {isMobile && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 bg-white p-2 rounded shadow"
        >
          ☰
        </button>
      )} */}
    </>
  );
};

export default Sidebar;