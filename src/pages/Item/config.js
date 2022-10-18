export default (dict) => {
  return {
    search: [
      {
        title: '名称',
        key: 'name',
        type: 1
      },
      {
        title: '编码',
        key: 'code',
        type: 1
      },
      {
        title: '是否收费',
        key: 'isCharge',
        type: 2
      },
      {
        title: '申报对象',
        key: 'workObject',
        type: 2
      },
      {
        title: '事项类型',
        key: 'itemType',
        type: 2
      },
      {
        title: '相关部门',
        key: 'departmentId',
        type: 2
      },
      {
        title: '办理方式',
        key: 'transactType',
        type: 2
      }
    ],
    columns: [
      { title: '名称', dataIndex: 'name' },
      { title: '编码', dataIndex: 'code' },
      {
        title: '相关部门',
        dataIndex: 'departmentId',
        align: 'center',
        customRender: ({ value }) => {
          let departmentId = dict.departmentId
          for (let i = 0; i <= departmentId.length; i++) {
            if (departmentId[i].value == value) return departmentId[i].label
          }
        }
      },
      {
        title: '申报对象',
        dataIndex: 'workObject',
        width: 80,
        align: 'center',
        customRender: ({ value, record }) => {}
      },
      {
        title: '事项类型',
        dataIndex: 'itemType',
        width: 80,
        align: 'center',
        customRender: ({ value, record }) => {}
      },
      {
        title: '是否收费',
        dataIndex: 'isCharge',
        width: 80,
        align: 'center',
        customRender: ({ value, record }) => {
          /*           let isCharge = dict.isCharge
          for (let i = 0; i <= isCharge.length; i++) {
            if (isCharge[i].value == value) return isCharge[i].label
          } */
        }
      },
      {
        title: '操作',
        dataIndex: 'operation',
        align: 'center'
      }
    ]
  }
}
