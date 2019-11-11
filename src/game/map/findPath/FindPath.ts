/**
 * 寻路算法，c++翻译过来的 
*/


class BLOCK_FLAG_TYPE {
	static FLAG_ALLCANPASS = 0;// 所有人可以通过
	static FLAG_STATICBLOCK = 2;// 静态阻挡	
	static FLAG_ROPE = 8;// 绳子区域
	static FLAG_TURNPOINT = 0x00000800;// 转接点
	static FLAG_STONE = 7;// 石头
	static FLAG_SLOPE = 3;// 左斜坡
	static FLAG_SLOPE1 = 4;// 右斜坡
};
// enum MAP_TYPE {
// 	COMM_MAP = 0,
// 	GROUND_MAP = 1,
// 	FB_MAP = 2,
// 	BATTLE_MAP = 3,
// 	SCHOOL_MAP = 4,
// };

class CMapPathData {
	static MOVETYPE_CLIMBROPE = 1;
	static MOVETYPE_CLIMBLADDER = 2;
	static MOVETYPE_JUMP = 3;
	static MOVETYPE_WALK = 4;

	public mPath: CWTPoint[];				// 寻路结果	
	public mPreList: CPathPoint[]; 			// 探寻列表，搜索到并未走到的点(索引)
	public mCloseList: CPathPoint[];		// 闭合列表，搜索到并且已经走到的点（索引）	
	public mpMapTpl: CMapTpl;

	public constructor(pMapTpl) {
		this.mpMapTpl = pMapTpl;
	}
	public GetPosIndex(pos) {
		return pos.mX + pos.mY * this.mpMapTpl.mWidth;
	}
	GetPosByIndex(index) {
		let pos = new CWTPoint();
		let mpMapTpl = this.mpMapTpl
		pos.mX = index / mpMapTpl.mWidth;
		pos.mY = index % mpMapTpl.mWidth;
		return pos;
	}

	InitialPath() {
	}

	// 寻找两点之间的路径jumpStep(跳跃时横向和纵向的最大距离)
	FindPath(srcPos: CWTPoint, desPos: CWTPoint, jumpStep: CWTPoint): CWTPoint[] {
		//trace("from"+srcPos.x.toString()+","+srcPos.y.toString()+"to"+desPos.x.toString()+","+desPos.y.toString())
		let mPath = [];
		// 找着源点所在的路径
		let PathIndex = this.FindPathOfPoint(srcPos);
		let SrcRope: CPathData;
		if (PathIndex < 0) {
			return mPath;
		}

		// 目标点不在某一条路径上,寻路失败
		let DesPathIndex = this.FindPathOfPoint(desPos);
		if (DesPathIndex < 0) {
			desPos.mY++;
			DesPathIndex = this.FindPathOfPoint(desPos);
			if (DesPathIndex < 0) {
				desPos.mY = desPos.mY - 2;
				DesPathIndex = this.FindPathOfPoint(desPos);
				if (DesPathIndex < 0) {
					return mPath;
				}
			}
		}

		this.InitialPath();
		let srcPath = this.mpMapTpl.mPathList[PathIndex];
		//if ( PathIndex >= 0 )
		//{

		//}
		//else
		//{
		//	srcPath = SrcRope;
		//}
		// 如果源和目标在同一路径上,直接得到
		if (this.PointInPath(desPos, srcPath) == true) {
			mPath.push(desPos);
			return mPath;
		}
		this.mPreList = [];
		this.mCloseList = [];

		let PathPos = new CPathPoint();
		PathPos.mCurIndex = PathIndex;
		PathPos.mEndPoint.mX = srcPos.mX;
		PathPos.mEndPoint.mY = srcPos.mY;
		this.InsertCloseList(PathPos);

		while (true) {
			let ResultPos: CPathPoint = new CPathPoint();
			let Ret = this.FindNextPath(desPos, PathPos, jumpStep, ResultPos);
			if (Ret == false) {
				let tpPathPos = this.CheckPreList();
				if (!tpPathPos) {
					return mPath;
				}
				PathPos = tpPathPos;
				ResultPos.copy(PathPos);
			}
			else {
				PathPos = ResultPos;
			}
			this.InsertCloseList(ResultPos);
			if (this.PointInPath(desPos, this.mpMapTpl.mPathList[ResultPos.mCurIndex]) == true) {
				break;
			}
		}
		// 获取路径点		
		PathIndex = PathPos.mCurIndex;
		mPath.push(new CWTPoint(desPos.mX, desPos.mY));
		for (let i = this.mCloseList.length - 1; i >= 0; --i) {
			if (PathIndex == this.mCloseList[i].mCurIndex) {
				mPath.push(new CWTPoint(this.mCloseList[i].mEndPoint.mX, this.mCloseList[i].mEndPoint.mY));
				if (this.mCloseList[i].mTurnPoint.mX != 0 || this.mCloseList[i].mTurnPoint.mY != 0) {
					mPath.push(new CWTPoint(this.mCloseList[i].mTurnPoint.mX, this.mCloseList[i].mTurnPoint.mY));
				}
				PathIndex = this.mCloseList[i].mFather;
			}
		}
		if (mPath.length > 0) {
			//mPath.pop_back();				
		}
		return mPath;
	}

