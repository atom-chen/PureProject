var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 对象池类
 */
var ObjectPool = (function () {
    function ObjectPool() {
    }
    ObjectPool.get = function (cla) {
        var par = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            par[_i - 1] = arguments[_i];
        }
        var claName = egret.getQualifiedClassName(cla);
        if (ObjectPool.PoolObj[claName] == null)
            ObjectPool.PoolObj[claName] = [];
        var obj = ObjectPool.PoolObj[claName].pop();
        if (obj) {
            //暂时这里特殊处理下eui.imae
            if (obj instanceof eui.Image) {
                obj.x = obj.y = 0;
                obj.scaleX = obj.scaleY = 1;
                obj.width = obj.height = NaN;
                obj.alpha = 1;
            }
            return obj;
        }
        if (ObjectPool.PoolObj[claName].length == 0) {
            switch (par.length) {
                case 1:
                    return new cla(par[0]);
                case 2:
                    return new cla(par[0], par[1]);
                case 3:
                    return new cla(par[0], par[1], par[2]);
                case 4:
                    return new cla(par[0], par[1], par[2], par[3]);
                case 5:
                    return new cla(par[0], par[1], par[2], par[3], par[4]);
                default:
                    return new cla();
            }
        }
    };
    /**
     * 回池
     * @param obj:需要回池的对象
     * @param check:是否需要检测,防止重复入池,默认需要
     */
    ObjectPool.push = function (obj) {
        var claName = obj["__class__"];
        if (ObjectPool.PoolObj[claName]) {
            if (ObjectPool.PoolObj[claName].indexOf(obj) > -1) {
                true && egret.log("\u91CD\u590D\u5165\u6C60\uFF1A" + claName);
                return;
            }
            if (ObjectPool.PoolObj[claName].length >= ObjectPool.max)
                true && console.log(claName + ":对象池过大");
            else
                ObjectPool.PoolObj[claName].push(obj);
        }
    };
    ObjectPool.max = 100;
    ObjectPool.PoolObj = {};
    return ObjectPool;
}());
__reflect(ObjectPool.prototype, "ObjectPool");
//# sourceMappingURL=ObjectPool.js.map