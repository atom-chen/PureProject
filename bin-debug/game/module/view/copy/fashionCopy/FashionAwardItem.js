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
 * @Description: 时装副本奖励条目
 * @Author: xiejunwei
 * @Date: 2019-10-28 11:42:43
 */
var FashionAwardItem = (function (_super) {
    __extends(FashionAwardItem, _super);
    function FashionAwardItem() {
        return _super.call(this) || this;
    }
    FashionAwardItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    FashionAwardItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data["tag"]) {
            if (!this.tag) {
                this.tag = ObjectPool.get(eui.Image);
                this.tag.source = "public_json.public_bonus_tag_png";
                this.tag.x = this.tag.y = -3;
                this.addChild(this.tag);
            }
            else {
                this.tag.visible = true;
            }
        }
        else {
            if (this.tag) {
                this.tag.visible = false;
            }
        }
    };
    FashionAwardItem.prototype.dispose = function () {
        this.tag.source = null;
        this.tag.x = this.tag.y = 0;
        ObjectPool.push(this.tag);
        App.DisplayUtils.removeFromParent(this.tag);
        this.tag = null;
        _super.prototype.dispose.call(this);
    };
    return FashionAwardItem;
}(ItemBase));
__reflect(FashionAwardItem.prototype, "FashionAwardItem");
//# sourceMappingURL=FashionAwardItem.js.map