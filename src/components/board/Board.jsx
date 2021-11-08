import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";
import Card from "../card/Card";
import Dropdown from "../dropdown/Dropdown";
import Editable from "../editable/Editable";
import "./board.css";

function Board(props) {
  console.log(props.board, "data");
  const [showBoardDropdown, setShowBoardDropdown] = useState(false);
  return (
    <div className="board">
      <header className="board_top">
        <p className="board_top_title">
          {props.board?.title} <span>{props.board?.cards?.length} </span>
        </p>
        <div
          className="board_top_more"
          onClick={() => setShowBoardDropdown(true)}
        >
          <MoreHorizontal />

          {showBoardDropdown ? (
            <Dropdown onClose={() => setShowBoardDropdown(false)}>
              <div className="board_dropdown">
                <p onClick={() => props.removeBoard(props.board.id)}>
                  Delete Board
                </p>
              </div>
            </Dropdown>
          ) : (
            ""
          )}
        </div>
      </header>
      <main className="board_cards custom-scroll">
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            removeCard={props.removeCard}
            boardId={props.board?.id}
            handleDragEnter={props.handleDragEnter}
            handleDragEnd={props.handleDragEnd}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          placeholder="Add Card"
          text="Add card"
          onSubmit={(value) => props.addCard(value, props.board?.id)}
        />
      </main>
    </div>
  );
}

export default Board;
