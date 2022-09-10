import React from "react";
import Nav from "../../components/Nav";
import Header from "../../components/Header";

function Subjects() {
  return (
    <>
      <Nav />
      <div className="main">
        <Header title={"Subjects"} />
        <div className="content">Test Subjects</div>
      </div>
    </>
  );
}

export default Subjects;
