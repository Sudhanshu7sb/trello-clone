import React, { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/board/Board";
import Editable from "./components/editable/Editable";

function App() {
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("trello_boards")) || []
  );

  const [target, setTarget] = useState({
    cardid: "",
    boardid: "",
  });

  const addBoard = (title) => {
    setBoards([
      ...boards,
      {
        id: Date.now() + Math.random() * 3,
        title,
        cards: [],
      },
    ]);
  };

  const removeBoard = (boardId) => {
    const tempBoard = boards.filter((item) => item.id !== boardId);
    setBoards(tempBoard);
  };

  const addCard = (title, boardId) => {
    const card = {
      id: Date.now() + Math.random() * 3,
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: "",
    };

    const index = boards.findIndex((item) => item.id === boardId);
    if (index < 0) return;

    const tempBoard = [...boards];
    tempBoard[index].cards.push(card);
    setBoards(tempBoard);
  };

  const removeCard = (cardId, boardId) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const cardIndex = boards[boardIndex].cards.findIndex(
      (item) => item.id === cardId
    );
    if (cardIndex < 0) return;

    const tempBoard = [...boards];
    tempBoard[boardIndex].cards.splice(cardIndex, 1);
    setBoards(tempBoard);
  };

  const handleDragEnter = (cid, bid) => {
    setTarget({
      cid,
      bid,
    });
  };

  const handleDragEnd = (cid, bid) => {
    let source_cardIndex,
      source_boardIndex,
      target_cardIndex,
      target_boardIndex;

    source_boardIndex = boards.findIndex((item) => item.id === bid);
    if (source_boardIndex < 0) return;

    source_cardIndex = boards[source_boardIndex].cards?.findIndex(
      (item) => item.id === cid
    );
    if (source_cardIndex < 0) return;

    target_boardIndex = boards.findIndex((item) => item.id === target.bid);
    if (target_boardIndex < 0) return;

    target_cardIndex = boards[target_boardIndex].cards?.findIndex(
      (item) => item.id === target.cid
    );
    if (target_cardIndex < 0) return;

    const tempBoards = [...boards];
    const tempCards = tempBoards[source_boardIndex].cards[source_cardIndex];

    tempBoards[source_boardIndex].cards.splice(source_cardIndex, 1);
    tempBoards[target_boardIndex].cards.splice(target_cardIndex, 0, tempCards);

    setBoards(tempBoards);
  };

  const updateCard = (cardId, boardId, card) => {
    const boardIndex = boards.findIndex((item) => item.id === boardId);
    if (boardIndex < 0) return;

    const cardIndex = boards[boardIndex].cards.findIndex(
      (item) => item.id === cardId
    );
    if (cardIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[boardIndex].cards[cardIndex] = card;
    setBoards(tempBoards);
  };

  useEffect(() => {
    localStorage.setItem("trello_boards", JSON.stringify(boards));
  }, [boards]);

  return (
    <div className="app">
      <nav className="app_navbar">
        <h1>Trello</h1>
      </nav>
      <div
        className="app_body"
        style={{ backgroundImage: "url(/autumn-leaf.jpg)" }}
      >
        <main className="app-boards">
          {boards &&
            boards.map((item) => (
              <Board
                key={item.id}
                board={item}
                removeBoard={removeBoard}
                addCard={addCard}
                removeCard={removeCard}
                handleDragEnter={handleDragEnter}
                handleDragEnd={handleDragEnd}
                updateCard={updateCard}
              />
            ))}
          <div className="app-boards-board">
            <Editable
              text="Add Board"
              placeholder="Add Board Name"
              onSubmit={(value) => addBoard(value)}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
