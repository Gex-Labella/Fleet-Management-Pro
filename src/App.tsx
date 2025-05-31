import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider, useAppContext } from "./context/AppContext";
import Layout from "./Components/common/layout";
import Dashboard from "./pages/Dashboard";
import FleetManagement from "./pages/_FleetManagement";
import Drivers from "./pages/Drivers";
import Trips from "./pages/Trips";
import Maintenance from "./pages/Maintenance";
import Fuel from "./pages/Fuel";
import Reports from "./pages/Reports";
import Compliance from "./pages/Compliance";
import Notifications from "./pages/Notifications";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import JobCardManagement from "./pages/JobCardManagement";
import PartsInventory from "./pages/PartsInventory";

// ContentSwitcher component
function ContentSwitcher() {
  const { activeTab } = useAppContext();

  switch (activeTab) {
    case "dashboard":
      return <Dashboard />;
    case "fleet":
      return <FleetManagement />;
    case "drivers":
      return <Drivers />;
    case "trips":
      return <Trips />;
    case "maintenance":
      return <Maintenance />;
    case "fuel":
      return <Fuel />;
    case "reports":
      return <Reports />;
    case "compliance":
      return <Compliance />;
    case "notifications":
      return <Notifications />;
    case "users":
      return <Users />;
    case "settings":
      return <Settings />;
    case "support":
      return <Support />;
    case "jobcards":
      return <JobCardManagement />;
    case "parts":
      return <PartsInventory />;
    default:
      return <Dashboard />;
  }
}

const AppContent: React.FC = () => (
  <Layout>
    <ContentSwitcher />
  </Layout>
);

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
};

export default App;
