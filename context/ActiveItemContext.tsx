import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
  } from "react";
  
  interface ActiveItemContextProps {
    activeItem: string;
    handleSidebarItemClick: (item: string) => void;
  }
  
  const ActiveItemContext = createContext<
    ActiveItemContextProps | undefined
  >(undefined);
  
  interface ActiveItemProviderProps {
    children: ReactNode;
  }
  
  export const ActiveItemProvider: React.FC<ActiveItemProviderProps> = ({
    children,
  }) => {
    const [activeItem, setActiveItem] = useState("dashboard");
  
    const handleSidebarItemClick = (item: string) => {
      setActiveItem(item);
    };
  
    return (
      <ActiveItemContext.Provider value={{ activeItem, handleSidebarItemClick }}>
        {children}
      </ActiveItemContext.Provider>
    );
  };
  
  export const useActiveItemContext = (): ActiveItemContextProps => {
    const context = useContext(ActiveItemContext);
    if (!context) {
      throw new Error(
        "useActiveItemContext must be used within an ActiveItemProvider"
      );
    }
    return context;
  };
  