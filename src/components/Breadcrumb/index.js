import "./style.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function BreadCrumb() {
  return (
    <Breadcrumb as={"div"} className="position-fixed pt-3">
      <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      <Breadcrumb.Item>Modules</Breadcrumb.Item>
      <Breadcrumb.Item active>Sample Title</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadCrumb;
