/*
 * @Description: 按钮，用作于副本的自定义使用道具或者购买BUFF
 * @Author: xiejunwei
 * @Date: 2019-09-04 17:06:01
 * @LastEditTime: 2019-09-11 20:55:54
 */
class BuffCustomBtn extends BaseCustComponent {
    public constructor() {
        super();
        this.skinName = "CustomBtnSkin";
    }

    public iconDisplay: eui.Image;
    public labelDisplay: eui.Label;

    private _enabled: boolean = true;

    protected childrenCreated(): void {
        super.childrenCreated();
        this.addEvent(egret.TouchEvent.TOUCH_BEGIN, this, () => {
            this.iconDisplay.scaleX = this.iconDisplay.scaleY = 0.9;
        });
        this.addEvent(egret.TouchEvent.TOUCH_END, this, () => {
            this.iconDisplay.scaleX = this.iconDisplay.scaleY = 1;
        });
        this.addTouchEvent(this, this.action);
    }

    protected dataChanged(): void {
        super.dataChanged();
        this.initData();
    }

    public dispose(): void {
        super.dispose();
    }

    private initData(): void {
        let id = this.data;
        let conf = GameConfig.customBtn[id];
        if (!conf) return;
        this.iconDisplay.source = RES_DIR_BTN + conf.icon + ".png";
    }

    public set enabled(val) {
        this._enabled = val;
    }


    private action(): void {
        let id = this.data;
        let conf = GameConfig.customBtn[id];
        if (!conf) return;
        switch (conf.configure.type) {
            case "win":
                /** 如果是复活界面 */
                if(conf.configure.value == "REVIVE"){
                   if(GameCache.revive.reveiveList.length == 0){
                       GlobalFun.SysMsg(Language.lang.lcn14);
                     return ;
                   }
                }
                App.ViewManager.open(conf.configure.value);
                break;
            case "item":
                break;
            case "buff":
                // App.ViewManager.open()
                break;
        }
    }

}