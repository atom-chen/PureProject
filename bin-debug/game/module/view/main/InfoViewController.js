var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/*
 * @Description: 信息面板总控制
 * @Author: xiejunwei
 * @Date: 2019-08-22 11:53:41
 * @LastEditTime: 2019-10-28 14:09:57
 */
var InfoViewController = (function () {
    function InfoViewController() {
    }
    InfoViewController.openView = function (type) {
        //世界BOSS
        if (type == 1 || type == 9) {
            GameCache.boss.addWorldBossINfo();
        }
        else {
            GameCache.boss.removeWorldBossINfo();
        }
        //材料副本
        if (type == 5) {
            App.ViewManager.open(ViewConst.COPYMATERIALSINFO);
        }
        else {
            if (App.ViewManager.isShow(ViewConst.COPYMATERIALSINFO)) {
                App.ViewManager.close(ViewConst.COPYMATERIALSINFO);
                var view = new ViewProp();
                view.firIndex = 0;
                App.ViewManager.open(ViewConst.COPY, view);
            }
        }
        //经验副本
        if (type == 7) {
            App.ViewManager.open(ViewConst.COPYEXPINFO);
        }
        else {
            if (App.ViewManager.isShow(ViewConst.COPYEXPINFO)) {
                App.ViewManager.close(ViewConst.COPYEXPINFO);
            }
        }
        //竞技场
        if (type == 8) {
            App.ViewManager.open(ViewConst.JINGJIINFO);
        }
        else {
            if (App.ViewManager.isShow(ViewConst.JINGJIINFO))
                App.ViewManager.close(ViewConst.JINGJIINFO);
        }
        //时装副本
        if (type == 11) {
            App.ViewManager.open(ViewConst.FASHIONCOPYINFO);
        }
        else {
            if (App.ViewManager.isShow(ViewConst.FASHIONCOPYINFO))
                App.ViewManager.close(ViewConst.FASHIONCOPYINFO);
        }
    };
    InfoViewController.autoOpen = function () {
        if (GlobalVar.autoOpenGroup.length) {
            var arr = GlobalVar.autoOpenGroup.concat();
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var i = arr_1[_i];
                App.ViewManager.open(i[0], i[1]);
                GlobalVar.autoOpenGroup.shift();
            }
        }
    };
    InfoViewController.customBtn = function (group) {
        var conf = GameCache.map.mapConfig;
        if (conf.configureBtn) {
            for (var i = 0; i < conf.configureBtn.length; i++) {
                var id = conf.configureBtn[i];
                if (group.getElementAt(i)) {
                    group.getElementAt(i).data = id;
                }
                else {
                    var btn = ObjectPool.get(BuffCustomBtn);
                    btn.data = id;
                    btn.name = id;
                    group.addChild(btn);
                }
            }
        }
    };
    return InfoViewController;
}());
__reflect(InfoViewController.prototype, "InfoViewController");
//# sourceMappingURL=InfoViewController.js.map