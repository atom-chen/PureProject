class CMovieDataCache extends BaseClass {
    public static ins(): CMovieDataCache {
        return super.ins() as CMovieDataCache;
    }

    private _dataDic: Object;

    public constructor() {
        super();
        this._dataDic = {};

        App.TimerManager.add(10000, this.check, this, 0);
    }

    public printData(): void {
        let dic = this._dataDic;
        let data: CMovieData;
        for (let k in dic) {
            data = dic[k];
            data.printData();
        }

        dic = McDataManager.mcDataPool;
        let md: McDataRf;
        for (let k in dic) {
            md = dic[k];
            md.printData();
        }
    }

    private check(): void {
        let dic = this._dataDic;
        let data: CMovieData;

        let time: number = App.TimerManager.getSyncTime();
        for (let k in dic) {
            data = dic[k];
            if (data.disposeTime > 0) {
                if (data.disposeTime <= time) {
                    data.dispose();
                    delete dic[k];
                }
            }
        }
    }

    public clearEffect(): void {
        let dic = McDataManager.mcDataPool;
        let time: number = App.TimerManager.getSyncTime();
        let md: McDataRf;
        for (let k in dic) {
            md = dic[k];
            if (md.disposeTime > 0) {
                if (md.disposeTime <= time) {
                    md.dispose();
                    delete dic[k];
                }
            }
        }
    }

    public getData(key: string): CMovieData {
        if (this._dataDic[key] == null) {
            this._dataDic[key] = ObjectPool.get(CMovieData);
            this._dataDic[key].isDispose = false;
            this._dataDic[key].url = key;
        }
        return this._dataDic[key];
    }

    // public deleteBykey(key: string): void {
    //     let data: CMovieData = this._dataDic[key];
    //     if (data) {
    //         data.dispose();
    //         delete this._dataDic[key];
    //     }
    // }


}

class CMovieData extends egret.HashObject {
    public url: string;
    private _data: Object;
    private _mcArr: CMovieClip[];
    private _counts: number = 0;
    // private static _factory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory();
    public disposeTime: number = 0;
    public isDispose: boolean = false;
    public level: number = 0;
    public constructor() {
        super();
        this._data = {};
        this._mcArr = [];

    }
    /**获取资源，没有则尝试加载**/
    public getMovieClipData(dir: number = -1): egret.MovieClipData {
        if (this._data[dir])
            return this._data[dir];
        let url: string = dir > -1 ? (this.url + "_" + dir) : this.url;
        let self = this;

        CMovieDataLoader.ins().addLoader(url, dir, this);
        // let fac = CMovieData._factory;
        // RES.getResByUrl(url + ".png", function (t) {
        //     RES.getResByUrl(url + ".json", function (d) {
        //         fac.texture = t;
        //         fac.mcDataSet = d;
        //         this.onComplete(dir, fac.generateMovieClipData());
        //         fac.clearCache();
        //     }, self, RES.ResourceItem.TYPE_JSON);
        // }, self, RES.ResourceItem.TYPE_IMAGE);
    }

    onComplete(dir: number, data: any): void {
        if (data) {

        }
        if (this._data == null) {
            this.dispose();
            return;
        }
        this._data[dir] = data;
        let i: number = 0;
        let arr: CMovieClip[] = this._mcArr;
        let a: number = this._counts;
        for (; i < a; i++) {
            let mc: CMovieClip = arr[i];
            if (mc.curLoaDir == dir) {
                mc.setMCData(data);
            }
        }
    }

    public addTarget(mc: CMovieClip): void {
        let arr: CMovieClip[] = this._mcArr;
        let i: number = arr.indexOf(mc);
        if (i == -1) {
            this.disposeTime = 0;
            this._counts++;
            arr.push(mc);

        }
    }

    public removeTarget(mc: CMovieClip): void {
        let arr: CMovieClip[] = this._mcArr;
        let i: number = arr.indexOf(mc);
        if (i > -1) {
            arr.splice(i, 1);
            this._counts--;
            if (this._counts <= 0) {
                CMovieDataLoader.ins().remove(this);
                this.disposeTime = App.TimerManager.getSyncTime() + 10000;
            }
        }
    }

