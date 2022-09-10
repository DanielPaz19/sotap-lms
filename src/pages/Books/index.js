import React from "react";
import Nav from "../../components/Nav";
import Header from "../../components/Header";

function Books() {
  return (
    <>
      <Nav />
      <div className="main">
        <Header title={"Books"} />
        <div className="content">Test Book Content</div>
      </div>
    </>
  );
}

export default Books;
