/*
 * @Description: 富文本管理
 * @Author: guolinsen
 * @Date: 2019-08-15 22:02:37
 * @LastEditTime: 2019-10-31 21:24:46
 */
class TextFlowUtils extends BaseClass {
    private static STYLE_COLOR: string = "C";	//颜色
    private static STYLE_SIZE: string = "S";	//大小
    private static STYLE_ITALIC: string = "I";	//斜体
    private static STYLE_BOLD: string = "B";	//加粗
    private static STYLE_UNDERLINE: string = "U";		//下划线
    private static STYLE_EVENT: string = "E";				//事件
    private static STYLE_IMG: string = "P";             //图片

    /**把通用格式转换为富文本格式，标准Html格式也可以使用 */
    public static generateTextFlow(str: string): egret.ITextElement[] {
        if (str == "" || str == null || str == undefined) {
            return null;
        }
        if (str.indexOf("/font") != -1 || str.indexOf("/FONT") != -1)
            return this.generateHTML(str);

        str = str.replace(/\\/g, "\n");
        str = str.replace(/</g, "///<");
        str = str.replace(/>/g, "///");
        let strArr = str.split("///");
        let result = [];
        for (let i = 0, len = strArr.length; i < len; i++) {
            if (strArr[i] != "") {
                if (strArr[i].charAt(0) == "<")
                    result.push(this.getSingleTextFlow(strArr[i].substr(1)));
                else
                    result.push({ text: strArr[i], "style": {} });
            }
        }
        return result;
    }

    private static getSingleTextFlow(str: string): egret.ITextElement {
        let textFlow: any = { "style": {} };
        // let styStr = str.match(/\((.)\)/g);
        let strArr = str.match(/\((.+?)\)/g) || [];
        let flag: string;
        let repStr: string;
        let imgCount = 0;
        for (let i = 0, len = strArr.length; i < len; i++) {
            let s = strArr[i].replace(/[\(\)]/g, "");
            flag = s.charAt(0).toLocaleUpperCase();
            switch (flag) {
                case this.STYLE_COLOR:
                    let col = s.slice(1);
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
                    let arr = s.split("_");
                    textFlow.style.img = arr;
                    break;
                default:
                    continue;
            }
            // str = str.replace(`(${strArr[i]})`, "");
        }
        textFlow.text = str.replace(/\((.+?)\)/g, "");
        return textFlow;
    }

    private static generateHTML(str: string): egret.ITextElement[] {
        let HTMLStr = ["FONT", "COLOR", "SIZE", "<B>", "</B>", "<U>", "</U>"];
        //要把大小改小写才能识别
        for (let i = 0, len = HTMLStr.length; i < len; i++) {
            let rep = RegExp(`${HTMLStr[i]}`, "g");
            str = str.replace(rep, HTMLStr[i].toLocaleLowerCase());
        }
        return new egret.HtmlTextParser().parser(str);
    }

    /**返回通用格式  <(c0x00)内容> */
    public static color(str: string, color: string | number): string {
        return `<(c${color})${str}>`;
    }

    /**富文本禁止内容 */
    public static textBanWord(str: string): string {
        // if (DEBUG) {
        // return str;
        // }
        str = str.replace(/[<>]/g, "*");
        return str;
    }

    /**识别超链接类型 重富文本读取参数*/
    public static hrefType(str: string, ...param): void {
        if (!str) return;
        let arr = str.split(':');
        switch (arr[0]) {
            case 'win':
                let arr1 = arr[1].split("#");
                App.ViewManager.openTab(arr1[0], parseInt(arr1[1]), parseInt(arr1[2]));
                break;
            case 'npc':
                App.VisitManager.goToNpc(parseInt(arr[1]));
                break;
            case 'pass':
                if (GameCache.map.mapConfig.type == SceneType.NORMAL_FIELD) {
                    Proxy.copy.sendEnterFB(GlobalVar.GUAJI_SCENE);
                } else {

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
                } else if (GameCache.map.mapConfig.type == SceneType.GUA_JI) {
                    App.ViewManager.open(ViewConst.CHUANGGUAN);
                }
                break;
            case 'item':
                let dataArr = arr[1].split("_");
                let view = new ViewProp();
                if (dataArr[1] == "-1") {
                    //类型为时装时
                    view.itemData = GameConfig.fashion[dataArr[0]];
                } else {
                    view.itemData = GameConfig.item[dataArr[0]];
                }
                App.ViewManager.open(ViewConst.ITEMTIPS, view);
                break;
            case 'role':
                Proxy.rank.askRoleInfo(parseInt(arr[1]));
                break;
        }
        return
    }


    /**数字缩写 */
    public static numAbbreviate(num): string {
        return
    }

    /**图文混排
     * force 为强制先回收组内图片
     */
    public static generateEmoji(label: eui.Label, group, force = false) {
        label.textHeight;
        let lineArr = label['linesArr'];
        let picArr = label["picArr"] || [];
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
        let idx = 0;
        let tary = 0 + label.y;
        let count = 0;

        for (let i = 0; i < lineArr.length; i++) {
            let line = lineArr[i];
            let tarx = 0 + label.x;
            //检索每行富文本
            for (let e = 0; e < line.elements.length; e++) {
                let item = line.elements[e];
                if (item.style.img && item.text) {
                    let arr = item.style.img;
                    let emoji: eui.Image = (label["picArr"] && label["picArr"][count]);
                    let w = item.style.size ? item.style.size : label.size;
                    if (!emoji) {
                        emoji = ObjectPool.get(eui.Image);
                        emoji.name = "emoji";
                        picArr.push(emoji);
                        group.addChild(emoji);
                    }
                    emoji.source = StringUtils.substitute(GlobalVar.EMOJI_TYPE[arr[0]], arr[1]);
                    let tx: egret.Texture = RES.getRes(emoji.source);
                    if (tx) {
                        emoji.scaleX = (parseInt(arr[3]) || w) / tx.textureWidth;
                        emoji.scaleY = (parseInt(arr[2]) || w) / tx.textureHeight;
                    } else {
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
        let recycleArr = picArr.length - count > 0 ? picArr.splice(count, picArr.length - count) : [];
        for (let i = 0; i < recycleArr.length; i++) {
            let img = recycleArr[i] as eui.Image;
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
    }
}