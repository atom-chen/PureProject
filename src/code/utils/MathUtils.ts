class XY {
	x: number;
	y: number;
	public constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}
}
/**
 * Created by yangsong on 2014/11/22.
 * 数学计算工具类
 */
class MathUtils {

	/**
	 * 弧度制转换为角度值
	 * @param radian 弧度制
	 * @returns {number}
	 */
	public static getAngle(radian: number): number {
		return 180 * radian / Math.PI;

	}

	/**
	 * 角度值转换为弧度制
	 * @param angle
	 */
	public static getRadian(angle: number): number {
		return angle / 180 * Math.PI;
	}

	/**
	 * 获取两点间弧度
	 * @param p1X
	 * @param p1Y
	 * @param p2X
	 * @param p2Y
	 * @returns {number}
	 */
	public static getRadian2(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
		let xdis: number = p2X - p1X;
		let ydis: number = p2Y - p1Y;
		return Math.atan2(ydis, xdis);
	}

	/**
	 * 获取两点间距离
	 * @param p1X
	 * @param p1Y
	 * @param p2X
	 * @param p2Y
	 * @returns {number}
	 */
	public static getDistance(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
		let disX: number = Math.abs(p2X - p1X);
		let disY: number = Math.abs(p2Y - p1Y);
		if (disX > 20 || disY > 20) {
			let min: number = Math.min(disX, disY);
			return Math.floor(disX + disY - (min >> 1) - (min >> 2) + (min >> 4));
		} else {
			let disQ: number = disX * disX + disY * disY;
			return Math.floor(Math.sqrt(disQ));
		}
	}

	public static getDistanceByObject(s: XY, t: XY): number {
		return this.getDistance(s.x, s.y, t.x, t.y);
	}

	/**获取两个点的距离的平方 */
	public static getDistanceX2ByObject(s: XY, t: XY): number {
		let disX: number = s.x - t.x;
		let disY: number = s.y - t.y;
		return disX * disX + disY * disY;
	}

	/** 角度移动点 */
	public static getDirMove(angle: number, distance: number, offsetX: number = 0, offsetY: number = 0): XY {
		let radian = this.getRadian(angle);
		let p = { x: 0, y: 0 };
		p.x = (Math.cos(radian) * distance + offsetX) >> 0;
		p.y = (Math.sin(radian) * distance + offsetY) >> 0;
		return p;
	}

	/**
	 * 获取两个点延长线上某个距离的点
	 * @param p1:起始点
	 * @param p2:结束点
	 */
	public static getPByDistance(p1: XY, p2: XY, disance: number): XY {
		let angle: number = Math.atan2(p2.y - p1.y, p2.x - p1.x);
		let p: egret.Point = new egret.Point;
		p.x = p2.x + disance * Math.cos(angle);
		p.y = p2.y + disance * Math.sin(angle);
		return p;
	}

	/**
	 * 获取一个区间的随机数
	 * @param $from 最小值
	 * @param $end 最大值
	 * @returns {number}
	 */
	public static limit($from: number, $end: number): number {
		$from = Math.min($from, $end);
		$end = Math.max($from, $end);
		let range: number = $end - $from;
		return $from + Math.random() * range;
	}

	/**
	 * 获取一个区间的随机数(整数)，包含最小值不包含最大值
	 * @param $from 最小值
	 * @param $end 最大值
	 * @returns {number}
	 */
	public static limitInteger($from: number, $end: number): number {
		return Math.floor(this.limit($from, $end));
	}

	/**
	 * 在一个数组中随机获取一个元素
	 * @param arr 数组
	 * @returns {any} 随机出来的结果
	 */
	public static randomArray(arr: Array<any>): any {
		let index: number = Math.floor(Math.random() * arr.length);
		return arr[index];
	}

	/**取整 */
	public static toInteger(value: number): number {
		return value >> 0;
	}
	/** 获取方向格子坐标前几格的坐标 */
	public static getGridTowardByDir(dir: number, pos: number = 1, x: number = 0, y: number = 0): XY {
		let xy: XY = { x: 0, y: 0 };
		if (dir == 0) {
			xy.x = x;
			xy.y = y - pos;
		} else if (dir == 1) {
			xy.x = x + pos;
			xy.y = y - pos;
		} else if (dir == 2) {
			xy.x = x + pos;
			xy.y = y;
		} else if (dir == 3) {
			xy.x = x + pos;
			xy.y = y + pos;
		} else if (dir == 4) {
			xy.x = x;
			xy.y = y + pos;
		} else if (dir == 5) {
			xy.x = x - pos;
			xy.y = y + pos;
		} else if (dir == 6) {
			xy.x = x - pos;
			xy.y = y;
		} else if (dir == 7) {
			xy.x = x - pos;
			xy.y = y - pos;
		}
		return xy;
	}

