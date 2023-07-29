import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import PrivateRoute from "./components/PrivateRoute";
import AdminControl from "./pages/AdminControl";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/create" element={<PrivateRoute />}>
            <Route path="/create" element={<AdminControl />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
