import "./style.css";
import Books from "../Books";
import Events from "../Events";
import Dashboard from "../Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Login";
import Students from "../Students";
import Teachers from "../Teachers";
import Subjects from "../Subjects";
import GradeLevels from "../GradeLevels";
import Home from "../Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="students" element={<Students />} />
          <Route path="teachers" element={<Teachers />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="grade_levels" element={<GradeLevels />} />
          <Route path="books" element={<Books />} />
          <Route path="events" element={<Events />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
