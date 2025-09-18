import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { appRoutes } from './routes/AppRoutes';
import "./index.css"
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ToastContainer theme="colored" />
        <Router>
          <Routes>
            {
              appRoutes.map(({ path, element, isProtected, children })=>(
                <Route 
                  key={path}
                  path={path} 
                  element={
                    isProtected ?
                    <ProtectedRoute>{element}</ProtectedRoute>
                    :
                    element
                  } 
                >
                  {children &&
                    children.map(({ childPath, childElement, index }) => 
                      index ? (
                        <Route
                          key="index"
                          index
                          element={isProtected ? <ProtectedRoute>{childElement}</ProtectedRoute> : childElement}
                        />
                      ) : (
                        <Route
                          key={path}
                          path={childPath}
                          element={isProtected ? <ProtectedRoute>{childElement}</ProtectedRoute> : childElement}
                        />
                      )
                    )}
                </Route>
              ))
            }
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
