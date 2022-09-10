import React from "react";
import Nav from "../../components/Nav";
import Main from "../../components/Main";
import Header from "../../components/Header";

function Teachers() {
  return (
    <>
      <Nav />
      <div className="main">
        <Header title={"Teachers"} />
        <div className="content">Test Teachers</div>
      </div>
    </>
  );
}

export default Teachers;
