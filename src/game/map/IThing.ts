/**
 * 地图实体接口
*/
interface IThing {
	isTouch(mouseX: number, mouseY: number): boolean
	setCellXY(X: number, Y: number, server: boolean);
}