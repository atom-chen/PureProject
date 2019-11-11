var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var JobType = (function () {
    function JobType() {
    }
    JobType.getJobName = function (type) {
        return Language.lang.jobName[type];
    };
    JobType.zhanshi = 1;
    JobType.fashi = 2;
    JobType.gongshou = 3;
    return JobType;
}());
__reflect(JobType.prototype, "JobType");
//# sourceMappingURL=JobType.js.map