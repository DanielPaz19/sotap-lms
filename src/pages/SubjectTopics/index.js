import { useState } from "react";
import { useEffect } from "react";
import { Button, Container, ListGroup, Stack } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { API_URL } from "../../config";
import useTeacher from "../../context/TeacherContextProvider";
import useUser from "../../context/UserContextProvider";

function SubjectTopics() {
  const { subject_id } = useParams();
  const [topics, setTopics] = useState([]);

  const { state: userState } = useUser();
  const { state: teacherState } = useTeacher();

  const [subject] = teacherState?.subjects.filter(
    (subject) => Number(subject.id) === Number(subject_id)
  );

  useEffect(() => {
    const getSubjectTopics = async () => {
      const res = await fetch(
        API_URL + `/teacher/${userState?.id}/topics?subject=${subject_id}`,
        { credentials: "include" }
      );
      const { data } = await res.json();
      console.log(data);
      setTopics(data);
    };

    getSubjectTopics();
  }, [subject_id, userState?.id]);

  return (
    <Container className="pt-3">
      <h4 className="text-primary">
        {subject?.subject_code} : {subject?.subject_name}
      </h4>
      <hr />
      <Button className="mb-3">Add Topic</Button>
      <ListGroup variant="flush">
        {topics?.map((topic) => (
          <ListGroup.Item action key={topic.id}>
            <Stack direction="horizontal" gap={3}>
              <span className="font-monospace">
                {String(topic.id).padStart(5, 0)}
              </span>
              <span className="vr"></span>
              <span className="text-primary fw-light">{topic.title}</span>
            </Stack>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default SubjectTopics;
