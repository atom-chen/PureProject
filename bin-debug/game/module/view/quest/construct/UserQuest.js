var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
* 用户任务
* @author linsen
*
*/
var UserQuest = (function () {
    //                           任务id			随机目标Id		当前任务环数
    function UserQuest(questId, targetId, questLoop) {
        if (questId === void 0) { questId = -1; }
        if (targetId === void 0) { targetId = -1; }
        if (questLoop === void 0) { questLoop = 1; }
        this._star = 1; //说明本任务可以刷星，最高能刷星到5星
        if (questId > -1) {
            this.target = [];
            this.award = [];
            //获取任务配置
            this.stdQuest = GameConfig.quest[questId];
            if (!this.stdQuest)
                throw new Error("找不到任务ID为" + questId + "的任务");
            var stdQuest = this.stdQuest;
            if (stdQuest.randomTarget) {
                // stdQuest.questLoop = questLoop;
                // if (stdQuest.target.length > targetId)	//是随机任务
                // {
                // 	this.target = stdQuest.getTarget(targetId);
                // 	var t = (stdQuest.target[targetId]);//从库里面选需要的任务目标					
                // 	stdQuest.loopAwardId = t.rewardId;
                // 	this.award = stdQuest.getAwards(t.rewardId);//从库里面选需要的任务奖励,和当前的环数
                // }
                // else//当数据不对的时候默认为0的下标
                // {
                // 	throw new Error("服务器下发随机任务目标错误，配置里面任务目标数量：" + stdQuest.target.length + "下发的任务目标id:" + targetId + "当前下发任务ID：" + questId);
                // }
            }
            else {
                this.target = [stdQuest.target];
                stdQuest.loopAwardId = 0;
                this.award = stdQuest.awards[0];
            }
            //配置为空，则抛出错误
            //获取任务目标数量
            var numTarget = this.target.length;
            //创建任务目标完成进度
            if (stdQuest.randomTarget)
                numTarget = 1;
            this.progress = [];
            //初始化任务目标完成进度
            for (var i = 0; i < numTarget; i++) {
                this.progress[i] = 0;
            }
        }
    }
    Object.defineProperty(UserQuest.prototype, "isCompleted", {
        /**
         * 任务是否完成
         * @return
         *
         */
        get: function () {
            if (!this.progress)
                return false;
            var tQ;
            for (var i = this.progress.length - 1; i > -1; i--) {
                tQ = this.target[i];
                if (!tQ)
                    return false;
                if (this.progress[i] < tQ.count)
                    return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UserQuest.prototype, "star", {
        get: function () {
            return this._star;
        },
        set: function (value) {
            this._star = value == 0 ? 1 : value;
        },
        enumerable: true,
        configurable: true
    });
    return UserQuest;
}());
__reflect(UserQuest.prototype, "UserQuest");
//# sourceMappingURL=UserQuest.js.map