export default () => {
  return {
    columns: [
      { title: "名称", dataIndex: "name" },
      { title: "描述", dataIndex: "description" },
      {
        title: "操作",
        dataIndex: "operation",
        align: "center",
      },
    ],
  };
};
