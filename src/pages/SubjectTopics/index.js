import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

function SubjectTopics() {
  const { subject_id } = useParams();

  return (
    <Container className="pt-3">
      <h4 className="text-primary">Topics : {subject_id}</h4>
      <hr />
    </Container>
  );
}

export default SubjectTopics;
