import React from "react";
import Nav from "../../components/Nav";
import Header from "../../components/Header";

function Events() {
  return (
    <>
      <Nav user_type={3} />
      <div className="main">
        <Header title={"Events"} user_type={3} />
        <div className="content">Test Events</div>
      </div>
    </>
  );
}

export default Events;
