import Card from "react-bootstrap/Card";
import "./style.css";

function SubjectCard({ title }) {
  return (
    <Card className="shadow m-md-2 m-1 h-100">
      <Card.Img variant="top" src="https://picsum.photos/600" />
      <Card.Body className="p-2 ">
        <Card.Title
          className={`text-center text-primary ${
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