	// 获取下一步路径的索引		
	FindNextPath(DesPos: CWTPoint, PathPos: CPathPoint, jumpLen: CWTPoint, PathData: CPathPoint) {
		let Path: CPathData;
		if (PathPos.mCurIndex >= 0) {
			Path = this.mpMapTpl.mPathList[PathPos.mCurIndex];
		}
		let NearPathPoint: CPathPoint;
		let PointNull = true;
		for (let i = 0; i < this.mpMapTpl.mPathList.length; ++i) {
			if (i == PathPos.mCurIndex) {
				continue;
			}
			if (this.InCloseList(i) == true) {
				continue;
			}
			let TurnPos: CWTPoint = new CWTPoint();
			let EndPos: CWTPoint = new CWTPoint();;
			let Ret = this.FindTurnPointOfPath(PathPos.mEndPoint, DesPos, Path, this.mpMapTpl.mPathList[i], TurnPos, EndPos, jumpLen);
			if (Ret < 0) {
				continue;
			}
			let NewPathPoint: CPathPoint = new CPathPoint();
			NewPathPoint.mCurIndex = i;
			NewPathPoint.mFather = PathPos.mCurIndex;
			NewPathPoint.mCureSteps = PathPos.mCureSteps + this.Length(PathPos.mEndPoint, TurnPos) + this.Length(EndPos, TurnPos);
			NewPathPoint.mFutureSteps = this.Length(EndPos, DesPos);
			NewPathPoint.mTurnPoint.mX = TurnPos.mX;
			NewPathPoint.mTurnPoint.mY = TurnPos.mY;
			NewPathPoint.mEndPoint.mX = EndPos.mX;
			NewPathPoint.mEndPoint.mY = EndPos.mY;
			// 调整下坐标
			this.AdjustPathPoint(NewPathPoint);
			// 已经找到
			if (this.PointInPath(DesPos, this.mpMapTpl.mPathList[i]) == true) {
				PathData.copy(NewPathPoint);
				return true;
			}
			if (PointNull == true) {
				NearPathPoint = NewPathPoint;
				PointNull = false;
			}
			else {
				if (NewPathPoint.mCureSteps + NewPathPoint.mFutureSteps < NearPathPoint.mCureSteps + NearPathPoint.mFutureSteps) {
					this.InsertPreList(NearPathPoint);
					NearPathPoint = NewPathPoint;
				}
				else {
					this.InsertPreList(NewPathPoint);
				}
			}
		}
		if (PointNull != true) {
			PathData.copy(NearPathPoint);
			return true;
		}
		return false;
	}

