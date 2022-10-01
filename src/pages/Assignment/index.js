import "./style.css";

function Assignment({ user }) {
  return (
    <h1>
      Hello From Assignment, {user?.firstname} {user?.lastname}
    </h1>
  );
}

export default Assignment;
