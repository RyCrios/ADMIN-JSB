import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')

class Utils {
  //  时间函数
  dayjs = dayjs
  /**
   * 通过url地址下载图片
   * @param {string} url
   * @param {function} callback
   * @param {string} ext
   */
  getUrlBase64(url, callback, ext = 'png') {
    // 创建canvas DOM元素
    let canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.crossOrigin = 'Anonymous' // 支持跨域
    img.src = url
    img.onload = () => {
      // 指定画板的高度,自定义
      canvas.height = 300
      // 指定画板的宽度，自定义
      canvas.width = 300
      // 参数可自定义
      ctx.drawImage(img, 0, 0)
      // 传递的自定义的参数
      const dataURL = canvas.toDataURL('image/' + ext)
      // 回掉函数获取Base64编码
      callback.call(this, dataURL)
      canvas = null
    }
  }
  /**
   * 重组路由表信息格式
   * @param {Array} list
   * @param {string} breadcrumb
   */
  setRouterInfo(list, breadcrumb = '') {
    return list.map((item) => {
      let key = breadcrumb + `${item.meta.menu.title}`
      return {
        children: item.children ? format(item.children, key + '-') : [],
        component: item.component,
        meta: { ...item.meta.menu, breadcrumb: key },
        name: item.name,
        path: item.path
      }
    })
  }
  /**
   * 返回时间状态
   */
  getTimeState() {
    // 获取当前时间
    let timeNow = new Date()
    // 获取当前小时
    let hours = timeNow.getHours()
    // 设置默认文字
    let state = ``
    // 判断当前时间段
    if (hours >= 0 && hours <= 10) {
      state = `早上好,`
    } else if (hours > 10 && hours <= 14) {
      state = `中午好,`
    } else if (hours > 14 && hours <= 18) {
      state = `下午好,`
    } else if (hours > 18 && hours <= 24) {
      state = `晚上好,`
    }
    return state
  }
  //  校验数据类型
  typeOf(data) {
    return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
  }

  /**
   * 递归对象中包含的属性
   * @param {object} objResult  接口返回数据结果
   * @param {object} objOrigin 需要赋值返回的原数据
   */
  objectData(objResult, objOrigin) {
    //  使用第三方数据接收,返回
    let data = {}
    Object.keys(objOrigin).forEach((item) => {
      if (this.typeOf(objOrigin[item]) == 'object') {
        data[item] = this.objectData(objResult[item], objOrigin[item])
      } else {
        data[item] = objResult[item]
      }
    })
    return data
  }

  /**
   * 格式化字典组成配置
   * @param {Array} arrMap  接口返回字典数据
   * @param {object} config 字典字段名重置的配置项
   */
  editDictConfig(
    arrMap,
    //  初始化配置结构
    config = { label: 'label', value: 'value', id: 'id' }
  ) {
    const { label, value, id } = config
    return arrMap.map((item) => {
      return {
        label: item[label],
        value: item[value],
        id: item[id]
      }
    })
  }
}

export default new Utils()
