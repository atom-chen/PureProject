var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**屏蔽字*/
var FilterTextUtil = (function (_super) {
    __extends(FilterTextUtil, _super);
    function FilterTextUtil() {
        return _super.call(this) || this;
    }
    FilterTextUtil.prototype.init = function () {
        this.uncompress(RES.getRes("fw_dat"));
        if (RES.destroyRes("fw_dat")) {
            //console.log("delete fw_dat success");
        }
    };
    /**
    * 加载数据完成 生成过滤正则表达式
    * @param event
    *
    */
    FilterTextUtil.prototype.uncompress = function (data) {
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
    };
    /**
    * 获取过滤后的字符串
    * @param str
    * @return
    *
    */
    FilterTextUtil.prototype.getFilterStr = function (str) {
        // if (GlobalVar.filterStr)
        // 	return this.filterMsg.getFilterStr(str);
        // else
        return str;
    };
    /**
     * 验证是不是包含屏蔽字符
     * @param str
     * @param contains 是否要检查空格
     * @return true:包含,false:不包含
     *
     */
    FilterTextUtil.prototype.validate = function (str) {
        // if (GlobalVar.filterStr)
        // 	return this.filterMsg.validate(str);
        // else
        return false;
    };
    FilterTextUtil.dic = {};
    return FilterTextUtil;
}(BaseClass));
__reflect(FilterTextUtil.prototype, "FilterTextUtil");
var FilterMsg = (function () {
    function FilterMsg() {
        this._splitReg = /(\n|\r)+/mg;
        this._wordMap = {};
    }
    FilterMsg.prototype.createRegExpStr = function (str) {
        var tempAry = str.split(this._splitReg);
        var len = tempAry.length;
        for (var i = 0; i < len; i++) {
            this.addWord(tempAry[i]);
        }
    };
    FilterMsg.prototype.addWord = function (value) {
        value = value.replace("\n", "");
        if (value && value.length > 0) {
            var dic;
            var s = value.charAt(0);
            dic = this._wordMap[s];
            if (dic) {
                this._wordMap[s] += "|" + value;
            }
            else {
                this._wordMap[s] = value;
            }
        }
    };
    /**
     * 获取过滤后的字符串
     * @param str
     * @return
     *
     */
    FilterMsg.prototype.getFilterStr = function (str) {
        if (!str)
            return "";
        str = str.replace(/^\s*|\s*$/, "");
        //根据正则替换字符串
        var len = str.length;
        var s;
        var ws;
        for (var i = 0; i < len; i++) {
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
    };
    /**
     * 验证是不是包含屏蔽字符
     * @param str
     * @return true:包含,false:不包含
     *
     */
    FilterMsg.prototype.validate = function (str) {
        str = str.replace(/\s/g, "");
        //根据正则替换字符串
        var len = str.length;
        var s;
        var ws;
        for (var i = 0; i < len; i++) {
            s = str.charAt(i);
            ws = this._wordMap[s];
            if (!ws)
                continue;
            if (typeof ws == "string") {
                ws = ws.replace(/\(/g, "（");
                ws = ws.replace(/\)/g, "）");
                ws = this._wordMap[s] = new RegExp("(" + ws + ")", "img");
            }
            var reg = ws;
            reg.lastIndex = 0;
            if (reg.test(str)) {
                return true;
            }
        }
        return false;
    };
    /**
     * 处理过滤的函数
     * @return
     *
     */
    FilterMsg.prototype.regHandler = function () {
        //获取正则获取的字符串
        var s = arguments[1].toString();
        //替换成*
        return s.replace(/.{1}/g, "*");
    };
    FilterMsg.prototype.setWordMap = function (wordMap) {
        this._wordMap = wordMap;
    };
    FilterMsg.prototype.getWordMap = function () {
        return this._wordMap;
    };
    return FilterMsg;
}());
__reflect(FilterMsg.prototype, "FilterMsg");
//# sourceMappingURL=FilterTextUtil.js.map