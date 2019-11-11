/**屏蔽字*/
class FilterTextUtil extends BaseClass {
	private static dic: Object = {};
	private filterMsg: FilterMsg;

	public constructor() {
		super();
	}

	public init(): void {
		this.uncompress(RES.getRes("fw_dat"));
		if (RES.destroyRes("fw_dat")) {
			//console.log("delete fw_dat success");
		}
	}

	/**
	* 加载数据完成 生成过滤正则表达式
	* @param event
	*
	*/
	public uncompress(data: egret.ByteArray): void {
		// let time: number = egret.getTimer();
		// let bytes: egret.ByteArray = data;
		// let zipReader: JSZip = new JSZip(data);

		// let chat: string;
		// //聊天专门屏蔽字库
		// let chatFilter: FilterMsg = new FilterMsg();
		// if (zipReader.file("role.xml")) {
		// 	chat = zipReader.file("role.xml").asText();
		// 	chatFilter.createRegExpStr(chat);
		// }
		// else {
			
		// }
		// this.filterMsg = chatFilter;
		// console.log("chat-----" + (egret.getTimer() - time));
	}

	/**
	* 获取过滤后的字符串
	* @param str
	* @return
	*
	*/
	public getFilterStr(str: string): string {
		// if (GlobalVar.filterStr)
		// 	return this.filterMsg.getFilterStr(str);
		// else
			return str;
	}

	/**
	 * 验证是不是包含屏蔽字符
	 * @param str
	 * @param contains 是否要检查空格
	 * @return true:包含,false:不包含
	 *
	 */
	public validate(str: string): Boolean {
		// if (GlobalVar.filterStr)
		// 	return this.filterMsg.validate(str);
		// else
			return false;
	}

}

class FilterMsg {
	private _wordMap: Object;
	private _splitReg: RegExp = /(\n|\r)+/mg;

	public constructor() {
		this._wordMap = {};
	}

	public createRegExpStr(str: string): void {
		var tempAry: string[] = str.split(this._splitReg);
		var len: number = tempAry.length;
		for (var i: number = 0; i < len; i++) {
			this.addWord(tempAry[i]);
		}
	}

	public addWord(value: string): void {
		value = value.replace("\n", "");
		if (value && value.length > 0) {
			var dic: string;
			var s: string = value.charAt(0);
			dic = this._wordMap[s];
			if (dic) {
				this._wordMap[s] += "|" + value;
			}
			else {
				this._wordMap[s] = value;
			}
		}
	}

	/**
	 * 获取过滤后的字符串
	 * @param str
	 * @return
	 *
	 */
	public getFilterStr(str: string): string {
		if (!str)
			return "";
		str = str.replace(/^\s*|\s*$/, "");
		//根据正则替换字符串
		var len: number = str.length;
		var s: string;
		var ws: any;
		for (var i: number = 0; i < len; i++) {
			s = str.charAt(i);
			if (s != "*") {
				ws = this._wordMap[s];
				if (typeof ws == "string") {
					ws = this._wordMap[s] = new RegExp("(" + ws + ")", "img");
				}
				str = str.replace(ws, this.regHandler);
			}
		}
		return str;
	}

	/**
	 * 验证是不是包含屏蔽字符
	 * @param str
	 * @return true:包含,false:不包含
	 *
	 */
	public validate(str: string): Boolean {
		str = str.replace(/\s/g, "");
		//根据正则替换字符串
		var len: number = str.length;
		var s: string;
		var ws: any;
		for (var i: number = 0; i < len; i++) {
			s = str.charAt(i);
			ws = this._wordMap[s];
			if (!ws)
				continue;
			if (typeof ws == "string") {
				ws = ws.replace(/\(/g, "（");
				ws = ws.replace(/\)/g, "）");
				ws = this._wordMap[s] = new RegExp("(" + ws + ")", "img");
			}
			var reg: RegExp = ws as RegExp;
			reg.lastIndex = 0;
			if (reg.test(str)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 处理过滤的函数
	 * @return
	 *
	 */
	private regHandler(): string {
		//获取正则获取的字符串
		var s: string = arguments[1].toString();
		//替换成*
		return s.replace(/.{1}/g, "*");
	}

	public setWordMap(wordMap: Object): void {
		this._wordMap = wordMap;
	}

	public getWordMap(): Object {
		return this._wordMap;
	}
}