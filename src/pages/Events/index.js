import React from "react";
import Nav from "../../components/Nav";
import Header from "../../components/Header";

function Events() {
  return (
    <>
      <Nav />
      <div className="main">
        <Header title={"Events"} />
        <div className="content">Test Events</div>
      </div>
    </>
  );
}

export default Events;