	InCloseList(Index) {
		for (let i = 0; i < this.mCloseList.length; ++i) {
			if (this.mCloseList[i].mCurIndex == Index) {
				return true;
			}
		}
		return false;
	}
	// 对当前搜索移动点查找是否需要已经在探寻列表中，如果路径更短的话则更新其父节点
	CheckPreList() {
		let PathPos: CPathPoint = null;
		let Index = -1;
		for (let i = 0; i < this.mPreList.length; ++i) {
			let CurPathPos = this.mPreList[i];
			if (!PathPos) {
				PathPos = CurPathPos;
				Index = i;
				continue;
			}
			if (PathPos.mCureSteps + PathPos.mFutureSteps > CurPathPos.mCureSteps + CurPathPos.mFutureSteps) {
				PathPos = CurPathPos;
				Index = i;
			}
		}
		if (Index >= 0) {
			this.mPreList[Index] = this.mPreList[this.mPreList.length - 1];
			this.mPreList.pop();
		}
		return PathPos;
	}
	InsertCloseList(PathPos) {
		this.mCloseList.push(PathPos);
		return 0;
	}

	AdjustPathPoint(pos: CPathPoint) {
		for (let i = 0; i < this.mPreList.length; ++i) {
			let PathPos = this.mPreList[i];
			if (PathPos.mCurIndex == pos.mCurIndex) {
				if (PathPos.mCureSteps + PathPos.mFutureSteps < pos.mCureSteps + pos.mFutureSteps) {
					pos.mCureSteps = PathPos.mCureSteps;
					pos.mFutureSteps = PathPos.mFutureSteps;
					pos.mFather = PathPos.mFather;
					pos.mTurnPoint.mX = PathPos.mTurnPoint.mX;
					pos.mTurnPoint.mY = PathPos.mTurnPoint.mY;
					pos.mEndPoint.mX = PathPos.mEndPoint.mX;
					pos.mEndPoint.mY = PathPos.mEndPoint.mY;
					this.mPreList[i] = this.mPreList[this.mPreList.length - 1];
					this.mPreList.pop();
					return 0;
				}
			}
		}
		return 0;
	}
	InsertPreList(pos) {
		this.mPreList.push(pos);
		return 0;
	}
	// 点在路径上
	PointInPath(Pos: CWTPoint, Path: CPathData) {
		// 路
		if (Path.mType == BLOCK_FLAG_TYPE.FLAG_ALLCANPASS) {
			if (Pos.mY != Path.mBeginPoint.mY) {
				return false;
			}
			if (Pos.mX >= Path.mBeginPoint.mX && Pos.mX <= Path.mEndPoint.mX) {
				return true;
			}
		}
		// 绳子或者梯子
		else {
			if (Pos.mX != Path.mBeginPoint.mX) {
				return false;
			}
			if (Pos.mY >= Path.mBeginPoint.mY && Pos.mY <= Path.mEndPoint.mY) {
				return true;
			}
		}
		return false;
	}
	// 两点之间距离的粗略算法
	Length(srcPos: CWTPoint, desPos: CWTPoint) {
		return Math.abs(srcPos.mX - desPos.mX) + Math.abs(srcPos.mY - desPos.mY);
	}

	// 是否是梯子区域
	IsRope(x, y) {
		let num = this.mpMapTpl.GetGridBlock(x, y);
		return num == BLOCK_FLAG_TYPE.FLAG_SLOPE || num == BLOCK_FLAG_TYPE.FLAG_SLOPE1;
	}

	//是否可站立
	canStand(x, y) {
		let num = this.mpMapTpl.GetGridBlock(x, y);
		return num == BLOCK_FLAG_TYPE.FLAG_SLOPE || num == BLOCK_FLAG_TYPE.FLAG_SLOPE1 || num == BLOCK_FLAG_TYPE.FLAG_STATICBLOCK
			|| num == BLOCK_FLAG_TYPE.FLAG_STONE;
	}

	// 位置是否是地图中合法的位置
	InMap(pos: CWTPoint) {
		if (pos.mX < 0 || pos.mX >= this.mpMapTpl.mWidth) {
			return false;
		}
		if (pos.mY < 0 || pos.mY >= this.mpMapTpl.mHeight) {
			return false;
		}
		return true;
	}

