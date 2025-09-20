import { useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { Charts } from "@/components/Charts";
import { Reports } from "@/components/Reports";
import { Settings } from "@/components/Settings";
import { AuthLogin } from "@/components/AuthLogin";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setActiveTab("dashboard");
  };

  if (!isAuthenticated || !user) {
    return <AuthLogin onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "charts":
        return <Charts />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        user={user}
        onLogout={handleLogout}
      />
      {renderContent()}
    </div>
  );
};

export default Index;
