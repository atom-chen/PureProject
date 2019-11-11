class MapImageVo {
	x;
	y;
	w;
	h;
	url;
	scaleX;
	scaleY;
	index:number = 0;

	/**
	 * 判断是否在显示范围内
	*/
	onScreen(tx: number, ty: number, tw: number, th: number):boolean {
		let flag = true;
		let x = this.x - (this.scaleX == -1 ? this.w : 0 ), y = this.y;

		if (x + this.w <= tx) {
			flag = false;
		}
		else if (x >= tx + tw) {
			flag = false;
		}
		else if (y + this.h <= ty) {
			flag = false;
		}
		else if (y >= ty + th) {
			flag = false;
		}
		return flag;
	}
}