	// 找到两条路径的跳转点(不包括绳子)
	FindTurnPointOfPath(srcPos: CWTPoint, desPos: CWTPoint, srcPath: CPathData, desPath: CPathData, turnPoint: CWTPoint, endPoint: CWTPoint, jumpStep: CWTPoint): number {
		// 同一路径
		if (this.Length(srcPath.mBeginPoint, desPath.mBeginPoint) == 0) {
			turnPoint.mX = srcPos.mX;
			turnPoint.mY = srcPos.mY;
			return 0;
		}

		// 同一直线上
		if (srcPath.mBeginPoint.mY == desPath.mBeginPoint.mY) {
			return -1;
		}
		// 在绳子上
		// if( srcPath )
		// {
		// 	var Rope:PathData = null;				
		// 	Rope = FindRopeData( srcPath.EndPoint.x, srcPath.EndPoint.y, desPath.BeginPoint.y );				
		// 	if( Rope != null )
		// 	{
		// 		turnPoint.x = Rope.BeginPoint.x; 
		// 		endPoint.x = Rope.BeginPoint.x;										
		// 		turnPoint.y = srcPath.BeginPoint.y;
		// 		endPoint.y = desPath.BeginPoint.y;					
		// 		return 0;													
		// 	}	
		// 	return -1;								
		// }
		// 下行
		let BeginPosX = 0;
		let EndPosX = 0;
		if (desPath.mBeginPoint.mY > srcPath.mBeginPoint.mY) {
			BeginPosX = desPath.mBeginPoint.mX > srcPath.mBeginPoint.mX ? desPath.mBeginPoint.mX : srcPath.mBeginPoint.mX;
			EndPosX = desPath.mEndPoint.mX > srcPath.mEndPoint.mX ? srcPath.mEndPoint.mX : desPath.mEndPoint.mX;
			if ((EndPosX + jumpStep.mX) < BeginPosX) {
				return -1;
			}
			// 跳
			else {
				if (srcPos.mX > BeginPosX && srcPos.mX < EndPosX) {
					turnPoint.mX = srcPos.mX;
				}
				else if (srcPos.mX <= BeginPosX) {
					turnPoint.mX = BeginPosX;
				}
				else {
					turnPoint.mX = EndPosX;
				}
				endPoint.mX = turnPoint.mX;
				if (BeginPosX > EndPosX) {
					if (srcPath.mEndPoint.mX < desPath.mBeginPoint.mX) {
						endPoint.mX = BeginPosX;
						turnPoint.mX = EndPosX;
					}
					else {
						endPoint.mX = EndPosX;
						turnPoint.mX = BeginPosX;
					}
				}
				turnPoint.mY = srcPath.mBeginPoint.mY;
				endPoint.mY = desPath.mBeginPoint.mY;
				return 0;
			}
		}
		// 上行(或者平行)
		else {
			BeginPosX = desPath.mBeginPoint.mX > srcPath.mBeginPoint.mX ? desPath.mBeginPoint.mX : srcPath.mBeginPoint.mX;
			EndPosX = desPath.mEndPoint.mX > srcPath.mEndPoint.mX ? srcPath.mEndPoint.mX : desPath.mEndPoint.mX;
			if (EndPosX + jumpStep.mX < BeginPosX) {
				return -1;
			}
			else {
				// 判断是否可以跳上去
				if (Math.abs(desPath.mBeginPoint.mY - srcPath.mBeginPoint.mY) <= jumpStep.mY) {
					// 可以跳上去
					if (srcPos.mX > BeginPosX && srcPos.mX < EndPosX) {
						turnPoint.mX = srcPos.mX;
					}
					else if (srcPos.mX <= BeginPosX) {
						turnPoint.mX = BeginPosX;
					}
					else {
						turnPoint.mX = EndPosX;
					}
					endPoint.mX = turnPoint.mX;
					if (EndPosX < BeginPosX) {
						if (srcPath.mEndPoint.mX < desPath.mBeginPoint.mX) {
							endPoint.mX = BeginPosX;
							turnPoint.mX = EndPosX;
						}
						else {
							endPoint.mX = EndPosX;
							turnPoint.mX = BeginPosX;
						}
					}
					endPoint.mY = desPath.mBeginPoint.mY;
					turnPoint.mY = srcPath.mBeginPoint.mY;
					return 0;
				}
				// 找绳子
				else {
					return -1;
				}
			}
		}
	}
	// 获取某个点所在的路径
	FindPathOfPoint(Pos: CWTPoint) {
		for (let i = 0; i < this.mpMapTpl.mPathList.length; ++i) {
			let Path = this.mpMapTpl.mPathList[i];
			if (Pos.mY != Path.mBeginPoint.mY) {
				continue;
			}
			if (Pos.mX >= Path.mBeginPoint.mX && Pos.mX <= Path.mEndPoint.mX) {
				return i;
			}
		}
		return -1;
	}

