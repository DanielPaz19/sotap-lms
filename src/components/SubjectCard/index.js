import Card from "react-bootstrap/Card";
import "./style.css";

function SubjectCard({ title, img_src }) {
  return (
    <Card className="shadow m-md-2 m-1 h-100">
      <Card.Img variant="top" src={img_src} />
      <Card.Body className="p-1 ">
        <Card.Title
          className={` my-1 text-center text-primary ${
            title.length > 10 ? "fs-6 " : ""
          }`}
        >
          {title}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default SubjectCard;
