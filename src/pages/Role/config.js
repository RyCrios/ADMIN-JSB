export default (dict) => {
  return {
    search: [
      {
        title: '名称',
        key: 'name',
        type: 1
      },
      {
        title: '状态',
        key: 'status',
        type: 1
      }
    ],
    columns: [
      { title: '名称', dataIndex: 'name' },
      { title: '状态', dataIndex: 'status' },
      { title: '描述', dataIndex: 'description' },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center'
      }
    ]
  }
}