	// 某点是否可以通过梯子到达
	FindRopeData(PosX, SrcPosY, DesPosY) {
		for (let i = 0; i < this.mpMapTpl.mRopeList.length; ++i) {
			let Rope = this.mpMapTpl.mRopeList[i];
			if (Rope.mBeginPoint.mX != PosX) {
				continue;
			}
			if (SrcPosY < (Rope.mBeginPoint.mY - 1) || SrcPosY > (Rope.mEndPoint.mY + 1)) {
				continue;
			}
			if (DesPosY < (Rope.mBeginPoint.mY - 1) || DesPosY > (Rope.mEndPoint.mY + 1)) {
				continue;
			}
			return Rope;
		}
		return;
	}
	// 得到点在哪一个梯子上
	GetRopeByPoint(Pos: CWTPoint) {
		for (let i = 0; i < this.mpMapTpl.mRopeList.length; ++i) {
			let Rope = this.mpMapTpl.mRopeList[i];
			if (Rope.mBeginPoint.mX != Pos.mX) {
				continue;
			}
			if (Pos.mY >= Rope.mBeginPoint.mY && Pos.mY <= Rope.mEndPoint.mY) {
				return Rope;
			}
		}
		return;
	}
};

class CWTPoint {
	mX;
	mY;
	public constructor(v1 = 0, v2 = 0) {
		this.mX = v1;
		this.mY = v2;
	}

	Length(p: CWTPoint) {
		return egret.Point.distance(new egret.Point(this.mX, this.mY), new egret.Point(p.mX, p.mY));
	}
}

class CPathData {
	mBeginPoint: CWTPoint = new CWTPoint();
	mEndPoint: CWTPoint = new CWTPoint();
	mType;
	public constructor() {
		this.mType = BLOCK_FLAG_TYPE.FLAG_ALLCANPASS;
	}
};

class CPathPoint {
	mCurIndex;
	mFather;
	mTurnPoint: CWTPoint;
	mEndPoint: CWTPoint;
	mCureSteps;
	mFutureSteps;
	public constructor() {
		this.mCurIndex = -1;
		this.mFather = -1;
		this.mCureSteps = 0;
		this.mFutureSteps = 0;

		this.mTurnPoint = new CWTPoint(0, 0);
		this.mEndPoint = new CWTPoint(0, 0);
	}

	copy(t: CPathPoint) {
		this.mCurIndex = t.mCurIndex;
		this.mFather = t.mFather;
		this.mTurnPoint.mX = t.mTurnPoint.mX;
		this.mTurnPoint.mY = t.mTurnPoint.mY;
		this.mEndPoint.mX = t.mEndPoint.mX;
		this.mEndPoint.mY = t.mEndPoint.mY;
		this.mCureSteps = t.mCureSteps;
		this.mFutureSteps = t.mFutureSteps;
	}
}
class CMapTpl {
	mWidth;
	mHeight;
	mGrids: any[][];
	mPathList: CPathData[];
	mRopeList: CPathData[];

	public constructor() {

	}

	parese(gridData: any[][]) {
		this.mGrids = gridData;
		this.mHeight = gridData.length;
		this.mWidth = gridData[0].length;

		this.mPathList = [];
		this.mRopeList = [];

		let tWidth = 0;
		let tHeight = 0;
		for (; tHeight < gridData.length; tHeight++) {
			let arr = gridData[tHeight]
			for (tWidth = 0; tWidth < arr.length; tWidth++) {
				let tBlockType = parseInt(arr[tWidth]);
				//tBlockType = this.GetBlockType(tBlockType);

				// 内部设置信息
				this.SetBlock(tBlockType, new CWTPoint(tWidth, tHeight));
			}
		}

		//console.log(this.mPathList, this.mRopeList);

	}

	GetGridBlock(mx, my): number {
		let arr = this.mGrids[my];
		if (arr) {
			return arr[mx];
		}
		return 0;
	}

