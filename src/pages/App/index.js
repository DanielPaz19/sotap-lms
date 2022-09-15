import Nav from "../../components/Nav";
import Header from "../../components/Header";

function App() {
  return (
    <>
      <Nav user_type={3} />
      <div className="main">
        <Header title={"Dashboard"} user_type={3} />
        <div className="content">Test Dashboard</div>
      </div>
    </>
  );
}

export default App;
