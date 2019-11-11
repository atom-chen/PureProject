class MovieClipLoader {
	public constructor() {
	}

	static ins(): MovieClipLoader {
		if (!MovieClipLoader["instance"]) {
			MovieClipLoader["instance"] = new MovieClipLoader();
		}
		return MovieClipLoader["instance"];
	}

	private count: number = 0;
	private needLoadUrl: string[] = [];
	private loadList = {};
	private loadingDic = {};
	load(mc: MovieClip, url: string) {
		let arr = this.loadList[url];
		if (!arr) {
			arr = this.loadList[url] = [];
		}
		arr.push(mc);
		if (this.loadingDic[url]) return;
		this.needLoadUrl.push(url);
		this.loadNext();
	}

	private loadData(url) {
		this.count++;
		let mctexture;
		let movieClipData;
		let self = this;

		let isRemove = false;
		let com = (res) => {
			if (isRemove) return;
			if (!res) { //加载失败了
				console.log("加载失败，跳过", url);
				isRemove = true;
				self.count--;
				self.loadNext();
				return;
			}

			if (mctexture && movieClipData) {
				self.count--;
				let arr = self.loadList[url];
				if (!arr) {
					return;
				}
				delete self.loadList[url];
				delete self.loadingDic[url];

				for (let mc of arr) {
					mc.resGetComplete(url, mctexture, movieClipData);
				}

				self.loadNext();
			}
		};
		self.loadingDic[url] = 1;

		RES.getResByUrl(url + ".png", function (t) {
			mctexture = t;
			com(t);
		}, self, RES.ResourceItem.TYPE_IMAGE);

		RES.getResByUrl(url + ".json", function (d) {
			movieClipData = d;
			com(d);
		}, self, RES.ResourceItem.TYPE_JSON);
	}

	private loadNext() {
		if (this.count <= 2) {
			let url = this.needLoadUrl.shift();
			if (url) {
				this.loadData(url);
			}
		}
	}

	removeUrl(url) {
		let i = this.needLoadUrl.indexOf(url);
		if (i) {
			this.needLoadUrl.splice(i, 1);
			//console.log("UNLOAD#2", url);
		}
		delete this.loadList[url];
		delete this.loadingDic[url];
	}

}