	SetBlock(Block, pos: CWTPoint) {
		//Block = GetBlockType(Block);				

		// 静态阻挡和绳子的上方如果不是阻挡就是路				
		if (Block == BLOCK_FLAG_TYPE.FLAG_STATICBLOCK ||
			Block == BLOCK_FLAG_TYPE.FLAG_TURNPOINT ||
			Block == BLOCK_FLAG_TYPE.FLAG_STONE ||
			Block == BLOCK_FLAG_TYPE.FLAG_SLOPE ||
			Block == BLOCK_FLAG_TYPE.FLAG_SLOPE1) {
			let tpGridBlock = this.GetGridBlock(pos.mX, (pos.mY - 1));
			if (tpGridBlock) {
				if (tpGridBlock != BLOCK_FLAG_TYPE.FLAG_STATICBLOCK && tpGridBlock != BLOCK_FLAG_TYPE.FLAG_SLOPE && tpGridBlock != BLOCK_FLAG_TYPE.FLAG_SLOPE1) {
					this.SetPathData(pos.mX, pos.mY - 1, BLOCK_FLAG_TYPE.FLAG_ALLCANPASS);
				}
			}

			if (Block == BLOCK_FLAG_TYPE.FLAG_STONE || Block == BLOCK_FLAG_TYPE.FLAG_SLOPE || Block == BLOCK_FLAG_TYPE.FLAG_SLOPE1) {
				Block = BLOCK_FLAG_TYPE.FLAG_STATICBLOCK;
			}
			// TODO:要加绳子
			if (Block == BLOCK_FLAG_TYPE.FLAG_TURNPOINT) {
				Block = BLOCK_FLAG_TYPE.FLAG_ROPE;
				this.SetPathData(pos.mX, pos.mY - 1, BLOCK_FLAG_TYPE.FLAG_ROPE);
			}
		}
		if (Block == BLOCK_FLAG_TYPE.FLAG_ROPE) {
			this.SetPathData(pos.mX, pos.mY, Block);
		}
	}

	SetPathData(posx, posy, block) {
		let Pos = new CWTPoint(posx, posy);
		if (block == BLOCK_FLAG_TYPE.FLAG_ALLCANPASS) {
			for (let i = 0; i < this.mPathList.length; i++) {
				let Path = this.mPathList[i];
				if (Pos.Length(Path.mEndPoint) == 1 && Path.mEndPoint.mY == Pos.mY) {
					Path.mEndPoint.mX = Pos.mX;
					Path.mEndPoint.mY = Pos.mY;
					return;
				}
			}
			// 没找到
			let NewPath = new CPathData();
			NewPath.mBeginPoint.mX = Pos.mX;
			NewPath.mBeginPoint.mY = Pos.mY;
			NewPath.mEndPoint.mX = Pos.mX;
			NewPath.mEndPoint.mY = Pos.mY;
			NewPath.mType = block;
			this.mPathList.push(NewPath);
			this.SetRopeData(posx, posy, block);
		}
		else {
			this.SetRopeData(posx, posy, block);
		}
	}

	SetRopeData(posx, posy, block) {
		let Pos = new CWTPoint(posx, posy);
		for (let i = 0; i < this.mRopeList.length; i++) {
			let Path = this.mRopeList[i];
			if (Pos.Length(Path.mEndPoint) == 1 && Path.mEndPoint.mX == Pos.mX) {
				Path.mEndPoint.mX = Pos.mX;
				Path.mEndPoint.mY = Pos.mY;
				return;
			}
			if (Pos.Length(Path.mBeginPoint) == 0 && block == BLOCK_FLAG_TYPE.FLAG_ALLCANPASS) {
				Path.mBeginPoint.mY += 1;
			}
			if (Pos.Length(Path.mEndPoint) == 0 && block == BLOCK_FLAG_TYPE.FLAG_ALLCANPASS) {
				Path.mEndPoint.mY -= 1;
			}
		}

		// 没找到
		if (block == BLOCK_FLAG_TYPE.FLAG_ROPE) //|| block==GrideData.BLOCK_LADDER )
		{
			let NewPath = new CPathData();
			NewPath.mBeginPoint.mX = Pos.mX;
			NewPath.mBeginPoint.mY = Pos.mY;
			NewPath.mEndPoint.mX = Pos.mX;
			NewPath.mEndPoint.mY = Pos.mY;
			NewPath.mType = block;
			this.mRopeList.push(NewPath);
		}
	}

