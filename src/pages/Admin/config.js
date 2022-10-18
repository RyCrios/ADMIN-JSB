export default () => {
  return {
    search: [
      {
        title: "名称",
        key: "name",
        type: 1,
      },
      {
        title: "名称",
        key: "name",
        type: 1,
      },
      {
        title: "名称",
        key: "name",
        type: 1,
      },
      {
        title: "名称",
        key: "name",
        type: 1,
      },
      {
        title: "状态",
        key: "status",
        type: 2,
      },
      {
        title: "状态",
        key: "status",
        type: 2,
      },
      {
        title: "状态",
        key: "status",
        type: 2,
      },
      {
        title: "时间",
        key: "timer",
        type: 3,
        format: "",
      },
      {
        title: "时间",
        key: "timer",
        type: 3,
        format: "",
      },
      {
        title: "时间",
        key: "timer",
        type: 3,
        format: "",
      },
    ],
    columns: [
      { title: "姓名", dataIndex: "name" },
      { title: "账号", dataIndex: "account" },
      { title: "角色", dataIndex: "roleId" },
      { title: "头像", dataIndex: "headPicture", width: 80, align: "center" },
      {
        title: "操作",
        dataIndex: "operation",
        align: "center",
      },
    ],
  };
};
