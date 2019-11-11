/*
 * @Description: 聊天频道类型
 * @Author: xiejunwei
 * @Date: 2019-10-08 17:25:36
 */
var ChatType;
(function (ChatType) {
    ChatType[ChatType["SYSTEM"] = 0] = "SYSTEM";
    ChatType[ChatType["WORLD"] = 1] = "WORLD";
    ChatType[ChatType["GUILD"] = 2] = "GUILD";
    ChatType[ChatType["CS"] = 3] = "CS";
})(ChatType || (ChatType = {}));
var SysMessageType;
(function (SysMessageType) {
    SysMessageType[SysMessageType["CHAT_PANEL_RIGHT"] = 1] = "CHAT_PANEL_RIGHT";
    SysMessageType[SysMessageType["SYSTEM_SCENE_CENTER"] = 2] = "SYSTEM_SCENE_CENTER";
    SysMessageType[SysMessageType["CHAT_PANEL_SYS"] = 3] = "CHAT_PANEL_SYS";
    SysMessageType[SysMessageType["SYSTEM_BARRAGE"] = 4] = "SYSTEM_BARRAGE";
    SysMessageType[SysMessageType["SYSTEM_BARRAGE_NOW"] = 5] = "SYSTEM_BARRAGE_NOW";
    SysMessageType[SysMessageType["length"] = 6] = "length"; //保留最后，总长度
})(SysMessageType || (SysMessageType = {}));
//# sourceMappingURL=ChatType.js.map