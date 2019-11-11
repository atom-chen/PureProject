/**
 * Created by yangsong on 14/12/18.
 * 字符串操作工具类
 */
class StringUtils {

	private static HTML: RegExp = /<[^>]+>/g;

	/**
	 * 去掉前后空格
	 * @param str
	 * @returns {string}
	 */
	public static trimSpace(str: string): string {
		return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
	}

	/**
	 * 获取字符串长度，中文为2
	 * @param str
	 */
	public static getStringLength(str: string): number {
		let strArr = str.split("");
		let length = 0;
		for (let i = 0; i < strArr.length; i++) {
			let s = strArr[i];
			if (this.isChinese(s)) {
				length += 2;
			} else {
				length += 1;
			}
		}
		return length;
	}

	/**
	 * 判断一个字符串是否包含中文
	 * @param str
	 * @returns {boolean}
	 */
	public static isChinese(str: string): boolean {
		let reg = /^[\u4E00-\u9FA5]+$/;
		if (!reg.test(str)) {
			return true;
		}
		return false;
	}


	/**
	 * 获取字符串的字节长度
	 * 一个中文算2两个字节
	 * @param str
	 * @return
	 */
	public static strByteLen(str: string): number {
		let byteLen: number = 0;
		let strLen: number = str.length;
		for (let i: number = 0; i < strLen; i++) {
			byteLen += str.charCodeAt(i) >= 0x7F ? 2 : 1;
		}
		return byteLen;
	}

	/**
	 * 补齐字符串
	 * 因为这里使用的是字节长度（一个中文算2个字节）
	 * 所以指定的长度是指字节长度，用来填补的字符按一个字节算
	 * 如果填补的字符使用中文那么会导致结果不正确，但这里没有对填补字符做检测
	 * @param str 源字符串
	 * @param length 指定的字节长度
	 * @param char 填补的字符
	 * @param ignoreHtml 是否忽略HTML代码，默认为true
	 * @return
	 *
	 */
	public static complementByChar(str: string, length: number, char: string = " ", ignoreHtml: boolean = true): string {
		let byteLen: number = this.strByteLen(ignoreHtml ? str.replace(StringUtils.HTML, "") : str);
		return str + this.repeatStr(char, length - byteLen);
	}

	/**
	 * 重复指定字符串count次
	 * @param str
	 * @param count
	 * @return
	 *
	 */
	public static repeatStr(str: string, count: number): string {
		let s: string = "";
		for (let i: number = 0; i < count; i++) {
			s += str;
		}
		return s;
	}

	/**
	 * 为文字添加颜色
	 * */
	public static addColor(content: string, color: any): string {
		let colorStr: string;
		if (typeof (color) == "string")
			colorStr = String(color)
		else if (typeof (color) == "number")
			colorStr = Number(color).toString(10);
		return `<font color=\"${colorStr}\">${content}</font>`;
	}
	/**
	 * 这个函数还没改完,用来替代addColor
	 * 
	 */
	public static addColor1(content: string, color: any): Object {
		let obj: Object = new Object;
		obj["style"] = new Object;
		obj["text"] = content;
		obj["textColor"] = Number(color).toString(16);

		return obj;
	}

	/**
	 * 匹配替换字符串
	 * @param 需要匹配替换的字符串
	 * @param 匹配的字符串
	 * @param 需要替换成的字符串
	 * **/
	public static replaceStr(src: string, tar: string, des: string) {
		if (src.indexOf(tar) == -1)
			return src;

		let list = src.split(tar);
		return list[0] + des + list[1];
	}

	/**替换字符
	 * @start 格式 "还有{0}天{1}小时{2}秒"
	 * @end 对应的参数
	*/
	public static substitute(start: string, ...end): string {
		var tmpAry: any[];
		if (start == null) {
			return ("");
		};
		var endLength: number = end.length;
		if (endLength == 1 && Array.isArray(end[0])) {
			tmpAry = end[0];
			endLength = tmpAry.length;
		} else {
			tmpAry = end;
		};
		var i: number = 0;
		while (i < endLength) {
			start = start.replace(new RegExp((("\\{" + i) + "\\}"), "g"), tmpAry[i]);
			i++;
		};
		return (start);
	}


