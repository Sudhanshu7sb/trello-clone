import React, { useEffect, useState } from "react";
import { List, Type, Calendar, Tag, CheckSquare, Trash } from "react-feather";
import Modal from "../cardInfoModal/Modal";
import Editable from "../editable/Editable";
import Label from "../labels/Label";
import "./cardInfo.css";
import { colors } from "../../data";

function CardInfo(props) {
  const [activeColor, setActiveColor] = useState("");
  //   const { title, labels, tasks, desc, date } = props.card;

  const [values, setValues] = useState({ ...props.card });

  useEffect(() => {
    props.updateCard(props.card.id, props.boardId, values);
  }, [values]);

  const calculatePercent = () => {
    if (values.tasks?.length === 0) return "0";

    const completed = values.tasks?.filter((item) => item.completed)?.length;

    return (completed / values.tasks?.length) * 100 + "";
  };

  const addLabel = (value, color) => {
    console.log(value, "labels");
    const index = values.labels?.findIndex((item) => item.text === value);
    if (index > -1) return;

    const label = {
      text: value,
      color,
    };

    setValues({ ...values, labels: [...values.labels, label] });
    setActiveColor("");
  };

  const removeLabel = (text) => {
    const tempLabels = values.labels?.filter((item) => item.text !== text);

    setValues({ ...values, labels: tempLabels });
  };

  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random() * 3,
      text: value,
      completed: false,
    };

    const tempTask = [...values.tasks, task];

    setValues({ ...values, tasks: tempTask });
  };

  const removeTask = (id) => {
    const tempTasks = values.tasks?.filter((item) => item.id !== id);

    setValues({ ...values, tasks: tempTasks });
  };

  const updateTask = (id, completed) => {
    const index = values.tasks?.findIndex((item) => item.id === id);
    if (index < 0) return;

    const tempTasks = [...values.tasks];
    tempTasks[index].completed = completed;

    setValues({ ...values, tasks: tempTasks });
  };

  return (
    <div onClick={() => props.onClose()}>
      <Modal>
        <div className="cardInfo">
          <div className="cardInfo_box">
            <div className="cardInfo_box_title">
              <Type />
              Title no 1
            </div>
            <div className="cardInfo_box_body">
              <Editable
                text={values.title}
                default={values.title}
                placeholder="Enter Title"
                buttonText="Add Title"
                onSubmit={(value) => setValues({ ...values, title: value })}
              />
            </div>
          </div>

          <div className="cardInfo_box">
            <div className="cardInfo_box_title">
              <List />
              Description
            </div>
            <div className="cardInfo_box_body">
              <Editable
                text={values.desc}
                default={values.desc}
                placeholder="Enter decription"
                buttonText="Add description"
                onSubmit={(value) => setValues({ ...values, desc: value })}
              />
            </div>
          </div>

          <div className="cardInfo_box">
            <div className="cardInfo_box_title">
              <Calendar />
              Date
            </div>
            <div className="cardInfo_box_body">
              <input
                type="date"
                className="select_date"
                defaultValue={values.date ? values.date.substr(0, 10) : ""}
                onChange={(e) => setValues({ ...values, date: e.target.value })}
              />
            </div>
          </div>

          <div className="cardInfo_box">
            <div className="cardInfo_box_title">
              <Tag />
              Labels
            </div>
            <div className="cardInfo_box_labels">
              {values.labels?.map((item, index) => (
                <Label
                  close
                  onClose={() => removeLabel(item.text)}
                  key={item.text + index}
                  text={item.text}
                  color={item.color}
                  className="card_label"
                />
              ))}
            </div>
            <div className="cardInfo_box_colors">
              {colors.map((item, index) => (
                <li
                  key={index}
                  style={{ backgroundColor: item }}
                  className={item === activeColor ? "active" : ""}
                  onClick={() => {
                    setActiveColor(item);
                  }}
                ></li>
              ))}
            </div>
            <div className="cardInfo_box_body">
              <Editable
                text="add label"
                placeholder="Enter decription"
                buttonText="Add"
                onSubmit={(value) => addLabel(value, activeColor)}
              />
            </div>
          </div>

          <div className="cardInfo_box">
            <div className="cardInfo_box_title">
              <CheckSquare />
              Tasks
            </div>
            <div className="cardInfo_box_progress_bar">
              <div
                className="cardInfo_box_progress"
                style={{ width: calculatePercent() + "%" }}
              />
            </div>

            <div className="cardInfo_box_list">
              {values.tasks?.map((item) => (
                <div key={item.id} className="cardInfo_box_tasks">
                  <input
                    type="checkbox"
                    defaultValue={item.completed}
                    onChange={(e) => updateTask(item.id, e.target.checked)}
                  />
                  <p>{item.text}</p>
                  <Trash onClick={() => removeTask(item.id)} />
                </div>
              ))}
            </div>

            <div className="cardInfo_box_body">
              <Editable
                placeholder="Enter New Task"
                text="Add new task"
                buttonText="Add Task"
                onSubmit={(value) => addTask(value)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CardInfo;
