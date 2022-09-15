import Nav from "../../components/Nav";
import Header from "../../components/Header";

function Dashboard({ userType }) {
  return (
    <>
      <Nav userType={userType} />
      <div className="main">
        <Header title={"Dashboard"} />
        <div className="content">Test Dashboard</div>
      </div>
    </>
  );
}

export default Dashboard;
