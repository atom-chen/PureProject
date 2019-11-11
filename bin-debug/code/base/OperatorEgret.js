var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 重载白鹭底层代码
 */
var OperatorEgret = (function () {
    function OperatorEgret() {
    }
    OperatorEgret.init = function () {
        this.lifecycle();
        // this.res_loadByVersion();
        this.eui_Image_source();
        this.eui_getClassNameOfNode();
        this.eui_List_rendererRemoved();
        this.egretNodeAddChild();
        this.egretEuiButton();
        console.warn = function (ms) {
            var p = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                p[_i - 1] = arguments[_i];
            }
            true && console.log(ms, p);
        };
        // let setX = Object.getOwnPropertyDescriptor(egret.DisplayObject.prototype, "x");
        // Object.defineProperty(egret.DisplayObject.prototype, "x", {
        // 	set: function (value) {
        // 		if (typeof value == "string")
        // 			value = parseInt(value);
        // 		setX.set.call(this, value);
        // 	}
        // });
        // let setY = Object.getOwnPropertyDescriptor(egret.DisplayObject.prototype, "y");
        // Object.defineProperty(egret.DisplayObject.prototype, "y", {
        // 	set: function (value) {
        // 		if (typeof value == "string") value = parseInt(value);
        // 		setY.set.call(this, value);
        // 	}
        // });
    };
    OperatorEgret.lifecycle = function () {
        if (DeviceUtils.IsPC) {
            return;
        }
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
            document.addEventListener("qbrowserVisibilityChange", function (e) {
                try {
                    if (e.hidden) {
                        context.pause();
                    }
                    else {
                        context.resume();
                    }
                    ;
                }
                catch (e) {
                }
            });
            // context.onUpdate = () => {
            // 	console.log("update");
            // }
        });
        egret.lifecycle.onPause = function () {
            try {
                egret.ticker.pause();
            }
            catch (e) {
            }
        };
        egret.lifecycle.onResume = function () {
            try {
                egret.ticker.resume();
            }
            catch (e) {
            }
        };
    };
    /**
     * 重写eui Image的设置source方法，设置新值会把旧值引用减一
     */
    OperatorEgret.eui_Image_source = function () {
        var a = Object.getOwnPropertyDescriptor(eui.Image.prototype, "source");
        Object.defineProperty(eui.Image.prototype, "source", {
            set: function (value) {
                if (value == "\"\"") {
                    return;
                }
                if (this.source) {
                    if (typeof this.source == "string") {
                        if (this.source != value) {
                            this.texture = null;
                        }
                        EUIResourceManager.ins().remove(this.source);
                    }
                }
                if (typeof value == "string") {
                    EUIResourceManager.ins().add(value);
                }
                a.set.call(this, value);
            }
        });
    };
    /**
    * Res加载使用版本号的形式
    */
    OperatorEgret.res_loadByVersion = function () {
        RES.getVirtualUrl = function (url) {
            var key = url;
            true && OperatorEgret.urlList.push("\"" + url + "\"");
            if (ServerMgr.IsNative) {
                if (url.indexOf("package.json") > -1 || url.indexOf("resource/default.res.json") > -1) {
                    //console.log("!!!!!!!!!!!!!!!!" + url);
                    return url;
                }
                if (ResVersionManager.ins().getVer2(url)) {
                    //console.log("!!!!!!!!!!!!!!" + url);
                    return url;
                }
            }
            if (url.lastIndexOf("http") == -1) {
                url = "" + LocationProperty.resAdd + url;
                if (true) {
                    //美术的龙骨测试
                    if (LocationProperty.resAdd.indexOf("http://192.168.1.104:82/") > -1 && url.indexOf(RES_DIR_DRAGON) == -1) {
                        return "http://192.168.1.62:8000/client/" + key + "?v=" + Math.random();
                    }
                    return url + "?v=" + Math.random();
                }
                var manager = ResVersionManager.ins();
                var v = manager.getVer(key);
                url += "?v=" + (v ? v : 0);
            }
            //console.log("1url" url);
            return url;
        };
    };
    OperatorEgret.eui_List_rendererRemoved = function () {
        var a = eui.List.prototype['rendererRemoved'];
        eui.List.prototype['rendererRemoved'] = function (renderer, index, item) {
            if (renderer['dispose']) {
                renderer['dispose']();
            }
            a.call(this, renderer, index, item);
        };
    };
    OperatorEgret.egretNodeAddChild = function () {
        var a = egret.DisplayObjectContainer.prototype.addChildAt;
        egret.DisplayObjectContainer.prototype.addChildAt = function (child, index) {
            if (!child.hashCode)
                return null;
            return a.call(this, child, index);
        };
    };
    OperatorEgret.egretEuiButton = function () {
        var a = eui.Button.prototype['onTouchBegin'];
        eui.Button.prototype['onTouchBegin'] = function (event) {
            App.SoundManager.playEffect(SoundType.BUTTONCLICK);
            a.call(this, event);
        };
        // 	let a = Object.getOwnPropertyDescriptor(eui.Button.prototype, "icon");
        // 	Object.defineProperty(eui.Button.prototype, "icon", {
        // 		set: function (value: string) {
        // 			if (!value) {
        // 				//分两种情况,一种是原先没有设置 icon 参数,回调原来的
        // 				//第二种是,重置特效
        // 				a.set.call(this, value);
        // 				if (this.effect) {
        // 					(this.effect as Effects).loadFile(null);
        // 				}
        // 				return;
        // 			}
        // 			else {
        // 				if (this.effect) { //显示特效的皮肤必须有effect id
        // 					(this.effect as Effects).loadFile(value);
        // 					this._icon = value;
        // 				}
        // 				else {
        // 					a.set.call(this, value);
        // 				}
        // 			}
        // 		},
        // 		get: function () {
        // 			return a.get.call(this);
        // 		}
        // 	});
    };
    OperatorEgret.eui_getClassNameOfNode = function () {
        if (true) {
            eui.sys.EXMLParser.prototype['getClassNameOfNode'] = function (node) {
                var className = eui.sys.exmlConfig.getClassNameById(node.$className || node.localName, node.namespace);
                if (!className) {
                    egret.$error(2003, this.currentClassName, this.toXMLString(node));
                }
                return className;
            };
        }
    };
    OperatorEgret.urlList = [];
    return OperatorEgret;
}());
__reflect(OperatorEgret.prototype, "OperatorEgret");
//# sourceMappingURL=OperatorEgret.js.map