export default (dict) => {
  return {
    search: [
      {
        title: '名称',
        key: 'dictName',
        type: 1
      },
      {
        title: '类型',
        key: 'dictType',
        type: 1
      }
    ],
    columns: [
      { title: '名称', dataIndex: 'dictName' },
      { title: '类型', dataIndex: 'dictType' },
      { title: '描述', dataIndex: 'remark' },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center'
      }
    ]
  }
}
