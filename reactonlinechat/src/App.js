import Auth from "./Page/Auth/Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Page/Home/Home";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
