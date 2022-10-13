import { useParams } from "react-router-dom";

function GradeLevelDetails() {
  const { id } = useParams();

  console.log(id);

  return <h4>{id}</h4>;
}

export default GradeLevelDetails;
