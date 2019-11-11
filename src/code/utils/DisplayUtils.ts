/**
 * Created by yangsong on 2014/11/24.
 * 显示对象工具类
 */
class DisplayUtils extends BaseClass {

	/**
	 * 从父级移除child
	 * @param child
	 */
	public removeFromParent(child: egret.DisplayObject) {
		if (!child || child.parent == null)
			return;
		child.parent.removeChild(child);
	}

	/**画弧形 shape图形对象，radius圆弧半径，angle角度，linecolor弧线颜色，line弧线粗细*/
	public drawArc(shape: egret.Shape, radius: number, angle: number, lineColor, line, anticlockwise?: boolean): egret.Shape {
		if (shape == null) {
			shape = new egret.Shape();
		}
		shape.graphics.clear();
		shape.graphics.lineStyle(line, lineColor);
		shape.graphics.drawArc(0, 0, radius, 0, (angle * Math.PI / 180), anticlockwise);
		shape.graphics.endFill();
		return shape;
	}

	private shakingList = {}

	/**
	 * 震动指定的显示对象
	 * @param target 震动的对象
	 * @param range 震动幅度 单位像素
	 * @param duration 一组震动（四方向）持续的时间
	 * @param times 震动的次数 （4方向为一次）
	 * @param condition 条件 传入判断的方法 执行返回false则不执行震动
	 */
	public shakeIt(target: egret.DisplayObject,
		range: number,
		duration: number,
		times: number = 1,
		condition: Function = () => {
			return true
		}) {
		if (!target || times < 1 || !condition()) return;
		let isShaking = App.DisplayUtils.shakingList[target.hashCode];
		if (isShaking) {
			// DebugUtils.warn("shake twice");
			return;
		}
		App.DisplayUtils.shakingList[target.hashCode] = true;
		let shakeSet = [
			{ anchorOffsetX: 0, anchorOffsetY: -range },
			{ anchorOffsetX: -range, anchorOffsetY: 0 },
			{ anchorOffsetX: range, anchorOffsetY: 0 },
			{ anchorOffsetX: 0, anchorOffsetY: range },
			{ anchorOffsetX: 0, anchorOffsetY: 0 },
		]
		egret.Tween.removeTweens(target);
		let delay: number = duration / 5;
		egret.Tween.get(target).to(
			shakeSet[0], delay
		).to(
			shakeSet[1], delay
			).to(
			shakeSet[2], delay
			).to(
			shakeSet[3], delay
			).to(
			shakeSet[4], delay
			).call(() => {
				delete App.DisplayUtils.shakingList[target.hashCode];
				App.DisplayUtils.shakeIt(target, range, duration, --times);
			}, this
			);
	}

	/**
	 * 闪动一个对象
	 * @params  {any} obj 需要闪动的对象
	 * @params  {boolean} isFlash 是否闪动
	 * @params  {number} t 闪动间隔
	 * @returns void
	 */
	public flashingObj(obj: any, isFlash: boolean, t: number = 1000): void {
		this.tweenProp(obj, isFlash, { alpha: 0 }, { alpha: 1 }, t);
	}

	/**在两个属性之间重复缓动变化 */
	public tweenProp(obj, isPlay, pro1?, pro2?, t: number = 1000): void {
		if (isPlay) {
			egret.Tween.removeTweens(obj);
			egret.Tween.get(obj, { loop: true }).to(pro1, t).to(pro2, t);
		}
		else
			egret.Tween.removeTweens(obj);
	}

	/**
 * 创建一个文本
 * descStr  文本内容
 * x
 * y
 * color 文字颜色
 * align 文字对齐方式   center|中心   left|左  right|右
 * fontSize  文字大小
 * 
 */
	public newTextField(descStr: string, x: number = 0, y: number = 0, color: number = 0xffffff, align: string = "center", fontSize: number = 20): egret.TextField {
		var newTextField = new egret.TextField();
		//newTextField.fontFamily = "SimHei";
		newTextField.x = x;
		newTextField.y = y;
		newTextField.text = descStr;
		newTextField.size = fontSize;
		newTextField.textColor = color;
		newTextField.textAlign = align;
		return newTextField
	}


	/**隐藏tabBar控件页签，不会影响索引，只是单纯的不可见加重新排序 */
	public tabBarIndexShow(tab: eui.TabBar, index: number, show: boolean): void {
		if (tab.numChildren > index) {
			let item = (tab.getChildAt(index) as eui.ItemRenderer);
			item.includeInLayout = show;
			item.visible = show;
		}
	}
	/**显示TabBar控件在显示中的第一个页签,如果没有页签，返回false */
	public tabBarShowFirst(tab: eui.TabBar): boolean {
		tab.validateNow();
		let len = tab.numChildren;
		if (!len) return false;
		for (let i = 0; i < len; i++) {
			if ((tab.getChildAt(i) as eui.ItemRenderer).includeInLayout) {
				tab.selectedIndex = i;
				return true;
			}
		}
		return false;
	}