	/**格子的方向*/
	public static getDirByGridPoint(currentX: number, currentY: number, targetX: number, targetY: number): number {
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
	}

	/**
	 * 获取一个实体 和目标 形成的矩形范围内的敌人
	 * @sender 施法者
	 * @target 目标
	 * @range  范围 长度 单位格子
	 * @awidth 宽度 单位格子
	 * @affectCount 数量限制
	 * */
	static getRectangle<T extends XY>(sender: T, target: T, range: number, width: number,
		enemys: T[], affectCount: number = Number.MAX_VALUE): T[] {

		let entitys: T[] = [];
		entitys.push(target);
		let height: number = range;//长度
		//以sender为新的坐标原点 ,旋转 target点到X轴, 得到新的标准矩形, 在旋转计算点相同的角度 从而判断计算点是否在矩形中.
		let p1x: number = target.x - sender.x;
		let p1y: number = target.y - sender.y;
		let angel1: number = Math.atan2(p1y, p1x);//弧度

		//标准矩形
		let harfWidth: number = width / 2;
		for (let entity1 of enemys) {
			let p2x: number = entity1.x - sender.x;
			let p2y: number = entity1.y - sender.y;
			let angel2: number = Math.abs(Math.atan2(p2y, p2x) - angel1);//弧度

			let radiusX2: number = p2x * p2x + p2y * p2y;//半径的平方
			let cosAngle2: number = Math.cos(angel2);
			let sinAngle2: number = Math.sin(angel2);
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
	}

	/**
	 * 获取最近的目标点
	 * @param s
	 * @param ts
	 * @param count
	 */
	static getClosest<T extends XY>(s: T, ts: T[], count: number = 1): T[] {
		let result: T[] = [];
		let _tDis = '_tDis';
		let tsLen: number = ts.length;
		for (let i = 0; i < tsLen; i++) {
			let tDis = this.getDistanceByObject(s, ts[i]);
			ts[i][_tDis] = tDis;
			result.push(ts[i]);
		}
		result.sort((a: T, b: T): number => {
			return Algorithm.sortAsc(a[_tDis], b[_tDis]);
		});
		if (result.length > count)
			result.length = count;
		return result;
	}

	/**保留指定位数的浮点数
	 * @param src 操作的number
	 * @param pos 保留多少位
	 */
	public static fomatFloat(src: number, pos: number): number {
		return Math.floor(src * Math.pow(10, pos)) / Math.pow(10, pos);
	}

	/**
    * 获取两点间角度  
    */
	public static getAngelByXY(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
		return this.getAngle(this.getRadiansByXY(p1X, p1Y, p2X, p2Y));
	}

	/**
    * 获取两点间弧度
    */
	public static getRadiansByXY(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
		return Math.atan2(p2Y - p1Y, p2X - p1X);
	}

	/********************************************** */
	/**
	* 把字符串转成整数数据类型。而不会出现NaN
	*/
	public static toInt(v: string): number {
		var t: number = parseInt(v);
		if (isNaN(t)) return 0;
		return t;
	}

	/**
	 * 把字符串转成浮点数据类型。而不会出现NaN
	 */
	public static toFloat(v: string): number {
		var t: number = parseFloat(v);
		if (isNaN(t)) return 0;
		return t;
	}

	/**
	 * 获取随机 min 到 max 的数
	 */
	public static random(min: number, max: number): number {
		return Math.round(Math.random() * (max - min)) + min;
	}



	/**对数组进行随机排序 */
	public static randomArraySort(arr: Array<any>): Array<any> {
		let randomSort = function (a, b) {
			return Math.random() > 0.5 ? -1 : 1;
		}
		arr.sort(randomSort);
		return arr;
	}




	/**
	 * 求直角三角形的斜边长
	 */
	public static hypot(xx: number, yy: number): number {
		return Math.sqrt(Math.pow(xx, 2) + Math.pow(yy, 2));
	}





	/**保留小数后n位数字 */
	public fortmatDecimals(num: number, n: number = 2): number {
		var mul: number = Math.pow(10, n);
		return Math.floor(num * mul) / mul;
	}

	/** 
		乘法函数，用来得到精确的乘法结果
		说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
		调用：accMul(arg1,arg2)
		返回值：arg1乘以 arg2的精确结果
	*/
	public static accMul(arg1, arg2) {
		var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
		try { m += s1.split(".")[1].length } catch (e) { }
		try { m += s2.split(".")[1].length } catch (e) { }
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
	}

	/**
	 * 按位赋值
	*/
	public static changeBit(code: number, bit: number, value: number): number {
		let pow: number = Math.pow(2, (bit - 1));
		if (code & pow) {
			if (!value) {
				code = code - pow;
			}
		} else {
			if (value) {
				code = code + pow;
			}
		}
		return code;
	}

}