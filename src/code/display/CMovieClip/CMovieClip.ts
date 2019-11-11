class CMovieClip extends egret.MovieClip {
    public curLoaDir: number;
    private _dirNum: number;

    protected _data: CMovieData;

    public constructor() {
        super();
        this.touchEnabled = false;
    }

    //设置播放源 key资源路径 dirNum方向数
    public setSource(key: string, dirNum: number = 5): void {
        this.removeSource();
        this._dirNum = dirNum;
        this._data = CMovieDataCache.ins().getData(key);
        this._data.addTarget(this);
    }

    protected removeSource(): void {
        if (this._data) {
            this._data.removeTarget(this);
            this._data = null;
        }
        this.visible = false;
        this.movieClipData = null;
        this.curLoaDir = -1;
    }

    /**开始加载资源
     * @param dir:方向
     */
    public load(dir: number = -1): void {
        // if (this._dirNum == 5) //如果是5方向的，看看是否需要取反
        // {
        //     let needChange: number = DirUtil.isScaleX(dir);
        //     if (needChange > 0) {
        //         this.scaleX = -1;
        //         dir = needChange;
        //     }
        //     else {
        //         this.scaleX = 1;
        //     }   
        // }
        // this.curLoaDir = dir;
        // this.getMCData();
    }

    public disposeSource(): void {
        this.removeSource();
        this.stop();
        
    }

    public dispose():void{
        this.disposeSource();
        App.DisplayUtils.removeFromParent(this);
        ObjectPool.push(this);
    }

    private getMCData():void{
        let md:egret.MovieClipData = this._data.getMovieClipData(this.curLoaDir);
        if(md){
            this.setMCData(md);
        }
    }

    public setMCData(data: egret.MovieClipData): void {
        this.movieClipData = data;
        if(data){
            this.visible = true;
        }
    }

    public setFrame(index: number) {
        if (this.movieClipData != null)
            this.gotoAndStop(index);
        
    }

}