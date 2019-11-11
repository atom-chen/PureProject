//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {
    private gameApp: GameApp;
    private serverWin: ServerWin;

    public constructor() {
        super();
        eui.Label.default_fontFamily = "Microsoft YaHei";
        egret.TextField.default_fontFamily = "Microsoft YaHei";
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);

    }

    public onAddToStage(event: egret.Event) {
        console.log(DEBUG ? `测试版` : `发布版`, egret.Capabilities.runtimeType);
        // console.log("version", GlobalVar.version);

		/*
         * 忽略掉activity_bg_png，这个资源不用压缩纹理
         */
        // const ignoreResource = (imageResourceInfo: RES.ResourceInfo): boolean => {
        // 	return imageResourceInfo && imageResourceInfo.name === 'activity_bg_png';
        // };
        // RES.processor.map('pack.etc1.ktx', new PackETC1KTXProcessor());
        // RES.processor.map('image', new CompressTextureProcessor(ignoreResource, true));

        RES.setMaxLoadingThread(8);
        RES.setMaxRetryTimes(1);
        this.stage.maxTouches = 1;
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);

        if (DeviceUtils.IsCanvas || DeviceUtils.IsMobile) {
            this.stage.frameRate = 30;
        } else {
            this.stage.frameRate = 60;
        }

        //注入自定义的素材解析器
        this.stage.registerImplementation("eui.IAssetAdapter", new AssetAdapter());
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());

        // //设置跨域访问资源
        // egret.ImageLoader.crossOrigin = "anonymous";

        LocationProperty.init();
        OperatorEgret.init();
        EUIResourceManager.ins().init();
        App.StageUtils.init();
        LayerManager.init();
        App.SoundManager.init(0, 0.5, 0, 0.5);

        this.loadDefaultRes();
    }

    private loadDefaultRes(): void {
        LocationProperty.setLoadProgress(5, "(加载资源配置)");
        ResourceUtils.ins().addConfig("resource/default.res.json?cc=" + Math.random(), "resource/");
        ResourceUtils.ins().loadConfig(this.onConfigComplete, this);
    }

    private onConfigComplete(): void {
        ServerMgr.insertLoading(this);
        LocationProperty.setLoadProgress(10, "(加载资源版本号)");
        ResVersionManager.ins().loadConfig("resVersion.json?cc=" + Math.random(), this.loadResVersionComplate, this);
        // 
    }

    private loadResVersionComplate(): void {
        if (ServerMgr.IsNative) {
            LocationProperty.setLoadProgress(12, "(加载资源版本号2)");
            ResVersionManager.ins().loadConfig2("package.json", this.loadThem, this);
        } else {
            this.loadThem();
        }
        // 
    }

    private loadThem(): void {
        LocationProperty.setLoadProgress(15, "(加载游戏主题文件)");
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.once(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

	/**
	 * 主题文件加载完成
	 */
    private onThemeLoadComplete(): void {
        console.log("加载成功");

        this.gameApp = new GameApp();
        ServerMgr.insertServerSele(this);
        // this.gameApp.start();

    }

    public static closesocket(): void {
        App.Socket.close();
    }

    private onResize(e: egret.Event): void {
        App.StageUtils.resize();
        App.MessageCenter.dispatch(MsgConst.RESIZE_STAGE);
    }

}
