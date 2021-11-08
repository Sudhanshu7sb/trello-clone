import React, { useState } from "react";

import { CheckSquare, Clock, Edit, MoreHorizontal } from "react-feather";
import CardInfo from "../cardInfo/CardInfo";
import Dropdown from "../dropdown/Dropdown";
import Label from "../labels/Label";
import "./card.css";

function Card(props) {
  const [showCardDropdown, setShowCardDropdown] = useState(false);
  const [showCardInfoModal, setShowCardInfoModal] = useState(false);

  return (
    <>
      {showCardInfoModal && (
        <CardInfo
          card={props.card}
          onClose={() => setShowCardInfoModal(false)}
          updateCard={props.updateCard}
          boardId={props.boardId}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)}
        onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
      >
        <nav className="card_top">
          <div className="card_label">
            {props.card.labels?.map((item, index) => (
              <Label text={item.text} color={item.color} key={index} />
            ))}
          </div>
          <div
            className="card_top_more"
            onClick={() => setShowCardDropdown(true)}
          >
            <MoreHorizontal />

            {showCardDropdown ? (
              <Dropdown onClose={() => setShowCardDropdown(false)}>
                <div className="card_dropdown">
                  <p
                    onClick={() =>
                      props.removeCard(props?.card?.id, props.boardId)
                    }
                  >
                    Delete Card
                  </p>
                </div>
              </Dropdown>
            ) : (
              ""
            )}
          </div>
        </nav>
        <h3 className="card_title">
          {props.card?.title}{" "}
          <span>
            <Edit onClick={() => setShowCardInfoModal(true)} />
          </span>
        </h3>
        <footer className="card_footer">
          {props.card?.date ? (
            <p>
              <Clock />
              {props.card?.date}
            </p>
          ) : (
            ""
          )}
          {props.card?.tasks?.length > 0 && (
            <p>
              <CheckSquare />
              {props.card?.tasks?.filter((item) => item.completed).length +
                "/" +
                props.card?.tasks?.length}
            </p>
          )}
        </footer>
      </div>
    </>
  );
}

export default Card;