	/**********************************************************/
	/**********************************************************/
	/**********************************************************/
	private static NUM_CN: string[] = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
	private static UNITS: string[] = ["千", "百", "十"];
	private static LEVELS: string[] = ["", "万", "亿", "兆"];
	/**
	 * 把阿拉伯数字单位转换成中文大写 
	 * @param num 阿拉伯数字 
	 * @return 中文
	 */
	public static toCNUpper(num: number): string {
		if (num == 0)
			return this.NUM_CN[0];
		var numStr: string = num.toString();
		if (numStr.length > 16)
			throw new Error("数字太大，无法处理！");
		var cnMoney: string = this.convertIntegerStr(numStr);
		return cnMoney;
	}
	/** 
	 * 把数字中的整数部分进行转换 
	 * @param str 
	 * @return  
	 */
	private static convertIntegerStr(str: string): string {
		var tCount: number = Math.floor(str.length / 4);
		var rCount: number = str.length % 4;
		var nodes: ThousandNode[] = [];
		if (rCount > 0)
			nodes.push(this.convertThousand(str.substr(0, rCount), tCount));

		for (var i: number = 0; i < tCount; i++) {
			var startIndex: number = rCount + i * 4;
			var num: string = str.substring(startIndex, startIndex + 4);
			nodes.push(this.convertThousand(num, tCount - i - 1));
		}
		return this.convertNodes(nodes);
	}

	private static convertNodes(nodes: ThousandNode[]): string {
		var str: string = "";
		var beforeZero: Boolean;
		for (var i: number = 0; i < nodes.length; i++) {
			var node: ThousandNode = nodes[i] as ThousandNode;
			if ((beforeZero && node.desc.length > 0) ||
				(node.beforeZero && node.desc.length > 0 && str.length > 0))
				str += this.NUM_CN[0];

			str += node.desc;
			if (node.afterZero && i < nodes.length - 1)
				beforeZero = true;
			else if (node.desc.length > 0)
				beforeZero = false;
		}

		return str;
	}

	/** 
	 * 对四位数进行处理，不够自动补起 
	 * @param num 
	 * @param level 
	 * @return  
	 */
	private static convertThousand(num: string, level: number): ThousandNode {
		var node: ThousandNode = new ThousandNode();
		var len: number = num.length;

		for (var i: number = 0; i < 4 - len; i++)
			num = "0" + num;

		var n1: number = parseInt(num.charAt(0));
		var n2: number = parseInt(num.charAt(1));
		var n3: number = parseInt(num.charAt(2));
		var n4: number = parseInt(num.charAt(3));

		if (n1 + n2 + n3 + n4 == 0)
			return node;

		if (n1 == 0)
			node.beforeZero = true;
		else
			node.desc += this.NUM_CN[n1] + this.UNITS[0];

		if (n2 == 0 && node.desc != "" && n3 + n4 > 0)
			node.desc += this.NUM_CN[0];
		else if (n2 > 0)
			node.desc += this.NUM_CN[n2] + this.UNITS[1];

		if (n3 == 0 && node.desc != "" && n4 > 0)
			node.desc += this.NUM_CN[0];
		else if (n3 > 0) {
			if (n3 > 1)
				node.desc += this.NUM_CN[n3]
			node.desc += this.UNITS[2];
		}

		if (n4 == 0)
			node.afterZero = true;
		else if (n4 > 0)
			node.desc += this.NUM_CN[n4];

		if (node.desc.length > 0)
			node.desc += this.LEVELS[level];
		return node;
	}
	/** 
	 * 用数据方法得到数字整数部分长度 
	 * @param num 
	 * @return  
	 */
	private static getUnitCount(num: number): number {
		return Math.ceil(Math.log(num) / Math.LN10);
	}
}

class ThousandNode {
	public beforeZero: Boolean;
	public afterZero: Boolean;
	public desc: String = "";
}