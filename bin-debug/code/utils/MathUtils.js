var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var XY = (function () {
    function XY(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    return XY;
}());
__reflect(XY.prototype, "XY");
/**
 * Created by yangsong on 2014/11/22.
 * 数学计算工具类
 */
var MathUtils = (function () {
    function MathUtils() {
    }
    /**
     * 弧度制转换为角度值
     * @param radian 弧度制
     * @returns {number}
     */
    MathUtils.getAngle = function (radian) {
        return 180 * radian / Math.PI;
    };
    /**
     * 角度值转换为弧度制
     * @param angle
     */
    MathUtils.getRadian = function (angle) {
        return angle / 180 * Math.PI;
    };
    /**
     * 获取两点间弧度
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    MathUtils.getRadian2 = function (p1X, p1Y, p2X, p2Y) {
        var xdis = p2X - p1X;
        var ydis = p2Y - p1Y;
        return Math.atan2(ydis, xdis);
    };
    /**
     * 获取两点间距离
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    MathUtils.getDistance = function (p1X, p1Y, p2X, p2Y) {
        var disX = Math.abs(p2X - p1X);
        var disY = Math.abs(p2Y - p1Y);
        if (disX > 20 || disY > 20) {
            var min = Math.min(disX, disY);
            return Math.floor(disX + disY - (min >> 1) - (min >> 2) + (min >> 4));
        }
        else {
            var disQ = disX * disX + disY * disY;
            return Math.floor(Math.sqrt(disQ));
        }
    };
    MathUtils.getDistanceByObject = function (s, t) {
        return this.getDistance(s.x, s.y, t.x, t.y);
    };
    /**获取两个点的距离的平方 */
    MathUtils.getDistanceX2ByObject = function (s, t) {
        var disX = s.x - t.x;
        var disY = s.y - t.y;
        return disX * disX + disY * disY;
    };
    /** 角度移动点 */
    MathUtils.getDirMove = function (angle, distance, offsetX, offsetY) {
        if (offsetX === void 0) { offsetX = 0; }
        if (offsetY === void 0) { offsetY = 0; }
        var radian = this.getRadian(angle);
        var p = { x: 0, y: 0 };
        p.x = (Math.cos(radian) * distance + offsetX) >> 0;
        p.y = (Math.sin(radian) * distance + offsetY) >> 0;
        return p;
    };
    /**
     * 获取两个点延长线上某个距离的点
     * @param p1:起始点
     * @param p2:结束点
     */
    MathUtils.getPByDistance = function (p1, p2, disance) {
        var angle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
        var p = new egret.Point;
        p.x = p2.x + disance * Math.cos(angle);
        p.y = p2.y + disance * Math.sin(angle);
        return p;
    };
    /**
     * 获取一个区间的随机数
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    MathUtils.limit = function ($from, $end) {
        $from = Math.min($from, $end);
        $end = Math.max($from, $end);
        var range = $end - $from;
        return $from + Math.random() * range;
    };
    /**
     * 获取一个区间的随机数(整数)，包含最小值不包含最大值
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    MathUtils.limitInteger = function ($from, $end) {
        return Math.floor(this.limit($from, $end));
    };
    /**
     * 在一个数组中随机获取一个元素
     * @param arr 数组
     * @returns {any} 随机出来的结果
     */
    MathUtils.randomArray = function (arr) {
        var index = Math.floor(Math.random() * arr.length);
        return arr[index];
    };
    /**取整 */
    MathUtils.toInteger = function (value) {
        return value >> 0;
    };
    /** 获取方向格子坐标前几格的坐标 */
    MathUtils.getGridTowardByDir = function (dir, pos, x, y) {
        if (pos === void 0) { pos = 1; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var xy = { x: 0, y: 0 };
        if (dir == 0) {
            xy.x = x;
            xy.y = y - pos;
        }
        else if (dir == 1) {
            xy.x = x + pos;
            xy.y = y - pos;
        }
        else if (dir == 2) {
            xy.x = x + pos;
            xy.y = y;
        }
        else if (dir == 3) {
            xy.x = x + pos;
            xy.y = y + pos;
        }
        else if (dir == 4) {
            xy.x = x;
            xy.y = y + pos;
        }
        else if (dir == 5) {
            xy.x = x - pos;
            xy.y = y + pos;
        }
        else if (dir == 6) {
            xy.x = x - pos;
            xy.y = y;
        }
        else if (dir == 7) {
            xy.x = x - pos;
            xy.y = y - pos;
        }
        return xy;
    };
    /**格子的方向*/
    MathUtils.getDirByGridPoint = function (currentX, currentY, targetX, targetY) {
        if (currentX == targetX) {
            return (currentY <= targetY) ? DirType.DOWN : DirType.UP;
        }
        else if (currentY == targetY) {
            return (currentX > targetX) ? DirType.LEFT : DirType.RIGHT;
        }
        else if (currentX < targetX) {
            return (currentY > targetY) ? DirType.RIGHT_UP : DirType.RIGHT_DOWN;
        }
        else {
            return (currentY > targetY) ? DirType.LEFT_UP : DirType.LEFT_DOWN;
        }
    };
    /**
     * 获取一个实体 和目标 形成的矩形范围内的敌人
     * @sender 施法者
     * @target 目标
     * @range  范围 长度 单位格子
     * @awidth 宽度 单位格子
     * @affectCount 数量限制
     * */
    MathUtils.getRectangle = function (sender, target, range, width, enemys, affectCount) {
        if (affectCount === void 0) { affectCount = Number.MAX_VALUE; }
        var entitys = [];
        entitys.push(target);
        var height = range; //长度
        //以sender为新的坐标原点 ,旋转 target点到X轴, 得到新的标准矩形, 在旋转计算点相同的角度 从而判断计算点是否在矩形中.
        var p1x = target.x - sender.x;
        var p1y = target.y - sender.y;
        var angel1 = Math.atan2(p1y, p1x); //弧度
        //标准矩形
        var harfWidth = width / 2;
        for (var _i = 0, enemys_1 = enemys; _i < enemys_1.length; _i++) {
            var entity1 = enemys_1[_i];
            var p2x = entity1.x - sender.x;
            var p2y = entity1.y - sender.y;
            var angel2 = Math.abs(Math.atan2(p2y, p2x) - angel1); //弧度
            var radiusX2 = p2x * p2x + p2y * p2y; //半径的平方
            var cosAngle2 = Math.cos(angel2);
            var sinAngle2 = Math.sin(angel2);
            //
            if ((angel2 <= Math.PI / 2 || angel2 >= Math.PI * 3 / 2) &&
                cosAngle2 * cosAngle2 * radiusX2 <= height * height &&
                sinAngle2 * sinAngle2 * radiusX2 <= harfWidth * harfWidth &&
                target != entity1) {
                entitys.push(entity1);
            }
            if (entitys.length >= affectCount) {
                break;
            }
        }
        return entitys;
    };
    /**
     * 获取最近的目标点
     * @param s
     * @param ts
     * @param count
     */
    MathUtils.getClosest = function (s, ts, count) {
        if (count === void 0) { count = 1; }
        var result = [];
        var _tDis = '_tDis';
        var tsLen = ts.length;
        for (var i = 0; i < tsLen; i++) {
            var tDis = this.getDistanceByObject(s, ts[i]);
            ts[i][_tDis] = tDis;
            result.push(ts[i]);
        }
        result.sort(function (a, b) {
            return Algorithm.sortAsc(a[_tDis], b[_tDis]);
        });
        if (result.length > count)
            result.length = count;
        return result;
    };
    /**保留指定位数的浮点数
     * @param src 操作的number
     * @param pos 保留多少位
     */
    MathUtils.fomatFloat = function (src, pos) {
        return Math.floor(src * Math.pow(10, pos)) / Math.pow(10, pos);
    };
    /**
    * 获取两点间角度
    */
    MathUtils.getAngelByXY = function (p1X, p1Y, p2X, p2Y) {
        return this.getAngle(this.getRadiansByXY(p1X, p1Y, p2X, p2Y));
    };
    /**
    * 获取两点间弧度
    */
    MathUtils.getRadiansByXY = function (p1X, p1Y, p2X, p2Y) {
        return Math.atan2(p2Y - p1Y, p2X - p1X);
    };
    /********************************************** */
    /**
    * 把字符串转成整数数据类型。而不会出现NaN
    */
    MathUtils.toInt = function (v) {
        var t = parseInt(v);
        if (isNaN(t))
            return 0;
        return t;
    };
    /**
     * 把字符串转成浮点数据类型。而不会出现NaN
     */
    MathUtils.toFloat = function (v) {
        var t = parseFloat(v);
        if (isNaN(t))
            return 0;
        return t;
    };
    /**
     * 获取随机 min 到 max 的数
     */
    MathUtils.random = function (min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    };
    /**对数组进行随机排序 */
    MathUtils.randomArraySort = function (arr) {
        var randomSort = function (a, b) {
            return Math.random() > 0.5 ? -1 : 1;
        };
        arr.sort(randomSort);
        return arr;
    };
    /**
     * 求直角三角形的斜边长
     */
    MathUtils.hypot = function (xx, yy) {
        return Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2));
    };
    /**保留小数后n位数字 */
    MathUtils.prototype.fortmatDecimals = function (num, n) {
        if (n === void 0) { n = 2; }
        var mul = Math.pow(10, n);
        return Math.floor(num * mul) / mul;
    };
    /**
        乘法函数，用来得到精确的乘法结果
        说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
        调用：accMul(arg1,arg2)
        返回值：arg1乘以 arg2的精确结果
    */
    MathUtils.accMul = function (arg1, arg2) {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        }
        catch (e) { }
        try {
            m += s2.split(".")[1].length;
        }
        catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    };
    /**
     * 按位赋值
    */
    MathUtils.changeBit = function (code, bit, value) {
        var pow = Math.pow(2, (bit - 1));
        if (code & pow) {
            if (!value) {
                code = code - pow;
            }
        }
        else {
            if (value) {
                code = code + pow;
            }
        }
        return code;
    };
    return MathUtils;
}());
__reflect(MathUtils.prototype, "MathUtils");
//# sourceMappingURL=MathUtils.js.map