/**
 * Created by yangsong on 15-1-12.
 * 通用工具类
 */
class CommonUtils extends BaseClass {

	/**
	 * 给字体添加描边
	 * @param lable	  文字
	 * @param color	  表示文本的描边颜色
	 * @param width	  描边宽度。
	 */
	public static addLableStrokeColor(lable: eui.Label, color: any, width: any): void {
		lable.strokeColor = color;
		lable.stroke = width;
	}

	/**
	 * 获取一个对象的长度
	 * @param list
	 */
	public static getObjectLength(list: Object): number {
		let num: number = 0;
		for (let i in list) {
			num++;
		}
		return num;
	}

	/**
	 * 深度复制
	 * @param _data
	 */
	public static copyDataHandler(obj: any): any {
		let newObj;
		if (obj instanceof Array) {
			newObj = [];
		}
		else if (obj instanceof Object) {
			newObj = {};
		}
		else {
			return obj;
		}
		let keys = Object.keys(obj);
		for (let i: number = 0, len = keys.length; i < len; i++) {
			let key = keys[i];
			newObj[key] = this.copyDataHandler(obj[key]);
		}
		return newObj;
	}

	/**
	 * 锁屏
	 */
	public static lock(): void {
		/*App.StageUtils.getStage().touchEnabled = */App.StageUtils.getStage().touchChildren = false;
	}

	/**
	 * 解屏
	 */
	public static unlock(): void {
		/*App.StageUtils.getStage().touchEnabled = */App.StageUtils.getStage().touchChildren = true;
	}


	/**
	 * 万字的显示
	 * @param label
	 * @param num
	 */
	public static labelIsOverLenght(label, num) {
		label.text = this.overLength(num);
	}

	public static overLength(num: number) {
		let str = null;
		if (num < 100000) {
			str = num;
		}
		else if (num > 100000000) {
			num = (num / 100000000);
			num = Math.floor(num * 10) / 10;
			str = num + "亿";
		}
		else {
			num = (num / 10000);
			num = Math.floor(num * 10) / 10;
			str = num + "万";
		}
		return str;
	}
}
