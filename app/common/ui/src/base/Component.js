import React, { Component as BaseComponent } from 'react'
import classnames from 'classnames/bind'
import Math from 'utils/Math-extend'

const CLASS_CACHE_NAME = Math.uuid()

export default class Component extends BaseComponent {
  constructor() {
    super()

    this[CLASS_CACHE_NAME] = {} // 保存组件样式名称
    this.hasMounted = false
  }

  /**
   * 生命周期函数，组件将要挂载，开发使用willMount代替
   */
  componentWillMount() {
    return this.willMount.apply(this, arguments)
  }

  /**
   * 生命周期函数，组件将要挂载
   */
  willMount() {
  }

  /**
   * 生命周期函数，组件已经挂载，开发使用didMount代替
   */
  componentDidMount() {
    this.hasMounted = true
    return this.didMount.apply(this, arguments)
  }

  /**
   * 生命周期函数，组件已经挂载
   */
  didMount() {
  }

  /**
   * 生命周期函数，组件将要接受新属性，开发使用willReceiveProps代替
   */
  componentWillReceiveProps() {
    return this.willReceiveProps.apply(this, arguments)
  }

  /**
   * 生命周期函数，组件将要接受新属性
   */
  willReceiveProps() {
  }

  /**
   * 生命周期函数，组件是否需要更新，开发使用shouldUpdate代替
   */
  shouldComponentUpdate() {
    return this.shouldUpdate.apply(this, arguments)
  }

  /**
   * 生命周期函数，组件是否需要更新
   */
  shouldUpdate() {
    return true
  }

  /**
   * 生命周期函数，组件将要更新，开发使用willUpdate代替
   */
  componentWillUpdate() {
    return this.willUpdate.apply(this, arguments)
  }

  /**
   * 生命周期函数，组件将要更新
   */
  willUpdate() {
  }

  /**
   * 生命周期函数，组件已经更新，开发使用didUpdate代替
   */
  componentDidUpdate() {
    return this.didUpdate.apply(this, arguments)
  }

  /**
   * 生命周期函数，组件已经更新
   */
  didUpdate() {
  }

  /**
   * 生命周期函数，组件将要卸载，开发使用willUnmount代替
   */
  componentWillUnmount() {
    this.hasMounted = false
    return this.willUnmount.apply(this, arguments)
  }

  /**
   * 生命周期函数，组件将要卸载
   */
  willUnmount() {
  }

  /**
   * @description 以相同的样式名重写样式，并且缓存减少每次render的开销
   *
   * @param {Object} styles
   * @param {Object} 需要重写styles
   * @param {Object} 判断classname的条件（动态classname）
   * @returns {Function} 获取重写后的样式方法
   */
  componentGetClassNames(styles = {}, reStyles, condition) {
    let cx = classnames.bind(styles)
    let recx = classnames.bind(reStyles)
    let formatCls = (name) => {
      let v = this[CLASS_CACHE_NAME][name]
      let reCls = reStyles && reStyles[name] ? { [recx(name)]: !!reStyles[name] } : {}

      if (condition && condition[name]) {
        let reCondition = {}

        Object.keys(condition[name]).forEach(key => {
          if (reStyles && reStyles[key]) {
            reCondition[reStyles[key]] = condition[name][key]
          }

          reCondition[key] = condition[name][key]
        })

        v = cx({ ...reCondition })
      } else if (!v) {
        v = this[CLASS_CACHE_NAME][name] = cx({
          [name]: true,
          ...reCls
        })
      }

      return v
    }

    return (name) => {
      if (!name) return '';

      let reg = /\s{1,}/g
      let cls = ''

      if (!reg.test(name)) {
        cls = formatCls(name)
      } else {
        let names = name.replace(reg, ',').split(',')

        names.forEach((v) => {
          let str = formatCls(v)

          if (str) {
            cls += `${formatCls(v)} `
          }
        })
      }

      return cls
    }
  }

  /**
   * 渲染函数
   */
  render() {
    return this.rendering.apply(this, arguments)
  }

  /**
   * 渲染函数替代
   */
  rendering() {
    return null
  }
}
