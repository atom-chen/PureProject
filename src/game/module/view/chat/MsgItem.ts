/*
 * @Description: 聊天条目
 * @Author: xiejunwei
 * @Date: 2019-09-30 17:32:23
 */
class MsgItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public icon: eui.Image;
    public t0: eui.Label;
    public lvl: eui.Label;
    public roleName: eui.Label;
    public g: eui.Group;
    public vip: eui.Image;

    protected childrenCreated(): void {
        super.childrenCreated();
        // this.addEvent(egret.TextEvent.LINK, this.t0, this.onLink);
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data.message) return;

        // this.removeEventListener(egret.TextEvent.LINK, this.onLink, this.t0,true);
        // this.addEvent(egret.TextEvent.LINK, this.t0, this.onLink);
        this.t0.removeEventListener(egret.TextEvent.LINK, this.onLink, this);
        this.t0.addEventListener(egret.TextEvent.LINK, this.onLink, this);

        this.skinName = this.data.playerId == GameCache.hero.mainPro.pro(PropId.AP_ACTOR_ID) ? "MsgItem2Skin" : "MsgItemSkin";
        this.roleName.text = this.data.playerName;
        this.icon.source = GlobalFun.getRoleIcon(this.data.job, this.data.sexual);//RES_DIR_ROLE_ICON + "role_" + this.data.job + this.data.sexual + ".png";
        this.lvl.text = this.data.lvl;
        let vipLvl = !this.data.viplvl ? 0 : this.data.viplvl;
        this.vip.source = "chat_json.chat_vip_" + vipLvl + "_png";
        this.t0.textFlow = TextFlowUtils.generateTextFlow(this.data.message);
        App.FrameHandler.add(this.printEmoji, this, true);
    }

    public dispose(): void {
        super.dispose();
        this.t0.removeEventListener(egret.TextEvent.LINK, this.onLink, this);
    }

    private printEmoji() {
        TextFlowUtils.generateEmoji(this.t0, this.g, true);
    }

    private onLink(e: egret.TextEvent): void {
        let text = e.text;
        TextFlowUtils.hrefType(text);
    }

}