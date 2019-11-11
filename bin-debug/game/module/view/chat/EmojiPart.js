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
 * @Description: 表情控件
 * @Author: xiejunwei
 * @Date: 2019-09-30 13:44:00
 */
var EmojiPart = (function (_super) {
    __extends(EmojiPart, _super);
    function EmojiPart() {
        var _this = _super.call(this, LayerManager.UI_Tips) || this;
        _this.skinName = "EmojiPartSkin";
        return _this;
    }
    EmojiPart.prototype.init = function () {
        _super.prototype.init.call(this);
    };
    // protected childrenCreated(): void {
    //     super.childrenCreated();
    //     this.addEvent(eui.ItemTapEvent.ITEM_TAP, this.itemList, this.onCLick);
    // }
    // protected dataChanged(): void {
    //     super.dataChanged();
    //     if (!this.data.func) return;
    //     if (this.handler) {
    //         this.handler.dispose();
    //     }
    //     this.handler = Handler.create(this.data.thisc, this.data.func, [], false);
    //     this.initList();
    // }
    // public dispose(): void {
    //     super.dispose();
    // }
    EmojiPart.prototype.open = function (param) {
        _super.prototype.open.call(this);
        this.addEvent(eui.ItemTapEvent.ITEM_TAP, this.itemList, this.onCLick);
        if (param && param.exData1 && param.exData1['func']) {
            if (this.handler) {
                this.handler.dispose();
            }
            this.handler = Handler.create(param.exData1['thisc'], param.exData1['func'], [], false);
            this.initList();
        }
    };
    EmojiPart.prototype.close = function (param) {
        _super.prototype.close.call(this);
        this.setListData(this.itemList, []);
        if (this.handler) {
            this.handler.dispose();
            this.handler = null;
        }
    };
    EmojiPart.prototype.initList = function () {
        var arr = [];
        for (var i = 0; i < 21; i++) {
            var obj = {
                src: "emoji_json.emoji_" + i + "_png"
            };
            arr.push(obj);
        }
        this.setListData(this.itemList, arr);
    };
    EmojiPart.prototype.onCLick = function (e) {
        var tar = e.itemIndex;
        if (this.handler) {
            this.handler.args = [tar];
            this.handler.run();
        }
    };
    return EmojiPart;
}(BaseEuiWindow));
__reflect(EmojiPart.prototype, "EmojiPart");
//# sourceMappingURL=EmojiPart.js.map