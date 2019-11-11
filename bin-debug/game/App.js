var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var App = (function () {
    function App() {
    }
    Object.defineProperty(App, "stage", {
        /**游戏主舞台 */
        get: function () {
            return App.StageUtils.getStage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "StageUtils", {
        /**游戏主舞台工具 */
        get: function () {
            return StageUtils.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "Socket", {
        /**整个游戏主Socket 万一要继承它改呢 */
        get: function () {
            return GameSocket.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "TimerManager", {
        /**时间管理器 */
        get: function () {
            return TimerManager.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "ViewManager", {
        /**界面管理器 */
        get: function () {
            return ViewManager.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "MessageCenter", {
        /**内部信息通知中心 */
        get: function () {
            return MessageCenter.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "ChatMgr", {
        /**聊天管理器 */
        get: function () {
            return ChatMgr.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "DisplayUtils", {
        /**Display工具 */
        get: function () {
            return DisplayUtils.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "DateUtils", {
        get: function () {
            return DateUtils.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "FrameHandler", {
        get: function () {
            return FrameHandler.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "DBAvatarManager", {
        get: function () {
            return DBAvatarManager.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "ThingManager", {
        get: function () {
            return ThingManager.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "HurtTxtManager", {
        get: function () {
            return HurtTxtManager.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "RedPoint", {
        get: function () {
            return RedPointManager.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "FightManager", {
        get: function () {
            return FightManager.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "BattleManager", {
        get: function () {
            return BattleManager.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "VisitManager", {
        get: function () {
            return VisitThingManager.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "skillPlay", {
        get: function () {
            return SkillPlayManager.ins();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(App, "SoundManager", {
        get: function () {
            return SoundManager.getIns();
        },
        enumerable: true,
        configurable: true
    });
    /**判断是否一个正确的json格式 */
    App.isJSON = function (str) {
        try {
            var obj = JSON.parse(str);
            if (typeof obj == 'object' && obj) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    };
    Object.defineProperty(App, "gameWorld", {
        get: function () {
            return App.ViewManager.getView(ViewConst.GAME_WORLD);
        },
        enumerable: true,
        configurable: true
    });
    return App;
}());
__reflect(App.prototype, "App");
//# sourceMappingURL=App.js.map