    public get count(): number {
        return this._counts;
    }

    public dispose(): void {
        let dic: Object = this._data;
        this.isDispose = true;
        for (let dir in dic) {
            if (parseInt(dir) > - 1) {
                if (RES.destroyRes(this.url + "_" + dir + ".png")) {
                    // console.log("delete CMovieData Success：" + this.url + "_" + dir);
                }
                RES.destroyRes(this.url + "_" + dir + ".json");
            } else {
                RES.destroyRes(this.url + ".png");
                RES.destroyRes(this.url + ".json");
            }
        }
        this._data = {};
        this.level = 0;
        ObjectPool.push(this);
    }

    public printData(): void {
        let dic: Object = this._data;
        console.log("disposeTime : " + this.disposeTime);
        for (let dir in dic) {
            if (parseInt(dir) > - 1) {
                console.log("$$ CMovieData Cache：" + this.url + "_" + dir);
            } else {
                console.log("$$ CMovieData Cache：" + this.url);
            }
        }
    }
}



class McDataManager {

    /**mc数据池 */
    public static mcDataPool = {};

    private static mcDataFactory: egret.MovieClipDataFactory;

	/**
	 * 根据mc名字获取mc数据
	 */
    static getMovieClipDataByName(mcName: string): egret.MovieClipData {
        let rf: McDataRf = this.mcDataPool[mcName];
        if (rf) {
            rf.addCount();
            return rf.data;
        }
        return null;
    }

	/**
	 * 根据mc名字设置mcdata
	 * mcName mc名字
	 */
    static setMovieClipDataByName(mcName: string, movieClipDataSet?: any, texture?: egret.Texture, frameRate?): void {
        if (!this.mcDataPool[mcName]) {
            if (texture && movieClipDataSet) {
                if (!this.mcDataFactory) {
                    this.mcDataFactory = new egret.MovieClipDataFactory();
                }
                this.mcDataFactory.texture = texture;
                this.mcDataFactory.mcDataSet = movieClipDataSet;
                let movieClipData = this.mcDataFactory.generateMovieClipData();
                movieClipData.frameRate = frameRate ? frameRate : movieClipData.frameRate;
                if (movieClipData.frameRate >= 24) {
                    movieClipData.frameRate = 8;
                }
                let rf: McDataRf = ObjectPool.get(McDataRf);
                rf.data = movieClipData;
                rf.mcName = mcName;
                this.mcDataPool[mcName] = rf;
                this.mcDataFactory.clearCache();
            }
        } else {

        }
    }

	/**
	 * 根据mc名字删除mcdata
	 */
    static removeMovieClipDataByName(mcName: string): void {
        let rf: McDataRf = this.mcDataPool[mcName];
        if (rf) {
            rf.removeCount();
        }
        MovieClipLoader.ins().removeUrl(mcName); //先放这里吧 严格来讲逻辑不对
    }
}

class McDataRf {
    public data: egret.MovieClipData;
    public disposeTime: number = 0;
    public mcName: string = "";
    private _counts: number = 0;

    public addCount(value: number = 1): void {
        this._counts = this._counts + value;
        this.disposeTime = 0;
    }

    public removeCount(value: number = 1): void {
        this._counts = this._counts - value;
        if (this._counts <= 0) {
            this.disposeTime = App.TimerManager.getSyncTime() + 30000;
        }
    }

    public printData(): void {
        console.log("disposeTime : " + this.disposeTime);
        if (this.mcName) {
            console.log("$$ effect：" + this.mcName);
        }
    }

    public dispose(): void {
        if (this.mcName) {
            if (RES.destroyRes(this.mcName + ".png")) {
                //console.log("delete effect " + this.mcName + " success");
            }
            RES.destroyRes(this.mcName + ".json");
        }
        this.data = null;
        this.disposeTime = 0;
        this._counts = 0;
        this.mcName = null;
        ObjectPool.push(this);
    }
}
