import React from "react";
import { X } from "react-feather";
import "./label.css";

function label(props) {
  return (
    <div className="label" style={{ backgroundColor: props.color }}>
      {props.text}
      {props.close && (
        <X onClick={() => (props.close ? props.onClose() : "")} />
      )}
    </div>
  );
}

export default label;
