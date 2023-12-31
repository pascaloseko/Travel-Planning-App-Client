import { useState } from "react";
import { useRouter } from "next/router";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  onSidebarItemClick: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSidebarItemClick }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("dashboard"); // Set "dashboard" as the default active state

  const handleItemClick = (item: string) => {
    // Update the active item
    setActiveItem(item);
    // Call the provided prop callback
    onSidebarItemClick(item);
    // Navigate to the corresponding route
  };

  const sidebarClasses = `bg-gradient-to-br from-gray-800 to-gray-900 fixed inset-0 z-50 my-4 ml-4
    h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300
    transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    xl:translate-x-0`;

  return (
    <aside className={sidebarClasses}>
      <div className="relative border-b border-white/20">
        <a className="flex items-center gap-4 py-6 px-8" href="/">
          <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
            Travel Planning App
          </h6>
        </a>
        <button
          className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-5 w-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </span>
        </button>
      </div>
      <div className="m-4">
        <ul className="mb-4 flex flex-col gap-1">
          <SidebarItem
            title="dashboard"
            isActive={activeItem === "dashboard"}
            onClick={() => handleItemClick("dashboard")}
          />
          <SidebarItem
            title="profile"
            isActive={activeItem === "profile"}
            onClick={() => handleItemClick("profile")}
          />
          <SidebarItem
            title="notifications"
            isActive={activeItem === "notifications"}
            onClick={() => handleItemClick("notifications")}
          />
          <SidebarItem
            title="your trips"
            isActive={activeItem === "your trips"}
            onClick={() => handleItemClick("your trips")}
          />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;