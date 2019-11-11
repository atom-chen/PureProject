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
/**
 * 当前的地图数据
*/
var MapCache = (function (_super) {
    __extends(MapCache, _super);
    function MapCache() {
        var _this = _super.call(this) || this;
        /**每个格子宽*/
        _this.cellWidth = 40;
        /**每个格子高*/
        _this.cellHeight = 40;
        /**场景id*/
        _this.mapId = 0;
        /**副本id >0是副本 ==0是普通场景*/
        _this.fbId = 0;
        /**上个场景数据文件*/
        _this.lastMapFile = "";
        _this.curMapFile = "";
        _this.firstEnterScene = true; //第一次进入场景
        _this.dataInit = false; //是否已创建完场景数据
        _this.showLoading = false;
        _this.loadlingList = [];
        _this.cameraX = 0;
        _this.cameraY = 0;
        /**是否由前端计算战斗的地图*/
        _this.isAIMap = false;
        _this._xml = new MapXML();
        return _this;
    }
    MapCache.prototype.clear = function () {
        _super.prototype.clear.call(this);
        this.lastMapFile = "";
        this.firstEnterScene = true;
        this.dataInit = false;
        this.showLoading = false;
        this.loadlingList.length = 0;
    };
    MapCache.prototype.getHookPoint = function () {
        var arr = this.mapConfig.hookPath;
        if (arr && arr.length > 0) {
            this.hookIndex++;
            if (this.hookIndex >= arr.length) {
                this.hookIndex = 0;
            }
            return arr[this.hookIndex];
        }
        return null;
    };
    MapCache.prototype.readXML = function (data) {
        this._xml.read(data);
    };
    /**请求退出当前场景*/
    MapCache.prototype.sendExit = function () {
    };
    //退出场景时
    MapCache.prototype.exit = function () {
        this.dataInit = false;
        App.ThingManager.removeAll();
        App.FightManager.mapChange();
        GameCache.hero.exitScene();
        this.isAIMap = false;
        GameCache.pass.close();
        App.FightManager.heroStart(false);
        App.FrameHandler.add(App.ViewManager.destroyView, App.ViewManager, true);
        App.FrameHandler.add(App.DBAvatarManager.onScengChange, App.DBAvatarManager, true);
    };
    /**过场结束后触发*/
    MapCache.prototype.enter = function () {
        if (this.mapId == GlobalVar.GUAJI_SCENE) {
            GameCache.pass.open();
        }
        else if (this.mapId == GlobalVar.PASSBOSS_SCENE) {
            GameCache.pass.playBossEffect();
        }
        if (this.isHookMap()) {
            App.FightManager.heroStart(true);
        }
        InfoViewController.autoOpen();
        InfoViewController.openView(this.mapConfig.type);
        App.SoundManager.playMusic(this.mapConfig["music"]);
    };
    //场景刷新，更新需要加载的数据文件等等
    MapCache.prototype.update = function (mapId, fbId) {
        this.mapId = mapId;
        this.fbId = fbId;
        var con = GameConfig.scene[mapId];
        this.hookIndex = -1;
        if (!con) {
            throw (new Error("未找到场景配置, id:" + mapId));
        }
        this.mapConfig = con;
        this.curMapFile = con["mapfilename"];
        if (this.mapId == GlobalVar.GUAJI_SCENE) {
            this.curMapFile = GameCache.pass.getMapFile();
            this.isAIMap = true;
        }
        else if (this.mapId == GlobalVar.PASSBOSS_SCENE) {
            this.curMapFile = GameCache.pass.getMapFile();
        }
    };
    /**返回是否一样地图 */
    MapCache.prototype.isSameMap = function () {
        return (this.lastMapFile == this.curMapFile);
    };
    MapCache.prototype.isHookMap = function () {
        return this.mapConfig && this.mapConfig.auto > 0;
    };
    /**返回是否刷新配置*/
    MapCache.prototype.getMapData = function () {
        this.dataInit = true;
        if (this.lastMapFile == this.curMapFile)
            return false;
        this.lastMapFile = this.curMapFile;
        var str = this._xml.getConfig(this.curMapFile);
        var d = egret.XML.parse(str);
        var gridData = [];
        var list = d.children;
        var len = list.length;
        for (var i = 0; i < len; i++) {
            var node = list[i];
            if (node["name"] == "step") {
                this.pareseMapSize(node);
            }
            if (node["name"] == "view") {
                this.skyDrawVo = this.parseMapDraw(node);
            }
            if (node["name"] == "floor") {
                this.floorDrawVo = this.parseMapDraw(node);
            }
            if (node["name"] == "tree") {
                this.treeDrawVo = this.parseMapDraw(node);
            }
            if (node["name"] == "front") {
                this.frontDrawVo = this.parseMapDraw(node);
            }
            if (node["name"] == "t") {
                var str_1 = node["children"][0].text;
                gridData.push(str_1.split(","));
            }
        }
        var grid = new CMapTpl();
        grid.parese(gridData);
        this.find = new CMapPathData(grid);
        this.showLoading = true;
        this.loadlingList.length = 0;
        return true;
    };
    MapCache.prototype.findPath = function (sx, sy, ex, ey) {
        if (sx == ex && sy == ey)
            return [];
        var p = this.find.FindPath(new CWTPoint(sx, sy), new CWTPoint(ex, ey), new CWTPoint(GlobalVar.JUMP_X, GlobalVar.JUMP_Y));
        p.reverse();
        var i = 0;
        var len = p.length;
        var p1;
        var p2;
        for (; i < len; i++) {
            if (i == 0) {
                p1 = p[i];
            }
            else {
                p2 = p[i];
                if (p2.mX == p1.mX && p2.mY == p1.mY) {
                    p.splice(i, 1);
                    len--;
                    i--;
                }
                else if (p2.mX == p1.mX && p2.mY > p1.mY) {
                    var y1 = p1.mY + 2;
                    var y2 = p2.mY;
                    for (; y1 < y2; y1++) {
                        if (this.canStand(p2.mX, y1)) {
                            var p3 = new CWTPoint(p2.mX, y1);
                            p.splice(i, 0, p3);
                            len++;
                            i++;
                        }
                    }
                }
                p1 = p2;
            }
        }
        return p;
    };
    MapCache.prototype.pareseMapSize = function (o) {
        var list = o.children;
        var len = list.length;
        for (var i = 0; i < len; i++) {
            if (list[i].name == "w") {
                this.mapWidth = parseInt(list[i].children[0].text);
            }
            else if (list[i].name == "h") {
                this.mapHeight = parseInt(list[i].children[0].text);
            }
        }
    };
    MapCache.prototype.parseMapDraw = function (o) {
        var vo = new MapDrawLayerVo();
        var arr = [];
        vo.imgList = arr;
        var list = o.children;
        var len = list.length;
        var indexDic = {};
        for (var i = 0; i < len; i++) {
            if (list[i].name == "p") {
                var vo_1 = new MapImageVo();
                vo_1.x = parseInt(list[i].attributes.x);
                vo_1.y = parseInt(list[i].attributes.y);
                vo_1.w = parseInt(list[i].attributes.w);
                vo_1.h = parseInt(list[i].attributes.h);
                vo_1.scaleX = parseFloat(list[i].attributes.scaleX);
                vo_1.scaleY = parseFloat(list[i].attributes.scaleY);
                vo_1.url = list[i].children[0].text;
                if (indexDic[vo_1.url])
                    vo_1.index = indexDic[vo_1.url];
                else {
                    vo_1.index = i + 1;
                    indexDic[vo_1.url] = i + 1;
                }
                arr.push(vo_1);
            }
            if (list[i].name == "w") {
                vo.width = parseInt(list[i].children[0].text);
            }
            else if (list[i].name == "h") {
                vo.height = parseInt(list[i].children[0].text);
            }
        }
        return vo;
    };
    /**是否斜坡*/
    MapCache.prototype.isRope = function (x, y) {
        return this.find.IsRope(x, y + 1);
    };
    /**判断两点之间是否需要跳跃*/
    MapCache.prototype.isJump = function (sx, sy, ex, ey) {
        if (sx == ex && sy == ey)
            return false;
        var dir = MathUtils.getDirByGridPoint(sx, sy, ex, ey);
        var pos = MathUtils.getGridTowardByDir(dir, 1, sx, sy);
        return !this.canStand(pos.x, pos.y);
    };
    /**是否可站立*/
    MapCache.prototype.canStand = function (x, y) {
        return this.find.canStand(x, y + 1);
    };
    return MapCache;
}(BaseCache));
__reflect(MapCache.prototype, "MapCache");
//# sourceMappingURL=MapCache.js.map