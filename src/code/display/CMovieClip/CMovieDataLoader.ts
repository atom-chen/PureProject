class CMovieDataLoader {

	public constructor() {
	}

	static ins(): CMovieDataLoader {
		if (!CMovieDataLoader["instance"]) {
			CMovieDataLoader["instance"] = new CMovieDataLoader();
		}
		return CMovieDataLoader["instance"];
	}

	private loaderList_A: CMovieDataLoaderItem[] = [];
	private loaderList_B: CMovieDataLoaderItem[] = [];
	private loaderDic: Object = {};

	private loadingConut: number = 0;

	_factory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory();

	addLoader(url, dir, item: CMovieData) {
		let arr = this.loaderDic[item.hashCode];
		if (!arr) {
			arr = this.loaderDic[item.hashCode] = [];
		}
		// if (this.loaderDic[item.hashCode]) {
		// 	this.loaderDic[item.hashCode].isDelete = true;
		// 	delete this.loaderDic[item.hashCode];
		// }
		let l: CMovieDataLoaderItem = ObjectPool.get(CMovieDataLoaderItem);
		l.isDelete = false;
		l.url = url;
		l.tar = item;
		l.dir = dir;
		if (this.loadingConut >= 3) {
			//this.loaderDic[item.hashCode] = l;
			if (item.level == 1) this.loaderList_A.push(l);
			else this.loaderList_B.push(l);

			arr.push(l);
		} else {
			this.load(l);
		}
	}

	private load(loader: CMovieDataLoaderItem) {
		this.loadingConut++;

		let fac = this._factory;
		let url = loader.url;
		let item = loader.tar;
		let dir = loader.dir;
		let self = this;
		//delete this.loaderDic[item.hashCode];

		let texture;
		let json;
		let isRemove = false;
		let com = (res) => {
			if(isRemove) return;
			if(!res){ //加载失败了
				console.log("加载失败，跳过", url);
				isRemove = true;
				self.loadingConut--;
				self.loadNext();
				return;
			}
			if (!texture || !json) return;
			self.loadingConut--;
			ObjectPool.push(loader);
			if (loader.isDelete) {
				//RES.destroyRes(url + ".png");
				//RES.destroyRes(url + ".json");
				self.loadNext();
				return;
			}
			fac.texture = texture;
			fac.mcDataSet = json;
			item.onComplete(dir, fac.generateMovieClipData());
			fac.clearCache();
			self.loadNext();
		}

		RES.getResByUrl(url + ".png", function (t) {
			texture = t;
			com(t);
		}, self, RES.ResourceItem.TYPE_IMAGE);

		RES.getResByUrl(url + ".json", function (d) {
			json = d;
			com(d);
		}, self, RES.ResourceItem.TYPE_JSON);
	}

	private loadNext(): void {
		let obj = this.loaderList_A.pop();
		if(!obj) obj = this.loaderList_B.pop();
		if (obj) {
			if (!obj.isDelete)
				this.load(obj);
			else {
				ObjectPool.push(obj);
				this.loadNext();
			}
		}
	}

	remove(cm: CMovieData) {
		let t: CMovieDataLoaderItem[] = this.loaderDic[cm.hashCode];
		if (t) {

			// t.isDelete = true;
			// delete this.loaderDic[cm.hashCode];
			for (let i of t) {
				i.isDelete = true;
				//console.log("UNLOAD#1", i.url);

			}
			delete this.loaderDic[cm.hashCode];
		}
	}

}

class CMovieDataLoaderItem {
	url: string;
	tar: CMovieData;
	dir;
	isDelete;
}