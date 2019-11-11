var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: buff数据结构
 * @Author: guolinsen
 * @Date: 2019-09-02 20:38:23
 * @LastEditTime: 2019-09-03 11:37:46
 */
var BuffVo = (function () {
    function BuffVo() {
        this.attr = [];
    }
    return BuffVo;
}());
__reflect(BuffVo.prototype, "BuffVo");
var BuffValue = (function () {
    function BuffValue() {
    }
    return BuffValue;
}());
__reflect(BuffValue.prototype, "BuffValue");
//# sourceMappingURL=BuffVo.js.map