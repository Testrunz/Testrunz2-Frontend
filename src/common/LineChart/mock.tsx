export const lineScaleData = {
  x: {
    title: {
      display: false,
      text: "X-axis",
    },
  },
  y1: {
    title: {
      color: "#e22828",
      display: true,
      text: "y1",
    },
    type: "linear" as const,
    display: true,
    position: "left" as const,
  },
  y2: {
    title: {
      color: "#90239f",
      display: true,
      text: "y2",
    },
    type: "linear" as const,
    display: true,
    position: "right" as const,
    grid: {
      drawOnChartArea: false,
    },
  },
  y3: {
    title: {
      color: "#111fdf",
      display: true,
      text: "y3",
    },
    type: "linear" as const,
    display: true,
    position: "left" as const,
    grid: {
      drawOnChartArea: false,
    },
  },
  y4: {
    title: {
      color: "#38e907",
      display: true,
      text: "y4",
    },
    type: "linear" as const,
    display: true,
    position: "right" as const,
    grid: {
      drawOnChartArea: false,
    },
  },
};

export const staticData = [
  {
    label: "",
    data: [],
    borderColor: "#e22828",
    backgroundColor: "#e22828",
    yAxisID: `y1`,
  },
  {
    label: "",
    data: [],
    borderColor: "#90239f",
    backgroundColor: "#90239f",
    yAxisID: `y2`,
  },
  {
    label: "",
    data: [],
    borderColor: "#111fdf",
    backgroundColor: "#111fdf",
    yAxisID: `y3`,
  },
  {
    label: "",
    data: [],
    borderColor: "#38e907",
    backgroundColor: "#38e907",
    yAxisID: `y4`,
  },
];

export const staticDataReplace = [
  {
    label: "",
    data: [],
    borderColor: "#e22828",
    backgroundColor: "#000000",
    yAxisID: `y1`,
  },
  {
    label: "",
    data: [],
    borderColor: "#90239f",
    backgroundColor: "#90239f",
    yAxisID: `y2`,
  },
  {
    label: "",
    data: [],
    borderColor: "#111fdf",
    backgroundColor: "#111fdf",
    yAxisID: `y3`,
  },
  {
    label: "",
    data: [],
    borderColor: "#38e907",
    backgroundColor: "#38e907",
    yAxisID: `y4`,
  },
];

export const yAxiosOptions = [
  {
    yAxisID: "y1",
  },
  {
    yAxisID: "y2",
  },
  {
    yAxisID: "y3",
  },
  {
    yAxisID: "y4",
  },
];
