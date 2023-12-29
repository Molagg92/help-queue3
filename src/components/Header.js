import React from "react";
import huurguur from "./../img/ticket.jpg";

function Header(){
  return (
    <React.Fragment>
    <h1>Help Queue (This is a Header!) </h1>
    <img src={huurguur} alt="a golden ticket" />
   </React.Fragment>
    );
}

export default Header;