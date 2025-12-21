import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ProfileProvider } from "./context/ProfileContext";
import { appRoutes } from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

const queryClient = new QueryClient();

/** 🔁 Recursive route renderer */
const renderChildRoutes = (routes: any[], isProtected: boolean) => {
  return routes.map(({ index, childPath, childElement, children }, i) => {
    const element = isProtected ? (
      <ProtectedRoute>{childElement}</ProtectedRoute>
    ) : (
      childElement
    );

    return (
      <Route
        key={childPath ?? i}
        index={index}
        path={index ? undefined : childPath}
        element={element}
      >
        {children && renderChildRoutes(children, isProtected)}
      </Route>
    );
  });
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProfileProvider>
          <ToastContainer theme="colored" />
          <Router>
            <Routes>
              {appRoutes.map(({ path, element, isProtected, children }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    isProtected ? (
                      <ProtectedRoute>{element}</ProtectedRoute>
                    ) : (
                      element
                    )
                  }
                >
                  {children && renderChildRoutes(children, isProtected)}
                </Route>
              ))}
            </Routes>
          </Router>
        </ProfileProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
