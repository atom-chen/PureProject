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
/*
 * @Description: 时装部位条目
 * @Author: xiejunwei
 * @Date: 2019-07-29 16:40:23
 * @LastEditTime: 2019-10-21 17:37:50
 */
var FashionType = (function (_super) {
    __extends(FashionType, _super);
    function FashionType() {
        return _super.call(this) || this;
    }
    FashionType.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addTouchEvent(this.bg, this.onTouche);
        this.addTouchEvent(this.typeImg, this.onTouche);
        this.addTouchEvent(this.unBtn, this.takeOff);
    };
    FashionType.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.cleanGroup();
        if (!this.data)
            return;
        if (!GameCache.fashion.tempProp)
            return;
        this.initData();
    };
    FashionType.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.handler = null;
    };
    FashionType.prototype.initData = function () {
        this.handler = Handler.create(this.data.thisc, this.data.func, [this.itemIndex], false);
        this.typeImg.source = "fashion_json.fashion_part" + this.data.id + "_png";
        var roleId = GameCache.hero.getRoleIdByIndex(GameCache.fashion.role);
        var bag = this.data.item;
        var fashionId = GameCache.fashion.tempProp.pro(this.data.id);
        this.unBtn.visible = this.fashionName.visible = false;
        if (bag) {
            for (var i = 0; i < bag.length; i++) {
                // let item = GameConfig.fashion[bag[i]];
                var item = bag[i];
                if (item.shape == fashionId) {
                    this.unBtn.visible = this.fashionName.visible = true;
                    this.fashionName.textFlow = TextFlowUtils.generateTextFlow(ItemUtils.getItemNamewithColor(item));
                }
            }
        }
    };
    FashionType.prototype.onTouche = function () {
        this.handler.run();
    };
    FashionType.prototype.testFunc = function () {
        if (!this.g) {
            this.g = ObjectPool.get(eui.Scroller);
            this.g.width = this.width;
            this.g.y = 48;
            this.g.height = 220;
            this.g.left = 0;
            this.g.right = 0;
            this.addChild(this.g);
            this.list = ObjectPool.get(eui.List);
            this.list.itemRenderer = FashionItem;
            this.list.itemRendererSkinName = "ItembaseSkin";
            var layout = new eui.TileLayout();
            layout.horizontalGap = 22;
            layout.paddingLeft = 9;
            layout.requestedColumnCount = 5;
            this.list.layout = layout;
            this.g.addChild(this.list);
            if (!this.dataGroup) {
                this.dataGroup = new eui.ArrayCollection(this.data.item);
            }
            else {
                this.dataGroup.source = this.data.item;
            }
            this.list.dataProvider = this.dataGroup;
            this.arrow.source = "public_json.public_arrow_up_png";
        }
        else {
            this.cleanGroup();
        }
    };
    FashionType.prototype.refreshList = function () {
        if (this.list) {
            this.dataGroup.source = this.data.item;
            this.list.dataProviderRefreshed();
            this.initData();
        }
    };
    FashionType.prototype.cleanGroup = function () {
        if (this.g) {
            this.arrow.source = "public_json.public_arrow_down_png";
            ObjectPool.push(this.list);
            ObjectPool.push(this.g);
            App.DisplayUtils.removeFromParent(this.list);
            App.DisplayUtils.removeFromParent(this.g);
            this.list = null;
            this.g = null;
        }
    };
    FashionType.prototype.takeOff = function () {
        GameCache.fashion.takeOff([this.data.item[0]]);
    };
    return FashionType;
}(BaseCustComponent));
__reflect(FashionType.prototype, "FashionType");
//# sourceMappingURL=FashionType.js.map