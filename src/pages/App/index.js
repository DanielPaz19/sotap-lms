import Nav from "../../components/Nav";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Nav user_type={1} />
      <div className="main">
        <Header title={"Dashboard"} user_type={3} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
