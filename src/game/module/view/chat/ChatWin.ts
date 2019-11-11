/*
 * @Description: 聊天窗口
 * @Author: xiejunwei
 * @Date: 2019-09-30 10:40:16
 */
class ChatWin extends BaseEuiWindow {
    public constructor() {
        super(LayerManager.UI_Main);
        this.skinName = "ChatWinSkin";
    }

    public chatGroup: eui.Group;
    public emojiBtn: eui.Image;
    public chatLab: eui.List;
    public inputText: eui.TextInput;
    public sendBtn: eui.Button;
    public g: eui.Group;
    public tabBtn: eui.TabBar;
    public sc: eui.Scroller;
    public closeGroup: eui.Group;


    public init(): void {
        super.init();
        // this.horizontalCenter = 1;
        // this.bottom = 82;
        this.left = this.right = this.top = this.bottom = 0;
        this.chatLab.itemRenderer = MsgItem;
        this.inputText.maxChars = GameConfig.globalConfig.enterLimit;

    }

    public open(param: ViewProp): void {
        super.open();
        this.addTouchEvent(this.emojiBtn, this.openEmoji);
        this.addTouchEvent(this.tabBtn, this.initChatMsg);
        this.addTouchEvent(this.sendBtn, this.sendText);
        this.addTouchEvent(this.closeGroup, this.closeView);

        this.message(MsgConst.CHAT_INFO, this.addChatMsg);
        this.message(MsgConst.CHAT_SHOWOFF, this.checkShowOffList);
        this.message(MsgConst.SYS_INFO_MESSAGE, this.addSysChatMsg);

        this.inputText.prompt = Language.lang.chat_1;
        if (param && param.exData1 && param.exData1["showOff"]) this.checkShowOffList(param.exData1["showOff"]);
        this.tabBtn.selectedIndex = param ? param.exData2 : 1;
        this.initChatMsg();
    }

    public close(param: ViewProp): void {
        super.close();
        GameCache.chat.showOffList = [];
        this.inputText.text = "";
    }

    private changeState(): void {
        this.currentState = this.tabBtn.selectedIndex == 0 ? "sys" : "nor";
        this.chatLab.itemRenderer = this.tabBtn.selectedIndex == 0 ? ChatSysItem : MsgItem;
    }

    private checkShowOffList(str): void {
        this.inputText.text += str;
    }

    private openEmoji(): void {
        // if (!this.emojiPart) {
        //     this.emojiPart = ObjectPool.get(EmojiPart);
        //     this.emojiPart.data = { func: this.emojiClick, thisc: this };
        //     this.emojiPart.x = 122;
        //     this.emojiPart.y = 168;
        //     this.addChild(this.emojiPart);
        // } else {
        //     this.emojiPart.visible = !this.emojiPart.visible;
        // }
        if (App.ViewManager.isShow(ViewConst.EMOJI)) {
            App.ViewManager.close(ViewConst.EMOJI);
        } else {
            let view = new ViewProp();
            view.exData1 = {};
            view.exData1['func'] = this.emojiClick;
            view.exData1['thisc'] = this;
            App.ViewManager.open(ViewConst.EMOJI, view);
        }
    }

    public emojiClick(arg): void {
        let img = StringUtils.substitute(Language.lang.chat_0, arg);
        this.inputText.text += `[${img}]`;
    }

    private sendText(): void {
        if (ChatMgr.chechIsGMMsg(this.inputText.text)) {
            return;
        }
        let sendT = GameCache.chat.createServerText(this.inputText.text);
        let tar = this.tabBtn.selectedIndex;
        if (tar == ChatType.SYSTEM) return;
        Proxy.chat.sendChatMessage(tar, sendT);
        this.inputText.text = null;
    }

    private toggle = false;
    private initChatMsg(): void {
        this.changeState();
        let tar = this.tabBtn.selectedIndex;
        let chatArr;
        if (tar == 0) {
            chatArr = GameCache.chat.sysInfo.concat();
        } else {
            chatArr = GameCache.chat.chatData[tar] ? GameCache.chat.chatData[tar].concat() : [];
        }
        this.toggle = true;
        this.setListData(this.chatLab, chatArr);
        this.chatLab.validateNow();
        this.autoScroll(true);
    }

    private addChatMsg(msg): void {
        if (msg.channelId != this.tabBtn.selectedIndex) return;
        this.toggle = true;
        this.chatLab.dataProvider['addItem'](msg);
        this.chatLab.validateNow();
        this.autoScroll();
    }

    private addSysChatMsg(msg): void {
        if (ChatType.SYSTEM != this.tabBtn.selectedIndex) return;
        this.toggle = true;
        this.chatLab.dataProvider['addItem'](msg);
        this.chatLab.validateNow();
        this.autoScroll();
    }

    public autoScroll(force = false): void {
        let contains = this.sc.viewport;
        let delta = contains.contentHeight - contains.height
        delta = delta < 0 ? 0 : delta + 6;
        if (force || (delta - contains.scrollV < 130 && delta > 0)) {
            contains.scrollV = delta;
        }
    }
}
