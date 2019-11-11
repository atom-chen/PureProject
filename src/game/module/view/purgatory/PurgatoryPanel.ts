class PurgatoryPanel extends BaseSpriteView {

	public zdl: ZdlPrint;
	public imgEquip: eui.Image;
	public roleSelect: RoleSelect;
	public propList: PropPart;
	public btnUp: eui.Button;
	public btnRsn: eui.Button;
	public btnProp: eui.Button;
	public btnBag: eui.Button;
	public gl: eui.Group;
	public gr: eui.Group;
	public lv: NumberMC;
	public imgName: eui.Image;
	public imgStep: eui.Image;


	public select: number = 0;
	private eqProps: any[];
	private tween: egret.Tween;

	public constructor($parent: egret.DisplayObjectContainer = null) {
		super($parent);
		this.skinName = "PurgatoryPanelSkin";
	}

	public init(): void {
		super.init();
		let hander = Handler.create(this, this.doInit, [], false);
		this.roleSelect.handler = hander;
		this.lv.gap = 21;
		this.lv.alignV = "mid";
	}

	public doInit(): void {
		this.initEquips();
		this.initProp();
		this.initZDL();
	}

	/** 
	 * 初始化角色身上的炼狱装备
	 * @param  {} eqData
	 * @returns void
	 */
	private initEquips(): void {
		let eqData: { [pos: number]: number } = GameCache.purgatory.purgatoryData[this.roleSelect.roleId];
		eqData || (eqData = []);
		let job = GameCache.hero.mainPro.pro(PropId.AP_JOB);
		let icon; let cfg: StdEquippurgatory;
		for (let i = 0; i < 6; i++) {
			let lv = eqData[i];
			let eqItem = (this[`eq${i}`] as ItemBase);
			eqItem.select = i == this.select;
			if (!lv) {
				cfg = GameCache.purgatory.getPurgatoryCfg(i, 1);
				eqItem.filters = FilterUtils.DefaultGrayFilters;
				eqItem.partSource = `purgatory_json.purgatory_part${i}_png`;
			} else {
				cfg = GameCache.purgatory.getPurgatoryCfg(i, lv);
				eqItem.filters = null;
				eqItem.partSource = null;
			}
			icon = cfg.icon[job - 1];
			icon || (icon = cfg.icon[0]);
			eqItem.setIconImg(`${RES_DIR_PURGATORY_ICON}${icon}.png`);
			// 更新当前选择的部位名称
			if (eqItem.select) {
				this.imgName.source = `purgatory_json.${icon}_png`;
				this.lv.value = lv;
				this.lv.includeInLayout = this.lv.visible = this.imgStep.includeInLayout = this.imgStep.visible = lv > 0;
				this.imgEquip.source = `${RES_DIR_PURGATORY_SHOW}${icon}.png`;
				this.imgEquip.filters = !lv ? FilterUtils.DefaultGrayFilters : null;
			}
		}
	}

	/**
	 * 初始化战斗力
	 * @returns void
	 */
	private initZDL(): void {
		let eqData: { [pos: number]: number } = GameCache.purgatory.purgatoryData[this.roleSelect.roleId];
		eqData || (eqData = []);
		this.eqProps = [];
		for (let i in eqData) {
			let lv = eqData[i];
			let cfg = GameCache.purgatory.getPurgatoryCfg(Number(i), lv);
			if (cfg) {
				this.eqProps = GlobalFun.ObjPlusOrMinus(this.eqProps, cfg.attrs);
			}
		}
		let totalProp = GlobalFun.ObjPlusOrMinus(this.eqProps, []);
		// 套装属性
		let rsnData: { [k: number]: number } = GameCache.purgatory.rsnData[this.roleSelect.roleId];
		let rsnLvMap = {};
		for (let lv in rsnData) {
			// 最高共鸣件数
			let num = Math.floor(rsnData[lv] / 2) * 2;
			if (num > 0) {
				let cfgs = GameConfig.purgatoryResonate[lv];
				for (let v in cfgs) {
					if (num < Number(v)) {
						break;
					}
					if (!rsnLvMap[v] || Number(lv) > rsnLvMap[v]) {
						rsnLvMap[v] = Number(lv);
					}
				}
			}
		}
		for (let i in rsnLvMap) {
			let l = rsnLvMap[i];
			let n = Number(i);
			let cfg: StdEquippurgatoryadd = GameConfig.purgatoryResonate[l][n];
			totalProp = GlobalFun.ObjPlusOrMinus(totalProp, cfg.attrs);
		}
		this.zdl.value = ItemUtils.getZdlByProp(totalProp);
	}

	private initProp(): void {
		let data: { [pos: number]: number } = GameCache.purgatory.purgatoryData[this.roleSelect.roleId];
		data || (data = []);
		let lv = data[this.select];
		lv || (lv = 0);
		let cfg1 = GameCache.purgatory.getPurgatoryCfg(this.select, lv);
		let prop1 = [];
		cfg1 && (prop1 = cfg1.attrs);
		let prop2 = [];
		if (lv < GameCache.purgatory.maxLv) {
			let cfg2 = GameCache.purgatory.getPurgatoryCfg(this.select, lv + 1);
			prop2 = cfg2.attrs;
		}
		this.propList.setData(prop1, prop2, this.roleSelect.job, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem2Skin")
	}

	public open(param: ViewProp = null): void {
		this.message(MsgConst.EQUIP_PURGATORY, this.doInit);
		this.addTouchEvent(this.btnUp, this.onBtnUpClick);
		this.addTouchEvent(this.btnRsn, this.onBtnResonateClick);
		this.addTouchEvent(this.btnProp, this.onBtnPropClick);
		this.addTouchEvent(this.gl, this.onItemClick);
		this.addTouchEvent(this.gr, this.onItemClick);
		this.addTouchEvent(this.btnBag, this.onBtnBagClick);
		this.doInit();
	}

	private onItemClick(e: egret.TouchEvent): void {
		if (e.target instanceof EquipItem) {
			this.select = Number(e.target.name);
			this.initEquips();
			this.initProp();
		}
	}

	private onBtnUpClick(): void {
		let maxLv = GameCache.purgatory.maxLv;
		let eqData: { [pos: number]: number } = GameCache.purgatory.purgatoryData[this.roleSelect.roleId];
		eqData || (eqData = []);
		let lv = eqData[this.select];
		lv || (lv = 0);
		// 初始化0级
		if (lv >= maxLv) {
			// 此处可能需要提示
			return;
		}
		let toLv = lv + 1;
		for (let i = maxLv; i > 0; i--) {
			if (i <= lv) break;
			let cfg = GameCache.purgatory.getPurgatoryCfg(this.select, i);
			let itemCount1 = GameCache.bag.itemCount(cfg.cost1.id);
			let itemCount2 = GameCache.bag.itemCount(cfg.cost2.id);
			if (itemCount1 >= cfg.cost1.count && itemCount2 >= cfg.cost2.count && i > toLv) {
				toLv = i;
			}
		}
		let cfgFrom = GameCache.purgatory.getPurgatoryCfg(this.select, lv);
		let cfgTo = GameCache.purgatory.getPurgatoryCfg(this.select, toLv);
		let param: ViewProp = new ViewProp();
		let exData1 = {};
		exData1["roleIdx"] = this.roleSelect.nSlRole;
		exData1["cfgFrom"] = cfgFrom;
		exData1["cfgTo"] = cfgTo;
		param.exData1 = exData1;
		App.ViewManager.open(ViewConst.PURGATORY_UPGRADE, param);
	}

	/**
	 * 共鸣效果
	 * @returns void
	 */
	private onBtnResonateClick(): void {
		let view = new ViewProp();
		view.winTitle = "purgatory_json.purgatory_lab_resonate_png";
		view.firData = [];
		let maxLv = GameCache.purgatory.maxLv;
		let roleId = this.roleSelect.roleId;
		for (let lv = 1; lv <= maxLv; lv++) {
			let num = GameCache.purgatory.getResonateLvNum(roleId, lv);
			let cfgs: StdEquippurgatoryadd[] = GameConfig.purgatoryResonate[lv];
			let part: PropPartResonate = ObjectPool.get(PropPartResonate);
			let props: string[] = [];
			let title;
			for (let n in cfgs) {
				let cfg = cfgs[n];
				title || (title = StringUtils.substitute(Language.lang.purgatoryPropTitle, cfg.suitName, lv));
				let color = num >= cfg.value ? "c0x00ff12" : "c0xffffff";
				let str = StringUtils.substitute(Language.lang.purgatoryProp, cfg.name, this.getPropStr(cfg.attrs), color);
				props.push(str);
			}
			part.setData(title, props);
			view.firData.push(part);
		}
		App.ViewManager.open(ViewConst.PURGATORY_RESONATE_PROP, view);
	}

	private getPropStr(props: any[]): string {
		let str = "";
		if (!props) {
			return str;
		}
		for (let i = 0; i < props.length; i++) {
			let {type, value} = props[i];
			let buf: StdAttributebuffid = GameConfig.buffId[type];
			i > 0 && (str += "   ");
			str += `${buf.attname}${value}`;
		}
		return str;
	}

	private onBtnPropClick(): void {
		let view = new ViewProp();
		view.firData = {};
		view.firData["src"] = "purgatory_json.purgatory_lab_prop_png";
		view.firData["prop"] = this.eqProps;
		App.ViewManager.open(ViewConst.TOTALPROP, view);
	}

	private onBtnBagClick(): void {
		App.ViewManager.open(ViewConst.PURGATORY_BAG);
	}

	public close(param: ViewProp): void {
		super.close(param);
		this.eqProps = null;
	}
}