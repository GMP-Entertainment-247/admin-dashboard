import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { appRoutes } from './routes/AppRoutes';
import "./index.css"

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {
            appRoutes.map(({ path, element, isProtected })=>(
              <Route 
                path={path} 
                element={
                  isProtected ?
                  <ProtectedRoute>{element}</ProtectedRoute>
                  :
                  element
                } 
              />
            ))
          }
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
