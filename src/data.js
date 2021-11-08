let data = [
  {
    id: Date.now() + Math.random() * 2,
    title: "To do",
    cards: [
      {
        id: Date.now() + Math.random() * 3,
        title: "card 1",
        task: [],
        labels: [{ text: "FrontEnd", color: "blue" }],
        desc: "description `1",
        date: "29th Sept",
      },
      {
        id: Date.now() + Math.random() * 3,
        title: "card 2",
        task: [],
        labels: [{ text: "htmlCss", color: "yellow" }],
        desc: "description 2",
        date: "20th Oct",
      },
    ],
  },
];

export let colors = [
  "#a8193d",
  "#4fcc25",
  "#1ebffa",
  "#8da377",
  "#9975bd",
  "#cf61a1",
  "#240959",
];

export default data;
