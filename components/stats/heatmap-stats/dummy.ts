const hours = ["09", "10", "11", "12", "13", "14", "15", "16", "17"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export const heatmapData = [
  {
    id: "Mon",
    data: hours.map((h) => ({ x: h, y: Math.floor(Math.random() * 8) })),
  },
  {
    id: "Tue",
    data: hours.map((h) => ({ x: h, y: Math.floor(Math.random() * 8) })),
  },
  {
    id: "Wed",
    data: hours.map((h) => ({ x: h, y: Math.floor(Math.random() * 8) })),
  },
  {
    id: "Thu",
    data: hours.map((h) => ({ x: h, y: Math.floor(Math.random() * 8) })),
  },
  {
    id: "Fri",
    data: hours.map((h) => ({ x: h, y: Math.floor(Math.random() * 8) })),
  },
];
