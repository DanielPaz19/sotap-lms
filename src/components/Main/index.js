import "./style.css";
import Header from "../Header";
import Content from "../Content";

function Main({ title }) {
  return (
    <>
      <Header title={title} />
      <Content />
    </>
  );
}

Main.defaultProps = {
  title: "Dashboard",
};

export default Main;
