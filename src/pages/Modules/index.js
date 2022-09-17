import { useEffect } from "react";
import { useState } from "react";
import BreadCrumb from "../../components/Breadcrumb";
import { Accordion, ListGroup } from "react-bootstrap";
import { FiFileText } from "react-icons/fi";

function Modules() {
  const [subject, setSubject] = useState({});

  const parseSubjectId = () => {
    const arrPath = window.location.pathname
      .split("/")
      .filter((arr) => arr !== "");

    return Number(arrPath.at(-1));
  };

  useEffect(() => {
    const getSubjectById = async (id) => {
      try {
        const response = await fetch(`http://localhost:3500/subjects?id=${id}`);
        const data = await response.json();
        setSubject(await data[0]);
        console.log(data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    (async () => await getSubjectById(parseSubjectId()))();
  }, []);

  // Set Breadcrumbs Item and link
  const path = [
    { title: "Modules", link: "modules" },
    { title: subject?.title, link: `modules/${subject?.id}` },
  ];

  return (
    <>
      <BreadCrumb paths={path} />
      <div className="container px-md-5 px-0">
        <Accordion defaultActiveKey={["0", "1", "2", "3"]} alwaysOpen>
          <div className="row g-md-4 g-3">
            <div className="col-12  ">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Topics</Accordion.Header>
                <Accordion.Body className="px-2">
                  <ListGroup variant="flush">
                    <ListGroup.Item action variant="light">
                      <span className="me-2 fs-4">
                        <FiFileText />
                      </span>
                      Sample Topic 1
                    </ListGroup.Item>
                    <ListGroup.Item action variant="light">
                      <span className="me-2 fs-4">
                        <FiFileText />
                      </span>
                      Sample Topic 2
                    </ListGroup.Item>
                    <ListGroup.Item action variant="light">
                      <span className="me-2 fs-4">
                        <FiFileText />
                      </span>
                      Sample Topic 3
                    </ListGroup.Item>
                    <ListGroup.Item action variant="light">
                      <span className="me-2 fs-4">
                        <FiFileText />
                      </span>
                      Sample Topic 4
                    </ListGroup.Item>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div className="col-12 ">
              <Accordion.Item eventKey="1">
                <Accordion.Header>Assignments</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div className="col-12 ">
              <Accordion.Item eventKey="2">
                <Accordion.Header>Quizes</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </div>
            <div className="col-12 ">
              <Accordion.Item eventKey="3">
                <Accordion.Header>Exams</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </div>
          </div>
        </Accordion>
      </div>
    </>
  );
}

export default Modules;
