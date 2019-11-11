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
/*
 * @Description: 富文本管理
 * @Author: guolinsen
 * @Date: 2019-08-15 22:02:37
 * @LastEditTime: 2019-10-31 21:24:46
 */
var TextFlowUtils = (function (_super) {
    __extends(TextFlowUtils, _super);
    function TextFlowUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**把通用格式转换为富文本格式，标准Html格式也可以使用 */
    TextFlowUtils.generateTextFlow = function (str) {
        if (str == "" || str == null || str == undefined) {
            return null;
        }
        if (str.indexOf("/font") != -1 || str.indexOf("/FONT") != -1)
            return this.generateHTML(str);
        str = str.replace(/\\/g, "\n");
        str = str.replace(/</g, "///<");
        str = str.replace(/>/g, "///");
        var strArr = str.split("///");
        var result = [];
        for (var i = 0, len = strArr.length; i < len; i++) {
            if (strArr[i] != "") {
                if (strArr[i].charAt(0) == "<")
                    result.push(this.getSingleTextFlow(strArr[i].substr(1)));
                else
                    result.push({ text: strArr[i], "style": {} });
            }
        }
        return result;
    };
    TextFlowUtils.getSingleTextFlow = function (str) {
        var textFlow = { "style": {} };
        // let styStr = str.match(/\((.)\)/g);
        var strArr = str.match(/\((.+?)\)/g) || [];
        var flag;
        var repStr;
        var imgCount = 0;
        for (var i = 0, len = strArr.length; i < len; i++) {
            var s = strArr[i].replace(/[\(\)]/g, "");
            flag = s.charAt(0).toLocaleUpperCase();
            switch (flag) {
                case this.STYLE_COLOR:
                    var col = s.slice(1);
                    if (col.length > 8) {
                        col = "0x" + s.slice(col.length - 5);
                    }
                    textFlow.style.textColor = parseInt(col);
                    break;
                case this.STYLE_SIZE:
                    textFlow.style.size = parseInt(s.slice(1));
                    break;
                case this.STYLE_UNDERLINE:
                    textFlow.style.underline = true;
                    break;
                case this.STYLE_BOLD:
                    textFlow.style.bold = true;
                    break;
                case this.STYLE_ITALIC:
                    textFlow.style.italic = true;
                    break;
                case this.STYLE_EVENT:
                    // let strT = strArr[i].slice(1);
                    textFlow.style.href = "event:" + s.slice(1);
                    break;
                case this.STYLE_IMG:
                    // textFlow.text = "　";
                    s = s.slice(1);
                    var arr = s.split("_");
                    textFlow.style.img = arr;
                    break;
                default:
                    continue;
            }
            // str = str.replace(`(${strArr[i]})`, "");
        }
        textFlow.text = str.replace(/\((.+?)\)/g, "");
        return textFlow;
    };
    TextFlowUtils.generateHTML = function (str) {
        var HTMLStr = ["FONT", "COLOR", "SIZE", "<B>", "</B>", "<U>", "</U>"];
        //要把大小改小写才能识别
        for (var i = 0, len = HTMLStr.length; i < len; i++) {
            var rep = RegExp("" + HTMLStr[i], "g");
            str = str.replace(rep, HTMLStr[i].toLocaleLowerCase());
        }
        return new egret.HtmlTextParser().parser(str);
    };
    /**返回通用格式  <(c0x00)内容> */
    TextFlowUtils.color = function (str, color) {
        return "<(c" + color + ")" + str + ">";
    };
    /**富文本禁止内容 */
    TextFlowUtils.textBanWord = function (str) {
        // if (DEBUG) {
        // return str;
        // }
        str = str.replace(/[<>]/g, "*");
        return str;
    };
    /**识别超链接类型 重富文本读取参数*/
    TextFlowUtils.hrefType = function (str) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            param[_i - 1] = arguments[_i];
        }
        if (!str)
            return;
        var arr = str.split(':');
        switch (arr[0]) {
            case 'win':
                var arr1 = arr[1].split("#");
                App.ViewManager.openTab(arr1[0], parseInt(arr1[1]), parseInt(arr1[2]));
                break;
            case 'npc':
                App.VisitManager.goToNpc(parseInt(arr[1]));
                break;
            case 'pass':
                if (GameCache.map.mapConfig.type == SceneType.NORMAL_FIELD) {
                    Proxy.copy.sendEnterFB(GlobalVar.GUAJI_SCENE);
                }
                else {
                }
                break;
            case 'passGuide':
                if (GameCache.map.mapConfig.type == SceneType.NORMAL_FIELD) {
                    GameCache.novice.playGuide(GameConfig.clientGlobal.barrierGuideID);
                }
                break;
            case 'passBossGuide':
                if (GameCache.map.mapConfig.type == SceneType.NORMAL_FIELD) {
                    GameCache.novice.playGuide(GameConfig.clientGlobal.barrierGuideID);
                }
                else if (GameCache.map.mapConfig.type == SceneType.GUA_JI) {
                    App.ViewManager.open(ViewConst.CHUANGGUAN);
                }
                break;
            case 'item':
                var dataArr = arr[1].split("_");
                var view = new ViewProp();
                if (dataArr[1] == "-1") {
                    //类型为时装时
                    view.itemData = GameConfig.fashion[dataArr[0]];
                }
                else {
                    view.itemData = GameConfig.item[dataArr[0]];
                }
                App.ViewManager.open(ViewConst.ITEMTIPS, view);
                break;
            case 'role':
                Proxy.rank.askRoleInfo(parseInt(arr[1]));
                break;
        }
        return;
    };
    /**数字缩写 */
    TextFlowUtils.numAbbreviate = function (num) {
        return;
    };
    /**图文混排
     * force 为强制先回收组内图片
     */
    TextFlowUtils.generateEmoji = function (label, group, force) {
        if (force === void 0) { force = false; }
        label.textHeight;
        var lineArr = label['linesArr'];
        var picArr = label["picArr"] || [];
        // if (force && label["picArr"]) {
        //     for (let i = 0; i < label["picArr"].length; i++) {
        //         let img = label["picArr"][i] as eui.Image;
        //         img.source = null;
        //         ObjectPool.push(img);
        //         group.removeChild(img);
        //         img = null;
        //     }
        // }
        //遍历行
        var idx = 0;
        var tary = 0 + label.y;
        var count = 0;
        for (var i = 0; i < lineArr.length; i++) {
            var line = lineArr[i];
            var tarx = 0 + label.x;
            //检索每行富文本
            for (var e = 0; e < line.elements.length; e++) {
                var item = line.elements[e];
                if (item.style.img && item.text) {
                    var arr = item.style.img;
                    var emoji = (label["picArr"] && label["picArr"][count]);
                    var w = item.style.size ? item.style.size : label.size;
                    if (!emoji) {
                        emoji = ObjectPool.get(eui.Image);
                        emoji.name = "emoji";
                        picArr.push(emoji);
                        group.addChild(emoji);
                    }
                    emoji.source = StringUtils.substitute(GlobalVar.EMOJI_TYPE[arr[0]], arr[1]);
                    var tx = RES.getRes(emoji.source);
                    if (tx) {
                        emoji.scaleX = (parseInt(arr[3]) || w) / tx.textureWidth;
                        emoji.scaleY = (parseInt(arr[2]) || w) / tx.textureHeight;
                    }
                    else {
                        emoji.height = parseInt(arr[2]) || w;
                        emoji.width = parseInt(arr[3]) || w;
                    }
                    emoji.touchEnabled = false;
                    emoji.x = tarx;
                    emoji.y = idx * label.lineSpacing + tary + line.height - w;
                    count++;
                }
                tarx += item.width;
            }
            tary += line.height;
            idx++;
        }
        //回收多余图片
        var recycleArr = picArr.length - count > 0 ? picArr.splice(count, picArr.length - count) : [];
        for (var i = 0; i < recycleArr.length; i++) {
            var img = recycleArr[i];
            img.source = null;
            img.scaleX = img.scaleY = 1;
            img.name = "";
            img.x = img.y = 0;
            ObjectPool.push(img);
            group.removeChild(img);
            img = null;
        }
        //作为picArr属性加入label
        picArr && (label["picArr"] = picArr);
    };
    TextFlowUtils.STYLE_COLOR = "C"; //颜色
    TextFlowUtils.STYLE_SIZE = "S"; //大小
    TextFlowUtils.STYLE_ITALIC = "I"; //斜体
    TextFlowUtils.STYLE_BOLD = "B"; //加粗
    TextFlowUtils.STYLE_UNDERLINE = "U"; //下划线
    TextFlowUtils.STYLE_EVENT = "E"; //事件
    TextFlowUtils.STYLE_IMG = "P"; //图片
    return TextFlowUtils;
}(BaseClass));
__reflect(TextFlowUtils.prototype, "TextFlowUtils");
//# sourceMappingURL=TextFlowUtils.js.map