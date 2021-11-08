import React, { useState } from "react";
import "./editable.css";

function Editable(props) {
  const [showEdit, setShowEdit] = useState(false);
  const [inputValue, setInputValue] = useState(props.default || "");
  // const [showError, setShowError] = useState(false);

  return (
    <div className="editable">
      {showEdit ? (
        <form
          className="editable_edit"
          onSubmit={(e) => {
            e.preventDefault();

            // e.target.value.length < 1
            //   ? setShowError(true)
            //   : setShowError(false);

            if (props.onSubmit) props.onSubmit(inputValue);
            setInputValue("");
            setShowEdit(false);
            // setShowError(false);
          }}
        >
          <input
            autoFocus
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={props.placeholder}
          />
          {/* {showError ? (
            <div className="error">
              <p>Field cannot be empty</p>
            </div>
          ) : (
            ""
          )} */}
          <div className="editabe_edit_footer">
            <button type="submit" className="editable_edit_footer_add_btn">
              {props.buttonText || "Add"}
            </button>
            <button
              className="editable_cancel"
              onClick={() => setShowEdit(false)}
            >
              X
            </button>
          </div>
        </form>
      ) : (
        <p className="add_card" onClick={() => setShowEdit(true)}>
          {props.text || "Add Card +"}
        </p>
      )}
    </div>
  );
}

export default Editable;
