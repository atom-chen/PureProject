/**
 * 
 */
module MsgEvent {
    /**Socket已经连接上 */
    export var SOCKET_CONNECT: string = "SOCKET_CONNECT";
    /**Socket需要重新连接 */
    export var SOCKET_START_RECONNECT: string = "SOCKET_START_RECONNECT";
    /**Socket已关闭 */
    export var SOCKET_CLOSE: string = "SOCKET_CLOSE";
    /**界面适配 */
    export var RESIZE_STAGE: string = "RESIZE_STAGE";
    /**Socket重连失败 */
    export var SOCKET_RECONNECT_FAILD: string = "SOCKET_RECONNECT_FAILD";
}