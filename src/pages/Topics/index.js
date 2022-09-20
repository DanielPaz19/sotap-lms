import BreadCrumb from "../../components/Breadcrumb";
import useGetSubjectById from "../../customHooks/useGetSubjectById";
import useGetTopicById from "../../customHooks/useGetTopicById";
import ReactPlayer from "react-player";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

function Topics() {
  const [doneWatching, setDoneWatching] = useState(false);

  const topic = useGetTopicById();
  const subject = useGetSubjectById(topic?.subject_id);

  // Set Breadcrumbs Item and link
  const path = [
    { title: "Modules", link: "/modules" },
    { title: subject?.title, link: `/modules/${topic?.subject_id}` },
    { title: topic?.title, link: `/modules/${topic?.id}` },
  ];
  return (
    <>
      <div className="container-fluid px-0">
        <BreadCrumb paths={path} className="mb-5" />
        <div className="container px-0">
          <h1 className="mb-3">{topic?.title}</h1>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=F7mKD2Un65I"
            controls={true}
            width={"100%"}
            onEnded={() => setDoneWatching(true)}
          />
          <div className="d-flex justify-content-around mb-4 mt-4">
            <Link to={`/modules/${topic?.subject_id}`}>
              <button className="btn btn-primary">
                <FaArrowLeft /> Back To Topics
              </button>
            </Link>
            <button
              className={`btn btn-success ${doneWatching ? "" : "disabled"}`}
            >
              Take Quiz Now <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Topics;
