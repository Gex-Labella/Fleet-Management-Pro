import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  Vehicle,
  Driver,
  Trip,
  JobCard,
  Part,
  Supplier,
} from "../models/types";

interface AppContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  vehicles: Vehicle[];
  drivers: Driver[];
  trips: Trip[];
  jobCards: JobCard[];
  addJobCard: (jobCard: JobCard) => void;
  updateJobCard: (jobCard: JobCard) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  expandedFleetSection: boolean;
  toggleFleetSection: () => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
  showJobCardModal: boolean;
  setShowJobCardModal: (show: boolean) => void;
  parts: Part[];
  suppliers: Supplier[];
  addPart: (part: Part) => void;
  updatePart: (part: Part) => void;
  deletePart: (partId: string) => void;
}
const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

// Initial active tab should be 'login' if not authenticated
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Get stored theme from local storage or default to 'light'
  const storedTheme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : null;
  const [theme, setTheme] = useState<"light" | "dark">(
    storedTheme === "dark" ? "dark" : "light"
  );
  const [activeTab, setActiveTab] = useState("login");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [expandedFleetSection, setExpandedFleetSection] = useState(false);
  const [showJobCardModal, setShowJobCardModal] = useState(false); // Added state

  const toggleFleetSection = () => {
    setExpandedFleetSection(!expandedFleetSection);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme to the document when theme changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const [vehicles] = useState<Vehicle[]>([
    {
      id: "1",
      make: "Ford",
      model: "Transit",
      year: 2022,
      vin: "WBA3A5G59DNP26082",
      status: "active",
      driver: "John Doe",
      mileage: 45000,
    },
    {
      id: "2",
      make: "Mercedes",
      model: "Sprinter",
      year: 2021,
      vin: "WBA3A5G59DNP26083",
      status: "maintenance",
      mileage: 62000,
    },
    {
      id: "3",
      make: "Isuzu",
      model: "NPR",
      year: 2023,
      vin: "WBA3A5G59DNP26084",
      status: "active",
      driver: "Jane Smith",
      mileage: 23000,
    },
  ]);

  const [drivers] = useState<Driver[]>([
    {
      id: "1",
      name: "John Doe",
      license: "DL123456789",
      phone: "+1-555-0123",
      status: "active",
      assignedVehicle: "1",
    },
    {
      id: "2",
      name: "Jane Smith",
      license: "DL987654321",
      phone: "+1-555-0124",
      status: "active",
      assignedVehicle: "3",
    },
    {
      id: "3",
      name: "Mike Johnson",
      license: "DL456789123",
      phone: "+1-555-0125",
      status: "inactive",
    },
  ]);

  const [trips] = useState<Trip[]>([
    {
      id: "1",
      vehicleId: "1",
      driverId: "1",
      origin: "New York",
      destination: "Boston",
      status: "active",
      startTime: "2024-01-15T08:00:00Z",
      distance: 215,
    },
    {
      id: "2",
      vehicleId: "3",
      driverId: "2",
      origin: "Chicago",
      destination: "Detroit",
      status: "completed",
      startTime: "2024-01-14T10:30:00Z",
      distance: 283,
    },
    {
      id: "3",
      vehicleId: "1",
      driverId: "1",
      origin: "Los Angeles",
      destination: "San Diego",
      status: "scheduled",
      startTime: "2024-01-16T09:00:00Z",
      distance: 120,
    },
  ]);

  const [parts, setParts] = useState<Part[]>([
    {
      id: "P001",
      name: "Oil Filter",
      partNumber: "OF-123456",
      category: "Filters",
      quantity: 32,
      minQuantity: 10,
      supplier: "AutoParts Inc",
      unitPrice: 8.99,
      location: "Shelf A3",
      lastOrdered: "2024-01-05",
    },
    {
      id: "P002",
      name: "Brake Pad Set",
      partNumber: "BP-789012",
      category: "Brakes",
      quantity: 8,
      minQuantity: 5,
      supplier: "BrakeMasters Co",
      unitPrice: 45.5,
      location: "Shelf B2",
      lastOrdered: "2024-01-12",
    },
    // ... add more sample parts
  ]);

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: "S001",
      name: "AutoParts Inc",
      contact: "John Supplier",
      email: "john@autoparts.com",
      phone: "555-123-4567",
      address: "123 Parts St, Autoville",
      rating: 4.5,
    },
    {
      id: "S002",
      name: "BrakeMasters Co",
      contact: "Sarah Supplier",
      email: "sarah@brakemasters.com",
      phone: "555-987-6543",
      address: "456 Brake Ave, Partstown",
      rating: 4.2,
    },
    // ... add more suppliers
  ]);

  const addPart = (part: Part) => {
    setParts([...parts, { ...part, id: crypto.randomUUID() }]);
  };

  const updatePart = (updatedPart: Part) => {
    setParts(
      parts.map((part) => (part.id === updatedPart.id ? updatedPart : part))
    );
  };

  const deletePart = (partId: string) => {
    setParts(parts.filter((part) => part.id !== partId));
  };

  const [jobCards, setJobCards] = useState<JobCard[]>([]);

  // Add job card functions
  const addJobCard = (jobCard: JobCard) => {
    setJobCards([...jobCards, { ...jobCard, id: crypto.randomUUID() }]);
  };

  const updateJobCard = (updatedJobCard: JobCard) => {
    setJobCards(
      jobCards.map((card) =>
        card.id === updatedJobCard.id ? updatedJobCard : card
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        sidebarOpen,
        setSidebarOpen,
        vehicles,
        drivers,
        trips,
        jobCards,
        addJobCard,
        updateJobCard,
        isAuthenticated,
        setIsAuthenticated,
        expandedFleetSection,
        toggleFleetSection,
        theme,
        toggleTheme,
        showJobCardModal,
        setShowJobCardModal,
        parts,
        suppliers,
        addPart,
        updatePart,
        deletePart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
