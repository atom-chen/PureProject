// TypeScript file
class LoadingPage extends BaseEuiWindow {

    static get ins(): LoadingPage {
        LoadingPage["instance"] = LoadingPage["instance"] || new LoadingPage();
        return LoadingPage["instance"];
    }

    public constructor() {
        super();
        this.createView();
    }

    private loadBg: egret.Bitmap;
    private proBg: egret.Bitmap;
    public pro: egret.Bitmap;
    private versionText: egret.TextField;

    private imgStr: string[] = ["bar.png", "blank.png"];

    private createView(): void {
        this.loadBg = new egret.Bitmap();
        this.addChild(this.loadBg);
        this.proBg = new egret.Bitmap();
        this.addChild(this.proBg);
        this.pro = new egret.Bitmap();
        this.addChild(this.pro);
        this.versionText = new egret.TextField();
        this.addChild(this.versionText);
        this.versionText.size = 18;
        this.versionText.textColor = 0x000000;

        this.loadImg();
    }

    private loadImg(): void {
        RES.getResByUrl("res/images/bg/loginBg.jpg", (t) => {
            this.loadBg.texture = t;
            this.loadBg.x = (App.StageUtils.getWidth() - this.loadBg.width) >> 1;
            // SDK.ins().hide();
            this.versionText.x = this.loadBg.x;
        })
        RES.getResByUrl("res/login/blank.png", (t) => {
            this.proBg.texture = t;
            this.proBg.x = (App.StageUtils.getWidth() - this.proBg.width) >> 1;
            this.proBg.y = ((App.StageUtils.getHeight() - this.proBg.height) >> 1) + 250;
        }, this, RES.ResourceItem.TYPE_IMAGE);

        RES.getResByUrl("res/login/bar.png", (t) => {
            this.pro.texture = t;
            this.pro.x = (App.StageUtils.getWidth() - 261) >> 1;
            this.pro.y = ((App.StageUtils.getHeight() - this.pro.height) >> 1) + 250 - 1;

        }, this, RES.ResourceItem.TYPE_IMAGE);
    }

    public showProgress(n: number, str: string): void {
        if (n == 10) return;
        LoadingPage["instance"].changePro(n);
    }

    public showVersion(val) {
        LoadingPage["instance"].changeVersion(val);
    }

    public changeVersion(val) {
        if (this.versionText)
            this.versionText.text = StringUtils.substitute(Language.lang.version, val);
    }

    private tw;
    public changePro(n): void {
        if (this.tw) {
            egret.Tween.removeTweens(this.pro);
            this.tw = null;
        }
        let time = n >= 100 ? 100 : 500;
        let target = n >= 100 ? 100 : n;
        this.tw = egret.Tween.get(this.pro);
        this.tw.to({ width: target / 100 * 261 }, time);
    }

    public dispose(): void {
        super.dispose();
        if (this.tw) {
            egret.Tween.removeTweens(this.pro);
            this.tw = null;
        }
    }
}