	/**给一个容器增加滑动功能
	 * func  滑动回调，返回一个滑动了差值，填空表示移除
	 */
	public slideContent(content: egret.DisplayObjectContainer, func, thisc): void {
		content["$slideHand"] = [func, thisc];
		content.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.slideEvent, content);
		content.removeEventListener(egret.TouchEvent.TOUCH_END, this.slideEvent, content);
		if (func) {
			content.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.slideEvent, content);
			content.addEventListener(egret.TouchEvent.TOUCH_END, this.slideEvent, content);
		}

	}
	private slideEvent(e: egret.TouchEvent): void {
		switch (e.type) {
			case egret.TouchEvent.TOUCH_BEGIN:
				this["$slideValue"] = [e.stageX, e.stageY];
				break;
			case egret.TouchEvent.TOUCH_END:
				if (this["$slideValue"]) {
					this["$slideHand"][0].apply(this["$slideHand"][1], [e.stageX - this["$slideValue"][0], e.stageY - this["$slideValue"][1]]);
					this["$slideValue"] = null;
				}
				break;
		}
	}

	public buttonDownTime(button: eui.Button, time: number, exLabel: any[] = []): void {
		if (button['downTimer'] <= 0 || !button['downTimer']) {
			button['restLabel'] = button.label;
		}
		button['downTimer'] = time;
		button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, button);
		App.TimerManager.addDelay(0, 1000, 0, this.onButtonTime, button, null, null, exLabel);
		// this.onButtonTime.apply(button);
	}

	private onButtonTime(exLabel: any[] = []): void {
		let but: eui.Button = this as any;
		if (but['downTimer'] <= 0) {
			but.label = but['restLabel'];
			but.dispatchEvent(new egret.TouchEvent(egret.TouchEvent.TOUCH_TAP));
			return;
		}
		but.label = but['restLabel'] + `(${but['downTimer']})`;
		if (exLabel) {
			(exLabel[0] as eui.Label).text = StringUtils.substitute(exLabel[1], `${but['downTimer']}`);
		}
		but['downTimer']--;
	}
	private onTap(): void {
		let but: eui.Button = this as any;
		but['downTimer'] = null;
		but.label = but['restLabel'];
		but.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTap, but);
		App.TimerManager.removeAll(but);
	}



	// /***/
	// public setListData(list: eui.List, data: any[]): void {
	// 	let dp = list.dataProvider as eui.ArrayCollection;
	// 	dp ? dp.source = data : list.dataProvider = new eui.ArrayCollection(data);
	// }

	/**圆形布局 */
	public circularLayout(con: egret.DisplayObjectContainer, radius: number, startAngle = 0, x = 0, y = 0): void {
		let len = con.numChildren;
		let angle;
		let item;
		for (let i = 0; i < len; i++) {
			angle = (360 / len * i - 90 + startAngle) / 180 * Math.PI;
			item = con.getChildAt(i);
			item.x = radius * Math.cos(angle) + x;
			item.y = radius * Math.sin(angle) + y;
		}
	}

	/**为富文本添加超链接监听 注意：仅用于父类含有addEvent方法*/
	public addLinkonText(thisc, laber: eui.Label): void {
		thisc.addEvent(egret.TextEvent.LINK, laber, (e: egret.TextEvent) => {
			TextFlowUtils.hrefType(e.text);
		});
	}

	/**给一个对象加入一个特效 */
	public addEffectToObj(content: egret.DisplayObjectContainer, key: string, playCount: number = -1, x: number = 0, y: number = 0, compFun?: Handler): MovieClip {
		let eff = MovieClip.create();
		content.addChild(eff);
		eff.x = x;
		eff.y = y;
		eff.loadFile(RES_DIR_EFF + key, playCount, compFun);
		return eff;
	}

	/**
	 * 添加点击缩放效果
	 */
	public addClickEff(content): void {
		// this.removeClickEff(content);
		if (!content["clickEff"]) {
			content.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleFunc, content);
			content.addEventListener(egret.TouchEvent.TOUCH_END, this.scaleFunc, content);
			content.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.scaleFunc, content);
		}
		content["clickEff"] = 1;
	}

	private scaleFunc(e): void {
		if (this instanceof eui.TabBar) {
			let item = this.getChildAt(this.selectedIndex);
			if (item["ico"]) {
				item["ico"].scaleX = item["ico"].scaleY = e.type != "touchBegin" ? 1 : 0.95;
			} else {
				item.scaleX = item.scaleY = e.type != "touchBegin" ? 1 : 0.95;
			}
		} else {
			this["scaleX"] = this["scaleY"] = e.type != "touchBegin" ? 1 : 0.95;
		}
	}

	public removeClickEff(content): void {
		if (content["clickEff"]) {
			content.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.scaleFunc, content);
			content.removeEventListener(egret.TouchEvent.TOUCH_END, this.scaleFunc, content);
			content.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.scaleFunc, content);
			delete content["clickEff"];
		}
	}
}
