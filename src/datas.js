let stocks = [
  {
    id: 1002,
    stockName: "انبار اول",
    goods: [
      { id: 1002, name: "item1", description: "des", goodNumber: 1212, stockId: 1002, goodTypeId: 1, goodType: null },
      { id: 1003, name: "item2", description: "des", goodNumber: 1414, stockId: 1002, goodTypeId: 1, goodType: null },
      { id: 1006, name: "item3", description: "des", goodNumber: 1515, stockId: 1002, goodTypeId: 1, goodType: null },
    ],
  },
  { id: 1003, stockName: "انبار دوم", goods: [] },
  { id: 1004, stockName: "انبار سوم", goods: [] },
];

let goods = [
  { id: 1002, name: "item1", description: "des", goodNumber: 1212, stockId: 1002, goodTypeId: 1, stock: null, goodType: null },
  { id: 1003, name: "item2", description: "des", goodNumber: 1414, stockId: 1002, goodTypeId: 1, stock: null, goodType: null },
  { id: 1006, name: "item3", description: "des", goodNumber: 1515, stockId: 1002, goodTypeId: 1, stock: null, goodType: null },
];
export { stocks };
