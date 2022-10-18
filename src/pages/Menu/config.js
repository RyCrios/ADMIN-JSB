export default () => {
  return {
    columns: [
      { title: "标题", dataIndex: "title" },
      { title: "名称", dataIndex: "name" },
      { title: "路径", dataIndex: "path" },
      {
        title: "图标",
        dataIndex: "icon",
        width: 80,
        align: "center",
      },
      {
        title: "操作",
        dataIndex: "operation",
        align: "center",
      },
    ],
  };
};
