var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 镜头管理
*/
var Camera = (function () {
    function Camera() {
        this.isMoving = false;
        this.layers = [];
    }
    /**
     *
    */
    Camera.prototype.register = function (layer) {
        this.layers.push(layer);
    };
    /**
     * 注册需要聚焦的玩家
    */
    Camera.prototype.regPlayer = function (player) {
        this.focusPlayer = player;
        var tx = (App.StageUtils.getWidth() >> 1) - this.focusPlayer.x;
        var ty = this.getPlayerFocusY();
        this.setXY(tx, ty);
    };
    Camera.prototype.exitScene = function () {
        this.curPos = null;
    };
    Camera.prototype.unpdate = function (tick) {
        if (this.focusPlayer) {
            var tx = (App.StageUtils.getWidth() >> 1) - this.focusPlayer.x;
            var ty = this.getPlayerFocusY();
            this.setXY(tx, ty);
        }
    };
    Camera.prototype.getPlayerFocusY = function () {
        var player = this.focusPlayer;
        return (App.StageUtils.getHeight() >> 1) - this.focusPlayer.y;
    };
    /**设置当前坐标*/
    Camera.prototype.setXY = function (x, y) {
        if (!GameCache.map.dataInit)
            return;
        if (GameCache.map.mapWidth < App.StageUtils.getWidth()) {
            x = (App.StageUtils.getWidth() - GameCache.map.mapWidth) >> 1;
        }
        if (GameCache.map.mapHeight < App.StageUtils.getHeight()) {
            y = (App.StageUtils.getHeight() - GameCache.map.mapHeight) >> 1;
        }
        if (x > 0)
            x = 0;
        if (y > 0)
            y = 0;
        var stageW = App.StageUtils.getWidth();
        var stageH = App.StageUtils.getHeight();
        if (-x + stageW > GameCache.map.mapWidth)
            x = -(GameCache.map.mapWidth - stageW);
        if (-y + stageH > GameCache.map.mapHeight)
            y = -(GameCache.map.mapHeight - stageH);
        var cur = this.curPos;
        if (cur && cur.x == x && cur.y == y) {
            return;
        }
        if (!cur)
            cur = this.curPos = { x: x, y: y };
        cur.x = x;
        cur.y = y;
        this.resetLayer();
        App.MessageCenter.dispatch(MsgConst.UPDATE_SCENE_MAPITEM);
    };
    /**移动至坐标*/
    Camera.prototype.moveToXY = function (x, y, t) {
        if (!this.curPos)
            return;
        this.pos = { x: this.curPos.x, y: this.curPos.y };
        egret.Tween.get(this.pos, { onChange: this.onChange, onChangeObj: this }).to({ x: x, y: y }, t);
    };
    Camera.prototype.onChange = function () {
        this.setXY(this.pos.x, this.pos.y);
    };
    Camera.prototype.resetLayer = function () {
        var cur = this.curPos;
        var perX = (-cur.x) / GameCache.map.mapWidth * 100;
        var perY = (-cur.y) / GameCache.map.mapHeight * 100;
        for (var _i = 0, _a = this.layers; _i < _a.length; _i++) {
            var c = _a[_i];
            c.moveTo(cur.x, cur.y, perX, perY);
        }
        GameCache.map.cameraX = -cur.x;
        GameCache.map.cameraY = -cur.y;
    };
    return Camera;
}());
__reflect(Camera.prototype, "Camera");
//# sourceMappingURL=Camera.js.map