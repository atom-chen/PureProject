/*
 * @Description: 信息面板总控制
 * @Author: xiejunwei
 * @Date: 2019-08-22 11:53:41
 * @LastEditTime: 2019-10-28 14:09:57
 */
class InfoViewController {
    static openView(type): void {
        //世界BOSS
        if (type == 1 || type == 9) {
            GameCache.boss.addWorldBossINfo();
        } else {
            GameCache.boss.removeWorldBossINfo();
        }
        //材料副本
        if (type == 5) {
            App.ViewManager.open(ViewConst.COPYMATERIALSINFO);
        } else {
            if (App.ViewManager.isShow(ViewConst.COPYMATERIALSINFO)) {
                App.ViewManager.close(ViewConst.COPYMATERIALSINFO);
                let view = new ViewProp();
                view.firIndex = 0;
                App.ViewManager.open(ViewConst.COPY, view);
            }
        }
        //经验副本
        if (type == 7) {
            App.ViewManager.open(ViewConst.COPYEXPINFO);
        } else {
            if (App.ViewManager.isShow(ViewConst.COPYEXPINFO)) {
                App.ViewManager.close(ViewConst.COPYEXPINFO);
            }
        }
        //竞技场
        if (type == 8) {
            App.ViewManager.open(ViewConst.JINGJIINFO);
        } else {
            if (App.ViewManager.isShow(ViewConst.JINGJIINFO))
                App.ViewManager.close(ViewConst.JINGJIINFO);
        }
        //时装副本
        if (type == 11) {
            App.ViewManager.open(ViewConst.FASHIONCOPYINFO);
        } else {
            if (App.ViewManager.isShow(ViewConst.FASHIONCOPYINFO))
                App.ViewManager.close(ViewConst.FASHIONCOPYINFO);
        }
    }

    static autoOpen(): void {
        if (GlobalVar.autoOpenGroup.length) {
            let arr = GlobalVar.autoOpenGroup.concat();
            for (let i of arr) {
                App.ViewManager.open(i[0], i[1]);
                GlobalVar.autoOpenGroup.shift();
            }
        }
    }



    static customBtn(group: eui.Group): void {
        let conf = GameCache.map.mapConfig;
        if (conf.configureBtn) {
            for (let i = 0; i < conf.configureBtn.length; i++) {
                let id = conf.configureBtn[i];
                if (group.getElementAt(i)) {
                    (group.getElementAt(i) as BuffCustomBtn).data = id;
                } else {
                    let btn: BuffCustomBtn = ObjectPool.get(BuffCustomBtn);
                    btn.data = id;
                    btn.name = id;
                    group.addChild(btn);
                }
            }
        }
    }
}