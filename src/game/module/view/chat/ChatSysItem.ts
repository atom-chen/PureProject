/*
 * @Description: 系统信息条目
 * @Author: xiejunwei
 * @Date: 2019-10-09 21:25:33
 */
class ChatSysItem extends BaseCustComponent {

    public g: eui.Group;
    public chatLab: eui.Label;

    public constructor() {
        super();
        this.skinName = "ChatSysItemSkin";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addEvent(egret.TextEvent.LINK, this.chatLab, this.onLink);
    }

    private onLink(e: egret.TextEvent): void {
        let text = e.text;
        TextFlowUtils.hrefType(text);
    }

    protected dataChanged(): void {
        super.dataChanged();
        //GameCache.chat.getSysMessage(this.chatLab);
        let message = this.data;
        this.chatLab.textFlow = TextFlowUtils.generateTextFlow(message);
        TextFlowUtils.generateEmoji(this.chatLab, this.g, true);
    }

    public dispose(): void {
        super.dispose();
    }

}