import BreadCrumb from "../../components/Breadcrumb";
import ReactPlayer from "react-player";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../config";

function Topics({ user }) {
  const [topicStatus] = useState({});
  const [topic, setTopic] = useState();
  const [subject, setSubject] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { id: topic_id } = useParams();

  useEffect(() => {
    getTopic(topic_id);
    topic?.subject_id && getSubject(topic?.subject_id);
  }, [topic_id, topic?.subject_id]);

  const getTopic = async (id) => {
    setIsLoading(true);
    const res = await fetch(API_URL + `/topics/${id}`, {
      credentials: "include",
    });

    const { data } = await res.json();

    setTopic(data);
    setIsLoading(false);
  };

  const getSubject = async (id) => {
    setIsLoading(true);
    const res = await fetch(API_URL + `/subjects/${id}`, {
      credentials: "include",
    });

    const { data } = await res.json();
    setSubject(data);
    setIsLoading(false);
  };

  const handleReady = () => {};

  const handleStart = () => {};

  const handleEnded = () => {};

  // Set Breadcrumbs Item and link
  const path = [
    { title: "Modules", link: "/modules" },
    {
      title: isLoading
        ? "Loading..."
        : `${subject?.subject_code}:${subject?.subject_name}`,
      link: `/modules/${topic?.subject_id}`,
    },
    {
      title: isLoading ? "Loading..." : topic?.title,
      link: `/modules/${topic?.id}`,
    },
  ];
  return (
    <>
      <div className="container-fluid px-0">
        <BreadCrumb paths={path} className="mb-5" />
        <div className="container px-0">
          <h1 className="mb-3">{topic?.title}</h1>
          <p>{topic?.body}</p>
          <ReactPlayer
            url={topic?.url}
            controls={true}
            width={"100%"}
            onEnded={handleEnded}
            onReady={handleReady}
            onStart={handleStart}
          />
          <div className="d-flex justify-content-around mb-4 mt-4">
            <Link to={`/modules/${topic?.subject_id}`}>
              <button className="btn btn-primary">
                <FaArrowLeft /> Back To Topics
              </button>
            </Link>
            <button
              className={`btn btn-success ${
                topicStatus.status === "done" ? "" : "disabled"
              }`}
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
