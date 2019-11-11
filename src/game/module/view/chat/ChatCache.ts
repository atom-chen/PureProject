/*
 * @Description: 聊天数据
 * @Author: xiejunwei
 * @Date: 2019-09-30 14:28:58
 */
class ChatCache extends BaseCache {

    public chatData = {};
    public previewChat = [];
    public sysInfo = [];

    public showOffList: StdItem[] = []; //炫耀道具组

    public constructor() {
        super();
    }

    clear() {
        this.showOffList = [];
        this.chatData = {};
        this.previewChat = [];
        this.sysInfo = [];
    }

    public createItemLink(id: number): string {
        let std: StdItem = GameConfig.item[id];
        if (std) {
            let color = ItemUtils.getItemColor(std.showQuality);
            let b = `<(u)(c${color})(eitem:${std.id}_${std.type})${std.name}>`;
            return b;
        }
        return "";
    }

    public createRoleLink(roleId, roleName, sex = 1): string {
        let color = ColorUtil.C_GREEN;
        let b = `<(u)(c${color})(erole:${roleId})${roleName}>`;
        return b;
    }

    public createCustomLink(mof: string, text: string, color: number = ColorUtil.GREEN): string {
        return `<(u)(c${color})(e${mof})${text}>`;
    }

    public createServerText(str: string): string {
        // let strArr: string[] = str.match(/ *\[[^)]*\] */g) || [];
        let strArr: string[] = str.match(/\[(.+?)\]/g) || [];
        let sendT = str;
        let eqNameArr = [];
        for (let i = 0; i < strArr.length; i++) {
            let a = strArr[i].replace(/[\[\]]/g, "");
            switch (a[0]) {
                case "#":
                    let value = parseInt(a.slice(1));
                    let b = "<(s" + GlobalVar.EMOJI_SIZE + ")(p0_" + value + ")　>";
                    sendT = sendT.replace(strArr[i], b);
                    break;
                default:
                    for (let j of this.showOffList) {
                        if (j.name == a) {
                            let color = ItemUtils.getItemColor(j.showQuality);
                            let b = `<(u)(c${color})(eitem:${j.id}_${j.type})${j.name}>`;
                            sendT = sendT.replace(strArr[i], b);
                        }
                    }
                    break;
            }
        }
        return sendT;
    }

    public showOffItem(item: StdItem): void {
        this.showOffList.push(item);
        let itemName = `[${item.name}]`;
        let view = new ViewProp();
        view.exData1 = {};
        view.exData1["showOff"] = itemName;
        if (App.ViewManager.isShow(ViewConst.CHAT)) {
            App.MessageCenter.dispatch(MsgConst.CHAT_SHOWOFF, itemName);
        } else {
            App.ViewManager.open(ViewConst.CHAT, view);
        }
    }


    public initChatData(channelId, playerName, playerId, sexual, job, lvl, viplvl, message): void {
        let obj = {
            channelId: channelId,
            playerName: playerName,
            playerId: playerId,
            sexual: sexual,
            job: job,
            lvl: lvl,
            viplvl: viplvl,
            message: message
        }
        if (!this.chatData[channelId]) this.chatData[channelId] = [];
        this.chatData[channelId].push(obj);
        if (channelId != ChatType.SYSTEM) {
            if (this.previewChat.length < 3) {
                this.previewChat.push(obj);
            } else {
                this.previewChat.shift();
                this.previewChat.push(obj);
            }
            App.MessageCenter.dispatch(MsgConst.CHAT_INFO, obj);
        }
    }

    public getPrevireChat(label: eui.Label) {
        let msg = "";
        let len = this.previewChat.length
        for (let i = 0; i < len; i++) {
            let curMsg = this.initChatMsg(this.previewChat[i]);
            if (i < len - 1) {
                msg += (curMsg + "\n");
            } else {
                msg += (curMsg);
            }
        }
        // msg = msg.replace(/\　/g, "");
        label.textFlow = TextFlowUtils.generateTextFlow(msg);
        label.textHeight;
        // let maxHeight = label.parent.height;
        // let check = label['linesArr'].reverse();
        // let textFlow = [];
        // for (let i of check) {
        //     if (i.height > maxHeight) break;
        //     maxHeight -= i.height;
        //     for (let j = 0; j < i.elements.length; j++) {
        //         let obj = {
        //             style: i.elements[j].style,
        //             text: i.elements[j].text
        //         }
        //         textFlow.push(obj);
        //     }
        // }
        // textFlow= textFlow.reverse();
        // label.textFlow = textFlow;
        if (label['linesArr'].length > 2) label.y = label.parent.height - label.height >= 0 ? 1 : label.parent.height - label.height - 1;
        TextFlowUtils.generateEmoji(label, label.parent, true);
    }

    private initChatMsg(obj): string {
        let channelImg = `<(s${16})(p1_${obj.channelId}_18_35)·  · · · >`;
        let name = `<(c${GlobalVar.CHAT_COLOR[obj.channelId]})${obj.playerName} : >`;
        return channelImg + name + obj.message;
    }

    public getSysMessage(label: eui.Label): void {
        let message = GameCache.chat.sysInfo[GameCache.chat.sysInfo.length - 1];
        label.textFlow = TextFlowUtils.generateTextFlow(message);
        TextFlowUtils.generateEmoji(label, label.parent, true);
    }

    /**增加一条系统信息*/
    public addSysMsg(text: string, channel: number = ChatType.SYSTEM): void {
        if (this.sysInfo.length > 20) {
            this.sysInfo.shift();
        }
        let channelImg = `<(s${16})(p1_${channel}_18_35)·  · · · >`;
        let message = channelImg + text;
        this.sysInfo.push(message);
        App.MessageCenter.dispatch(MsgConst.SYS_INFO_MESSAGE, message);
    }
}