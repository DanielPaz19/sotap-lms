import BreadCrumb from "../../components/Breadcrumb";
import useGetSubjectById from "../../customHooks/useGetSubjectById";
import useGetTopicById from "../../customHooks/useGetTopicById";
import ReactPlayer from "react-player";

function Topics() {
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
      <BreadCrumb paths={path} />
      <h1>{topic?.title}</h1>
      <div className="container">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=cWExc9Y6sLA"
          controls={true}
          width={"100%"}
        />
      </div>
    </>
  );
}

export default Topics;