	// 解析客户端编辑出的地图数字信息
	// GetBlockType(nBlock) {
	// 	switch (nBlock) {
	// 		case 2:
	// 			{
	// 				nBlock = BLOCK_FLAG_TYPE.FLAG_STATICBLOCK;
	// 				break;
	// 			}
	// 		case 7:
	// 			{
	// 				nBlock = BLOCK_FLAG_TYPE.FLAG_STONE;
	// 				break;
	// 			}
	// 		case 9:
	// 		case 6:
	// 			{
	// 				nBlock = BLOCK_FLAG_TYPE.FLAG_TURNPOINT;
	// 				break;
	// 			}
	// 		case 5:
	// 		case 8:
	// 			{
	// 				nBlock = BLOCK_FLAG_TYPE.FLAG_ROPE;
	// 				break;
	// 			}
	// 		case 3:
	// 		case 4:
	// 			{
	// 				nBlock = BLOCK_FLAG_TYPE.FLAG_SLOPE;
	// 				break;
	// 			}
	// 	}
	// 	return nBlock;
	// }
}
// class CGridBlock {
// 	mBlockInfo = [];

// 	public constructor() {
// 		this.mBlockInfo[0] = BLOCK_FLAG_TYPE.FLAG_NPCCANNOTPASS;
// 	}

// 	Initial() {
// 		this.mBlockInfo[0] = 0;
// 		return true;
// 	}

// 	SetValue(nValue) { this.mBlockInfo[0] = nValue; }

// 	// 玩家是否可以通过
// 	CanPlayerPass() { return ((this.mBlockInfo[0] & BLOCK_FLAG_TYPE.FLAG_STATICBLOCK) == 0); }

// 	// NPC是否可以通过
// 	CanNpcPass() { return ((this.mBlockInfo[0] & BLOCK_FLAG_TYPE.FLAG_ROPE) != BLOCK_FLAG_TYPE.FLAG_ROPE && (this.mBlockInfo[0] & BLOCK_FLAG_TYPE.FLAG_EMPTY) != BLOCK_FLAG_TYPE.FLAG_EMPTY); }// �����ǿ��л���������ֻ��ƽ���ƶ�  ( mBlockInfo[ 0 ] & FLAG_NPCCANNOTPASS ) != FLAG_NPCCANNOTPASS

// 	// 格子是否是绝对安全区域
// 	IsAbsSafeRegion() { return ((this.mBlockInfo[0] & BLOCK_FLAG_TYPE.FLAG_ABSOLUTESAFE) == BLOCK_FLAG_TYPE.FLAG_ABSOLUTESAFE); }

// 	// 格子是否是相对安全区域
// 	IsCtrSafeRegion() { return ((this.mBlockInfo[0] & BLOCK_FLAG_TYPE.FLAG_CONTRARYSAFE) == BLOCK_FLAG_TYPE.FLAG_CONTRARYSAFE); }

// 	// 是否是静态阻挡
// 	IsStaticBlock() { return ((this.mBlockInfo[0] & BLOCK_FLAG_TYPE.FLAG_STATICBLOCK) == BLOCK_FLAG_TYPE.FLAG_STATICBLOCK); }

// 	// 是否是死亡阻挡
// 	IsDeadBlock() { return ((this.mBlockInfo[0] & BLOCK_FLAG_TYPE.FLAG_DEADCBLOCK) == BLOCK_FLAG_TYPE.FLAG_DEADCBLOCK); }

// 	// 是否是摆摊安全区
// 	IsStallSafty() { return ((this.mBlockInfo[0] & BLOCK_FLAG_TYPE.FLAG_STALLAREA) == BLOCK_FLAG_TYPE.FLAG_STALLAREA); }

// 	// 是否是高级阻挡
// 	IsSuperBlock() { return ((this.mBlockInfo[0] & BLOCK_FLAG_TYPE.FLAG_SUPERBLOCK) == BLOCK_FLAG_TYPE.FLAG_SUPERBLOCK); }

// };

