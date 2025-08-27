import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { appRoutes } from './routes/AppRoutes';
import "./index.css"
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <AuthProvider>
      <ToastContainer theme="colored" />
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
