import BreadCrumb from "../../components/Breadcrumb";
import useGetSubjectById from "../../customHooks/useGetSubjectById";
import useGetTopicById from "../../customHooks/useGetTopicById";
import ReactPlayer from "react-player";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";

function Topics({ user }) {
  const [doneWatching, setDoneWatching] = useState(false);
  const [topicStatus, setTopicStatus] = useState({});

  const topic = useGetTopicById();
  const subject = useGetSubjectById(topic?.subject_id);

  useEffect(() => {
    const getStudentTopicData = async (topic_id, student_id) => {
      const response = await fetch(
        `http://localhost:3500/student_topics?topic_id=${topic_id}&student_id=${student_id}`
      );
      const data = await response.json();

      if (!data.length) return;

      return setTopicStatus(data[0]);
    };

    (async () => getStudentTopicData(topic?.id, user?.id))();
  }, [topic?.id, user?.id]);

  const updateTopicStatus = async (status, student_topic_id) => {
    const response = await fetch(
      `http://localhost:3500/student_topics/${student_topic_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    const data = await response.json();

    setTopicStatus(data);
  };

  const addStudentTopic = async (topic_data) => {
    const response = await fetch(`http://localhost:3500/student_topics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topic_data),
    });

    const data = await response.json();

    setTopicStatus(data);
  };

  const handleReady = () => {
    console.log("video ready");

    // If Status is [], update status to viewed
    if (!Object.entries(topicStatus).length) {
      addStudentTopic({
        topic_id: topic?.id,
        student_id: user?.id,
        status: "viewed",
      });
    }
  };

  const handleStart = () => {
    // if Status is viewed or [], update status to played
    console.log("video started");
    console.log(topicStatus);

    if (topicStatus.status === "viewed")
      updateTopicStatus("played", topicStatus.id);
  };

  const handleEnded = () => {
    // Update status to ended
    if (topicStatus.status === "played")
      updateTopicStatus("done", topicStatus.id);
    console.log("video ended");
  };

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
