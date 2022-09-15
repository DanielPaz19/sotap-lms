import React from "react";
import Nav from "../../components/Nav";
import Header from "../../components/Header";

function Books() {
  return (
    <>
      <Nav user_type={3} />
      <div className="main">
        <Header title={"Books"} user_type={3} />
        <div className="content">Test Book</div>
      </div>
    </>
  );
}

export default Books;
