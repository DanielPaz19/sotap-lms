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
import Modules from "../Modules";
import ScrollToTop from "../../customHooks/scrollToTop";
import Topics from "../Topics";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="modules" element={<Dashboard />} />
            <Route path="modules/:id" element={<Modules />} />
            <Route path="modules/topic/:id" element={<Topics />} />
            <Route path="students" element={<Students />} />
            <Route path="teachers" element={<Teachers />} />
            <Route path="subjects" element={<Subjects />} />
            <Route path="grade_levels" element={<GradeLevels />} />
            <Route path="books" element={<Books />} />
            <Route path="events" element={<Events />} />
          </Route>
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
