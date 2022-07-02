/**
 * Validator.js
 * ex:
 * (app.js引入)
 * const ALL = require('./core/index')
 * App({
 *    onLaunch: function () {},
 *    $tools: ALL.TOOLS
 * })
 *
 * (页面使用)
 * const app = getApp();
 * let validator = new app.$tools.Validator();
 * // 常规使用
 * validator.check(this.phone, [
 *   { strategy: "isEmpty", errMsg: "手机号不能为空" },
 *   { strategy: "isPhone", errMsg: "手机号码格式不正确，请重新输入" }
 * ]);
 * // 使用自定义判断
 * validator.check(this.number, [
 *   { strategy: "isCustomize", errMsg: `数量不能低于${customize}`, judge: (this.number >= customize) }
 * ]);
 * let errMsg = validator.checkResult();
 * if (errMsg) {
 *   // show message tips
 *   return;
 * }
 * ...
 */
class Validator {
    validateResult = [] //所有规则校验的结果塞到这个数组中
  
    strategys = { // 所有的规则定义在这个对象中,如有新的校验规则,在这里面添加,若规则有变动,在这里修改
      isEmpty: function (value, errMsg) { // 空值校验
        if (!String(value) || value === null || value === undefined) {
          return errMsg
        }
      },
      isPhone: function (value, errMsg) { // 手机号码校验
        if (!/^1[3456789]\d{9}$/.test(value)) {
          return errMsg
        }
      },
      isName: function (value, errMsg) { // 名字
        if (!/^[\u4E00-\u9FA5A-Za-z]{1,50}$/.test(value)) {
          return errMsg;
        }
      },
      isCustomize: function (value, errMsg, judge) { // 自定义判断judge传入true(通过验证) & false(提示信息)
        if (!judge) {
          return errMsg
        }
      },
    }
  
    check(value, rules) { // value:要校验的值,rules:该值有哪些校验规则,比如dealerName字段,既不能是空的,长度也不能超过12,此时rules中就有两个规则传进来
      for (let i = 0; i < rules.length; i++) {
        let rule = rules[i]
        let strategyArry = rule.strategy.split(':')
        let errMsg = rule.errMsg
        let strategy = strategyArry.shift()
        strategyArry.unshift(value)
        strategyArry.push(errMsg)
        strategyArry.push(isNaN(rule.judge) ? 1 : rule.judge)
        if (!this.strategys[strategy]) {
          console.error(`Warning: There is no verification rule ${strategy} for validator.js, please check the verification rule!`)
          return false
        }
        this.validateResult.push(this.strategys[strategy].apply(value, strategyArry)) // 遍历规则后,将结果扔进数组
      }
    }
  
    checkResult() { // 遍历结果数组,若有值,则返回错误提示的信息
      for (let i = 0; i < this.validateResult.length; i++) {
        let errMsg = this.validateResult[i]
        if (errMsg) {
          return errMsg
        }
      }
    }
}
module.exports = Validator