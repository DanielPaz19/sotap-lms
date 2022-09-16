import "./style.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom";

function BreadCrumb({ paths }) {
  console.log(paths);
  const renderPath = paths.map((path, index, row) =>
    index + 1 === row.length ? (
      <Breadcrumb.Item key={index} active>
        {path.title}
      </Breadcrumb.Item>
    ) : (
      <Breadcrumb.Item key={index}>
        <Link to={"/dashboard"}>{path.title}</Link>
      </Breadcrumb.Item>
    )
  );

  return (
    <Breadcrumb as={"div"} className="position-static pt-3">
      {renderPath}
    </Breadcrumb>
  );
}

export default BreadCrumb;
