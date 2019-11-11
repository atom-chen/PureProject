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
 * @Description: 默认系统
 * @Author: guolinsen
 * @Date: 2019-08-15 13:49:33
 * @LastEditTime: 2019-10-31 22:09:40
 */
var MainProxy = (function (_super) {
    __extends(MainProxy, _super);
    function MainProxy() {
        var _this = _super.call(this, PacketTypes.Default) || this;
        _this.regNetMsg(2, _this.doEntityAppear);
        _this.regNetMsg(3, _this.createMainActor);
        _this.regNetMsg(4, _this.createOtherActor);
        _this.regNetMsg(5, _this.doEntityDisappear);
        _this.regNetMsg(6, _this.doOtherPropertyChange); //其他人属性更变
        _this.regNetMsg(7, _this.doMainPropertyChange); //主角属性更变
        // this.regNetMsg(8, this.doSetMainActorPos);
        _this.regNetMsg(9, _this.doEntityWalk);
        _this.regNetMsg(10, _this.sendHearBeat);
        _this.regNetMsg(11, _this.doNPCTalk);
        _this.regNetMsg(13, _this.doMapChange);
        // this.regNetMsg(15, this.doEntityRun);
        // this.regNetMsg(16, this.doPrepareSkill);
        // this.regNetMsg(17, this.doStopPrepareSkill);
        // this.regNetMsg(18, this.doActivateSkill);
        _this.regNetMsg(19, _this.doAddActorEffect); //添加特效到人身上，被攻击
        // this.regNetMsg(24, this.doActResult);//行为结果
        // this.regNetMsg(26, this.doNormalHit);
        // this.regNetMsg(30, this.catchSprite);
        _this.regNetMsg(32, _this.doAddSceneEffect); //添加特效到场景，施法者
        _this.regNetMsg(35, _this.doEntityDie); //角色死亡
        // this.regNetMsg(37, this.catchActorNameColorChange);//角色名称颜色变更
        // this.regNetMsg(53, this.doSpecialEntityAppear);//特殊实体，例如火墙
        // this.regNetMsg(54, this.doEntitySpecialMove);//实体的特殊移动
        // this.regNetMsg(55, this.doEntitySpecialMoveBack);//实体的特殊移动
        _this.regNetMsg(76, _this.doUpdatePet); //角色死亡
        _this.regNetMsg(77, _this.doOffLineAward);
        _this.regNetMsg(78, _this.doYewaiAward); //野外挂机奖励
        _this.regNetMsg(79, _this.doEquitDone); //初始化角色装备列表完毕
        _this.regNetMsg(80, _this.doServerDisconnected); //玩家下线原因
        return _this;
    }
    /**登录请求*/
    MainProxy.prototype.sendOnLogin = function () {
        //Proxy.skill.sendGetMySkill();
        // Proxy.equip.sendQueryMyEquip();
        // Proxy.bag.sendQueryBagItem();
        // Proxy.boss.pgtBossInfoReq();
        Proxy.boss.sendBossInfo();
        Proxy.other.sendJingjiDataRequest();
        this.sendViewRange();
    };
    MainProxy.prototype.doEntityAppear = function (bytes) {
        var race = bytes.readUnsignedByte();
        //读取实体的handle
        var recog = bytes.readDouble();
        if (GameCache.hero.isMySelf(recog))
            return;
        var actor = App.ThingManager.getThing(recog);
        if (!actor) {
            var propSet = new PropertySet();
            var charName = bytes.readCustomBytes();
            propSet.recog = recog;
            propSet.setRoleName(charName);
            propSet.kind = race;
            var x = bytes.readShort();
            var y = bytes.readShort();
            propSet.pro(PropId.AP_X, x);
            propSet.pro(PropId.AP_Y, y);
            propSet.pro(PropId.AP_BODY_ID, bytes.readUnsignedInt());
            propSet.pro(PropId.AP_DIR, bytes.readByte());
            //只有怪物才有以下的属性
            if (ThingKind.isMonster(race) || ThingKind.isMonsterHuman(race) || ThingKind.isBuildMonster(race)) {
                propSet.pro(PropId.AP_LEVEL, bytes.readByte());
                propSet.pro(PropId.AP_HP, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_MAX_HP, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_MOVE_SPEED, bytes.readShort());
                propSet.pro(PropId.AP_ATTACK_SPEED, bytes.readUnsignedShort());
                propSet.pro(PropId.AP_STATE, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_BODY_COLOR, bytes.readUnsignedInt());
                //bytes.readUnsignedInt(); //camp_id;
                //bytes.readUnsignedInt();//relive_tick;
                //bytes.readByte();
                bytes.readUnsignedInt(); //owner id;
                // bytes.readByte();//特效数量
                //var ds: number = bytes.readUnsignedInt();//低16位挖掘次数 高16是否一定飘血
                //名称颜色
                //bytes.readUnsignedInt() & 0xFFFFFF;
                //怪物的官职和攻击类型
                //bytes.readByte();
                propSet.pro(PropId.AP_ACTOR_ID, bytes.readShort()); //配置id
                propSet.gsName = bytes.readCustomBytes();
                propSet.fightAi = GameCache.map.isAIMap;
            }
            else if (ThingKind.isPet(race)) {
                propSet.pro(PropId.AP_LEVEL, bytes.readByte());
                propSet.pro(PropId.AP_HP, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_MAX_HP, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_MOVE_SPEED, bytes.readShort());
                propSet.pro(PropId.AP_ATTACK_SPEED, bytes.readUnsignedShort());
                propSet.pro(PropId.AP_STATE, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_BODY_COLOR, bytes.readUnsignedInt());
                bytes.readUnsignedInt(); //camp_id;
                bytes.readUnsignedInt(); //relive_tick;
                bytes.readByte();
                bytes.readUnsignedInt(); //owner id;
            }
            else if (ThingKind.isNPC(race)) {
                propSet.pro(PropId.AP_FACE_ID, bytes.readUnsignedByte()); //npc类型
                propSet.pro(PropId.AP_STATE, bytes.readByte()); //任务状态
            }
            else if (race == ThingKind.HeroPet) {
                propSet.pro(PropId.AP_ACTOR_ID, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_LEVEL, bytes.readByte());
                propSet.pro(PropId.AP_HP, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_MAX_HP, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_MOVE_SPEED, bytes.readUnsignedShort());
                propSet.pro(PropId.AP_ATTACK_SPEED, bytes.readUnsignedShort());
                propSet.pro(PropId.AP_STATE, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_BODY_COLOR, bytes.readUnsignedInt());
                propSet.masterId = bytes.readUnsignedInt();
                propSet.pro(PropId.AP_SEX, bytes.readByte());
                propSet.pro(PropId.AP_JOB, bytes.readByte());
                // propSet.pro(PropId.AP_CIRCLE, bytes.readByte());
                propSet.pro(PropId.AP_WEAPON, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_SWING, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_HAIR, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_HAT, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_EYE, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_GLASSES, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_PANTS, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_ASSIST, bytes.readUnsignedInt());
                propSet.pro(PropId.AP_BACK, bytes.readUnsignedInt());
            }
            App.ThingManager.createThingToList(propSet);
        }
    };
    MainProxy.prototype.createMainActor = function (bytes) {
        var kind = bytes.readByte(); //0玩家
        //读取实体标识
        var Recog = bytes.readDouble();
        //数据长度2
        bytes.position += 2; //总字节数
        //开始读取其他属性
        var propSet = new PropertySet();
        propSet.recog = Recog;
        propSet.kind = ThingKind.Hero;
        propSet.fightAi = true;
        propSet.aiCamp = AICampType.SELF;
        propSet.hpType = 1;
        if (kind == ThingKind.Human) {
            App.ThingManager.clear();
        }
        var numProps = kind == ThingKind.Human ? PropId.numProperties : PropId.AP_PK_MOD;
        try {
            for (var i = 0; i < numProps; i++) {
                propSet.readProperty(i, bytes);
            }
            propSet.setRoleName(bytes.readCustomBytes());
        }
        catch (e) {
            alert("客户端与服务端的属性的定义不匹配");
        }
        if (kind == ThingKind.Human) {
            propSet.isMainPlayer = true;
            GameCache.hero.mainPro = propSet;
        }
        var thing = App.ThingManager.createThing(propSet);
        GameCache.hero.addHero(thing);
        App.MessageCenter.dispatch(MsgConst.LOGIN_INIT);
        App.ChatMgr.init();
    };
    /**
     * 其他实体移动
     * @param nType
     * @param bytes
     *
     */
    MainProxy.prototype.doEntityWalk = function (bytes) {
        var recog = bytes.readDouble();
        var actor = App.ThingManager.getThing(recog);
        var targetX = bytes.readShort();
        var targetY = bytes.readShort();
        if (actor) {
            actor.addPathPoint(targetX, targetY);
        }
        else {
            App.ThingManager.updatePoseInWaite(recog, targetX, targetY);
        }
    };
    /**
      * 发送心跳包
      *
      */
    MainProxy.prototype.sendHearBeat = function () {
        var bytes = this.getBytes(2);
        bytes.writeUnsignedInt(App.TimerManager.getSyncTime());
        this.sendToServer(bytes);
    };
    MainProxy.prototype.doNPCTalk = function (bytes) {
        var type = bytes.readByte();
        if (type) {
            var recog = bytes.readDouble();
            var content = bytes.readCustomBytes();
        }
        else {
        }
    };
    MainProxy.prototype.doMapChange = function (bytes) {
        //var mapName: string = bytes.readCustomBytes();
        //var mapFile: string = bytes.readCustomBytes();1
        var mapId = bytes.readShort();
        var x = bytes.readShort();
        var y = bytes.readShort();
        var fbId = bytes.readByte(); //副本的id.为0的时候是指在普通场景
        var isChangeByMyself = bytes.readUnsignedByte() == 1; //是不是自己手动传送,是的话要检测要不要做某些东西
        var cache = GameCache.map;
        cache.exit(); //先执行退出
        cache.update(mapId, fbId);
        if (GameCache.hero.focusPlayer) {
            if (!cache.isSameMap()) {
                GameCache.hero.clearJump();
                GameCache.hero.setPosition(x, y);
            }
            else {
            }
        }
        App.gameWorld.refreshDraw();
        //cache.enter();
        if (cache.showLoading) {
            App.ViewManager.open(ViewConst.MAPLOADING);
        }
        else {
            App.MessageCenter.dispatch(MsgConst.ENTER_SCENE);
        }
        if (cache.firstEnterScene) {
            App.TimerManager.addDelay(1, 1, 1, this.sendOnLogin, this);
            cache.firstEnterScene = false;
        }
    };
    /**
     * 创建其他玩家
     * @param bytes
     *
     */
    MainProxy.prototype.createOtherActor = function (bytes) {
        var recog = bytes.readDouble();
        var actor = App.ThingManager.getThing(recog);
        if (!actor) {
            var name = bytes.readCustomBytes();
            var transport = bytes.readByte();
            var x = bytes.readShort();
            var y = bytes.readShort();
            var propSet = new PropertySet();
            propSet.setRoleName(name);
            propSet.recog = recog;
            propSet.kind = ThingKind.Human;
            propSet.pro(PropId.AP_X, x);
            propSet.pro(PropId.AP_Y, y);
            propSet.pro(PropId.AP_BODY_ID, bytes.readInt());
            propSet.pro(PropId.AP_HP, bytes.readUnsignedInt());
            propSet.pro(PropId.AP_MAX_HP, bytes.readUnsignedInt());
            propSet.pro(PropId.AP_MOVE_SPEED, bytes.readUnsignedShort());
            propSet.pro(PropId.AP_SEX, bytes.readByte());
            propSet.pro(PropId.AP_JOB, bytes.readByte());
            propSet.pro(PropId.AP_LEVEL, bytes.readByte());
            propSet.pro(PropId.AP_WEAPON, bytes.readInt());
            propSet.pro(PropId.AP_MOUNT, bytes.readInt());
            propSet.pro(PropId.AP_SWING, bytes.readInt()); //翅膀
            propSet.pro(PropId.AP_HAIR, bytes.readUnsignedInt());
            propSet.pro(PropId.AP_HAT, bytes.readUnsignedInt());
            propSet.pro(PropId.AP_EYE, bytes.readUnsignedInt());
            propSet.pro(PropId.AP_GLASSES, bytes.readUnsignedInt());
            propSet.pro(PropId.AP_PANTS, bytes.readUnsignedInt());
            propSet.pro(PropId.AP_ASSIST, bytes.readUnsignedInt());
            propSet.pro(PropId.AP_BACK, bytes.readUnsignedInt());
            propSet.pro(PropId.AP_SOCIALMASK, bytes.readInt());
            propSet.pro(PropId.AP_FACE_ID, bytes.readShort());
            propSet.pro(PropId.AP_ATTACK_SPEED, bytes.readUnsignedShort());
            propSet.pro(PropId.AP_DIR, bytes.readByte());
            propSet.pro(PropId.AP_STATE, bytes.readUnsignedInt());
            propSet.pro(PropId.AP_TEAM_ID, bytes.readUnsignedInt());
            propSet.pro(PropId.AP_ZY, bytes.readByte()); //阵营id
            propSet.pro(PropId.AP_CURNEWTITLE, bytes.readUnsignedInt()); //头衔
            //称号与徽章预留
            propSet.pro(PropId.AP_RIDE_LEVEL, bytes.readUnsignedInt()); //坐骑等级
            propSet.pro(PropId.AP_RIDEONID, bytes.readUnsignedInt()); //坐骑id
            //读取角色名称颜色
            bytes.readUnsignedInt();
            propSet.pro(PropId.AP_BODY_COLOR, bytes.readUnsignedInt()); //身体颜色
            propSet.pro(PropId.AP_MOUNT_TYPE, bytes.readInt()); //坐骑类型
            propSet.pro(PropId.AP_VIP_GRADE, bytes.readUnsignedInt());
            propSet.pro(PropId.AP_CJG_BOX_OPEN_TICK, bytes.readInt());
            //读取实体特效
            // var effCount: number = bytes.readUnsignedByte();
            // for (var i: number = 0; i < effCount; i++) {
            // 	bytes.readByte(); bytes.readUnsignedShort(); bytes.readUnsignedInt();
            // }
            var petLenght = bytes.readUnsignedByte();
            /**宠物 */
            for (var i = 0; i < petLenght; i++) {
                /**宠物id */
                propSet.petId.push(bytes.readUnsignedShort());
                /**宠物星级 */
                propSet.petStar.push(bytes.readUnsignedShort());
                /**宠物名称 */
                propSet.petName.push(bytes.readCustomBytes());
            }
            bytes.readUnsignedInt();
            // bytes.readUnsignedShort();
            // bytes.readUnsignedInt();
            // bytes.readUnsignedInt();
            // bytes.readUnsignedInt();
            // bytes.readByte();
            bytes.readByte();
            propSet.pro(PropId.AP_BADGE_LVL, bytes.readUnsignedShort());
            App.ThingManager.createThingToList(propSet);
        }
        else {
            //角色如果存在则从消息队列删除消失的消息并呈现
            actor.disappear = false;
        }
    };
    MainProxy.prototype.doAddActorEffect = function (bytes) {
        var sender = App.ThingManager.getThing(bytes.readDouble());
        var defender = App.ThingManager.getThing(bytes.readDouble());
        if (defender) {
            var skillId = bytes.readByte();
            sender && defender && skillId && App.FightManager.playBeHitSkill(sender, defender, GameCache.skill.getDefaultUserSkill(skillId));
        }
    };
    MainProxy.prototype.doAddSceneEffect = function (bytes) {
        var sender = App.ThingManager.getThing(bytes.readDouble());
        if (sender) {
            var skillId = bytes.readByte();
            var x = bytes.readUnsignedShort();
            var y = bytes.readUnsignedShort();
            var dir = bytes.readUnsignedShort();
            var tar = bytes.readDouble();
            App.FightManager.playUseSkill(sender, x, y, GameCache.skill.getDefaultUserSkill(skillId), tar);
            //console.log(`>>>返回使用技能, 实体名字${sender.pro.charName}，是否主角：${sender.pro["isMainPlayer"]}, 技能${skillId},x:${x}, y${y}, dir${dir}`);
        }
    };
    MainProxy.prototype.doEntityDisappear = function (bytes) {
        var recog = bytes.readDouble();
        App.ThingManager.removeThing(recog);
    };
    MainProxy.prototype.doMainPropertyChange = function (bytes) {
        this.doPropertyChange(bytes, true);
    };
    MainProxy.prototype.doOtherPropertyChange = function (bytes) {
        this.doPropertyChange(bytes, false);
    };
    /**
     * 处理玩家属性变更
     * @param bytes
     * @param recog 玩家服务端标识，-1代表主玩家
     *
     */
    MainProxy.prototype.doPropertyChange = function (bytes, self) {
        if (self === void 0) { self = false; }
        var thing;
        if (!self) {
            var recog = bytes.readDouble();
            thing = App.ThingManager.getThing(recog, false);
            if (GameCache.hero.isMySelf(recog)) {
                self = true;
            }
        }
        else {
            thing = GameCache.hero.list[0];
        }
        if (thing) {
            var attCon = GameConfig.prop;
            var chList = void 0;
            //创建属性集
            var count = bytes.readByte();
            while (count > 0) {
                count--;
                var type = bytes.readUnsignedByte();
                var oldValue = void 0;
                var cal = void 0;
                if (self) {
                    cal = attCon[type] && attCon[type]["isFly"];
                    if (type == PropId.AP_LEVEL || type == PropId.AP_COIN || type == PropId.AP_YUANBAO) {
                        cal = true;
                    }
                    cal && (oldValue = thing.pro.pro(type));
                }
                var value = bytes.readUnsignedInt();
                thing.updateProperty(type, value);
                if (cal && value - oldValue != 0) {
                    var de = value - oldValue;
                    if (type == PropId.AP_LEVEL) {
                        App.FrameHandler.add(App.DisplayUtils.addEffectToObj, App.DisplayUtils, true, thing, "levelupeff_0_1", 1, 0, -100);
                        App.FrameHandler.add(SysOpenMgr.checkOpen, SysOpenMgr, true);
                    }
                    else if (type == PropId.AP_COIN) {
                        de > 0 && GlobalFun.SysMsg(StringUtils.substitute(Language.lang.huode, Language.lang.coin + " x" + de), SysMessageType.CHAT_PANEL_RIGHT);
                    }
                    else if (type == PropId.AP_YUANBAO) {
                        de > 0 && GlobalFun.SysMsg(StringUtils.substitute(Language.lang.huode, Language.lang.yb + " x" + de), SysMessageType.CHAT_PANEL_RIGHT);
                    }
                    else {
                        if (!chList)
                            chList = [];
                        chList.push({ type: type, value: de });
                    }
                }
            }
            if (chList && chList.length) {
                ProChangeTips.ins().addPro(chList);
            }
        }
    };
    MainProxy.prototype.doEntityDie = function (bytes) {
        var actor = App.ThingManager.getThing(bytes.readDouble());
        var killer = App.ThingManager.getThing(bytes.readDouble()); //击杀者
        if (actor) {
            actor.die();
            var soundId = bytes.readInt();
        }
    };
    MainProxy.prototype.doUpdatePet = function (bytes) {
        //读取实体标识
        var Recog = bytes.readDouble();
        var actor = App.ThingManager.getThing(Recog);
        if (actor && actor.pro) {
            var petLenght = bytes.readByte();
            /**宠物 */
            var petId = [];
            var petName = [];
            actor.pro.petId = [];
            actor.pro.petName = [];
            actor.removePet();
            for (var i = 0; i < petLenght; i++) {
                /**宠物id */
                actor.pro.petId.push(bytes.readUnsignedShort());
                /**宠物星级 */
                actor.pro.petStar.push(bytes.readUnsignedShort());
                /**宠物名称 */
                actor.pro.petName.push(bytes.readCustomBytes());
                actor.updatePet(actor.pro.petId[i], actor.pro.petName[i], actor.pro.petStar[i]);
            }
        }
    };
    MainProxy.prototype.doOffLineAward = function (bytes) {
        var coin = bytes.readUnsignedInt();
        var exp = bytes.readUnsignedInt();
        var eq = bytes.readUnsignedInt();
        var melt = bytes.readUnsignedInt();
        var full = bytes.readByte() == 0 ? false : true;
        var offLineTime = GlobalFun.formatMiniDateTime(bytes.readUnsignedInt());
        var view = new ViewProp();
        view.firData = {};
        view.firData["coin"] = coin;
        view.firData["exp"] = exp;
        view.firData["eq"] = eq;
        view.firData["melt"] = melt;
        view.firData["full"] = full;
        view.firData["offLineTime"] = offLineTime;
        App.ViewManager.open(ViewConst.OFFLINEAW, view);
    };
    MainProxy.prototype.doYewaiAward = function (bytes) {
        var len = bytes.readUnsignedByte();
        var i = 0;
        var arr = [];
        for (; i < len; i++) {
            var type = bytes.readUnsignedShort();
            var id = bytes.readUnsignedInt();
            var count = bytes.readUnsignedInt();
            if (type == 0) {
                arr.push({ id: id });
            }
        }
        App.ThingManager.addDropList(arr);
    };
    MainProxy.prototype.doEquitDone = function () {
        GameCache.bag.reFreshRecyle();
    };
    MainProxy.prototype.doServerDisconnected = function (bytes) {
        var type = bytes.readUnsignedByte();
        GameCache.global.disconnectedType = type;
        App.Socket.close();
        GlobalFun.alert(Language.lang.socket1, null, null, 1);
    };
    ///////////////////////////////////////////////////////////////////////////////////////
    /**
    * 请求进入游戏主界面，连接逻辑服务器后上发的第一个消息
    * @param pAccountId 帐号ID
    * @param pRoleId 角色ID
    *
    */
    MainProxy.prototype.sendEnterGameScene = function (pAccountId, pRoleId) {
        var bytes = this.getBytes(1);
        bytes.writeUnsignedInt(pAccountId);
        bytes.writeUnsignedInt(pRoleId);
        bytes.writeInt(0); //出生点id
        this.sendToServer(bytes);
        console.log("角色登录", pAccountId);
    };
    /**
     * 请求服务器时间
    */
    MainProxy.prototype.sendMsgToGetSrvTime = function () {
        this.sendMsgId(10);
    };
    /**
     * 不主动发,如果一创号就掉线,会造成没任务,当任务数据返回时判断
     *
     */
    MainProxy.prototype.welcomeBoxCallBack = function () {
        //发送命令过去要提取任务的作用
        var message = "startPlay";
        this.sendTalkToNPC(0, message);
    };
    /**
     * 发送与NPC对话消息
     * @param recog
     * @param content
     *
     */
    MainProxy.prototype.sendTalkToNPC = function (recog, content) {
        if (content === void 0) { content = ""; }
        var bytes = this.getBytes(5);
        bytes.writeDouble(recog);
        bytes.writeString(content);
        this.sendToServer(bytes);
    };
    /**
     * 视野范围
    */
    MainProxy.prototype.sendViewRange = function () {
        var bytes = this.getBytes(22);
        var x = DeviceUtils.IsPC ? 25 : 10;
        var y = DeviceUtils.IsPC ? 20 : 15;
        bytes.writeUnsignedShort(x);
        bytes.writeUnsignedShort(y);
        this.sendToServer(bytes);
    };
    return MainProxy;
}(BaseProxy));
__reflect(MainProxy.prototype, "MainProxy");
//# sourceMappingURL=MainProxy.js.map