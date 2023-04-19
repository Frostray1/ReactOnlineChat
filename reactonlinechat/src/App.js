import Auth from "./Page/Auth/Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Page/Home/Home";
import Register from "./Page/Register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Setting from "./Page/Settings/Setting";
import Profile from "./Page/Profile/Profile";

function App() {
  const { currentUser } = useContext(AuthContext);

  // console.log(currentUser);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/auth" />;
    }
    return children;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Setting />
              </ProtectedRoute>
            }
          />
           <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
     
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
