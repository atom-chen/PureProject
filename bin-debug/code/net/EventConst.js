/**
 *
 */
var MsgEvent;
(function (MsgEvent) {
    /**Socket已经连接上 */
    MsgEvent.SOCKET_CONNECT = "SOCKET_CONNECT";
    /**Socket需要重新连接 */
    MsgEvent.SOCKET_START_RECONNECT = "SOCKET_START_RECONNECT";
    /**Socket已关闭 */
    MsgEvent.SOCKET_CLOSE = "SOCKET_CLOSE";
    /**界面适配 */
    MsgEvent.RESIZE_STAGE = "RESIZE_STAGE";
    /**Socket重连失败 */
    MsgEvent.SOCKET_RECONNECT_FAILD = "SOCKET_RECONNECT_FAILD";
})(MsgEvent || (MsgEvent = {}));
//# sourceMappingURL=EventConst.js.map