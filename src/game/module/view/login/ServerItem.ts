/*
 * @Description: 服务器条目
 * @Author: xiejunwei
 * @Date: 2019-10-10 14:42:29
 */
class ServerItem extends BaseCustComponent {
    public constructor() {
        super();
    }

    public stateTag: eui.Image;
    public stateIcon: eui.Image;
    public sName: eui.Label;

    protected childrenCreated(): void {
        super.childrenCreated();
    }

    protected dataChanged(): void {
        super.dataChanged();
        if (!this.data.server_id) return;
        this.sName.textFlow = TextFlowUtils.generateTextFlow(this.data.name);
        this.stateTag.source = "login_json.login_state_" + this.data.server_status + "_png";
        this.stateIcon.source = "login_json.login_state_p_" + this.data.server_status + "_png";
    }

    public dispose(): void {
        super.dispose();
    }

}