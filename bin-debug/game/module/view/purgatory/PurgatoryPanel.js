var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var PurgatoryPanel = (function (_super) {
    __extends(PurgatoryPanel, _super);
    function PurgatoryPanel($parent) {
        if ($parent === void 0) { $parent = null; }
        var _this = _super.call(this, $parent) || this;
        _this.select = 0;
        _this.skinName = "PurgatoryPanelSkin";
        return _this;
    }
    PurgatoryPanel.prototype.init = function () {
        _super.prototype.init.call(this);
        var hander = Handler.create(this, this.doInit, [], false);
        this.roleSelect.handler = hander;
        this.lv.gap = 21;
        this.lv.alignV = "mid";
    };
    PurgatoryPanel.prototype.doInit = function () {
        this.initEquips();
        this.initProp();
        this.initZDL();
    };
    /**
     * 初始化角色身上的炼狱装备
     * @param  {} eqData
     * @returns void
     */
    PurgatoryPanel.prototype.initEquips = function () {
        var eqData = GameCache.purgatory.purgatoryData[this.roleSelect.roleId];
        eqData || (eqData = []);
        var job = GameCache.hero.mainPro.pro(PropId.AP_JOB);
        var icon;
        var cfg;
        for (var i = 0; i < 6; i++) {
            var lv = eqData[i];
            var eqItem = this["eq" + i];
            eqItem.select = i == this.select;
            if (!lv) {
                cfg = GameCache.purgatory.getPurgatoryCfg(i, 1);
                eqItem.filters = FilterUtils.DefaultGrayFilters;
                eqItem.partSource = "purgatory_json.purgatory_part" + i + "_png";
            }
            else {
                cfg = GameCache.purgatory.getPurgatoryCfg(i, lv);
                eqItem.filters = null;
                eqItem.partSource = null;
            }
            icon = cfg.icon[job - 1];
            icon || (icon = cfg.icon[0]);
            eqItem.setIconImg("" + RES_DIR_PURGATORY_ICON + icon + ".png");
            // 更新当前选择的部位名称
            if (eqItem.select) {
                this.imgName.source = "purgatory_json." + icon + "_png";
                this.lv.value = lv;
                this.lv.includeInLayout = this.lv.visible = this.imgStep.includeInLayout = this.imgStep.visible = lv > 0;
                this.imgEquip.source = "" + RES_DIR_PURGATORY_SHOW + icon + ".png";
                this.imgEquip.filters = !lv ? FilterUtils.DefaultGrayFilters : null;
            }
        }
    };
    /**
     * 初始化战斗力
     * @returns void
     */
    PurgatoryPanel.prototype.initZDL = function () {
        var eqData = GameCache.purgatory.purgatoryData[this.roleSelect.roleId];
        eqData || (eqData = []);
        this.eqProps = [];
        for (var i in eqData) {
            var lv = eqData[i];
            var cfg = GameCache.purgatory.getPurgatoryCfg(Number(i), lv);
            if (cfg) {
                this.eqProps = GlobalFun.ObjPlusOrMinus(this.eqProps, cfg.attrs);
            }
        }
        var totalProp = GlobalFun.ObjPlusOrMinus(this.eqProps, []);
        // 套装属性
        var rsnData = GameCache.purgatory.rsnData[this.roleSelect.roleId];
        var rsnLvMap = {};
        for (var lv in rsnData) {
            // 最高共鸣件数
            var num = Math.floor(rsnData[lv] / 2) * 2;
            if (num > 0) {
                var cfgs = GameConfig.purgatoryResonate[lv];
                for (var v in cfgs) {
                    if (num < Number(v)) {
                        break;
                    }
                    if (!rsnLvMap[v] || Number(lv) > rsnLvMap[v]) {
                        rsnLvMap[v] = Number(lv);
                    }
                }
            }
        }
        for (var i in rsnLvMap) {
            var l = rsnLvMap[i];
            var n = Number(i);
            var cfg = GameConfig.purgatoryResonate[l][n];
            totalProp = GlobalFun.ObjPlusOrMinus(totalProp, cfg.attrs);
        }
        this.zdl.value = ItemUtils.getZdlByProp(totalProp);
    };
    PurgatoryPanel.prototype.initProp = function () {
        var data = GameCache.purgatory.purgatoryData[this.roleSelect.roleId];
        data || (data = []);
        var lv = data[this.select];
        lv || (lv = 0);
        var cfg1 = GameCache.purgatory.getPurgatoryCfg(this.select, lv);
        var prop1 = [];
        cfg1 && (prop1 = cfg1.attrs);
        var prop2 = [];
        if (lv < GameCache.purgatory.maxLv) {
            var cfg2 = GameCache.purgatory.getPurgatoryCfg(this.select, lv + 1);
            prop2 = cfg2.attrs;
        }
        this.propList.setData(prop1, prop2, this.roleSelect.job, 0xffc600, 0xffffff, 0x00ff0c, [], "PropItem2Skin");
    };
    PurgatoryPanel.prototype.open = function (param) {
        if (param === void 0) { param = null; }
        this.message(MsgConst.EQUIP_PURGATORY, this.doInit);
        this.addTouchEvent(this.btnUp, this.onBtnUpClick);
        this.addTouchEvent(this.btnRsn, this.onBtnResonateClick);
        this.addTouchEvent(this.btnProp, this.onBtnPropClick);
        this.addTouchEvent(this.gl, this.onItemClick);
        this.addTouchEvent(this.gr, this.onItemClick);
        this.addTouchEvent(this.btnBag, this.onBtnBagClick);
        this.doInit();
    };
    PurgatoryPanel.prototype.onItemClick = function (e) {
        if (e.target instanceof EquipItem) {
            this.select = Number(e.target.name);
            this.initEquips();
            this.initProp();
        }
    };
    PurgatoryPanel.prototype.onBtnUpClick = function () {
        var maxLv = GameCache.purgatory.maxLv;
        var eqData = GameCache.purgatory.purgatoryData[this.roleSelect.roleId];
        eqData || (eqData = []);
        var lv = eqData[this.select];
        lv || (lv = 0);
        // 初始化0级
        if (lv >= maxLv) {
            // 此处可能需要提示
            return;
        }
        var toLv = lv + 1;
        for (var i = maxLv; i > 0; i--) {
            if (i <= lv)
                break;
            var cfg = GameCache.purgatory.getPurgatoryCfg(this.select, i);
            var itemCount1 = GameCache.bag.itemCount(cfg.cost1.id);
            var itemCount2 = GameCache.bag.itemCount(cfg.cost2.id);
            if (itemCount1 >= cfg.cost1.count && itemCount2 >= cfg.cost2.count && i > toLv) {
                toLv = i;
            }
        }
        var cfgFrom = GameCache.purgatory.getPurgatoryCfg(this.select, lv);
        var cfgTo = GameCache.purgatory.getPurgatoryCfg(this.select, toLv);
        var param = new ViewProp();
        var exData1 = {};
        exData1["roleIdx"] = this.roleSelect.nSlRole;
        exData1["cfgFrom"] = cfgFrom;
        exData1["cfgTo"] = cfgTo;
        param.exData1 = exData1;
        App.ViewManager.open(ViewConst.PURGATORY_UPGRADE, param);
    };
    /**
     * 共鸣效果
     * @returns void
     */
    PurgatoryPanel.prototype.onBtnResonateClick = function () {
        var view = new ViewProp();
        view.winTitle = "purgatory_json.purgatory_lab_resonate_png";
        view.firData = [];
        var maxLv = GameCache.purgatory.maxLv;
        var roleId = this.roleSelect.roleId;
        for (var lv = 1; lv <= maxLv; lv++) {
            var num = GameCache.purgatory.getResonateLvNum(roleId, lv);
            var cfgs = GameConfig.purgatoryResonate[lv];
            var part = ObjectPool.get(PropPartResonate);
            var props = [];
            var title = void 0;
            for (var n in cfgs) {
                var cfg = cfgs[n];
                title || (title = StringUtils.substitute(Language.lang.purgatoryPropTitle, cfg.suitName, lv));
                var color = num >= cfg.value ? "c0x00ff12" : "c0xffffff";
                var str = StringUtils.substitute(Language.lang.purgatoryProp, cfg.name, this.getPropStr(cfg.attrs), color);
                props.push(str);
            }
            part.setData(title, props);
            view.firData.push(part);
        }
        App.ViewManager.open(ViewConst.PURGATORY_RESONATE_PROP, view);
    };
    PurgatoryPanel.prototype.getPropStr = function (props) {
        var str = "";
        if (!props) {
            return str;
        }
        for (var i = 0; i < props.length; i++) {
            var _a = props[i], type = _a.type, value = _a.value;
            var buf = GameConfig.buffId[type];
            i > 0 && (str += "   ");
            str += "" + buf.attname + value;
        }
        return str;
    };
    PurgatoryPanel.prototype.onBtnPropClick = function () {
        var view = new ViewProp();
        view.firData = {};
        view.firData["src"] = "purgatory_json.purgatory_lab_prop_png";
        view.firData["prop"] = this.eqProps;
        App.ViewManager.open(ViewConst.TOTALPROP, view);
    };
    PurgatoryPanel.prototype.onBtnBagClick = function () {
        App.ViewManager.open(ViewConst.PURGATORY_BAG);
    };
    PurgatoryPanel.prototype.close = function (param) {
        _super.prototype.close.call(this, param);
        this.eqProps = null;
    };
    return PurgatoryPanel;
}(BaseSpriteView));
__reflect(PurgatoryPanel.prototype, "PurgatoryPanel");
//# sourceMappingURL=PurgatoryPanel.js.map