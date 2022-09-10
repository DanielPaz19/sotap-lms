import React from "react";
import Nav from "../../components/Nav";
import Header from "../../components/Header";

function Students() {
  return (
    <>
      <Nav />
      <div className="main">
        <Header title={"Students"} />
        <div className="content">Test Students</div>
      </div>
    </>
  );
}

export default Students;
