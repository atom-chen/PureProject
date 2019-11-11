window.skins=window.skins||{};
                var __extends = this && this.__extends|| function (d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = window.generateEUI||{};
                generateEUI.paths = generateEUI.paths||{};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml"};generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 18;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);generateEUI.paths['resource/exml/activity/catalogue/ActivityCataItemSkin.exml'] = window.ActivityCataItemSkin = (function (_super) {
	__extends(ActivityCataItemSkin, _super);
	function ActivityCataItemSkin() {
		_super.call(this);
		this.skinParts = ["banner","labTime"];
		
		this.elementsContent = [this.banner_i(),this.labTime_i()];
	}
	var _proto = ActivityCataItemSkin.prototype;

	_proto.banner_i = function () {
		var t = new eui.Image();
		this.banner = t;
		t.source = "res/images/banner/activity/catalogue/actvity_catalogue_banner_1.png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.labTime_i = function () {
		var t = new eui.Label();
		this.labTime = t;
		t.left = 10;
		t.size = 18;
		t.text = "Label";
		t.textAlign = "left";
		t.verticalAlign = "middle";
		t.y = 70;
		return t;
	};
	return ActivityCataItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/btn/BtnIconSkin.exml'] = window.BtnIconSkin = (function (_super) {
	__extends(BtnIconSkin, _super);
	function BtnIconSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.currentState = "up";
		this.elementsContent = [this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("iconDisplay","verticalCenter",0)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("iconDisplay","scaleX",0.95),
					new eui.SetProperty("iconDisplay","scaleY",0.95),
					new eui.SetProperty("iconDisplay","verticalCenter",0)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("iconDisplay","verticalCenter",0)
				])
		];
	}
	var _proto = BtnIconSkin.prototype;

	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 15;
		t.horizontalCenter = 0;
		t.size = 18;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.visible = false;
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	return BtnIconSkin;
})(eui.Skin);generateEUI.paths['resource/exml/instruction/InstructionPartSkin.exml'] = window.InstructionPartSkin = (function (_super) {
	__extends(InstructionPartSkin, _super);
	function InstructionPartSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 33;
		this.width = 32;
		this.elementsContent = [this._Button1_i()];
	}
	var _proto = InstructionPartSkin.prototype;

	_proto._Button1_i = function () {
		var t = new eui.Button();
		t.horizontalCenter = 0;
		t.icon = "win_json.win_wenhao_1_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.verticalCenter = 0;
		t.width = 32;
		return t;
	};
	return InstructionPartSkin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/BaseWinBgSkin.exml'] = window.BaseWinBgSkin = (function (_super) {
	__extends(BaseWinBgSkin, _super);
	function BaseWinBgSkin() {
		_super.call(this);
		this.skinParts = ["closeBtn","winTitle","syBtn"];
		
		this.height = 750;
		this.width = 582;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = BaseWinBgSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.left = 1;
		t.right = 1;
		t.top = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this.closeBtn_i(),this.winTitle_i(),this.syBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.left = 11;
		t.right = 11;
		t.scale9Grid = new egret.Rectangle(43,44,79,46);
		t.source = "win_json.win_bg_png";
		t.top = 0;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.source = "win_json.win_close_btn_png";
		t.x = 492;
		t.y = -6;
		return t;
	};
	_proto.winTitle_i = function () {
		var t = new eui.Image();
		this.winTitle = t;
		t.source = "res/images/winTitle/badge.png";
		t.x = 44;
		t.y = 8;
		return t;
	};
	_proto.syBtn_i = function () {
		var t = new BaseCustComponent();
		this.syBtn = t;
		t.className = "InstructionPart";
		t.skinName = "InstructionPartSkin";
		t.visible = false;
		t.width = 32;
		t.x = 135;
		t.y = 10;
		return t;
	};
	return BaseWinBgSkin;
})(eui.Skin);generateEUI.paths['resource/exml/activity/catalogue/ActivityCataSkin.exml'] = window.ActivityCataSkin = (function (_super) {
	__extends(ActivityCataSkin, _super);
	function ActivityCataSkin() {
		_super.call(this);
		this.skinParts = ["bg","list"];
		
		this.height = 750;
		this.width = 582;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Scroller1_i(),this._Image4_i(),this._Image5_i()];
	}
	var _proto = ActivityCataSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.skinName = "BaseWinBgSkin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 680;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(20,168,65,17);
		t.source = "win_json.win_bg4_png";
		t.top = 50;
		t.width = 530;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 47;
		t.height = 646.66;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.width = 506;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 680;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(20,168,65,17);
		t.source = "public_json.";
		t.top = 50;
		t.width = 530;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 30;
		t.left = 35;
		t.right = 35;
		t.top = 55;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.itemRendererSkinName = ActivityCataItemSkin;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		t.paddingTop = 5;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(20,168,65,17);
		t.source = "activityCata_json.activity_catalogue_liwu_png";
		t.touchEnabled = false;
		t.x = 455.33;
		t.y = 643.34;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(20,168,65,17);
		t.source = "activityCata_json.activity_catalogue_zhu_png";
		t.touchEnabled = false;
		t.x = -66;
		t.y = 591.32;
		return t;
	};
	return ActivityCataSkin;
})(eui.Skin);generateEUI.paths['resource/exml/item/component/ItemExpendSkin.exml'] = window.ItemExpendSkin = (function (_super) {
	__extends(ItemExpendSkin, _super);
	function ItemExpendSkin() {
		_super.call(this);
		this.skinParts = ["gainWay","lab","iconImg","countTxt"];
		
		this.currentState = "normal";
		this.elementsContent = [this.gainWay_i(),this._Group1_i()];
		this._Label1_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("single",
				[
					new eui.AddItems("_Label1","_Group1",2,"countTxt"),
					new eui.SetProperty("countTxt","textColor",0xe6daac)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.label"],[0],this.lab,"text");
	}
	var _proto = ItemExpendSkin.prototype;

	_proto.gainWay_i = function () {
		var t = new eui.Label();
		this.gainWay = t;
		t.right = -35;
		t.size = 16;
		t.text = "获取";
		t.textColor = 0x36ff00;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		this._Group1 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.lab_i(),this.iconImg_i(),this.countTxt_i(),this._Label2_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 2;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.lab_i = function () {
		var t = new eui.Label();
		this.lab = t;
		t.bold = true;
		t.left = -51;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 18;
		t.textColor = 0x6a453b;
		t.verticalCenter = 0;
		return t;
	};
	_proto.iconImg_i = function () {
		var t = new eui.Image();
		this.iconImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 32;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "";
		t.verticalCenter = 0;
		t.width = 32;
		t.x = 1;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.size = 18;
		t.text = "";
		t.textColor = 0x00ff0c;
		t.x = 44;
		t.y = 21;
		return t;
	};
	_proto.countTxt_i = function () {
		var t = new eui.Label();
		this.countTxt = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 18;
		t.text = "100/100";
		t.textColor = 0x4c2f27;
		t.x = 31;
		t.y = 8;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.size = 18;
		t.text = "   ";
		t.textColor = 0x36FF00;
		t.verticalCenter = 0;
		t.x = 107;
		return t;
	};
	return ItemExpendSkin;
})(eui.Skin);generateEUI.paths['resource/exml/activity/xslb/XSLBWinSkin.exml'] = window.XSLBWinSkin = (function (_super) {
	__extends(XSLBWinSkin, _super);
	function XSLBWinSkin() {
		_super.call(this);
		this.skinParts = ["closeBtn","iG","cost_1","cost_0","zdl","buyBtn","buyTime","tabBtn","img_0","img_1","soldOut"];
		
		this.elementsContent = [this._Image1_i(),this.closeBtn_i(),this.iG_i(),this.cost_1_i(),this.cost_0_i(),this.zdl_i(),this.buyBtn_i(),this.buyTime_i(),this.tabBtn_i(),this._Image2_i(),this.img_0_i(),this.img_1_i(),this._Image3_i(),this.soldOut_i()];
	}
	var _proto = XSLBWinSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "res/images/bg/xslbBg.png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.source = "win_json.win_close_btn4_png";
		t.x = 581;
		t.y = 62;
		return t;
	};
	_proto.iG_i = function () {
		var t = new eui.Group();
		this.iG = t;
		t.x = 260;
		t.y = 159;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 8;
		t.requestedColumnCount = 4;
		t.verticalGap = 8;
		return t;
	};
	_proto.cost_1_i = function () {
		var t = new ItemExpend();
		this.cost_1 = t;
		t.currentState = "single";
		t.label = "原价 : ";
		t.skinName = "ItemExpendSkin";
		t.x = 149;
		t.y = 435;
		return t;
	};
	_proto.cost_0_i = function () {
		var t = new ItemExpend();
		this.cost_0 = t;
		t.currentState = "single";
		t.label = "现价 : ";
		t.skinName = "ItemExpendSkin";
		t.x = 333;
		t.y = 435;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new NumberMC();
		this.zdl = t;
		t.height = 20;
		t.width = 20;
		t.x = 271;
		t.y = 104;
		return t;
	};
	_proto.buyBtn_i = function () {
		var t = new eui.Button();
		this.buyBtn = t;
		t.horizontalCenter = 0;
		t.icon = "res/btn/buy5.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.y = 464;
		return t;
	};
	_proto.buyTime_i = function () {
		var t = new eui.Label();
		this.buyTime = t;
		t.horizontalCenter = 199;
		t.size = 16;
		t.text = "剩余购买时间 : 20XX20XX";
		t.textColor = 0xffc600;
		t.y = 114;
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = TabBar6Skin;
		t.selectedIndex = 0;
		t.y = 341;
		t.layout = this._HorizontalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 4;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.icon = "xslb_json.xslb_icon_0_png";
		t.icon2 = "xslb_json.xslb_type_0_png";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.icon = "xslb_json.xslb_icon_1_png";
		t.icon2 = "xslb_json.xslb_type_1_png";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.icon = "xslb_json.xslb_icon_2_png";
		t.icon2 = "xslb_json.xslb_type_2_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "res/images/bg/xslbt.png";
		t.x = 50;
		t.y = 153;
		return t;
	};
	_proto.img_0_i = function () {
		var t = new eui.Image();
		this.img_0 = t;
		t.source = "xslb_json.xslb_texture_0_png";
		t.x = 8;
		t.y = 105;
		return t;
	};
	_proto.img_1_i = function () {
		var t = new eui.Image();
		this.img_1 = t;
		t.source = "xslb_json.xslb_texture_1_png";
		t.x = 23;
		t.y = 174;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(1,0,6,2);
		t.source = "xslb_json.xslb_slice_png";
		t.width = 166;
		t.x = 134;
		t.y = 450;
		return t;
	};
	_proto.soldOut_i = function () {
		var t = new eui.Image();
		this.soldOut = t;
		t.source = "xsyh_json.xsyh_soldout_png";
		t.visible = false;
		t.x = 269;
		t.y = 476;
		return t;
	};
	return XSLBWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/item/ItembaseSkin.exml'] = window.ItembaseSkin = (function (_super) {
	__extends(ItembaseSkin, _super);
	function ItembaseSkin() {
		_super.call(this);
		this.skinParts = ["sele","bg","color","ico","jobImg","zlflag","num","part","usLevel"];
		
		this.height = 81;
		this.width = 79;
		this.elementsContent = [this.sele_i(),this.bg_i(),this.color_i(),this.ico_i(),this.jobImg_i(),this.zlflag_i(),this.num_i(),this.part_i(),this.usLevel_i()];
	}
	var _proto = ItembaseSkin.prototype;

	_proto.sele_i = function () {
		var t = new eui.Image();
		this.sele = t;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(9,10,61,61);
		t.source = "public_json.public_selected_png";
		t.verticalCenter = -1.5;
		t.visible = false;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.horizontalCenter = 0;
		t.source = "public_json.public_item_bg_png";
		t.y = 0;
		return t;
	};
	_proto.color_i = function () {
		var t = new eui.Image();
		this.color = t;
		t.height = 81;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 0;
		t.width = 79;
		return t;
	};
	_proto.ico_i = function () {
		var t = new eui.Image();
		this.ico = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.jobImg_i = function () {
		var t = new eui.Image();
		this.jobImg = t;
		t.source = "";
		t.x = 48;
		t.y = 49;
		return t;
	};
	_proto.zlflag_i = function () {
		var t = new eui.Image();
		this.zlflag = t;
		t.source = "public_json.public_g_allow_png";
		t.visible = false;
		t.x = 57;
		t.y = 5;
		return t;
	};
	_proto.num_i = function () {
		var t = new eui.Label();
		this.num = t;
		t.bottom = 6;
		t.right = 4;
		t.size = 18;
		t.stroke = 2;
		t.text = "";
		t.textColor = 0xFFFFFF;
		return t;
	};
	_proto.part_i = function () {
		var t = new eui.Image();
		this.part = t;
		t.left = 8;
		t.source = "";
		t.top = 52;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.usLevel_i = function () {
		var t = new eui.Label();
		this.usLevel = t;
		t.size = 16;
		t.stroke = 2;
		t.text = "";
		t.textColor = 0xFFEC1C;
		t.x = 4;
		t.y = 5;
		return t;
	};
	return ItembaseSkin;
})(eui.Skin);generateEUI.paths['resource/exml/activity/xsyh/XSYHItemSkin.exml'] = window.XSYHItemSkin = (function (_super) {
	__extends(XSYHItemSkin, _super);
	function XSYHItemSkin() {
		_super.call(this);
		this.skinParts = ["imgItem1","imgItem0","icon0","buyBtn","l1","lbNum0","l0","lbNum1","limit","iName","imgSale","bImg","soldOut"];
		
		this.height = 139;
		this.elementsContent = [this._Image1_i(),this.imgItem1_i(),this.imgItem0_i(),this.icon0_i(),this.buyBtn_i(),this.l1_i(),this.lbNum0_i(),this.l0_i(),this.lbNum1_i(),this.limit_i(),this.iName_i(),this.imgSale_i(),this._Image2_i(),this.bImg_i(),this.soldOut_i()];
	}
	var _proto = XSYHItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(30,36,181,82);
		t.source = "shop_json.shop_img_3_png";
		t.top = 0;
		t.touchEnabled = false;
		t.x = 0;
		return t;
	};
	_proto.imgItem1_i = function () {
		var t = new eui.Image();
		this.imgItem1 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "res/images/item/14.png";
		t.touchEnabled = false;
		t.x = 140;
		t.y = 36;
		return t;
	};
	_proto.imgItem0_i = function () {
		var t = new eui.Image();
		this.imgItem0 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "res/images/item/14.png";
		t.touchEnabled = false;
		t.x = 140;
		t.y = 61.5;
		return t;
	};
	_proto.icon0_i = function () {
		var t = new BaseCustComponent();
		this.icon0 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 7;
		t.y = 17;
		return t;
	};
	_proto.buyBtn_i = function () {
		var t = new eui.Button();
		this.buyBtn = t;
		t.icon = "res/btn/buy3.png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.touchEnabled = true;
		t.x = 168;
		t.y = 98;
		return t;
	};
	_proto.l1_i = function () {
		var t = new eui.Label();
		this.l1 = t;
		t.size = 18;
		t.text = "价格:";
		t.textColor = 0xffffff;
		t.touchEnabled = false;
		t.x = 96;
		t.y = 68.5;
		return t;
	};
	_proto.lbNum0_i = function () {
		var t = new eui.Label();
		this.lbNum0 = t;
		t.size = 18;
		t.text = "9999";
		t.textColor = 0xffffff;
		t.touchEnabled = false;
		t.x = 171;
		t.y = 68.5;
		return t;
	};
	_proto.l0_i = function () {
		var t = new eui.Label();
		this.l0 = t;
		t.size = 18;
		t.text = "价格:";
		t.textColor = 0x3e1700;
		t.touchEnabled = false;
		t.x = 96;
		t.y = 43;
		return t;
	};
	_proto.lbNum1_i = function () {
		var t = new eui.Label();
		this.lbNum1 = t;
		t.size = 18;
		t.text = "9999";
		t.textColor = 0x3e1700;
		t.touchEnabled = false;
		t.x = 171;
		t.y = 43;
		return t;
	};
	_proto.limit_i = function () {
		var t = new eui.Label();
		this.limit = t;
		t.horizontalCenter = 60;
		t.size = 17;
		t.text = "VIP2可购买";
		t.textColor = 0xfff600;
		t.visible = false;
		t.y = 105;
		return t;
	};
	_proto.iName_i = function () {
		var t = new eui.Label();
		this.iName = t;
		t.size = 18;
		t.text = "道具名称";
		t.textColor = 0x3e1700;
		t.x = 96;
		t.y = 19;
		return t;
	};
	_proto.imgSale_i = function () {
		var t = new eui.Image();
		this.imgSale = t;
		t.source = "shop_json.shop_sale_1_png";
		t.touchEnabled = false;
		t.x = 8;
		t.y = 18;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "shop_json.shop_img_4_png";
		t.x = 90;
		t.y = 50;
		return t;
	};
	_proto.bImg_i = function () {
		var t = new eui.Image();
		this.bImg = t;
		t.source = "xsyh_json.xsyh_blank_png";
		t.visible = false;
		t.x = 127;
		t.y = 99;
		return t;
	};
	_proto.soldOut_i = function () {
		var t = new eui.Image();
		this.soldOut = t;
		t.source = "xsyh_json.xsyh_soldout_png";
		t.x = 153;
		t.y = 98;
		return t;
	};
	return XSYHItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/activity/xsyh/XSYHPageSkin.exml'] = window.XSYHPageSkin = (function (_super) {
	__extends(XSYHPageSkin, _super);
	function XSYHPageSkin() {
		_super.call(this);
		this.skinParts = ["itemList","zdl","num"];
		
		this.height = 565;
		this.width = 510;
		this.elementsContent = [this._Image1_i(),this._Scroller1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.zdl_i(),this._Image5_i(),this.num_i()];
	}
	var _proto = XSYHPageSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "res/images/bg/xsyhBg.png";
		t.y = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.height = 394;
		t.horizontalCenter = 0.5;
		t.width = 493;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = XSYHItemSkin;
		t.layout = this._TileLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "xsyh_json.xsyh_texture_1_png";
		t.x = 160;
		t.y = -4;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "xsyh_json.xsyh_texture_0_png";
		t.x = 209;
		t.y = 105;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "xsyh_json.xsyh_num_p_png";
		t.x = 290;
		t.y = 109;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new NumberMC();
		this.zdl = t;
		t.type = "xsyh_json.xsyh_num_";
		t.x = 323;
		t.y = 109;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "copyexp_json.copyexp_texture_0_png";
		t.x = 322;
		t.y = 142;
		return t;
	};
	_proto.num_i = function () {
		var t = new NumberMC();
		this.num = t;
		t.type = "time_";
		t.x = 394;
		t.y = 142;
		return t;
	};
	return XSYHPageSkin;
})(eui.Skin);generateEUI.paths['resource/exml/activity/xsyh/XSYHPannelSkin.exml'] = window.XSYHPannelSkin = (function (_super) {
	__extends(XSYHPannelSkin, _super);
	function XSYHPannelSkin() {
		_super.call(this);
		this.skinParts = ["itemList"];
		
		this.elementsContent = [this._Scroller1_i()];
	}
	var _proto = XSYHPannelSkin.prototype;

	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.height = 484;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 493;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = XSYHItemSkin;
		t.layout = this._TileLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	return XSYHPannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/actorSelect/ActorHpSkin.exml'] = window.ActorHpSkin = (function (_super) {
	__extends(ActorHpSkin, _super);
	function ActorHpSkin() {
		_super.call(this);
		this.skinParts = ["hp_1","hp_0","hpG","headIcon","owner","og","mName","hpLab"];
		
		this.width = 640;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = ActorHpSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image1_i(),this.hpG_i(),this._Image2_i(),this.headIcon_i(),this.og_i(),this.mName_i(),this.hpLab_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "hp_json.hp_blank_png";
		t.x = 209.78;
		t.y = 14.7;
		return t;
	};
	_proto.hpG_i = function () {
		var t = new eui.Group();
		this.hpG = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 224.78;
		t.y = 49.7;
		t.elementsContent = [this.hp_1_i(),this.hp_0_i()];
		return t;
	};
	_proto.hp_1_i = function () {
		var t = new eui.Image();
		this.hp_1 = t;
		t.anchorOffsetX = 0;
		t.left = -14;
		t.scale9Grid = new egret.Rectangle(6,2,233,13);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "hp_json.hp_5_png";
		t.width = 284;
		t.y = 0;
		return t;
	};
	_proto.hp_0_i = function () {
		var t = new eui.Image();
		this.hp_0 = t;
		t.anchorOffsetX = 0;
		t.left = -14;
		t.scale9Grid = new egret.Rectangle(6,2,233,13);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "hp_json.hp_5_png";
		t.width = 284;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "hp_json.hp_icon_png";
		t.x = 107;
		t.y = 0;
		return t;
	};
	_proto.headIcon_i = function () {
		var t = new eui.Image();
		this.headIcon = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "";
		t.x = 103;
		t.y = -35;
		return t;
	};
	_proto.og_i = function () {
		var t = new eui.Group();
		this.og = t;
		t.x = 244.98;
		t.y = 81.03;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this.owner_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 22;
		t.scale9Grid = new egret.Rectangle(37,2,121,18);
		t.source = "hp_json.hp_name_blan_png";
		t.width = 197;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "hp_json.hp_tag_png";
		t.x = 31;
		t.y = 5;
		return t;
	};
	_proto.owner_i = function () {
		var t = new eui.Label();
		this.owner = t;
		t.size = 16;
		t.text = "归属 : XXXX";
		t.textColor = 0xffc600;
		t.x = 48;
		t.y = 3;
		return t;
	};
	_proto.mName_i = function () {
		var t = new eui.Label();
		this.mName = t;
		t.left = 244;
		t.size = 16;
		t.text = "Label";
		t.textColor = 0xffffff;
		t.top = 21;
		return t;
	};
	_proto.hpLab_i = function () {
		var t = new eui.Label();
		this.hpLab = t;
		t.right = 155;
		t.size = 18;
		t.text = "10/10";
		t.textColor = 0x2aff00;
		t.y = 50;
		return t;
	};
	return ActorHpSkin;
})(eui.Skin);generateEUI.paths['resource/exml/adventure/AdventureItemSkin.exml'] = window.AdventureItemSkin = (function (_super) {
	__extends(AdventureItemSkin, _super);
	function AdventureItemSkin() {
		_super.call(this);
		this.skinParts = ["item","nameLab","btn","prize_flag","proLab"];
		
		this.elementsContent = [this._Image1_i(),this.item_i(),this.nameLab_i(),this.btn_i(),this.prize_flag_i(),this.proLab_i()];
	}
	var _proto = AdventureItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 109;
		t.scale9Grid = new egret.Rectangle(16,12,34,8);
		t.source = "adventure_json.adventureItemBg_png";
		t.width = 493;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.item_i = function () {
		var t = new BaseCustComponent();
		this.item = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 23;
		t.y = 14;
		return t;
	};
	_proto.nameLab_i = function () {
		var t = new eui.Label();
		this.nameLab = t;
		t.size = 18;
		t.text = "任务名称";
		t.textColor = 0x4c2f27;
		t.x = 112;
		t.y = 26;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.icon = "res/btn/get_2.png";
		t.label = "装备";
		t.skinName = "BtnIconSkin";
		t.x = 348;
		t.y = 30;
		return t;
	};
	_proto.prize_flag_i = function () {
		var t = new eui.Image();
		this.prize_flag = t;
		t.source = "public_json.public_finish2_png";
		t.verticalCenter = 0;
		t.x = 358;
		return t;
	};
	_proto.proLab_i = function () {
		var t = new eui.Label();
		this.proLab = t;
		t.size = 18;
		t.text = "1/10";
		t.textColor = 0xff0000;
		t.x = 112;
		t.y = 60;
		return t;
	};
	return AdventureItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/progressBar/progressBarSkin5.exml'] = window.progressBarSkin5 = (function (_super) {
	__extends(progressBarSkin5, _super);
	function progressBarSkin5() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = progressBarSkin5.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 24;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(34,8,204,7);
		t.source = "public_json.public_progess_blank2_png";
		t.y = 0;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.anchorOffsetX = 0;
		t.left = 5;
		t.right = 5;
		t.scale9Grid = new egret.Rectangle(9,2,25,13);
		t.source = "public_json.public_progess_bar2_png";
		t.y = 4;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.style = "l_normal";
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0.5;
		t.size = 12;
		t.stroke = 0.5;
		t.text = "100%";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.verticalCenter = -1;
		return t;
	};
	return progressBarSkin5;
})(eui.Skin);generateEUI.paths['resource/exml/adventure/AdventurePanelSkin.exml'] = window.AdventurePanelSkin = (function (_super) {
	__extends(AdventurePanelSkin, _super);
	function AdventurePanelSkin() {
		_super.call(this);
		this.skinParts = ["banner","list","pro","roleAddImg","roleTextImg","roleLockImg","role","itemPrize","itemAddImg","item"];
		
		this.height = 680;
		this.width = 530;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.banner_i(),this._Image3_i(),this._Image4_i(),this.list_i(),this.pro_i(),this.role_i(),this.item_i()];
	}
	var _proto = AdventurePanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = -1;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(25,141,60,55);
		t.source = "win_json.win_bg4_png";
		t.top = 1;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 457;
		t.scale9Grid = new egret.Rectangle(8,13,26,16);
		t.source = "win_json.win_bg_line_png";
		t.width = 508;
		t.x = 10;
		t.y = 207;
		return t;
	};
	_proto.banner_i = function () {
		var t = new eui.Image();
		this.banner = t;
		t.source = "adventure_json.adventureTopBg2_png";
		t.x = 13;
		t.y = 10;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "adventure_json.adventureProgress_png";
		t.x = 47;
		t.y = 170;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "adventure_json.adventureCircle_png";
		t.x = 363;
		t.y = 25;
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 443;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = AdventureItemSkin;
		t.width = 494;
		t.y = 212;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.requestedColumnCount = 1;
		t.verticalGap = 4;
		return t;
	};
	_proto.pro_i = function () {
		var t = new eui.ProgressBar();
		this.pro = t;
		t.anchorOffsetX = 0;
		t.skinName = "progressBarSkin5";
		t.slideDuration = 0;
		t.width = 323;
		t.x = 152;
		t.y = 172;
		return t;
	};
	_proto.role_i = function () {
		var t = new eui.Group();
		this.role = t;
		t.touchEnabled = false;
		t.x = 13;
		t.y = 11;
		t.elementsContent = [this.roleAddImg_i(),this._Image5_i(),this.roleTextImg_i(),this.roleLockImg_i()];
		return t;
	};
	_proto.roleAddImg_i = function () {
		var t = new eui.Image();
		this.roleAddImg = t;
		t.source = "adventure_json.adventureAdd_png";
		t.x = 400;
		t.y = 62;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "adventure_json.adventureRoleBg_png";
		t.x = 358;
		t.y = 3;
		return t;
	};
	_proto.roleTextImg_i = function () {
		var t = new eui.Image();
		this.roleTextImg = t;
		t.source = "adventure_json.adventureRole1_png";
		t.x = 362;
		t.y = 5;
		return t;
	};
	_proto.roleLockImg_i = function () {
		var t = new eui.Image();
		this.roleLockImg = t;
		t.source = "adventure_json.adventureLock_png";
		t.x = 350;
		t.y = 14;
		return t;
	};
	_proto.item_i = function () {
		var t = new eui.Group();
		this.item = t;
		t.visible = false;
		t.x = 13;
		t.y = 11;
		t.elementsContent = [this.itemPrize_i(),this.itemAddImg_i()];
		return t;
	};
	_proto.itemPrize_i = function () {
		var t = new BaseCustComponent();
		this.itemPrize = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 384;
		t.y = 48;
		return t;
	};
	_proto.itemAddImg_i = function () {
		var t = new eui.Image();
		this.itemAddImg = t;
		t.source = "adventure_json.adventurePrize_png";
		t.x = 386;
		t.y = 122;
		return t;
	};
	return AdventurePanelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/awardTips/AwardTips2Skin.exml'] = window.AwardTips2Skin = (function (_super) {
	__extends(AwardTips2Skin, _super);
	function AwardTips2Skin() {
		_super.call(this);
		this.skinParts = ["recvBtn","itemList_0","countDown","evaluation"];
		
		this.elementsContent = [this._Image1_i(),this.recvBtn_i(),this._Scroller1_i(),this._Image2_i(),this.countDown_i(),this.evaluation_i()];
		this.states = [
			new eui.State ("nor",
				[
				])
			,
			new eui.State ("sweep",
				[
					new eui.SetProperty("_Image1","source","res/images/bg/sweepBg.png"),
					new eui.SetProperty("_Scroller1","height",321),
					new eui.SetProperty("_Scroller1","y",293),
					new eui.SetProperty("_Image2","y",243),
					new eui.SetProperty("evaluation","visible",false)
				])
		];
	}
	var _proto = AwardTips2Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "res/images/bg/victoryBg.png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.recvBtn_i = function () {
		var t = new eui.Button();
		this.recvBtn = t;
		t.icon = "res/btn/receive.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 156;
		t.y = 628;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		this._Scroller1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 257;
		t.width = 347;
		t.x = 69;
		t.y = 357;
		t.viewport = this.itemList_0_i();
		return t;
	};
	_proto.itemList_0_i = function () {
		var t = new eui.List();
		this.itemList_0 = t;
		t.anchorOffsetY = 0;
		t.height = 114;
		t.itemRendererSkinName = Itembase2Skin;
		t.x = 0;
		t.y = -16;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 10;
		t.verticalGap = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.source = "win_json.win_reword_2_png";
		t.y = 300;
		return t;
	};
	_proto.countDown_i = function () {
		var t = new eui.Label();
		this.countDown = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "5s后自动关闭";
		t.textColor = 0x00FF00;
		t.y = 687;
		return t;
	};
	_proto.evaluation_i = function () {
		var t = new eui.Image();
		this.evaluation = t;
		t.horizontalCenter = 0;
		t.source = "awardTips_json.awardTips_l_b_png";
		t.top = 226;
		return t;
	};
	return AwardTips2Skin;
})(eui.Skin);generateEUI.paths['resource/exml/awardTips/AwardTipsSkin.exml'] = window.AwardTipsSkin = (function (_super) {
	__extends(AwardTipsSkin, _super);
	function AwardTipsSkin() {
		_super.call(this);
		this.skinParts = ["gsImg","itemList","recvBtn","itemList_1","countDown","eva","actiBtn"];
		
		this.currentState = "pass";
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Scroller1_i(),this.recvBtn_i(),this.countDown_i()];
		this.gsImg_i();
		
		this._ArrayCollection1_i();
		
		this._Image3_i();
		
		this.itemList_1_i();
		
		this.eva_i();
		
		this.actiBtn_i();
		
		this.states = [
			new eui.State ("pass",
				[
					new eui.SetProperty("recvBtn","x",156)
				])
			,
			new eui.State ("boss",
				[
					new eui.AddItems("gsImg","",2,"_Scroller1"),
					new eui.AddItems("_Image3","",2,"countDown"),
					new eui.AddItems("itemList_1","",2,"countDown"),
					new eui.SetProperty("_Image2","source","win_json.win_reword_0_png"),
					new eui.SetProperty("_Image2","y",249),
					new eui.SetProperty("itemList","dataProvider",this._ArrayCollection1),
					new eui.SetProperty("itemList","anchorOffsetY",0),
					new eui.SetProperty("itemList","height",114),
					new eui.SetProperty("itemList","x",0),
					new eui.SetProperty("itemList","y",-16),
					new eui.SetProperty("_Scroller1","height",118),
					new eui.SetProperty("_Scroller1","x",69),
					new eui.SetProperty("_Scroller1","y",488),
					new eui.SetProperty("recvBtn","skinName","BtnIconSkin"),
					new eui.SetProperty("recvBtn","icon","res/btn/receive.png"),
					new eui.SetProperty("recvBtn","x",156)
				])
			,
			new eui.State ("copy",
				[
					new eui.AddItems("eva","",1,""),
					new eui.AddItems("actiBtn","",1,""),
					new eui.SetProperty("_Image1","source","res/images/bg/victoryBg.png"),
					new eui.SetProperty("_Image2","source","win_json.win_reword_2_png"),
					new eui.SetProperty("_Image2","y",301),
					new eui.SetProperty("itemList","anchorOffsetY",0),
					new eui.SetProperty("itemList","height",190.33),
					new eui.SetProperty("_Scroller1","height",197.33),
					new eui.SetProperty("_Scroller1","y",349),
					new eui.SetProperty("recvBtn","y",554),
					new eui.SetProperty("recvBtn","icon","res/btn/confirm.png"),
					new eui.SetProperty("recvBtn","x",172),
					new eui.SetProperty("countDown","y",656),
					new eui.SetProperty("actiBtn","visible",false)
				])
			,
			new eui.State ("sweep",
				[
					new eui.SetProperty("_Image1","source","res/images/bg/sweepBg.png"),
					new eui.SetProperty("recvBtn","y",624),
					new eui.SetProperty("recvBtn","horizontalCenter",0),
					new eui.SetProperty("recvBtn","icon","res/btn/confirm.png")
				])
			,
			new eui.State ("copyTower",
				[
					new eui.AddItems("eva","",1,""),
					new eui.AddItems("actiBtn","",1,""),
					new eui.SetProperty("_Image1","source","res/images/bg/victoryBg.png"),
					new eui.SetProperty("_Image2","source","win_json.win_reword_2_png"),
					new eui.SetProperty("_Image2","y",301),
					new eui.SetProperty("_Scroller1","height",155.33),
					new eui.SetProperty("_Scroller1","y",349),
					new eui.SetProperty("recvBtn","y",554),
					new eui.SetProperty("recvBtn","icon","res/btn/activate_4.png"),
					new eui.SetProperty("recvBtn","x",267),
					new eui.SetProperty("countDown","y",656),
					new eui.SetProperty("actiBtn","x",78),
					new eui.SetProperty("actiBtn","icon","res/btn/confirm.png")
				])
			,
			new eui.State ("exp",
				[
					new eui.SetProperty("_Image2","visible",false),
					new eui.SetProperty("_Scroller1","visible",false),
					new eui.SetProperty("recvBtn","x",156)
				])
		];
	}
	var _proto = AwardTipsSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "res/images/bg/awardTipsBg.png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.source = "awardTips_json.awardTips_texture_0_png";
		t.y = 259;
		return t;
	};
	_proto.gsImg_i = function () {
		var t = new eui.Image();
		this.gsImg = t;
		t.horizontalCenter = 0;
		t.source = "win_json.win_aw_text_0_png";
		t.top = 305;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		this._Scroller1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 326;
		t.width = 347;
		t.x = 69;
		t.y = 293;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = Itembase2Skin;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 10;
		t.verticalGap = 0;
		return t;
	};
	_proto.recvBtn_i = function () {
		var t = new eui.Button();
		this.recvBtn = t;
		t.icon = "res/btn/receive.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.y = 628;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.horizontalCenter = 0;
		t.source = "win_json.win_reword_1_png";
		t.y = 418;
		return t;
	};
	_proto.itemList_1_i = function () {
		var t = new eui.List();
		this.itemList_1 = t;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = Itembase2Skin;
		t.y = 302;
		t.layout = this._HorizontalLayout1_i();
		t.dataProvider = this._ArrayCollection2_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._ArrayCollection2_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object6_i(),this._Object7_i(),this._Object8_i()];
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto.countDown_i = function () {
		var t = new eui.Label();
		this.countDown = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "5s后自动关闭";
		t.textColor = 0x00ff00;
		t.y = 687;
		return t;
	};
	_proto.eva_i = function () {
		var t = new eui.Image();
		this.eva = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.y = 228;
		return t;
	};
	_proto.actiBtn_i = function () {
		var t = new eui.Button();
		this.actiBtn = t;
		t.icon = "res/btn/activate_4.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 267;
		t.y = 554;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		this._ArrayCollection1 = t;
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	return AwardTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/item/component/PropPartSkin.exml'] = window.PropPartSkin = (function (_super) {
	__extends(PropPartSkin, _super);
	function PropPartSkin() {
		_super.call(this);
		this.skinParts = ["pG"];
		
		this.elementsContent = [this.pG_i()];
	}
	var _proto = PropPartSkin.prototype;

	_proto.pG_i = function () {
		var t = new eui.Group();
		this.pG = t;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 9;
		return t;
	};
	return PropPartSkin;
})(eui.Skin);generateEUI.paths['resource/exml/badge/BadgePageSkin.exml'] = window.BadgePageSkin = (function (_super) {
	__extends(BadgePageSkin, _super);
	function BadgePageSkin() {
		_super.call(this);
		this.skinParts = ["lvlMax","icon","title","condi","cg","propList","item_0","item_1","item_2","item_3","item_4","item_5","item_6","item_7","item_8","itemGroup","img_1","btn0","lNum","propList0"];
		
		this.height = 565;
		this.width = 510;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.lvlMax_i(),this.icon_i(),this.title_i(),this.cg_i(),this._Group1_i(),this.itemGroup_i(),this._Image7_i(),this.img_1_i(),this.btn0_i(),this.lNum_i(),this._Group2_i()];
	}
	var _proto = BadgePageSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 93;
		t.scale9Grid = new egret.Rectangle(23,16,113,23);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "public_json.public_prop_rect_png";
		t.width = 495;
		t.x = 8;
		t.y = 464;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "res/images/bg/badgeBg.png";
		t.y = 8;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.height = 562;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.width = 506;
		return t;
	};
	_proto.lvlMax_i = function () {
		var t = new eui.Image();
		this.lvlMax = t;
		t.horizontalCenter = 0;
		t.source = "public_json.public_lvl_max_png";
		t.y = 474;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = 6;
		t.source = "res/images/badge/0.png";
		t.y = 82;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 5;
		t.source = "";
		t.y = 227;
		return t;
	};
	_proto.cg_i = function () {
		var t = new eui.Group();
		this.cg = t;
		t.alpha = 1;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = -122;
		t.y = 512;
		t.elementsContent = [this.condi_i()];
		return t;
	};
	_proto.condi_i = function () {
		var t = new eui.Label();
		this.condi = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.size = 18;
		t.text = "关卡第28关 未完成";
		t.textColor = 0xff0000;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 101;
		t.horizontalCenter = 0;
		t.top = 341;
		t.width = 466;
		t.elementsContent = [this._Image4_i(),this._Image5_i(),this._Image6_i(),this.propList_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 95;
		t.left = 86;
		t.right = 85;
		t.scale9Grid = new egret.Rectangle(10,14,143,79);
		t.source = "public_json.public_rect_7_png";
		t.top = 0;
		t.width = 292;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 2;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,0,3,2);
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 64;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 2;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,0,3,2);
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 30;
		return t;
	};
	_proto.propList_i = function () {
		var t = new BaseCustComponent();
		this.propList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.className = "PropPart";
		t.height = 56;
		t.left = 87;
		t.right = 88;
		t.skinName = "PropPartSkin";
		t.top = 41;
		return t;
	};
	_proto.itemGroup_i = function () {
		var t = new eui.Group();
		this.itemGroup = t;
		t.anchorOffsetY = 0;
		t.height = 330;
		t.horizontalCenter = 0;
		t.width = 346;
		t.y = 13;
		t.elementsContent = [this.item_0_i(),this.item_1_i(),this.item_2_i(),this.item_3_i(),this.item_4_i(),this.item_5_i(),this.item_6_i(),this.item_7_i(),this.item_8_i()];
		return t;
	};
	_proto.item_0_i = function () {
		var t = new eui.Image();
		this.item_0 = t;
		t.source = "badge_json.badge_item_unsele_png";
		t.x = 77;
		t.y = 1;
		return t;
	};
	_proto.item_1_i = function () {
		var t = new eui.Image();
		this.item_1 = t;
		t.alpha = 1;
		t.source = "badge_json.badge_item_unsele_png";
		t.x = 12;
		t.y = 73;
		return t;
	};
	_proto.item_2_i = function () {
		var t = new eui.Image();
		this.item_2 = t;
		t.alpha = 1;
		t.source = "badge_json.badge_item_unsele_png";
		t.x = 11;
		t.y = 173;
		return t;
	};
	_proto.item_3_i = function () {
		var t = new eui.Image();
		this.item_3 = t;
		t.alpha = 1;
		t.source = "badge_json.badge_item_unsele_png";
		t.x = 60;
		t.y = 245;
		return t;
	};
	_proto.item_4_i = function () {
		var t = new eui.Image();
		this.item_4 = t;
		t.alpha = 1;
		t.source = "badge_json.badge_item_unsele_png";
		t.x = 149;
		t.y = 271;
		return t;
	};
	_proto.item_5_i = function () {
		var t = new eui.Image();
		this.item_5 = t;
		t.alpha = 1;
		t.source = "badge_json.badge_item_unsele_png";
		t.x = 235;
		t.y = 245;
		return t;
	};
	_proto.item_6_i = function () {
		var t = new eui.Image();
		this.item_6 = t;
		t.alpha = 1;
		t.source = "badge_json.badge_item_unsele_png";
		t.x = 287;
		t.y = 173;
		return t;
	};
	_proto.item_7_i = function () {
		var t = new eui.Image();
		this.item_7 = t;
		t.alpha = 1;
		t.source = "badge_json.badge_item_unsele_png";
		t.x = 285;
		t.y = 73;
		return t;
	};
	_proto.item_8_i = function () {
		var t = new eui.Image();
		this.item_8 = t;
		t.alpha = 1;
		t.source = "badge_json.badge_item_unsele_png";
		t.x = 220.67;
		t.y = -0.33;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "badge_json.badge_text_0_png";
		t.y = 346;
		return t;
	};
	_proto.img_1_i = function () {
		var t = new eui.Image();
		this.img_1 = t;
		t.source = "badge_json.badge_text_1_png";
		t.x = 24;
		t.y = 475;
		return t;
	};
	_proto.btn0_i = function () {
		var t = new eui.Button();
		this.btn0 = t;
		t.icon = "res/btn/promotion.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 336;
		t.y = 486;
		return t;
	};
	_proto.lNum_i = function () {
		var t = new NumberMC();
		this.lNum = t;
		t.horizontalCenter = 6.5;
		t.type = "cn_0_";
		t.y = 256;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 95;
		t.horizontalCenter = 0;
		t.visible = false;
		t.width = 292;
		t.y = 340;
		t.elementsContent = [this._Image8_i(),this._Image9_i(),this._Image10_i(),this.propList0_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(19,14,149,101);
		t.source = "public_json.public_rect_7_png";
		t.top = 0;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 62;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 30;
		return t;
	};
	_proto.propList0_i = function () {
		var t = new BaseCustComponent();
		this.propList0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 11;
		t.className = "PropPart";
		t.left = 0;
		t.right = 0;
		t.skinName = "PropPartSkin";
		t.top = 9;
		return t;
	};
	return BadgePageSkin;
})(eui.Skin);generateEUI.paths['resource/exml/bag/AutoToggleSkin.exml'] = window.AutoToggleSkin = (function (_super) {
	__extends(AutoToggleSkin, _super);
	function AutoToggleSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","public_json.public_toggle_blank_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","public_json.public_toggle_blank_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","public_json.public_toggle_blank_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",16)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",16)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",16)
				])
		];
	}
	var _proto = AutoToggleSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "public_json.public_toggle_blank_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "public_json.public_toggle_dot_png";
		t.verticalCenter = 0;
		return t;
	};
	return AutoToggleSkin;
})(eui.Skin);generateEUI.paths['resource/exml/bag/BagEquipPannelSkin.exml'] = window.BagEquipPannelSkin = (function (_super) {
	__extends(BagEquipPannelSkin, _super);
	function BagEquipPannelSkin() {
		_super.call(this);
		this.skinParts = ["itemList","nTxt","extendBtn","mBtn"];
		
		this.height = 680;
		this.width = 521;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Scroller1_i(),this._Group1_i(),this.mBtn_i()];
	}
	var _proto = BagEquipPannelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.left = -4;
		t.right = -5;
		t.scale9Grid = new egret.Rectangle(28,139,62,66);
		t.source = "win_json.win_bg4_png";
		t.top = 0;
		t.width = 530;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 597;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(8,9,26,25);
		t.source = "win_json.win_bg_line_png";
		t.width = 505;
		t.y = 13;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.bottom = 77;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 21;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.anchorOffsetY = 0;
		t.height = 582;
		t.itemRendererSkinName = ItembaseSkin;
		t.x = 0;
		t.y = 13.64;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalAlign = "center";
		t.horizontalGap = 5;
		t.paddingLeft = 0;
		t.paddingTop = 2;
		t.requestedColumnCount = 6;
		t.verticalGap = 8;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 24;
		t.y = 626;
		t.elementsContent = [this._Image3_i(),this._Label1_i(),this.nTxt_i(),this.extendBtn_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(13,13,18,9);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "public_json.public_rect_2_png";
		t.verticalCenter = 0;
		t.width = 190;
		t.x = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 18;
		t.text = "容量";
		t.textColor = 0xffde00;
		t.x = 8;
		t.y = 9;
		return t;
	};
	_proto.nTxt_i = function () {
		var t = new eui.Label();
		this.nTxt = t;
		t.horizontalCenter = 5;
		t.size = 18;
		t.text = "100/200";
		t.y = 9;
		return t;
	};
	_proto.extendBtn_i = function () {
		var t = new eui.Image();
		this.extendBtn = t;
		t.source = "zjm_json.zjm_add_png";
		t.verticalCenter = 0;
		t.x = 159;
		return t;
	};
	_proto.mBtn_i = function () {
		var t = new eui.Button();
		this.mBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 60;
		t.icon = "bag_json.bag_melt_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.width = 150;
		t.x = 299;
		t.y = 613;
		return t;
	};
	return BagEquipPannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/item/component/NumberInputSkin.exml'] = window.NumberInputSkin = (function (_super) {
	__extends(NumberInputSkin, _super);
	function NumberInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
					new eui.SetProperty("textDisplay","textColor",0xffffff),
					new eui.SetProperty("textDisplay","textAlign","center")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000),
					new eui.SetProperty("textDisplay","textAlign","center")
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,""),
					new eui.SetProperty("textDisplay","textColor",0xffffff),
					new eui.SetProperty("promptDisplay","textColor",0xffffff)
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,""),
					new eui.SetProperty("textDisplay","textColor",0xffffff),
					new eui.SetProperty("promptDisplay","textColor",0xffffff)
				])
		];
	}
	var _proto = NumberInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return NumberInputSkin;
})(eui.Skin);generateEUI.paths['resource/exml/item/NumSelectSkin.exml'] = window.NumSelectSkin = (function (_super) {
	__extends(NumSelectSkin, _super);
	function NumSelectSkin() {
		_super.call(this);
		this.skinParts = ["nInput","maxBtn","minBtn","pBtn","mBtn","tpBtn","tmBtn"];
		
		this.currentState = "s1";
		this.elementsContent = [this._Image1_i(),this._Group1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("s1",
				[
					new eui.SetProperty("_Image1","x",119),
					new eui.SetProperty("tpBtn","x",108),
					new eui.SetProperty("tpBtn","visible",false),
					new eui.SetProperty("tmBtn","visible",false),
					new eui.SetProperty("","width",362)
				])
			,
			new eui.State ("s2",
				[
					new eui.SetProperty("_Image1","y",8),
					new eui.SetProperty("_Image1","x",36),
					new eui.SetProperty("maxBtn","visible",false),
					new eui.SetProperty("minBtn","visible",false),
					new eui.SetProperty("tpBtn","x",108),
					new eui.SetProperty("tpBtn","visible",false),
					new eui.SetProperty("tmBtn","visible",false),
					new eui.SetProperty("_Image2","visible",false),
					new eui.SetProperty("","width",196)
				])
			,
			new eui.State ("s3",
				[
					new eui.SetProperty("_Image1","y",8),
					new eui.SetProperty("_Image1","horizontalCenter",0),
					new eui.SetProperty("maxBtn","visible",false),
					new eui.SetProperty("minBtn","visible",false),
					new eui.SetProperty("tpBtn","verticalCenter",0),
					new eui.SetProperty("tpBtn","x",249),
					new eui.SetProperty("tmBtn","verticalCenter",0),
					new eui.SetProperty("tmBtn","x",14),
					new eui.SetProperty("_Image2","visible",false),
					new eui.SetProperty("","width",289)
				])
		];
	}
	var _proto = NumSelectSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.bottom = 15;
		t.scale9Grid = new egret.Rectangle(7,7,112,18);
		t.source = "public_json.public_rect_10_png";
		t.top = 15;
		t.width = 124;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 15;
		t.horizontalCenter = 0;
		t.top = 15;
		t.width = 307;
		t.elementsContent = [this.nInput_i(),this.maxBtn_i(),this.minBtn_i(),this.pBtn_i(),this.mBtn_i(),this.tpBtn_i(),this.tmBtn_i()];
		return t;
	};
	_proto.nInput_i = function () {
		var t = new eui.TextInput();
		this.nInput = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "NumberInputSkin";
		t.verticalCenter = 0;
		t.width = 60;
		return t;
	};
	_proto.maxBtn_i = function () {
		var t = new eui.Button();
		this.maxBtn = t;
		t.height = 28;
		t.icon = "public_json.public_max_png";
		t.label = "MAX";
		t.name = "max";
		t.right = 29;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BtnIconSkin";
		t.verticalCenter = 0;
		t.width = 28;
		return t;
	};
	_proto.minBtn_i = function () {
		var t = new eui.Button();
		this.minBtn = t;
		t.height = 28;
		t.icon = "public_json.public_min_png";
		t.label = "MIN";
		t.left = 29;
		t.name = "min";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BtnIconSkin";
		t.verticalCenter = 0;
		t.width = 28;
		return t;
	};
	_proto.pBtn_i = function () {
		var t = new eui.Image();
		this.pBtn = t;
		t.name = "plus";
		t.right = 61;
		t.source = "public_json.public_add_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.mBtn_i = function () {
		var t = new eui.Image();
		this.mBtn = t;
		t.left = 61;
		t.name = "minus";
		t.source = "public_json.public_minus_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tpBtn_i = function () {
		var t = new eui.Image();
		this.tpBtn = t;
		t.name = "tpBtn";
		t.source = "public_json.public_plusTen_png";
		t.y = 3;
		return t;
	};
	_proto.tmBtn_i = function () {
		var t = new eui.Image();
		this.tmBtn = t;
		t.name = "tmBtn";
		t.source = "public_json.public_minusTen_png";
		t.x = 157;
		t.y = -2.5;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,13,1);
		t.source = "itemtips_json.itemtips_line_png";
		t.width = 396;
		t.y = 0;
		return t;
	};
	return NumSelectSkin;
})(eui.Skin);generateEUI.paths['resource/exml/bag/BagExtendSkin.exml'] = window.BagExtendSkin = (function (_super) {
	__extends(BagExtendSkin, _super);
	function BagExtendSkin() {
		_super.call(this);
		this.skinParts = ["numSele","btn","cost"];
		
		this.height = 352;
		this.width = 509;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Group1_i(),this._Label2_i(),this.btn_i(),this.cost_i()];
	}
	var _proto = BagExtendSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(63,76,384,39);
		t.source = "win_json.win_tips_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "win_json.win_title_2_png";
		t.top = -7;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.bottom = 18;
		t.height = 280;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(27,135,62,63);
		t.source = "win_json.win_bg4_png";
		t.width = 479;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.bottom = 30;
		t.height = 261;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(13,13,18,17);
		t.source = "win_json.win_bg_line_png";
		t.width = 457;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "bag_json.bag_title_png";
		t.x = 214;
		t.y = 1.33;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 32;
		t.scale9Grid = new egret.Rectangle(9,12,25,13);
		t.source = "public_json.public_rect_2_png";
		t.width = 163;
		t.x = 207;
		t.y = 122;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 195;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Label1_i(),this.numSele_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 18;
		t.text = "开启消耗 : ";
		t.textColor = 0x4c2f27;
		t.x = 48;
		t.y = 12;
		return t;
	};
	_proto.numSele_i = function () {
		var t = new BaseCustComponent();
		this.numSele = t;
		t.className = "NumSelect";
		t.currentState = "s2";
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "NumSelectSkin";
		t.x = 22;
		t.y = 2;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.size = 18;
		t.text = "消耗钻石 : ";
		t.textColor = 0x4C2F27;
		t.x = 112;
		t.y = 130;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.horizontalCenter = 0;
		t.icon = "res/btn/confirm.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.y = 254;
		return t;
	};
	_proto.cost_i = function () {
		var t = new ItemExpend();
		this.cost = t;
		t.label = " ";
		t.x = 207;
		t.y = 120;
		return t;
	};
	return BagExtendSkin;
})(eui.Skin);generateEUI.paths['resource/exml/bag/BagItemPannelSkin.exml'] = window.BagItemPannelSkin = (function (_super) {
	__extends(BagItemPannelSkin, _super);
	function BagItemPannelSkin() {
		_super.call(this);
		this.skinParts = ["itemList"];
		
		this.height = 680;
		this.width = 517;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Scroller1_i()];
	}
	var _proto = BagItemPannelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.left = -4;
		t.right = -9;
		t.scale9Grid = new egret.Rectangle(28,139,62,66);
		t.source = "win_json.win_bg4_png";
		t.top = 0;
		t.width = 526;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 647;
		t.horizontalCenter = 2;
		t.scale9Grid = new egret.Rectangle(8,9,26,25);
		t.source = "win_json.win_bg_line_png";
		t.width = 505;
		t.y = 13;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.height = 622;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.y = 22;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.anchorOffsetY = 0;
		t.height = 582;
		t.itemRendererSkinName = ItembaseSkin;
		t.x = 0;
		t.y = 13.64;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalAlign = "center";
		t.horizontalGap = 5;
		t.paddingLeft = 0;
		t.paddingTop = 2;
		t.requestedColumnCount = 6;
		t.verticalGap = 8;
		return t;
	};
	return BagItemPannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/boss/worldBoss/CheckBox1Skin.exml'] = window.CheckBox1Skin = (function (_super) {
	__extends(CheckBox1Skin, _super);
	function CheckBox1Skin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.currentState = "up";
		this.elementsContent = [this._Group1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image2","visible",false)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","public_json.public_checkBox_blank_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","public_json.public_checkBox_blank_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","public_json.public_checkBox_blank_png")
				])
		];
	}
	var _proto = CheckBox1Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 2;
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "public_json.public_checkBox_blank_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xffff00;
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.source = "public_json.public_checkBox_sele_png";
		t.x = -1;
		t.y = -1;
		return t;
	};
	return CheckBox1Skin;
})(eui.Skin);generateEUI.paths['resource/exml/bag/BagRecycleWinSkin.exml'] = window.BagRecycleWinSkin = (function (_super) {
	__extends(BagRecycleWinSkin, _super);
	function BagRecycleWinSkin() {
		_super.call(this);
		this.skinParts = ["item_0","item_1","item_2","item_3","item_4","item_5","item_6","item_7","item_8","item_9","item_10","item_11","item_12","item_13","item_14","item_15","itemGroup","mBtn","closeBtn","toggle"];
		
		this.height = 583;
		this.width = 437;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.itemGroup_i(),this.mBtn_i(),this.closeBtn_i(),this._Image3_i(),this._Image4_i(),this.toggle_i(),this._Image5_i(),this._Image6_i()];
	}
	var _proto = BagRecycleWinSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(63,76,305,103);
		t.source = "win_json.win_tips_bg3_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 80;
		t.height = 441;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(24,25,36,17);
		t.source = "win_json.win_bg5_png";
		t.width = 419;
		return t;
	};
	_proto.itemGroup_i = function () {
		var t = new eui.Group();
		this.itemGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.verticalCenter = -32;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this.item_0_i(),this.item_1_i(),this.item_2_i(),this.item_3_i(),this.item_4_i(),this.item_5_i(),this.item_6_i(),this.item_7_i(),this.item_8_i(),this.item_9_i(),this.item_10_i(),this.item_11_i(),this.item_12_i(),this.item_13_i(),this.item_14_i(),this.item_15_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 23;
		t.requestedColumnCount = 4;
		t.verticalGap = 16;
		return t;
	};
	_proto.item_0_i = function () {
		var t = new BaseCustComponent();
		this.item_0 = t;
		t.className = "ItemBase";
		t.name = "0";
		t.skinName = "ItembaseSkin";
		t.x = 134;
		t.y = 121;
		return t;
	};
	_proto.item_1_i = function () {
		var t = new BaseCustComponent();
		this.item_1 = t;
		t.className = "ItemBase";
		t.name = "1";
		t.skinName = "ItembaseSkin";
		t.x = 144;
		t.y = 131;
		return t;
	};
	_proto.item_2_i = function () {
		var t = new BaseCustComponent();
		this.item_2 = t;
		t.className = "ItemBase";
		t.name = "2";
		t.skinName = "ItembaseSkin";
		t.x = 154;
		t.y = 141;
		return t;
	};
	_proto.item_3_i = function () {
		var t = new BaseCustComponent();
		this.item_3 = t;
		t.className = "ItemBase";
		t.name = "3";
		t.skinName = "ItembaseSkin";
		t.x = 164;
		t.y = 151;
		return t;
	};
	_proto.item_4_i = function () {
		var t = new BaseCustComponent();
		this.item_4 = t;
		t.className = "ItemBase";
		t.name = "4";
		t.skinName = "ItembaseSkin";
		t.x = 174;
		t.y = 161;
		return t;
	};
	_proto.item_5_i = function () {
		var t = new BaseCustComponent();
		this.item_5 = t;
		t.className = "ItemBase";
		t.name = "5";
		t.skinName = "ItembaseSkin";
		t.x = 184;
		t.y = 171;
		return t;
	};
	_proto.item_6_i = function () {
		var t = new BaseCustComponent();
		this.item_6 = t;
		t.className = "ItemBase";
		t.name = "6";
		t.skinName = "ItembaseSkin";
		t.x = 194;
		t.y = 181;
		return t;
	};
	_proto.item_7_i = function () {
		var t = new BaseCustComponent();
		this.item_7 = t;
		t.className = "ItemBase";
		t.name = "7";
		t.skinName = "ItembaseSkin";
		t.x = 204;
		t.y = 191;
		return t;
	};
	_proto.item_8_i = function () {
		var t = new BaseCustComponent();
		this.item_8 = t;
		t.className = "ItemBase";
		t.name = "8";
		t.skinName = "ItembaseSkin";
		t.x = 214;
		t.y = 201;
		return t;
	};
	_proto.item_9_i = function () {
		var t = new BaseCustComponent();
		this.item_9 = t;
		t.className = "ItemBase";
		t.name = "9";
		t.skinName = "ItembaseSkin";
		t.x = 224;
		t.y = 211;
		return t;
	};
	_proto.item_10_i = function () {
		var t = new BaseCustComponent();
		this.item_10 = t;
		t.className = "ItemBase";
		t.name = "10";
		t.skinName = "ItembaseSkin";
		t.x = 234;
		t.y = 221;
		return t;
	};
	_proto.item_11_i = function () {
		var t = new BaseCustComponent();
		this.item_11 = t;
		t.className = "ItemBase";
		t.name = "11";
		t.skinName = "ItembaseSkin";
		t.x = 244;
		t.y = 231;
		return t;
	};
	_proto.item_12_i = function () {
		var t = new BaseCustComponent();
		this.item_12 = t;
		t.className = "ItemBase";
		t.name = "12";
		t.skinName = "ItembaseSkin";
		t.x = 254;
		t.y = 241;
		return t;
	};
	_proto.item_13_i = function () {
		var t = new BaseCustComponent();
		this.item_13 = t;
		t.className = "ItemBase";
		t.name = "13";
		t.skinName = "ItembaseSkin";
		t.x = 264;
		t.y = 251;
		return t;
	};
	_proto.item_14_i = function () {
		var t = new BaseCustComponent();
		this.item_14 = t;
		t.className = "ItemBase";
		t.name = "14";
		t.skinName = "ItembaseSkin";
		t.x = 274;
		t.y = 261;
		return t;
	};
	_proto.item_15_i = function () {
		var t = new BaseCustComponent();
		this.item_15 = t;
		t.className = "ItemBase";
		t.name = "15";
		t.skinName = "ItembaseSkin";
		t.x = 284;
		t.y = 271;
		return t;
	};
	_proto.mBtn_i = function () {
		var t = new eui.Button();
		this.mBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57;
		t.horizontalCenter = 0;
		t.icon = "recycle_json.recycle_btn_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.width = 143;
		t.y = 513;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.right = 14;
		t.source = "win_json.win_close_btn2_png";
		t.top = 29;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "public_json.public_slice_line_png";
		t.width = 419;
		t.y = 451;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "recycle_json.recycle_auto_text_png";
		t.x = 312;
		t.y = 467;
		return t;
	};
	_proto.toggle_i = function () {
		var t = new eui.CheckBox();
		this.toggle = t;
		t.label = "";
		t.skinName = "CheckBox1Skin";
		t.x = 288;
		t.y = 466;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "recycle_json.recycle_text_png";
		t.x = 26.02;
		t.y = 468;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "recycle_json.recycle_title_png";
		t.x = 178;
		t.y = 11;
		return t;
	};
	return BagRecycleWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/boss/grBoss/GRBossItemSkin.exml'] = window.GRBossItemSkin = (function (_super) {
	__extends(GRBossItemSkin, _super);
	function GRBossItemSkin() {
		_super.call(this);
		this.skinParts = ["icon","mImg","item_0","item_1","item_2","lImg","killed","enterBtn","mLvl","lLvl","mName"];
		
		this.height = 128;
		this.width = 495;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.icon_i(),this.mImg_i(),this._Image3_i(),this._Group1_i(),this.lImg_i(),this.killed_i(),this._Image4_i(),this._Image5_i(),this.enterBtn_i(),this.mLvl_i(),this.lLvl_i(),this.mName_i()];
	}
	var _proto = GRBossItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(17,22,37,54);
		t.source = "public_json.public_item_rect_1_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_icon_bg3_png";
		t.x = 17;
		t.y = 10;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.source = "";
		t.x = 0;
		t.y = -23;
		return t;
	};
	_proto.mImg_i = function () {
		var t = new eui.Image();
		this.mImg = t;
		t.source = "res/images/monsterIcon/1.png";
		t.x = -14;
		t.y = -25;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_blank_2_png";
		t.x = 16;
		t.y = 97;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.x = 133;
		t.y = 43;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.item_0_i(),this.item_1_i(),this.item_2_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 12;
		return t;
	};
	_proto.item_0_i = function () {
		var t = new BaseCustComponent();
		this.item_0 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 28;
		t.y = 32;
		return t;
	};
	_proto.item_1_i = function () {
		var t = new BaseCustComponent();
		this.item_1 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = -50;
		t.y = 20;
		return t;
	};
	_proto.item_2_i = function () {
		var t = new BaseCustComponent();
		this.item_2 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 48;
		t.y = 52;
		return t;
	};
	_proto.lImg_i = function () {
		var t = new eui.Image();
		this.lImg = t;
		t.source = "worldBoss_json.world_blank1_png";
		t.x = 377;
		t.y = 49;
		return t;
	};
	_proto.killed_i = function () {
		var t = new eui.Image();
		this.killed = t;
		t.source = "worldBoss_json.worldBoss_killed_png";
		t.visible = false;
		t.x = 377;
		t.y = 51;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "worldBoss_json.world_lvl_blank_png";
		t.x = 12;
		t.y = 9;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "worldBoss_json.worldBoss_text1_png";
		t.x = 133;
		t.y = 17;
		return t;
	};
	_proto.enterBtn_i = function () {
		var t = new eui.Button();
		this.enterBtn = t;
		t.icon = "res/btn/enter.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.verticalCenter = 2;
		t.visible = false;
		t.x = 370;
		return t;
	};
	_proto.mLvl_i = function () {
		var t = new eui.Label();
		this.mLvl = t;
		t.horizontalCenter = -219;
		t.size = 18;
		t.text = "99";
		t.y = 17;
		return t;
	};
	_proto.lLvl_i = function () {
		var t = new eui.Label();
		this.lLvl = t;
		t.horizontalCenter = 179;
		t.size = 18;
		t.text = "100级开启";
		t.textColor = 0xff0000;
		t.visible = false;
		t.y = 56;
		return t;
	};
	_proto.mName_i = function () {
		var t = new eui.Label();
		this.mName = t;
		t.horizontalCenter = -182.5;
		t.size = 16;
		t.text = "Label";
		t.textColor = 0xffff00;
		t.y = 99;
		return t;
	};
	return GRBossItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/BasePannelSkin.exml'] = window.BasePannelSkin = (function (_super) {
	__extends(BasePannelSkin, _super);
	function BasePannelSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 680;
		this.width = 526;
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
	}
	var _proto = BasePannelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(28,139,62,66);
		t.source = "win_json.win_bg4_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "win_json.win_slice_line2_png";
		t.width = 525;
		t.x = 0;
		t.y = 591;
		return t;
	};
	return BasePannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/boss/grBoss/GRBossPannelSkin.exml'] = window.GRBossPannelSkin = (function (_super) {
	__extends(GRBossPannelSkin, _super);
	function GRBossPannelSkin() {
		_super.call(this);
		this.skinParts = ["tabBar","instruction","itemList","sc","sweepBtn"];
		
		this.height = 680;
		this.width = 526;
		this.elementsContent = [this._BaseCustComponent1_i(),this.tabBar_i(),this._Image1_i(),this.instruction_i(),this.sc_i(),this.sweepBtn_i()];
	}
	var _proto = GRBossPannelSkin.prototype;

	_proto._BaseCustComponent1_i = function () {
		var t = new BaseCustComponent();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BasePannelSkin";
		t.top = 0;
		return t;
	};
	_proto.tabBar_i = function () {
		var t = new eui.TabBar();
		this.tabBar = t;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = TabBar4Skin;
		t.y = 610;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 520;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(8,9,26,25);
		t.source = "win_json.win_bg_line_png";
		t.width = 508;
		t.y = 58.33;
		return t;
	};
	_proto.instruction_i = function () {
		var t = new BaseCustComponent();
		this.instruction = t;
		t.skinName = "InstructionPartSkin";
		t.visible = false;
		t.x = 22;
		t.y = 12;
		return t;
	};
	_proto.sc_i = function () {
		var t = new eui.Scroller();
		this.sc = t;
		t.anchorOffsetY = 0;
		t.height = 510;
		t.horizontalCenter = 0;
		t.width = 495;
		t.y = 65;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.height = 532;
		t.itemRendererSkinName = GRBossItemSkin;
		t.y = -1.33;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto.sweepBtn_i = function () {
		var t = new eui.Button();
		this.sweepBtn = t;
		t.icon = "worldBoss_json.worldBoss_sweep_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 373;
		t.y = 9;
		return t;
	};
	return GRBossPannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/boss/vipBoss/VipBossPannelSkin.exml'] = window.VipBossPannelSkin = (function (_super) {
	__extends(VipBossPannelSkin, _super);
	function VipBossPannelSkin() {
		_super.call(this);
		this.skinParts = ["tabBar","instruction","itemList","sc","sweepBtn"];
		
		this.height = 680;
		this.width = 526;
		this.elementsContent = [this._BaseCustComponent1_i(),this.tabBar_i(),this._Image1_i(),this.instruction_i(),this.sc_i(),this.sweepBtn_i(),this._Image2_i()];
	}
	var _proto = VipBossPannelSkin.prototype;

	_proto._BaseCustComponent1_i = function () {
		var t = new BaseCustComponent();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BasePannelSkin";
		t.top = 0;
		return t;
	};
	_proto.tabBar_i = function () {
		var t = new eui.TabBar();
		this.tabBar = t;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = TabBar4Skin;
		t.y = 610;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 520;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(8,9,26,25);
		t.source = "win_json.win_bg_line_png";
		t.width = 508;
		t.y = 58.33;
		return t;
	};
	_proto.instruction_i = function () {
		var t = new BaseCustComponent();
		this.instruction = t;
		t.skinName = "InstructionPartSkin";
		t.visible = false;
		t.x = 295;
		t.y = 14;
		return t;
	};
	_proto.sc_i = function () {
		var t = new eui.Scroller();
		this.sc = t;
		t.anchorOffsetY = 0;
		t.height = 510;
		t.horizontalCenter = 0;
		t.width = 495;
		t.y = 65;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.height = 532;
		t.itemRendererSkinName = WorldBossItemSkin;
		t.y = -1.33;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto.sweepBtn_i = function () {
		var t = new eui.Button();
		this.sweepBtn = t;
		t.icon = "res/btn/buy2.png";
		t.label = "Button";
		t.left = 26;
		t.skinName = "BtnIconSkin";
		t.y = 9;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "vipBoss_json.vipBoss_texure_0_png";
		t.x = 282;
		t.y = 18;
		return t;
	};
	return VipBossPannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/boss/worldBoss/BossRankItemSkin.exml'] = window.BossRankItemSkin = (function (_super) {
	__extends(BossRankItemSkin, _super);
	function BossRankItemSkin() {
		_super.call(this);
		this.skinParts = ["rImg","rNum","rName","value"];
		
		this.height = 28;
		this.width = 255;
		this.elementsContent = [this.rImg_i(),this.rNum_i(),this.rName_i(),this.value_i()];
	}
	var _proto = BossRankItemSkin.prototype;

	_proto.rImg_i = function () {
		var t = new eui.Image();
		this.rImg = t;
		t.source = "public_json.public_rank_1_png";
		t.verticalCenter = 0;
		t.x = 1;
		return t;
	};
	_proto.rNum_i = function () {
		var t = new eui.Label();
		this.rNum = t;
		t.left = 4;
		t.size = 16;
		t.text = "50+";
		t.textAlign = "center";
		t.verticalCenter = 0;
		t.width = 28;
		return t;
	};
	_proto.rName_i = function () {
		var t = new eui.Label();
		this.rName = t;
		t.left = 34;
		t.size = 16;
		t.text = "玩家名称玩家名";
		t.verticalCenter = 0;
		t.width = 126;
		return t;
	};
	_proto.value_i = function () {
		var t = new eui.Label();
		this.value = t;
		t.horizontalCenter = 77;
		t.size = 16;
		t.text = "0";
		t.textAlign = "center";
		t.textColor = 0xffc600;
		t.verticalCenter = 0;
		return t;
	};
	return BossRankItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/boss/worldBoss/CheckBox2Skin.exml'] = window.CheckBox2Skin = (function (_super) {
	__extends(CheckBox2Skin, _super);
	function CheckBox2Skin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.currentState = "up";
		this.elementsContent = [this._Group1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image2","visible",false)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","public_json.public_checkBox_blank_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","public_json.public_checkBox_blank_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","public_json.public_checkBox_blank_png")
				])
		];
	}
	var _proto = CheckBox2Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 2;
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "public_json.public_checkBox_blank_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 16;
		t.text = "";
		t.textColor = 0x4c2f27;
		t.verticalAlign = "middle";
		t.y = 10.14;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.source = "public_json.public_checkBox_sele_png";
		t.x = -1;
		t.y = -1;
		return t;
	};
	return CheckBox2Skin;
})(eui.Skin);generateEUI.paths['resource/exml/boss/worldBoss/CheckBoxSkin.exml'] = window.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 300;
		this.width = 400;
	}
	var _proto = CheckBoxSkin.prototype;

	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/exml/boss/worldBoss/LiveScrollSkin.exml'] = window.LiveScrollSkin = (function (_super) {
	__extends(LiveScrollSkin, _super);
	function LiveScrollSkin() {
		_super.call(this);
		this.skinParts = ["g","sc"];
		
		this.elementsContent = [this.sc_i()];
	}
	var _proto = LiveScrollSkin.prototype;

	_proto.sc_i = function () {
		var t = new eui.Scroller();
		this.sc = t;
		t.bottom = 0;
		t.height = 200;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.viewport = this.g_i();
		return t;
	};
	_proto.g_i = function () {
		var t = new eui.Group();
		this.g = t;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 3;
		return t;
	};
	return LiveScrollSkin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/BaseWinBg2Skin.exml'] = window.BaseWinBg2Skin = (function (_super) {
	__extends(BaseWinBg2Skin, _super);
	function BaseWinBg2Skin() {
		_super.call(this);
		this.skinParts = ["closeBtn","winTitle"];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.closeBtn_i(),this.winTitle_i()];
	}
	var _proto = BaseWinBg2Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(63,76,305,103);
		t.source = "win_json.win_tips_bg3_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 15;
		t.left = 10;
		t.right = 10;
		t.scale9Grid = new egret.Rectangle(24,25,36,17);
		t.source = "win_json.win_bg5_png";
		t.top = 65;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.right = 14;
		t.source = "win_json.win_close_btn2_png";
		t.top = 29;
		return t;
	};
	_proto.winTitle_i = function () {
		var t = new eui.Image();
		this.winTitle = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.top = 11;
		return t;
	};
	return BaseWinBg2Skin;
})(eui.Skin);generateEUI.paths['resource/exml/boss/worldBoss/WorldBossCountBuySkin.exml'] = window.WorldBossCountBuySkin = (function (_super) {
	__extends(WorldBossCountBuySkin, _super);
	function WorldBossCountBuySkin() {
		_super.call(this);
		this.skinParts = ["bg","cost","num_0","num_1","max","max_1","btn_0","btn_1"];
		
		this.currentState = "nor";
		this.height = 343;
		this.width = 437;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this.cost_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this.num_0_i(),this.num_1_i(),this.max_i(),this.max_1_i(),this.btn_0_i(),this.btn_1_i()];
		this.states = [
			new eui.State ("nor",
				[
					new eui.SetProperty("cost","skinName","ItemExpendSkin"),
					new eui.SetProperty("cost","horizontalCenter",107),
					new eui.SetProperty("num_1","y",105)
				])
			,
			new eui.State ("max",
				[
					new eui.SetProperty("cost","right",181),
					new eui.SetProperty("_Image2","horizontalCenter",0),
					new eui.SetProperty("_Image3","visible",false),
					new eui.SetProperty("_Image4","x",127),
					new eui.SetProperty("_Image5","visible",false),
					new eui.SetProperty("_Image6","x",130),
					new eui.SetProperty("_Image7","visible",false),
					new eui.SetProperty("num_0","x",237),
					new eui.SetProperty("num_1","visible",false),
					new eui.SetProperty("max","horizontalCenter",0),
					new eui.SetProperty("max_1","visible",false)
				])
		];
	}
	var _proto = WorldBossCountBuySkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "res/images/bg/buyBg.png";
		t.y = 65;
		return t;
	};
	_proto.cost_i = function () {
		var t = new ItemExpend();
		this.cost = t;
		t.y = 217;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.source = "buyTips_json.buyTips_blank_png";
		t.x = 24;
		t.y = 174;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.source = "buyTips_json.buyTips_blank_png";
		t.x = 257;
		t.y = 174;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.source = "buyTips_json.buyTips_vip_png";
		t.x = 24;
		t.y = 83;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		this._Image5 = t;
		t.source = "buyTips_json.buyTips_vip_png";
		t.x = 243;
		t.y = 83;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		this._Image6 = t;
		t.source = "buyTips_json.buyTips_cur_png";
		t.x = 12;
		t.y = 137;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		this._Image7 = t;
		t.horizontalCenter = 0;
		t.source = "buyTips_json.buyTips_arrow_png";
		t.y = 100;
		return t;
	};
	_proto.num_0_i = function () {
		var t = new NumberMC();
		this.num_0 = t;
		t.type = "buyTips_json.buyTips_num_";
		t.x = 133;
		t.y = 105;
		return t;
	};
	_proto.num_1_i = function () {
		var t = new NumberMC();
		this.num_1 = t;
		t.type = "buyTips_json.buyTips_num_";
		t.x = 354;
		t.y = 115;
		return t;
	};
	_proto.max_i = function () {
		var t = new eui.Label();
		this.max = t;
		t.horizontalCenter = -118;
		t.size = 16;
		t.text = "今日能购买0/2次";
		t.textColor = 0xffc600;
		t.y = 179;
		return t;
	};
	_proto.max_1_i = function () {
		var t = new eui.Label();
		this.max_1 = t;
		t.horizontalCenter = 118;
		t.size = 16;
		t.text = "今日能购买0/2次";
		t.textColor = 0xFFC600;
		t.y = 179;
		return t;
	};
	_proto.btn_0_i = function () {
		var t = new eui.Button();
		this.btn_0 = t;
		t.icon = "res/btn/confirm.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 253;
		t.y = 250;
		return t;
	};
	_proto.btn_1_i = function () {
		var t = new eui.Button();
		this.btn_1 = t;
		t.icon = "res/btn/cancel.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 41;
		t.y = 250;
		return t;
	};
	return WorldBossCountBuySkin;
})(eui.Skin);generateEUI.paths['resource/exml/progressBar/progressBarSkin4.exml'] = window.progressBarSkin4 = (function (_super) {
	__extends(progressBarSkin4, _super);
	function progressBarSkin4() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = progressBarSkin4.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "public_json.public_progress_blank1_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.anchorOffsetX = 0;
		t.left = 1;
		t.scale9Grid = new egret.Rectangle(9,2,25,13);
		t.source = "public_json.public_progress_bar1_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.style = "l_normal";
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 12;
		t.stroke = 0.5;
		t.text = "100%";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	return progressBarSkin4;
})(eui.Skin);generateEUI.paths['resource/exml/boss/worldBoss/WorldBossItemSkin.exml'] = window.WorldBossItemSkin = (function (_super) {
	__extends(WorldBossItemSkin, _super);
	function WorldBossItemSkin() {
		_super.call(this);
		this.skinParts = ["icon","hp","check","fImg","lImg","lLvl","lG","enterBtn","fName","mLvl","mImg","mName","item_0","item_1","item_2","rTime","labelDisplay"];
		
		this.height = 128;
		this.width = 495;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.icon_i(),this._Image3_i(),this._Image4_i(),this.hp_i(),this.check_i(),this.fImg_i(),this._Image5_i(),this.lG_i(),this.enterBtn_i(),this.fName_i(),this.mLvl_i(),this.mImg_i(),this.mName_i(),this._Group1_i(),this.rTime_i(),this.labelDisplay_i()];
	}
	var _proto = WorldBossItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(17,22,37,54);
		t.source = "public_json.public_item_rect_1_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_icon_bg3_png";
		t.x = 17;
		t.y = 10;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.source = "";
		t.x = -14;
		t.y = -25;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_blank_2_png";
		t.x = 16.33;
		t.y = 86;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "worldBoss_json.world_lvl_blank_png";
		t.x = 12;
		t.y = 9;
		return t;
	};
	_proto.hp_i = function () {
		var t = new eui.ProgressBar();
		this.hp = t;
		t.skinName = "progressBarSkin4";
		t.slideDuration = 0;
		t.x = 19;
		t.y = 105;
		return t;
	};
	_proto.check_i = function () {
		var t = new eui.CheckBox();
		this.check = t;
		t.label = "复活提醒";
		t.skinName = "CheckBox1Skin";
		t.x = 377;
		t.y = 17;
		return t;
	};
	_proto.fImg_i = function () {
		var t = new eui.Image();
		this.fImg = t;
		t.source = "worldBoss_json.world_blank2_png";
		t.x = 126;
		t.y = 12;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "worldBoss_json.world_text0_png";
		t.x = 121;
		t.y = 59;
		return t;
	};
	_proto.lG_i = function () {
		var t = new eui.Group();
		this.lG = t;
		t.width = 89;
		t.x = 385;
		t.y = 52;
		t.elementsContent = [this.lImg_i(),this.lLvl_i()];
		return t;
	};
	_proto.lImg_i = function () {
		var t = new eui.Image();
		this.lImg = t;
		t.bottom = -2;
		t.left = -5;
		t.right = -5;
		t.scale9Grid = new egret.Rectangle(12,8,75,11);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "worldBoss_json.world_blank1_png";
		t.top = -2;
		return t;
	};
	_proto.lLvl_i = function () {
		var t = new eui.Label();
		this.lLvl = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.size = 18;
		t.text = "100级开启";
		t.textAlign = "center";
		t.textColor = 0xff0000;
		t.top = 0;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.enterBtn_i = function () {
		var t = new eui.Button();
		this.enterBtn = t;
		t.icon = "res/btn/enter.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.verticalCenter = 17.5;
		t.x = 372;
		return t;
	};
	_proto.fName_i = function () {
		var t = new eui.Label();
		this.fName = t;
		t.left = 181;
		t.size = 18;
		t.text = "冒险者雕像";
		t.textColor = 0xffffff;
		t.y = 16;
		return t;
	};
	_proto.mLvl_i = function () {
		var t = new eui.Label();
		this.mLvl = t;
		t.horizontalCenter = -219;
		t.size = 18;
		t.text = "99";
		t.y = 17;
		return t;
	};
	_proto.mImg_i = function () {
		var t = new eui.Image();
		this.mImg = t;
		t.x = 19;
		t.y = 14;
		return t;
	};
	_proto.mName_i = function () {
		var t = new eui.Label();
		this.mName = t;
		t.horizontalCenter = -182.5;
		t.size = 16;
		t.text = "Label";
		t.textColor = 0xffff00;
		t.y = 88;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.x = 164;
		t.y = 51;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.item_0_i(),this.item_1_i(),this.item_2_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.item_0_i = function () {
		var t = new BaseCustComponent();
		this.item_0 = t;
		t.className = "GSItem";
		t.skinName = "ItembaseSkin";
		t.x = 28;
		t.y = 32;
		return t;
	};
	_proto.item_1_i = function () {
		var t = new BaseCustComponent();
		this.item_1 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = -50;
		t.y = 20;
		return t;
	};
	_proto.item_2_i = function () {
		var t = new BaseCustComponent();
		this.item_2 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 48;
		t.y = 52;
		return t;
	};
	_proto.rTime_i = function () {
		var t = new eui.Label();
		this.rTime = t;
		t.anchorOffsetX = 0;
		t.size = 18;
		t.text = "00:00:00后复活";
		t.textAlign = "center";
		t.textColor = 0x00ff00;
		t.visible = false;
		t.width = 82;
		t.x = 386;
		t.y = 57;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.style = "l_normal";
		t.fontFamily = "Tahoma";
		t.horizontalCenter = -181;
		t.size = 12;
		t.stroke = 0.5;
		t.text = "100%";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.verticalAlign = "middle";
		t.y = 106;
		return t;
	};
	return WorldBossItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/boss/worldBoss/WorldBossPannelSkin.exml'] = window.WorldBossPannelSkin = (function (_super) {
	__extends(WorldBossPannelSkin, _super);
	function WorldBossPannelSkin() {
		_super.call(this);
		this.skinParts = ["tabBar","instruction","itemList","sc","buyBtn","count","cTime","lsc"];
		
		this.height = 680;
		this.width = 526;
		this.elementsContent = [this._BaseCustComponent1_i(),this._Image1_i(),this._Image2_i(),this.tabBar_i(),this.instruction_i(),this.sc_i(),this.buyBtn_i(),this.count_i(),this.cTime_i(),this.lsc_i()];
	}
	var _proto = WorldBossPannelSkin.prototype;

	_proto._BaseCustComponent1_i = function () {
		var t = new BaseCustComponent();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BasePannelSkin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 520;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(8,9,26,25);
		t.source = "win_json.win_bg_line_png";
		t.width = 508;
		t.y = 58.33;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scale9Grid = new egret.Rectangle(17,12,12,9);
		t.source = "public_json.public_rect_2_png";
		t.width = 224;
		t.x = 286;
		t.y = 12;
		return t;
	};
	_proto.tabBar_i = function () {
		var t = new eui.TabBar();
		this.tabBar = t;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = TabBar4Skin;
		t.y = 610;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.instruction_i = function () {
		var t = new BaseCustComponent();
		this.instruction = t;
		t.skinName = "InstructionPartSkin";
		t.visible = false;
		t.x = 22;
		t.y = 12;
		return t;
	};
	_proto.sc_i = function () {
		var t = new eui.Scroller();
		this.sc = t;
		t.anchorOffsetY = 0;
		t.height = 510;
		t.horizontalCenter = 0;
		t.width = 495;
		t.y = 65;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.height = 532;
		t.itemRendererSkinName = WorldBossItemSkin;
		t.y = -1.33;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto.buyBtn_i = function () {
		var t = new eui.Image();
		this.buyBtn = t;
		t.source = "worldBoss_json.worldBoss_buyBtn1_png";
		t.x = 443;
		t.y = 15.33;
		return t;
	};
	_proto.count_i = function () {
		var t = new eui.Label();
		this.count = t;
		t.size = 18;
		t.text = "剩余次数 : 10/10";
		t.textColor = 0xffffff;
		t.x = 294;
		t.y = 21;
		return t;
	};
	_proto.cTime_i = function () {
		var t = new eui.Label();
		this.cTime = t;
		t.size = 18;
		t.text = "00:00:59后恢复一次";
		t.textColor = 0xf82424;
		t.x = 16;
		t.y = 21;
		return t;
	};
	_proto.lsc_i = function () {
		var t = new BaseCustComponent();
		this.lsc = t;
		t.className = "LiveScroll";
		t.height = 510;
		t.horizontalCenter = 0;
		t.skinName = "LiveScrollSkin";
		t.visible = false;
		t.width = 495;
		t.y = 63;
		return t;
	};
	return WorldBossPannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/boss/worldBoss/WorldBossReviveTipsSkin.exml'] = window.WorldBossReviveTipsSkin = (function (_super) {
	__extends(WorldBossReviveTipsSkin, _super);
	function WorldBossReviveTipsSkin() {
		_super.call(this);
		this.skinParts = ["enterBtn","cBtn","icon","bName"];
		
		this.elementsContent = [this._Image1_i(),this.enterBtn_i(),this.cBtn_i(),this._Image2_i(),this.icon_i(),this._Image3_i(),this.bName_i(),this._Label1_i()];
	}
	var _proto = WorldBossReviveTipsSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "res/images/bg/bossTips.png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.enterBtn_i = function () {
		var t = new eui.Button();
		this.enterBtn = t;
		t.horizontalCenter = 0;
		t.icon = "res/btn/enter2.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.y = 219;
		return t;
	};
	_proto.cBtn_i = function () {
		var t = new eui.Image();
		this.cBtn = t;
		t.source = "win_json.win_close_btn2_png";
		t.x = 195;
		t.y = 14;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "public_json.public_icon_bg4_png";
		t.y = 82;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.source = "";
		t.x = 35.5;
		t.y = 48;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "public_json.public_worldBoss_name_png";
		t.y = 173;
		return t;
	};
	_proto.bName_i = function () {
		var t = new eui.Label();
		this.bName = t;
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "bName";
		t.textColor = 0xffd823;
		t.y = 175;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "已复活";
		t.textColor = 0x00b4ff;
		t.y = 197;
		return t;
	};
	return WorldBossReviveTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/boss/worldBoss/WorldInfoSkin.exml'] = window.WorldInfoSkin = (function (_super) {
	__extends(WorldInfoSkin, _super);
	function WorldInfoSkin() {
		_super.call(this);
		this.skinParts = ["itemList","mySelf","btnGroup","btn_1"];
		
		this.elementsContent = [this._Group1_i(),this.btnGroup_i(),this.btn_1_i()];
	}
	var _proto = WorldInfoSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 215;
		t.left = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this._Scroller1_i(),this.mySelf_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(107,76,38,113);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "worldBoss_json.world_rank_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 147;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 255;
		t.x = 2;
		t.y = 33;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = BossRankItemSkin;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 2;
		return t;
	};
	_proto.mySelf_i = function () {
		var t = new BaseCustComponent();
		this.mySelf = t;
		t.className = "BossRankItem";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BossRankItemSkin";
		t.x = 2;
		t.y = 184;
		return t;
	};
	_proto.btnGroup_i = function () {
		var t = new eui.Group();
		this.btnGroup = t;
		t.right = 0;
		t.verticalCenter = 0;
		t.layout = this._VerticalLayout2_i();
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto.btn_1_i = function () {
		var t = new eui.Image();
		this.btn_1 = t;
		t.right = 0;
		t.source = "worldBoss_json.world_strength_potion_png";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	return WorldInfoSkin;
})(eui.Skin);generateEUI.paths['resource/exml/btn/Btn1Skin.exml'] = window.Btn1Skin = (function (_super) {
	__extends(Btn1Skin, _super);
	function Btn1Skin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Rect1_i(),this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Rect1","fillColor",0xc13f3f),
					new eui.SetProperty("_Image1","source","")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Rect1","fillColor",0x352d2d),
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = Btn1Skin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		this._Rect1 = t;
		t.bottom = 0;
		t.fillColor = 0xb52f2f;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 18;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return Btn1Skin;
})(eui.Skin);generateEUI.paths['resource/exml/btn/BtnIcon1Skin.exml'] = window.BtnIcon1Skin = (function (_super) {
	__extends(BtnIcon1Skin, _super);
	function BtnIcon1Skin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.currentState = "up";
		this.elementsContent = [this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("iconDisplay","verticalCenter",0)
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("iconDisplay","scaleX",0.95),
					new eui.SetProperty("iconDisplay","scaleY",0.95),
					new eui.SetProperty("iconDisplay","verticalCenter",0)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("iconDisplay","verticalCenter",0)
				])
		];
	}
	var _proto = BtnIcon1Skin.prototype;

	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = -21;
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	return BtnIcon1Skin;
})(eui.Skin);generateEUI.paths['resource/exml/btn/CustomBtnSkin.exml'] = window.CustomBtnSkin = (function (_super) {
	__extends(CustomBtnSkin, _super);
	function CustomBtnSkin() {
		_super.call(this);
		this.skinParts = ["iconDisplay","labelDisplay"];
		
		this.height = 71;
		this.width = 78;
		this.elementsContent = [this.iconDisplay_i(),this.labelDisplay_i()];
	}
	var _proto = CustomBtnSkin.prototype;

	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = -19;
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "Label";
		t.textColor = 0x0cff00;
		t.visible = false;
		return t;
	};
	return CustomBtnSkin;
})(eui.Skin);generateEUI.paths['resource/exml/btn/DeBugTabBtn2Skin.exml'] = window.DeBugTabBtn2Skin = (function (_super) {
	__extends(DeBugTabBtn2Skin, _super);
	function DeBugTabBtn2Skin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.currentState = "up";
		this.height = 37;
		this.width = 84;
		this.elementsContent = [this._Rect1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Rect1","fillColor",0x701d1d),
					new eui.SetProperty("labelDisplay","strokeColor",0x542a10),
					new eui.SetProperty("labelDisplay","textColor",0xe6daac)
				])
			,
			new eui.State ("disabled",
				[
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = DeBugTabBtn2Skin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		this._Rect1 = t;
		t.bottom = 0;
		t.fillColor = 0x661919;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.height = 25;
		t.size = 18;
		t.strokeColor = 0x1b1005;
		t.textAlign = "center";
		t.textColor = 0x957f5b;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return DeBugTabBtn2Skin;
})(eui.Skin);generateEUI.paths['resource/exml/btn/DeBugTabBtnSkin.exml'] = window.DeBugTabBtnSkin = (function (_super) {
	__extends(DeBugTabBtnSkin, _super);
	function DeBugTabBtnSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.currentState = "up";
		this.width = 64;
		this.elementsContent = [this._Rect1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Rect1","fillColor",0x215796),
					new eui.SetProperty("labelDisplay","strokeColor",0x542a10),
					new eui.SetProperty("labelDisplay","textColor",0xe6daac)
				])
			,
			new eui.State ("disabled",
				[
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = DeBugTabBtnSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		this._Rect1 = t;
		t.bottom = 0;
		t.fillColor = 0x133d6d;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.height = 25;
		t.size = 18;
		t.strokeColor = 0x1b1005;
		t.textAlign = "center";
		t.textColor = 0x957f5b;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return DeBugTabBtnSkin;
})(eui.Skin);generateEUI.paths['resource/exml/buff/BuffItemSkin.exml'] = window.BuffItemSkin = (function (_super) {
	__extends(BuffItemSkin, _super);
	function BuffItemSkin() {
		_super.call(this);
		this.skinParts = ["icon","nameTx","attrTx","timeTx"];
		
		this.elementsContent = [this._Image1_i(),this.icon_i(),this.nameTx_i(),this.attrTx_i(),this.timeTx_i()];
	}
	var _proto = BuffItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "buff_json.buff_item_bg_png";
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = -196;
		t.source = "";
		t.verticalCenter = 0.5;
		return t;
	};
	_proto.nameTx_i = function () {
		var t = new eui.Label();
		this.nameTx = t;
		t.size = 19;
		t.text = "◆ 战士冲锋";
		t.textColor = 0xffd823;
		t.x = 107;
		t.y = 20;
		return t;
	};
	_proto.attrTx_i = function () {
		var t = new eui.Label();
		this.attrTx = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 42;
		t.lineSpacing = 6;
		t.size = 17;
		t.text = "";
		t.width = 371;
		t.x = 106;
		t.y = 49;
		return t;
	};
	_proto.timeTx_i = function () {
		var t = new eui.Label();
		this.timeTx = t;
		t.size = 18;
		t.text = "剩余时间：00:00:00";
		t.textColor = 0x2aff00;
		t.x = 314;
		t.y = 20;
		return t;
	};
	return BuffItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/role/RoleSelectSkin.exml'] = window.RoleSelectSkin = (function (_super) {
	__extends(RoleSelectSkin, _super);
	function RoleSelectSkin() {
		_super.call(this);
		this.skinParts = ["listRole"];
		
		this.height = 85;
		this.elementsContent = [this._Scroller1_i()];
	}
	var _proto = RoleSelectSkin.prototype;

	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.bottom = 0;
		t.height = 90;
		t.horizontalCenter = 0;
		t.width = 506;
		t.viewport = this.listRole_i();
		return t;
	};
	_proto.listRole_i = function () {
		var t = new eui.List();
		this.listRole = t;
		t.itemRendererSkinName = RoleInfoItemSkin;
		t.x = 22;
		t.y = 9;
		t.layout = this._HorizontalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 1;
		t.verticalAlign = "bottom";
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	return RoleSelectSkin;
})(eui.Skin);generateEUI.paths['resource/exml/buff/BuffViewSkin.exml'] = window.BuffViewSkin = (function (_super) {
	__extends(BuffViewSkin, _super);
	function BuffViewSkin() {
		_super.call(this);
		this.skinParts = ["bg","roleSelect","list"];
		
		this.height = 550;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this._Image2_i(),this.roleSelect_i(),this.list_i()];
	}
	var _proto = BuffViewSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.skinName = "BaseWinBgSkin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 480;
		t.horizontalCenter = 3;
		t.scale9Grid = new egret.Rectangle(25,141,60,55);
		t.source = "win_json.win_bg4_png";
		t.width = 532;
		t.y = 50;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 376;
		t.scale9Grid = new egret.Rectangle(8,13,26,16);
		t.source = "win_json.win_bg_line_png";
		t.width = 512;
		t.x = 37;
		t.y = 142;
		return t;
	};
	_proto.roleSelect_i = function () {
		var t = new BaseCustComponent();
		this.roleSelect = t;
		t.className = "RoleSelect";
		t.skinName = "RoleSelectSkin";
		t.x = 42;
		t.y = 57;
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 359;
		t.itemRendererSkinName = BuffItemSkin;
		t.width = 497;
		t.x = 44;
		t.y = 151;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 4;
		return t;
	};
	return BuffViewSkin;
})(eui.Skin);generateEUI.paths['resource/exml/chat/ChatSysItemSkin.exml'] = window.ChatSysItemSkin = (function (_super) {
	__extends(ChatSysItemSkin, _super);
	function ChatSysItemSkin() {
		_super.call(this);
		this.skinParts = ["chatLab","g"];
		
		this.width = 458;
		this.elementsContent = [this.g_i()];
	}
	var _proto = ChatSysItemSkin.prototype;

	_proto.g_i = function () {
		var t = new eui.Group();
		this.g = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this.chatLab_i()];
		return t;
	};
	_proto.chatLab_i = function () {
		var t = new eui.Label();
		this.chatLab = t;
		t.bottom = 0;
		t.lineSpacing = 4;
		t.size = 16;
		t.text = "Label";
		t.top = 0;
		t.width = 420;
		t.x = 19;
		return t;
	};
	return ChatSysItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/TextInput/TextInput2Skin.exml'] = window.TextInput2Skin = (function (_super) {
	__extends(TextInput2Skin, _super);
	function TextInput2Skin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInput2Skin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.visible = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 16;
		t.textColor = 0xffffff;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 16;
		t.textColor = 0xa39084;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInput2Skin;
})(eui.Skin);generateEUI.paths['resource/exml/chat/ChatWinSkin.exml'] = window.ChatWinSkin = (function (_super) {
	__extends(ChatWinSkin, _super);
	function ChatWinSkin() {
		_super.call(this);
		this.skinParts = ["closeGroup","emojiBtn","closeBtn","inputText","tabBtn","sendBtn","chatLab","sc","chatGroup"];
		
		this.currentState = "sys";
		this.elementsContent = [this.closeGroup_i(),this.chatGroup_i()];
		this._Image5_i();
		
		this.states = [
			new eui.State ("nor",
				[
					new eui.SetProperty("_Image2","height",529)
				])
			,
			new eui.State ("sys",
				[
					new eui.AddItems("_Image5","chatGroup",2,"emojiBtn"),
					new eui.SetProperty("_Image3","visible",false),
					new eui.SetProperty("emojiBtn","visible",false),
					new eui.SetProperty("inputText","visible",false),
					new eui.SetProperty("sendBtn","visible",false)
				])
		];
	}
	var _proto = ChatWinSkin.prototype;

	_proto.closeGroup_i = function () {
		var t = new eui.Group();
		this.closeGroup = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.chatGroup_i = function () {
		var t = new eui.Group();
		this.chatGroup = t;
		t.bottom = 82;
		t.height = 568;
		t.horizontalCenter = 0;
		t.width = 615;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.emojiBtn_i(),this.closeBtn_i(),this.inputText_i(),this.tabBtn_i(),this.sendBtn_i(),this.sc_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(4,4,31,15);
		t.source = "zjm_json.zjm_chat_rect_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.height = 529;
		t.left = 6;
		t.right = 6;
		t.scale9Grid = new egret.Rectangle(4,4,13,9);
		t.source = "chat_json.chat_blank_0_png";
		t.top = 6;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.scale9Grid = new egret.Rectangle(42,13,257,11);
		t.source = "chat_json.chat_blank_4_png";
		t.x = 139;
		t.y = 492;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 472;
		t.scale9Grid = new egret.Rectangle(42,13,257,11);
		t.source = "chat_json.chat_blank_4_png";
		t.top = 14;
		t.width = 459;
		t.x = 139;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		this._Image5 = t;
		t.source = "chat_json.chat_texture_0_png";
		t.x = 140;
		t.y = 500;
		return t;
	};
	_proto.emojiBtn_i = function () {
		var t = new eui.Image();
		this.emojiBtn = t;
		t.source = "chat_json.chat_emoji_png";
		t.x = 487;
		t.y = 491;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Button();
		this.closeBtn = t;
		t.icon = "chat_json.chat_close_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 568;
		t.y = -11;
		return t;
	};
	_proto.inputText_i = function () {
		var t = new eui.TextInput();
		this.inputText = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 27;
		t.skinName = "TextInput2Skin";
		t.width = 324;
		t.x = 146;
		t.y = 498;
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 56;
		t.itemRendererSkinName = ServerTabSkin;
		t.top = 13;
		t.x = 24;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.icon = "chat_json.chat_tab_0_png";
		t.icon2 = "chat_json.chat_tab_0_s_png";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.icon = "chat_json.chat_tab_1_png";
		t.icon2 = "chat_json.chat_tab_1_s_png";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.icon = "chat_json.chat_tab_2_png";
		t.icon2 = "chat_json.chat_tab_2_s_png";
		return t;
	};
	_proto.sendBtn_i = function () {
		var t = new eui.Button();
		this.sendBtn = t;
		t.icon = "res/btn/sendBtn.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 532;
		t.y = 492;
		return t;
	};
	_proto.sc_i = function () {
		var t = new eui.Scroller();
		this.sc = t;
		t.anchorOffsetX = 0;
		t.bottom = 88;
		t.bounces = true;
		t.right = 18;
		t.top = 20;
		t.width = 458;
		t.viewport = this.chatLab_i();
		return t;
	};
	_proto.chatLab_i = function () {
		var t = new eui.List();
		this.chatLab = t;
		t.itemRendererSkinName = MsgItemSkin;
		t.useVirtualLayout = true;
		t.layout = this._VerticalLayout2_i();
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 20;
		return t;
	};
	return ChatWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/chat/EmojiItemSkin.exml'] = window.EmojiItemSkin = (function (_super) {
	__extends(EmojiItemSkin, _super);
	function EmojiItemSkin() {
		_super.call(this);
		this.skinParts = ["emoji"];
		
		this.elementsContent = [this.emoji_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.src"],[0],this.emoji,"source");
	}
	var _proto = EmojiItemSkin.prototype;

	_proto.emoji_i = function () {
		var t = new eui.Image();
		this.emoji = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return EmojiItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/chat/EmojiPartSkin.exml'] = window.EmojiPartSkin = (function (_super) {
	__extends(EmojiPartSkin, _super);
	function EmojiPartSkin() {
		_super.call(this);
		this.skinParts = ["itemList"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this._Scroller1_i()];
	}
	var _proto = EmojiPartSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 323;
		t.horizontalCenter = 75;
		t.scale9Grid = new egret.Rectangle(37,24,141,145);
		t.source = "chat_json.chat_blank_2_png";
		t.verticalCenter = 182;
		t.width = 481;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 298;
		t.horizontalCenter = 75;
		t.verticalCenter = 178;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = EmojiItemSkin;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 9;
		t.requestedColumnCount = 8;
		return t;
	};
	return EmojiPartSkin;
})(eui.Skin);generateEUI.paths['resource/exml/chat/MsgItem2Skin.exml'] = window.MsgItem2Skin = (function (_super) {
	__extends(MsgItem2Skin, _super);
	function MsgItem2Skin() {
		_super.call(this);
		this.skinParts = ["icon","vip","t0","g","lvl","roleName"];
		
		this.width = 448;
		this.elementsContent = [this._Image1_i(),this.icon_i(),this._Image2_i(),this.vip_i(),this.g_i(),this.lvl_i(),this.roleName_i()];
	}
	var _proto = MsgItem2Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "chat_json.chat_roleIco_blank_png";
		t.x = 361;
		t.y = 6;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skewY = 180;
		t.source = "res/images/roleIco/role_1.png";
		t.x = 435;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "chat_json.chat_lvl_blank_png";
		t.x = 350;
		t.y = 3;
		return t;
	};
	_proto.vip_i = function () {
		var t = new eui.Image();
		this.vip = t;
		t.source = "chat_json.chat_vip_0_png";
		t.x = 308;
		t.y = 5;
		return t;
	};
	_proto.g_i = function () {
		var t = new eui.Group();
		this.g = t;
		t.right = 107;
		t.y = 44;
		t.elementsContent = [this._Image3_i(),this.t0_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = -5;
		t.left = -6;
		t.right = -13;
		t.scale9Grid = new egret.Rectangle(1,2,16,15);
		t.skewY = 180;
		t.source = "chat_json.chat_blank_3_png";
		t.top = -5;
		return t;
	};
	_proto.t0_i = function () {
		var t = new eui.Label();
		this.t0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.lineSpacing = 2;
		t.maxWidth = 311;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 16;
		t.text = "";
		t.top = 0;
		return t;
	};
	_proto.lvl_i = function () {
		var t = new eui.Label();
		this.lvl = t;
		t.horizontalCenter = 140;
		t.size = 16;
		t.text = "14";
		t.y = 11;
		return t;
	};
	_proto.roleName_i = function () {
		var t = new eui.Label();
		this.roleName = t;
		t.right = 144;
		t.size = 16;
		t.text = "XXXXXXX";
		t.textColor = 0xffc600;
		t.y = 19;
		return t;
	};
	return MsgItem2Skin;
})(eui.Skin);generateEUI.paths['resource/exml/chat/MsgItemSkin.exml'] = window.MsgItemSkin = (function (_super) {
	__extends(MsgItemSkin, _super);
	function MsgItemSkin() {
		_super.call(this);
		this.skinParts = ["icon","vip","t0","g","lvl","roleName"];
		
		this.width = 448;
		this.elementsContent = [this._Image1_i(),this.icon_i(),this._Image2_i(),this.vip_i(),this.g_i(),this.lvl_i(),this.roleName_i()];
	}
	var _proto = MsgItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "chat_json.chat_roleIco_blank_png";
		t.x = 12;
		t.y = 6;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.source = "res/images/roleIco/role_1.png";
		t.x = 15;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "chat_json.chat_lvl_blank_png";
		t.y = 3;
		return t;
	};
	_proto.vip_i = function () {
		var t = new eui.Image();
		this.vip = t;
		t.source = "chat_json.chat_vip_0_png";
		t.x = 192;
		t.y = 5;
		return t;
	};
	_proto.g_i = function () {
		var t = new eui.Group();
		this.g = t;
		t.left = 108;
		t.y = 44;
		t.elementsContent = [this._Image3_i(),this.t0_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = -5;
		t.left = -13;
		t.right = -6;
		t.scale9Grid = new egret.Rectangle(1,1,16,16);
		t.source = "chat_json.chat_blank_3_png";
		t.top = -5;
		return t;
	};
	_proto.t0_i = function () {
		var t = new eui.Label();
		this.t0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.lineSpacing = 2;
		t.maxWidth = 311;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 16;
		t.text = "";
		t.top = 0;
		return t;
	};
	_proto.lvl_i = function () {
		var t = new eui.Label();
		this.lvl = t;
		t.horizontalCenter = -209;
		t.size = 16;
		t.text = "14";
		t.y = 11;
		return t;
	};
	_proto.roleName_i = function () {
		var t = new eui.Label();
		this.roleName = t;
		t.size = 16;
		t.text = "XXXXXXX";
		t.textColor = 0xffc600;
		t.x = 110;
		t.y = 19;
		return t;
	};
	return MsgItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/progressBar/progressBarSkin3.exml'] = window.progressBarSkin3 = (function (_super) {
	__extends(progressBarSkin3, _super);
	function progressBarSkin3() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = progressBarSkin3.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "chuangguan_json.chuangguan_progess_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.anchorOffsetX = 0;
		t.left = 1;
		t.scale9Grid = new egret.Rectangle(9,2,25,13);
		t.source = "chuangguan_json.chuangguan_progress_bar_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.style = "l_normal";
		t.fontFamily = "Tahoma";
		t.right = 5;
		t.size = 14;
		t.stroke = 0.5;
		t.text = "10/10";
		t.textAlign = "right";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.verticalCenter = 0.5;
		return t;
	};
	return progressBarSkin3;
})(eui.Skin);generateEUI.paths['resource/exml/chuangguan/ChuangguanPannelSkin.exml'] = window.ChuangguanPannelSkin = (function (_super) {
	__extends(ChuangguanPannelSkin, _super);
	function ChuangguanPannelSkin() {
		_super.call(this);
		this.skinParts = ["bossBg","mModel","rankWin","fName","passDone","item","progress","revLb","spG","num","enterBtn","awGroup"];
		
		this.height = 716;
		this.width = 596;
		this.elementsContent = [this._Image1_i(),this.bossBg_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this._Image8_i(),this._Image9_i(),this._Image10_i(),this.mModel_i(),this.rankWin_i(),this._Group1_i(),this.passDone_i(),this.spG_i(),this._Group2_i(),this.enterBtn_i(),this.awGroup_i()];
	}
	var _proto = ChuangguanPannelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.scale9Grid = new egret.Rectangle(75,82,456,138);
		t.source = "win_json.win_bg3_png";
		t.top = 0;
		t.x = 0;
		return t;
	};
	_proto.bossBg_i = function () {
		var t = new eui.Image();
		this.bossBg = t;
		t.horizontalCenter = 0;
		t.source = "res/images/bg/passBg0.jpg";
		t.top = 73;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "chuangguan_json.chuangguan_texture_1_png";
		t.x = 40;
		t.y = 441;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "chuangguan_json.chuangguan_title_flag_png";
		t.top = 80;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "chuangguan_json.chuangguan_win_title_png";
		t.y = 14;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 144;
		t.scale9Grid = new egret.Rectangle(19,12,121,74);
		t.source = "chuangguan_json.chuangguan_item_blank_png";
		t.width = 300;
		t.x = 60;
		t.y = 453;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 144;
		t.scale9Grid = new egret.Rectangle(19,12,121,74);
		t.source = "chuangguan_json.chuangguan_item_blank_png";
		t.width = 170;
		t.x = 365;
		t.y = 453;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "chuangguan_json.chuangguan_bossAw_title_png";
		t.x = 152.5;
		t.y = 460;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "chuangguan_json.chuangguan_map_name_png";
		t.y = 119;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.fillMode = "scale";
		t.source = "chuangguan_json.chuangguan_line_png";
		t.width = 490;
		t.x = 50;
		t.y = 605.34;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "chuangguan_json.chuangguan_tgjl_png";
		t.x = 378;
		t.y = 460;
		return t;
	};
	_proto.mModel_i = function () {
		var t = new BaseCustComponent();
		this.mModel = t;
		t.bottom = 266;
		t.className = "UIAvatar";
		t.horizontalCenter = 52;
		return t;
	};
	_proto.rankWin_i = function () {
		var t = new eui.Image();
		this.rankWin = t;
		t.source = "chuangguan_json.chuangguan_rank_btn_png";
		t.x = 68.65;
		t.y = 327.21;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.height = 18;
		t.horizontalCenter = -180.5;
		t.width = 104.8;
		t.y = 417;
		t.elementsContent = [this._Image11_i(),this._Image12_i(),this.fName_i()];
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(11,2,66,14);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "chuangguan_json.chuangguan_name_blank_png";
		t.top = 0;
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.source = "chuangguan_json.chuangguan_no1_png";
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto.fName_i = function () {
		var t = new eui.Label();
		this.fName = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 6.100000000000001;
		t.size = 14;
		t.text = "亚里斯多德";
		t.textColor = 0xffc600;
		t.verticalCenter = 0;
		t.width = 89;
		return t;
	};
	_proto.passDone_i = function () {
		var t = new eui.Image();
		this.passDone = t;
		t.source = "chuangguan_json.chuangguan_done_png";
		t.visible = false;
		t.x = 428.83;
		t.y = 352.21;
		return t;
	};
	_proto.spG_i = function () {
		var t = new eui.Group();
		this.spG = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 143;
		t.width = 94;
		t.x = 404;
		t.y = 450;
		t.elementsContent = [this.item_i(),this.progress_i(),this.revLb_i()];
		return t;
	};
	_proto.item_i = function () {
		var t = new BaseCustComponent();
		this.item = t;
		t.className = "ItemBase";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "ItembaseSkin";
		t.x = 8;
		t.y = 47;
		return t;
	};
	_proto.progress_i = function () {
		var t = new eui.ProgressBar();
		this.progress = t;
		t.anchorOffsetX = 0;
		t.skinName = "progressBarSkin3";
		t.x = -12;
		t.y = 127.17;
		return t;
	};
	_proto.revLb_i = function () {
		var t = new eui.Label();
		this.revLb = t;
		t.size = 16;
		t.text = "点击领取";
		t.textColor = 0x00ff0c;
		t.visible = false;
		t.x = 15;
		t.y = 128;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.top = 89;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this._Image13_i(),this.num_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "chuangguan_json.chuangguan_word_1_png";
		t.y = 0;
		return t;
	};
	_proto.num_i = function () {
		var t = new NumberMC();
		this.num = t;
		t.height = 10;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 10;
		return t;
	};
	_proto.enterBtn_i = function () {
		var t = new eui.Button();
		this.enterBtn = t;
		t.height = 56;
		t.icon = "chuangguan_json.chuangguan_enter_btn_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.width = 140;
		t.x = 228;
		t.y = 615;
		return t;
	};
	_proto.awGroup_i = function () {
		var t = new eui.Group();
		this.awGroup = t;
		t.height = 81;
		t.horizontalCenter = -88;
		t.y = 500;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 10;
		return t;
	};
	return ChuangguanPannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/BaseBroadSkin.exml'] = window.BaseBroadSkin = (function (_super) {
	__extends(BaseBroadSkin, _super);
	function BaseBroadSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "s1";
		this.elementsContent = [this._Image2_i(),this._Image3_i()];
		this._Image1_i();
		
		this._Image4_i();
		
		this.states = [
			new eui.State ("s1",
				[
					new eui.SetProperty("_Image2","width",530),
					new eui.SetProperty("_Image2","height",670),
					new eui.SetProperty("_Image2","x",0),
					new eui.SetProperty("_Image2","left",0),
					new eui.SetProperty("_Image2","right",0),
					new eui.SetProperty("_Image2","bottom",0),
					new eui.SetProperty("_Image2","y",0),
					new eui.SetProperty("_Image2","top",0),
					new eui.SetProperty("_Image3","x",11),
					new eui.SetProperty("_Image3","left",11),
					new eui.SetProperty("_Image3","top",13),
					new eui.SetProperty("_Image3","right",11),
					new eui.SetProperty("_Image3","bottom",10)
				])
			,
			new eui.State ("s2",
				[
					new eui.AddItems("_Image1","",0,""),
					new eui.AddItems("_Image4","",1,""),
					new eui.SetProperty("_Image2","bottom",20),
					new eui.SetProperty("_Image2","top",57),
					new eui.SetProperty("_Image2","left",7),
					new eui.SetProperty("_Image2","right",7),
					new eui.SetProperty("_Image3","bottom",33),
					new eui.SetProperty("_Image3","left",19),
					new eui.SetProperty("_Image3","right",19),
					new eui.SetProperty("_Image3","top",68),
					new eui.SetProperty("","height",337)
				])
		];
	}
	var _proto = BaseBroadSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(63,75,384,56);
		t.source = "win_json.win_tips_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.scale9Grid = new egret.Rectangle(28,139,62,66);
		t.source = "win_json.win_bg4_png";
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.anchorOffsetY = 0;
		t.height = 647;
		t.scale9Grid = new egret.Rectangle(8,9,26,25);
		t.source = "win_json.win_bg_line_png";
		t.width = 508;
		t.y = 13;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.horizontalCenter = 0;
		t.source = "win_json.win_title_2_png";
		t.top = -7;
		return t;
	};
	return BaseBroadSkin;
})(eui.Skin);generateEUI.paths['resource/exml/chuangguan/ChuangguanRankItemSkin.exml'] = window.ChuangguanRankItemSkin = (function (_super) {
	__extends(ChuangguanRankItemSkin, _super);
	function ChuangguanRankItemSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 706;
		this.width = 508;
		this.elementsContent = [this._BaseCustComponent1_i(),this._Image1_i(),this._Image2_i(),this._Group1_i(),this._Group2_i()];
	}
	var _proto = ChuangguanRankItemSkin.prototype;

	_proto._BaseCustComponent1_i = function () {
		var t = new BaseCustComponent();
		t.currentState = "s2";
		t.height = 709;
		t.skinName = "BaseBroadSkin";
		t.width = 508;
		t.x = 0;
		t.y = -3;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 119;
		t.horizontalCenter = 0;
		t.source = "chuangguan_json.chuangguan_line_png";
		t.width = 391;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "chuangguan_json.chuangguan_word_cgph_png";
		t.x = 193;
		t.y = -1;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.bottom = 127;
		t.horizontalCenter = 0;
		t.top = 158;
		t.width = 430;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 39;
		t.horizontalCenter = 0;
		t.width = 458;
		t.y = 79;
		t.elementsContent = [this._Image3_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(10,10,38,17);
		t.source = "chuangguan_json.chuangguan_blank_2_png";
		t.top = 0;
		return t;
	};
	return ChuangguanRankItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/chuangguan/PassInfoSkin.exml'] = window.PassInfoSkin = (function (_super) {
	__extends(PassInfoSkin, _super);
	function PassInfoSkin() {
		_super.call(this);
		this.skinParts = ["nTxt","aTxt"];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Group1_i()];
	}
	var _proto = PassInfoSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(21,4,9,26);
		t.source = "zjm_json.zjm_ditudi_png";
		t.y = 5;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.right = 0;
		t.rotation = 0.14;
		t.source = "zjm_json.zjm_ditu_png";
		t.y = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.left = 15;
		t.right = 47;
		t.y = 12;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.nTxt_i(),this._Image3_i(),this.aTxt_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto.nTxt_i = function () {
		var t = new eui.Label();
		this.nTxt = t;
		t.bold = true;
		t.size = 18;
		t.text = "勇士部落";
		t.textColor = 0xFFF1E6;
		t.x = 19;
		t.y = 14;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "zjm_json.zjm_exp_png";
		t.x = 97;
		t.y = 14;
		return t;
	};
	_proto.aTxt_i = function () {
		var t = new eui.Label();
		this.aTxt = t;
		t.bold = true;
		t.height = 16;
		t.horizontalCenter = 48.5;
		t.size = 16;
		t.text = "3688/min";
		t.textColor = 0xFFC600;
		t.y = 15;
		return t;
	};
	return PassInfoSkin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/BaseWinBg3Skin.exml'] = window.BaseWinBg3Skin = (function (_super) {
	__extends(BaseWinBg3Skin, _super);
	function BaseWinBg3Skin() {
		_super.call(this);
		this.skinParts = ["closeBtn","winTitle"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = BaseWinBg3Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this.closeBtn_i(),this.winTitle_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(43,44,79,46);
		t.source = "res/images/bg/vipBg.png";
		t.y = 0;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.source = "win_json.win_close_btn3_png";
		t.x = 570.51;
		t.y = 60.68;
		return t;
	};
	_proto.winTitle_i = function () {
		var t = new eui.Image();
		this.winTitle = t;
		t.source = "";
		t.visible = false;
		t.x = 44;
		t.y = 13;
		return t;
	};
	return BaseWinBg3Skin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/BaseWinBg4Skin.exml'] = window.BaseWinBg4Skin = (function (_super) {
	__extends(BaseWinBg4Skin, _super);
	function BaseWinBg4Skin() {
		_super.call(this);
		this.skinParts = ["closeBtn","winTitle"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = BaseWinBg4Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this.closeBtn_i(),this.winTitle_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(43,44,79,46);
		t.source = "res/images/bg/shopBg.png";
		t.y = 0;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.right = 31;
		t.source = "win_json.win_close_btn5_png";
		t.top = 48;
		return t;
	};
	_proto.winTitle_i = function () {
		var t = new eui.Image();
		this.winTitle = t;
		t.source = "";
		t.visible = false;
		t.x = 44;
		t.y = 13;
		return t;
	};
	return BaseWinBg4Skin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/BaseWinBg5Skin.exml'] = window.BaseWinBg5Skin = (function (_super) {
	__extends(BaseWinBg5Skin, _super);
	function BaseWinBg5Skin() {
		_super.call(this);
		this.skinParts = ["closeBtn","winTitle"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = BaseWinBg5Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this.closeBtn_i(),this.winTitle_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(43,44,79,46);
		t.source = "res/images/bg/luck2Bg.png";
		t.y = 0;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.right = 34;
		t.source = "win_json.win_close_btn6_png";
		t.top = 57;
		return t;
	};
	_proto.winTitle_i = function () {
		var t = new eui.Image();
		this.winTitle = t;
		t.source = "";
		t.visible = false;
		t.x = 44;
		t.y = 13;
		return t;
	};
	return BaseWinBg5Skin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/CommunalPagePannelSkin.exml'] = window.CommunalPagePannelSkin = (function (_super) {
	__extends(CommunalPagePannelSkin, _super);
	function CommunalPagePannelSkin() {
		_super.call(this);
		this.skinParts = ["viewContent","line0","line1","line2","line3","tabBtn"];
		
		this.height = 680;
		this.width = 535;
		this.elementsContent = [this._Image1_i(),this.viewContent_i(),this._Group3_i()];
	}
	var _proto = CommunalPagePannelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 680;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(20,168,65,17);
		t.source = "win_json.win_bg4_png";
		t.verticalCenter = 0;
		t.width = 530;
		return t;
	};
	_proto.viewContent_i = function () {
		var t = new eui.Group();
		this.viewContent = t;
		t.anchorOffsetY = 0;
		t.height = 565;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.width = 510;
		t.y = 7;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 579;
		t.elementsContent = [this._Image2_i(),this._Group2_i(),this.tabBtn_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -1;
		t.scale9Grid = new egret.Rectangle(1,1,8,1);
		t.source = "role_json.role_line_fg_2_png";
		t.top = 0;
		t.width = 526;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 117;
		t.y = 9;
		t.elementsContent = [this._Group1_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = -10;
		t.verticalCenter = -8;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.line0_i(),this.line1_i(),this.line2_i(),this.line3_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 109;
		return t;
	};
	_proto.line0_i = function () {
		var t = new eui.Image();
		this.line0 = t;
		t.source = "win_json.win_slice_line3_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.line1_i = function () {
		var t = new eui.Image();
		this.line1 = t;
		t.source = "win_json.win_slice_line3_png";
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.line2_i = function () {
		var t = new eui.Image();
		this.line2 = t;
		t.source = "win_json.win_slice_line3_png";
		t.x = 20;
		t.y = 20;
		return t;
	};
	_proto.line3_i = function () {
		var t = new eui.Image();
		this.line3 = t;
		t.source = "win_json.win_slice_line3_png";
		t.x = 30;
		t.y = 30;
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.itemRendererSkinName = TabBar3Skin;
		t.x = 31;
		t.y = 7;
		t.layout = this._HorizontalLayout2_i();
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 47;
		return t;
	};
	return CommunalPagePannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/CommunalPageWin2Skin.exml'] = window.CommunalPageWin2Skin = (function (_super) {
	__extends(CommunalPageWin2Skin, _super);
	function CommunalPageWin2Skin() {
		_super.call(this);
		this.skinParts = ["bg","viewContent","tabBtn"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = CommunalPageWin2Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.touchThrough = true;
		t.elementsContent = [this.bg_i(),this.viewContent_i(),this.tabBtn_i()];
		return t;
	};
	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.horizontalCenter = 0;
		t.skinName = "BaseWinBgSkin";
		return t;
	};
	_proto.viewContent_i = function () {
		var t = new eui.Group();
		this.viewContent = t;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.y = 50;
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.bottom = 39;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = TabBar4Skin;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 29;
		return t;
	};
	return CommunalPageWin2Skin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/CommunalPageWin3Skin.exml'] = window.CommunalPageWin3Skin = (function (_super) {
	__extends(CommunalPageWin3Skin, _super);
	function CommunalPageWin3Skin() {
		_super.call(this);
		this.skinParts = ["tabBtn","bg","viewContent"];
		
		this.width = 637;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = CommunalPageWin3Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.touchThrough = true;
		t.elementsContent = [this.tabBtn_i(),this.bg_i(),this.viewContent_i()];
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.height = 85;
		t.itemRendererSkinName = TabBar1Skin;
		t.top = 801;
		t.x = 119;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 8;
		return t;
	};
	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.horizontalCenter = 0;
		t.skinName = "BaseWinBg3Skin";
		return t;
	};
	_proto.viewContent_i = function () {
		var t = new eui.Group();
		this.viewContent = t;
		t.anchorOffsetY = 0;
		t.height = 628;
		t.touchEnabled = false;
		t.width = 506;
		t.x = 71;
		t.y = 143;
		return t;
	};
	return CommunalPageWin3Skin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/CommunalPageWin4Skin.exml'] = window.CommunalPageWin4Skin = (function (_super) {
	__extends(CommunalPageWin4Skin, _super);
	function CommunalPageWin4Skin() {
		_super.call(this);
		this.skinParts = ["tabBtn","bg","viewContent"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = CommunalPageWin4Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.touchThrough = true;
		t.elementsContent = [this.tabBtn_i(),this.bg_i(),this.viewContent_i()];
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.height = 85;
		t.itemRendererSkinName = TabBar1Skin;
		t.left = 80;
		t.top = 772;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 8;
		return t;
	};
	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.horizontalCenter = 0;
		t.skinName = "BaseWinBg4Skin";
		return t;
	};
	_proto.viewContent_i = function () {
		var t = new eui.Group();
		this.viewContent = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 588;
		t.touchEnabled = false;
		t.width = 500;
		t.x = 57.67;
		t.y = 148.33;
		return t;
	};
	return CommunalPageWin4Skin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/CommunalPageWin5Skin.exml'] = window.CommunalPageWin5Skin = (function (_super) {
	__extends(CommunalPageWin5Skin, _super);
	function CommunalPageWin5Skin() {
		_super.call(this);
		this.skinParts = ["tabBtn","bg","viewContent"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = CommunalPageWin5Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.touchThrough = true;
		t.elementsContent = [this.tabBtn_i(),this.bg_i(),this.viewContent_i()];
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.height = 85;
		t.itemRendererSkinName = TabBar1Skin;
		t.left = 114;
		t.top = 813;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 8;
		return t;
	};
	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.horizontalCenter = 0;
		t.skinName = "BaseWinBg5Skin";
		return t;
	};
	_proto.viewContent_i = function () {
		var t = new eui.Group();
		this.viewContent = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 660;
		t.horizontalCenter = 0.5;
		t.touchEnabled = false;
		t.width = 500;
		t.y = 148.33;
		return t;
	};
	return CommunalPageWin5Skin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/CommunalPageWinSkin.exml'] = window.CommunalPageWinSkin = (function (_super) {
	__extends(CommunalPageWinSkin, _super);
	function CommunalPageWinSkin() {
		_super.call(this);
		this.skinParts = ["bg","viewContent","closeBtn","backGrp","tabBtn"];
		
		this.height = 809;
		this.width = 637;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = CommunalPageWinSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.touchThrough = true;
		t.elementsContent = [this.bg_i(),this.viewContent_i(),this.backGrp_i(),this.tabBtn_i()];
		return t;
	};
	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.horizontalCenter = 0;
		t.skinName = "BaseWinBgSkin";
		return t;
	};
	_proto.viewContent_i = function () {
		var t = new eui.Group();
		this.viewContent = t;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.y = 50;
		return t;
	};
	_proto.backGrp_i = function () {
		var t = new eui.Group();
		this.backGrp = t;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.x = 34;
		t.y = 635;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.closeBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "win_json.win_rect_2_png";
		t.touchEnabled = false;
		t.x = 0;
		t.y = 55;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "win_json.win_rect_3_png";
		t.touchEnabled = false;
		t.x = 434;
		t.y = 0;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.source = "win_json.win_back_png";
		t.x = 528;
		t.y = 11;
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.itemRendererSkinName = TabBar1Skin;
		t.top = 746;
		t.x = 83;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 8;
		return t;
	};
	return CommunalPageWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/InfoTipsSkin.exml'] = window.InfoTipsSkin = (function (_super) {
	__extends(InfoTipsSkin, _super);
	function InfoTipsSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = InfoTipsSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "win_json.win_wenhao_1_png";
		t.verticalCenter = 0;
		return t;
	};
	return InfoTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/PropTipsSkin.exml'] = window.PropTipsSkin = (function (_super) {
	__extends(PropTipsSkin, _super);
	function PropTipsSkin() {
		_super.call(this);
		this.skinParts = ["title","propList"];
		
		this.width = 311;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.title_i(),this.propList_i()];
	}
	var _proto = PropTipsSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(224,70,110,25);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "win_json.win_tips_bg2_png";
		t.top = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "win_json.win_slice_line_png";
		t.top = 75;
		t.width = 301;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.top = 34;
		return t;
	};
	_proto.propList_i = function () {
		var t = new BaseCustComponent();
		this.propList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 34;
		t.className = "PropPart";
		t.horizontalCenter = 0;
		t.top = 100;
		return t;
	};
	return PropTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/SlidePageSkin.exml'] = window.SlidePageSkin = (function (_super) {
	__extends(SlidePageSkin, _super);
	function SlidePageSkin() {
		_super.call(this);
		this.skinParts = ["gTouch","list","itemData0","itemData1","itemData2","tabBtn"];
		
		this.height = 129;
		this.elementsContent = [this.gTouch_i(),this.list_i(),this.tabBtn_i(),this._Scroller1_i()];
	}
	var _proto = SlidePageSkin.prototype;

	_proto.gTouch_i = function () {
		var t = new eui.Group();
		this.gTouch = t;
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = Itembase2Skin;
		t.top = 0;
		t.touchThrough = true;
		t.layout = this._HorizontalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 10;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = TabBar1Skin;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.layout = this._HorizontalLayout2_i();
		t.dataProvider = this._ArrayCollection2_i();
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._ArrayCollection2_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this.itemData0_i(),this.itemData1_i(),this.itemData2_i()];
		return t;
	};
	_proto.itemData0_i = function () {
		var t = {};
		this.itemData0 = t;
		t.icon = "public_json.public_page_bg_png";
		t.icon2 = "public_json.public_page_sl_png";
		return t;
	};
	_proto.itemData1_i = function () {
		var t = {};
		this.itemData1 = t;
		t.icon = "public_json.public_page_bg_png";
		t.icon2 = "public_json.public_page_sl_png";
		return t;
	};
	_proto.itemData2_i = function () {
		var t = {};
		this.itemData2 = t;
		t.icon = "public_json.public_page_bg_png";
		t.icon2 = "public_json.public_page_sl_png";
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.visible = false;
		t.width = 350;
		t.viewport = this._List1_i();
		return t;
	};
	_proto._List1_i = function () {
		var t = new eui.List();
		t.itemRendererSkinName = test;
		t.layout = this._HorizontalLayout3_i();
		return t;
	};
	_proto._HorizontalLayout3_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	return SlidePageSkin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/SlidePartSkin.exml'] = window.SlidePartSkin = (function (_super) {
	__extends(SlidePartSkin, _super);
	function SlidePartSkin() {
		_super.call(this);
		this.skinParts = ["itemList","sc","lBtn","rBtn"];
		
		this.elementsContent = [this.sc_i(),this.lBtn_i(),this.rBtn_i()];
	}
	var _proto = SlidePartSkin.prototype;

	_proto.sc_i = function () {
		var t = new eui.Scroller();
		this.sc = t;
		t.bottom = 0;
		t.bounces = false;
		t.left = 0;
		t.right = 0;
		t.throwSpeed = 0;
		t.top = 0;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		return t;
	};
	_proto.lBtn_i = function () {
		var t = new eui.Button();
		this.lBtn = t;
		t.height = 49;
		t.icon = "public_json.public_arrow_png";
		t.label = "Button";
		t.left = -32;
		t.name = "-1";
		t.skinName = "BtnIconSkin";
		t.verticalCenter = 0;
		t.width = 32;
		return t;
	};
	_proto.rBtn_i = function () {
		var t = new eui.Button();
		this.rBtn = t;
		t.height = 49;
		t.icon = "public_json.public_arrow_png";
		t.label = "Button";
		t.name = "1";
		t.right = -32;
		t.skewY = 180;
		t.skinName = "BtnIconSkin";
		t.verticalCenter = 0;
		t.width = 32;
		return t;
	};
	return SlidePartSkin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/SysTipsSkin.exml'] = window.SysTipsSkin = (function (_super) {
	__extends(SysTipsSkin, _super);
	function SysTipsSkin() {
		_super.call(this);
		this.skinParts = ["bg","desc","btn0","btn1"];
		
		this.currentState = "nomal";
		this.height = 374;
		this.width = 506;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this.desc_i(),this.btn0_i(),this.btn1_i()];
		this.states = [
			new eui.State ("nomal",
				[
				])
			,
			new eui.State ("single",
				[
					new eui.SetProperty("btn0","visible",false),
					new eui.SetProperty("btn1","horizontalCenter",0)
				])
		];
	}
	var _proto = SysTipsSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 106;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,0,13,3);
		t.source = "win_json.win_slice_line2_png";
		t.width = 484;
		return t;
	};
	_proto.desc_i = function () {
		var t = new eui.Label();
		this.desc = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0.5;
		t.lineSpacing = 3;
		t.size = 20;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0x4c2f27;
		t.verticalCenter = -23;
		t.width = 370;
		return t;
	};
	_proto.btn0_i = function () {
		var t = new eui.Button();
		this.btn0 = t;
		t.bottom = 34;
		t.icon = "res/btn/cancel.png";
		t.label = "Button";
		t.left = 62;
		t.skinName = "BtnIconSkin";
		return t;
	};
	_proto.btn1_i = function () {
		var t = new eui.Button();
		this.btn1 = t;
		t.bottom = 34;
		t.icon = "res/btn/confirm.png";
		t.label = "Button";
		t.right = 62;
		t.skinName = "BtnIconSkin";
		return t;
	};
	return SysTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/communal/test.exml'] = window.test = (function (_super) {
	__extends(test, _super);
	function test() {
		_super.call(this);
		this.skinParts = ["list"];
		
		this.width = 350;
		this.elementsContent = [this.list_i()];
	}
	var _proto = test.prototype;

	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = Itembase2Skin;
		t.top = 0;
		t.touchThrough = true;
		t.layout = this._HorizontalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 10;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	return test;
})(eui.Skin);generateEUI.paths['resource/exml/communal/TweenSlidePartSkin.exml'] = window.TweenSlidePartSkin = (function (_super) {
	__extends(TweenSlidePartSkin, _super);
	function TweenSlidePartSkin() {
		_super.call(this);
		this.skinParts = ["itemList","sc","lBtn","rBtn"];
		
		this.elementsContent = [this.sc_i(),this.lBtn_i(),this.rBtn_i()];
	}
	var _proto = TweenSlidePartSkin.prototype;

	_proto.sc_i = function () {
		var t = new eui.Scroller();
		this.sc = t;
		t.bottom = 0;
		t.bounces = false;
		t.left = 0;
		t.right = 0;
		t.throwSpeed = 0;
		t.top = 0;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		return t;
	};
	_proto.lBtn_i = function () {
		var t = new eui.Button();
		this.lBtn = t;
		t.height = 49;
		t.icon = "public_json.public_arrow_png";
		t.label = "Button";
		t.left = 0;
		t.name = "-1";
		t.skinName = "BtnIconSkin";
		t.verticalCenter = 0;
		t.width = 32;
		return t;
	};
	_proto.rBtn_i = function () {
		var t = new eui.Button();
		this.rBtn = t;
		t.height = 49;
		t.icon = "public_json.public_arrow_png";
		t.label = "Button";
		t.name = "1";
		t.right = 0;
		t.skewY = 180;
		t.skinName = "BtnIconSkin";
		t.verticalCenter = 0;
		t.width = 32;
		return t;
	};
	return TweenSlidePartSkin;
})(eui.Skin);generateEUI.paths['resource/exml/item/component/ItemExpend3Skin.exml'] = window.ItemExpend3Skin = (function (_super) {
	__extends(ItemExpend3Skin, _super);
	function ItemExpend3Skin() {
		_super.call(this);
		this.skinParts = ["lab","iconImg","gainWay","stuffName","countTxt"];
		
		this.currentState = "normal";
		this.height = 60;
		this.width = 72;
		this.elementsContent = [this.lab_i(),this._Image1_i(),this.iconImg_i(),this.gainWay_i(),this._Label1_i(),this.stuffName_i(),this._Group1_i()];
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("single",
				[
					new eui.SetProperty("countTxt","textColor",0xe6daac)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.label"],[0],this.lab,"text");
	}
	var _proto = ItemExpend3Skin.prototype;

	_proto.lab_i = function () {
		var t = new eui.Label();
		this.lab = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 18;
		t.textColor = 0xffc600;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "public_json.public_item_bg2_png";
		t.top = -3;
		t.visible = false;
		return t;
	};
	_proto.iconImg_i = function () {
		var t = new eui.Image();
		this.iconImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "";
		t.top = 0;
		t.visible = false;
		return t;
	};
	_proto.gainWay_i = function () {
		var t = new eui.Label();
		this.gainWay = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "获取";
		t.textColor = 0x36ff00;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "   ";
		t.textColor = 0x36FF00;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.stuffName_i = function () {
		var t = new eui.Label();
		this.stuffName = t;
		t.left = 0;
		t.size = 18;
		t.text = "道具名称";
		t.textColor = 0xffc600;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this.countTxt_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.countTxt_i = function () {
		var t = new eui.Label();
		this.countTxt = t;
		t.bottom = 0;
		t.left = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 18;
		t.text = "100/100";
		t.textColor = 0xffffff;
		return t;
	};
	return ItemExpend3Skin;
})(eui.Skin);generateEUI.paths['resource/exml/copy/copyexp/CopyExpBuffItemSkin.exml'] = window.CopyExpBuffItemSkin = (function (_super) {
	__extends(CopyExpBuffItemSkin, _super);
	function CopyExpBuffItemSkin() {
		_super.call(this);
		this.skinParts = ["item_1","cost","uBtn"];
		
		this.height = 90;
		this.width = 396;
		this.elementsContent = [this._Image1_i(),this.item_1_i(),this.cost_i(),this.uBtn_i()];
	}
	var _proto = CopyExpBuffItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(12,11,14,17);
		t.source = "public_json.public_rect_5_png";
		t.top = 0;
		return t;
	};
	_proto.item_1_i = function () {
		var t = new BaseCustComponent();
		this.item_1 = t;
		t.className = "ItemBase";
		t.left = 14;
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ItembaseSkin";
		t.verticalCenter = 1;
		return t;
	};
	_proto.cost_i = function () {
		var t = new ItemExpend();
		this.cost = t;
		t.skinName = "ItemExpend3Skin";
		t.x = 95;
		t.y = 15;
		return t;
	};
	_proto.uBtn_i = function () {
		var t = new eui.Button();
		this.uBtn = t;
		t.icon = "res/btn/wear.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 261;
		t.y = 16;
		return t;
	};
	return CopyExpBuffItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/copy/copyexp/CopyExpBuffSkin.exml'] = window.CopyExpBuffSkin = (function (_super) {
	__extends(CopyExpBuffSkin, _super);
	function CopyExpBuffSkin() {
		_super.call(this);
		this.skinParts = ["itemList"];
		
		this.height = 457;
		this.width = 442;
		this.elementsContent = [this._BaseWinBg1_i(),this._Scroller1_i()];
	}
	var _proto = CopyExpBuffSkin.prototype;

	_proto._BaseWinBg1_i = function () {
		var t = new BaseWinBg();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 354;
		t.width = 396;
		t.x = 22;
		t.y = 74;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = CopyExpBuffItemSkin;
		t.x = 1;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	return CopyExpBuffSkin;
})(eui.Skin);generateEUI.paths['resource/exml/copy/copyexp/CopyExpBuyBuffSkin.exml'] = window.CopyExpBuyBuffSkin = (function (_super) {
	__extends(CopyExpBuyBuffSkin, _super);
	function CopyExpBuyBuffSkin() {
		_super.call(this);
		this.skinParts = ["bg","buyBtn","sele_0","bg_0","title_0","g0","sele_1","bg_1","title_1","g1","icon_0","cost_0","icon_1","cost_1","num","c0","c1","t0"];
		
		this.height = 418;
		this.width = 444;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this.buyBtn_i(),this.g0_i(),this.g1_i(),this._Group1_i(),this._Group2_i(),this._Group3_i(),this.c0_i(),this.c1_i(),this.t0_i()];
	}
	var _proto = CopyExpBuyBuffSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "public_json.public_slice_line_png";
		t.width = 414;
		t.y = 321;
		return t;
	};
	_proto.buyBtn_i = function () {
		var t = new eui.Button();
		this.buyBtn = t;
		t.icon = "res/btn/inspireBtn.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 147;
		t.y = 334;
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.name = "0";
		t.touchChildren = false;
		t.touchThrough = true;
		t.x = 13;
		t.y = 123;
		t.elementsContent = [this.sele_0_i(),this.bg_0_i(),this.title_0_i(),this._Image2_i()];
		return t;
	};
	_proto.sele_0_i = function () {
		var t = new eui.Image();
		this.sele_0 = t;
		t.horizontalCenter = 0;
		t.source = "copyBuff_json.copyBuff_sele_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.bg_0_i = function () {
		var t = new eui.Image();
		this.bg_0 = t;
		t.source = "copyBuff_json.copyBuff_item_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.title_0_i = function () {
		var t = new eui.Image();
		this.title_0 = t;
		t.source = "copyBuff_json.copyBuff_coin_png";
		t.x = 60;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -1;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "res/images/item/1.png";
		t.y = 53;
		return t;
	};
	_proto.g1_i = function () {
		var t = new eui.Group();
		this.g1 = t;
		t.name = "1";
		t.touchChildren = false;
		t.touchThrough = true;
		t.x = 222;
		t.y = 123;
		t.elementsContent = [this.sele_1_i(),this.bg_1_i(),this.title_1_i(),this._Image3_i()];
		return t;
	};
	_proto.sele_1_i = function () {
		var t = new eui.Image();
		this.sele_1 = t;
		t.horizontalCenter = 0;
		t.source = "copyBuff_json.copyBuff_sele_png";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.bg_1_i = function () {
		var t = new eui.Image();
		this.bg_1 = t;
		t.source = "copyBuff_json.copyBuff_item_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.title_1_i = function () {
		var t = new eui.Image();
		this.title_1 = t;
		t.source = "copyBuff_json.copyBuff_gold_png";
		t.x = 60;
		t.y = 10;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "res/images/item/14.png";
		t.x = 68;
		t.y = 53;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = -107;
		t.y = 272;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.icon_0_i(),this.cost_0_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.icon_0_i = function () {
		var t = new eui.Image();
		this.icon_0 = t;
		t.height = 25;
		t.source = "res/images/item/1.png";
		t.width = 25;
		t.x = 6;
		t.y = 1;
		return t;
	};
	_proto.cost_0_i = function () {
		var t = new eui.Label();
		this.cost_0 = t;
		t.size = 16;
		t.text = "1000/ 次";
		t.textColor = 0xffc600;
		t.x = 82;
		t.y = 28;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 104;
		t.y = 272;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this.icon_1_i(),this.cost_1_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.icon_1_i = function () {
		var t = new eui.Image();
		this.icon_1 = t;
		t.height = 25;
		t.source = "res/images/item/14.png";
		t.width = 25;
		t.x = 6;
		t.y = 1;
		return t;
	};
	_proto.cost_1_i = function () {
		var t = new eui.Label();
		this.cost_1 = t;
		t.size = 16;
		t.text = "1000/ 次";
		t.textColor = 0xffc600;
		t.x = 82;
		t.y = 28;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.width = 378;
		t.y = 73;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this._Image4_i(),this.num_i(),this._Image5_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "copyBuff_json.copyBuff_texture_0_png";
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto.num_i = function () {
		var t = new NumberMC();
		this.num = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 1;
		t.type = "copyBuff_json.copyBuff_num_";
		t.width = 60;
		t.x = 148;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "copyBuff_json.copyBuff_texture_1_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.c0_i = function () {
		var t = new eui.Label();
		this.c0 = t;
		t.size = 16;
		t.text = "（0/5）";
		t.x = 90;
		t.y = 296;
		return t;
	};
	_proto.c1_i = function () {
		var t = new eui.Label();
		this.c1 = t;
		t.size = 16;
		t.text = "（0/5）";
		t.x = 304;
		t.y = 296;
		return t;
	};
	_proto.t0_i = function () {
		var t = new eui.Label();
		this.t0 = t;
		t.size = 16;
		t.text = "当前增加伤害 : 100%";
		t.textColor = 0x4c2f27;
		t.x = 147;
		t.y = 101;
		return t;
	};
	return CopyExpBuyBuffSkin;
})(eui.Skin);generateEUI.paths['resource/exml/copy/copyexp/CopyExpInfoSkin.exml'] = window.CopyExpInfoSkin = (function (_super) {
	__extends(CopyExpInfoSkin, _super);
	function CopyExpInfoSkin() {
		_super.call(this);
		this.skinParts = ["num","killNum","wave","total","vip","iG","btnGroup","timeNum","tG"];
		
		this.elementsContent = [this.iG_i(),this.btnGroup_i(),this.tG_i()];
	}
	var _proto = CopyExpInfoSkin.prototype;

	_proto.iG_i = function () {
		var t = new eui.Group();
		this.iG = t;
		t.height = 157;
		t.right = 0;
		t.top = 0;
		t.width = 257;
		t.elementsContent = [this._Image1_i(),this.num_i(),this.killNum_i(),this.wave_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this.total_i(),this.vip_i(),this._Image6_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(21,23,70,32);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "copyexp_json.copyexp_bg_png";
		t.top = 0;
		return t;
	};
	_proto.num_i = function () {
		var t = new NumberMC();
		this.num = t;
		t.type = "time_";
		t.x = 104;
		t.y = 68;
		return t;
	};
	_proto.killNum_i = function () {
		var t = new NumberMC();
		this.killNum = t;
		t.type = "time_";
		t.x = 117;
		t.y = 40;
		return t;
	};
	_proto.wave_i = function () {
		var t = new NumberMC();
		this.wave = t;
		t.type = "time_";
		t.x = 117;
		t.y = 14;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 59;
		t.scale9Grid = new egret.Rectangle(19,13,119,29);
		t.source = "public_json.public_prop_rect_png";
		t.width = 235;
		t.x = 11;
		t.y = 91;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(1,0,5,2);
		t.source = "public_json.public_slice_line3_png";
		t.width = 219;
		t.x = 19;
		t.y = 119;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "copyexp_json.copyexp_texture_0_png";
		t.x = 28;
		t.y = 67;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "copyexp_json.copyexp_texture_2_png";
		t.x = 28;
		t.y = 14;
		return t;
	};
	_proto.total_i = function () {
		var t = new eui.Label();
		this.total = t;
		t.bottom = 42;
		t.horizontalCenter = 0.5;
		t.size = 16;
		t.text = "当前经验收益 : 114514";
		t.textColor = 0xffc600;
		return t;
	};
	_proto.vip_i = function () {
		var t = new eui.Label();
		this.vip = t;
		t.bottom = 15;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "VIP6用户经验 +30%";
		t.textColor = 0xFFC600;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.bottom = 98;
		t.source = "copyexp_json.copyexp_texture_1_png";
		t.x = 28;
		return t;
	};
	_proto.btnGroup_i = function () {
		var t = new eui.Group();
		this.btnGroup = t;
		t.anchorOffsetX = 0;
		t.right = 0;
		t.verticalCenter = 66;
		t.visible = false;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto.tG_i = function () {
		var t = new eui.Group();
		this.tG = t;
		t.horizontalCenter = 0;
		t.verticalCenter = -97;
		t.visible = false;
		t.elementsContent = [this._Image7_i(),this._Image8_i(),this.timeNum_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "copyexp_json.copyexp_time_blank_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "copyexp_json.copyexp_texture_3_png";
		t.x = 274;
		t.y = 12;
		return t;
	};
	_proto.timeNum_i = function () {
		var t = new NumberMC();
		this.timeNum = t;
		t.type = "copyexp_json.copyexp_time_";
		t.width = 23;
		t.x = 247;
		t.y = 12;
		return t;
	};
	return CopyExpInfoSkin;
})(eui.Skin);generateEUI.paths['resource/exml/copy/copyexp/CopyExpPageSkin.exml'] = window.CopyExpPageSkin = (function (_super) {
	__extends(CopyExpPageSkin, _super);
	function CopyExpPageSkin() {
		_super.call(this);
		this.skinParts = ["instruction","buyBtn","item_1","item_0","cost","btn_0","count"];
		
		this.height = 565;
		this.width = 510;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.instruction_i(),this._Image4_i(),this._Image5_i(),this.buyBtn_i(),this.item_1_i(),this.item_0_i(),this.cost_i(),this.btn_0_i(),this.count_i(),this._Group1_i(),this._Image6_i()];
	}
	var _proto = CopyExpPageSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "res/images/bg/copyExpBg.png";
		t.y = 7;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "win_json.win_reword_5_png";
		t.x = 356;
		t.y = 316;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.height = 562;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.width = 506;
		return t;
	};
	_proto.instruction_i = function () {
		var t = new BaseCustComponent();
		this.instruction = t;
		t.skinName = "InstructionPartSkin";
		t.visible = false;
		t.x = 15;
		t.y = 11;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 105;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(10,11,17,15);
		t.source = "public_json.public_prop_rect_png";
		t.width = 494;
		t.y = 455;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 28;
		t.scale9Grid = new egret.Rectangle(17,12,12,9);
		t.source = "copyexp_json.copyexp_count_blank_png";
		t.width = 155;
		t.x = 332;
		t.y = 463;
		return t;
	};
	_proto.buyBtn_i = function () {
		var t = new eui.Image();
		this.buyBtn = t;
		t.source = "public_json.public_add_png";
		t.x = 458;
		t.y = 464;
		return t;
	};
	_proto.item_1_i = function () {
		var t = new BaseCustComponent();
		this.item_1 = t;
		t.className = "ItemBase";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ItembaseSkin";
		t.x = 388;
		t.y = 367;
		return t;
	};
	_proto.item_0_i = function () {
		var t = new BaseCustComponent();
		this.item_0 = t;
		t.className = "ItemBase";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ItembaseSkin";
		t.x = 22;
		t.y = 470;
		return t;
	};
	_proto.cost_i = function () {
		var t = new ItemExpend();
		this.cost = t;
		t.skinName = "ItemExpend3Skin";
		t.x = 104;
		t.y = 476;
		return t;
	};
	_proto.btn_0_i = function () {
		var t = new eui.Button();
		this.btn_0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.icon = "res/btn/enterBtn4.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 342;
		t.y = 496;
		return t;
	};
	_proto.count_i = function () {
		var t = new eui.Label();
		this.count = t;
		t.size = 18;
		t.text = "剩余次数：3";
		t.x = 338;
		t.y = 469;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 111;
		t.width = 300;
		t.x = 25;
		t.y = 333;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Label1_i(),this._Label2_i(),this._Label3_i(),this._Label4_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 12;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 16;
		t.text = "规则说明 :";
		t.textColor = 0xffc600;
		t.x = 75;
		t.y = 38;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.size = 16;
		t.text = "1.规定时间内击杀更多怪物，经验更高！";
		t.x = 85;
		t.y = 48;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.size = 16;
		t.text = "2.副本内进行鼓舞，打怪更效率！";
		t.x = 95;
		t.y = 58;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.size = 16;
		t.text = "3.使用多倍经验药水，获益更高！";
		t.x = 105;
		t.y = 68;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "res/images/item/13.png";
		t.x = 387;
		t.y = 366;
		return t;
	};
	return CopyExpPageSkin;
})(eui.Skin);generateEUI.paths['resource/exml/copy/copymaterials/CopyMaterialsInfoSkin.exml'] = window.CopyMaterialsInfoSkin = (function (_super) {
	__extends(CopyMaterialsInfoSkin, _super);
	function CopyMaterialsInfoSkin() {
		_super.call(this);
		this.skinParts = ["exitBtn","eva","num","txt_0","txt_1"];
		
		this.height = 159;
		this.width = 274;
		this.elementsContent = [this._Image1_i(),this.exitBtn_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.eva_i(),this.num_i(),this.txt_0_i(),this.txt_1_i()];
	}
	var _proto = CopyMaterialsInfoSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(21,20,71,38);
		t.source = "copymaterials_json.copymaterials_bg_png";
		t.top = 0;
		return t;
	};
	_proto.exitBtn_i = function () {
		var t = new eui.Button();
		this.exitBtn = t;
		t.icon = "res/btn/exitBtn.png";
		t.label = "Button";
		t.x = 82;
		t.y = 98;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(19,13,119,29);
		t.source = "public_json.public_prop_rect_png";
		t.width = 249;
		t.x = 13;
		t.y = 39;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(1,0,5,2);
		t.source = "strength_json.strength_slice_line_png";
		t.width = 229;
		t.x = 23;
		t.y = 67;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "copymaterials_json.copymaterials_text_4_png";
		t.x = 20;
		t.y = 16;
		return t;
	};
	_proto.eva_i = function () {
		var t = new eui.Image();
		this.eva = t;
		t.source = "copymaterials_json.copymaterials_1_png";
		t.x = -14;
		t.y = 89;
		return t;
	};
	_proto.num_i = function () {
		var t = new NumberMC();
		this.num = t;
		t.type = "time_";
		t.x = 111;
		t.y = 16;
		return t;
	};
	_proto.txt_0_i = function () {
		var t = new eui.Label();
		this.txt_0 = t;
		t.anchorOffsetX = 0;
		t.size = 16;
		t.text = "";
		t.textColor = 0xffc600;
		t.width = 236;
		t.x = 23;
		t.y = 46;
		return t;
	};
	_proto.txt_1_i = function () {
		var t = new eui.Label();
		this.txt_1 = t;
		t.size = 16;
		t.text = "";
		t.textColor = 0xffc600;
		t.width = 236;
		t.x = 23;
		t.y = 73;
		return t;
	};
	return CopyMaterialsInfoSkin;
})(eui.Skin);generateEUI.paths['resource/exml/item/component/ItemExpend4Skin.exml'] = window.ItemExpend4Skin = (function (_super) {
	__extends(ItemExpend4Skin, _super);
	function ItemExpend4Skin() {
		_super.call(this);
		this.skinParts = ["gainWay","lab","iconImg","countTxt"];
		
		this.currentState = "normal";
		this.elementsContent = [this.gainWay_i(),this.lab_i(),this._Label2_i(),this._Group1_i()];
		this._Label1_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("single",
				[
					new eui.AddItems("_Label1","",2,"_Label2"),
					new eui.SetProperty("countTxt","textColor",0x00b4fc),
					new eui.SetProperty("countTxt","text","100")
				])
		];
	}
	var _proto = ItemExpend4Skin.prototype;

	_proto.gainWay_i = function () {
		var t = new eui.Label();
		this.gainWay = t;
		t.right = -35;
		t.size = 16;
		t.text = "获取";
		t.textColor = 0x36ff00;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.lab_i = function () {
		var t = new eui.Label();
		this.lab = t;
		t.bold = true;
		t.left = -51;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 18;
		t.text = "";
		t.textColor = 0x6a453b;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.size = 18;
		t.text = "";
		t.textColor = 0x00ff0c;
		t.visible = false;
		t.x = 44;
		t.y = 21;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.size = 18;
		t.text = "   ";
		t.textColor = 0x36FF00;
		t.verticalCenter = 0;
		t.visible = false;
		t.x = 107;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this.iconImg_i(),this.countTxt_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.iconImg_i = function () {
		var t = new eui.Image();
		this.iconImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 32;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "res/images/item/14.png";
		t.width = 32;
		t.x = 1;
		t.y = 0;
		return t;
	};
	_proto.countTxt_i = function () {
		var t = new eui.Label();
		this.countTxt = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 18;
		t.text = "100/100";
		t.textColor = 0x00b4ff;
		t.x = 31;
		t.y = 8;
		return t;
	};
	return ItemExpend4Skin;
})(eui.Skin);generateEUI.paths['resource/exml/copy/copymaterials/CopyMaterialsItemSkin.exml'] = window.CopyMaterialsItemSkin = (function (_super) {
	__extends(CopyMaterialsItemSkin, _super);
	function CopyMaterialsItemSkin() {
		_super.call(this);
		this.skinParts = ["bg","iG","cost","desc","title","btn"];
		
		this.elementsContent = [this.bg_i(),this.iG_i(),this.cost_i(),this.desc_i(),this.title_i(),this.btn_i()];
	}
	var _proto = CopyMaterialsItemSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.source = "res/images/bg/copyMaterialsBg_1b.png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.iG_i = function () {
		var t = new eui.Group();
		this.iG = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 35;
		t.height = 67;
		t.left = 65;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	_proto.cost_i = function () {
		var t = new ItemExpend();
		this.cost = t;
		t.anchorOffsetX = 0;
		t.currentState = "single";
		t.horizontalCenter = 185;
		t.skinName = "ItemExpend4Skin";
		t.top = 20;
		t.width = 91;
		t.x = 388;
		t.y = 20;
		return t;
	};
	_proto.desc_i = function () {
		var t = new eui.Label();
		this.desc = t;
		t.size = 16;
		t.text = "label";
		t.x = 362;
		t.y = 108;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.left = 25;
		t.source = "copymaterials_json.copymaterials_title_1_png";
		t.y = 15;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.height = 37;
		t.icon = "res/btn/sweepBtn2.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.width = 106;
		t.x = 371;
		t.y = 57;
		return t;
	};
	return CopyMaterialsItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/copy/copymaterials/CopyMaterialsPageSkin.exml'] = window.CopyMaterialsPageSkin = (function (_super) {
	__extends(CopyMaterialsPageSkin, _super);
	function CopyMaterialsPageSkin() {
		_super.call(this);
		this.skinParts = ["itemList"];
		
		this.height = 565;
		this.width = 510;
		this.elementsContent = [this._Image1_i(),this._Scroller1_i()];
	}
	var _proto = CopyMaterialsPageSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 561;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.width = 506;
		t.y = 4;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 8;
		t.height = 545;
		t.horizontalCenter = 0;
		t.scrollPolicyH = "off";
		t.width = 492;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = CopyMaterialsItemSkin;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		return t;
	};
	return CopyMaterialsPageSkin;
})(eui.Skin);generateEUI.paths['resource/exml/copy/copytower/CopyTowerLuckWinSkin.exml'] = window.CopyTowerLuckWinSkin = (function (_super) {
	__extends(CopyTowerLuckWinSkin, _super);
	function CopyTowerLuckWinSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 300;
		this.width = 400;
	}
	var _proto = CopyTowerLuckWinSkin.prototype;

	return CopyTowerLuckWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/copy/copytower/CopyTowerPannelSkin.exml'] = window.CopyTowerPannelSkin = (function (_super) {
	__extends(CopyTowerPannelSkin, _super);
	function CopyTowerPannelSkin() {
		_super.call(this);
		this.skinParts = ["btnRank","lbNe0","lbNe1","lbNe2","lbLv0","lbLv1","lbLv2","list","btnRw","btnLuck","lbAcross","rw","lbRwNe","lbLuckAcc","lb2","lb1","lb0","lb3","btnClg"];
		
		this.height = 680;
		this.width = 535;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Group3_i(),this._Group7_i(),this._Group8_i(),this.btnClg_i()];
	}
	var _proto = CopyTowerPannelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 680;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(20,168,65,17);
		t.source = "win_json.win_bg4_png";
		t.verticalCenter = 0;
		t.width = 530;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "res/images/bg/copyTowerBg.png";
		t.y = 10.7;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 525.84;
		t.elementsContent = [this._Image3_i(),this.btnRank_i(),this._Image4_i(),this._Group1_i(),this._Group2_i(),this.lbNe0_i(),this.lbNe1_i(),this.lbNe2_i(),this.lbLv0_i(),this.lbLv1_i(),this.lbLv2_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 140;
		t.scale9Grid = new egret.Rectangle(19,14,119,30);
		t.source = "public_json.public_rect_7_png";
		t.width = 515;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.btnRank_i = function () {
		var t = new eui.Image();
		this.btnRank = t;
		t.source = "copytower_json.copytower_btn_rank_png";
		t.x = 399.53;
		t.y = 0.61;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "copytower_json.copytower_img_rank_png";
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 78;
		t.horizontalCenter = 0;
		t.percentWidth = 99;
		t.y = 32.33;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Image5_i(),this._Image6_i(),this._Image7_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 33;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_slice_line2_png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_slice_line2_png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 20;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_slice_line2_png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 30;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.left = 20;
		t.y = 37.35;
		t.layout = this._VerticalLayout2_i();
		t.elementsContent = [this._Image8_i(),this._Image9_i(),this._Image10_i()];
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 8;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "rank_json.rank_nb_1_png";
		t.x = 8;
		t.y = 0;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "rank_json.rank_nb_2_png";
		t.x = 5;
		t.y = 38.65;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.source = "rank_json.rank_nb_3_png";
		t.x = 6;
		t.y = 72.65;
		return t;
	};
	_proto.lbNe0_i = function () {
		var t = new eui.Label();
		this.lbNe0 = t;
		t.horizontalCenter = -83.5;
		t.size = 16;
		t.text = "虚位以待";
		t.y = 43;
		return t;
	};
	_proto.lbNe1_i = function () {
		var t = new eui.Label();
		this.lbNe1 = t;
		t.horizontalCenter = -83.5;
		t.size = 16;
		t.text = "虚位以待";
		t.y = 77;
		return t;
	};
	_proto.lbNe2_i = function () {
		var t = new eui.Label();
		this.lbNe2 = t;
		t.horizontalCenter = -83.5;
		t.size = 16;
		t.text = "虚位以待";
		t.y = 113;
		return t;
	};
	_proto.lbLv0_i = function () {
		var t = new eui.Label();
		this.lbLv0 = t;
		t.horizontalCenter = 117;
		t.size = 16;
		t.text = "";
		t.textColor = 0x00b4ff;
		t.y = 43;
		return t;
	};
	_proto.lbLv1_i = function () {
		var t = new eui.Label();
		this.lbLv1 = t;
		t.horizontalCenter = 116.5;
		t.size = 16;
		t.text = "";
		t.textColor = 0x00b4ff;
		t.y = 77;
		return t;
	};
	_proto.lbLv2_i = function () {
		var t = new eui.Label();
		this.lbLv2 = t;
		t.horizontalCenter = 116.5;
		t.size = 16;
		t.text = "";
		t.textColor = 0x00b4ff;
		t.y = 113;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 505.33;
		t.width = 222.66;
		t.x = 297.82;
		t.y = 11.4;
		t.elementsContent = [this._Image11_i(),this.list_i(),this.btnRw_i(),this.btnLuck_i(),this._Group6_i(),this._Label1_i(),this.lbLuckAcc_i()];
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.1700000000000017;
		t.source = "copytower_json.copytower_img_rw2_png";
		t.y = 21.32;
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.horizontalCenter = -0.8299999999999983;
		t.itemRendererSkinName = ItembaseSkin;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.y = 79.23;
		t.layout = this._HorizontalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto.btnRw_i = function () {
		var t = new eui.Button();
		this.btnRw = t;
		t.icon = "copytower_json.copytower_img_rw_png";
		t.label = "";
		t.left = 20;
		t.skinName = "BtnIconSkin";
		t.width = 78;
		t.y = 375.67;
		return t;
	};
	_proto.btnLuck_i = function () {
		var t = new eui.Button();
		this.btnLuck = t;
		t.icon = "copytower_json.copytower_img_luck_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.width = 78;
		t.x = 125;
		t.y = 375.67;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.x = 11;
		t.y = 178.95;
		t.elementsContent = [this._Group4_i(),this._Group5_i()];
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image12_i(),this.lbAcross_i()];
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.source = "copytower_json.copytower_green_rect_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbAcross_i = function () {
		var t = new eui.Label();
		this.lbAcross = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "通关迷雾之塔10层";
		t.textColor = 0x2aff00;
		t.verticalCenter = 1;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.x = 35;
		t.y = 35.31;
		t.elementsContent = [this._Image13_i(),this.rw_i(),this.lbRwNe_i()];
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.source = "copytower_json.copytower_img_1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.rw_i = function () {
		var t = new BaseCustComponent();
		this.rw = t;
		t.className = "ItemBase";
		t.horizontalCenter = 0;
		t.skinName = "ItembaseSkin";
		t.y = 8.41;
		return t;
	};
	_proto.lbRwNe_i = function () {
		var t = new eui.Label();
		this.lbRwNe = t;
		t.horizontalCenter = 0.5;
		t.size = 16;
		t.text = "宝石";
		t.textColor = 0xff24c4;
		t.y = 103.74;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 16;
		t.text = "明天0点领取";
		t.textColor = 0x2AFF00;
		t.x = 16;
		t.y = 456;
		return t;
	};
	_proto.lbLuckAcc_i = function () {
		var t = new eui.Label();
		this.lbLuckAcc = t;
		t.size = 16;
		t.text = "每通关10层可抽奖";
		t.textAlign = "center";
		t.textColor = 0x2AFF00;
		t.width = 83;
		t.x = 128;
		t.y = 456;
		return t;
	};
	_proto._Group8_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = -109;
		t.y = 66.66;
		t.elementsContent = [this.lb2_i(),this.lb1_i(),this.lb0_i(),this.lb3_i()];
		return t;
	};
	_proto.lb2_i = function () {
		var t = new eui.Label();
		this.lb2 = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "第1层";
		t.textColor = 0xffea00;
		t.y = 116.67;
		return t;
	};
	_proto.lb1_i = function () {
		var t = new eui.Label();
		this.lb1 = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "第100层";
		t.textColor = 0xffffff;
		t.y = 236;
		return t;
	};
	_proto.lb0_i = function () {
		var t = new eui.Label();
		this.lb0 = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "第100层";
		t.textColor = 0xFFFFFF;
		t.y = 354;
		return t;
	};
	_proto.lb3_i = function () {
		var t = new eui.Label();
		this.lb3 = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "第100层";
		t.textColor = 0xFFFFFF;
		t.y = 0;
		return t;
	};
	_proto.btnClg_i = function () {
		var t = new eui.Button();
		this.btnClg = t;
		t.icon = "copytower_json.copytower_img_clg_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = -0.96;
		t.y = 360.66;
		return t;
	};
	return CopyTowerPannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/copy/copytower/CopyTowerRwWinSkin.exml'] = window.CopyTowerRwWinSkin = (function (_super) {
	__extends(CopyTowerRwWinSkin, _super);
	function CopyTowerRwWinSkin() {
		_super.call(this);
		this.skinParts = ["bg","list","btn"];
		
		this.elementsContent = [this.bg_i(),this._Group2_i()];
	}
	var _proto = CopyTowerRwWinSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		t.x = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.bottom = 15;
		t.height = 350;
		t.horizontalCenter = 0;
		t.top = 65;
		t.width = 415;
		t.elementsContent = [this._Image1_i(),this._Group1_i(),this.btn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 75;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "public_json.public_slice_line_png";
		t.width = 419;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 5;
		t.y = 10;
		t.elementsContent = [this._Image2_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 255;
		t.scale9Grid = new egret.Rectangle(19,11,119,33);
		t.source = "public_json.public_prop_rect_png";
		t.width = 405;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.height = 214;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 403;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.itemRendererSkinName = Itembase2Skin;
		t.x = 114;
		t.y = -1;
		t.layout = this._TileLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 15;
		t.paddingLeft = 19;
		t.paddingTop = 0;
		t.requestedColumnCount = 4;
		t.verticalGap = 15;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.bottom = 10;
		t.horizontalCenter = 0;
		t.icon = "res/btn/get_3.png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		return t;
	};
	return CopyTowerRwWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/copy/fashionCopy/FashionCopyInfoSkin.exml'] = window.FashionCopyInfoSkin = (function (_super) {
	__extends(FashionCopyInfoSkin, _super);
	function FashionCopyInfoSkin() {
		_super.call(this);
		this.skinParts = ["eva","wave","time"];
		
		this.height = 132;
		this.width = 257;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.eva_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this.wave_i(),this.time_i()];
	}
	var _proto = FashionCopyInfoSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(29,22,58,31);
		t.source = "copyInfo_json.copyInfo_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "copyInfo_json.copyInfo_blank_1_png";
		t.x = 9;
		t.y = 95;
		return t;
	};
	_proto.eva_i = function () {
		var t = new eui.Image();
		this.eva = t;
		t.source = "copyInfo_json.copyInfo_1_png";
		t.x = -31;
		t.y = 81;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "copyInfo_json.copyInfo_texture_0_png";
		t.x = 13;
		t.y = 20;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "copyInfo_json.copyInfo_texture_2_png";
		t.x = 13;
		t.y = 51;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "copyInfo_json.copyInfo_texture_3_png";
		t.x = 104;
		t.y = 51;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "copyInfo_json.copyInfo_texture_4_png";
		t.x = 156;
		t.y = 51;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "fashionCopy_json.fashionCopy_texture_2_png";
		t.y = 97;
		return t;
	};
	_proto.wave_i = function () {
		var t = new NumberMC();
		this.wave = t;
		t.type = "time_";
		t.x = 129;
		t.y = 50;
		return t;
	};
	_proto.time_i = function () {
		var t = new NumberMC();
		this.time = t;
		t.type = "time_";
		t.x = 104;
		t.y = 19;
		return t;
	};
	return FashionCopyInfoSkin;
})(eui.Skin);generateEUI.paths['resource/exml/copy/fashionCopy/FashionCopyItemSkin.exml'] = window.FashionCopyItemSkin = (function (_super) {
	__extends(FashionCopyItemSkin, _super);
	function FashionCopyItemSkin() {
		_super.call(this);
		this.skinParts = ["img","lock","shapeMask","img_0","openImg","vip","desc","sG"];
		
		this.height = 238;
		this.width = 200;
		this.elementsContent = [this.sG_i()];
	}
	var _proto = FashionCopyItemSkin.prototype;

	_proto.sG_i = function () {
		var t = new eui.Group();
		this.sG = t;
		t.anchorOffsetX = 100;
		t.anchorOffsetY = 119;
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.x = 100;
		t.y = 119;
		t.elementsContent = [this.img_i(),this.lock_i(),this.shapeMask_i(),this.img_0_i(),this.openImg_i(),this.vip_i(),this.desc_i()];
		return t;
	};
	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.horizontalCenter = 0;
		t.source = "res/images/fashionCopy/fashionCopy_nor_3.png";
		t.y = 0;
		return t;
	};
	_proto.lock_i = function () {
		var t = new eui.Image();
		this.lock = t;
		t.source = "fashionCopy_json.fashionCopy_lock_png";
		t.x = 10;
		t.y = 16;
		return t;
	};
	_proto.shapeMask_i = function () {
		var t = new eui.Image();
		this.shapeMask = t;
		t.alpha = 1;
		t.source = "fashionCopy_json.fashionCopy_shapeMask_0_png";
		t.x = 0;
		t.y = 1;
		return t;
	};
	_proto.img_0_i = function () {
		var t = new eui.Image();
		this.img_0 = t;
		t.source = "fashionCopy_json.fashionCopy_texture_1_png";
		t.x = 67;
		t.y = 175;
		return t;
	};
	_proto.openImg_i = function () {
		var t = new eui.Image();
		this.openImg = t;
		t.source = "fashionCopy_json.fashionCopy_texture_0_png";
		t.x = 75;
		t.y = 202;
		return t;
	};
	_proto.vip_i = function () {
		var t = new NumberMC();
		this.vip = t;
		t.height = 20;
		t.type = "fashionCopy_json.fashionCopy_num_";
		t.width = 20;
		t.x = 115;
		t.y = 176.5;
		return t;
	};
	_proto.desc_i = function () {
		var t = new eui.Label();
		this.desc = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "Label";
		t.textColor = 0xffc600;
		t.y = 206;
		return t;
	};
	return FashionCopyItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/copy/fashionCopy/FashionCopyPageSkin.exml'] = window.FashionCopyPageSkin = (function (_super) {
	__extends(FashionCopyPageSkin, _super);
	function FashionCopyPageSkin() {
		_super.call(this);
		this.skinParts = ["bg","tabBtn","twSlide","plusBtn","remainText","enterBtn","itemList","sc","ig"];
		
		this.height = 565;
		this.width = 510;
		this.elementsContent = [this._Image1_i(),this.bg_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.tabBtn_i(),this.twSlide_i(),this.plusBtn_i(),this.remainText_i(),this.enterBtn_i(),this.sc_i(),this._Image5_i(),this.ig_i()];
	}
	var _proto = FashionCopyPageSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 565;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.width = 510;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.source = "res/images/bg/fashionCopy_1.png";
		t.x = 8;
		t.y = 51;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 204;
		t.scale9Grid = new egret.Rectangle(19,17,119,24);
		t.source = "public_json.public_prop_rect_png";
		t.width = 494;
		t.x = 8;
		t.y = 356;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "fashionCopy_json.fashionCopy_blank_2_png";
		t.x = 15;
		t.y = 362;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "fashionCopy_json.fashionCopy_blank_0_png";
		t.x = 159;
		t.y = 459;
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = TabBar1Skin;
		t.y = 5;
		t.layout = this._HorizontalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 3;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.icon = "fashionCopy_json.fashionCopy_tab_0_png";
		t.icon2 = "fashionCopy_json.fashionCopy_tab_0_s_png";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.icon = "fashionCopy_json.fashionCopy_tab_1_png";
		t.icon2 = "fashionCopy_json.fashionCopy_tab_1_s_png";
		return t;
	};
	_proto.twSlide_i = function () {
		var t = new BaseCustComponent();
		this.twSlide = t;
		t.className = "TweenSlidePart";
		t.height = 238;
		t.horizontalCenter = 0;
		t.skinName = "TweenSlidePartSkin";
		t.top = 106;
		t.width = 494;
		return t;
	};
	_proto.plusBtn_i = function () {
		var t = new eui.Button();
		this.plusBtn = t;
		t.height = 27;
		t.icon = "public_json.public_add_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.width = 29;
		t.x = 323;
		t.y = 460;
		return t;
	};
	_proto.remainText_i = function () {
		var t = new eui.Label();
		this.remainText = t;
		t.left = 163;
		t.size = 16;
		t.text = "今日剩余次数 : 2/3";
		t.textColor = 0xffffff;
		t.y = 465;
		return t;
	};
	_proto.enterBtn_i = function () {
		var t = new eui.Button();
		this.enterBtn = t;
		t.icon = "res/btn/enterBtn6.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 184;
		t.y = 494;
		return t;
	};
	_proto.sc_i = function () {
		var t = new eui.Scroller();
		this.sc = t;
		t.bounces = true;
		t.left = 8;
		t.right = 8;
		t.throwSpeed = 0.1;
		t.y = 106;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = FashionCopyItemSkin;
		t.layout = this._HorizontalLayout2_i();
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "fashionCopy_json.fashonCopy_title_png";
		t.y = 60;
		return t;
	};
	_proto.ig_i = function () {
		var t = new eui.Group();
		this.ig = t;
		t.horizontalCenter = 0;
		t.y = 368;
		t.layout = this._HorizontalLayout3_i();
		return t;
	};
	_proto._HorizontalLayout3_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 9;
		return t;
	};
	return FashionCopyPageSkin;
})(eui.Skin);generateEUI.paths['resource/exml/copy/pgtBoss/PgtBossItemSkin.exml'] = window.PgtBossItemSkin = (function (_super) {
	__extends(PgtBossItemSkin, _super);
	function PgtBossItemSkin() {
		_super.call(this);
		this.skinParts = ["labLv","labName"];
		
		this.elementsContent = [this._Image1_i(),this.labLv_i(),this.labName_i()];
	}
	var _proto = PgtBossItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.source = "pgtBoss_json.pgt_boss_board_item_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.labLv_i = function () {
		var t = new eui.Label();
		this.labLv = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "label";
		t.textColor = 0xffffff;
		t.y = 10;
		return t;
	};
	_proto.labName_i = function () {
		var t = new eui.Label();
		this.labName = t;
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "label";
		t.textColor = 0xffde00;
		t.y = 32;
		return t;
	};
	return PgtBossItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/progressBar/progressBarSkin8.exml'] = window.progressBarSkin8 = (function (_super) {
	__extends(progressBarSkin8, _super);
	function progressBarSkin8() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = progressBarSkin8.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "pgtBoss_json.pgt_boss_bar_board_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0.5;
		t.scale9Grid = new egret.Rectangle(9,2,25,13);
		t.source = "pgtBoss_json.pgt_boss_bar_png";
		t.verticalCenter = -1;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.style = "l_normal";
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 18;
		t.stroke = 0.5;
		t.text = "100%";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return progressBarSkin8;
})(eui.Skin);generateEUI.paths['resource/exml/copy/pgtBoss/PgtBossPanelSkin.exml'] = window.PgtBossPanelSkin = (function (_super) {
	__extends(PgtBossPanelSkin, _super);
	function PgtBossPanelSkin() {
		_super.call(this);
		this.skinParts = ["tab","line1","line2","line3","line4","imgCost","boss","hpBar","labCount","labTime","labBossCd","labName","labCost","labLock","labHp","awdList","bossList","addBtn","btnChallenge","power"];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.tab_i(),this.line1_i(),this.line2_i(),this.line3_i(),this.line4_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this._Image8_i(),this._Image9_i(),this.imgCost_i(),this.boss_i(),this.hpBar_i(),this.labCount_i(),this.labTime_i(),this.labBossCd_i(),this.labName_i(),this.labCost_i(),this.labLock_i(),this.labHp_i(),this.awdList_i(),this._Scroller1_i(),this.addBtn_i(),this.btnChallenge_i(),this.power_i()];
	}
	var _proto = PgtBossPanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 680;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(20,168,65,17);
		t.source = "win_json.win_bg4_png";
		t.verticalCenter = 0;
		t.width = 530;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -1;
		t.scale9Grid = new egret.Rectangle(1,1,8,1);
		t.source = "role_json.role_line_fg_2_png";
		t.width = 526;
		t.y = 580;
		return t;
	};
	_proto.tab_i = function () {
		var t = new eui.TabBar();
		this.tab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 90;
		t.itemRendererSkinName = TabBar3Skin;
		t.left = 10;
		t.right = 10;
		t.y = 585;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 38;
		t.horizontalAlign = "left";
		t.paddingLeft = 19;
		return t;
	};
	_proto.line1_i = function () {
		var t = new eui.Image();
		this.line1 = t;
		t.source = "win_json.win_slice_line3_png";
		t.x = 111;
		t.y = 598;
		return t;
	};
	_proto.line2_i = function () {
		var t = new eui.Image();
		this.line2 = t;
		t.source = "win_json.win_slice_line3_png";
		t.x = 212;
		t.y = 598;
		return t;
	};
	_proto.line3_i = function () {
		var t = new eui.Image();
		this.line3 = t;
		t.source = "win_json.win_slice_line3_png";
		t.x = 314;
		t.y = 598;
		return t;
	};
	_proto.line4_i = function () {
		var t = new eui.Image();
		this.line4 = t;
		t.source = "win_json.win_slice_line3_png";
		t.x = 417;
		t.y = 598;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(20,168,65,17);
		t.source = "res/images/bg/pgtBossBg.png";
		t.x = 10;
		t.y = 5;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 550;
		t.scale9Grid = new egret.Rectangle(23,16,140,97);
		t.source = "public_json.public_rect_7_png";
		t.width = 179;
		t.x = 335;
		t.y = 15;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "pgtBoss_json.pgt_boss_board_num1_png";
		t.x = 15;
		t.y = 15;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "pgtBoss_json.pgt_boss_board_num2_png";
		t.x = 100;
		t.y = 78;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "pgtBoss_json.pgt_boss_lab_pwr_png";
		t.x = 82.61;
		t.y = 115.34;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "pgtBoss_json.pgt_boss_bg_items_png";
		t.x = 12;
		t.y = 350;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "pgtBoss_json.pgt_boss_shade_png";
		t.x = 120;
		t.y = 286;
		return t;
	};
	_proto.imgCost_i = function () {
		var t = new eui.Image();
		this.imgCost = t;
		t.height = 28;
		t.source = "";
		t.width = 28;
		t.x = 124;
		t.y = 479;
		return t;
	};
	_proto.boss_i = function () {
		var t = new BaseCustComponent();
		this.boss = t;
		t.className = "UIAvatar";
		t.x = 168;
		t.y = 294;
		return t;
	};
	_proto.hpBar_i = function () {
		var t = new eui.ProgressBar();
		this.hpBar = t;
		t.skinName = "progressBarSkin8";
		t.x = 35;
		t.y = 316;
		return t;
	};
	_proto.labCount_i = function () {
		var t = new eui.Label();
		this.labCount = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = -2;
		t.size = 16;
		t.text = "label";
		t.textAlign = "center";
		t.y = 20;
		return t;
	};
	_proto.labTime_i = function () {
		var t = new eui.Label();
		this.labTime = t;
		t.anchorOffsetX = 0;
		t.left = 25;
		t.size = 16;
		t.text = "label";
		t.textAlign = "center";
		t.textColor = 0xffc600;
		t.y = 20;
		return t;
	};
	_proto.labBossCd_i = function () {
		var t = new eui.Label();
		this.labBossCd = t;
		t.anchorOffsetX = 0;
		t.bottom = 140;
		t.horizontalCenter = -90;
		t.size = 16;
		t.text = "label";
		t.textAlign = "center";
		t.textColor = 0x00ff00;
		t.visible = false;
		return t;
	};
	_proto.labName_i = function () {
		var t = new eui.Label();
		this.labName = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = -90;
		t.size = 18;
		t.text = "label";
		t.textAlign = "center";
		t.textColor = 0xffde00;
		t.y = 83;
		return t;
	};
	_proto.labCost_i = function () {
		var t = new eui.Label();
		this.labCost = t;
		t.anchorOffsetX = 0;
		t.size = 16;
		t.text = "label";
		t.textAlign = "left";
		t.verticalAlign = "middle";
		t.x = 160;
		t.y = 485;
		return t;
	};
	_proto.labLock_i = function () {
		var t = new eui.Label();
		this.labLock = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = -88;
		t.size = 16;
		t.text = "label";
		t.textAlign = "left";
		t.textColor = 0xff0000;
		t.verticalAlign = "middle";
		t.visible = false;
		t.y = 485;
		return t;
	};
	_proto.labHp_i = function () {
		var t = new eui.Label();
		this.labHp = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = -94;
		t.size = 18;
		t.text = "aaa";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.y = 319;
		return t;
	};
	_proto.awdList_i = function () {
		var t = new eui.List();
		this.awdList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 123;
		t.horizontalCenter = -92;
		t.itemRendererSkinName = ItembaseSkin;
		t.verticalCenter = 72;
		t.layout = this._HorizontalLayout2_i();
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.height = 542;
		t.scrollPolicyH = "off";
		t.width = 171;
		t.x = 338;
		t.y = 19;
		t.viewport = this.bossList_i();
		return t;
	};
	_proto.bossList_i = function () {
		var t = new eui.List();
		this.bossList = t;
		t.anchorOffsetY = 0;
		t.itemRendererSkinName = PgtBossItemSkin;
		t.x = 353;
		t.y = 31;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 5;
		t.horizontalAlign = "center";
		t.verticalAlign = "top";
		return t;
	};
	_proto.addBtn_i = function () {
		var t = new eui.Button();
		this.addBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 28;
		t.icon = "public_json.public_add_png";
		t.label = "";
		t.width = 28;
		t.x = 300.5;
		t.y = 16;
		return t;
	};
	_proto.btnChallenge_i = function () {
		var t = new eui.Button();
		this.btnChallenge = t;
		t.height = 57;
		t.icon = "pgtBoss_json.pgt_boss_btn_challenge_png";
		t.width = 143;
		t.x = 110;
		t.y = 510;
		return t;
	};
	_proto.power_i = function () {
		var t = new NumberMC();
		this.power = t;
		t.type = "pgtBoss_json.pgt_boss_score_";
		t.x = 185;
		t.y = 128;
		return t;
	};
	return PgtBossPanelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/createrole/CreateHeroSkin.exml'] = window.CreateHeroSkin = (function (_super) {
	__extends(CreateHeroSkin, _super);
	function CreateHeroSkin() {
		_super.call(this);
		this.skinParts = ["createBtn","itemData3","itemData0","itemData1","tabBtn","roleMdl","closeBtn"];
		
		this.elementsContent = [this._Image1_i(),this.createBtn_i(),this._Image2_i(),this.tabBtn_i(),this.roleMdl_i(),this.closeBtn_i()];
	}
	var _proto = CreateHeroSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "res/images/bg/createRoleBg.jpg";
		t.verticalCenter = 0;
		return t;
	};
	_proto.createBtn_i = function () {
		var t = new eui.Image();
		this.createBtn = t;
		t.bottom = 8;
		t.horizontalCenter = 0.5;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "createRole_json.createrole_btn_png";
		t.x = 164;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "res/images/bg/createHerotitle.png";
		t.top = 0;
		t.x = 92;
		t.y = 0;
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.bottom = 116;
		t.horizontalCenter = 0.5;
		t.itemRendererSkinName = TabBar1Skin;
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 38;
		t.layout = this._HorizontalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this.itemData3_i(),this.itemData0_i(),this.itemData1_i()];
		return t;
	};
	_proto.itemData3_i = function () {
		var t = {};
		this.itemData3 = t;
		t.icon = "createRole_json.createrole_role0_b_png";
		t.icon2 = "createRole_json.createrole_role0_a_png";
		return t;
	};
	_proto.itemData0_i = function () {
		var t = {};
		this.itemData0 = t;
		t.icon = "createRole_json.createrole_role1_b_png";
		t.icon2 = "createRole_json.createrole_role1_a_png";
		return t;
	};
	_proto.itemData1_i = function () {
		var t = {};
		this.itemData1 = t;
		t.icon = "createRole_json.createrole_role2_b_png";
		t.icon2 = "createRole_json.createrole_role2_a_png";
		return t;
	};
	_proto.roleMdl_i = function () {
		var t = new eui.Component();
		this.roleMdl = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.verticalCenter = 128;
		t.x = 291;
		t.y = 492;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.horizontalCenter = 238;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "win_json.win_close_btn2_png";
		t.y = 21;
		return t;
	};
	return CreateHeroSkin;
})(eui.Skin);generateEUI.paths['resource/exml/TextInput/TextInput1Skin.exml'] = window.TextInput1Skin = (function (_super) {
	__extends(TextInput1Skin, _super);
	function TextInput1Skin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInput1Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.visible = false;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.horizontalCenter = "0";
		t.size = 20;
		t.textColor = 0xfff1e6;
		t.verticalCenter = "0";
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "";
		t.textColor = 0xfff1e6;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	return TextInput1Skin;
})(eui.Skin);generateEUI.paths['resource/exml/createrole/CreateRoleSkin.exml'] = window.CreateRoleSkin = (function (_super) {
	__extends(CreateRoleSkin, _super);
	function CreateRoleSkin() {
		_super.call(this);
		this.skinParts = ["itemData0","itemData1","itemData2","tabBtn","roleMdl","imgCreateRole","imgRedom","lbRoleName","errorTips"];
		
		this.elementsContent = [this._Image1_i(),this.tabBtn_i(),this.roleMdl_i(),this._Group2_i(),this._Image3_i(),this.errorTips_i()];
	}
	var _proto = CreateRoleSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "res/images/bg/createRoleBg.jpg";
		t.verticalCenter = 0;
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = TabBar1Skin;
		t.verticalCenter = 257.5;
		t.layout = this._HorizontalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this.itemData0_i(),this.itemData1_i(),this.itemData2_i()];
		return t;
	};
	_proto.itemData0_i = function () {
		var t = {};
		this.itemData0 = t;
		t.icon = "createRole_json.createrole_role0_b_png";
		t.icon2 = "createRole_json.createrole_role0_a_png";
		return t;
	};
	_proto.itemData1_i = function () {
		var t = {};
		this.itemData1 = t;
		t.icon = "createRole_json.createrole_role1_b_png";
		t.icon2 = "createRole_json.createrole_role1_a_png";
		return t;
	};
	_proto.itemData2_i = function () {
		var t = {};
		this.itemData2 = t;
		t.icon = "createRole_json.createrole_role2_b_png";
		t.icon2 = "createRole_json.createrole_role2_a_png";
		return t;
	};
	_proto.roleMdl_i = function () {
		var t = new eui.Component();
		this.roleMdl = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 116.5;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 428;
		t.elementsContent = [this.imgCreateRole_i(),this._Group1_i()];
		return t;
	};
	_proto.imgCreateRole_i = function () {
		var t = new eui.Image();
		this.imgCreateRole = t;
		t.source = "createRole_json.createrole_btn_png";
		t.x = 24;
		t.y = 78.04;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image2_i(),this.imgRedom_i(),this.lbRoleName_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "createRole_json.createrole_rect_3_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.imgRedom_i = function () {
		var t = new eui.Image();
		this.imgRedom = t;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "createRole_json.createrole_redom_png";
		t.y = 0;
		return t;
	};
	_proto.lbRoleName_i = function () {
		var t = new eui.TextInput();
		this.lbRoleName = t;
		t.enabled = true;
		t.height = 31;
		t.horizontalCenter = 0;
		t.skinName = "TextInput1Skin";
		t.verticalCenter = 0;
		t.width = 148;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "res/images/bg/createRoletitle.png";
		t.top = 0;
		return t;
	};
	_proto.errorTips_i = function () {
		var t = new eui.Label();
		this.errorTips = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 24;
		t.text = "";
		t.textColor = 0xff0000;
		t.verticalCenter = 140;
		return t;
	};
	return CreateRoleSkin;
})(eui.Skin);generateEUI.paths['resource/exml/daily/DailyShowTipWinSkin.exml'] = window.DailyShowTipWinSkin = (function (_super) {
	__extends(DailyShowTipWinSkin, _super);
	function DailyShowTipWinSkin() {
		_super.call(this);
		this.skinParts = ["bg","slidePage","num","imgWdc"];
		
		this.elementsContent = [this.bg_i(),this._Group1_i(),this._Group2_i(),this.imgWdc_i()];
	}
	var _proto = DailyShowTipWinSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		t.x = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 14;
		t.height = 270;
		t.horizontalCenter = 0.5;
		t.top = 66;
		t.width = 420;
		t.elementsContent = [this._Image1_i(),this.slidePage_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 128;
		t.horizontalCenter = 0.5;
		t.scale9Grid = new egret.Rectangle(19,12,121,74);
		t.source = "public_json.public_rect_1_png";
		t.width = 377;
		t.y = 52;
		return t;
	};
	_proto.slidePage_i = function () {
		var t = new BaseCustComponent();
		this.slidePage = t;
		t.className = "SlidePage";
		t.height = 179;
		t.horizontalCenter = 0.5;
		t.skinName = "SlidePageSkin";
		t.width = 377;
		t.y = 69;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.width = 237;
		t.y = 83;
		t.elementsContent = [this._Image2_i(),this.num_i(),this._Image3_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.right = 0;
		t.source = "daily_json.daily_lb1_png";
		t.y = 1;
		return t;
	};
	_proto.num_i = function () {
		var t = new NumberMC();
		this.num = t;
		t.horizontalCenter = 0;
		t.top = 3;
		t.type = "daily_json.daily_b_";
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.source = "daily_json.daily_lb2_png";
		t.y = 1;
		return t;
	};
	_proto.imgWdc_i = function () {
		var t = new eui.Image();
		this.imgWdc = t;
		t.horizontalCenter = 0.5;
		t.source = "daily_json.daily_wdc_png";
		t.y = 258;
		return t;
	};
	return DailyShowTipWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/daily/DailyTaskItemSkin.exml'] = window.DailyTaskItemSkin = (function (_super) {
	__extends(DailyTaskItemSkin, _super);
	function DailyTaskItemSkin() {
		_super.call(this);
		this.skinParts = ["imgSt","imgBtn","btnGet","lbCnd","lbPgr","lbPt"];
		
		this.width = 495;
		this.elementsContent = [this._Image1_i(),this.imgSt_i(),this.imgBtn_i(),this.btnGet_i(),this._Group1_i(),this.lbPt_i()];
	}
	var _proto = DailyTaskItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "daily_json.daily_item_bg_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto.imgSt_i = function () {
		var t = new eui.Image();
		this.imgSt = t;
		t.left = 25;
		t.source = "daily_json.daily_active_0_png";
		t.verticalCenter = -2;
		return t;
	};
	_proto.imgBtn_i = function () {
		var t = new eui.Image();
		this.imgBtn = t;
		t.horizontalCenter = 189;
		t.source = "daily_json.daily_ylq_v_png";
		t.verticalCenter = 0.5;
		return t;
	};
	_proto.btnGet_i = function () {
		var t = new eui.Button();
		this.btnGet = t;
		t.icon = "res/btn/get_2.png";
		t.label = "";
		t.x = 368;
		t.y = 22;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 115;
		t.y = 21.67;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.lbCnd_i(),this.lbPgr_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 10;
		return t;
	};
	_proto.lbCnd_i = function () {
		var t = new eui.Label();
		this.lbCnd = t;
		t.size = 18;
		t.text = "任务名称";
		t.textColor = 0xffc600;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbPgr_i = function () {
		var t = new eui.Label();
		this.lbPgr = t;
		t.size = 18;
		t.text = "完成进度";
		t.x = 127.35;
		t.y = 0;
		return t;
	};
	_proto.lbPt_i = function () {
		var t = new eui.Label();
		this.lbPt = t;
		t.size = 18;
		t.text = "活跃度+";
		t.textColor = 0xffffff;
		t.x = 115;
		t.y = 57.67;
		return t;
	};
	return DailyTaskItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/progressBar/progressBarSkin6.exml'] = window.progressBarSkin6 = (function (_super) {
	__extends(progressBarSkin6, _super);
	function progressBarSkin6() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = progressBarSkin6.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "daily_json.daily_par_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.anchorOffsetX = 0;
		t.left = 2;
		t.scale9Grid = new egret.Rectangle(9,2,25,13);
		t.source = "daily_json.daily_par_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.style = "l_normal";
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0.5;
		t.size = 12;
		t.stroke = 0.5;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.verticalCenter = -1;
		t.visible = false;
		return t;
	};
	return progressBarSkin6;
})(eui.Skin);generateEUI.paths['resource/exml/daily/DailyTaskPannelSkin.exml'] = window.DailyTaskPannelSkin = (function (_super) {
	__extends(DailyTaskPannelSkin, _super);
	function DailyTaskPannelSkin() {
		_super.call(this);
		this.skinParts = ["list","imgStrea0","imgStrea1","imgStrea2","imgStrea3","imgGot0","imgGot1","imgGot2","imgGot3","progressBar","actNum0","actNum1","actNum2","actNum3","hudNum"];
		
		this.height = 680;
		this.width = 530;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Scroller1_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this._Image8_i(),this.imgStrea0_i(),this.imgStrea1_i(),this.imgStrea2_i(),this.imgStrea3_i(),this.imgGot0_i(),this.imgGot1_i(),this.imgGot2_i(),this.imgGot3_i(),this.progressBar_i(),this.actNum0_i(),this.actNum1_i(),this.actNum2_i(),this.actNum3_i(),this.hudNum_i()];
	}
	var _proto = DailyTaskPannelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 675;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(25,141,60,55);
		t.source = "win_json.win_bg4_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 655;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(10,11,22,21);
		t.source = "win_json.win_bg_line_png";
		t.top = 8;
		t.width = 510;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.height = 505;
		t.horizontalCenter = 0;
		t.width = 500;
		t.y = 152;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.itemRendererSkinName = DailyTaskItemSkin;
		t.x = 48;
		t.y = 60;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 3;
		t.paddingLeft = 4;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "daily_json.daily_banner_png";
		t.top = 10;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "daily_json.daily_ck_bg_png";
		t.x = 196;
		t.y = 116;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "daily_json.daily_ck_bg_png";
		t.x = 280;
		t.y = 116;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "daily_json.daily_ck_bg_png";
		t.x = 364;
		t.y = 116;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "daily_json.daily_ck_bg_png";
		t.x = 448;
		t.y = 116;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 241.5;
		t.scale9Grid = new egret.Rectangle(2,1,19,0);
		t.source = "daily_json.daily_img_gift_png";
		t.touchEnabled = false;
		t.x = 10;
		t.y = 593.33;
		return t;
	};
	_proto.imgStrea0_i = function () {
		var t = new eui.Button();
		this.imgStrea0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 83;
		t.icon = "daily_json.daily_tr_02_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.width = 89;
		t.x = 170;
		t.y = 5;
		return t;
	};
	_proto.imgStrea1_i = function () {
		var t = new eui.Button();
		this.imgStrea1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 83;
		t.icon = "daily_json.daily_tr_12_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.width = 89;
		t.x = 254;
		t.y = 5;
		return t;
	};
	_proto.imgStrea2_i = function () {
		var t = new eui.Button();
		this.imgStrea2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 83;
		t.icon = "daily_json.daily_tr_22_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.width = 89;
		t.x = 338;
		t.y = 5;
		return t;
	};
	_proto.imgStrea3_i = function () {
		var t = new eui.Button();
		this.imgStrea3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 83;
		t.icon = "daily_json.daily_tr_32_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.width = 89;
		t.x = 422;
		t.y = 5;
		return t;
	};
	_proto.imgGot0_i = function () {
		var t = new eui.Image();
		this.imgGot0 = t;
		t.scale9Grid = new egret.Rectangle(2,1,19,0);
		t.source = "public_json.luck_img2_png";
		t.touchEnabled = false;
		t.x = 180;
		t.y = 47;
		return t;
	};
	_proto.imgGot1_i = function () {
		var t = new eui.Image();
		this.imgGot1 = t;
		t.scale9Grid = new egret.Rectangle(2,1,19,0);
		t.source = "public_json.luck_img2_png";
		t.touchEnabled = false;
		t.x = 264;
		t.y = 47;
		return t;
	};
	_proto.imgGot2_i = function () {
		var t = new eui.Image();
		this.imgGot2 = t;
		t.scale9Grid = new egret.Rectangle(2,1,19,0);
		t.source = "public_json.luck_img2_png";
		t.touchEnabled = false;
		t.x = 348;
		t.y = 47;
		return t;
	};
	_proto.imgGot3_i = function () {
		var t = new eui.Image();
		this.imgGot3 = t;
		t.scale9Grid = new egret.Rectangle(2,1,19,0);
		t.source = "public_json.luck_img2_png";
		t.touchEnabled = false;
		t.x = 432;
		t.y = 47;
		return t;
	};
	_proto.progressBar_i = function () {
		var t = new eui.ProgressBar();
		this.progressBar = t;
		t.skinName = "progressBarSkin6";
		t.slideDuration = 0;
		t.value = 100;
		t.x = 170;
		t.y = 80;
		return t;
	};
	_proto.actNum0_i = function () {
		var t = new eui.Label();
		this.actNum0 = t;
		t.anchorOffsetX = 0;
		t.height = 16;
		t.size = 16;
		t.text = "0";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 37;
		t.x = 196;
		t.y = 116;
		return t;
	};
	_proto.actNum1_i = function () {
		var t = new eui.Label();
		this.actNum1 = t;
		t.anchorOffsetX = 0;
		t.height = 16;
		t.size = 16;
		t.text = "0";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 37;
		t.x = 280;
		t.y = 116;
		return t;
	};
	_proto.actNum2_i = function () {
		var t = new eui.Label();
		this.actNum2 = t;
		t.anchorOffsetX = 0;
		t.height = 16;
		t.size = 16;
		t.text = "0";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 37;
		t.x = 364;
		t.y = 116;
		return t;
	};
	_proto.actNum3_i = function () {
		var t = new eui.Label();
		this.actNum3 = t;
		t.anchorOffsetX = 0;
		t.height = 16;
		t.size = 16;
		t.text = "0";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 37;
		t.x = 448;
		t.y = 116;
		return t;
	};
	_proto.hudNum_i = function () {
		var t = new NumberMC();
		this.hudNum = t;
		t.type = "daily_json.daily_g_";
		t.x = 123;
		t.y = 118;
		return t;
	};
	return DailyTaskPannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/debug/ConfEdItemSkin.exml'] = window.ConfEdItemSkin = (function (_super) {
	__extends(ConfEdItemSkin, _super);
	function ConfEdItemSkin() {
		_super.call(this);
		this.skinParts = ["tInput","prop"];
		
		this.height = 30;
		this.width = 280;
		this.elementsContent = [this._Rect1_i(),this.tInput_i(),this.prop_i()];
	}
	var _proto = ConfEdItemSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.fillColor = 0x19192d;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.tInput_i = function () {
		var t = new eui.TextInput();
		this.tInput = t;
		t.anchorOffsetX = 0;
		t.bottom = 0;
		t.right = 0;
		t.top = 0;
		t.width = 110;
		return t;
	};
	_proto.prop_i = function () {
		var t = new eui.Label();
		this.prop = t;
		t.left = 0;
		t.size = 25;
		t.text = "Label";
		t.verticalCenter = 0;
		return t;
	};
	return ConfEdItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/debug/ConfigEditSkin.exml'] = window.ConfigEditSkin = (function (_super) {
	__extends(ConfigEditSkin, _super);
	function ConfigEditSkin() {
		_super.call(this);
		this.skinParts = ["skid","effId","itemList","rBtn","sBtn","closeBtn","tabBtn","dBtn","gBtn","cmBtn","idInput","typeTab"];
		
		this.height = 547;
		this.width = 455;
		this.elementsContent = [this._Image1_i(),this._Group1_i()];
	}
	var _proto = ConfigEditSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(97,92,11,7);
		t.source = "public_json.public_blank2_png";
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Label1_i(),this.skid_i(),this._Label2_i(),this.effId_i(),this._Scroller1_i(),this.rBtn_i(),this.sBtn_i(),this.closeBtn_i(),this.tabBtn_i(),this.dBtn_i(),this.gBtn_i(),this.cmBtn_i(),this.idInput_i(),this.typeTab_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.left = 41;
		t.size = 20;
		t.text = "当前技能ID：";
		t.top = 79;
		return t;
	};
	_proto.skid_i = function () {
		var t = new eui.Label();
		this.skid = t;
		t.left = 155;
		t.size = 20;
		t.text = "";
		t.top = 81;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.left = 41;
		t.size = 20;
		t.text = "当前特效ID：";
		t.top = 102;
		return t;
	};
	_proto.effId_i = function () {
		var t = new eui.Label();
		this.effId = t;
		t.left = 155;
		t.size = 20;
		t.text = "";
		t.top = 102;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 47;
		t.left = 41;
		t.top = 168;
		t.width = 281.22;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 355.34;
		t.itemRendererSkinName = ConfEdItemSkin;
		t.width = 282.22;
		t.x = 0;
		t.y = -24;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto.rBtn_i = function () {
		var t = new eui.Button();
		this.rBtn = t;
		t.bottom = 47;
		t.label = "reset";
		t.right = 25;
		t.skinName = "Btn1Skin";
		return t;
	};
	_proto.sBtn_i = function () {
		var t = new eui.Button();
		this.sBtn = t;
		t.anchorOffsetX = 0;
		t.height = 34;
		t.label = "搜索";
		t.left = 189;
		t.skinName = "Btn1Skin";
		t.top = 45;
		t.width = 69;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Button();
		this.closeBtn = t;
		t.height = 50;
		t.label = "exit";
		t.right = 0;
		t.skinName = "Btn1Skin";
		t.top = 0;
		t.width = 50;
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.itemRendererSkinName = DeBugTabBtnSkin;
		t.top = 142;
		t.x = 41;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.dBtn_i = function () {
		var t = new eui.Button();
		this.dBtn = t;
		t.bottom = 118;
		t.label = "全部执行";
		t.right = 25;
		t.skinName = "Btn1Skin";
		return t;
	};
	_proto.gBtn_i = function () {
		var t = new eui.Button();
		this.gBtn = t;
		t.bottom = 183;
		t.label = "执行";
		t.right = 25;
		t.skinName = "Btn1Skin";
		return t;
	};
	_proto.cmBtn_i = function () {
		var t = new eui.Button();
		this.cmBtn = t;
		t.bottom = 249;
		t.label = "确认修改";
		t.right = 25;
		t.skinName = "Btn1Skin";
		return t;
	};
	_proto.idInput_i = function () {
		var t = new eui.TextInput();
		this.idInput = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 34;
		t.left = 41;
		t.prompt = "搜索技能ID";
		t.top = 45;
		t.width = 147;
		return t;
	};
	_proto.typeTab_i = function () {
		var t = new eui.TabBar();
		this.typeTab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.itemRendererSkinName = DeBugTabBtn2Skin;
		t.x = 338;
		t.y = 112;
		t.layout = this._VerticalLayout2_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 17;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	return ConfigEditSkin;
})(eui.Skin);generateEUI.paths['resource/exml/debug/DebugItemSkin.exml'] = window.DebugItemSkin = (function (_super) {
	__extends(DebugItemSkin, _super);
	function DebugItemSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 25;
		this.width = 320;
		this.elementsContent = [this._Rect1_i(),this._Label1_i(),this._Label2_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.text"],[0],this._Label1,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.des"],[0],this._Label2,"text");
	}
	var _proto = DebugItemSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.fillColor = 0x252047;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.left = 0;
		t.size = 20;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.right = 7;
		t.size = 20;
		t.verticalCenter = 0;
		return t;
	};
	return DebugItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/debug/DebugWinSkin.exml'] = window.DebugWinSkin = (function (_super) {
	__extends(DebugWinSkin, _super);
	function DebugWinSkin() {
		_super.call(this);
		this.skinParts = ["inText","itemList","gridXY","pixXY","closeBtn","sBtn","lText","g"];
		
		this.currentState = "nor";
		this.height = 429;
		this.width = 562;
		this.elementsContent = [this._Image1_i(),this.inText_i(),this._Scroller1_i(),this._Group2_i(),this.closeBtn_i(),this.sBtn_i(),this.g_i()];
		this.states = [
			new eui.State ("nor",
				[
					new eui.SetProperty("lText","visible",false),
					new eui.SetProperty("g","visible",false)
				])
			,
			new eui.State ("note",
				[
					new eui.SetProperty("_Scroller1","visible",false),
					new eui.SetProperty("_Group2","visible",false),
					new eui.SetProperty("lText","anchorOffsetX",0),
					new eui.SetProperty("lText","width",394),
					new eui.SetProperty("lText","anchorOffsetY",0),
					new eui.SetProperty("lText","height",328),
					new eui.SetProperty("lText","x",0),
					new eui.SetProperty("lText","y",-1),
					new eui.SetProperty("lText","scaleX",1),
					new eui.SetProperty("lText","scaleY",1),
					new eui.SetProperty("g","height",236),
					new eui.SetProperty("g","x",19),
					new eui.SetProperty("g","y",124)
				])
		];
	}
	var _proto = DebugWinSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 2;
		t.right = -2;
		t.scale9Grid = new egret.Rectangle(42,42,81,59);
		t.source = "win_json.win_tips_bg2_png";
		t.top = 0;
		return t;
	};
	_proto.inText_i = function () {
		var t = new eui.TextInput();
		this.inText = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 11;
		t.height = 42;
		t.left = 24;
		t.prompt = "输入文本";
		t.width = 386;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		this._Scroller1 = t;
		t.anchorOffsetY = 0;
		t.bottom = 63;
		t.left = 18;
		t.top = 39;
		t.width = 320;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = DebugItemSkin;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.des = "abc";
		t.text = "123";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.des = "def";
		t.text = "456";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.des = "ghi";
		t.text = "789";
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		this._Group2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 326;
		t.width = 193;
		t.x = 344;
		t.y = 40;
		t.layout = this._VerticalLayout3_i();
		t.elementsContent = [this._Label1_i(),this._Group1_i()];
		return t;
	};
	_proto._VerticalLayout3_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 20;
		t.text = "当前人物";
		t.textColor = 0xffffff;
		t.x = 51;
		t.y = 64;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 53;
		t.y = 68;
		t.layout = this._VerticalLayout2_i();
		t.elementsContent = [this.gridXY_i(),this.pixXY_i()];
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		t.paddingLeft = 0;
		return t;
	};
	_proto.gridXY_i = function () {
		var t = new eui.Label();
		this.gridXY = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 20;
		t.text = "格子坐标：";
		t.textColor = 0xffffff;
		t.x = 0;
		t.y = 206;
		return t;
	};
	_proto.pixXY_i = function () {
		var t = new eui.Label();
		this.pixXY = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 20;
		t.text = "像素坐标：";
		t.textColor = 0xffffff;
		t.x = 0;
		t.y = 242;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.right = 0;
		t.rotation = 45;
		t.scaleX = 1.2;
		t.scaleY = 1.2;
		t.source = "zjm_json.zjm_add_png";
		t.top = 0;
		return t;
	};
	_proto.sBtn_i = function () {
		var t = new eui.Button();
		this.sBtn = t;
		t.icon = "res/btn/confirm.png";
		t.label = "Button";
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.skinName = "BtnIconSkin";
		t.x = 425;
		t.y = 373;
		return t;
	};
	_proto.g_i = function () {
		var t = new eui.Group();
		this.g = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 322;
		t.width = 483;
		t.x = 19;
		t.y = 38;
		t.elementsContent = [this.lText_i()];
		return t;
	};
	_proto.lText_i = function () {
		var t = new eui.Label();
		this.lText = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.text = "Label";
		t.top = 0;
		return t;
	};
	return DebugWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/debug/DragonActionItemSkin.exml'] = window.DragonActionItemSkin = (function (_super) {
	__extends(DragonActionItemSkin, _super);
	function DragonActionItemSkin() {
		_super.call(this);
		this.skinParts = ["actionName","inText","play"];
		
		this.elementsContent = [this._Image1_i(),this.actionName_i(),this._Image2_i(),this.inText_i(),this.play_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.actionName"],[0],this.actionName,"text");
		eui.Binding.$bindProperties(this, ["hostComponent.data.count"],[0],this.inText,"text");
	}
	var _proto = DragonActionItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 44;
		t.scale9Grid = new egret.Rectangle(9,10,61,61);
		t.source = "public_json.public_item_color_4_png";
		t.width = 176;
		return t;
	};
	_proto.actionName_i = function () {
		var t = new eui.Label();
		this.actionName = t;
		t.size = 20;
		t.verticalCenter = 0;
		t.x = 17;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 24;
		t.scale9Grid = new egret.Rectangle(4,6,29,7);
		t.source = "public_json.public_lv_rect_png";
		t.verticalCenter = 0;
		t.visible = false;
		t.x = 69;
		return t;
	};
	_proto.inText_i = function () {
		var t = new eui.TextInput();
		this.inText = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 25;
		t.skinName = "skins.TextInputSkin";
		t.textColor = 0x00a2ff;
		t.width = 35;
		t.x = 82;
		t.y = 9;
		return t;
	};
	_proto.play_i = function () {
		var t = new eui.Image();
		this.play = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 29;
		t.source = "res/btn/exitBtn2.png";
		t.width = 26;
		t.x = 135;
		t.y = 6;
		return t;
	};
	return DragonActionItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/debug/DragonTestItemSkin.exml'] = window.DragonTestItemSkin = (function (_super) {
	__extends(DragonTestItemSkin, _super);
	function DragonTestItemSkin() {
		_super.call(this);
		this.skinParts = ["inText","partName"];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.inText_i(),this.partName_i()];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.partName"],[0],this.partName,"text");
	}
	var _proto = DragonTestItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 47;
		t.scale9Grid = new egret.Rectangle(26,15,22,68);
		t.source = "public_json.public_item_rect_1_png";
		t.width = 312;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 31;
		t.scale9Grid = new egret.Rectangle(15,5,94,23);
		t.source = "public_json.public_input_blank_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 211;
		t.x = 85;
		return t;
	};
	_proto.inText_i = function () {
		var t = new eui.TextInput();
		this.inText = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 25;
		t.skinName = "TextInput1Skin";
		t.textColor = 0x00a2ff;
		t.width = 238;
		t.x = 66;
		t.y = 12;
		return t;
	};
	_proto.partName_i = function () {
		var t = new eui.Label();
		this.partName = t;
		t.size = 24;
		t.textColor = 0xffd823;
		t.x = 15;
		t.y = 11;
		return t;
	};
	return DragonTestItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/debug/DragonTestSkin.exml'] = window.DragonTestSkin = (function (_super) {
	__extends(DragonTestSkin, _super);
	function DragonTestSkin() {
		_super.call(this);
		this.skinParts = ["partList","actionList","sBtn","closeBtn"];
		
		this.elementsContent = [this._Image1_i(),this._Label1_i(),this.partList_i(),this.actionList_i(),this.sBtn_i(),this.closeBtn_i()];
	}
	var _proto = DragonTestSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 636;
		t.scale9Grid = new egret.Rectangle(75,83,456,115);
		t.source = "win_json.win_bg3_png";
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "KaiTi_GB2312";
		t.horizontalCenter = 0;
		t.text = "套装测试";
		t.textColor = 0xf43709;
		t.y = 21;
		return t;
	};
	_proto.partList_i = function () {
		var t = new eui.List();
		this.partList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 475;
		t.itemRendererSkinName = DragonTestItemSkin;
		t.width = 319;
		t.x = 45;
		t.y = 77;
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i(),this._Object8_i(),this._Object9_i(),this._Object10_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.partName = "武器";
		t.partPro = "23";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.partName = "副武器";
		t.partPro = "31";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.partName = "衣服";
		t.partPro = "3";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.partName = "裤子";
		t.partPro = "30";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.partName = "头盔";
		t.partPro = "27";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.partName = "头发";
		t.partPro = "26";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.partName = "眼睛";
		t.partPro = "28";
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		t.partName = "眼镜";
		t.partPro = "29";
		return t;
	};
	_proto._Object9_i = function () {
		var t = {};
		t.partName = "背部";
		t.partPro = "32";
		return t;
	};
	_proto._Object10_i = function () {
		var t = {};
		t.partName = "翅膀";
		t.partPro = "25";
		return t;
	};
	_proto.actionList_i = function () {
		var t = new eui.List();
		this.actionList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 440;
		t.itemRendererSkinName = DragonActionItemSkin;
		t.width = 179;
		t.x = 370;
		t.y = 92;
		t.dataProvider = this._ArrayCollection2_i();
		return t;
	};
	_proto._ArrayCollection2_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object11_i(),this._Object12_i(),this._Object13_i(),this._Object14_i(),this._Object15_i(),this._Object16_i(),this._Object17_i(),this._Object18_i(),this._Object19_i(),this._Object20_i()];
		return t;
	};
	_proto._Object11_i = function () {
		var t = {};
		t.actionIndex = "1";
		t.actionName = "待机";
		t.count = "0";
		return t;
	};
	_proto._Object12_i = function () {
		var t = {};
		t.actionIndex = "2";
		t.actionName = "移动";
		t.count = "0";
		return t;
	};
	_proto._Object13_i = function () {
		var t = {};
		t.actionIndex = "3";
		t.actionName = "死亡";
		t.count = "1";
		return t;
	};
	_proto._Object14_i = function () {
		var t = {};
		t.actionIndex = "5";
		t.actionName = "跳跃";
		t.count = "1";
		return t;
	};
	_proto._Object15_i = function () {
		var t = {};
		t.actionIndex = "6";
		t.actionName = "受击";
		t.count = "1";
		return t;
	};
	_proto._Object16_i = function () {
		var t = {};
		t.actionIndex = "100";
		t.actionName = "普攻";
		t.count = "0";
		return t;
	};
	_proto._Object17_i = function () {
		var t = {};
		t.actionIndex = "101";
		t.actionName = "技能1";
		t.count = "0";
		return t;
	};
	_proto._Object18_i = function () {
		var t = {};
		t.actionIndex = "102";
		t.actionName = "技能2";
		t.count = "0";
		return t;
	};
	_proto._Object19_i = function () {
		var t = {};
		t.actionIndex = "103";
		t.actionName = "技能3";
		t.count = "0";
		return t;
	};
	_proto._Object20_i = function () {
		var t = {};
		t.actionIndex = "104";
		t.actionName = "技能4";
		t.count = "0";
		return t;
	};
	_proto.sBtn_i = function () {
		var t = new eui.Button();
		this.sBtn = t;
		t.icon = "res/btn/confirm.png";
		t.label = "Button";
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.skinName = "BtnIconSkin";
		t.x = 146;
		t.y = 555;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.source = "win_json.win_close_btn4_png";
		t.x = 523;
		t.y = 31;
		return t;
	};
	return DragonTestSkin;
})(eui.Skin);generateEUI.paths['resource/exml/email/EmailDetailWinSkin.exml'] = window.EmailDetailWinSkin = (function (_super) {
	__extends(EmailDetailWinSkin, _super);
	function EmailDetailWinSkin() {
		_super.call(this);
		this.skinParts = ["bg","getFlag","iG","line1","line2","getBtn","deleteBtn","titleTx","contentTx"];
		
		this.height = 496;
		this.width = 439;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this._Image2_i(),this.getFlag_i(),this._Scroller1_i(),this.line1_i(),this.line2_i(),this.getBtn_i(),this.deleteBtn_i(),this._Image3_i(),this.titleTx_i(),this._Label1_i(),this.contentTx_i()];
	}
	var _proto = EmailDetailWinSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "win_json.win_slice_line2_png";
		t.width = 417;
		t.x = 11;
		t.y = 406;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 308;
		t.scale9Grid = new egret.Rectangle(23,16,140,97);
		t.source = "public_json.public_rect_7_png";
		t.width = 397;
		t.x = 21;
		t.y = 89;
		return t;
	};
	_proto.getFlag_i = function () {
		var t = new eui.Image();
		this.getFlag = t;
		t.source = "public_json.luck_img2_png";
		t.x = 311;
		t.y = 264;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 92;
		t.width = 372;
		t.x = 35;
		t.y = 296;
		t.viewport = this.iG_i();
		return t;
	};
	_proto.iG_i = function () {
		var t = new eui.Group();
		this.iG = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 67;
		t.x = 41;
		t.y = 305;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	_proto.line1_i = function () {
		var t = new eui.Image();
		this.line1 = t;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "win_json.win_slice_line2_png";
		t.width = 387;
		t.y = 127;
		return t;
	};
	_proto.line2_i = function () {
		var t = new eui.Image();
		this.line2 = t;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "win_json.win_slice_line2_png";
		t.width = 387;
		t.y = 256;
		return t;
	};
	_proto.getBtn_i = function () {
		var t = new eui.Button();
		this.getBtn = t;
		t.icon = "res/btn/get_6.png";
		t.label = "Button";
		t.left = 50;
		t.y = 416;
		return t;
	};
	_proto.deleteBtn_i = function () {
		var t = new eui.Button();
		this.deleteBtn = t;
		t.icon = "res/btn/delete.png";
		t.label = "Button";
		t.right = 50;
		t.x = 10;
		t.y = 416;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "email_json.email_fujian_png";
		t.y = 267;
		return t;
	};
	_proto.titleTx_i = function () {
		var t = new eui.Label();
		this.titleTx = t;
		t.size = 16;
		t.text = "主题：维护补偿";
		t.textColor = 0xffc600;
		t.x = 30;
		t.y = 103;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 16;
		t.text = "内容：";
		t.textColor = 0xFFC600;
		t.x = 30;
		t.y = 139;
		return t;
	};
	_proto.contentTx_i = function () {
		var t = new eui.Label();
		this.contentTx = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 84;
		t.horizontalCenter = 1.5;
		t.lineSpacing = 12;
		t.size = 16;
		t.text = "水电电饭锅电饭锅的费水电费水电费多所水电费水电饭锅电饭锅电饭锅电饭锅电饭锅电饭锅电费水电费是地方第三方胜多负少的肤色丰富的付付付付付付付";
		t.textColor = 0xffffff;
		t.width = 370;
		t.y = 160;
		return t;
	};
	return EmailDetailWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/email/EmailItemSkin.exml'] = window.EmailItemSkin = (function (_super) {
	__extends(EmailItemSkin, _super);
	function EmailItemSkin() {
		_super.call(this);
		this.skinParts = ["stateImg","fujianFlag","getFlag","titleTx","timeTx"];
		
		this.elementsContent = [this._Image1_i(),this.stateImg_i(),this.fujianFlag_i(),this.getFlag_i(),this.titleTx_i(),this.timeTx_i()];
	}
	var _proto = EmailItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "email_json.email_item_bg_png";
		t.y = 1;
		return t;
	};
	_proto.stateImg_i = function () {
		var t = new eui.Image();
		this.stateImg = t;
		t.source = "email_json.email_close_png";
		t.verticalCenter = 0.5;
		t.x = 18;
		return t;
	};
	_proto.fujianFlag_i = function () {
		var t = new eui.Image();
		this.fujianFlag = t;
		t.source = "email_json.email_prize_png";
		t.x = 395;
		t.y = 26;
		return t;
	};
	_proto.getFlag_i = function () {
		var t = new eui.Image();
		this.getFlag = t;
		t.source = "public_json.public_prize_png";
		t.x = 372;
		t.y = 19;
		return t;
	};
	_proto.titleTx_i = function () {
		var t = new eui.Label();
		this.titleTx = t;
		t.size = 18;
		t.text = "维护补偿";
		t.textColor = 0x792301;
		t.x = 118;
		t.y = 31;
		return t;
	};
	_proto.timeTx_i = function () {
		var t = new eui.Label();
		this.timeTx = t;
		t.size = 18;
		t.text = "2019-9-18 11:17:11";
		t.textColor = 0x792301;
		t.x = 118;
		t.y = 64;
		return t;
	};
	return EmailItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/email/EmailPanelSkin.exml'] = window.EmailWinSkin = (function (_super) {
	__extends(EmailWinSkin, _super);
	function EmailWinSkin() {
		_super.call(this);
		this.skinParts = ["countTx","list","deleteBtn","getBtn"];
		
		this.height = 680;
		this.width = 530;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this.countTx_i(),this._Scroller1_i(),this.deleteBtn_i(),this.getBtn_i()];
	}
	var _proto = EmailWinSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = -1;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(25,141,60,55);
		t.source = "win_json.win_bg4_png";
		t.top = 1;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 650;
		t.scale9Grid = new egret.Rectangle(8,13,26,16);
		t.source = "win_json.win_bg_line_png";
		t.width = 508;
		t.x = 10;
		t.y = 14;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "win_json.win_slice_line2_png";
		t.width = 504;
		t.x = 12;
		t.y = 50;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "win_json.win_slice_line2_png";
		t.width = 504;
		t.x = 12;
		t.y = 582;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "email_json.email_text_png";
		t.x = 27;
		t.y = 24;
		return t;
	};
	_proto.countTx_i = function () {
		var t = new eui.Label();
		this.countTx = t;
		t.right = 21;
		t.size = 18;
		t.text = "10/100";
		t.textColor = 0x792301;
		t.y = 24;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 518;
		t.width = 494;
		t.x = 18;
		t.y = 57;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.itemRendererSkinName = EmailItemSkin;
		t.x = 17;
		t.y = 55;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 4;
		return t;
	};
	_proto.deleteBtn_i = function () {
		var t = new eui.Button();
		this.deleteBtn = t;
		t.icon = "res/btn/deleteRead.png";
		t.label = "Button";
		t.left = 60;
		t.y = 595;
		return t;
	};
	_proto.getBtn_i = function () {
		var t = new eui.Button();
		this.getBtn = t;
		t.icon = "res/btn/onekeyget.png";
		t.label = "Button";
		t.right = 60;
		t.y = 595;
		return t;
	};
	return EmailWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/empty.exml'] = window.empty = (function (_super) {
	__extends(empty, _super);
	function empty() {
		_super.call(this);
		this.skinParts = [];
		
	}
	var _proto = empty.prototype;

	return empty;
})(eui.Skin);generateEUI.paths['resource/exml/failTips/FailItemSkin.exml'] = window.FailItemSkin = (function (_super) {
	__extends(FailItemSkin, _super);
	function FailItemSkin() {
		_super.call(this);
		this.skinParts = ["desc","btn","icon","iName"];
		
		this.height = 69;
		this.elementsContent = [this._Image1_i(),this.desc_i(),this.btn_i(),this.icon_i(),this.iName_i()];
	}
	var _proto = FailItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 1;
		t.height = 2;
		t.horizontalCenter = -1;
		t.scale9Grid = new egret.Rectangle(0,0,15,3);
		t.source = "win_json.win_item_line_png";
		t.width = 345;
		return t;
	};
	_proto.desc_i = function () {
		var t = new eui.Label();
		this.desc = t;
		t.size = 18;
		t.text = "desc";
		t.textColor = 0x3e1700;
		t.verticalCenter = 0;
		t.x = 94;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.icon = "res/btn/enterBtn5.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 283;
		t.y = 18;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.bottom = -11;
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.source = "res/images/sysIcon/icon/boss.png";
		t.x = 11;
		return t;
	};
	_proto.iName_i = function () {
		var t = new eui.Image();
		this.iName = t;
		t.bottom = -1;
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.source = "res/images/sysIcon/name/arena_n.png";
		t.x = 1;
		return t;
	};
	return FailItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/failTips/FailTipsSkin.exml'] = window.FailTipsSkin = (function (_super) {
	__extends(FailTipsSkin, _super);
	function FailTipsSkin() {
		_super.call(this);
		this.skinParts = ["btn","enterBtn","countDown","itemList","img"];
		
		this.height = 741;
		this.width = 488;
		this.elementsContent = [this._Image1_i(),this.btn_i(),this.enterBtn_i(),this.countDown_i(),this._Scroller1_i(),this.img_i(),this._Image2_i()];
	}
	var _proto = FailTipsSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "res/images/bg/failBg.png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.icon = "res/btn/confirm.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 173;
		t.y = 560;
		return t;
	};
	_proto.enterBtn_i = function () {
		var t = new eui.Button();
		this.enterBtn = t;
		t.icon = "res/btn/enterBtn5.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 349;
		t.y = 510;
		return t;
	};
	_proto.countDown_i = function () {
		var t = new eui.Label();
		this.countDown = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "5s后自动关闭";
		t.textColor = 0x00FF00;
		t.visible = false;
		t.y = 659;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.horizontalCenter = 0;
		t.y = 270;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = FailItemSkin;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 11;
		return t;
	};
	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.source = "fail_json.fail_texture_0_png";
		t.x = 79;
		t.y = 503;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -5;
		t.source = "fail_json.fail_texture_1_png";
		t.y = 250;
		return t;
	};
	return FailTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/family/DropDownList.exml'] = window.DropDownList = (function (_super) {
	__extends(DropDownList, _super);
	function DropDownList() {
		_super.call(this);
		this.skinParts = ["dropList"];
		
		this.elementsContent = [this._Image1_i(),this._Scroller1_i()];
	}
	var _proto = DropDownList.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(39,13,239,8);
		t.source = "family_json.family_dropdown_option_ban_png";
		t.top = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.scrollPolicyH = "off";
		t.top = 5;
		t.viewport = this.dropList_i();
		return t;
	};
	_proto.dropList_i = function () {
		var t = new eui.List();
		this.dropList = t;
		t.itemRendererSkinName = DropDownListItem;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	return DropDownList;
})(eui.Skin);generateEUI.paths['resource/exml/family/DropDownListItem.exml'] = window.DropDownListItem = (function (_super) {
	__extends(DropDownListItem, _super);
	function DropDownListItem() {
		_super.call(this);
		this.skinParts = ["labLimit"];
		
		this.elementsContent = [this._Image1_i(),this.labLimit_i()];
	}
	var _proto = DropDownListItem.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(9,6,60,11);
		t.source = "family_json.family_dropdown_option_rect_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.labLimit_i = function () {
		var t = new eui.Label();
		this.labLimit = t;
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xcc9377;
		t.verticalAlign = "middle";
		t.y = 10;
		return t;
	};
	return DropDownListItem;
})(eui.Skin);generateEUI.paths['resource/exml/family/FamilyApplyConfigPanelSkin.exml'] = window.FamilyApplyConfigPanelSkin = (function (_super) {
	__extends(FamilyApplyConfigPanelSkin, _super);
	var FamilyApplyConfigPanelSkin$Skin1 = 	(function (_super) {
		__extends(FamilyApplyConfigPanelSkin$Skin1, _super);
		function FamilyApplyConfigPanelSkin$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
						new eui.SetProperty("_Image1","source","public_json.public_checkBox_sele_png")
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = FamilyApplyConfigPanelSkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			this._Image1 = t;
			t.percentHeight = 100;
			t.source = "public_json.public_checkBox_blank_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return FamilyApplyConfigPanelSkin$Skin1;
	})(eui.Skin);

	function FamilyApplyConfigPanelSkin() {
		_super.call(this);
		this.skinParts = ["bg","btnSure","closeBtn","chkAuto","labCheck","imgDrop","labSelected","dropList"];
		
		this.currentState = "up";
		this.height = 316;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this.btnSure_i(),this.closeBtn_i(),this._Group1_i(),this._Image3_i(),this.imgDrop_i(),this._Image4_i(),this.labSelected_i()];
		this._Image5_i();
		
		this._Scroller1_i();
		
		this._Group2_i();
		
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.AddItems("_Image5","_Group2",0,""),
					new eui.AddItems("_Scroller1","_Group2",1,""),
					new eui.AddItems("_Group2","",1,"")
				])
		];
	}
	var _proto = FamilyApplyConfigPanelSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 95;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.scaleY = 1.13;
		t.source = "win_json.win_slice_line2_png";
		t.width = 416;
		return t;
	};
	_proto.btnSure_i = function () {
		var t = new eui.Button();
		this.btnSure = t;
		t.icon = "res/btn/confirm.png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 236;
		t.y = 234;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Button();
		this.closeBtn = t;
		t.icon = "res/btn/cancel.png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 60;
		t.y = 234;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 160;
		t.elementsContent = [this._Image2_i(),this.chkAuto_i(),this.labCheck_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_checkBox_blank_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.chkAuto_i = function () {
		var t = new eui.CheckBox();
		this.chkAuto = t;
		t.label = "";
		t.x = 0;
		t.y = 0;
		t.skinName = FamilyApplyConfigPanelSkin$Skin1;
		return t;
	};
	_proto.labCheck_i = function () {
		var t = new eui.Label();
		this.labCheck = t;
		t.size = 16;
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0x792301;
		t.x = 28;
		t.y = 2;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "family_json.family_setting_label_png";
		t.top = 195;
		return t;
	};
	_proto.imgDrop_i = function () {
		var t = new eui.Image();
		this.imgDrop = t;
		t.horizontalCenter = 0;
		t.source = "family_json.family_dropdown_option_ban_png";
		t.top = 105;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "family_json.family_dropdown_arrow_png";
		t.top = 115;
		t.touchEnabled = false;
		t.x = 352;
		return t;
	};
	_proto.labSelected_i = function () {
		var t = new eui.Label();
		this.labSelected = t;
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "Label";
		t.textAlign = "center";
		t.touchEnabled = false;
		t.y = 115;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		this._Group2 = t;
		t.top = 145;
		t.x = 61;
		t.elementsContent = [];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		this._Image5 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(39,13,239,8);
		t.source = "family_json.family_dropdown_option_ban_png";
		t.top = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		this._Scroller1 = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.scrollPolicyH = "off";
		t.top = 5;
		t.viewport = this.dropList_i();
		return t;
	};
	_proto.dropList_i = function () {
		var t = new eui.List();
		this.dropList = t;
		t.itemRendererSkinName = DropDownListItem;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	return FamilyApplyConfigPanelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/family/FamilyApplyItemSkin.exml'] = window.FamilyApplyItemSkin = (function (_super) {
	__extends(FamilyApplyItemSkin, _super);
	function FamilyApplyItemSkin() {
		_super.call(this);
		this.skinParts = ["btnAgree","btnSubject","icon","mLvl","labName","labLv","labScore"];
		
		this.height = 110;
		this.width = 405;
		this.elementsContent = [this._Image1_i(),this.btnAgree_i(),this.btnSubject_i(),this._Image2_i(),this.icon_i(),this._Image3_i(),this.mLvl_i(),this.labName_i(),this.labLv_i(),this.labScore_i()];
	}
	var _proto = FamilyApplyItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 129;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(13,12,46,72);
		t.source = "public_json.public_item_rect_1_png";
		t.top = 0;
		return t;
	};
	_proto.btnAgree_i = function () {
		var t = new eui.Button();
		this.btnAgree = t;
		t.icon = "family_json.family_btn_agree_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 311;
		t.y = 18;
		return t;
	};
	_proto.btnSubject_i = function () {
		var t = new eui.Button();
		this.btnSubject = t;
		t.icon = "family_json.family_btn_reject_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 311;
		t.y = 62;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_icon_bg5_png";
		t.x = 20;
		t.y = 12;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = -138;
		t.source = "";
		t.verticalCenter = 2.5;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_lvl_blank_png";
		t.x = 11;
		t.y = 7;
		return t;
	};
	_proto.mLvl_i = function () {
		var t = new eui.Label();
		this.mLvl = t;
		t.horizontalCenter = -176;
		t.size = 18;
		t.text = "99";
		t.y = 14;
		return t;
	};
	_proto.labName_i = function () {
		var t = new eui.Label();
		this.labName = t;
		t.size = 18;
		t.text = "Label";
		t.textColor = 0x00ff0c;
		t.x = 124;
		t.y = 20;
		return t;
	};
	_proto.labLv_i = function () {
		var t = new eui.Label();
		this.labLv = t;
		t.size = 16;
		t.text = "Label";
		t.x = 124;
		t.y = 48;
		return t;
	};
	_proto.labScore_i = function () {
		var t = new eui.Label();
		this.labScore = t;
		t.size = 16;
		t.text = "Label";
		t.x = 124;
		t.y = 74;
		return t;
	};
	return FamilyApplyItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/family/FamilyApplyPanelSkin.exml'] = window.FamilyApplyPanelSkin = (function (_super) {
	__extends(FamilyApplyPanelSkin, _super);
	function FamilyApplyPanelSkin() {
		_super.call(this);
		this.skinParts = ["bg","list"];
		
		this.elementsContent = [this.bg_i(),this._Scroller1_i()];
	}
	var _proto = FamilyApplyPanelSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 25;
		t.height = 500;
		t.horizontalCenter = 0;
		t.scrollPolicyH = "off";
		t.top = 72;
		t.width = 405;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.itemRendererSkinName = FamilyApplyItemSkin;
		t.x = -16;
		t.y = 13;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	return FamilyApplyPanelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/family/FamilyCreatePanelSkin.exml'] = window.FamilyCreatePanelSkin = (function (_super) {
	__extends(FamilyCreatePanelSkin, _super);
	function FamilyCreatePanelSkin() {
		_super.call(this);
		this.skinParts = ["bg","btnSure","closeBtn","labDesc","imgDrop","labCost","cost","input"];
		
		this.height = 317;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this.btnSure_i(),this.closeBtn_i(),this.labDesc_i(),this.imgDrop_i(),this.labCost_i(),this.cost_i(),this.input_i()];
	}
	var _proto = FamilyCreatePanelSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 95;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.scaleY = 1.13;
		t.source = "win_json.win_slice_line2_png";
		t.width = 416;
		return t;
	};
	_proto.btnSure_i = function () {
		var t = new eui.Button();
		this.btnSure = t;
		t.icon = "res/btn/confirm.png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 236;
		t.y = 235;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Button();
		this.closeBtn = t;
		t.icon = "res/btn/cancel.png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 60;
		t.y = 235;
		return t;
	};
	_proto.labDesc_i = function () {
		var t = new eui.Label();
		this.labDesc = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0x792301;
		t.y = 162;
		return t;
	};
	_proto.imgDrop_i = function () {
		var t = new eui.Image();
		this.imgDrop = t;
		t.horizontalCenter = 0;
		t.source = "family_json.family_dropdown_option_ban_png";
		t.top = 105;
		return t;
	};
	_proto.labCost_i = function () {
		var t = new eui.Label();
		this.labCost = t;
		t.size = 18;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x3e1700;
		t.touchEnabled = false;
		t.x = 147;
		t.y = 195;
		return t;
	};
	_proto.cost_i = function () {
		var t = new ItemExpend();
		this.cost = t;
		t.skinName = "ItemExpend4Skin";
		t.x = 200;
		t.y = 186;
		return t;
	};
	_proto.input_i = function () {
		var t = new eui.EditableText();
		this.input = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 35;
		t.horizontalCenter = "0";
		t.maxChars = 20;
		t.prompt = "请输入公会名称";
		t.promptColor = 0xb5a5a5;
		t.size = 18;
		t.text = "";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 313;
		t.y = 105;
		return t;
	};
	return FamilyCreatePanelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/family/FamilyDismissTipsSkin.exml'] = window.FamilyDismissTipsSkin = (function (_super) {
	__extends(FamilyDismissTipsSkin, _super);
	function FamilyDismissTipsSkin() {
		_super.call(this);
		this.skinParts = ["bg","desc","desc2","closeBtn","btnSure"];
		
		this.width = 506;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this.desc_i(),this.desc2_i(),this.closeBtn_i(),this.btnSure_i()];
	}
	var _proto = FamilyDismissTipsSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 106;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,0,13,3);
		t.source = "win_json.win_slice_line2_png";
		t.width = 484;
		return t;
	};
	_proto.desc_i = function () {
		var t = new eui.Label();
		this.desc = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 170;
		t.horizontalCenter = 0.5;
		t.lineSpacing = 3;
		t.size = 18;
		t.text = "label\nlabel\nlabel";
		t.textAlign = "left";
		t.textColor = 0x3e1700;
		t.top = 100;
		t.width = 370;
		return t;
	};
	_proto.desc2_i = function () {
		var t = new eui.Label();
		this.desc2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 125;
		t.horizontalCenter = 0.5;
		t.lineSpacing = 3;
		t.size = 18;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0x792301;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Button();
		this.closeBtn = t;
		t.bottom = 34;
		t.icon = "res/btn/cancel.png";
		t.label = "Button";
		t.left = 62;
		t.skinName = "BtnIconSkin";
		return t;
	};
	_proto.btnSure_i = function () {
		var t = new eui.Button();
		this.btnSure = t;
		t.bottom = 34;
		t.icon = "res/btn/confirm.png";
		t.label = "Button";
		t.right = 62;
		t.skinName = "BtnIconSkin";
		return t;
	};
	return FamilyDismissTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/family/FamilyInfoPanelSkin.exml'] = window.FamilyInfoPanelSkin = (function (_super) {
	__extends(FamilyInfoPanelSkin, _super);
	function FamilyInfoPanelSkin() {
		_super.call(this);
		this.skinParts = ["noteceBan","icon","title","leaderName","memNum","money","score","notice","optionList"];
		
		this.height = 572;
		this.width = 510;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.noteceBan_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this._Image8_i(),this.icon_i(),this.title_i(),this.leaderName_i(),this.memNum_i(),this.money_i(),this.score_i(),this.notice_i(),this.optionList_i()];
	}
	var _proto = FamilyInfoPanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 570;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.width = 510;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "res/images/bg/family_bg0.png";
		t.y = 10;
		return t;
	};
	_proto.noteceBan_i = function () {
		var t = new eui.Image();
		this.noteceBan = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "public_json.public_rect_13_png";
		t.width = 480;
		t.x = 15;
		t.y = 280;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 197;
		t.scale9Grid = new egret.Rectangle(23,16,140,97);
		t.source = "public_json.public_rect_7_png";
		t.width = 494;
		t.x = 8;
		t.y = 370;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "family_json.family_title_ban_png";
		t.y = 10;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "family_json.family_ban_leader_png";
		t.x = 220;
		t.y = 105;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "family_json.family_ban_mem_png";
		t.x = 220;
		t.y = 141;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "family_json.family_ban_fund_png";
		t.x = 220;
		t.y = 183;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "family_json.family_ban_score_png";
		t.x = 220;
		t.y = 221;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = -130;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "";
		t.verticalCenter = -100;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Label();
		this.title = t;
		t.anchorOffsetY = 0;
		t.height = -48;
		t.horizontalCenter = 0.5;
		t.size = 20;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xffc600;
		t.y = 54;
		return t;
	};
	_proto.leaderName_i = function () {
		var t = new eui.Label();
		this.leaderName = t;
		t.size = 18;
		t.text = "Label";
		t.textAlign = "left";
		t.verticalAlign = "middle";
		t.x = 270;
		t.y = 116;
		return t;
	};
	_proto.memNum_i = function () {
		var t = new eui.Label();
		this.memNum = t;
		t.size = 18;
		t.text = "Label";
		t.textAlign = "left";
		t.verticalAlign = "bottom";
		t.x = 270;
		t.y = 155;
		return t;
	};
	_proto.money_i = function () {
		var t = new eui.Label();
		this.money = t;
		t.size = 18;
		t.text = "Label";
		t.textAlign = "left";
		t.verticalAlign = "bottom";
		t.x = 270;
		t.y = 193;
		return t;
	};
	_proto.score_i = function () {
		var t = new eui.Label();
		this.score = t;
		t.size = 18;
		t.text = "Label";
		t.textAlign = "left";
		t.verticalAlign = "bottom";
		t.x = 270;
		t.y = 231;
		return t;
	};
	_proto.notice_i = function () {
		var t = new eui.Label();
		this.notice = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 61;
		t.lineSpacing = 10;
		t.size = 16;
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0xffc600;
		t.touchEnabled = false;
		t.verticalAlign = "top";
		t.width = 460;
		t.x = 25;
		t.y = 292;
		return t;
	};
	_proto.optionList_i = function () {
		var t = new eui.List();
		this.optionList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 175;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = FamilyOptionSkin;
		t.y = 380;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalAlign = "center";
		t.horizontalGap = 45;
		t.orientation = "rows";
		t.requestedColumnCount = 4;
		t.requestedRowCount = 2;
		t.verticalAlign = "top";
		t.verticalGap = 0;
		return t;
	};
	return FamilyInfoPanelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/family/FamilyListItemSkin.exml'] = window.FamilyListItemSkin = (function (_super) {
	__extends(FamilyListItemSkin, _super);
	function FamilyListItemSkin() {
		_super.call(this);
		this.skinParts = ["fName","limit","memNum","score","btnApply"];
		
		this.height = 130;
		this.width = 405;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this.fName_i(),this.limit_i(),this.memNum_i(),this.score_i(),this.btnApply_i()];
	}
	var _proto = FamilyListItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 129;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(13,12,46,72);
		t.source = "public_json.public_item_rect_1_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(48,4,288,26);
		t.source = "family_json.family_list_title_ban_png";
		t.y = 7;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "family_json.family_icon_condition_png";
		t.x = 10;
		t.y = 42;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "family_json.family_icon_mem_png";
		t.x = 10;
		t.y = 69;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "family_json.family_icon_score_png";
		t.x = 10;
		t.y = 96;
		return t;
	};
	_proto.fName_i = function () {
		var t = new eui.Label();
		this.fName = t;
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xffc600;
		t.verticalAlign = "middle";
		t.y = 15;
		return t;
	};
	_proto.limit_i = function () {
		var t = new eui.Label();
		this.limit = t;
		t.left = 45;
		t.size = 16;
		t.text = "Label";
		t.textAlign = "left";
		t.verticalAlign = "middle";
		t.y = 48;
		return t;
	};
	_proto.memNum_i = function () {
		var t = new eui.Label();
		this.memNum = t;
		t.left = 45;
		t.size = 16;
		t.text = "Label";
		t.textAlign = "left";
		t.verticalAlign = "middle";
		t.y = 75;
		return t;
	};
	_proto.score_i = function () {
		var t = new eui.Label();
		this.score = t;
		t.left = 45;
		t.size = 16;
		t.text = "Label";
		t.textAlign = "left";
		t.verticalAlign = "middle";
		t.y = 102;
		return t;
	};
	_proto.btnApply_i = function () {
		var t = new eui.Button();
		this.btnApply = t;
		t.bottom = 20;
		t.icon = "family_json.family_btn_apply_png";
		t.label = "";
		t.right = 15;
		t.skinName = "BtnIconSkin";
		return t;
	};
	return FamilyListItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/family/FamilyListPanelSkin.exml'] = window.FamilyListPanelSkin = (function (_super) {
	__extends(FamilyListPanelSkin, _super);
	function FamilyListPanelSkin() {
		_super.call(this);
		this.skinParts = ["bg","list","btnCreate","btnApply"];
		
		this.height = 595;
		this.width = 437;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this._Scroller1_i(),this.btnCreate_i(),this.btnApply_i()];
	}
	var _proto = FamilyListPanelSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 85;
		t.horizontalCenter = 0.5;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.scaleY = 1.13;
		t.source = "win_json.win_slice_line2_png";
		t.width = 416;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 95;
		t.horizontalCenter = 0;
		t.scrollPolicyH = "off";
		t.top = 70;
		t.width = 405;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.itemRendererSkinName = FamilyListItemSkin;
		t.x = 13.33;
		t.y = 64;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 2;
		return t;
	};
	_proto.btnCreate_i = function () {
		var t = new eui.Button();
		this.btnCreate = t;
		t.icon = "family_json.family_btn_create_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 50;
		t.y = 513;
		return t;
	};
	_proto.btnApply_i = function () {
		var t = new eui.Button();
		this.btnApply = t;
		t.icon = "family_json.family_btn_apply_all_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 244;
		t.y = 513;
		return t;
	};
	return FamilyListPanelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/family/FamilyMemberItemSkin.exml'] = window.FamilyMemberItemSkin = (function (_super) {
	__extends(FamilyMemberItemSkin, _super);
	function FamilyMemberItemSkin() {
		_super.call(this);
		this.skinParts = ["btnQuit","btnKick","btnPro","btnDe","icon","mFlag","mLvl","labName","labScore","labDevote","labState"];
		
		this.width = 495;
		this.elementsContent = [this._Image1_i(),this.btnQuit_i(),this.btnKick_i(),this.btnPro_i(),this.btnDe_i(),this._Image2_i(),this.icon_i(),this._Image3_i(),this.mFlag_i(),this.mLvl_i(),this.labName_i(),this.labScore_i(),this.labDevote_i(),this.labState_i()];
	}
	var _proto = FamilyMemberItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 117;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(13,12,46,72);
		t.source = "public_json.public_item_rect_1_png";
		t.top = 0;
		return t;
	};
	_proto.btnQuit_i = function () {
		var t = new eui.Button();
		this.btnQuit = t;
		t.icon = "family_json.family_btn_quit_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 373;
		t.y = 58;
		return t;
	};
	_proto.btnKick_i = function () {
		var t = new eui.Button();
		this.btnKick = t;
		t.icon = "family_json.family_btn_kick_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 373;
		t.y = 58;
		return t;
	};
	_proto.btnPro_i = function () {
		var t = new eui.Button();
		this.btnPro = t;
		t.icon = "family_json.family_btn_promote_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 373;
		t.y = 58;
		return t;
	};
	_proto.btnDe_i = function () {
		var t = new eui.Button();
		this.btnDe = t;
		t.icon = "family_json.family_btn_demote_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 373;
		t.y = 58;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_icon_bg5_png";
		t.x = 20;
		t.y = 15;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.source = "res/images/roleIco/role_1_1.png";
		t.x = 25;
		t.y = 21;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_lvl_blank_png";
		t.x = 11;
		t.y = 10;
		return t;
	};
	_proto.mFlag_i = function () {
		var t = new eui.Image();
		this.mFlag = t;
		t.source = "family_json.family_mem_flag0_png";
		t.top = 13;
		t.x = 125;
		return t;
	};
	_proto.mLvl_i = function () {
		var t = new eui.Label();
		this.mLvl = t;
		t.horizontalCenter = -221;
		t.size = 18;
		t.text = "99";
		t.y = 17;
		return t;
	};
	_proto.labName_i = function () {
		var t = new eui.Label();
		this.labName = t;
		t.size = 18;
		t.text = "Label";
		t.textColor = 0xffe400;
		t.x = 185.5;
		t.y = 18;
		return t;
	};
	_proto.labScore_i = function () {
		var t = new eui.Label();
		this.labScore = t;
		t.size = 16;
		t.text = "Label";
		t.x = 130;
		t.y = 50;
		return t;
	};
	_proto.labDevote_i = function () {
		var t = new eui.Label();
		this.labDevote = t;
		t.size = 16;
		t.text = "Label";
		t.x = 130;
		t.y = 76;
		return t;
	};
	_proto.labState_i = function () {
		var t = new eui.Label();
		this.labState = t;
		t.right = 20;
		t.size = 18;
		t.text = "Label";
		t.textColor = 0xffc600;
		t.top = 20;
		return t;
	};
	return FamilyMemberItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/family/FamilyMemberPanelSkin.exml'] = window.FamilyMemberPanelSkin = (function (_super) {
	__extends(FamilyMemberPanelSkin, _super);
	function FamilyMemberPanelSkin() {
		_super.call(this);
		this.skinParts = ["list","btnMem","btnSetting","btnCheck","btnPosition"];
		
		this.currentState = "mem";
		this.height = 572;
		this.width = 510;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Scroller1_i(),this.btnSetting_i(),this.btnCheck_i()];
		this.btnMem_i();
		
		this.btnPosition_i();
		
		this.states = [
			new eui.State ("mem",
				[
					new eui.AddItems("btnPosition","",1,"")
				])
			,
			new eui.State ("pos",
				[
					new eui.AddItems("btnMem","",2,"btnSetting")
				])
		];
	}
	var _proto = FamilyMemberPanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.scaleY = 1.13;
		t.source = "win_json.win_bg_line_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 64;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.scaleY = 1.13;
		t.source = "win_json.win_slice_line2_png";
		t.width = 508;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 490;
		t.horizontalCenter = 0;
		t.scrollPolicyH = "off";
		t.width = 496;
		t.y = 10;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.anchorOffsetY = 0;
		t.height = 493;
		t.itemRendererSkinName = FamilyMemberItemSkin;
		return t;
	};
	_proto.btnMem_i = function () {
		var t = new eui.Button();
		this.btnMem = t;
		t.bottom = 5;
		t.icon = "family_json.family_btn_mem_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 347;
		return t;
	};
	_proto.btnSetting_i = function () {
		var t = new eui.Button();
		this.btnSetting = t;
		t.bottom = 5;
		t.icon = "family_json.family_btn_setting_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 21;
		return t;
	};
	_proto.btnCheck_i = function () {
		var t = new eui.Button();
		this.btnCheck = t;
		t.bottom = 5;
		t.icon = "family_json.family_btn_check_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 184;
		return t;
	};
	_proto.btnPosition_i = function () {
		var t = new eui.Button();
		this.btnPosition = t;
		t.bottom = 5;
		t.icon = "family_json.family_btn_setting_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 347;
		return t;
	};
	return FamilyMemberPanelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/family/FamilyNoticeSkin.exml'] = window.FamilyNoticeSkin = (function (_super) {
	__extends(FamilyNoticeSkin, _super);
	function FamilyNoticeSkin() {
		_super.call(this);
		this.skinParts = ["bg","btnSure","count","notice"];
		
		this.height = 387;
		this.width = 437;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this._Image2_i(),this.btnSure_i(),this.count_i(),this.notice_i()];
	}
	var _proto = FamilyNoticeSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 95;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,0,13,3);
		t.source = "win_json.win_slice_line2_png";
		t.width = 415;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 110;
		t.height = 220;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(23,16,140,97);
		t.source = "public_json.public_rect_7_png";
		t.top = 75;
		t.width = 397;
		return t;
	};
	_proto.btnSure_i = function () {
		var t = new eui.Button();
		this.btnSure = t;
		t.bottom = 30;
		t.horizontalCenter = 0;
		t.icon = "res/btn/confirm.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		return t;
	};
	_proto.count_i = function () {
		var t = new eui.Label();
		this.count = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 115;
		t.lineSpacing = 3;
		t.right = 25;
		t.size = 18;
		t.text = "Label";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		return t;
	};
	_proto.notice_i = function () {
		var t = new eui.EditableText();
		this.notice = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = "140";
		t.maxChars = 60;
		t.multiline = true;
		t.size = 18;
		t.text = "Label";
		t.textAlign = "left";
		t.textColor = 0xffc600;
		t.top = "84";
		t.width = 382;
		t.x = 28;
		return t;
	};
	return FamilyNoticeSkin;
})(eui.Skin);generateEUI.paths['resource/exml/family/FamilyOptionSkin.exml'] = window.FamilyOptionSkin = (function (_super) {
	__extends(FamilyOptionSkin, _super);
	function FamilyOptionSkin() {
		_super.call(this);
		this.skinParts = ["icon","labName"];
		
		this.elementsContent = [this._Image1_i(),this.icon_i(),this.labName_i()];
	}
	var _proto = FamilyOptionSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "family_json.family_opt_ban_png";
		t.y = 0;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = -8;
		return t;
	};
	_proto.labName_i = function () {
		var t = new eui.Label();
		this.labName = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "";
		t.textAlign = "center";
		t.textColor = 0xffc600;
		t.verticalAlign = "middle";
		t.y = 72;
		return t;
	};
	return FamilyOptionSkin;
})(eui.Skin);generateEUI.paths['resource/exml/family/FamilyPannelSkin.exml'] = window.FamilyPannelSkin = (function (_super) {
	__extends(FamilyPannelSkin, _super);
	function FamilyPannelSkin() {
		_super.call(this);
		this.skinParts = ["viewContent","line0","line1","line2","line3","tabBtn"];
		
		this.currentState = "s0";
		this.height = 680;
		this.width = 535;
		this.elementsContent = [this._Image1_i(),this.viewContent_i(),this._Group3_i()];
		this.states = [
			new eui.State ("s0",
				[
					new eui.SetProperty("_Group3","visible",false)
				])
			,
			new eui.State ("s1",
				[
				])
		];
	}
	var _proto = FamilyPannelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 680;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(20,168,65,17);
		t.source = "win_json.win_bg4_png";
		t.verticalCenter = 0;
		t.width = 530;
		return t;
	};
	_proto.viewContent_i = function () {
		var t = new eui.Group();
		this.viewContent = t;
		t.anchorOffsetY = 0;
		t.height = 565;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.width = 510;
		t.y = 7;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		this._Group3 = t;
		t.horizontalCenter = 0;
		t.y = 579;
		t.elementsContent = [this._Image2_i(),this._Group2_i(),this.tabBtn_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -1;
		t.scale9Grid = new egret.Rectangle(1,1,8,1);
		t.source = "role_json.role_line_fg_2_png";
		t.top = 0;
		t.width = 526;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 117;
		t.y = 9;
		t.elementsContent = [this._Group1_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = -10;
		t.verticalCenter = -8;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.line0_i(),this.line1_i(),this.line2_i(),this.line3_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 109;
		return t;
	};
	_proto.line0_i = function () {
		var t = new eui.Image();
		this.line0 = t;
		t.source = "win_json.win_slice_line3_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.line1_i = function () {
		var t = new eui.Image();
		this.line1 = t;
		t.source = "win_json.win_slice_line3_png";
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.line2_i = function () {
		var t = new eui.Image();
		this.line2 = t;
		t.source = "win_json.win_slice_line3_png";
		t.x = 20;
		t.y = 20;
		return t;
	};
	_proto.line3_i = function () {
		var t = new eui.Image();
		this.line3 = t;
		t.source = "win_json.win_slice_line3_png";
		t.x = 30;
		t.y = 30;
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.itemRendererSkinName = TabBar3Skin;
		t.x = 31;
		t.y = 7;
		t.layout = this._HorizontalLayout2_i();
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 47;
		return t;
	};
	return FamilyPannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/fashion/CoordinateItemSkin.exml'] = window.CoordinateItemSkin = (function (_super) {
	__extends(CoordinateItemSkin, _super);
	function CoordinateItemSkin() {
		_super.call(this);
		this.skinParts = ["bg","item_0","item_1","item_2","item_3","item_4","item_5","item_6","item_7","iG","propPart","tBtn","title","active"];
		
		this.height = 307;
		this.width = 476;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this._Image2_i(),this.iG_i(),this.propPart_i(),this.tBtn_i(),this.title_i(),this.active_i()];
	}
	var _proto = CoordinateItemSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.source = "res/images/bg/coordinateBg.png";
		t.verticalCenter = 0;
		t.x = 6;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(8,9,26,25);
		t.source = "win_json.win_bg_line_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 157;
		t.scale9Grid = new egret.Rectangle(19,12,121,74);
		t.source = "public_json.public_rect_1_png";
		t.width = 278;
		t.x = 189;
		t.y = 134;
		return t;
	};
	_proto.iG_i = function () {
		var t = new eui.Group();
		this.iG = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 156;
		t.width = 278;
		t.x = 189;
		t.y = 135;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this.item_0_i(),this.item_1_i(),this.item_2_i(),this.item_3_i(),this.item_4_i(),this.item_5_i(),this.item_6_i(),this.item_7_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 8;
		t.paddingLeft = 7;
		t.paddingTop = 13;
		t.verticalGap = 9;
		return t;
	};
	_proto.item_0_i = function () {
		var t = new BaseCustComponent();
		this.item_0 = t;
		t.className = "FashionItem";
		t.scaleX = 0.75;
		t.scaleY = 0.75;
		t.skinName = "ItembaseSkin";
		t.x = 40;
		t.y = 41;
		return t;
	};
	_proto.item_1_i = function () {
		var t = new BaseCustComponent();
		this.item_1 = t;
		t.className = "FashionItem";
		t.scaleX = 0.75;
		t.scaleY = 0.75;
		t.skinName = "ItembaseSkin";
		t.x = 50;
		t.y = 51;
		return t;
	};
	_proto.item_2_i = function () {
		var t = new BaseCustComponent();
		this.item_2 = t;
		t.className = "FashionItem";
		t.scaleX = 0.75;
		t.scaleY = 0.75;
		t.skinName = "ItembaseSkin";
		t.x = 60;
		t.y = 61;
		return t;
	};
	_proto.item_3_i = function () {
		var t = new BaseCustComponent();
		this.item_3 = t;
		t.className = "FashionItem";
		t.scaleX = 0.75;
		t.scaleY = 0.75;
		t.skinName = "ItembaseSkin";
		t.x = 70;
		t.y = 71;
		return t;
	};
	_proto.item_4_i = function () {
		var t = new BaseCustComponent();
		this.item_4 = t;
		t.className = "FashionItem";
		t.scaleX = 0.75;
		t.scaleY = 0.75;
		t.skinName = "ItembaseSkin";
		t.x = 80;
		t.y = 81;
		return t;
	};
	_proto.item_5_i = function () {
		var t = new BaseCustComponent();
		this.item_5 = t;
		t.className = "FashionItem";
		t.scaleX = 0.75;
		t.scaleY = 0.75;
		t.skinName = "ItembaseSkin";
		t.x = 90;
		t.y = 91;
		return t;
	};
	_proto.item_6_i = function () {
		var t = new BaseCustComponent();
		this.item_6 = t;
		t.className = "FashionItem";
		t.scaleX = 0.75;
		t.scaleY = 0.75;
		t.skinName = "ItembaseSkin";
		t.x = 100;
		t.y = 101;
		return t;
	};
	_proto.item_7_i = function () {
		var t = new BaseCustComponent();
		this.item_7 = t;
		t.className = "FashionItem";
		t.scaleX = 0.75;
		t.scaleY = 0.75;
		t.skinName = "ItembaseSkin";
		t.x = 110;
		t.y = 111;
		return t;
	};
	_proto.propPart_i = function () {
		var t = new BaseCustComponent();
		this.propPart = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 70;
		t.width = 278;
		t.x = 189;
		t.y = 59;
		return t;
	};
	_proto.tBtn_i = function () {
		var t = new eui.Button();
		this.tBtn = t;
		t.horizontalCenter = -141;
		t.icon = "fashion_json.fashion_try2_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.verticalCenter = 112;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.source = "fashion_json.fashion_suit_title_0_png";
		t.x = 198;
		t.y = 19;
		return t;
	};
	_proto.active_i = function () {
		var t = new eui.Image();
		this.active = t;
		t.source = "public_json.public_active_png";
		t.visible = false;
		t.x = 375;
		t.y = 15;
		return t;
	};
	return CoordinateItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/fashion/CoordinateTipsSkin.exml'] = window.CoordinateTipsSkin = (function (_super) {
	__extends(CoordinateTipsSkin, _super);
	function CoordinateTipsSkin() {
		_super.call(this);
		this.skinParts = ["itemList"];
		
		this.height = 720;
		this.width = 507;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Scroller1_i()];
	}
	var _proto = CoordinateTipsSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(63,78,384,34);
		t.source = "win_json.win_tips_bg_png";
		t.top = 7;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 634;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(28,139,62,66);
		t.source = "win_json.win_bg4_png";
		t.top = 63;
		t.width = 490;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "win_json.win_title_2_png";
		t.top = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "res/winTitle/coordinate.png";
		t.x = 213;
		t.y = 8;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.height = 620;
		t.horizontalCenter = 0.5;
		t.top = 69;
		t.width = 476;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = CoordinateItemSkin;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	return CoordinateTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/fashion/FashionBuyTipsSkin.exml'] = window.FashionBuyTipsSkin = (function (_super) {
	__extends(FashionBuyTipsSkin, _super);
	function FashionBuyTipsSkin() {
		_super.call(this);
		this.skinParts = ["bg","buyBtn","cBtn","itemList","t0","costGroup"];
		
		this.height = 461;
		this.width = 465;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this._Image2_i(),this._Image3_i(),this.buyBtn_i(),this.cBtn_i(),this._Scroller1_i(),this._Image4_i(),this._Group1_i()];
	}
	var _proto = FashionBuyTipsSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 186;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(19,12,121,74);
		t.source = "public_json.public_rect_1_png";
		t.width = 433;
		t.y = 106;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 41;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(19,16,119,25);
		t.source = "public_json.public_prop_rect_png";
		t.width = 420;
		t.y = 302;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,0,5,2);
		t.source = "public_json.public_slice_line_png";
		t.width = 444;
		t.y = 353;
		return t;
	};
	_proto.buyBtn_i = function () {
		var t = new eui.Button();
		this.buyBtn = t;
		t.icon = "res/btn/buy4.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 262;
		t.y = 372;
		return t;
	};
	_proto.cBtn_i = function () {
		var t = new eui.Button();
		this.cBtn = t;
		t.icon = "res/btn/cancel.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 60;
		t.y = 372;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.height = 173;
		t.horizontalCenter = 0;
		t.width = 422;
		t.y = 113;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = ItembaseSkin;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 6;
		t.verticalGap = 6;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "fashion_json.fashion_texture_0_png";
		t.y = 76;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 30;
		t.width = 391;
		t.x = 35;
		t.y = 307;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this.t0_i(),this.costGroup_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		t.verticalAlign = "middle";
		return t;
	};
	_proto.t0_i = function () {
		var t = new eui.Label();
		this.t0 = t;
		t.size = 18;
		t.text = "消耗 : ";
		t.x = 91;
		t.y = 16;
		return t;
	};
	_proto.costGroup_i = function () {
		var t = new eui.Group();
		this.costGroup = t;
		t.x = 194;
		t.y = 6;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	return FashionBuyTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/fashion/FashionPannelSkin.exml'] = window.FashionPannelSkin = (function (_super) {
	__extends(FashionPannelSkin, _super);
	function FashionPannelSkin() {
		_super.call(this);
		this.skinParts = ["roleSelect","itemList","sc","mModel","tabBtn_0","tabBtn_1","item_0","item_1","item_2","item_3","sBtn"];
		
		this.height = 680;
		this.width = 535;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.roleSelect_i(),this.sc_i(),this.mModel_i(),this.tabBtn_0_i(),this.tabBtn_1_i(),this._Group1_i(),this.sBtn_i()];
	}
	var _proto = FashionPannelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 680;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(20,168,65,17);
		t.source = "win_json.win_bg4_png";
		t.width = 530;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.height = 479;
		t.horizontalCenter = 0;
		t.source = "res/images/bg//fashionBg.png";
		t.width = 506;
		t.y = 86;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -1;
		t.scale9Grid = new egret.Rectangle(1,1,8,1);
		t.source = "role_json.role_line_fg_2_png";
		t.top = 579;
		t.width = 526;
		return t;
	};
	_proto.roleSelect_i = function () {
		var t = new BaseCustComponent();
		this.roleSelect = t;
		t.anchorOffsetY = 0;
		t.className = "RoleSelect";
		t.skinName = "RoleSelectSkin";
		t.x = 16;
		t.y = 2;
		return t;
	};
	_proto.sc_i = function () {
		var t = new eui.Scroller();
		this.sc = t;
		t.anchorOffsetY = 0;
		t.bounces = true;
		t.height = 176;
		t.horizontalCenter = 3;
		t.width = 489;
		t.y = 379;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = ItembaseSkin;
		t.y = -29.33;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 3;
		t.requestedColumnCount = 6;
		return t;
	};
	_proto.mModel_i = function () {
		var t = new BaseCustComponent();
		this.mModel = t;
		t.bottom = 337;
		t.className = "UIAvatar";
		t.horizontalCenter = 46;
		t.touchChildren = false;
		t.touchEnabled = false;
		return t;
	};
	_proto.tabBtn_0_i = function () {
		var t = new eui.TabBar();
		this.tabBtn_0 = t;
		t.anchorOffsetY = 0;
		t.height = 74;
		t.itemRendererSkinName = TabBar5Skin;
		t.touchThrough = false;
		t.width = 338;
		t.x = 21;
		t.y = 585;
		t.layout = this._TileLayout2_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._TileLayout2_i = function () {
		var t = new eui.TileLayout();
		t.columnAlign = "justifyUsingWidth";
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.icon = "fashion_json.fashion_tag_headwear_png";
		t.line = "fashion_json.fashion_line_png";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.icon = "fashion_json.fashion_tag_clothes_png";
		t.line = "fashion_json.fashion_line_png";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.icon = "fashion_json.fashion_tag_back_png";
		t.line = "";
		return t;
	};
	_proto.tabBtn_1_i = function () {
		var t = new eui.TabBar();
		this.tabBtn_1 = t;
		t.itemRendererSkinName = TabBar1Skin;
		t.x = 23;
		t.y = 330.67;
		t.layout = this._HorizontalLayout1_i();
		t.dataProvider = this._ArrayCollection2_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._ArrayCollection2_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i()];
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.icon = "fashion_json.fashion_40_png";
		t.icon2 = "fashion_json.fashion_40_s_png";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.icon = "fashion_json.fashion_40_png";
		t.icon2 = "fashion_json.fashion_40_s_png";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.icon = "fashion_json.fashion_40_png";
		t.icon2 = "fashion_json.fashion_40_s_png";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.icon = "fashion_json.fashion_40_png";
		t.icon2 = "fashion_json.fashion_40_s_png";
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 200;
		t.horizontalCenter = 0;
		t.y = 128;
		t.layout = this._TileLayout3_i();
		t.elementsContent = [this.item_0_i(),this.item_1_i(),this.item_2_i(),this.item_3_i()];
		return t;
	};
	_proto._TileLayout3_i = function () {
		var t = new eui.TileLayout();
		t.horizontalAlign = "center";
		t.horizontalGap = 326;
		t.verticalGap = 13;
		return t;
	};
	_proto.item_0_i = function () {
		var t = new BaseCustComponent();
		this.item_0 = t;
		t.className = "FashionEquipItem";
		t.skinName = "ItembaseSkin";
		t.x = 32;
		t.y = 28;
		return t;
	};
	_proto.item_1_i = function () {
		var t = new BaseCustComponent();
		this.item_1 = t;
		t.className = "FashionEquipItem";
		t.skinName = "ItembaseSkin";
		t.x = 42;
		t.y = 38;
		return t;
	};
	_proto.item_2_i = function () {
		var t = new BaseCustComponent();
		this.item_2 = t;
		t.className = "FashionEquipItem";
		t.skinName = "ItembaseSkin";
		t.x = 52;
		t.y = 48;
		return t;
	};
	_proto.item_3_i = function () {
		var t = new BaseCustComponent();
		this.item_3 = t;
		t.className = "FashionEquipItem";
		t.skinName = "ItembaseSkin";
		t.x = 62;
		t.y = 58;
		return t;
	};
	_proto.sBtn_i = function () {
		var t = new eui.Button();
		this.sBtn = t;
		t.icon = "res/btn/saveBtn.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 401;
		t.y = 323;
		return t;
	};
	return FashionPannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/fashion/FashionTypeSkin.exml'] = window.FashionTypeSkin = (function (_super) {
	__extends(FashionTypeSkin, _super);
	function FashionTypeSkin() {
		_super.call(this);
		this.skinParts = ["bg","arrow","typeImg","unBtn","fashionName"];
		
		this.width = 500;
		this.elementsContent = [this.bg_i(),this.arrow_i(),this.typeImg_i(),this.unBtn_i(),this.fashionName_i()];
	}
	var _proto = FashionTypeSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.height = 44;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(13,10,34,23);
		t.source = "public_json.public_item_blank_png";
		t.top = 0;
		return t;
	};
	_proto.arrow_i = function () {
		var t = new eui.Image();
		this.arrow = t;
		t.source = "public_json.public_arrow_down_png";
		t.x = 8;
		t.y = 9;
		return t;
	};
	_proto.typeImg_i = function () {
		var t = new eui.Image();
		this.typeImg = t;
		t.source = "fashion_json.fashion_part3_png";
		t.x = 48;
		t.y = 10;
		return t;
	};
	_proto.unBtn_i = function () {
		var t = new eui.Button();
		this.unBtn = t;
		t.height = 30;
		t.icon = "fashion_json.fashion_unload_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.width = 64;
		t.x = 425;
		t.y = 8;
		return t;
	};
	_proto.fashionName_i = function () {
		var t = new eui.Label();
		this.fashionName = t;
		t.right = 81;
		t.size = 16;
		t.text = "Label";
		t.textColor = 0xffc600;
		t.y = 14;
		return t;
	};
	return FashionTypeSkin;
})(eui.Skin);generateEUI.paths['resource/exml/firstCharge/FirstChargeItemSkin.exml'] = window.FirstChargeItemSkin = (function (_super) {
	__extends(FirstChargeItemSkin, _super);
	function FirstChargeItemSkin() {
		_super.call(this);
		this.skinParts = ["lb1","lb2","item","imgEx"];
		
		this.height = 61;
		this.width = 246;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.lb1_i(),this.lb2_i(),this.item_i(),this.imgEx_i()];
	}
	var _proto = FirstChargeItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "firstCharge_json.firstCharge12_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.source = "firstCharge_json.firstCharge11_png";
		t.top = 0;
		return t;
	};
	_proto.lb1_i = function () {
		var t = new eui.Label();
		this.lb1 = t;
		t.right = 119;
		t.size = 22;
		t.text = "198元=";
		t.textColor = 0x612800;
		t.verticalCenter = 0;
		return t;
	};
	_proto.lb2_i = function () {
		var t = new eui.Label();
		this.lb2 = t;
		t.size = 22;
		t.text = "7920";
		t.textColor = 0x612800;
		t.verticalCenter = 0.5;
		t.x = 152.31;
		return t;
	};
	_proto.item_i = function () {
		var t = new eui.Image();
		this.item = t;
		t.scaleX = 0.3;
		t.scaleY = 0.3;
		t.source = "res/images/item/14.png";
		t.verticalCenter = 0.5;
		t.x = 129.65;
		return t;
	};
	_proto.imgEx_i = function () {
		var t = new eui.Image();
		this.imgEx = t;
		t.source = "firstCharge_json.firstCharge10_png";
		t.x = 205;
		t.y = -6.34;
		return t;
	};
	return FirstChargeItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/firstCharge/FirstChargeWinSkin.exml'] = window.FirstChargeWinSkin = (function (_super) {
	__extends(FirstChargeWinSkin, _super);
	function FirstChargeWinSkin() {
		_super.call(this);
		this.skinParts = ["itemData0","itemData1","tabBtn","charge0","charge1","charge2","charge3","gCharge","list0","imgGet0","btn0","list1","imgGet1","btn1","list2","imgGet2","btn2","lbCharge","closeBtn"];
		
		this.width = 640;
		this.elementsContent = [this._Group6_i()];
	}
	var _proto = FirstChargeWinSkin.prototype;

	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.top = 0;
		t.x = -112.88;
		t.elementsContent = [this._Image1_i(),this.tabBtn_i(),this.gCharge_i(),this._Group5_i(),this.lbCharge_i(),this._Label1_i(),this._Image3_i(),this._Image4_i(),this.closeBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "res/images/bg/firstCharge.png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.itemRendererSkinName = TabBar1Skin;
		t.x = 305.4;
		t.y = 472.88;
		t.layout = this._HorizontalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this.itemData0_i(),this.itemData1_i()];
		return t;
	};
	_proto.itemData0_i = function () {
		var t = {};
		this.itemData0 = t;
		t.icon = "firstCharge_json.firstCharge4_png";
		t.icon2 = "firstCharge_json.firstCharge3_png";
		return t;
	};
	_proto.itemData1_i = function () {
		var t = {};
		this.itemData1 = t;
		t.icon = "firstCharge_json.firstCharge2_png";
		t.icon2 = "firstCharge_json.firstCharge1_png";
		return t;
	};
	_proto.gCharge_i = function () {
		var t = new eui.Group();
		this.gCharge = t;
		t.x = 119.88;
		t.y = 717.47;
		t.elementsContent = [this._Image2_i(),this._Group1_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 160;
		t.scale9Grid = new egret.Rectangle(24,36,38,18);
		t.source = "firstCharge_json.firstCharge13_png";
		t.width = 626;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this.charge0_i(),this.charge1_i(),this.charge2_i(),this.charge3_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 45;
		t.requestedRowCount = 2;
		return t;
	};
	_proto.charge0_i = function () {
		var t = new BaseCustComponent();
		this.charge0 = t;
		t.className = "FirstChargeItem";
		t.skinName = "FirstChargeItemSkin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.charge1_i = function () {
		var t = new BaseCustComponent();
		this.charge1 = t;
		t.className = "FirstChargeItem";
		t.skinName = "FirstChargeItemSkin";
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.charge2_i = function () {
		var t = new BaseCustComponent();
		this.charge2 = t;
		t.className = "FirstChargeItem";
		t.skinName = "FirstChargeItemSkin";
		t.x = 20;
		t.y = 20;
		return t;
	};
	_proto.charge3_i = function () {
		var t = new BaseCustComponent();
		this.charge3 = t;
		t.className = "FirstChargeItem";
		t.skinName = "FirstChargeItemSkin";
		t.x = 30;
		t.y = 30;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.x = 144.88;
		t.y = 542.34;
		t.layout = this._HorizontalLayout5_i();
		t.elementsContent = [this._Group2_i(),this._Group3_i(),this._Group4_i()];
		return t;
	};
	_proto._HorizontalLayout5_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 36;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.list0_i(),this.imgGet0_i(),this.btn0_i()];
		return t;
	};
	_proto.list0_i = function () {
		var t = new eui.List();
		this.list0 = t;
		t.itemRendererSkinName = ItembaseSkin;
		t.x = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout2_i();
		t.dataProvider = this._ArrayCollection2_i();
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 10;
		return t;
	};
	_proto._ArrayCollection2_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto.imgGet0_i = function () {
		var t = new eui.Image();
		this.imgGet0 = t;
		t.horizontalCenter = 0;
		t.source = "firstCharge_json.firstCharge5_png";
		t.y = 87.99;
		return t;
	};
	_proto.btn0_i = function () {
		var t = new eui.Button();
		this.btn0 = t;
		t.icon = "res/btn/get_5.png";
		t.label = "";
		t.x = 29;
		t.y = 76;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.x = 10;
		t.y = 10;
		t.elementsContent = [this.list1_i(),this.imgGet1_i(),this.btn1_i()];
		return t;
	};
	_proto.list1_i = function () {
		var t = new eui.List();
		this.list1 = t;
		t.itemRendererSkinName = ItembaseSkin;
		t.x = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout3_i();
		t.dataProvider = this._ArrayCollection3_i();
		return t;
	};
	_proto._HorizontalLayout3_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 10;
		return t;
	};
	_proto._ArrayCollection3_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object3_i(),this._Object4_i()];
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto.imgGet1_i = function () {
		var t = new eui.Image();
		this.imgGet1 = t;
		t.horizontalCenter = 0;
		t.source = "firstCharge_json.firstCharge5_png";
		t.y = 87.99;
		return t;
	};
	_proto.btn1_i = function () {
		var t = new eui.Button();
		this.btn1 = t;
		t.icon = "res/btn/get_5.png";
		t.label = "";
		t.x = 29;
		t.y = 76;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.x = 20;
		t.y = 20;
		t.elementsContent = [this.list2_i(),this.imgGet2_i(),this.btn2_i()];
		return t;
	};
	_proto.list2_i = function () {
		var t = new eui.List();
		this.list2 = t;
		t.itemRendererSkinName = ItembaseSkin;
		t.x = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout4_i();
		t.dataProvider = this._ArrayCollection4_i();
		return t;
	};
	_proto._HorizontalLayout4_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 10;
		return t;
	};
	_proto._ArrayCollection4_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object5_i(),this._Object6_i()];
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto.imgGet2_i = function () {
		var t = new eui.Image();
		this.imgGet2 = t;
		t.horizontalCenter = 0;
		t.source = "firstCharge_json.firstCharge5_png";
		t.y = 87.99;
		return t;
	};
	_proto.btn2_i = function () {
		var t = new eui.Button();
		this.btn2 = t;
		t.icon = "res/btn/get_5.png";
		t.label = "";
		t.x = 29;
		t.y = 76;
		return t;
	};
	_proto.lbCharge_i = function () {
		var t = new eui.Label();
		this.lbCharge = t;
		t.horizontalCenter = 301;
		t.size = 16;
		t.text = "10元";
		t.y = 503.84;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 16;
		t.text = "累计充值";
		t.textColor = 0xffd201;
		t.x = 642.05;
		t.y = 480.34;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.source = "firstCharge_json.firstCharge9_png";
		t.width = 403;
		t.x = 224.88;
		t.y = 676;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "firstCharge_json.firstCharge8_png";
		t.x = 247.88;
		t.y = 661;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.source = "win_json.win_close_btn4_png";
		t.x = 684.88;
		t.y = 290;
		return t;
	};
	return FirstChargeWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/gashapon/DoubbleItemExpendSkin.exml'] = window.DoubbleItemExpendSkin = (function (_super) {
	__extends(DoubbleItemExpendSkin, _super);
	function DoubbleItemExpendSkin() {
		_super.call(this);
		this.skinParts = ["item0","num0","item1","num1"];
		
		this.currentState = "doubble";
		this.elementsContent = [this._Group3_i()];
		this._Label1_i();
		
		this._Group2_i();
		
		this.states = [
			new eui.State ("sigle",
				[
				])
			,
			new eui.State ("doubble",
				[
					new eui.AddItems("_Label1","_Group3",1,""),
					new eui.AddItems("_Group2","_Group3",1,""),
					new eui.SetProperty("num0","text","*1000")
				])
		];
	}
	var _proto = DoubbleItemExpendSkin.prototype;

	_proto._Group3_i = function () {
		var t = new eui.Group();
		this._Group3 = t;
		t.horizontalCenter = 0;
		t.y = 0;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Group1_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 16;
		t.y = 0;
		t.elementsContent = [this.item0_i(),this.num0_i()];
		return t;
	};
	_proto.item0_i = function () {
		var t = new eui.Image();
		this.item0 = t;
		t.left = -1;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "res/images/item/14.png";
		t.y = 0;
		return t;
	};
	_proto.num0_i = function () {
		var t = new eui.Label();
		this.num0 = t;
		t.size = 18;
		t.text = "*100000";
		t.verticalCenter = 0;
		t.x = 26;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.size = 25;
		t.text = "/";
		t.x = 0;
		t.y = 16;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		this._Group2 = t;
		t.x = 16;
		t.y = 0;
		t.elementsContent = [this.item1_i(),this.num1_i()];
		return t;
	};
	_proto.item1_i = function () {
		var t = new eui.Image();
		this.item1 = t;
		t.left = -3;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "res/images/item/14.png";
		t.y = 0;
		return t;
	};
	_proto.num1_i = function () {
		var t = new eui.Label();
		this.num1 = t;
		t.size = 18;
		t.text = "*10";
		t.verticalCenter = 0;
		t.x = 26;
		return t;
	};
	return DoubbleItemExpendSkin;
})(eui.Skin);generateEUI.paths['resource/exml/gashapon/GashaponBagWinSkin.exml'] = window.GashaponBagWinSkin = (function (_super) {
	__extends(GashaponBagWinSkin, _super);
	function GashaponBagWinSkin() {
		_super.call(this);
		this.skinParts = ["mBtn","closeBtn","list"];
		
		this.height = 512;
		this.width = 437;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.mBtn_i(),this.closeBtn_i(),this._Image3_i(),this._Scroller1_i()];
	}
	var _proto = GashaponBagWinSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(63,76,305,103);
		t.source = "win_json.win_tips_bg3_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 81;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(24,25,36,17);
		t.source = "win_json.win_bg5_png";
		t.top = 61;
		t.width = 419;
		return t;
	};
	_proto.mBtn_i = function () {
		var t = new eui.Button();
		this.mBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 13;
		t.height = 57;
		t.horizontalCenter = 0;
		t.icon = "res/btn/get_7.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.width = 143;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.right = 14;
		t.source = "win_json.win_close_btn2_png";
		t.top = 29;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "res/images/winTitle/gashaponBagBg.png";
		t.y = 11;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.height = 355;
		t.horizontalCenter = 0;
		t.top = 67;
		t.width = 407;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.itemRendererSkinName = Itembase2Skin;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 30;
		t.requestedColumnCount = 4;
		t.verticalGap = 28;
		return t;
	};
	return GashaponBagWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/gashapon/GashaponPannelPetSkin.exml'] = window.GashaponPannelPetSkin = (function (_super) {
	__extends(GashaponPannelPetSkin, _super);
	function GashaponPannelPetSkin() {
		_super.call(this);
		this.skinParts = ["imgBag0","btn0","btn1","gItem","imgType0","viewContent","imgCard0","imgCard1","gArrow","imgCard2","imgBall","item","itemNum","price0","price1","imgItem","gRw","gShow"];
		
		this.elementsContent = [this.viewContent_i(),this._Group4_i(),this._Group5_i(),this.price0_i(),this.price1_i(),this.gRw_i(),this.gShow_i()];
	}
	var _proto = GashaponPannelPetSkin.prototype;

	_proto.viewContent_i = function () {
		var t = new eui.Group();
		this.viewContent = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 660;
		t.horizontalCenter = 0.5;
		t.touchEnabled = false;
		t.width = 500;
		t.elementsContent = [this.imgBag0_i(),this._Image1_i(),this.btn0_i(),this.btn1_i(),this.gItem_i(),this._Image2_i(),this._Image3_i(),this.imgType0_i()];
		return t;
	};
	_proto.imgBag0_i = function () {
		var t = new eui.Image();
		this.imgBag0 = t;
		t.source = "gashapon_json.gashapon_img2_png";
		t.x = 248.1;
		t.y = 425.56;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "gashapon_json.gashapon_img3_png";
		t.x = 266.93;
		t.y = 630.12;
		return t;
	};
	_proto.btn0_i = function () {
		var t = new eui.Button();
		this.btn0 = t;
		t.height = 49;
		t.icon = "res/btn/luck_1.png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.width = 132;
		t.x = 74.33;
		t.y = 580.48;
		return t;
	};
	_proto.btn1_i = function () {
		var t = new eui.Button();
		this.btn1 = t;
		t.height = 49;
		t.icon = "res/btn/luck_2.png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.width = 132;
		t.x = 292.51;
		t.y = 580.48;
		return t;
	};
	_proto.gItem_i = function () {
		var t = new eui.Group();
		this.gItem = t;
		t.horizontalCenter = 0.5;
		t.maxHeight = 337;
		t.scrollEnabled = true;
		t.width = 491;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "res/images/bg/luck4bg.png";
		t.x = 427;
		t.y = 0.6699999999999875;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scaleX = -1;
		t.scaleY = 1;
		t.source = "res/images/bg/luck4bg.png";
		t.x = 62;
		t.y = 0.6699999999999875;
		return t;
	};
	_proto.imgType0_i = function () {
		var t = new eui.Image();
		this.imgType0 = t;
		t.source = "gashapon_json.gashapon_img4_png";
		t.x = -18.66;
		t.y = 251.48;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.x = 369;
		t.y = 312;
		t.elementsContent = [this._Group3_i(),this.imgBall_i()];
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 101;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this._Group1_i(),this.gArrow_i(),this._Group2_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image4_i(),this.imgCard0_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "gashapon_json.gashapon_img7_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgCard0_i = function () {
		var t = new eui.Image();
		this.imgCard0 = t;
		t.source = "gashapon_json.gashapon_img8_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.gArrow_i = function () {
		var t = new eui.Group();
		this.gArrow = t;
		t.x = 10;
		t.y = 10;
		t.elementsContent = [this._Image5_i(),this.imgCard1_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "gashapon_json.gashapon_img7_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgCard1_i = function () {
		var t = new eui.Image();
		this.imgCard1 = t;
		t.source = "gashapon_json.gashapon_img8_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 20;
		t.y = 20;
		t.elementsContent = [this._Image6_i(),this.imgCard2_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "gashapon_json.gashapon_img7_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgCard2_i = function () {
		var t = new eui.Image();
		this.imgCard2 = t;
		t.source = "gashapon_json.gashapon_img8_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgBall_i = function () {
		var t = new eui.Image();
		this.imgBall = t;
		t.horizontalCenter = 0;
		t.source = "gashapon_json.gashapon_img1_png";
		t.y = 0;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.x = 257;
		t.y = 375;
		t.elementsContent = [this.item_i(),this.itemNum_i()];
		return t;
	};
	_proto.item_i = function () {
		var t = new eui.Image();
		this.item = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "res/images/item/14.png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.itemNum_i = function () {
		var t = new eui.Label();
		this.itemNum = t;
		t.size = 18;
		t.text = "10";
		t.x = 39.12;
		t.y = 6;
		return t;
	};
	_proto.price0_i = function () {
		var t = new BaseCustComponent();
		this.price0 = t;
		t.className = "DoubbleItemExpend";
		t.horizontalCenter = -113;
		t.skinName = "DoubbleItemExpendSkin";
		t.touchEnabled = false;
		t.y = 546;
		return t;
	};
	_proto.price1_i = function () {
		var t = new BaseCustComponent();
		this.price1 = t;
		t.className = "DoubbleItemExpend";
		t.horizontalCenter = 104;
		t.skinName = "DoubbleItemExpendSkin";
		t.touchEnabled = false;
		t.y = 546;
		return t;
	};
	_proto.gRw_i = function () {
		var t = new eui.Group();
		this.gRw = t;
		t.x = 78;
		t.y = 393;
		t.elementsContent = [this._Image7_i(),this.imgItem_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "gashapon_json.gashapon_img5_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgItem_i = function () {
		var t = new eui.Image();
		this.imgItem = t;
		t.source = "";
		t.x = 12;
		t.y = 13;
		return t;
	};
	_proto.gShow_i = function () {
		var t = new eui.Group();
		this.gShow = t;
		t.height = 1;
		t.width = 1;
		t.x = 127.44;
		t.y = 441.13;
		return t;
	};
	return GashaponPannelPetSkin;
})(eui.Skin);generateEUI.paths['resource/exml/gashapon/GashaponRwWinSkin.exml'] = window.GashaponRwWinSkin = (function (_super) {
	__extends(GashaponRwWinSkin, _super);
	function GashaponRwWinSkin() {
		_super.call(this);
		this.skinParts = ["gEff","btn0","closeBtn","price1","item0","item1","item2","item3","item4","item5","item6","item7","item8","item9"];
		
		this.width = 640;
		this.elementsContent = [this._Image1_i(),this.gEff_i(),this._Image2_i(),this._Group2_i()];
	}
	var _proto = GashaponRwWinSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "res/images/bg/luck5bg.png";
		t.x = 29;
		t.y = 0;
		return t;
	};
	_proto.gEff_i = function () {
		var t = new eui.Group();
		this.gEff = t;
		t.x = 0;
		t.y = 0;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = -10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "res/images/bg/luck3bg.png";
		t.x = 29;
		t.y = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.percentWidth = 100;
		t.y = 378;
		t.elementsContent = [this._Rect1_i(),this.btn0_i(),this.closeBtn_i(),this._Image3_i(),this.price1_i(),this._Group1_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0;
		t.height = 300;
		t.percentWidth = 100;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.btn0_i = function () {
		var t = new eui.Button();
		this.btn0 = t;
		t.height = 49;
		t.icon = "res/btn/luck_1.png";
		t.label = "";
		t.right = 50;
		t.skinName = "BtnIconSkin";
		t.width = 132;
		t.y = 248.93;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Button();
		this.closeBtn = t;
		t.height = 49;
		t.icon = "res/btn/confirm2.png";
		t.label = "";
		t.left = 50;
		t.skinName = "BtnIconSkin";
		t.width = 132;
		t.y = 248.93;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "public_json.public_slice_line3_png";
		t.percentWidth = 90;
		t.y = 195.65;
		return t;
	};
	_proto.price1_i = function () {
		var t = new BaseCustComponent();
		this.price1 = t;
		t.className = "DoubbleItemExpend";
		t.horizontalCenter = 204.5;
		t.skinName = "DoubbleItemExpendSkin";
		t.touchEnabled = false;
		t.y = 210.66;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 12;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this.item0_i(),this.item1_i(),this.item2_i(),this.item3_i(),this.item4_i(),this.item5_i(),this.item6_i(),this.item7_i(),this.item8_i(),this.item9_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 23;
		t.requestedRowCount = 2;
		return t;
	};
	_proto.item0_i = function () {
		var t = new BaseCustComponent();
		this.item0 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.item1_i = function () {
		var t = new BaseCustComponent();
		this.item1 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.item2_i = function () {
		var t = new BaseCustComponent();
		this.item2 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 20;
		t.y = 20;
		return t;
	};
	_proto.item3_i = function () {
		var t = new BaseCustComponent();
		this.item3 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 30;
		t.y = 30;
		return t;
	};
	_proto.item4_i = function () {
		var t = new BaseCustComponent();
		this.item4 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 40;
		t.y = 40;
		return t;
	};
	_proto.item5_i = function () {
		var t = new BaseCustComponent();
		this.item5 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 50;
		t.y = 50;
		return t;
	};
	_proto.item6_i = function () {
		var t = new BaseCustComponent();
		this.item6 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 60;
		t.y = 60;
		return t;
	};
	_proto.item7_i = function () {
		var t = new BaseCustComponent();
		this.item7 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 70;
		t.y = 70;
		return t;
	};
	_proto.item8_i = function () {
		var t = new BaseCustComponent();
		this.item8 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 80;
		t.y = 80;
		return t;
	};
	_proto.item9_i = function () {
		var t = new BaseCustComponent();
		this.item9 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 90;
		t.y = 90;
		return t;
	};
	return GashaponRwWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/gashapon/RewardExWinSkin.exml'] = window.RewardExWinSkin = (function (_super) {
	__extends(RewardExWinSkin, _super);
	function RewardExWinSkin() {
		_super.call(this);
		this.skinParts = ["gRw"];
		
		this.height = 364;
		this.elementsContent = [this._Image1_i(),this._Label1_i(),this.gRw_i()];
	}
	var _proto = RewardExWinSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "res/images/bg/rewardExBg.png";
		t.touchEnabled = false;
		t.x = -1;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "点击任意位置关闭";
		t.textColor = 0x00ff0c;
		t.touchEnabled = false;
		t.x = 253;
		t.y = 338;
		return t;
	};
	_proto.gRw_i = function () {
		var t = new eui.Group();
		this.gRw = t;
		t.horizontalCenter = 0;
		t.x = 69;
		t.y = 188;
		return t;
	};
	return RewardExWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/instruction/InstructionTipsSkin.exml'] = window.InstructionTipsSkin = (function (_super) {
	__extends(InstructionTipsSkin, _super);
	function InstructionTipsSkin() {
		_super.call(this);
		this.skinParts = ["title","desc"];
		
		this.width = 377;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = InstructionTipsSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.title_i(),this.desc_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(273,70,61,25);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "win_json.win_tips_bg2_png";
		t.top = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "win_json.win_slice_line_png";
		t.top = 78;
		t.width = 367;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0;
		t.source = "strength_json.strength_instruction_png";
		t.top = 32;
		return t;
	};
	_proto.desc_i = function () {
		var t = new eui.Label();
		this.desc = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 53;
		t.horizontalCenter = 0;
		t.lineSpacing = 3;
		t.size = 16;
		t.text = "";
		t.top = 100;
		t.width = 313;
		return t;
	};
	return InstructionTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/item/component/BtnPartSkin.exml'] = window.BtnPartSkin = (function (_super) {
	__extends(BtnPartSkin, _super);
	function BtnPartSkin() {
		_super.call(this);
		this.skinParts = ["wBtn","sBtn"];
		
		this.currentState = "s1";
		this.height = 76;
		this.width = 362;
		this.elementsContent = [this._Image1_i(),this._Group1_i()];
		this.states = [
			new eui.State ("s1",
				[
				])
			,
			new eui.State ("s2",
				[
				])
		];
	}
	var _proto = BtnPartSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,0,13,3);
		t.source = "itemtips_json.itemtips_line_png";
		t.width = 396;
		t.y = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this.wBtn_i(),this.sBtn_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.wBtn_i = function () {
		var t = new eui.Button();
		this.wBtn = t;
		t.anchorOffsetX = 0;
		t.bottom = 3;
		t.height = 49;
		t.icon = "itemtips_json.itemtips_use_png";
		t.label = "Button";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BtnIconSkin";
		t.width = 111;
		t.x = 14;
		return t;
	};
	_proto.sBtn_i = function () {
		var t = new eui.Button();
		this.sBtn = t;
		t.anchorOffsetX = 0;
		t.bottom = 3;
		t.height = 49;
		t.icon = "itemtips_json.itemtips_showoff_png";
		t.label = "Button";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BtnIconSkin";
		t.width = 111;
		t.x = 235;
		return t;
	};
	return BtnPartSkin;
})(eui.Skin);generateEUI.paths['resource/exml/item/component/DetailPartSkin.exml'] = window.DetailPartSkin = (function (_super) {
	__extends(DetailPartSkin, _super);
	function DetailPartSkin() {
		_super.call(this);
		this.skinParts = ["dLab","detailG"];
		
		this.elementsContent = [this.detailG_i()];
	}
	var _proto = DetailPartSkin.prototype;

	_proto.detailG_i = function () {
		var t = new eui.Group();
		this.detailG = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 0;
		t.y = 0;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.dLab_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 10;
		return t;
	};
	_proto.dLab_i = function () {
		var t = new eui.Label();
		this.dLab = t;
		t.lineSpacing = 10;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 18;
		t.text = "Label";
		t.x = -12;
		t.y = -13;
		return t;
	};
	return DetailPartSkin;
})(eui.Skin);generateEUI.paths['resource/exml/item/component/GainWaySkin.exml'] = window.GainWaySkin = (function (_super) {
	__extends(GainWaySkin, _super);
	function GainWaySkin() {
		_super.call(this);
		this.skinParts = ["wG","wTxt","title"];
		
		this.width = 362;
		this.elementsContent = [this.wG_i(),this.wTxt_i(),this.title_i(),this._Image1_i(),this._Image2_i()];
	}
	var _proto = GainWaySkin.prototype;

	_proto.wG_i = function () {
		var t = new eui.Group();
		this.wG = t;
		t.anchorOffsetY = 0;
		t.left = 0;
		t.right = 0;
		t.top = 40;
		t.layout = this._BasicLayout1_i();
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.wTxt_i = function () {
		var t = new eui.Label();
		this.wTxt = t;
		t.bottom = 15;
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "";
		t.textAlign = "left";
		t.top = 40;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Label();
		this.title = t;
		t.left = 24;
		t.size = 20;
		t.text = "fdf";
		t.textColor = 0xe48600;
		t.y = 10;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "itemtips_json.itemtips_tag_2_png";
		t.x = 8;
		t.y = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,0,13,3);
		t.source = "itemtips_json.itemtips_line_png";
		t.width = 396;
		t.y = 0;
		return t;
	};
	return GainWaySkin;
})(eui.Skin);generateEUI.paths['resource/exml/item/component/ItemDescSkin.exml'] = window.ItemDescSkin = (function (_super) {
	__extends(ItemDescSkin, _super);
	function ItemDescSkin() {
		_super.call(this);
		this.skinParts = ["desc"];
		
		this.width = 362;
		this.elementsContent = [this._Image1_i(),this.desc_i()];
	}
	var _proto = ItemDescSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,0,13,3);
		t.source = "itemtips_json.itemtips_line_png";
		t.width = 396;
		t.y = 0;
		return t;
	};
	_proto.desc_i = function () {
		var t = new eui.Label();
		this.desc = t;
		t.bottom = 15;
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "Label";
		t.textColor = 0xffe34a;
		t.top = 19;
		t.width = 320;
		return t;
	};
	return ItemDescSkin;
})(eui.Skin);generateEUI.paths['resource/exml/item/component/ItemExpend2Skin.exml'] = window.ItemExpend2Skin = (function (_super) {
	__extends(ItemExpend2Skin, _super);
	function ItemExpend2Skin() {
		_super.call(this);
		this.skinParts = ["lab","iconImg","gainWay","stuffName","countTxt"];
		
		this.currentState = "normal";
		this.height = 101;
		this.width = 72;
		this.elementsContent = [this.lab_i(),this._Image1_i(),this.iconImg_i(),this.gainWay_i(),this._Label1_i(),this.stuffName_i(),this._Group1_i()];
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("single",
				[
					new eui.SetProperty("countTxt","textColor",0xe6daac)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.label"],[0],this.lab,"text");
	}
	var _proto = ItemExpend2Skin.prototype;

	_proto.lab_i = function () {
		var t = new eui.Label();
		this.lab = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 18;
		t.textColor = 0xffc600;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "public_json.public_item_bg2_png";
		t.top = -3;
		return t;
	};
	_proto.iconImg_i = function () {
		var t = new eui.Image();
		this.iconImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "";
		t.top = 0;
		return t;
	};
	_proto.gainWay_i = function () {
		var t = new eui.Label();
		this.gainWay = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "获取";
		t.textColor = 0x36ff00;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "   ";
		t.textColor = 0x36FF00;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.stuffName_i = function () {
		var t = new eui.Label();
		this.stuffName = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "";
		t.visible = false;
		t.y = 11;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 1;
		t.horizontalCenter = 0;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this._Image2_i(),this.countTxt_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = -1;
		t.left = -1;
		t.right = -1;
		t.scale9Grid = new egret.Rectangle(4,8,29,3);
		t.source = "public_json.public_lv_rect_png";
		t.top = -1;
		return t;
	};
	_proto.countTxt_i = function () {
		var t = new eui.Label();
		this.countTxt = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 18;
		t.text = "100/100";
		t.textColor = 0xffffff;
		t.verticalCenter = 2;
		return t;
	};
	return ItemExpend2Skin;
})(eui.Skin);generateEUI.paths['resource/exml/item/component/ItemExpend5Skin.exml'] = window.ItemExpend5Skin = (function (_super) {
	__extends(ItemExpend5Skin, _super);
	function ItemExpend5Skin() {
		_super.call(this);
		this.skinParts = ["gainWay","lab","iconImg","countTxt"];
		
		this.currentState = "normal";
		this.elementsContent = [this.gainWay_i(),this.lab_i(),this._Group1_i()];
		this._Label1_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("single",
				[
					new eui.AddItems("_Label1","",2,"_Group1"),
					new eui.SetProperty("iconImg","top",-4),
					new eui.SetProperty("countTxt","text","100"),
					new eui.SetProperty("countTxt","textColor",0xffffff)
				])
		];
	}
	var _proto = ItemExpend5Skin.prototype;

	_proto.gainWay_i = function () {
		var t = new eui.Label();
		this.gainWay = t;
		t.right = -35;
		t.size = 16;
		t.text = "获取";
		t.textColor = 0x36ff00;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.lab_i = function () {
		var t = new eui.Label();
		this.lab = t;
		t.bold = true;
		t.left = -51;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 18;
		t.text = "";
		t.textColor = 0x6a453b;
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.size = 18;
		t.text = "";
		t.textColor = 0x00ff0c;
		t.visible = false;
		t.x = 44;
		t.y = 21;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		this._Group1 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this.iconImg_i(),this._Label2_i(),this.countTxt_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.iconImg_i = function () {
		var t = new eui.Image();
		this.iconImg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 32;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "res/images/item/14.png";
		t.width = 32;
		t.x = 1;
		t.y = 0;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.size = 18;
		t.text = "X";
		t.textColor = 0xffffff;
		t.verticalCenter = 0;
		t.x = 32;
		return t;
	};
	_proto.countTxt_i = function () {
		var t = new eui.Label();
		this.countTxt = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 18;
		t.text = "100/100";
		t.textColor = 0xffffff;
		t.verticalCenter = 0;
		t.x = 47;
		return t;
	};
	return ItemExpend5Skin;
})(eui.Skin);generateEUI.paths['resource/exml/item/component/PricePartSkin.exml'] = window.PricePartSkin = (function (_super) {
	__extends(PricePartSkin, _super);
	function PricePartSkin() {
		_super.call(this);
		this.skinParts = ["cost"];
		
		this.width = 362;
		this.elementsContent = [this._Image1_i(),this.cost_i()];
	}
	var _proto = PricePartSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,0,13,3);
		t.source = "itemtips_json.itemtips_line_png";
		t.width = 396;
		t.y = 0;
		return t;
	};
	_proto.cost_i = function () {
		var t = new ItemExpend();
		this.cost = t;
		t.bottom = 15;
		t.currentState = "single";
		t.left = 15;
		t.top = 15;
		return t;
	};
	return PricePartSkin;
})(eui.Skin);generateEUI.paths['resource/exml/item/component/PropPart2Skin.exml'] = window.PropPart2Skin = (function (_super) {
	__extends(PropPart2Skin, _super);
	function PropPart2Skin() {
		_super.call(this);
		this.skinParts = ["pG"];
		
		this.width = 362;
		this.elementsContent = [this._Image1_i(),this.pG_i()];
	}
	var _proto = PropPart2Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,0,13,3);
		t.source = "itemtips_json.itemtips_line_png";
		t.width = 396;
		t.y = 0;
		return t;
	};
	_proto.pG_i = function () {
		var t = new eui.Group();
		this.pG = t;
		t.bottom = 15;
		t.left = 0;
		t.right = 0;
		t.top = 20;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 4;
		return t;
	};
	return PropPart2Skin;
})(eui.Skin);generateEUI.paths['resource/exml/item/component/PropPart3Skin.exml'] = window.PropPart3Skin = (function (_super) {
	__extends(PropPart3Skin, _super);
	function PropPart3Skin() {
		_super.call(this);
		this.skinParts = ["pG"];
		
		this.elementsContent = [this.pG_i()];
	}
	var _proto = PropPart3Skin.prototype;

	_proto.pG_i = function () {
		var t = new eui.Group();
		this.pG = t;
		t.y = 0;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.columnAlign = "justifyUsingWidth";
		t.requestedColumnCount = 2;
		return t;
	};
	return PropPart3Skin;
})(eui.Skin);generateEUI.paths['resource/exml/item/component/PropPartExtrSkin.exml'] = window.PropPartExtrSkin = (function (_super) {
	__extends(PropPartExtrSkin, _super);
	function PropPartExtrSkin() {
		_super.call(this);
		this.skinParts = ["title","imgTag","pG"];
		
		this.width = 362;
		this.elementsContent = [this.title_i(),this.imgTag_i(),this.pG_i()];
	}
	var _proto = PropPartExtrSkin.prototype;

	_proto.title_i = function () {
		var t = new eui.Label();
		this.title = t;
		t.left = 18;
		t.size = 20;
		t.text = "强化属性";
		t.textColor = 0x00b4ff;
		t.y = 10;
		return t;
	};
	_proto.imgTag_i = function () {
		var t = new eui.Image();
		this.imgTag = t;
		t.source = "itemtips_json.itemtips_tag_1_png";
		t.x = 0;
		t.y = 15;
		return t;
	};
	_proto.pG_i = function () {
		var t = new eui.Group();
		this.pG = t;
		t.bottom = 20;
		t.left = 0;
		t.top = 40;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 9;
		return t;
	};
	return PropPartExtrSkin;
})(eui.Skin);generateEUI.paths['resource/exml/item/component/TimePartSkin.exml'] = window.TimePartSkin = (function (_super) {
	__extends(TimePartSkin, _super);
	function TimePartSkin() {
		_super.call(this);
		this.skinParts = ["countDown"];
		
		this.height = 42;
		this.width = 362;
		this.elementsContent = [this._Image1_i(),this.countDown_i()];
	}
	var _proto = TimePartSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,0,13,3);
		t.source = "itemtips_json.itemtips_line_png";
		t.width = 396;
		t.y = 0;
		return t;
	};
	_proto.countDown_i = function () {
		var t = new eui.Label();
		this.countDown = t;
		t.left = 26;
		t.size = 18;
		t.text = "Label";
		t.verticalCenter = 0;
		return t;
	};
	return TimePartSkin;
})(eui.Skin);generateEUI.paths['resource/exml/item/component/ZdlPartSkin.exml'] = window.ZdlPartSkin = (function (_super) {
	__extends(ZdlPartSkin, _super);
	function ZdlPartSkin() {
		_super.call(this);
		this.skinParts = ["zdl"];
		
		this.width = 362;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.zdl_i()];
	}
	var _proto = ZdlPartSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "itemtips_json.itemtips_power_blank_png";
		t.x = -16;
		t.y = 4;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(1,0,13,3);
		t.source = "itemtips_json.itemtips_line_png";
		t.width = 399;
		t.x = -18;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(1,0,13,3);
		t.source = "itemtips_json.itemtips_pw_lb_png";
		t.x = 12;
		t.y = 12;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new NumberMC();
		this.zdl = t;
		t.type = "num_json.yellow_num_";
		t.x = 114;
		t.y = 21.75;
		return t;
	};
	return ZdlPartSkin;
})(eui.Skin);generateEUI.paths['resource/exml/item/Itembase2Skin.exml'] = window.Itembase2Skin = (function (_super) {
	__extends(Itembase2Skin, _super);
	function Itembase2Skin() {
		_super.call(this);
		this.skinParts = ["bg","color","ico","zlflag","jobImg","num","itemName","usLevel"];
		
		this.height = 100;
		this.width = 79;
		this.elementsContent = [this.bg_i(),this.color_i(),this.ico_i(),this.zlflag_i(),this.jobImg_i(),this.num_i(),this.itemName_i(),this.usLevel_i()];
	}
	var _proto = Itembase2Skin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.horizontalCenter = 0;
		t.source = "public_json.public_item_bg_png";
		t.top = 0;
		return t;
	};
	_proto.color_i = function () {
		var t = new eui.Image();
		this.color = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = -10;
		return t;
	};
	_proto.ico_i = function () {
		var t = new eui.Image();
		this.ico = t;
		t.horizontalCenter = 0;
		t.verticalCenter = -9;
		return t;
	};
	_proto.zlflag_i = function () {
		var t = new eui.Image();
		this.zlflag = t;
		t.source = "public_json.public_g_allow_png";
		t.x = 57;
		t.y = 5;
		return t;
	};
	_proto.jobImg_i = function () {
		var t = new eui.Image();
		this.jobImg = t;
		t.source = "public_json.public_itemjob1_png";
		t.x = 48;
		t.y = 49;
		return t;
	};
	_proto.num_i = function () {
		var t = new eui.Label();
		this.num = t;
		t.bottom = 24;
		t.right = 4;
		t.size = 18;
		t.stroke = 2;
		t.text = "";
		t.textColor = 0xffffff;
		return t;
	};
	_proto.itemName_i = function () {
		var t = new eui.Label();
		this.itemName = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "Label";
		return t;
	};
	_proto.usLevel_i = function () {
		var t = new eui.Label();
		this.usLevel = t;
		t.size = 16;
		t.stroke = 2;
		t.text = "";
		t.textColor = 0xFFEC1C;
		t.x = 4;
		t.y = 5;
		return t;
	};
	return Itembase2Skin;
})(eui.Skin);generateEUI.paths['resource/exml/item/ItemTipsSkin.exml'] = window.ItemTipsSkin = (function (_super) {
	__extends(ItemTipsSkin, _super);
	function ItemTipsSkin() {
		_super.call(this);
		this.skinParts = ["item","contentG","itemName","detailG","reRect"];
		
		this.width = 407;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.item_i(),this.contentG_i(),this.itemName_i(),this.detailG_i(),this.reRect_i()];
	}
	var _proto = ItemTipsSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(273,70,61,25);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "win_json.win_tips_bg2_png";
		t.top = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(1,0,13,3);
		t.source = "itemtips_json.itemtips_line_png";
		t.width = 399;
		t.x = 4;
		t.y = 55;
		return t;
	};
	_proto.item_i = function () {
		var t = new BaseCustComponent();
		this.item = t;
		t.className = "EquipItem";
		t.left = 39;
		t.skinName = "ItembaseSkin";
		t.y = 69;
		return t;
	};
	_proto.contentG_i = function () {
		var t = new eui.Group();
		this.contentG = t;
		t.anchorOffsetX = 0;
		t.bottom = 15;
		t.horizontalCenter = 0.5;
		t.top = 160;
		t.width = 370;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 0;
		t.horizontalAlign = "left";
		t.paddingLeft = 4;
		return t;
	};
	_proto.itemName_i = function () {
		var t = new eui.Label();
		this.itemName = t;
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "物品名称";
		t.top = 23;
		return t;
	};
	_proto.detailG_i = function () {
		var t = new eui.Group();
		this.detailG = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 83;
		t.left = 148;
		t.top = 68;
		t.width = 238;
		return t;
	};
	_proto.reRect_i = function () {
		var t = new eui.Rect();
		this.reRect = t;
		t.fillAlpha = 0;
		t.height = 43;
		t.left = 0;
		t.top = 0;
		t.width = 69;
		return t;
	};
	return ItemTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/item/NewItemSkin.exml'] = window.NewItemSkin = (function (_super) {
	__extends(NewItemSkin, _super);
	function NewItemSkin() {
		_super.call(this);
		this.skinParts = ["item","btn","itemName","cBtn"];
		
		this.elementsContent = [this._Image1_i(),this.item_i(),this.btn_i(),this.itemName_i(),this.cBtn_i()];
	}
	var _proto = NewItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "newtips_json.newtips_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.item_i = function () {
		var t = new BaseCustComponent();
		this.item = t;
		t.className = "ItemBase";
		t.horizontalCenter = 0;
		t.skinName = "ItembaseSkin";
		t.verticalCenter = -24.5;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.height = 42;
		t.horizontalCenter = 0;
		t.icon = "newtips_json.newtips_btn_1_png";
		t.label = "装备";
		t.skinName = "BtnIconSkin";
		t.width = 114;
		t.y = 141;
		return t;
	};
	_proto.itemName_i = function () {
		var t = new eui.Label();
		this.itemName = t;
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "道具名称";
		t.textColor = 0x4c2f27;
		t.y = 27;
		return t;
	};
	_proto.cBtn_i = function () {
		var t = new eui.Image();
		this.cBtn = t;
		t.source = "newtips_json.newtips_btn_3_png";
		t.x = 187;
		t.y = 22;
		return t;
	};
	return NewItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/itemlist/ItemListSkin.exml'] = window.ItemListSkin = (function (_super) {
	__extends(ItemListSkin, _super);
	function ItemListSkin() {
		_super.call(this);
		this.skinParts = ["iG"];
		
		this.height = 300;
		this.width = 400;
		this.elementsContent = [this.iG_i()];
	}
	var _proto = ItemListSkin.prototype;

	_proto.iG_i = function () {
		var t = new eui.Group();
		this.iG = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	return ItemListSkin;
})(eui.Skin);generateEUI.paths['resource/exml/itemlist/ItemListTipsSkin.exml'] = window.ItemListTipsSkin = (function (_super) {
	__extends(ItemListTipsSkin, _super);
	function ItemListTipsSkin() {
		_super.call(this);
		this.skinParts = ["bg","itemList"];
		
		this.height = 600;
		this.width = 450;
		this.elementsContent = [this.bg_i(),this._Scroller1_i()];
		this.states = [
			new eui.State ("nor",
				[
				])
			,
			new eui.State ("sp",
				[
					new eui.SetProperty("_Scroller1","left",25),
					new eui.SetProperty("_Scroller1","right",25),
					new eui.SetProperty("_Scroller1","top",183),
					new eui.SetProperty("_Scroller1","height",386)
				])
		];
	}
	var _proto = ItemListTipsSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		this._Scroller1 = t;
		t.anchorOffsetY = 0;
		t.height = 494;
		t.left = 25;
		t.right = 25;
		t.top = 75;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		return t;
	};
	return ItemListTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/jewel/JewelBagItemSkin.exml'] = window.JewelBagItemSkin = (function (_super) {
	__extends(JewelBagItemSkin, _super);
	function JewelBagItemSkin() {
		_super.call(this);
		this.skinParts = ["bg","color","ico","zlflag","num","checkBox"];
		
		this.height = 81;
		this.width = 79;
		this.elementsContent = [this.bg_i(),this.color_i(),this.ico_i(),this.zlflag_i(),this.num_i(),this.checkBox_i()];
	}
	var _proto = JewelBagItemSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.horizontalCenter = 0;
		t.source = "public_json.public_item_bg_png";
		t.y = 0;
		return t;
	};
	_proto.color_i = function () {
		var t = new eui.Image();
		this.color = t;
		t.height = 81;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 0;
		t.width = 79;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto.ico_i = function () {
		var t = new eui.Image();
		this.ico = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto.zlflag_i = function () {
		var t = new eui.Image();
		this.zlflag = t;
		t.source = "public_json.public_g_allow_png";
		t.visible = false;
		t.x = 57;
		t.y = 5;
		return t;
	};
	_proto.num_i = function () {
		var t = new eui.Label();
		this.num = t;
		t.bottom = 6;
		t.right = 4;
		t.size = 18;
		t.stroke = 2;
		t.text = "";
		t.textColor = 0xFFFFFF;
		return t;
	};
	_proto.checkBox_i = function () {
		var t = new eui.CheckBox();
		this.checkBox = t;
		t.skinName = "CheckBox1Skin";
		t.x = 58;
		t.y = 61;
		return t;
	};
	return JewelBagItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/jewel/JewelBagSkin.exml'] = window.JewelBagSkin = (function (_super) {
	__extends(JewelBagSkin, _super);
	function JewelBagSkin() {
		_super.call(this);
		this.skinParts = ["itemList","i2","i3","i4","i5","iG","cost","check_2","check_3","check_4","check_5","cg","btn_0"];
		
		this.height = 566;
		this.width = 510;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Scroller1_i(),this.iG_i(),this.cost_i(),this.cg_i(),this.btn_0_i()];
	}
	var _proto = JewelBagSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 1;
		t.height = 560;
		t.horizontalCenter = -1;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.width = 506;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,0,5,2);
		t.source = "public_json.public_slice_line4_png";
		t.width = 502;
		t.y = 418;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 71;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(13,12,85,6);
		t.source = "public_json.public_rect_4_png";
		t.top = 425;
		t.width = 454;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,0,9,2);
		t.source = "public_json.public_slice_line2_png";
		t.width = 410;
		t.y = 459;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.height = 396;
		t.horizontalCenter = 0.5;
		t.width = 481;
		t.y = 16;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = JewelBagItemSkin;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 21;
		t.verticalGap = 8;
		return t;
	};
	_proto.iG_i = function () {
		var t = new eui.Group();
		this.iG = t;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.width = 184;
		t.x = 175;
		t.y = 433;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this.i2_i(),this.i3_i(),this.i4_i(),this.i5_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.i2_i = function () {
		var t = new eui.Image();
		this.i2 = t;
		t.name = "2";
		t.source = "jewel_json.jewel_green_png";
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto.i3_i = function () {
		var t = new eui.Image();
		this.i3 = t;
		t.name = "3";
		t.source = "jewel_json.jewel_bule_png";
		t.verticalCenter = 0;
		t.x = 58;
		return t;
	};
	_proto.i4_i = function () {
		var t = new eui.Image();
		this.i4 = t;
		t.name = "4";
		t.source = "jewel_json.jewel_purple_png";
		t.verticalCenter = 0;
		t.x = 115;
		return t;
	};
	_proto.i5_i = function () {
		var t = new eui.Image();
		this.i5 = t;
		t.name = "5";
		t.source = "jewel_json.jewel_orrange_png";
		t.verticalCenter = 0;
		t.x = 174;
		return t;
	};
	_proto.cost_i = function () {
		var t = new ItemExpend();
		this.cost = t;
		t.currentState = "single";
		t.horizontalCenter = 0;
		t.label = "可获得 : ";
		t.skinName = "ItemExpendSkin";
		t.y = 464;
		return t;
	};
	_proto.cg_i = function () {
		var t = new eui.Group();
		this.cg = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = -4;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.y = 434;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.check_2_i(),this.check_3_i(),this.check_4_i(),this.check_5_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 36;
		return t;
	};
	_proto.check_2_i = function () {
		var t = new eui.CheckBox();
		this.check_2 = t;
		t.name = "2";
		t.skinName = "CheckBox2Skin";
		t.x = 22;
		t.y = 7;
		return t;
	};
	_proto.check_3_i = function () {
		var t = new eui.CheckBox();
		this.check_3 = t;
		t.name = "3";
		t.skinName = "CheckBox2Skin";
		t.x = 32;
		t.y = 17;
		return t;
	};
	_proto.check_4_i = function () {
		var t = new eui.CheckBox();
		this.check_4 = t;
		t.name = "4";
		t.skinName = "CheckBox2Skin";
		t.x = 42;
		t.y = 27;
		return t;
	};
	_proto.check_5_i = function () {
		var t = new eui.CheckBox();
		this.check_5 = t;
		t.name = "5";
		t.skinName = "CheckBox2Skin";
		t.x = 52;
		t.y = 37;
		return t;
	};
	_proto.btn_0_i = function () {
		var t = new eui.Button();
		this.btn_0 = t;
		t.horizontalCenter = 0;
		t.icon = "res/btn/decomposition.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.y = 501;
		return t;
	};
	return JewelBagSkin;
})(eui.Skin);generateEUI.paths['resource/exml/jewel/JewelExchangePageSkin.exml'] = window.JewelExchangePageSkin = (function (_super) {
	__extends(JewelExchangePageSkin, _super);
	function JewelExchangePageSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 300;
		this.width = 400;
	}
	var _proto = JewelExchangePageSkin.prototype;

	return JewelExchangePageSkin;
})(eui.Skin);generateEUI.paths['resource/exml/jewel/JewelItemSkin.exml'] = window.JewelItemSkin = (function (_super) {
	__extends(JewelItemSkin, _super);
	function JewelItemSkin() {
		_super.call(this);
		this.skinParts = ["blank","sele","jName","icon"];
		
		this.height = 105;
		this.elementsContent = [this._Image1_i(),this.blank_i(),this.sele_i(),this.jName_i(),this.icon_i()];
	}
	var _proto = JewelItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "jewel_json.jewel_blank_png";
		t.top = 2;
		return t;
	};
	_proto.blank_i = function () {
		var t = new eui.Image();
		this.blank = t;
		t.bottom = 2;
		t.horizontalCenter = 0;
		t.source = "jewel_json.jewel_name_blank_png";
		return t;
	};
	_proto.sele_i = function () {
		var t = new eui.Image();
		this.sele = t;
		t.horizontalCenter = 0;
		t.source = "jewel_json.jewel_sele_png";
		t.top = 0;
		t.visible = false;
		return t;
	};
	_proto.jName_i = function () {
		var t = new eui.Label();
		this.jName = t;
		t.horizontalCenter = 0;
		t.size = 14;
		t.text = "Label";
		t.y = 85;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = 0;
		t.source = "public_json.public_lock_1_png";
		t.verticalCenter = -9.5;
		return t;
	};
	return JewelItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/zdl/ZdlPrintSkin.exml'] = window.ZdlPrintSkin = (function (_super) {
	__extends(ZdlPrintSkin, _super);
	function ZdlPrintSkin() {
		_super.call(this);
		this.skinParts = ["zdl"];
		
		this.elementsContent = [this._Image1_i(),this._Group1_i()];
	}
	var _proto = ZdlPrintSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(33,11,202,17);
		t.source = "public_json.public_zdl_blank_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this.zdl_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		t.horizontalAlign = "left";
		t.paddingLeft = 18;
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "public_json.public_fight_icon_png";
		t.x = 15;
		t.y = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "public_json.public_fight_zzl_png";
		t.x = 62;
		t.y = 10;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new NumberMC();
		this.zdl = t;
		t.type = "zdl_";
		t.x = 167;
		t.y = 17;
		return t;
	};
	return ZdlPrintSkin;
})(eui.Skin);generateEUI.paths['resource/exml/jewel/JewelPageSkin.exml'] = window.JewelPageSkin = (function (_super) {
	__extends(JewelPageSkin, _super);
	function JewelPageSkin() {
		_super.call(this);
		this.skinParts = ["roleSelect","zdl","jItem_0","jItem_1","jItem_2","jItem_3","jItem_4","jItem_5","jItem_6","jItem_7","iG","btn_0","propList","btn_1","btn_2","cost","g2","pBtn"];
		
		this.height = 565;
		this.width = 510;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.roleSelect_i(),this.zdl_i(),this.iG_i(),this.btn_0_i(),this._Group1_i(),this.g2_i(),this.pBtn_i()];
	}
	var _proto = JewelPageSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "res/images/bg/jewelBg.png";
		t.width = 492;
		t.y = 88;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 1;
		t.height = 484;
		t.horizontalCenter = -1;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.width = 506;
		return t;
	};
	_proto.roleSelect_i = function () {
		var t = new BaseCustComponent();
		this.roleSelect = t;
		t.className = "RoleSelect";
		t.skinName = "RoleSelectSkin";
		t.x = 3;
		t.y = -5;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new BaseCustComponent();
		this.zdl = t;
		t.anchorOffsetX = 29;
		t.anchorOffsetY = 0;
		t.className = "ZdlPrint";
		t.horizontalCenter = 0;
		t.skinName = "ZdlPrintSkin";
		t.y = 90;
		return t;
	};
	_proto.iG_i = function () {
		var t = new eui.Group();
		this.iG = t;
		t.anchorOffsetY = 0;
		t.height = 354;
		t.left = 0;
		t.right = 0;
		t.top = 89;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.elementsContent = [this.jItem_0_i(),this.jItem_1_i(),this.jItem_2_i(),this.jItem_3_i(),this.jItem_4_i(),this.jItem_5_i(),this.jItem_6_i(),this.jItem_7_i()];
		return t;
	};
	_proto.jItem_0_i = function () {
		var t = new BaseCustComponent();
		this.jItem_0 = t;
		t.className = "JewelItem";
		t.name = "0";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "JewelItemSkin";
		t.touchChildren = false;
		t.x = 23;
		t.y = 58;
		return t;
	};
	_proto.jItem_1_i = function () {
		var t = new BaseCustComponent();
		this.jItem_1 = t;
		t.className = "JewelItem";
		t.name = "1";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "JewelItemSkin";
		t.touchChildren = false;
		t.x = 23;
		t.y = 168;
		return t;
	};
	_proto.jItem_2_i = function () {
		var t = new BaseCustComponent();
		this.jItem_2 = t;
		t.className = "JewelItem";
		t.name = "2";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "JewelItemSkin";
		t.touchChildren = false;
		t.x = 117;
		t.y = 114;
		return t;
	};
	_proto.jItem_3_i = function () {
		var t = new BaseCustComponent();
		this.jItem_3 = t;
		t.className = "JewelItem";
		t.name = "3";
		t.skinName = "JewelItemSkin";
		t.touchChildren = false;
		t.x = 205;
		t.y = 44;
		return t;
	};
	_proto.jItem_4_i = function () {
		var t = new BaseCustComponent();
		this.jItem_4 = t;
		t.className = "JewelItem";
		t.name = "4";
		t.skinName = "JewelItemSkin";
		t.touchChildren = false;
		t.x = 205;
		t.y = 177;
		return t;
	};
	_proto.jItem_5_i = function () {
		var t = new BaseCustComponent();
		this.jItem_5 = t;
		t.className = "JewelItem";
		t.name = "5";
		t.skinName = "JewelItemSkin";
		t.touchChildren = false;
		t.x = 293;
		t.y = 114;
		return t;
	};
	_proto.jItem_6_i = function () {
		var t = new BaseCustComponent();
		this.jItem_6 = t;
		t.className = "JewelItem";
		t.name = "6";
		t.skinName = "JewelItemSkin";
		t.touchChildren = false;
		t.x = 387;
		t.y = 58;
		return t;
	};
	_proto.jItem_7_i = function () {
		var t = new BaseCustComponent();
		this.jItem_7 = t;
		t.className = "JewelItem";
		t.name = "7";
		t.skinName = "JewelItemSkin";
		t.touchChildren = false;
		t.x = 387;
		t.y = 168;
		return t;
	};
	_proto.btn_0_i = function () {
		var t = new eui.Button();
		this.btn_0 = t;
		t.horizontalCenter = 0;
		t.icon = "res/btn/setBtn.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.visible = false;
		t.y = 488;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 90;
		t.horizontalCenter = 0;
		t.width = 263;
		t.y = 373;
		t.elementsContent = [this._Image3_i(),this.propList_i(),this._Image4_i(),this._Image5_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(11,12,16,15);
		t.source = "public_json.public_rect_5_png";
		t.top = 0;
		return t;
	};
	_proto.propList_i = function () {
		var t = new BaseCustComponent();
		this.propList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 11;
		t.className = "PropPart";
		t.left = 0;
		t.right = 0;
		t.skinName = "PropPartSkin";
		t.top = 9;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.source = "public_json.public_slice_line5_png";
		t.verticalCenter = -14;
		t.width = 260;
		t.x = 1;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.source = "public_json.public_slice_line5_png";
		t.verticalCenter = 16;
		t.width = 260;
		t.x = 1;
		return t;
	};
	_proto.g2_i = function () {
		var t = new eui.Group();
		this.g2 = t;
		t.height = 78;
		t.horizontalCenter = 0;
		t.width = 384;
		t.y = 480;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this.btn_1_i(),this.btn_2_i(),this.cost_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.btn_1_i = function () {
		var t = new eui.Button();
		this.btn_1 = t;
		t.bottom = 0;
		t.icon = "res/btn/upGradeBtn.png";
		t.label = "Button";
		t.left = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BtnIconSkin";
		return t;
	};
	_proto.btn_2_i = function () {
		var t = new eui.Button();
		this.btn_2 = t;
		t.bottom = 0;
		t.icon = "res/btn/replaceBtn.png";
		t.label = "Button";
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BtnIconSkin";
		return t;
	};
	_proto.cost_i = function () {
		var t = new ItemExpend();
		this.cost = t;
		t.label = " ";
		t.x = -7;
		t.y = -10;
		return t;
	};
	_proto.pBtn_i = function () {
		var t = new eui.Button();
		this.pBtn = t;
		t.icon = "jewel_json.jewel_prop_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 414;
		t.y = 393;
		return t;
	};
	return JewelPageSkin;
})(eui.Skin);generateEUI.paths['resource/exml/jewel/JewelRepalceItemSkin.exml'] = window.JewelRepalceItemSkin = (function (_super) {
	__extends(JewelRepalceItemSkin, _super);
	function JewelRepalceItemSkin() {
		_super.call(this);
		this.skinParts = ["propList","item_0","btn","iName","state","zdl"];
		
		this.height = 121;
		this.width = 402;
		this.elementsContent = [this._Image1_i(),this.propList_i(),this.item_0_i(),this._Image2_i(),this.btn_i(),this.iName_i(),this.state_i(),this.zdl_i()];
	}
	var _proto = JewelRepalceItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(24,31,19,45);
		t.source = "public_json.public_item_rect_1_png";
		t.top = 0;
		return t;
	};
	_proto.propList_i = function () {
		var t = new BaseCustComponent();
		this.propList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.className = "PropPart";
		t.height = 70;
		t.width = 105;
		t.x = 88;
		t.y = 35;
		return t;
	};
	_proto.item_0_i = function () {
		var t = new BaseCustComponent();
		this.item_0 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 17;
		t.y = 31;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "jingji_json.jingji_texure_0_png";
		t.x = 240;
		t.y = 10;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.icon = "res/btn/setBtn2.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 271;
		t.y = 48;
		return t;
	};
	_proto.iName_i = function () {
		var t = new eui.Label();
		this.iName = t;
		t.size = 18;
		t.text = "宝石名称 Lv.5";
		t.textColor = 0xffc600;
		t.x = 17;
		t.y = 10;
		return t;
	};
	_proto.state_i = function () {
		var t = new eui.Image();
		this.state = t;
		t.source = "jewel_json.jewel_cur_png";
		t.x = 281;
		t.y = 55;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new NumberMC();
		this.zdl = t;
		t.type = "num_json.yellow_num_";
		t.x = 298;
		t.y = 11;
		return t;
	};
	return JewelRepalceItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/jewel/JewelRepalceTipsSkin.exml'] = window.JewelRepalceTipsSkin = (function (_super) {
	__extends(JewelRepalceTipsSkin, _super);
	function JewelRepalceTipsSkin() {
		_super.call(this);
		this.skinParts = ["bg","itemList","cur"];
		
		this.height = 560;
		this.width = 443;
		this.elementsContent = [this.bg_i(),this._Scroller1_i()];
		this.cur_i();
		
		this.states = [
			new eui.State ("nor",
				[
				])
			,
			new eui.State ("sp",
				[
					new eui.AddItems("cur","",1,""),
					new eui.SetProperty("_Scroller1","top",202)
				])
		];
	}
	var _proto = JewelRepalceTipsSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		this._Scroller1 = t;
		t.bottom = 28;
		t.horizontalCenter = 0;
		t.top = 73;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = JewelRepalceItemSkin;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto.cur_i = function () {
		var t = new BaseCustComponent();
		this.cur = t;
		t.className = "JewelReplaceItem";
		t.horizontalCenter = 0;
		t.skinName = "JewelRepalceItemSkin";
		t.y = 75;
		return t;
	};
	return JewelRepalceTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/jingji/JingjiInfoSkin.exml'] = window.JingjiInfoSkin = (function (_super) {
	__extends(JingjiInfoSkin, _super);
	function JingjiInfoSkin() {
		_super.call(this);
		this.skinParts = ["time","tg"];
		
		this.height = 300;
		this.width = 400;
		this.elementsContent = [this.tg_i()];
	}
	var _proto = JingjiInfoSkin.prototype;

	_proto.tg_i = function () {
		var t = new eui.Group();
		this.tg = t;
		t.horizontalCenter = 0;
		t.top = 104;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this._Image1_i(),this.time_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "jingji_json.jingji_texture_2_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.time_i = function () {
		var t = new NumberMC();
		this.time = t;
		t.height = 21;
		t.type = "jingji_json.jingji_t_";
		t.width = 120;
		t.x = 109;
		t.y = 0;
		return t;
	};
	return JingjiInfoSkin;
})(eui.Skin);generateEUI.paths['resource/exml/jingji/JingjiItemSkin.exml'] = window.JingjiItemSkin = (function (_super) {
	__extends(JingjiItemSkin, _super);
	function JingjiItemSkin() {
		_super.call(this);
		this.skinParts = ["icon","item_0","item_1","item_2","mLvl","mName","zdl","enterBtn"];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.icon_i(),this._Image5_i(),this._Image6_i(),this._Group1_i(),this.mLvl_i(),this.mName_i(),this.zdl_i(),this.enterBtn_i()];
	}
	var _proto = JingjiItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "jingji_json.jingji_item_blank_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "jingji_json.jingji_blank_0_png";
		t.x = 148;
		t.y = 16;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "jingji_json.jingji_texure_0_png";
		t.x = 167;
		t.y = 19;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_icon_bg5_png";
		t.x = 20;
		t.y = 15;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.source = "res/images/roleIco/role_1.png";
		t.x = 25;
		t.y = 21;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_blank_2_png";
		t.x = 16;
		t.y = 95;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_lvl_blank_png";
		t.x = 11;
		t.y = 10;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.x = 143;
		t.y = 50;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.item_0_i(),this.item_1_i(),this.item_2_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 4;
		return t;
	};
	_proto.item_0_i = function () {
		var t = new BaseCustComponent();
		this.item_0 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = -50;
		t.y = 20;
		return t;
	};
	_proto.item_1_i = function () {
		var t = new BaseCustComponent();
		this.item_1 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 48;
		t.y = 52;
		return t;
	};
	_proto.item_2_i = function () {
		var t = new BaseCustComponent();
		this.item_2 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 28;
		t.y = 32;
		return t;
	};
	_proto.mLvl_i = function () {
		var t = new eui.Label();
		this.mLvl = t;
		t.horizontalCenter = -222;
		t.size = 18;
		t.text = "99";
		t.y = 17;
		return t;
	};
	_proto.mName_i = function () {
		var t = new eui.Label();
		this.mName = t;
		t.horizontalCenter = -184;
		t.size = 16;
		t.text = "Label";
		t.textColor = 0xFFFF00;
		t.y = 97;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new NumberMC();
		this.zdl = t;
		t.type = "num_json.yellow_num_";
		t.x = 227;
		t.y = 19;
		return t;
	};
	_proto.enterBtn_i = function () {
		var t = new eui.Button();
		this.enterBtn = t;
		t.icon = "res/btn/enterBtn2.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 372;
		t.y = 51;
		return t;
	};
	return JingjiItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/jingji/JingJiPannelSkin.exml'] = window.JingJiPannelSkin = (function (_super) {
	__extends(JingJiPannelSkin, _super);
	function JingJiPannelSkin() {
		_super.call(this);
		this.skinParts = ["bBtn","icon","itemList","zdl","mLvl","roleName","point","win","time","count","rankBtn","reBtn"];
		
		this.height = 680;
		this.width = 530;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this._Image7_i(),this.bBtn_i(),this.icon_i(),this._Image8_i(),this._Image9_i(),this._Image10_i(),this._Image11_i(),this._Scroller1_i(),this.zdl_i(),this.mLvl_i(),this.roleName_i(),this.point_i(),this.win_i(),this.time_i(),this.count_i(),this.rankBtn_i(),this.reBtn_i()];
	}
	var _proto = JingJiPannelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 680;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(20,168,65,17);
		t.source = "win_json.win_bg4_png";
		t.verticalCenter = 0.5;
		t.width = 530;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 661;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(10,11,22,21);
		t.source = "win_json.win_bg_line_png";
		t.width = 507;
		t.y = 12;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_icon_bg5_png";
		t.x = 36;
		t.y = 20;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_lvl_blank_png";
		t.x = 24;
		t.y = 19;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "public_json.public_slice_line_png";
		t.width = 503;
		t.x = 14;
		t.y = 584;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.scale9Grid = new egret.Rectangle(17,12,12,9);
		t.source = "public_json.public_rect_2_png";
		t.width = 191;
		t.x = 22;
		t.y = 620;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "public_json.public_slice_line_png";
		t.width = 503;
		t.y = 132;
		return t;
	};
	_proto.bBtn_i = function () {
		var t = new eui.Button();
		this.bBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 28;
		t.icon = "public_json.public_add_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.width = 33;
		t.x = 177;
		t.y = 625;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.source = "res/images/roleIco/role_1.png";
		t.x = 41;
		t.y = 26;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_blank_2_png";
		t.x = 32;
		t.y = 100;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "jingji_json.jingji_blank_1_png";
		t.x = 145;
		t.y = 81;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.source = "jingji_json.jingji_blank_1_png";
		t.x = 145;
		t.y = 27;
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.source = "jingji_json.jingji_blank_2_png";
		t.x = 387;
		t.y = 82;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.height = 440;
		t.horizontalCenter = 0.5;
		t.y = 139;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.anchorOffsetY = 0;
		t.height = 593;
		t.itemRendererSkinName = JingjiItemSkin;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto.zdl_i = function () {
		var t = new eui.Label();
		this.zdl = t;
		t.size = 18;
		t.text = "我的战力：0000";
		t.textColor = 0xffc600;
		t.x = 161;
		t.y = 38;
		return t;
	};
	_proto.mLvl_i = function () {
		var t = new eui.Label();
		this.mLvl = t;
		t.horizontalCenter = -224.5;
		t.size = 18;
		t.text = "99";
		t.y = 26;
		return t;
	};
	_proto.roleName_i = function () {
		var t = new eui.Label();
		this.roleName = t;
		t.horizontalCenter = -184;
		t.size = 14;
		t.text = "我的战力";
		t.textColor = 0xffc600;
		t.y = 102;
		return t;
	};
	_proto.point_i = function () {
		var t = new eui.Label();
		this.point = t;
		t.size = 18;
		t.text = "我的积分：0000";
		t.textColor = 0xffc600;
		t.x = 161;
		t.y = 91;
		return t;
	};
	_proto.win_i = function () {
		var t = new eui.Label();
		this.win = t;
		t.horizontalCenter = 183;
		t.size = 18;
		t.text = "未上榜";
		t.textColor = 0xffc600;
		t.y = 91;
		return t;
	};
	_proto.time_i = function () {
		var t = new eui.Label();
		this.time = t;
		t.size = 18;
		t.text = "00:00:25 增加一次";
		t.textColor = 0xff0000;
		t.x = 41;
		t.y = 595;
		return t;
	};
	_proto.count_i = function () {
		var t = new eui.Label();
		this.count = t;
		t.size = 18;
		t.text = "剩余次数  10/10";
		t.textColor = 0xffffff;
		t.x = 40;
		t.y = 629;
		return t;
	};
	_proto.rankBtn_i = function () {
		var t = new eui.Button();
		this.rankBtn = t;
		t.icon = "res/btn/rankBtn.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 371;
		t.y = 26;
		return t;
	};
	_proto.reBtn_i = function () {
		var t = new eui.Button();
		this.reBtn = t;
		t.icon = "res/btn/reflesh.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 354;
		t.y = 602;
		return t;
	};
	return JingJiPannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/jingji/JingjiRankItemSkin.exml'] = window.JingjiRankItemSkin = (function (_super) {
	__extends(JingjiRankItemSkin, _super);
	function JingjiRankItemSkin() {
		_super.call(this);
		this.skinParts = ["item_0","item_1","item_2","icon","mLvl","mName","point","rIcon","rank"];
		
		this.height = 126;
		this.width = 404;
		this.elementsContent = [this._Image1_i(),this._Group1_i(),this._Image2_i(),this.icon_i(),this._Image3_i(),this._Image4_i(),this.mLvl_i(),this.mName_i(),this.point_i(),this.rIcon_i(),this.rank_i()];
	}
	var _proto = JingjiRankItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(20,25,36,51);
		t.source = "public_json.public_item_rect_1_png";
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.x = 150;
		t.y = 43;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.item_0_i(),this.item_1_i(),this.item_2_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 5;
		return t;
	};
	_proto.item_0_i = function () {
		var t = new BaseCustComponent();
		this.item_0 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 48;
		t.y = 52;
		return t;
	};
	_proto.item_1_i = function () {
		var t = new BaseCustComponent();
		this.item_1 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 28;
		t.y = 32;
		return t;
	};
	_proto.item_2_i = function () {
		var t = new BaseCustComponent();
		this.item_2 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = -50;
		t.y = 20;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_icon_bg5_png";
		t.x = 45;
		t.y = 11;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.source = "res/images/roleIco/role_1.png";
		t.x = 50;
		t.y = 16;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_blank_2_png";
		t.x = 41;
		t.y = 95;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_lvl_blank_png";
		t.x = 35;
		t.y = 7;
		return t;
	};
	_proto.mLvl_i = function () {
		var t = new eui.Label();
		this.mLvl = t;
		t.horizontalCenter = -152;
		t.size = 18;
		t.text = "99";
		t.y = 14;
		return t;
	};
	_proto.mName_i = function () {
		var t = new eui.Label();
		this.mName = t;
		t.horizontalCenter = -115;
		t.size = 16;
		t.text = "Label";
		t.textColor = 0xFFFF00;
		t.y = 97;
		return t;
	};
	_proto.point_i = function () {
		var t = new eui.Label();
		this.point = t;
		t.size = 18;
		t.text = "积分 : 1000";
		t.textColor = 0xFFFF00;
		t.x = 149;
		t.y = 18;
		return t;
	};
	_proto.rIcon_i = function () {
		var t = new eui.Image();
		this.rIcon = t;
		t.source = "jingji_json.jingji_medal_1_png";
		t.x = 8;
		t.y = 75;
		return t;
	};
	_proto.rank_i = function () {
		var t = new NumberMC();
		this.rank = t;
		t.height = 20;
		t.type = "num_json.num_yellow_1_";
		t.width = 20;
		t.x = 17;
		t.y = 87;
		return t;
	};
	return JingjiRankItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/jingji/JingjiRankTipsSkin.exml'] = window.JingjiRankTipsSkin = (function (_super) {
	__extends(JingjiRankTipsSkin, _super);
	function JingjiRankTipsSkin() {
		_super.call(this);
		this.skinParts = ["bg","itemList","t0"];
		
		this.height = 612;
		this.width = 440;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this._Scroller1_i(),this._Image2_i(),this.t0_i()];
	}
	var _proto = JingjiRankTipsSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,0,5,2);
		t.source = "public_json.public_slice_line_png";
		t.width = 417;
		t.y = 531;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.height = 448.67;
		t.width = 404;
		t.x = 18;
		t.y = 74;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = JingjiRankItemSkin;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "jingji_json.jingji_texture_1_png";
		t.x = 73;
		t.y = 540;
		return t;
	};
	_proto.t0_i = function () {
		var t = new eui.Label();
		this.t0 = t;
		t.horizontalCenter = 0;
		t.size = 22;
		t.text = "每日00:00发送奖励";
		t.textColor = 0x4c2f27;
		t.y = 567;
		return t;
	};
	return JingjiRankTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/login/ServerItemSkin.exml'] = window.ServerItemSkin = (function (_super) {
	__extends(ServerItemSkin, _super);
	function ServerItemSkin() {
		_super.call(this);
		this.skinParts = ["stateTag","stateIcon","sName"];
		
		this.height = 43;
		this.width = 326;
		this.elementsContent = [this._Image1_i(),this.stateTag_i(),this._Group1_i()];
	}
	var _proto = ServerItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(11,11,30,19);
		t.source = "login_json.login_serverItem_png";
		t.top = 0;
		return t;
	};
	_proto.stateTag_i = function () {
		var t = new eui.Image();
		this.stateTag = t;
		t.source = "login_json.login_state_2_png";
		t.x = 264;
		t.y = -1;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.top = 0;
		t.width = 200;
		t.x = 44;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.stateIcon_i(),this.sName_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 7;
		t.horizontalAlign = "left";
		t.verticalAlign = "middle";
		return t;
	};
	_proto.stateIcon_i = function () {
		var t = new eui.Image();
		this.stateIcon = t;
		t.source = "login_json.login_state_p_2_png";
		t.x = 17;
		t.y = 11;
		return t;
	};
	_proto.sName_i = function () {
		var t = new eui.Label();
		this.sName = t;
		t.size = 16;
		t.text = "Label";
		t.x = 69;
		t.y = 15;
		return t;
	};
	return ServerItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/login/ServerTabSkin.exml'] = window.ServerTabSkin = (function (_super) {
	__extends(ServerTabSkin, _super);
	function ServerTabSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Label1_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","x",0),
					new eui.SetProperty("_Image1","y",0),
					new eui.SetProperty("_Label1","textColor",0xdfc0a5)
				])
			,
			new eui.State ("down",
				[
					new eui.SetStateProperty(this, ["hostComponent.data.icon2"],[0],this._Image1,"source")
				])
			,
			new eui.State ("disabled",
				[
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.icon"],[0],this._Image1,"source");
		eui.Binding.$bindProperties(this, ["hostComponent.data.label"],[0],this._Label1,"text");
	}
	var _proto = ServerTabSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		this._Label1 = t;
		t.horizontalCenter = -8;
		t.size = 18;
		t.verticalCenter = -1;
		return t;
	};
	return ServerTabSkin;
})(eui.Skin);generateEUI.paths['resource/exml/progressBar/progressBarSkin2.exml'] = window.progressBarSkin2 = (function (_super) {
	__extends(progressBarSkin2, _super);
	function progressBarSkin2() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = progressBarSkin2.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 0;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.anchorOffsetX = 0;
		t.left = 4;
		t.scale9Grid = new egret.Rectangle(9,2,25,13);
		t.source = "zjm_json.zjm_jyt_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.style = "l_normal";
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 12;
		t.stroke = 0.5;
		t.text = "10/10";
		t.textAlign = "center";
		t.textColor = 0xe6daac;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return progressBarSkin2;
})(eui.Skin);generateEUI.paths['resource/exml/login/ServerWinSkin.exml'] = window.ServerWinSkin = (function (_super) {
	__extends(ServerWinSkin, _super);
	function ServerWinSkin() {
		_super.call(this);
		this.skinParts = ["enterBtn","curStatus","t0","sName","marsk","tabBtn","itemList","cBtn","serverGroup","proBar"];
		
		this.currentState = "nor";
		this.width = 640;
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("nor",
				[
					new eui.SetProperty("marsk","visible",false),
					new eui.SetProperty("serverGroup","visible",false),
					new eui.SetProperty("proBar","visible",false)
				])
			,
			new eui.State ("sele",
				[
					new eui.SetProperty("proBar","visible",false)
				])
			,
			new eui.State ("bar",
				[
					new eui.SetProperty("enterBtn","visible",false),
					new eui.SetProperty("_Image2","visible",false),
					new eui.SetProperty("curStatus","visible",false),
					new eui.SetProperty("t0","visible",false),
					new eui.SetProperty("sName","visible",false),
					new eui.SetProperty("marsk","visible",false),
					new eui.SetProperty("serverGroup","visible",false)
				])
		];
	}
	var _proto = ServerWinSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.scrollEnabled = true;
		t.top = 0;
		t.width = 640;
		t.elementsContent = [this._Image1_i(),this.enterBtn_i(),this._Image2_i(),this.curStatus_i(),this._Image3_i(),this.t0_i(),this.sName_i(),this.marsk_i(),this.serverGroup_i(),this.proBar_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "res/images/bg/loginBg.jpg";
		t.top = 0;
		t.x = 0;
		return t;
	};
	_proto.enterBtn_i = function () {
		var t = new eui.Button();
		this.enterBtn = t;
		t.bottom = 126;
		t.horizontalCenter = 0;
		t.icon = "res/btn/starBtn.png";
		t.label = "Button";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "BtnIconSkin";
		t.x = 185;
		t.y = 903;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.bottom = 254;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login_json.login_blank_png";
		t.x = 131;
		t.y = 589;
		return t;
	};
	_proto.curStatus_i = function () {
		var t = new eui.Image();
		this.curStatus = t;
		t.bottom = 273;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login_json.login_state_p_2_png";
		t.x = 196.00000000000003;
		t.y = 606;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.bottom = 32;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "login_json.login_texture_png";
		t.x = 122.00000000000001;
		t.y = 821;
		return t;
	};
	_proto.t0_i = function () {
		var t = new eui.Label();
		this.t0 = t;
		t.bottom = 272;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 20;
		t.text = "当前服";
		t.x = 226;
		t.y = 605;
		return t;
	};
	_proto.sName_i = function () {
		var t = new eui.Label();
		this.sName = t;
		t.bottom = 272;
		t.left = 309;
		t.name = "sele";
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 20;
		t.text = "公共一服";
		t.textColor = 0x2aff00;
		t.x = 309;
		t.y = 605;
		return t;
	};
	_proto.marsk_i = function () {
		var t = new eui.Rect();
		this.marsk = t;
		t.bottom = 0;
		t.fillAlpha = 0.5;
		t.left = 0;
		t.right = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.top = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.serverGroup_i = function () {
		var t = new eui.Group();
		this.serverGroup = t;
		t.height = 746;
		t.scaleX = 1;
		t.scaleY = 1;
		t.width = 528;
		t.x = 56;
		t.y = 151.00000000000003;
		t.elementsContent = [this._Image4_i(),this._Scroller1_i(),this._Scroller2_i(),this.cBtn_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(331,113,131,40);
		t.source = "login_json.login_server_blank_png";
		t.top = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 593.94;
		t.width = 135;
		t.x = 41;
		t.y = 97;
		t.viewport = this.tabBtn_i();
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.itemRendererSkinName = ServerTabSkin;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.icon = "login_json.login_item_blank_png";
		t.icon2 = "login_json.login_item_blank_s_png";
		t.label = "公共一服";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.icon = "login_json.login_item_blank_png";
		t.icon2 = "login_json.login_item_blank_s_png";
		t.label = "公共一服";
		return t;
	};
	_proto._Scroller2_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 30;
		t.left = 178;
		t.right = 28;
		t.top = 101;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = ServerItemSkin;
		t.x = -1;
		t.layout = this._VerticalLayout2_i();
		t.dataProvider = this._ArrayCollection2_i();
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 5;
		return t;
	};
	_proto._ArrayCollection2_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object3_i(),this._Object4_i(),this._Object5_i()];
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.s = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.s = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.s = "null";
		return t;
	};
	_proto.cBtn_i = function () {
		var t = new eui.Image();
		this.cBtn = t;
		t.name = "nor";
		t.source = "login_json.login_closeBtn_png";
		t.x = 488;
		t.y = 43;
		return t;
	};
	_proto.proBar_i = function () {
		var t = new eui.ProgressBar();
		this.proBar = t;
		t.bottom = 242;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "progressBarSkin2";
		t.x = 84;
		t.y = 643;
		return t;
	};
	return ServerWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/luck/DailItemSkin.exml'] = window.DailItemSkin = (function (_super) {
	__extends(DailItemSkin, _super);
	function DailItemSkin() {
		_super.call(this);
		this.skinParts = ["icon","recv","lbNum","gNum"];
		
		this.height = 85;
		this.elementsContent = [this.icon_i(),this.recv_i(),this.gNum_i()];
	}
	var _proto = DailItemSkin.prototype;

	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = 0;
		t.source = "res/images/item/14.png";
		t.top = 0;
		return t;
	};
	_proto.recv_i = function () {
		var t = new eui.Image();
		this.recv = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.source = "public_json.luck_img2_png";
		t.visible = false;
		return t;
	};
	_proto.gNum_i = function () {
		var t = new eui.Group();
		this.gNum = t;
		t.x = 15;
		t.y = 66;
		t.elementsContent = [this._Image1_i(),this.lbNum_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "luck_json.luck_img6_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbNum_i = function () {
		var t = new eui.Label();
		this.lbNum = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "999";
		t.y = 1.74;
		return t;
	};
	return DailItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/luck/LuckyDailSkin.exml'] = window.LuckyDailSkin = (function (_super) {
	__extends(LuckyDailSkin, _super);
	function LuckyDailSkin() {
		_super.call(this);
		this.skinParts = ["item_1","item_5","item_4","item_3","item_2","item_6","item_7","item_8","item_9","item_10","g1","indicator","closeBtn","sBtn","countText"];
		
		this.elementsContent = [this._Group1_i(),this.countText_i()];
	}
	var _proto = LuckyDailSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.elementsContent = [this._Image1_i(),this.g1_i(),this.indicator_i(),this.closeBtn_i(),this.sBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "res/images/bg/luckBg.png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.g1_i = function () {
		var t = new eui.Group();
		this.g1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 431;
		t.horizontalCenter = 4;
		t.width = 434;
		t.y = 154.63;
		t.elementsContent = [this.item_1_i(),this.item_5_i(),this.item_4_i(),this.item_3_i(),this.item_2_i(),this.item_6_i(),this.item_7_i(),this.item_8_i(),this.item_9_i(),this.item_10_i()];
		return t;
	};
	_proto.item_1_i = function () {
		var t = new BaseCustComponent();
		this.item_1 = t;
		t.className = "DailItem";
		t.skinName = "DailItemSkin";
		t.x = 176;
		t.y = 17;
		return t;
	};
	_proto.item_5_i = function () {
		var t = new BaseCustComponent();
		this.item_5 = t;
		t.className = "DailItem";
		t.right = 97;
		t.skinName = "DailItemSkin";
		t.y = 287.37;
		return t;
	};
	_proto.item_4_i = function () {
		var t = new BaseCustComponent();
		this.item_4 = t;
		t.className = "DailItem";
		t.right = 43;
		t.skinName = "DailItemSkin";
		t.verticalCenter = 39;
		return t;
	};
	_proto.item_3_i = function () {
		var t = new BaseCustComponent();
		this.item_3 = t;
		t.className = "DailItem";
		t.right = 43;
		t.skinName = "DailItemSkin";
		t.top = 119;
		return t;
	};
	_proto.item_2_i = function () {
		var t = new BaseCustComponent();
		this.item_2 = t;
		t.className = "DailItem";
		t.right = 98;
		t.skinName = "DailItemSkin";
		t.top = 45;
		return t;
	};
	_proto.item_6_i = function () {
		var t = new BaseCustComponent();
		this.item_6 = t;
		t.className = "DailItem";
		t.skinName = "DailItemSkin";
		t.x = 176;
		t.y = 315.37;
		return t;
	};
	_proto.item_7_i = function () {
		var t = new BaseCustComponent();
		this.item_7 = t;
		t.className = "DailItem";
		t.left = 89;
		t.skinName = "DailItemSkin";
		t.y = 284.37;
		return t;
	};
	_proto.item_8_i = function () {
		var t = new BaseCustComponent();
		this.item_8 = t;
		t.className = "DailItem";
		t.left = 33;
		t.skinName = "DailItemSkin";
		t.verticalCenter = 35;
		return t;
	};
	_proto.item_9_i = function () {
		var t = new BaseCustComponent();
		this.item_9 = t;
		t.className = "DailItem";
		t.left = 33;
		t.skinName = "DailItemSkin";
		t.top = 117;
		return t;
	};
	_proto.item_10_i = function () {
		var t = new BaseCustComponent();
		this.item_10 = t;
		t.className = "DailItem";
		t.left = 89;
		t.skinName = "DailItemSkin";
		t.top = 43;
		return t;
	};
	_proto.indicator_i = function () {
		var t = new eui.Image();
		this.indicator = t;
		t.anchorOffsetX = 44;
		t.anchorOffsetY = 96;
		t.horizontalCenter = 0;
		t.rotation = 108;
		t.source = "luck_json.luck_img4_png";
		t.y = 360;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Button();
		this.closeBtn = t;
		t.icon = "luck_json.luck_img3_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 470.55;
		t.y = 156.4;
		return t;
	};
	_proto.sBtn_i = function () {
		var t = new eui.Button();
		this.sBtn = t;
		t.horizontalCenter = 0;
		t.icon = "luck_json.luck_img5_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.y = 602;
		return t;
	};
	_proto.countText_i = function () {
		var t = new eui.Label();
		this.countText = t;
		t.style = "l_normal";
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "剩余次数:0";
		t.textColor = 0x2aff00;
		t.y = 671.32;
		return t;
	};
	return LuckyDailSkin;
})(eui.Skin);generateEUI.paths['resource/exml/main/FightPowerChangeViewSkin.exml'] = window.FightPowerChangeViewSkin = (function (_super) {
	__extends(FightPowerChangeViewSkin, _super);
	function FightPowerChangeViewSkin() {
		_super.call(this);
		this.skinParts = ["change","fight"];
		
		this.height = 72;
		this.width = 367;
		this.elementsContent = [this._Image1_i(),this.change_i(),this.fight_i()];
	}
	var _proto = FightPowerChangeViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "num_json.pro_bg_png";
		return t;
	};
	_proto.change_i = function () {
		var t = new NumberMC();
		this.change = t;
		t.height = 20;
		t.width = 20;
		t.x = 192;
		t.y = 48;
		return t;
	};
	_proto.fight_i = function () {
		var t = new BaseCustComponent();
		this.fight = t;
		t.className = "FightPowerRoll";
		t.skinName = "empty";
		t.x = 161;
		t.y = 26;
		return t;
	};
	return FightPowerChangeViewSkin;
})(eui.Skin);generateEUI.paths['resource/exml/main/MainBtnDownSkin.exml'] = window.MainBtnDownSkin = (function (_super) {
	__extends(MainBtnDownSkin, _super);
	function MainBtnDownSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.height = 100;
		this.width = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("iconDisplay","scaleX",0.9),
					new eui.SetProperty("iconDisplay","scaleY",0.9),
					new eui.SetProperty("iconDisplay","verticalCenter",-11),
					new eui.SetProperty("","width",100),
					new eui.SetProperty("","height",100)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = MainBtnDownSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "zjm_json.zjm_js_png";
		t.touchEnabled = false;
		t.visible = false;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 15;
		t.horizontalCenter = 0;
		t.size = 18;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.visible = false;
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	return MainBtnDownSkin;
})(eui.Skin);generateEUI.paths['resource/exml/main/MainBtnDownSkin2.exml'] = window.MainBtnDownSkin2 = (function (_super) {
	__extends(MainBtnDownSkin2, _super);
	function MainBtnDownSkin2() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.height = 100;
		this.width = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("iconDisplay","scaleX",1),
					new eui.SetProperty("iconDisplay","scaleY",1),
					new eui.SetProperty("iconDisplay","verticalCenter",0),
					new eui.SetProperty("","width",100),
					new eui.SetProperty("","height",100)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = MainBtnDownSkin2.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "zjm_json.zjm_js_png";
		t.touchEnabled = false;
		t.visible = false;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 15;
		t.horizontalCenter = 0;
		t.size = 18;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		t.visible = false;
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	return MainBtnDownSkin2;
})(eui.Skin);generateEUI.paths['resource/exml/main/MainBtnIconSkin.exml'] = window.MainBtnIconSkin = (function (_super) {
	__extends(MainBtnIconSkin, _super);
	function MainBtnIconSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.height = 80;
		this.width = 80;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source",""),
					new eui.SetProperty("iconDisplay","scaleX",0.8),
					new eui.SetProperty("iconDisplay","scaleY",0.8)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = MainBtnIconSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "";
		t.touchEnabled = false;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 15;
		t.horizontalCenter = 0;
		t.size = 18;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.touchEnabled = false;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.source = "zjm_json.zjm_jingji_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	return MainBtnIconSkin;
})(eui.Skin);generateEUI.paths['resource/exml/main/MainCreateRoleBtnSkin.exml'] = window.MainCreateRoleBtnSkin = (function (_super) {
	__extends(MainCreateRoleBtnSkin, _super);
	function MainCreateRoleBtnSkin() {
		_super.call(this);
		this.skinParts = ["img"];
		
		this.elementsContent = [this.img_i()];
	}
	var _proto = MainCreateRoleBtnSkin.prototype;

	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.source = "zjm_json.zjm_createrole_bg_png";
		return t;
	};
	return MainCreateRoleBtnSkin;
})(eui.Skin);generateEUI.paths['resource/exml/progressBar/progressBarSkin1.exml'] = window.progressBarSkin1 = (function (_super) {
	__extends(progressBarSkin1, _super);
	function progressBarSkin1() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = progressBarSkin1.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "zjm_json.zjm_xuetiao_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.anchorOffsetX = 0;
		t.left = 4;
		t.scale9Grid = new egret.Rectangle(9,2,25,13);
		t.source = "zjm_json.zjm_xuetiao_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.style = "l_normal";
		t.fontFamily = "Tahoma";
		t.right = 5;
		t.size = 13;
		t.stroke = 0;
		t.text = "10/10";
		t.textAlign = "center";
		t.textColor = 0xfff1e6;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return progressBarSkin1;
})(eui.Skin);generateEUI.paths['resource/exml/main/MainUICoverSkin.exml'] = window.MainUICoverSkin = (function (_super) {
	__extends(MainUICoverSkin, _super);
	function MainUICoverSkin() {
		_super.call(this);
		this.skinParts = ["imgRole","btnVip","fightNum","progressBar1","lbName","lbCoin","lbLevel","lbGold","btn1","btn2","btn3","btn4","btn5","group1","progressBar2","main2"];
		
		this.height = 1136;
		this.maxWidth = 580;
		this.width = 640;
		this.elementsContent = [this._Group1_i(),this.main2_i()];
	}
	var _proto = MainUICoverSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 82;
		t.horizontalCenter = 0;
		t.top = -1;
		t.width = 640;
		t.elementsContent = [this._Image1_i(),this.imgRole_i(),this.btnVip_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this.fightNum_i(),this.progressBar1_i(),this.lbName_i(),this.lbCoin_i(),this.lbLevel_i(),this.lbGold_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "zjm_json.zjm_gn_rect_png";
		t.x = 1;
		t.y = 0;
		return t;
	};
	_proto.imgRole_i = function () {
		var t = new eui.Image();
		this.imgRole = t;
		t.source = "zjm_json.zjm_touxiang_1_png";
		t.x = 8;
		t.y = 7.2;
		return t;
	};
	_proto.btnVip_i = function () {
		var t = new eui.Button();
		this.btnVip = t;
		t.height = 34;
		t.icon = "zjm_json.zjm_vip_1_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.width = 43;
		t.x = 102;
		t.y = 3;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "zjm_json.zjm_gold_png";
		t.x = 475;
		t.y = 8;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "zjm_json.zjm_jewel_png";
		t.x = 477;
		t.y = 43;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "zjm_json.zjm_add_png";
		t.x = 608;
		t.y = 9;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "zjm_json.zjm_add_png";
		t.x = 608;
		t.y = 42;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "zjm_json.zjm_lb_zl_png";
		t.x = 287;
		t.y = 11;
		return t;
	};
	_proto.fightNum_i = function () {
		var t = new NumberMC();
		this.fightNum = t;
		t.type = "zjm_num_";
		t.x = 345.5;
		t.y = 14;
		return t;
	};
	_proto.progressBar1_i = function () {
		var t = new eui.ProgressBar();
		this.progressBar1 = t;
		t.maximum = 60;
		t.skinName = "progressBarSkin1";
		t.slideDuration = 0;
		t.value = 100;
		t.x = 174;
		t.y = 53.4;
		return t;
	};
	_proto.lbName_i = function () {
		var t = new eui.Label();
		this.lbName = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 18;
		t.text = "主角名字";
		t.textColor = 0x4c2f27;
		t.x = 145.6;
		t.y = 13;
		return t;
	};
	_proto.lbCoin_i = function () {
		var t = new eui.Label();
		this.lbCoin = t;
		t.size = 18;
		t.text = "160,200";
		t.textColor = 0xfff1e6;
		t.x = 509;
		t.y = 13.46;
		return t;
	};
	_proto.lbLevel_i = function () {
		var t = new eui.Label();
		this.lbLevel = t;
		t.size = 16;
		t.text = "等级:109";
		t.textColor = 0xfff1e6;
		t.x = 103.5;
		t.y = 55.4;
		return t;
	};
	_proto.lbGold_i = function () {
		var t = new eui.Label();
		this.lbGold = t;
		t.size = 18;
		t.text = "260,20";
		t.textColor = 0xfff1e6;
		t.x = 510;
		t.y = 47.56;
		return t;
	};
	_proto.main2_i = function () {
		var t = new eui.Group();
		this.main2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.height = 118;
		t.horizontalCenter = 7;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.width = 640;
		t.elementsContent = [this.group1_i(),this.progressBar2_i()];
		return t;
	};
	_proto.group1_i = function () {
		var t = new eui.Group();
		this.group1 = t;
		t.bottom = 0;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.width = 640;
		t.x = 0;
		t.elementsContent = [this._Image7_i(),this.btn1_i(),this.btn2_i(),this.btn3_i(),this.btn4_i(),this.btn5_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "zjm_json.zjm_down_rect_png";
		t.touchEnabled = false;
		t.x = -32;
		t.y = 1.39;
		return t;
	};
	_proto.btn1_i = function () {
		var t = new eui.Button();
		this.btn1 = t;
		t.height = 82;
		t.icon = "zjm_json.zjm_zc_png";
		t.label = "";
		t.name = "GUAJI";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "MainBtnDownSkin2";
		t.width = 115;
		t.x = 15;
		t.y = 66.33;
		return t;
	};
	_proto.btn2_i = function () {
		var t = new eui.Button();
		this.btn2 = t;
		t.icon = "zjm_json.zjm_js_png";
		t.label = "";
		t.name = "ROLE";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "MainBtnDownSkin";
		t.x = 116.39;
		t.y = 35.6;
		return t;
	};
	_proto.btn3_i = function () {
		var t = new eui.Button();
		this.btn3 = t;
		t.icon = "zjm_json.zjm_mx_png";
		t.label = "";
		t.name = "STRENGTH";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "MainBtnDownSkin";
		t.x = 239.68;
		t.y = 35.6;
		return t;
	};
	_proto.btn4_i = function () {
		var t = new eui.Button();
		this.btn4 = t;
		t.icon = "zjm_json.zjm_cw_png";
		t.label = "";
		t.name = "PET";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "MainBtnDownSkin";
		t.x = 361.68;
		t.y = 35.6;
		return t;
	};
	_proto.btn5_i = function () {
		var t = new eui.Button();
		this.btn5 = t;
		t.icon = "zjm_json.zjm_bb_png";
		t.label = "";
		t.name = "BAG";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "MainBtnDownSkin";
		t.x = 471.69;
		t.y = 35.6;
		return t;
	};
	_proto.progressBar2_i = function () {
		var t = new eui.ProgressBar();
		this.progressBar2 = t;
		t.horizontalCenter = 21;
		t.skinName = "progressBarSkin2";
		t.slideDuration = 0;
		t.value = 100;
		t.y = 104.33;
		return t;
	};
	return MainUICoverSkin;
})(eui.Skin);generateEUI.paths['resource/exml/main/MainUISkin.exml'] = window.MainUISkin = (function (_super) {
	__extends(MainUISkin, _super);
	function MainUISkin() {
		_super.call(this);
		this.skinParts = ["gBtnUp","gBtnLeft","gBtnRight","buffIcon","buffGroup","infoGroup","mailBtn","gjPro","passBtn","chatLab","sysLab","cGroup","chatGroup"];
		
		this.height = 1136;
		this.maxWidth = 580;
		this.width = 640;
		this.elementsContent = [this.gBtnUp_i(),this.gBtnLeft_i(),this.gBtnRight_i(),this.infoGroup_i(),this.mailBtn_i(),this.passBtn_i(),this.chatGroup_i()];
	}
	var _proto = MainUISkin.prototype;

	_proto.gBtnUp_i = function () {
		var t = new eui.Group();
		this.gBtnUp = t;
		t.right = 8;
		t.top = 161;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalAlign = "right";
		t.orientation = "rows";
		t.requestedColumnCount = 5;
		return t;
	};
	_proto.gBtnLeft_i = function () {
		var t = new eui.Group();
		this.gBtnLeft = t;
		t.left = 8;
		t.top = 340;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto.gBtnRight_i = function () {
		var t = new eui.Group();
		this.gBtnRight = t;
		t.right = 8;
		t.top = 340;
		t.layout = this._VerticalLayout2_i();
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto.infoGroup_i = function () {
		var t = new eui.Group();
		this.infoGroup = t;
		t.horizontalCenter = 0;
		t.top = 88;
		t.width = 640;
		t.elementsContent = [this.buffGroup_i()];
		return t;
	};
	_proto.buffGroup_i = function () {
		var t = new eui.Group();
		this.buffGroup = t;
		t.touchEnabled = false;
		t.x = 5;
		t.y = 2;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.buffIcon_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.buffIcon_i = function () {
		var t = new eui.Image();
		this.buffIcon = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zjm_json.zjm_buff_png";
		return t;
	};
	_proto.mailBtn_i = function () {
		var t = new eui.Button();
		this.mailBtn = t;
		t.anchorOffsetX = 32;
		t.anchorOffsetY = 32;
		t.bottom = 276;
		t.height = 65;
		t.icon = "zjm_json.zjm_mail_png";
		t.label = "Button";
		t.left = 12;
		t.name = "EMAIL";
		t.skinName = "BtnIconSkin";
		t.width = 65;
		return t;
	};
	_proto.passBtn_i = function () {
		var t = new eui.Group();
		this.passBtn = t;
		t.bottom = 207;
		t.height = 124;
		t.name = "CHUANGGUAN";
		t.right = 0;
		t.scrollEnabled = false;
		t.touchChildren = false;
		t.touchEnabled = true;
		t.width = 129;
		t.elementsContent = [this._Image1_i(),this.gjPro_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zjm_json.zjm_tzgq_png";
		t.x = 4;
		return t;
	};
	_proto.gjPro_i = function () {
		var t = new eui.Label();
		this.gjPro = t;
		t.name = "GJPRO";
		t.right = 7;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 16;
		t.stroke = 1;
		t.text = "0/30";
		t.textColor = 0x00ff0c;
		t.y = 26;
		return t;
	};
	_proto.chatGroup_i = function () {
		var t = new eui.Group();
		this.chatGroup = t;
		t.anchorOffsetY = 0;
		t.bottom = 82;
		t.height = 123;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.width = 600;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this._Image4_i(),this.cGroup_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(4,4,31,15);
		t.source = "zjm_json.zjm_chat_rect_png";
		t.top = 0;
		t.touchEnabled = false;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.bottom = 50;
		t.left = 6;
		t.right = 6;
		t.scale9Grid = new egret.Rectangle(4,4,13,9);
		t.source = "zjm_json.zjm_chat_border_png";
		t.top = 6;
		t.touchEnabled = false;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.bottom = 50;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(0,1,1,4);
		t.source = "zjm_json.zjm_chat_line_png";
		t.top = 6;
		t.touchEnabled = false;
		return t;
	};
	_proto.cGroup_i = function () {
		var t = new eui.Group();
		this.cGroup = t;
		t.bottom = 54;
		t.name = "CHAT";
		t.scrollEnabled = true;
		t.top = 9;
		t.width = 583;
		t.x = 10;
		t.elementsContent = [this.chatLab_i(),this.sysLab_i()];
		return t;
	};
	_proto.chatLab_i = function () {
		var t = new eui.Label();
		this.chatLab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.lineSpacing = 3;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 15;
		t.text = "欢迎来到冒险大陆";
		t.textColor = 0xffffff;
		t.touchEnabled = true;
		t.width = 287;
		t.x = 0;
		t.y = 1;
		return t;
	};
	_proto.sysLab_i = function () {
		var t = new eui.Label();
		this.sysLab = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 51;
		t.lineSpacing = 3;
		t.size = 15;
		t.text = "";
		t.width = 287;
		t.x = 293;
		t.y = 0;
		return t;
	};
	return MainUISkin;
})(eui.Skin);generateEUI.paths['resource/exml/main/MapLoadingViewSkin.exml'] = window.MapLoadingViewSkin = (function (_super) {
	__extends(MapLoadingViewSkin, _super);
	function MapLoadingViewSkin() {
		_super.call(this);
		this.skinParts = ["tips","percent","progress"];
		
		this.height = 1136;
		this.width = 640;
		this.elementsContent = [this._Rect1_i(),this._Group1_i()];
	}
	var _proto = MapLoadingViewSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.elementsContent = [this._Image1_i(),this.tips_i(),this.progress_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "zjm_json.zjm_gc_pro_png";
		return t;
	};
	_proto.tips_i = function () {
		var t = new eui.Label();
		this.tips = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "小剑齿常常因为在磨牙不愿意出战";
		t.y = 62;
		return t;
	};
	_proto.progress_i = function () {
		var t = new eui.Group();
		this.progress = t;
		t.anchorOffsetX = 30;
		t.x = 0;
		t.y = -43;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this.percent_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "zjm_json.zjm_gc_icon_png";
		t.y = 27;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "zjm_json.zjm_gc_bubble_png";
		t.x = 10;
		return t;
	};
	_proto.percent_i = function () {
		var t = new eui.Label();
		this.percent = t;
		t.horizontalCenter = 5;
		t.size = 16;
		t.text = "0%";
		t.textColor = 0x221308;
		t.y = 4;
		return t;
	};
	return MapLoadingViewSkin;
})(eui.Skin);generateEUI.paths['resource/exml/novice/NoviceGuideArrowSkin.exml'] = window.NoviceGuideArrowSkin = (function (_super) {
	__extends(NoviceGuideArrowSkin, _super);
	function NoviceGuideArrowSkin() {
		_super.call(this);
		this.skinParts = ["text"];
		
		this.elementsContent = [this._Image1_i(),this.text_i()];
		this.states = [
			new eui.State ("l",
				[
				])
			,
			new eui.State ("r",
				[
					new eui.SetProperty("_Image1","scaleX",-1),
					new eui.SetProperty("_Image1","x",201),
					new eui.SetProperty("text","horizontalCenter",-39),
					new eui.SetProperty("text","verticalCenter",27.5)
				])
		];
	}
	var _proto = NoviceGuideArrowSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "res/images/guide_txt.png";
		return t;
	};
	_proto.text_i = function () {
		var t = new eui.Label();
		this.text = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 39.5;
		t.lineSpacing = 6;
		t.size = 16;
		t.text = "请点击升级";
		t.textColor = 0x000000;
		t.verticalCenter = 27.5;
		t.width = 97;
		return t;
	};
	return NoviceGuideArrowSkin;
})(eui.Skin);generateEUI.paths['resource/exml/novice/NoviceGuideSkin.exml'] = window.NoviceGuideSkin = (function (_super) {
	__extends(NoviceGuideSkin, _super);
	function NoviceGuideSkin() {
		_super.call(this);
		this.skinParts = ["text"];
		
		this.elementsContent = [this._Image1_i(),this.text_i()];
	}
	var _proto = NoviceGuideSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "win_json.win_xt_png";
		return t;
	};
	_proto.text_i = function () {
		var t = new eui.Label();
		this.text = t;
		t.horizontalCenter = 0;
		t.text = "点我";
		t.textColor = 0x60e519;
		t.verticalCenter = 0;
		return t;
	};
	return NoviceGuideSkin;
})(eui.Skin);generateEUI.paths['resource/exml/npc/NPCTalkWinSkin.exml'] = window.NPCTalkWinSkin = (function (_super) {
	__extends(NPCTalkWinSkin, _super);
	function NPCTalkWinSkin() {
		_super.call(this);
		this.skinParts = ["labTalk","closeBtn","submitBtn","npcName","npcBody","iG"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = NPCTalkWinSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this._Image1_i(),this.labTalk_i(),this.closeBtn_i(),this.submitBtn_i(),this._Image2_i(),this._Image3_i(),this.npcName_i(),this.npcBody_i(),this._Image4_i(),this.iG_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "res/images/bg/missionBg.png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.labTalk_i = function () {
		var t = new eui.Label();
		this.labTalk = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.lineSpacing = 16;
		t.size = 16;
		t.text = "";
		t.textColor = 0x4c2f27;
		t.width = 271;
		t.x = 280;
		t.y = 78;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.right = 29;
		t.source = "quest_json.quest_closeBtn_png";
		t.top = 26;
		return t;
	};
	_proto.submitBtn_i = function () {
		var t = new eui.Image();
		this.submitBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 30;
		t.horizontalCenter = 109.5;
		t.source = "quest_json.quest_recv_btn_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 108;
		t.source = "quest_json.quest_texture_1_png";
		t.verticalCenter = -6.5;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "quest_json.quest_img_1_png";
		t.x = 277.5;
		t.y = 31.5;
		return t;
	};
	_proto.npcName_i = function () {
		var t = new eui.Image();
		this.npcName = t;
		t.source = "";
		t.x = 319;
		t.y = 35;
		return t;
	};
	_proto.npcBody_i = function () {
		var t = new eui.Image();
		this.npcBody = t;
		t.source = "";
		t.x = 126;
		t.y = 294;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 109.5;
		t.scale9Grid = new egret.Rectangle(19,12,121,74);
		t.source = "public_json.public_rect_1_png";
		t.width = 342;
		t.y = 230;
		return t;
	};
	_proto.iG_i = function () {
		var t = new eui.Group();
		this.iG = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 67;
		t.horizontalCenter = 109.5;
		t.verticalCenter = 63.5;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	return NPCTalkWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/offLine/OffLineAwardSkin.exml'] = window.OffLineAwardSkin = (function (_super) {
	__extends(OffLineAwardSkin, _super);
	function OffLineAwardSkin() {
		_super.call(this);
		this.skinParts = ["time","t0","t1","t2","t3","t4","g0","g1","e0","e1","i0","i1","full","vipBtn"];
		
		this.currentState = "nor";
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.time_i(),this.t0_i(),this.t1_i(),this.t2_i(),this.t3_i(),this.t4_i(),this.g0_i(),this.g1_i(),this.e0_i(),this.e1_i(),this.i0_i(),this.i1_i(),this.full_i(),this._Image5_i(),this._Image6_i(),this.vipBtn_i()];
		this.states = [
			new eui.State ("nor",
				[
				])
			,
			new eui.State ("max",
				[
					new eui.SetProperty("t3","x",459),
					new eui.SetProperty("t4","visible",false),
					new eui.SetProperty("g0","horizontalCenter",156),
					new eui.SetProperty("g1","visible",false),
					new eui.SetProperty("e0","horizontalCenter",156),
					new eui.SetProperty("e1","visible",false),
					new eui.SetProperty("i0","horizontalCenter",156),
					new eui.SetProperty("i1","visible",false)
				])
		];
	}
	var _proto = OffLineAwardSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -19;
		t.source = "res/images/bg/offlineAwardBg.png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_arrow_1_png";
		t.x = 459;
		t.y = 289;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_arrow_1_png";
		t.x = 459;
		t.y = 366;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_arrow_1_png";
		t.x = 459;
		t.y = 327;
		return t;
	};
	_proto.time_i = function () {
		var t = new eui.Label();
		this.time = t;
		t.left = 435;
		t.size = 18;
		t.text = "1天15小时58分";
		t.textColor = 0x00a2ff;
		t.y = 166;
		return t;
	};
	_proto.t0_i = function () {
		var t = new eui.Label();
		this.t0 = t;
		t.bold = true;
		t.size = 16;
		t.text = "金币";
		t.textColor = 0x4c2f27;
		t.x = 294;
		t.y = 291;
		return t;
	};
	_proto.t1_i = function () {
		var t = new eui.Label();
		this.t1 = t;
		t.bold = true;
		t.size = 16;
		t.text = "经验";
		t.textColor = 0x4C2F27;
		t.x = 294;
		t.y = 329;
		return t;
	};
	_proto.t2_i = function () {
		var t = new eui.Label();
		this.t2 = t;
		t.bold = true;
		t.size = 16;
		t.text = "装备";
		t.textColor = 0x4C2F27;
		t.x = 294;
		t.y = 368;
		return t;
	};
	_proto.t3_i = function () {
		var t = new eui.Label();
		this.t3 = t;
		t.bold = true;
		t.size = 16;
		t.text = "离线获得";
		t.textColor = 0x4C2F27;
		t.x = 360;
		t.y = 250;
		return t;
	};
	_proto.t4_i = function () {
		var t = new eui.Label();
		this.t4 = t;
		t.bold = true;
		t.size = 16;
		t.text = "VIP1加成";
		t.textColor = 0x4C2F27;
		t.x = 518;
		t.y = 250;
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Label();
		this.g0 = t;
		t.bold = true;
		t.horizontalCenter = 37;
		t.size = 16;
		t.text = "2500";
		t.textColor = 0x4C2F27;
		t.y = 291;
		return t;
	};
	_proto.g1_i = function () {
		var t = new eui.Label();
		this.g1 = t;
		t.bold = true;
		t.horizontalCenter = 195;
		t.size = 16;
		t.text = "6000";
		t.textColor = 0x2aff00;
		t.y = 291;
		return t;
	};
	_proto.e0_i = function () {
		var t = new eui.Label();
		this.e0 = t;
		t.bold = true;
		t.horizontalCenter = 37;
		t.size = 16;
		t.text = "2500";
		t.textColor = 0x4C2F27;
		t.y = 329;
		return t;
	};
	_proto.e1_i = function () {
		var t = new eui.Label();
		this.e1 = t;
		t.bold = true;
		t.horizontalCenter = 195;
		t.size = 16;
		t.text = "6000";
		t.textColor = 0x2AFF00;
		t.y = 329;
		return t;
	};
	_proto.i0_i = function () {
		var t = new eui.Label();
		this.i0 = t;
		t.bold = true;
		t.horizontalCenter = 37;
		t.size = 16;
		t.text = "2500";
		t.textColor = 0x4C2F27;
		t.y = 368;
		return t;
	};
	_proto.i1_i = function () {
		var t = new eui.Label();
		this.i1 = t;
		t.bold = true;
		t.horizontalCenter = 195;
		t.size = 16;
		t.text = "6000";
		t.textColor = 0x2AFF00;
		t.x = 10;
		t.y = 368;
		return t;
	};
	_proto.full_i = function () {
		var t = new eui.Label();
		this.full = t;
		t.bold = true;
		t.size = 16;
		t.text = "（背包已满）";
		t.textColor = 0xff0000;
		t.x = 345;
		t.y = 412;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "offLine_json.offLine_texture_2_png";
		t.x = 486;
		t.y = 243;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "offLine_json.offLine_texture_1_png";
		t.x = 343;
		t.y = 202;
		return t;
	};
	_proto.vipBtn_i = function () {
		var t = new eui.Button();
		this.vipBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 31;
		t.icon = "offLine_json.offLine_texture_0_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.width = 110;
		t.x = 484;
		t.y = 404;
		return t;
	};
	return OffLineAwardSkin;
})(eui.Skin);generateEUI.paths['resource/exml/pet/ActivateRectSkin.exml'] = window.ActivateRectSkin = (function (_super) {
	__extends(ActivateRectSkin, _super);
	var ActivateRectSkin$Skin2 = 	(function (_super) {
		__extends(ActivateRectSkin$Skin2, _super);
		function ActivateRectSkin$Skin2() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = ActivateRectSkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "res/btn/get_1.png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return ActivateRectSkin$Skin2;
	})(eui.Skin);

	function ActivateRectSkin() {
		_super.call(this);
		this.skinParts = ["icon","lbNe","lbHave","btn"];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Group1_i()];
	}
	var _proto = ActivateRectSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 125;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(19,12,121,74);
		t.source = "public_json.public_rect_1_png";
		t.verticalCenter = 0;
		t.width = 440;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "pet_json.pet_jhfs_png";
		t.y = 7;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 8;
		t.y = 34;
		t.elementsContent = [this._Image3_i(),this.icon_i(),this.lbNe_i(),this.lbHave_i(),this.btn_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(11,10,67,66);
		t.source = "pet_json.pet_rect_4_png";
		t.width = 425;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.icon_i = function () {
		var t = new BaseCustComponent();
		this.icon = t;
		t.className = "ItemBase";
		t.left = 2;
		t.skinName = "ItembaseSkin";
		t.verticalCenter = 0;
		return t;
	};
	_proto.lbNe_i = function () {
		var t = new eui.Label();
		this.lbNe = t;
		t.size = 20;
		t.text = "道具名称";
		t.x = 90;
		t.y = 13;
		return t;
	};
	_proto.lbHave_i = function () {
		var t = new eui.Label();
		this.lbHave = t;
		t.size = 18;
		t.text = "20/30";
		t.x = 90;
		t.y = 48;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.label = "";
		t.verticalCenter = 0.5;
		t.x = 304;
		t.skinName = ActivateRectSkin$Skin2;
		return t;
	};
	return ActivateRectSkin;
})(eui.Skin);generateEUI.paths['resource/exml/pet/ChangeNameSkin.exml'] = window.ChangeNameSkin = (function (_super) {
	__extends(ChangeNameSkin, _super);
	function ChangeNameSkin() {
		_super.call(this);
		this.skinParts = ["imgChange","num","lbNe"];
		
		this.elementsContent = [this._Image1_i(),this.imgChange_i(),this._Image2_i(),this.num_i(),this.lbNe_i()];
	}
	var _proto = ChangeNameSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(11,11,23,15);
		t.source = "pet_json.pet_info_pet_name_png";
		t.verticalCenter = 0;
		t.width = 225;
		return t;
	};
	_proto.imgChange_i = function () {
		var t = new eui.Image();
		this.imgChange = t;
		t.right = 2;
		t.source = "pet_json.pet_img_info_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "pet_json.pet_lv_png";
		t.x = 13;
		t.y = 11;
		return t;
	};
	_proto.num_i = function () {
		var t = new NumberMC();
		this.num = t;
		t.height = 11;
		t.type = "pet_num_";
		t.x = 45.68;
		t.y = 11;
		return t;
	};
	_proto.lbNe_i = function () {
		var t = new eui.Label();
		this.lbNe = t;
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "名称";
		t.verticalCenter = 0;
		return t;
	};
	return ChangeNameSkin;
})(eui.Skin);generateEUI.paths['resource/exml/pet/PetInfoItemSkin.exml'] = window.PetInfoItemSkin = (function (_super) {
	__extends(PetInfoItemSkin, _super);
	function PetInfoItemSkin() {
		_super.call(this);
		this.skinParts = ["imgBg","icon","have"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = PetInfoItemSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.imgBg_i(),this.icon_i(),this.have_i()];
		return t;
	};
	_proto.imgBg_i = function () {
		var t = new eui.Image();
		this.imgBg = t;
		t.source = "pet_json.pet_icon_bg1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = 0;
		t.source = "pet_json.pet_icon_bg1_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.have_i = function () {
		var t = new eui.Image();
		this.have = t;
		t.left = 0;
		t.source = "pet_json.pet_img_xiedai_png";
		t.top = 0;
		return t;
	};
	return PetInfoItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/pet/PetSkillItemSkin.exml'] = window.PetSkillItemSkin = (function (_super) {
	__extends(PetSkillItemSkin, _super);
	function PetSkillItemSkin() {
		_super.call(this);
		this.skinParts = ["icon","lbNe"];
		
		this.elementsContent = [this.icon_i(),this.lbNe_i()];
	}
	var _proto = PetSkillItemSkin.prototype;

	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = 0;
		t.source = "res/images/petskill/2.png";
		t.top = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbNe_i = function () {
		var t = new eui.Label();
		this.lbNe = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "10星解锁";
		t.textColor = 0xbcbcbc;
		t.x = 4;
		t.y = 83;
		return t;
	};
	return PetSkillItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/pet/PetInfoViewSkin.exml'] = window.PetInfoViewSkin = (function (_super) {
	__extends(PetInfoViewSkin, _super);
	function PetInfoViewSkin() {
		_super.call(this);
		this.skinParts = ["zdl","progressBar","mModel","list","btnAll","btnAttr","lbStar","gStar","lbName","btnState","btn","skill0","skill1","skill2","skill3","listStar","tabBtn","propList","expend"];
		
		this.currentState = "up";
		this.height = 565;
		this.width = 510;
		this.elementsContent = [this._Group2_i(),this.tabBtn_i(),this._Group3_i(),this.expend_i()];
		this.skill0_i();
		
		this.skill1_i();
		
		this.skill2_i();
		
		this.skill3_i();
		
		this.listStar_i();
		
		this.states = [
			new eui.State ("act",
				[
					new eui.SetProperty("zdl","visible",false),
					new eui.SetProperty("progressBar","y",329.33),
					new eui.SetProperty("progressBar","visible",false),
					new eui.SetProperty("mModel","y",277.03),
					new eui.SetProperty("btnAll","x",423),
					new eui.SetProperty("btnAttr","x",25),
					new eui.SetProperty("gStar","x",317.01),
					new eui.SetProperty("gStar","y",154.33),
					new eui.SetProperty("_Group1","horizontalCenter",0.5),
					new eui.SetProperty("_Group1","y",321),
					new eui.SetProperty("btnState","visible",false),
					new eui.SetProperty("propList","left",-2),
					new eui.SetProperty("propList","right",187),
					new eui.SetProperty("propList","top",9),
					new eui.SetProperty("propList","bottom",7)
				])
			,
			new eui.State ("up",
				[
					new eui.SetProperty("progressBar","slideDuration",0),
					new eui.SetProperty("_Group1","horizontalCenter",0.5),
					new eui.SetProperty("_Group1","y",298),
					new eui.SetProperty("btnState","y",481),
					new eui.SetProperty("btnState","visible",true),
					new eui.SetProperty("btnState","icon","pet_json.pet_btn_cz_png"),
					new eui.SetProperty("btn","icon","pet_json.pet_btn_cwsj_png"),
					new eui.SetProperty("propList","left",2),
					new eui.SetProperty("propList","right",28),
					new eui.SetProperty("propList","top",8),
					new eui.SetProperty("propList","bottom",8)
				])
			,
			new eui.State ("evo",
				[
					new eui.AddItems("skill0","_Group2",1,""),
					new eui.AddItems("skill1","_Group2",1,""),
					new eui.AddItems("skill2","_Group2",1,""),
					new eui.AddItems("skill3","_Group2",1,""),
					new eui.AddItems("listStar","_Group2",1,""),
					new eui.SetProperty("progressBar","visible",false),
					new eui.SetProperty("btnAll","visible",false),
					new eui.SetProperty("btnAttr","visible",false),
					new eui.SetProperty("lbName","textColor",0xffd823),
					new eui.SetProperty("_Group1","horizontalCenter",0.5),
					new eui.SetProperty("_Group1","y",298),
					new eui.SetProperty("btnState","visible",false),
					new eui.SetProperty("btn","icon","pet_json.pet_btn_cwjinh_png"),
					new eui.SetProperty("propList","left",2),
					new eui.SetProperty("propList","right",28),
					new eui.SetProperty("propList","top",8),
					new eui.SetProperty("propList","bottom",8)
				])
		];
	}
	var _proto = PetInfoViewSkin.prototype;

	_proto._Group2_i = function () {
		var t = new eui.Group();
		this._Group2 = t;
		t.x = 2;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.zdl_i(),this._Image3_i(),this.progressBar_i(),this.mModel_i(),this._Scroller1_i(),this.btnAll_i(),this.btnAttr_i(),this.gStar_i(),this._Group1_i(),this.btnState_i(),this.btn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "res/images/bg/petBg.png";
		t.y = 94.98;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 565;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.width = 506;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new BaseCustComponent();
		this.zdl = t;
		t.anchorOffsetY = 0;
		t.className = "ZdlPrint";
		t.horizontalCenter = 0;
		t.skinName = "ZdlPrintSkin";
		t.y = 100.98;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "public_json.public_slice_line_png";
		t.width = 504;
		t.x = 1;
		t.y = 89;
		return t;
	};
	_proto.progressBar_i = function () {
		var t = new eui.ProgressBar();
		this.progressBar = t;
		t.skinName = "progressBarSkin5";
		t.slideDuration = 0;
		t.value = 100;
		t.x = 117;
		t.y = 330.33;
		return t;
	};
	_proto.mModel_i = function () {
		var t = new BaseCustComponent();
		this.mModel = t;
		t.className = "UIAvatar";
		t.x = 253;
		t.y = 282.03;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.x = 3;
		t.y = 6;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.itemRendererSkinName = PetInfoItemSkin;
		t.x = 19;
		t.y = 42;
		t.layout = this._HorizontalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto.btnAll_i = function () {
		var t = new eui.Button();
		this.btnAll = t;
		t.height = 63;
		t.icon = "pet_json.pet_btn_zl_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.width = 58;
		t.x = 423;
		t.y = 120;
		return t;
	};
	_proto.btnAttr_i = function () {
		var t = new eui.Button();
		this.btnAttr = t;
		t.height = 64;
		t.icon = "pet_json.pet_btn_qsx_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.width = 61;
		t.x = 25;
		t.y = 120;
		return t;
	};
	_proto.gStar_i = function () {
		var t = new eui.Group();
		this.gStar = t;
		t.x = 342.01;
		t.y = 162.33;
		t.elementsContent = [this._Image4_i(),this.lbStar_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "pet_json.pet_img_xx_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbStar_i = function () {
		var t = new eui.Label();
		this.lbStar = t;
		t.horizontalCenter = 0.5;
		t.size = 18;
		t.text = "99";
		t.verticalCenter = 4;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		this._Group1 = t;
		t.horizontalCenter = 0.5;
		t.y = 304;
		t.elementsContent = [this._Image5_i(),this.lbName_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_rect_8_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbName_i = function () {
		var t = new eui.Label();
		this.lbName = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "Lv1 小猪";
		t.verticalCenter = 0;
		return t;
	};
	_proto.btnState_i = function () {
		var t = new eui.Button();
		this.btnState = t;
		t.height = 76;
		t.icon = "pet_json.pet_btn_xx_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.width = 73;
		t.x = 411;
		t.y = 485;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.horizontalCenter = 0.5;
		t.icon = "pet_json.pet_btn_cwjh_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.y = 501;
		return t;
	};
	_proto.skill0_i = function () {
		var t = new BaseCustComponent();
		this.skill0 = t;
		t.className = "PetSkillItem";
		t.left = 30;
		t.skinName = "PetSkillItemSkin";
		t.y = 135;
		return t;
	};
	_proto.skill1_i = function () {
		var t = new BaseCustComponent();
		this.skill1 = t;
		t.className = "PetSkillItem";
		t.right = 30;
		t.skinName = "PetSkillItemSkin";
		t.y = 135;
		return t;
	};
	_proto.skill2_i = function () {
		var t = new BaseCustComponent();
		this.skill2 = t;
		t.className = "PetSkillItem";
		t.left = 30;
		t.skinName = "PetSkillItemSkin";
		t.y = 234;
		return t;
	};
	_proto.skill3_i = function () {
		var t = new BaseCustComponent();
		this.skill3 = t;
		t.className = "PetSkillItem";
		t.right = 30;
		t.skinName = "PetSkillItemSkin";
		t.y = 234;
		return t;
	};
	_proto.listStar_i = function () {
		var t = new eui.List();
		this.listStar = t;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = TabBar1Skin;
		t.y = 340;
		t.layout = this._HorizontalLayout2_i();
		t.dataProvider = this._ArrayCollection2_i();
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._ArrayCollection2_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object6_i(),this._Object7_i(),this._Object8_i()];
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.itemRendererSkinName = TabBar1Skin;
		t.verticalCenter = 0;
		t.x = 83;
		t.layout = this._HorizontalLayout3_i();
		return t;
	};
	_proto._HorizontalLayout3_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 8;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 95;
		t.horizontalCenter = 0;
		t.width = 292;
		t.y = 365;
		t.elementsContent = [this._Image6_i(),this._Image7_i(),this._Image8_i(),this.propList_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(19,14,119,27);
		t.source = "public_json.public_prop_rect_png";
		t.top = 0;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 62;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 30;
		return t;
	};
	_proto.propList_i = function () {
		var t = new BaseCustComponent();
		this.propList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 8;
		t.className = "PropPart";
		t.left = 15;
		t.right = 15;
		t.skinName = "PropPartSkin";
		t.top = 8;
		return t;
	};
	_proto.expend_i = function () {
		var t = new ItemExpend();
		this.expend = t;
		t.skinName = "ItemExpendSkin";
		t.x = 165.97;
		t.y = 466;
		return t;
	};
	return PetInfoViewSkin;
})(eui.Skin);generateEUI.paths['resource/exml/pet/PetShowAllWinSkin.exml'] = window.PetShowAllWinSkin = (function (_super) {
	__extends(PetShowAllWinSkin, _super);
	function PetShowAllWinSkin() {
		_super.call(this);
		this.skinParts = ["bg","list"];
		
		this.elementsContent = [this.bg_i(),this._Group1_i()];
	}
	var _proto = PetShowAllWinSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		t.x = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 14;
		t.height = 400;
		t.horizontalCenter = 0.5;
		t.top = 66;
		t.width = 420;
		t.elementsContent = [this._Scroller1_i()];
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.height = 380;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.itemRendererSkinName = PetShowInfoItemSkin;
		t.x = 15;
		t.y = 94;
		t.layout = this._TileLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 18;
		t.requestedColumnCount = 3;
		t.verticalGap = 6;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i(),this._Object8_i(),this._Object9_i(),this._Object10_i(),this._Object11_i(),this._Object12_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object9_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object10_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object11_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object12_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	return PetShowAllWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/pet/PetShowInfoItemSkin.exml'] = window.PetShowInfoItemSkin = (function (_super) {
	__extends(PetShowInfoItemSkin, _super);
	function PetShowInfoItemSkin() {
		_super.call(this);
		this.skinParts = ["imgBg","icon","imgLock","lbNe","lbstar"];
		
		this.elementsContent = [this._Group3_i()];
	}
	var _proto = PetShowInfoItemSkin.prototype;

	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this._Group1_i(),this.lbNe_i(),this._Group2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "pet_json.pet_img_show_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 6;
		t.elementsContent = [this.imgBg_i(),this.icon_i(),this.imgLock_i()];
		return t;
	};
	_proto.imgBg_i = function () {
		var t = new eui.Image();
		this.imgBg = t;
		t.source = "pet_json.pet_icon_bg1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.source = "pet_json.pet_icon_bg1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgLock_i = function () {
		var t = new eui.Image();
		this.imgLock = t;
		t.bottom = 6;
		t.right = 6;
		t.source = "public_json.public_lock_2_png";
		return t;
	};
	_proto.lbNe_i = function () {
		var t = new eui.Label();
		this.lbNe = t;
		t.horizontalCenter = 0.5;
		t.size = 16;
		t.text = "1111";
		t.y = 112.68;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0.5;
		t.y = 90.01;
		t.elementsContent = [this._Image2_i(),this.lbstar_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_star_on_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbstar_i = function () {
		var t = new eui.Label();
		this.lbstar = t;
		t.size = 16;
		t.text = "X20";
		t.textColor = 0x4c2f27;
		t.x = 21.01;
		t.y = 2.67;
		return t;
	};
	return PetShowInfoItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/pet/PetSigleInfoViewSkin.exml'] = window.PetSigleInfoViewSkin = (function (_super) {
	__extends(PetSigleInfoViewSkin, _super);
	function PetSigleInfoViewSkin() {
		_super.call(this);
		this.skinParts = ["mModel","lbName","listStar","propList","skill0","skill1","skill2","skill3","icon","lbNe","lbGo","lbHave","gAct"];
		
		this.elementsContent = [this._Group4_i()];
		this.states = [
			new eui.State ("act",
				[
				])
			,
			new eui.State ("have",
				[
					new eui.SetProperty("_Image1","source","res/images/bg/petShowBg2.png"),
					new eui.SetProperty("gAct","visible",false),
					new eui.SetProperty("_Group4","anchorOffsetY",0),
					new eui.SetProperty("_Group4","left",0),
					new eui.SetProperty("_Group4","top",0),
					new eui.SetProperty("_Group4","height",326)
				])
		];
	}
	var _proto = PetSigleInfoViewSkin.prototype;

	_proto._Group4_i = function () {
		var t = new eui.Group();
		this._Group4 = t;
		t.left = 0;
		t.top = 0;
		t.elementsContent = [this._Image1_i(),this.mModel_i(),this._Group1_i(),this.listStar_i(),this._Group2_i(),this._Group3_i(),this.gAct_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "res/images/bg/petShowBg.png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.mModel_i = function () {
		var t = new BaseCustComponent();
		this.mModel = t;
		t.className = "UIAvatar";
		t.x = 197;
		t.y = 168;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 23.02;
		t.elementsContent = [this._Image2_i(),this.lbName_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_rect_8_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbName_i = function () {
		var t = new eui.Label();
		this.lbName = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "Lv1 小猪";
		t.textColor = 0xffd823;
		t.verticalCenter = 0;
		return t;
	};
	_proto.listStar_i = function () {
		var t = new eui.List();
		this.listStar = t;
		t.horizontalCenter = 0.5;
		t.itemRendererSkinName = TabBar1Skin;
		t.y = 196;
		t.layout = this._HorizontalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 5;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 95;
		t.horizontalCenter = 0;
		t.width = 362;
		t.y = 219.02;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this._Image5_i(),this.propList_i(),this._Image6_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(19,14,119,27);
		t.source = "public_json.public_prop_rect_png";
		t.top = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 62;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 30;
		return t;
	};
	_proto.propList_i = function () {
		var t = new BaseCustComponent();
		this.propList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 8;
		t.className = "PropPart";
		t.horizontalCenter = 0;
		t.skinName = "PropPart3Skin";
		t.top = 37;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "pet_json.pet_img_mjsx_png";
		t.y = -2;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 25;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this.skill0_i(),this.skill1_i(),this.skill2_i(),this.skill3_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 196;
		t.requestedColumnCount = 2;
		t.requestedRowCount = 2;
		return t;
	};
	_proto.skill0_i = function () {
		var t = new eui.Image();
		this.skill0 = t;
		t.source = "res/images/petskill/2.png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.skill1_i = function () {
		var t = new eui.Image();
		this.skill1 = t;
		t.source = "res/images/petskill/2.png";
		t.x = 277;
		t.y = 0;
		return t;
	};
	_proto.skill2_i = function () {
		var t = new eui.Image();
		this.skill2 = t;
		t.source = "res/images/petskill/2.png";
		t.x = 0;
		t.y = 82;
		return t;
	};
	_proto.skill3_i = function () {
		var t = new eui.Image();
		this.skill3 = t;
		t.source = "res/images/petskill/2.png";
		t.x = 277;
		t.y = 82;
		return t;
	};
	_proto.gAct_i = function () {
		var t = new eui.Group();
		this.gAct = t;
		t.x = 15;
		t.y = 330;
		t.elementsContent = [this._Image7_i(),this.icon_i(),this.lbNe_i(),this.lbGo_i(),this.lbHave_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "pet_json.pet_img_jihuo_png";
		t.x = 0;
		t.y = 2;
		return t;
	};
	_proto.icon_i = function () {
		var t = new BaseCustComponent();
		this.icon = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 43;
		t.y = 0;
		return t;
	};
	_proto.lbNe_i = function () {
		var t = new eui.Label();
		this.lbNe = t;
		t.size = 16;
		t.text = "时装碎片";
		t.textColor = 0xffd823;
		t.x = 137;
		t.y = 11;
		return t;
	};
	_proto.lbGo_i = function () {
		var t = new eui.Label();
		this.lbGo = t;
		t.size = 18;
		t.text = "前往获取";
		t.textColor = 0x2aff00;
		t.x = 272;
		t.y = 32;
		return t;
	};
	_proto.lbHave_i = function () {
		var t = new eui.Label();
		this.lbHave = t;
		t.size = 16;
		t.text = "0/1";
		t.textColor = 0xFFD823;
		t.x = 137;
		t.y = 51;
		return t;
	};
	return PetSigleInfoViewSkin;
})(eui.Skin);generateEUI.paths['resource/exml/pet/PetTipsSkin.exml'] = window.PetTipsSkin = (function (_super) {
	__extends(PetTipsSkin, _super);
	function PetTipsSkin() {
		_super.call(this);
		this.skinParts = ["zdl","propList"];
		
		this.height = 270;
		this.width = 380;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.zdl_i(),this.propList_i(),this._Image4_i()];
	}
	var _proto = PetTipsSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(224,70,110,25);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "win_json.win_tips_bg2_png";
		t.top = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "win_json.win_slice_line_png";
		t.top = 71;
		t.percentWidth = 97;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.bottom = 46;
		t.horizontalCenter = 0.5;
		t.source = "win_json.win_slice_line_png";
		t.percentWidth = 97;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new BaseCustComponent();
		this.zdl = t;
		t.anchorOffsetY = 0;
		t.className = "ZdlPrint";
		t.horizontalCenter = 0;
		t.skinName = "ZdlPrintSkin";
		t.y = 20;
		return t;
	};
	_proto.propList_i = function () {
		var t = new BaseCustComponent();
		this.propList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 54;
		t.className = "PropPart";
		t.horizontalCenter = 0;
		t.skinName = "PropPart3Skin";
		t.top = 80;
		t.width = 305;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "pet_json.pet_img_lb1_png";
		t.y = 228;
		return t;
	};
	return PetTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/progressBar/progressBarSkin7.exml'] = window.progressBarSkin7 = (function (_super) {
	__extends(progressBarSkin7, _super);
	function progressBarSkin7() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = progressBarSkin7.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 0;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(9,2,25,13);
		t.source = "vip_json.vip_bar_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.style = "l_normal";
		t.fontFamily = "Tahoma";
		t.right = 18;
		t.size = 18;
		t.stroke = 0.5;
		t.text = "10/10";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return progressBarSkin7;
})(eui.Skin);generateEUI.paths['resource/exml/prop/PropItem2Skin.exml'] = window.PropItem2Skin = (function (_super) {
	__extends(PropItem2Skin, _super);
	function PropItem2Skin() {
		_super.call(this);
		this.skinParts = ["arrow","prop2","prop"];
		
		this.height = 23;
		this.elementsContent = [this.arrow_i(),this.prop2_i(),this.prop_i()];
	}
	var _proto = PropItem2Skin.prototype;

	_proto.arrow_i = function () {
		var t = new eui.Image();
		this.arrow = t;
		t.source = "public_json.public_arrow_1_png";
		t.top = -1;
		t.x = 167;
		return t;
	};
	_proto.prop2_i = function () {
		var t = new eui.Label();
		this.prop2 = t;
		t.left = 193;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 18;
		t.text = "36854681";
		t.textColor = 0xFFFFFF;
		t.top = 0;
		return t;
	};
	_proto.prop_i = function () {
		var t = new eui.Label();
		this.prop = t;
		t.left = 14;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 18;
		t.text = "属性: 36854681";
		t.textColor = 0xffffff;
		t.top = 0;
		return t;
	};
	return PropItem2Skin;
})(eui.Skin);generateEUI.paths['resource/exml/prop/PropItem3Skin.exml'] = window.PropItem3Skin = (function (_super) {
	__extends(PropItem3Skin, _super);
	function PropItem3Skin() {
		_super.call(this);
		this.skinParts = ["arrow","prop2","prop"];
		
		this.height = 23;
		this.width = 224;
		this.elementsContent = [this.arrow_i(),this.prop2_i(),this.prop_i(),this._Image1_i()];
	}
	var _proto = PropItem3Skin.prototype;

	_proto.arrow_i = function () {
		var t = new eui.Image();
		this.arrow = t;
		t.source = "public_json.public_arrow_1_png";
		t.top = -1;
		t.x = 142;
		return t;
	};
	_proto.prop2_i = function () {
		var t = new eui.Label();
		this.prop2 = t;
		t.left = 169;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 16;
		t.text = "368546";
		t.textColor = 0xFFFFFF;
		t.top = 0;
		return t;
	};
	_proto.prop_i = function () {
		var t = new eui.Label();
		this.prop = t;
		t.left = 19;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 16;
		t.text = "属性属性: 36854";
		t.textColor = 0xffffff;
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_rect_3_png";
		t.top = 2;
		t.x = 0;
		return t;
	};
	return PropItem3Skin;
})(eui.Skin);generateEUI.paths['resource/exml/prop/PropItem4Skin.exml'] = window.PropItem4Skin = (function (_super) {
	__extends(PropItem4Skin, _super);
	function PropItem4Skin() {
		_super.call(this);
		this.skinParts = ["arrow","prop2","prop"];
		
		this.height = 23;
		this.width = 160;
		this.elementsContent = [this.arrow_i(),this.prop2_i(),this.prop_i(),this._Image1_i()];
	}
	var _proto = PropItem4Skin.prototype;

	_proto.arrow_i = function () {
		var t = new eui.Image();
		this.arrow = t;
		t.source = "public_json.public_arrow_1_png";
		t.top = -1;
		t.visible = false;
		t.x = 142;
		return t;
	};
	_proto.prop2_i = function () {
		var t = new eui.Label();
		this.prop2 = t;
		t.left = 169;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 16;
		t.text = "368546";
		t.textColor = 0xFFFFFF;
		t.top = 0;
		t.visible = false;
		return t;
	};
	_proto.prop_i = function () {
		var t = new eui.Label();
		this.prop = t;
		t.left = 19;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 16;
		t.text = "属性属性: 36854";
		t.textColor = 0xffffff;
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_rect_3_png";
		t.top = 2;
		t.x = 0;
		return t;
	};
	return PropItem4Skin;
})(eui.Skin);generateEUI.paths['resource/exml/prop/PropItemSkin.exml'] = window.PropItemSkin = (function (_super) {
	__extends(PropItemSkin, _super);
	function PropItemSkin() {
		_super.call(this);
		this.skinParts = ["prop"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = PropItemSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.left = 19;
		t.verticalCenter = 0;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.prop_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto.prop_i = function () {
		var t = new eui.Label();
		this.prop = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 18;
		t.text = "属性: 36854681";
		t.textColor = 0xffffff;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return PropItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/purgatory/PropPartResonateSkin.exml'] = window.PropPartResonateSkin = (function (_super) {
	__extends(PropPartResonateSkin, _super);
	function PropPartResonateSkin() {
		_super.call(this);
		this.skinParts = ["title","imgTag","pG"];
		
		this.elementsContent = [this.title_i(),this.imgTag_i(),this.pG_i()];
	}
	var _proto = PropPartResonateSkin.prototype;

	_proto.title_i = function () {
		var t = new eui.Label();
		this.title = t;
		t.left = 18;
		t.size = 16;
		t.text = "";
		t.textColor = 0xff5a00;
		t.y = 10;
		return t;
	};
	_proto.imgTag_i = function () {
		var t = new eui.Image();
		this.imgTag = t;
		t.source = "itemtips_json.itemtips_tag_2_png";
		t.x = 0;
		t.y = 11;
		return t;
	};
	_proto.pG_i = function () {
		var t = new eui.Group();
		this.pG = t;
		t.bottom = 10;
		t.left = 0;
		t.top = 40;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 9;
		return t;
	};
	return PropPartResonateSkin;
})(eui.Skin);generateEUI.paths['resource/exml/purgatory/PurgatoryBagItemSkin.exml'] = window.PurgatoryBagItemSkin = (function (_super) {
	__extends(PurgatoryBagItemSkin, _super);
	var PurgatoryBagItemSkin$Skin3 = 	(function (_super) {
		__extends(PurgatoryBagItemSkin$Skin3, _super);
		function PurgatoryBagItemSkin$Skin3() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PurgatoryBagItemSkin$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "res/btn/resolve_y_1.png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return PurgatoryBagItemSkin$Skin3;
	})(eui.Skin);

	function PurgatoryBagItemSkin() {
		_super.call(this);
		this.skinParts = ["item","btnDe","icon","num","eqName"];
		
		this.width = 405;
		this.elementsContent = [this._Image1_i(),this.item_i(),this.btnDe_i(),this.icon_i(),this.num_i(),this.eqName_i()];
	}
	var _proto = PurgatoryBagItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(13,12,46,72);
		t.source = "public_json.public_item_rect_1_png";
		t.top = 0;
		return t;
	};
	_proto.item_i = function () {
		var t = new BaseCustComponent();
		this.item = t;
		t.className = "ItemBase";
		t.left = 8;
		t.skinName = "ItembaseSkin";
		t.verticalCenter = 0;
		return t;
	};
	_proto.btnDe_i = function () {
		var t = new eui.Button();
		this.btnDe = t;
		t.label = "";
		t.right = 10;
		t.verticalCenter = 0;
		t.skinName = PurgatoryBagItemSkin$Skin3;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.bottom = 15;
		t.height = 35;
		t.width = 35;
		t.x = 100;
		return t;
	};
	_proto.num_i = function () {
		var t = new eui.Label();
		this.num = t;
		t.bottom = 15;
		t.size = 18;
		t.text = "Label";
		t.x = 141;
		return t;
	};
	_proto.eqName_i = function () {
		var t = new eui.Label();
		this.eqName = t;
		t.size = 18;
		t.text = "Label";
		t.top = 15;
		t.x = 101;
		return t;
	};
	return PurgatoryBagItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/purgatory/PurgatoryBagSkin.exml'] = window.PurgatoryBagSkin = (function (_super) {
	__extends(PurgatoryBagSkin, _super);
	var PurgatoryBagSkin$Skin4 = 	(function (_super) {
		__extends(PurgatoryBagSkin$Skin4, _super);
		function PurgatoryBagSkin$Skin4() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = PurgatoryBagSkin$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "res/btn/resolve_g_2.png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return PurgatoryBagSkin$Skin4;
	})(eui.Skin);

	function PurgatoryBagSkin() {
		_super.call(this);
		this.skinParts = ["bg","btnDe","list"];
		
		this.elementsContent = [this.bg_i(),this._Image1_i(),this._Image2_i(),this.btnDe_i(),this._Scroller1_i()];
	}
	var _proto = PurgatoryBagSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 90;
		t.scale9Grid = new egret.Rectangle(1,0,20,2);
		t.source = "public_json.public_slice_line_png";
		t.width = 419;
		t.x = 10;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "purgatory_json.purgatory_lab_resolve_png";
		t.top = 12;
		return t;
	};
	_proto.btnDe_i = function () {
		var t = new eui.Button();
		this.btnDe = t;
		t.bottom = 25;
		t.horizontalCenter = 0;
		t.label = "";
		t.skinName = PurgatoryBagSkin$Skin4;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.bottom = 100;
		t.height = 310;
		t.left = 15;
		t.maxHeight = 310;
		t.right = 15;
		t.top = 75;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.itemRendererSkinName = PurgatoryBagItemSkin;
		return t;
	};
	return PurgatoryBagSkin;
})(eui.Skin);generateEUI.paths['resource/exml/purgatory/PurgatoryPanelSkin.exml'] = window.PurgatoryPanelSkin = (function (_super) {
	__extends(PurgatoryPanelSkin, _super);
	function PurgatoryPanelSkin() {
		_super.call(this);
		this.skinParts = ["bg","eq0","eq2","eq3","gl","eq1","eq4","eq5","gr","zdl","roleSelect","propList","btnUp","btnRsn","btnProp","btnBag","lv","imgStep","imgName","imgEquip"];
		
		this.elementsContent = [this.bg_i(),this.gl_i(),this.gr_i(),this.zdl_i(),this.roleSelect_i(),this._Group1_i(),this.btnUp_i(),this.btnRsn_i(),this.btnProp_i(),this.btnBag_i(),this._Image4_i(),this._Group2_i(),this.imgEquip_i()];
	}
	var _proto = PurgatoryPanelSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.source = "res/images/bg/purgatoryBg.png";
		t.y = 80;
		return t;
	};
	_proto.gl_i = function () {
		var t = new eui.Group();
		this.gl = t;
		t.left = 10;
		t.y = 160;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.eq0_i(),this.eq2_i(),this.eq3_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 10;
		return t;
	};
	_proto.eq0_i = function () {
		var t = new BaseCustComponent();
		this.eq0 = t;
		t.className = "EquipItem";
		t.name = "0";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.eq2_i = function () {
		var t = new BaseCustComponent();
		this.eq2 = t;
		t.className = "EquipItem";
		t.name = "2";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 0;
		t.y = 90;
		return t;
	};
	_proto.eq3_i = function () {
		var t = new BaseCustComponent();
		this.eq3 = t;
		t.className = "EquipItem";
		t.name = "3";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 0;
		t.y = 180;
		return t;
	};
	_proto.gr_i = function () {
		var t = new eui.Group();
		this.gr = t;
		t.right = 10;
		t.y = 160;
		t.layout = this._VerticalLayout2_i();
		t.elementsContent = [this.eq1_i(),this.eq4_i(),this.eq5_i()];
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 10;
		return t;
	};
	_proto.eq1_i = function () {
		var t = new BaseCustComponent();
		this.eq1 = t;
		t.className = "EquipItem";
		t.name = "1";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.eq4_i = function () {
		var t = new BaseCustComponent();
		this.eq4 = t;
		t.className = "EquipItem";
		t.name = "4";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 0;
		t.y = 90;
		return t;
	};
	_proto.eq5_i = function () {
		var t = new BaseCustComponent();
		this.eq5 = t;
		t.className = "EquipItem";
		t.name = "5";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 0;
		t.y = 180;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new BaseCustComponent();
		this.zdl = t;
		t.anchorOffsetX = 29;
		t.anchorOffsetY = 0;
		t.className = "ZdlPrint";
		t.horizontalCenter = 0;
		t.skinName = "ZdlPrintSkin";
		t.y = 90;
		return t;
	};
	_proto.roleSelect_i = function () {
		var t = new BaseCustComponent();
		this.roleSelect = t;
		t.className = "RoleSelect";
		t.horizontalCenter = 0;
		t.skinName = "RoleSelectSkin";
		t.top = -5;
		t.y = -5;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 100;
		t.horizontalCenter = 0;
		t.width = 292;
		t.y = 385;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.propList_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(19,14,119,27);
		t.source = "public_json.public_prop_rect_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.height = 2;
		t.left = 2;
		t.right = 2;
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 65;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 2;
		t.left = 2;
		t.right = 2;
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 33;
		return t;
	};
	_proto.propList_i = function () {
		var t = new BaseCustComponent();
		this.propList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 10;
		t.className = "PropPart";
		t.left = 0;
		t.right = 2;
		t.skinName = "PropPartSkin";
		t.top = 10;
		return t;
	};
	_proto.btnUp_i = function () {
		var t = new eui.Button();
		this.btnUp = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 10;
		t.horizontalCenter = 0;
		t.icon = "purgatory_json.purgatory_btn_upgrade_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		return t;
	};
	_proto.btnRsn_i = function () {
		var t = new eui.Button();
		this.btnRsn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 10;
		t.icon = "purgatory_json.purgatory_icon_resonate_png";
		t.label = "Button";
		t.left = 10;
		t.skinName = "BtnIconSkin";
		return t;
	};
	_proto.btnProp_i = function () {
		var t = new eui.Button();
		this.btnProp = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 76;
		t.icon = "totems_json.totems_totalProp_png";
		t.label = "Button";
		t.right = 10;
		t.skinName = "BtnIconSkin";
		t.top = 82;
		t.width = 76;
		return t;
	};
	_proto.btnBag_i = function () {
		var t = new eui.Button();
		this.btnBag = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 10;
		t.icon = "purgatory_json.purgatory_icon_bag_png";
		t.label = "Button";
		t.right = 10;
		t.skinName = "BtnIconSkin";
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "purgatory_json.purgatory_name_ban_png";
		t.y = 357;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0.5;
		t.y = 357;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.lv_i(),this.imgStep_i(),this.imgName_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		t.horizontalAlign = "center";
		return t;
	};
	_proto.lv_i = function () {
		var t = new NumberMC();
		this.lv = t;
		t.height = 24;
		t.type = "purgatory_json.purgatory_lv_num_";
		t.width = 42;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgStep_i = function () {
		var t = new eui.Image();
		this.imgStep = t;
		t.source = "purgatory_json.purgatory_lv_step_png";
		t.x = 74;
		t.y = 0;
		return t;
	};
	_proto.imgName_i = function () {
		var t = new eui.Image();
		this.imgName = t;
		t.source = "purgatory_json.purgatory1_1_png";
		t.x = 32;
		t.y = 0;
		return t;
	};
	_proto.imgEquip_i = function () {
		var t = new eui.Image();
		this.imgEquip = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.y = 170;
		return t;
	};
	return PurgatoryPanelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/purgatory/PurgatoryResonatePropSkin.exml'] = window.PurgatoryResonatePropSkin = (function (_super) {
	__extends(PurgatoryResonatePropSkin, _super);
	function PurgatoryResonatePropSkin() {
		_super.call(this);
		this.skinParts = ["title","closeBtn","pG"];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.title_i(),this.closeBtn_i(),this._Scroller1_i()];
	}
	var _proto = PurgatoryResonatePropSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(224,70,110,25);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "win_json.win_tips_bg2_png";
		t.top = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.left = 4;
		t.right = 4;
		t.scale9Grid = new egret.Rectangle(1,0,13,3);
		t.source = "win_json.win_slice_line_png";
		t.top = 70;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.bottom = 80;
		t.left = 4;
		t.right = 4;
		t.scale9Grid = new egret.Rectangle(1,0,13,3);
		t.source = "win_json.win_slice_line_png";
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.top = 25;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Button();
		this.closeBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 13;
		t.horizontalCenter = 0;
		t.icon = "purgatory_json.purgatory_btn_sure_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.bottom = 120;
		t.left = 31;
		t.maxHeight = 400;
		t.right = 30;
		t.scrollPolicyH = "off";
		t.top = 100;
		t.viewport = this.pG_i();
		return t;
	};
	_proto.pG_i = function () {
		var t = new eui.Group();
		this.pG = t;
		t.touchChildren = false;
		t.layout = this._VerticalLayout2_i();
		t.elementsContent = [this._List1_i()];
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._List1_i = function () {
		var t = new eui.List();
		t.x = 0;
		t.y = 2;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	return PurgatoryResonatePropSkin;
})(eui.Skin);generateEUI.paths['resource/exml/role/EquipItemSkin.exml'] = window.EquipItemSkin = (function (_super) {
	__extends(EquipItemSkin, _super);
	function EquipItemSkin() {
		_super.call(this);
		this.skinParts = ["sele","bg","color","ico","num","strength","part"];
		
		this.height = 81;
		this.elementsContent = [this.sele_i(),this.bg_i(),this.color_i(),this.ico_i(),this.num_i(),this.strength_i(),this.part_i()];
	}
	var _proto = EquipItemSkin.prototype;

	_proto.sele_i = function () {
		var t = new eui.Image();
		this.sele = t;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(9,10,61,61);
		t.source = "public_json.public_selected_png";
		t.verticalCenter = -1.5;
		t.visible = false;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.horizontalCenter = 0;
		t.source = "public_json.public_item_bg2_png";
		t.top = 0;
		return t;
	};
	_proto.color_i = function () {
		var t = new eui.Image();
		this.color = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.verticalCenter = 0;
		return t;
	};
	_proto.ico_i = function () {
		var t = new eui.Image();
		this.ico = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.top = 4;
		return t;
	};
	_proto.num_i = function () {
		var t = new eui.Label();
		this.num = t;
		t.bottom = 24;
		t.right = 4;
		t.size = 18;
		t.text = "";
		t.textColor = 0x000000;
		return t;
	};
	_proto.strength_i = function () {
		var t = new eui.Label();
		this.strength = t;
		t.size = 16;
		t.stroke = 2;
		t.strokeColor = 0x000000;
		t.text = "";
		t.textColor = 0xffd823;
		t.top = 7;
		t.x = 14;
		return t;
	};
	_proto.part_i = function () {
		var t = new eui.Image();
		this.part = t;
		t.left = 8;
		t.source = "";
		t.top = 52;
		t.visible = false;
		return t;
	};
	return EquipItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/purgatory/PurgatoryUpgradeSkin.exml'] = window.PurgatoryUpgradeSkin = (function (_super) {
	__extends(PurgatoryUpgradeSkin, _super);
	function PurgatoryUpgradeSkin() {
		_super.call(this);
		this.skinParts = ["bg","imgUp","title","btnUp","item3","item0","item1","item2","eqName","num0","num1","num2"];
		
		this.currentState = "s0";
		this.elementsContent = [this.bg_i(),this._Image1_i(),this.imgUp_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this.title_i(),this.btnUp_i(),this.item3_i(),this.item0_i(),this.item1_i(),this.item2_i(),this.eqName_i(),this.num0_i(),this.num1_i(),this.num2_i()];
		this.states = [
			new eui.State ("s0",
				[
					new eui.SetProperty("_Image2","y",76),
					new eui.SetProperty("_Image4","visible",false),
					new eui.SetProperty("title","source","purgatory_json.purgatory_lab_active_png"),
					new eui.SetProperty("item1","visible",false),
					new eui.SetProperty("num1","visible",false)
				])
			,
			new eui.State ("s1",
				[
					new eui.SetProperty("imgUp","source","purgatory_json.purgatory_img_upgrade1_png"),
					new eui.SetProperty("_Image2","top",76),
					new eui.SetProperty("title","source","purgatory_json.purgatory_lab_upgrade_png")
				])
		];
	}
	var _proto = PurgatoryUpgradeSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 25;
		t.left = 20;
		t.right = 20;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.top = 72;
		return t;
	};
	_proto.imgUp_i = function () {
		var t = new eui.Image();
		this.imgUp = t;
		t.bottom = 90;
		t.horizontalCenter = 0;
		t.source = "purgatory_json.purgatory_img_upgrade0_png";
		t.top = 115;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.source = "purgatory_json.purgatory_board_name_png";
		t.x = 110;
		t.y = 76;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 20;
		t.source = "purgatory_json.purgatory_board_name_png";
		t.top = 322;
		t.width = 75;
		t.x = 63;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.height = 20;
		t.source = "purgatory_json.purgatory_board_name_png";
		t.width = 75;
		t.x = 182;
		t.y = 322;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.height = 20;
		t.source = "purgatory_json.purgatory_board_name_png";
		t.width = 75;
		t.x = 302;
		t.y = 322;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.top = 12;
		return t;
	};
	_proto.btnUp_i = function () {
		var t = new eui.Button();
		this.btnUp = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 30;
		t.horizontalCenter = 0;
		t.icon = "purgatory_json.purgatory_btn_upgrade_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		return t;
	};
	_proto.item3_i = function () {
		var t = new BaseCustComponent();
		this.item3 = t;
		t.className = "EquipItem";
		t.horizontalCenter = 0;
		t.skinName = "EquipItemSkin";
		t.y = 116;
		return t;
	};
	_proto.item0_i = function () {
		var t = new BaseCustComponent();
		this.item0 = t;
		t.className = "EquipItem";
		t.skinName = "EquipItemSkin";
		t.x = 58;
		t.y = 242;
		return t;
	};
	_proto.item1_i = function () {
		var t = new BaseCustComponent();
		this.item1 = t;
		t.className = "EquipItem";
		t.skinName = "EquipItemSkin";
		t.x = 178;
		t.y = 242;
		return t;
	};
	_proto.item2_i = function () {
		var t = new BaseCustComponent();
		this.item2 = t;
		t.className = "EquipItem";
		t.skinName = "EquipItemSkin";
		t.x = 297.67;
		t.y = 242;
		return t;
	};
	_proto.eqName_i = function () {
		var t = new eui.Label();
		this.eqName = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.y = 86;
		return t;
	};
	_proto.num0_i = function () {
		var t = new eui.Label();
		this.num0 = t;
		t.horizontalCenter = -120;
		t.size = 16;
		t.text = "999/999";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.y = 325;
		return t;
	};
	_proto.num1_i = function () {
		var t = new eui.Label();
		this.num1 = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "999/999";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.y = 325;
		return t;
	};
	_proto.num2_i = function () {
		var t = new eui.Label();
		this.num2 = t;
		t.horizontalCenter = 120;
		t.size = 16;
		t.text = "999/999";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.y = 325;
		return t;
	};
	return PurgatoryUpgradeSkin;
})(eui.Skin);generateEUI.paths['resource/exml/purgatory/ResonatePropSkin.exml'] = window.ResonatePropSkin = (function (_super) {
	__extends(ResonatePropSkin, _super);
	function ResonatePropSkin() {
		_super.call(this);
		this.skinParts = ["title","pG","btnUp"];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.title_i(),this._Scroller1_i(),this.btnUp_i()];
	}
	var _proto = ResonatePropSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(224,70,110,25);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "win_json.win_tips_bg2_png";
		t.top = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.left = 4;
		t.right = 4;
		t.scale9Grid = new egret.Rectangle(1,0,13,3);
		t.source = "win_json.win_slice_line_png";
		t.top = 70;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.bottom = 80;
		t.left = 4;
		t.right = 4;
		t.scale9Grid = new egret.Rectangle(1,0,13,3);
		t.source = "win_json.win_slice_line_png";
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0;
		t.source = "purgatory_json.purgatory_lab_resonate_png";
		t.top = 25;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.bottom = 110;
		t.left = 35;
		t.right = 34;
		t.scrollPolicyH = "off";
		t.top = 100;
		t.viewport = this.pG_i();
		return t;
	};
	_proto.pG_i = function () {
		var t = new eui.Group();
		this.pG = t;
		t.touchChildren = false;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 0;
		return t;
	};
	_proto.btnUp_i = function () {
		var t = new eui.Button();
		this.btnUp = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 13;
		t.horizontalCenter = 0;
		t.icon = "purgatory_json.purgatory_btn_sure_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		return t;
	};
	return ResonatePropSkin;
})(eui.Skin);generateEUI.paths['resource/exml/quest/QuestMainViewSkin.exml'] = window.QuestMainViewSkin = (function (_super) {
	__extends(QuestMainViewSkin, _super);
	function QuestMainViewSkin() {
		_super.call(this);
		this.skinParts = ["imgRect","labTitle","titleGroup","labDes"];
		
		this.height = 65;
		this.elementsContent = [this._Image1_i(),this._Group1_i()];
	}
	var _proto = QuestMainViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(98,25,103,17);
		t.source = "zjm_json.zjm_quest_bg_png";
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.width = 216;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.titleGroup_i(),this.labDes_i()];
		return t;
	};
	_proto.titleGroup_i = function () {
		var t = new eui.Group();
		this.titleGroup = t;
		t.left = 68;
		t.y = 13;
		t.elementsContent = [this.imgRect_i(),this.labTitle_i()];
		return t;
	};
	_proto.imgRect_i = function () {
		var t = new eui.Image();
		this.imgRect = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(6,6,12,9);
		t.source = "zjm_json.zjm_lineBlank_yellow_png";
		t.top = 0;
		return t;
	};
	_proto.labTitle_i = function () {
		var t = new eui.Label();
		this.labTitle = t;
		t.bold = true;
		t.bottom = 4;
		t.left = 4;
		t.right = 4;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 14;
		t.text = "遇见村长";
		t.textColor = 0xffc600;
		t.top = 4;
		return t;
	};
	_proto.labDes_i = function () {
		var t = new eui.Label();
		this.labDes = t;
		t.height = 14;
		t.left = 67;
		t.right = 22;
		t.size = 14;
		t.text = "层层";
		t.textColor = 0xfff1e6;
		t.y = 38;
		return t;
	};
	return QuestMainViewSkin;
})(eui.Skin);generateEUI.paths['resource/exml/rank/RankModelItemASkin.exml'] = window.RankModelItemASkin = (function (_super) {
	__extends(RankModelItemASkin, _super);
	function RankModelItemASkin() {
		_super.call(this);
		this.skinParts = ["imgRank","lbRank","lbNe","lbLv"];
		
		this.height = 33;
		this.width = 403;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = RankModelItemASkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.width = 403;
		t.x = 0;
		t.y = 3;
		t.elementsContent = [this._Image1_i(),this.imgRank_i(),this.lbRank_i(),this.lbNe_i(),this.lbLv_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_slice_line2_png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = 28;
		return t;
	};
	_proto.imgRank_i = function () {
		var t = new eui.Image();
		this.imgRank = t;
		t.source = "rank_json.rank_nb_1_png";
		t.x = 10;
		t.y = 0;
		return t;
	};
	_proto.lbRank_i = function () {
		var t = new eui.Label();
		this.lbRank = t;
		t.horizontalCenter = -154;
		t.size = 16;
		t.text = "100";
		t.textColor = 0xFFD823;
		t.y = 7;
		return t;
	};
	_proto.lbNe_i = function () {
		var t = new eui.Label();
		this.lbNe = t;
		t.size = 16;
		t.text = "名字多个字";
		t.x = 110;
		t.y = 6;
		return t;
	};
	_proto.lbLv_i = function () {
		var t = new eui.Label();
		this.lbLv = t;
		t.size = 16;
		t.text = "迷雾之塔107层";
		t.textColor = 0x00B4FF;
		t.x = 266;
		t.y = 6;
		return t;
	};
	return RankModelItemASkin;
})(eui.Skin);generateEUI.paths['resource/exml/rank/RankModelItemBSkin.exml'] = window.RankModelItemBSkin = (function (_super) {
	__extends(RankModelItemBSkin, _super);
	function RankModelItemBSkin() {
		_super.call(this);
		this.skinParts = ["bg","imgRank","rankNum","rName","value_0","zdl"];
		
		this.height = 61;
		this.width = 412;
		this.elementsContent = [this.bg_i(),this.imgRank_i(),this.rankNum_i(),this.rName_i(),this.value_0_i(),this.zdl_i()];
	}
	var _proto = RankModelItemBSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,14,14);
		t.source = "public_json.public_rect_9_png";
		t.top = 0;
		return t;
	};
	_proto.imgRank_i = function () {
		var t = new eui.Image();
		this.imgRank = t;
		t.source = "public_json.public_rank_1_png";
		t.x = 35;
		t.y = 17;
		return t;
	};
	_proto.rankNum_i = function () {
		var t = new eui.Label();
		this.rankNum = t;
		t.horizontalCenter = -162.5;
		t.size = 20;
		t.text = "1";
		t.y = 21;
		return t;
	};
	_proto.rName_i = function () {
		var t = new eui.Label();
		this.rName = t;
		t.horizontalCenter = -24;
		t.size = 16;
		t.text = "XXXXXXX";
		t.y = 23;
		return t;
	};
	_proto.value_0_i = function () {
		var t = new eui.Label();
		this.value_0 = t;
		t.size = 16;
		t.text = "999";
		t.textColor = 0x00a2ff;
		t.x = 326;
		t.y = 23;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new eui.Label();
		this.zdl = t;
		t.horizontalCenter = 148.5;
		t.size = 16;
		t.text = "150w";
		t.textColor = 0xff8400;
		t.visible = false;
		t.y = 23;
		return t;
	};
	return RankModelItemBSkin;
})(eui.Skin);generateEUI.paths['resource/exml/rank/RankModelWinASkin.exml'] = window.RankModelWinASkin = (function (_super) {
	__extends(RankModelWinASkin, _super);
	function RankModelWinASkin() {
		_super.call(this);
		this.skinParts = ["bg","list","imgRank","lbRank","lbLv"];
		
		this.elementsContent = [this.bg_i(),this._Group2_i(),this._Group3_i()];
	}
	var _proto = RankModelWinASkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		t.x = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.bottom = 15;
		t.height = 430;
		t.horizontalCenter = 0;
		t.top = 65;
		t.width = 415;
		t.elementsContent = [this._Image1_i(),this._Group1_i(),this._Image3_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 50;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "public_json.public_slice_line_png";
		t.width = 419;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 5;
		t.y = 35;
		t.elementsContent = [this._Image2_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 340;
		t.scale9Grid = new egret.Rectangle(19,11,119,33);
		t.source = "public_json.public_prop_rect_png";
		t.width = 405;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.height = 335;
		t.horizontalCenter = 0;
		t.top = 0;
		t.width = 403;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.itemRendererSkinName = RankModelItemASkin;
		t.x = 114;
		t.y = -1;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 1;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i(),this._Object8_i(),this._Object9_i(),this._Object10_i(),this._Object11_i(),this._Object12_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object9_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object10_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object11_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object12_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "rank_json.rank_lb1_png";
		t.y = 6;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.bottom = 26;
		t.height = 33;
		t.horizontalCenter = 0;
		t.width = 403;
		t.elementsContent = [this._Image4_i(),this.imgRank_i(),this.lbRank_i(),this._Label1_i(),this.lbLv_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(19,7,119,38);
		t.source = "public_json.public_prop_rect_png";
		t.percentWidth = 100;
		t.x = 0;
		return t;
	};
	_proto.imgRank_i = function () {
		var t = new eui.Image();
		this.imgRank = t;
		t.source = "rank_json.rank_nb_1_png";
		t.x = 101;
		t.y = 3;
		return t;
	};
	_proto.lbRank_i = function () {
		var t = new eui.Label();
		this.lbRank = t;
		t.horizontalCenter = -64;
		t.size = 16;
		t.text = "1";
		t.textColor = 0xffd823;
		t.x = 108;
		t.y = 9;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 16;
		t.text = "我的排名:";
		t.textColor = 0xffd823;
		t.verticalCenter = 0.5;
		t.x = 22;
		return t;
	};
	_proto.lbLv_i = function () {
		var t = new eui.Label();
		this.lbLv = t;
		t.size = 16;
		t.text = "迷雾之塔107层";
		t.textColor = 0x00B4FF;
		t.verticalCenter = 0;
		t.x = 266;
		return t;
	};
	return RankModelWinASkin;
})(eui.Skin);generateEUI.paths['resource/exml/rank/RankModelWinBSkin.exml'] = window.RankModelWinBSkin = (function (_super) {
	__extends(RankModelWinBSkin, _super);
	function RankModelWinBSkin() {
		_super.call(this);
		this.skinParts = ["bg","list","imgRank","lbRank","lbLv"];
		
		this.height = 624;
		this.width = 436;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this._Scroller1_i(),this._Group1_i(),this._Label3_i(),this._Label4_i(),this._Label5_i()];
	}
	var _proto = RankModelWinBSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 452;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(19,11,119,33);
		t.source = "public_json.public_prop_rect_png";
		t.top = 110;
		t.width = 416;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.bottom = 63;
		t.horizontalCenter = 0;
		t.top = 111;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.itemRendererSkinName = RankModelItemBSkin;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = -1;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i(),this._Object8_i(),this._Object9_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object9_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 23;
		t.height = 33;
		t.horizontalCenter = 0;
		t.width = 403;
		t.elementsContent = [this.imgRank_i(),this.lbRank_i(),this._Label1_i(),this._Label2_i(),this.lbLv_i()];
		return t;
	};
	_proto.imgRank_i = function () {
		var t = new eui.Image();
		this.imgRank = t;
		t.source = "rank_json.rank_nb_1_png";
		t.x = 101;
		t.y = 3;
		return t;
	};
	_proto.lbRank_i = function () {
		var t = new eui.Label();
		this.lbRank = t;
		t.horizontalCenter = -64;
		t.size = 16;
		t.text = "1";
		t.textColor = 0xffd823;
		t.x = 108;
		t.y = 9;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 16;
		t.text = "我的排名:";
		t.textColor = 0x4c2f27;
		t.verticalCenter = 0.5;
		t.x = 22;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.size = 16;
		t.text = "我的关卡数 : ";
		t.textColor = 0x4c2f27;
		t.verticalCenter = 0.5;
		t.x = 245;
		return t;
	};
	_proto.lbLv_i = function () {
		var t = new eui.Label();
		this.lbLv = t;
		t.size = 16;
		t.text = "100关";
		t.textColor = 0x00B4FF;
		t.verticalCenter = 0;
		t.x = 338;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.size = 18;
		t.text = "排名";
		t.textColor = 0x4c2f27;
		t.x = 43;
		t.y = 83;
		return t;
	};
	_proto._Label4_i = function () {
		var t = new eui.Label();
		t.size = 18;
		t.text = "名称";
		t.textColor = 0x4C2F27;
		t.x = 180;
		t.y = 83;
		return t;
	};
	_proto._Label5_i = function () {
		var t = new eui.Label();
		t.size = 18;
		t.text = "关数";
		t.textColor = 0x4C2F27;
		t.x = 329;
		t.y = 83;
		return t;
	};
	return RankModelWinBSkin;
})(eui.Skin);generateEUI.paths['resource/exml/rank/RankPannelSkin.exml'] = window.RankPannelSkin = (function (_super) {
	__extends(RankPannelSkin, _super);
	function RankPannelSkin() {
		_super.call(this);
		this.skinParts = ["listItem","itemData0","itemData1","tabBtn","roleMdl1","roleMdl0","roleMdl2","gNe","rankNum","imgMore","rankValue","imgDown"];
		
		this.height = 680;
		this.width = 530;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Group1_i(),this.roleMdl1_i(),this.roleMdl0_i(),this.roleMdl2_i(),this._Image8_i(),this.gNe_i(),this._Group4_i()];
	}
	var _proto = RankPannelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 680;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(20,168,65,17);
		t.source = "win_json.win_bg4_png";
		t.verticalCenter = 0;
		t.width = 530;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "res/images/bg/rankBg.png";
		t.y = 7.43;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -0.5;
		t.scale9Grid = new egret.Rectangle(1,1,8,1);
		t.source = "role_json.role_line_fg_2_png";
		t.top = 257;
		t.width = 507;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -0.5;
		t.scale9Grid = new egret.Rectangle(1,1,8,1);
		t.source = "role_json.role_line_fg_2_png";
		t.width = 507;
		t.y = 626;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.percentHeight = 98;
		t.horizontalCenter = -1;
		t.scale9Grid = new egret.Rectangle(10,12,21,17);
		t.source = "win_json.win_bg_line_png";
		t.verticalCenter = 0;
		t.width = 510;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 13.64;
		t.y = 261.92;
		t.elementsContent = [this._Image6_i(),this._Image7_i(),this._Scroller1_i(),this.tabBtn_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 357;
		t.left = 0;
		t.scale9Grid = new egret.Rectangle(6,4,7,9);
		t.source = "public_json.public_rect_6_png";
		t.top = 0;
		t.width = 502;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.percentHeight = 101;
		t.source = "public_json.public_slice_line5_png";
		t.verticalCenter = 0;
		t.width = 3;
		t.x = 397;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 352.6;
		t.width = 426;
		t.x = 5;
		t.y = 3;
		t.viewport = this.listItem_i();
		return t;
	};
	_proto.listItem_i = function () {
		var t = new eui.List();
		this.listItem = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.itemRendererSkinName = RankViewItemSkin;
		t.x = 1;
		t.y = -1;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 3;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i(),this._Object8_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto.tabBtn_i = function () {
		var t = new eui.TabBar();
		this.tabBtn = t;
		t.itemRendererSkinName = TabBar1Skin;
		t.x = 394;
		t.y = 0;
		t.layout = this._VerticalLayout2_i();
		t.dataProvider = this._ArrayCollection2_i();
		return t;
	};
	_proto._VerticalLayout2_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection2_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this.itemData0_i(),this.itemData1_i()];
		return t;
	};
	_proto.itemData0_i = function () {
		var t = {};
		this.itemData0 = t;
		t.icon = "rank_json.rank_type_0_png";
		t.icon2 = "rank_json.rank_type_0_png";
		return t;
	};
	_proto.itemData1_i = function () {
		var t = {};
		this.itemData1 = t;
		t.icon = "rank_json.rank_type_1_png";
		t.icon2 = "rank_json.rank_type_1_png";
		return t;
	};
	_proto.roleMdl1_i = function () {
		var t = new BaseCustComponent();
		this.roleMdl1 = t;
		t.className = "UIAvatar";
		t.x = 127;
		t.y = 194;
		return t;
	};
	_proto.roleMdl0_i = function () {
		var t = new BaseCustComponent();
		this.roleMdl0 = t;
		t.className = "UIAvatar";
		t.x = 265;
		t.y = 194;
		return t;
	};
	_proto.roleMdl2_i = function () {
		var t = new BaseCustComponent();
		this.roleMdl2 = t;
		t.className = "UIAvatar";
		t.x = 403;
		t.y = 194;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.scaleX = 1.3;
		t.scaleY = 1.3;
		t.source = "public_json.public_rank_1_png";
		t.x = 170;
		t.y = 198;
		return t;
	};
	_proto.gNe_i = function () {
		var t = new eui.Group();
		this.gNe = t;
		t.horizontalCenter = -0.5;
		t.y = 200.32;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.x = 16.67;
		t.y = 632.94;
		t.elementsContent = [this._Group2_i(),this._Group3_i()];
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.left = 0;
		t.y = 0;
		t.elementsContent = [this._Image9_i(),this.rankNum_i(),this._Image10_i(),this.imgMore_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "rank_json.rank_rect_7_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.rankNum_i = function () {
		var t = new NumberMC();
		this.rankNum = t;
		t.height = 21;
		t.type = "rank_json.rank_lby_";
		t.x = 117;
		t.y = 7;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.source = "rank_json.rank_lb2_png";
		t.x = 3;
		t.y = 0;
		return t;
	};
	_proto.imgMore_i = function () {
		var t = new eui.Image();
		this.imgMore = t;
		t.source = "rank_json.rank_more_png";
		t.verticalCenter = 0;
		t.x = 116;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.x = 273;
		t.y = 0;
		t.elementsContent = [this._Image11_i(),this.rankValue_i(),this.imgDown_i()];
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.source = "rank_json.rank_rect_7_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.rankValue_i = function () {
		var t = new NumberMC();
		this.rankValue = t;
		t.height = 21;
		t.type = "rank_json.rank_lby_";
		t.x = 81;
		t.y = 9;
		return t;
	};
	_proto.imgDown_i = function () {
		var t = new eui.Image();
		this.imgDown = t;
		t.source = "rank_json.rank_down_1_png";
		t.x = 2;
		t.y = 3;
		return t;
	};
	return RankPannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/rank/RankViewItemSkin.exml'] = window.RankViewItemSkin = (function (_super) {
	__extends(RankViewItemSkin, _super);
	function RankViewItemSkin() {
		_super.call(this);
		this.skinParts = ["bg","rankRe","imgRank","rankNum","lbNe","imgVip","rankValue","imgDes"];
		
		this.height = 60;
		this.width = 390;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = RankViewItemSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 60;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 390;
		t.elementsContent = [this.bg_i(),this.rankRe_i(),this.imgRank_i(),this.rankNum_i(),this.lbNe_i(),this.imgVip_i(),this.rankValue_i(),this.imgDes_i()];
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(4,4,9,10);
		t.source = "public_json.public_rect_12_png";
		t.percentWidth = 100;
		t.x = 0;
		t.y = -1;
		return t;
	};
	_proto.rankRe_i = function () {
		var t = new eui.Image();
		this.rankRe = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(7,8,12,9);
		t.source = "rank_json.rank_rect_1_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.imgRank_i = function () {
		var t = new eui.Image();
		this.imgRank = t;
		t.horizontalCenter = -164.5;
		t.scaleX = 1.3;
		t.scaleY = 1.3;
		t.source = "public_json.public_rank_1_png";
		t.verticalCenter = -0.5;
		return t;
	};
	_proto.rankNum_i = function () {
		var t = new NumberMC();
		this.rankNum = t;
		t.height = 20;
		t.horizontalCenter = -166.5;
		t.type = "rank_lbo_";
		t.y = 19;
		return t;
	};
	_proto.lbNe_i = function () {
		var t = new eui.Label();
		this.lbNe = t;
		t.size = 16;
		t.text = "名字多个字名字";
		t.textColor = 0xffde00;
		t.verticalCenter = 0.5;
		t.x = 96;
		return t;
	};
	_proto.imgVip_i = function () {
		var t = new eui.Image();
		this.imgVip = t;
		t.source = "zjm_json.zjm_vip_1_png";
		t.verticalCenter = -2.5;
		t.x = 49;
		return t;
	};
	_proto.rankValue_i = function () {
		var t = new NumberMC();
		this.rankValue = t;
		t.height = 11;
		t.type = "yellow_num_";
		t.verticalCenter = 0;
		t.x = 269;
		return t;
	};
	_proto.imgDes_i = function () {
		var t = new eui.Image();
		this.imgDes = t;
		t.source = "rank_json.rank_des_0_png";
		t.verticalCenter = 0.5;
		t.x = 213;
		return t;
	};
	return RankViewItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/refine/RefinePannelSkin.exml'] = window.RefinePannelSkin = (function (_super) {
	__extends(RefinePannelSkin, _super);
	function RefinePannelSkin() {
		_super.call(this);
		this.skinParts = ["instruction","zdl","roleSelect","propList","mBtn","seleImg","item_0","item_1","item_2","item_3","item_4","item_5","item_6","item_7","item_8","item_9","sGroup","btn","cost_1","cost_0","re","money","mPro","num"];
		
		this.height = 680;
		this.width = 535;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.instruction_i(),this._Image3_i(),this.zdl_i(),this.roleSelect_i(),this._Group1_i(),this._Image7_i(),this.mBtn_i(),this._Image8_i(),this._Image9_i(),this.seleImg_i(),this.sGroup_i(),this.btn_i(),this.cost_1_i(),this.cost_0_i(),this.re_i(),this.money_i(),this.mPro_i(),this.num_i(),this._NumberMC1_i()];
	}
	var _proto = RefinePannelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 680;
		t.scale9Grid = new egret.Rectangle(25,141,60,55);
		t.source = "win_json.win_bg4_png";
		t.width = 530;
		t.x = 3;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 11;
		t.height = 582;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(10,11,22,21);
		t.source = "win_json.win_bg_line_png";
		t.width = 507;
		return t;
	};
	_proto.instruction_i = function () {
		var t = new BaseCustComponent();
		this.instruction = t;
		t.className = "InstructionPart";
		t.name = "3";
		t.skinName = "InstructionPartSkin";
		t.visible = false;
		t.x = 103;
		t.y = 107;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "res/images/bg/refineBg.png";
		t.touchEnabled = false;
		t.x = 99;
		t.y = 106;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new BaseCustComponent();
		this.zdl = t;
		t.anchorOffsetX = 29;
		t.anchorOffsetY = 0;
		t.className = "ZdlPrint";
		t.horizontalCenter = 0;
		t.skinName = "ZdlPrintSkin";
		t.y = 90;
		return t;
	};
	_proto.roleSelect_i = function () {
		var t = new BaseCustComponent();
		this.roleSelect = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.className = "RoleSelect";
		t.horizontalCenter = 1.5;
		t.skinName = "RoleSelectSkin";
		t.width = 524;
		t.y = 2;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 95;
		t.horizontalCenter = 0;
		t.width = 292;
		t.y = 449;
		t.elementsContent = [this._Image4_i(),this._Image5_i(),this._Image6_i(),this.propList_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(19,14,119,27);
		t.source = "public_json.public_prop_rect_png";
		t.top = -11;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.height = 2;
		t.left = 0;
		t.right = 2;
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 58;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 2;
		t.left = 2;
		t.right = 2;
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 26;
		return t;
	};
	_proto.propList_i = function () {
		var t = new BaseCustComponent();
		this.propList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 15;
		t.className = "PropPart";
		t.left = 0;
		t.right = 0;
		t.skinName = "PropPartSkin";
		t.top = 4;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.height = 3;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "public_json.public_slice_line_png";
		t.width = 506;
		t.x = 14;
		t.y = 554;
		return t;
	};
	_proto.mBtn_i = function () {
		var t = new eui.Image();
		this.mBtn = t;
		t.source = "strength_json.strength_refineMaster_png";
		t.x = 26;
		t.y = 567;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "strength_json.strength_text_1_png";
		t.x = 221;
		t.y = 313;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "strength_json.strength_cycle_icon_png";
		t.x = 212;
		t.y = 212;
		return t;
	};
	_proto.seleImg_i = function () {
		var t = new eui.Image();
		this.seleImg = t;
		t.source = "strength_json.strength_part0_png";
		t.x = 223;
		t.y = 225;
		return t;
	};
	_proto.sGroup_i = function () {
		var t = new eui.Group();
		this.sGroup = t;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0.5;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.y = 94;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this.item_0_i(),this.item_1_i(),this.item_2_i(),this.item_3_i(),this.item_4_i(),this.item_5_i(),this.item_6_i(),this.item_7_i(),this.item_8_i(),this.item_9_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 320;
		t.orientation = "rows";
		t.requestedColumnCount = 2;
		t.verticalGap = 12;
		return t;
	};
	_proto.item_0_i = function () {
		var t = new BaseCustComponent();
		this.item_0 = t;
		t.className = "EquipItem";
		t.name = "0";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = -265;
		t.y = -180;
		return t;
	};
	_proto.item_1_i = function () {
		var t = new BaseCustComponent();
		this.item_1 = t;
		t.className = "EquipItem";
		t.name = "1";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = -255;
		t.y = -170;
		return t;
	};
	_proto.item_2_i = function () {
		var t = new BaseCustComponent();
		this.item_2 = t;
		t.className = "EquipItem";
		t.name = "2";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = -245;
		t.y = -160;
		return t;
	};
	_proto.item_3_i = function () {
		var t = new BaseCustComponent();
		this.item_3 = t;
		t.className = "EquipItem";
		t.name = "3";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = -235;
		t.y = -150;
		return t;
	};
	_proto.item_4_i = function () {
		var t = new BaseCustComponent();
		this.item_4 = t;
		t.className = "EquipItem";
		t.name = "4";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = -225;
		t.y = -140;
		return t;
	};
	_proto.item_5_i = function () {
		var t = new BaseCustComponent();
		this.item_5 = t;
		t.className = "EquipItem";
		t.name = "5";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = -215;
		t.y = -130;
		return t;
	};
	_proto.item_6_i = function () {
		var t = new BaseCustComponent();
		this.item_6 = t;
		t.className = "EquipItem";
		t.name = "6";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = -205;
		t.y = -120;
		return t;
	};
	_proto.item_7_i = function () {
		var t = new BaseCustComponent();
		this.item_7 = t;
		t.className = "EquipItem";
		t.name = "7";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = -195;
		t.y = -110;
		return t;
	};
	_proto.item_8_i = function () {
		var t = new BaseCustComponent();
		this.item_8 = t;
		t.className = "EquipItem";
		t.name = "8";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = -185;
		t.y = -100;
		return t;
	};
	_proto.item_9_i = function () {
		var t = new BaseCustComponent();
		this.item_9 = t;
		t.className = "EquipItem";
		t.name = "9";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = -175;
		t.y = -90;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.horizontalCenter = 0;
		t.icon = "res/btn/refine.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.y = 591;
		return t;
	};
	_proto.cost_1_i = function () {
		var t = new ItemExpend();
		this.cost_1 = t;
		t.skinName = "ItemExpend2Skin";
		t.x = 139;
		t.y = 334;
		return t;
	};
	_proto.cost_0_i = function () {
		var t = new ItemExpend();
		this.cost_0 = t;
		t.skinName = "ItemExpend2Skin";
		t.x = 319;
		t.y = 334;
		return t;
	};
	_proto.re_i = function () {
		var t = new eui.Label();
		this.re = t;
		t.horizontalCenter = 88.5;
		t.size = 14;
		t.stroke = 0.5;
		t.text = "精练石";
		t.textColor = 0xFFFFFF;
		t.y = 393;
		return t;
	};
	_proto.money_i = function () {
		var t = new eui.Label();
		this.money = t;
		t.horizontalCenter = -91.5;
		t.size = 14;
		t.stroke = 0.5;
		t.text = "金币";
		t.textColor = 0xffffff;
		t.y = 394;
		return t;
	};
	_proto.mPro_i = function () {
		var t = new eui.Label();
		this.mPro = t;
		t.size = 14;
		t.stroke = 0;
		t.text = "0/30";
		t.textColor = 0x00a2ff;
		t.x = 53;
		t.y = 648;
		return t;
	};
	_proto.num_i = function () {
		var t = new NumberMC();
		this.num = t;
		t.horizontalCenter = -193.5;
		t.type = "strength_json.strength_num_";
		t.y = 633;
		return t;
	};
	_proto._NumberMC1_i = function () {
		var t = new NumberMC();
		t.gap = 10;
		t.height = 20;
		t.width = 20;
		t.x = 244;
		t.y = 375;
		return t;
	};
	return RefinePannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/revive/ReviveTipsSkin.exml'] = window.ReviveTipsSkin = (function (_super) {
	__extends(ReviveTipsSkin, _super);
	function ReviveTipsSkin() {
		_super.call(this);
		this.skinParts = ["bg","btn_0","btn_1","lbValue","imgRoleBg0","imgRole0","imgRoleBg1","imgRole1","imgRoleBg2","imgRole2","lbNextTime"];
		
		this.height = 350;
		this.width = 436;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this._Image2_i(),this._Group1_i(),this.btn_0_i(),this.btn_1_i(),this._Group2_i(),this._Group6_i(),this.lbNextTime_i()];
	}
	var _proto = ReviveTipsSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 95;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "public_json.public_slice_line_png";
		t.width = 415;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 98;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(19,12,121,74);
		t.source = "public_json.public_rect_1_png";
		t.width = 372;
		t.y = 140;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.verticalCenter = 14;
		t.x = 54;
		t.y = 268;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image3_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "public_json.public_revive_img_png";
		t.x = -7.33;
		t.y = 14;
		return t;
	};
	_proto.btn_0_i = function () {
		var t = new eui.Button();
		this.btn_0 = t;
		t.icon = "res/btn/confirm.png";
		t.label = "Button";
		t.right = 63;
		t.skinName = "BtnIconSkin";
		t.x = 63;
		t.y = 268;
		return t;
	};
	_proto.btn_1_i = function () {
		var t = new eui.Button();
		this.btn_1 = t;
		t.bottom = 25;
		t.icon = "res/btn/cancel.png";
		t.label = "Button";
		t.left = 63;
		t.skinName = "BtnIconSkin";
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 86.69;
		t.elementsContent = [this._Label1_i(),this._Image4_i(),this.lbValue_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 18;
		t.text = "确定花费            立即复活已死亡角色?";
		t.textColor = 0x4c2f27;
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "res/images/item/14.png";
		t.verticalCenter = 0;
		t.x = 71.64;
		return t;
	};
	_proto.lbValue_i = function () {
		var t = new eui.Label();
		this.lbValue = t;
		t.horizontalCenter = -37;
		t.size = 18;
		t.text = "10";
		t.textColor = 0x00a2ff;
		t.verticalCenter = 0.5;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.x = 164.66;
		t.y = 152.32;
		t.layout = this._HorizontalLayout2_i();
		t.elementsContent = [this._Group3_i(),this._Group4_i(),this._Group5_i()];
		return t;
	};
	_proto._HorizontalLayout2_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this.imgRoleBg0_i(),this.imgRole0_i()];
		return t;
	};
	_proto.imgRoleBg0_i = function () {
		var t = new eui.Image();
		this.imgRoleBg0 = t;
		t.source = "public_json.public_icon_bg2_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgRole0_i = function () {
		var t = new eui.Image();
		this.imgRole0 = t;
		t.source = "public_json.public_icon_role_1_png";
		t.x = 4.34;
		t.y = 4.68;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.x = 10;
		t.y = 10;
		t.elementsContent = [this.imgRoleBg1_i(),this.imgRole1_i()];
		return t;
	};
	_proto.imgRoleBg1_i = function () {
		var t = new eui.Image();
		this.imgRoleBg1 = t;
		t.source = "public_json.public_icon_bg2_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgRole1_i = function () {
		var t = new eui.Image();
		this.imgRole1 = t;
		t.source = "public_json.public_icon_role_1_png";
		t.x = 4.34;
		t.y = 4.68;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.x = 20;
		t.y = 20;
		t.elementsContent = [this.imgRoleBg2_i(),this.imgRole2_i()];
		return t;
	};
	_proto.imgRoleBg2_i = function () {
		var t = new eui.Image();
		this.imgRoleBg2 = t;
		t.source = "public_json.public_icon_bg2_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgRole2_i = function () {
		var t = new eui.Image();
		this.imgRole2 = t;
		t.source = "public_json.public_icon_role_1_png";
		t.x = 4.34;
		t.y = 4.68;
		return t;
	};
	_proto.lbNextTime_i = function () {
		var t = new eui.Label();
		this.lbNextTime = t;
		t.horizontalCenter = 0;
		t.size = 8;
		t.text = "";
		t.textColor = 0x37b74c;
		t.y = 124;
		return t;
	};
	return ReviveTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/role/RoleIconSkin.exml'] = window.RoleIconSkin = (function (_super) {
	__extends(RoleIconSkin, _super);
	function RoleIconSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i()];
	}
	var _proto = RoleIconSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "public_json.public_icon_bg2_png";
		t.verticalCenter = 0;
		return t;
	};
	return RoleIconSkin;
})(eui.Skin);generateEUI.paths['resource/exml/role/RoleInfoItemSkin.exml'] = window.RoleInfoItemSkin = (function (_super) {
	__extends(RoleInfoItemSkin, _super);
	function RoleInfoItemSkin() {
		_super.call(this);
		this.skinParts = ["roleType","imgRoleSl"];
		
		this.elementsContent = [this.roleType_i(),this.imgRoleSl_i()];
	}
	var _proto = RoleInfoItemSkin.prototype;

	_proto.roleType_i = function () {
		var t = new eui.Image();
		this.roleType = t;
		t.source = "public_json.public_role_0_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgRoleSl_i = function () {
		var t = new eui.Image();
		this.imgRoleSl = t;
		t.source = "public_json.public_role_select_png";
		t.x = 106;
		t.y = 49;
		return t;
	};
	return RoleInfoItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/role/RoleOtherPannelInfoSkin.exml'] = window.RoleOtherPannelInfoSkin = (function (_super) {
	__extends(RoleOtherPannelInfoSkin, _super);
	function RoleOtherPannelInfoSkin() {
		_super.call(this);
		this.skinParts = ["i1","zdl","gPart","gNe","role","roleSelect"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = RoleOtherPannelInfoSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = -5;
		t.elementsContent = [this.i1_i(),this.zdl_i(),this.gPart_i(),this.gNe_i(),this.role_i(),this.roleSelect_i()];
		return t;
	};
	_proto.i1_i = function () {
		var t = new eui.Image();
		this.i1 = t;
		t.anchorOffsetX = 0;
		t.height = 482;
		t.horizontalCenter = 0;
		t.source = "res/images/bg/roleBg.jpg";
		t.width = 506;
		t.y = 85;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new BaseCustComponent();
		this.zdl = t;
		t.anchorOffsetX = 29;
		t.anchorOffsetY = 0;
		t.className = "ZdlPrint";
		t.horizontalCenter = 0;
		t.skinName = "ZdlPrintSkin";
		t.y = 100;
		return t;
	};
	_proto.gPart_i = function () {
		var t = new eui.Group();
		this.gPart = t;
		t.anchorOffsetX = 0;
		t.width = 503;
		t.x = 13;
		t.y = 100.22;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this._BaseCustComponent1_i(),this._BaseCustComponent2_i(),this._BaseCustComponent3_i(),this._BaseCustComponent4_i(),this._BaseCustComponent5_i(),this._BaseCustComponent6_i(),this._BaseCustComponent7_i(),this._BaseCustComponent8_i(),this._BaseCustComponent9_i(),this._BaseCustComponent10_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 337;
		t.requestedColumnCount = 2;
		t.requestedRowCount = 5;
		t.verticalGap = 9;
		return t;
	};
	_proto._BaseCustComponent1_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "0";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._BaseCustComponent2_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "1";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._BaseCustComponent3_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "2";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 20;
		t.y = 20;
		return t;
	};
	_proto._BaseCustComponent4_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "3";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 30;
		t.y = 30;
		return t;
	};
	_proto._BaseCustComponent5_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "4";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 40;
		t.y = 40;
		return t;
	};
	_proto._BaseCustComponent6_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "5";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 50;
		t.y = 50;
		return t;
	};
	_proto._BaseCustComponent7_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "6";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 60;
		t.y = 60;
		return t;
	};
	_proto._BaseCustComponent8_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "7";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 70;
		t.y = 70;
		return t;
	};
	_proto._BaseCustComponent9_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "8";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 80;
		t.y = 80;
		return t;
	};
	_proto._BaseCustComponent10_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "9";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 90;
		t.y = 90;
		return t;
	};
	_proto.gNe_i = function () {
		var t = new eui.Group();
		this.gNe = t;
		t.x = 274;
		t.y = 211;
		return t;
	};
	_proto.role_i = function () {
		var t = new BaseCustComponent();
		this.role = t;
		t.className = "UIAvatar";
		t.x = 262;
		t.y = 420;
		return t;
	};
	_proto.roleSelect_i = function () {
		var t = new BaseCustComponent();
		this.roleSelect = t;
		t.className = "RoleOtherSelect";
		t.skinName = "RoleSelectSkin";
		t.width = 524;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return RoleOtherPannelInfoSkin;
})(eui.Skin);generateEUI.paths['resource/exml/role/RoleOtherPannelInfoWinSkin.exml'] = window.RoleOtherPannelInfoWinSkin = (function (_super) {
	__extends(RoleOtherPannelInfoWinSkin, _super);
	function RoleOtherPannelInfoWinSkin() {
		_super.call(this);
		this.skinParts = ["bg","cn","viewContent"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = RoleOtherPannelInfoWinSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.touchThrough = true;
		t.elementsContent = [this.bg_i(),this.viewContent_i()];
		return t;
	};
	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.skinName = "BaseWinBg2Skin";
		t.width = 546;
		return t;
	};
	_proto.viewContent_i = function () {
		var t = new eui.Group();
		this.viewContent = t;
		t.anchorOffsetY = 0;
		t.bottom = 24;
		t.horizontalCenter = 0;
		t.top = 75;
		t.touchEnabled = false;
		t.elementsContent = [this.cn_i()];
		return t;
	};
	_proto.cn_i = function () {
		var t = new BaseCustComponent();
		this.cn = t;
		t.className = "RoleOtherPannelInfo";
		t.skinName = "RoleOtherPannelInfoSkin";
		t.x = -5;
		t.y = -2;
		return t;
	};
	return RoleOtherPannelInfoWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/role/RolePannelEquipSkin.exml'] = window.RolePannelEquipSkin = (function (_super) {
	__extends(RolePannelEquipSkin, _super);
	function RolePannelEquipSkin() {
		_super.call(this);
		this.skinParts = ["i1","zdl","gPart","i2","gNe","role","roleSelect","imgTransfer","oneBtn"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = RolePannelEquipSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.top = 0;
		t.width = 535;
		t.x = 0;
		t.elementsContent = [this.i1_i(),this.zdl_i(),this.gPart_i(),this.i2_i(),this.gNe_i(),this.role_i(),this.roleSelect_i(),this.imgTransfer_i(),this.oneBtn_i()];
		return t;
	};
	_proto.i1_i = function () {
		var t = new eui.Image();
		this.i1 = t;
		t.anchorOffsetX = 0;
		t.height = 482;
		t.source = "res/images/bg/roleBg.jpg";
		t.width = 506;
		t.x = 1;
		t.y = 80;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new BaseCustComponent();
		this.zdl = t;
		t.anchorOffsetX = 29;
		t.anchorOffsetY = 0;
		t.className = "ZdlPrint";
		t.horizontalCenter = -11.5;
		t.skinName = "ZdlPrintSkin";
		t.y = 95;
		return t;
	};
	_proto.gPart_i = function () {
		var t = new eui.Group();
		this.gPart = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = -9;
		t.width = 503;
		t.y = 95.22;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this._BaseCustComponent1_i(),this._BaseCustComponent2_i(),this._BaseCustComponent3_i(),this._BaseCustComponent4_i(),this._BaseCustComponent5_i(),this._BaseCustComponent6_i(),this._BaseCustComponent7_i(),this._BaseCustComponent8_i(),this._BaseCustComponent9_i(),this._BaseCustComponent10_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 337;
		t.requestedColumnCount = 2;
		t.requestedRowCount = 5;
		t.verticalGap = 9;
		return t;
	};
	_proto._BaseCustComponent1_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "0";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._BaseCustComponent2_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "1";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 10;
		t.y = 10;
		return t;
	};
	_proto._BaseCustComponent3_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "2";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 20;
		t.y = 20;
		return t;
	};
	_proto._BaseCustComponent4_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "3";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 30;
		t.y = 30;
		return t;
	};
	_proto._BaseCustComponent5_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "4";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 40;
		t.y = 40;
		return t;
	};
	_proto._BaseCustComponent6_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "5";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 50;
		t.y = 50;
		return t;
	};
	_proto._BaseCustComponent7_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "6";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 60;
		t.y = 60;
		return t;
	};
	_proto._BaseCustComponent8_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "7";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 70;
		t.y = 70;
		return t;
	};
	_proto._BaseCustComponent9_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "8";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 80;
		t.y = 80;
		return t;
	};
	_proto._BaseCustComponent10_i = function () {
		var t = new BaseCustComponent();
		t.className = "EquipItem";
		t.name = "9";
		t.skinName = "ItembaseSkin";
		t.touchChildren = false;
		t.x = 90;
		t.y = 90;
		return t;
	};
	_proto.i2_i = function () {
		var t = new eui.Button();
		this.i2 = t;
		t.horizontalCenter = -12;
		t.icon = "role_json.role_look_art_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.y = 485;
		return t;
	};
	_proto.gNe_i = function () {
		var t = new eui.Group();
		this.gNe = t;
		t.horizontalCenter = 0;
		t.y = 206;
		return t;
	};
	_proto.role_i = function () {
		var t = new BaseCustComponent();
		this.role = t;
		t.className = "UIAvatar";
		t.x = 255;
		t.y = 415;
		return t;
	};
	_proto.roleSelect_i = function () {
		var t = new BaseCustComponent();
		this.roleSelect = t;
		t.className = "RoleSelect";
		t.horizontalCenter = -11.5;
		t.skinName = "RoleSelectSkin";
		t.top = -5;
		t.width = 524;
		return t;
	};
	_proto.imgTransfer_i = function () {
		var t = new eui.Image();
		this.imgTransfer = t;
		t.name = "TRANSFER";
		t.source = "role_json.role_ransfer_png";
		t.x = 329;
		t.y = 146;
		return t;
	};
	_proto.oneBtn_i = function () {
		var t = new eui.Button();
		this.oneBtn = t;
		t.horizontalCenter = -10.5;
		t.icon = "res/btn/oneBtn.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.y = 436;
		return t;
	};
	return RolePannelEquipSkin;
})(eui.Skin);generateEUI.paths['resource/exml/role/RolePartSkin.exml'] = window.RolePartSkin = (function (_super) {
	__extends(RolePartSkin, _super);
	function RolePartSkin() {
		_super.call(this);
		this.skinParts = ["bg","part","icon"];
		
		this.elementsContent = [this.bg_i(),this.part_i(),this.icon_i()];
	}
	var _proto = RolePartSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.horizontalCenter = 0;
		t.source = "role_json.role_item_rect_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.part_i = function () {
		var t = new eui.Image();
		this.part = t;
		t.source = "role_json.role_part_0_png";
		t.x = 3;
		t.y = 51;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = 0;
		t.source = "role_json.role_part_0_png";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	return RolePartSkin;
})(eui.Skin);generateEUI.paths['resource/exml/role/RoleProTipsSkin.exml'] = window.RoleProTipsSkin = (function (_super) {
	__extends(RoleProTipsSkin, _super);
	function RoleProTipsSkin() {
		_super.call(this);
		this.skinParts = ["tips1","pro1","pro2","att1","tips2","pro3","pro4","att2"];
		
		this.width = 407;
		this.elementsContent = [this._Image1_i(),this._Group1_i()];
	}
	var _proto = RoleProTipsSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(273,70,61,25);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "win_json.win_tips_bg2_png";
		t.top = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 16;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.layout = this._VerticalLayout1_i();
		t.elementsContent = [this.tips1_i(),this.att1_i(),this.tips2_i(),this.att2_i()];
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto.tips1_i = function () {
		var t = new eui.Group();
		this.tips1 = t;
		t.height = 56;
		t.width = 407;
		t.x = 113;
		t.y = 27;
		t.elementsContent = [this._Image2_i(),this._Image3_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "role_json.role_tips_2_png";
		t.x = 0;
		t.y = 19;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 3;
		t.left = 4;
		t.right = 4;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "public_json.public_tips_line_png";
		t.y = 47;
		return t;
	};
	_proto.att1_i = function () {
		var t = new eui.Group();
		this.att1 = t;
		t.x = 87;
		t.y = -23;
		t.elementsContent = [this.pro1_i(),this.pro2_i()];
		return t;
	};
	_proto.pro1_i = function () {
		var t = new BaseCustComponent();
		this.pro1 = t;
		t.className = "PropPart";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "PropPartSkin";
		t.x = 16;
		return t;
	};
	_proto.pro2_i = function () {
		var t = new BaseCustComponent();
		this.pro2 = t;
		t.className = "PropPart";
		t.skinName = "PropPartSkin";
		t.x = 220;
		return t;
	};
	_proto.tips2_i = function () {
		var t = new eui.Group();
		this.tips2 = t;
		t.height = 56;
		t.width = 407;
		t.x = 151;
		t.y = 220;
		t.elementsContent = [this._Image4_i(),this._Image5_i(),this._Image6_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.height = 3;
		t.left = 4;
		t.right = 4;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "public_json.public_tips_line_png";
		t.y = 0;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "role_json.role_tips_1_png";
		t.x = -73;
		t.y = 16;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.height = 3;
		t.left = 4;
		t.right = 4;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "public_json.public_tips_line_png";
		t.y = 46;
		return t;
	};
	_proto.att2_i = function () {
		var t = new eui.Group();
		this.att2 = t;
		t.x = 97;
		t.y = -13;
		t.elementsContent = [this.pro3_i(),this.pro4_i()];
		return t;
	};
	_proto.pro3_i = function () {
		var t = new BaseCustComponent();
		this.pro3 = t;
		t.className = "PropPart";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "PropPartSkin";
		t.x = 16;
		return t;
	};
	_proto.pro4_i = function () {
		var t = new BaseCustComponent();
		this.pro4 = t;
		t.className = "PropPart";
		t.skinName = "PropPartSkin";
		t.x = 220;
		return t;
	};
	return RoleProTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/wing/component/StarProgressSkin.exml'] = window.StarProgressSkin = (function (_super) {
	__extends(StarProgressSkin, _super);
	function StarProgressSkin() {
		_super.call(this);
		this.skinParts = ["itemList"];
		
		this.elementsContent = [this.itemList_i()];
	}
	var _proto = StarProgressSkin.prototype;

	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.bottom = 0;
		t.itemRendererSkinName = StarItemSkin;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.layout = this._HorizontalLayout1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		return t;
	};
	return StarProgressSkin;
})(eui.Skin);generateEUI.paths['resource/exml/rune/RuneSkillItemSkin.exml'] = window.RuneSkillItemSkin = (function (_super) {
	__extends(RuneSkillItemSkin, _super);
	function RuneSkillItemSkin() {
		_super.call(this);
		this.skinParts = ["sIcon","sName","condi"];
		
		this.height = 97;
		this.elementsContent = [this._Image1_i(),this.sIcon_i(),this.sName_i(),this.condi_i()];
	}
	var _proto = RuneSkillItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "rune_json.rune_skill_bg_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.sIcon_i = function () {
		var t = new eui.Image();
		this.sIcon = t;
		t.source = "rune_json.rune_skill_ico_1_1_png";
		t.x = 4;
		t.y = 4;
		return t;
	};
	_proto.sName_i = function () {
		var t = new eui.Image();
		this.sName = t;
		t.horizontalCenter = 0;
		t.source = "rune_json.rune_skill_name_1_png";
		t.y = 60;
		return t;
	};
	_proto.condi_i = function () {
		var t = new eui.Label();
		this.condi = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "30阶开启";
		t.textColor = 0x00eaff;
		return t;
	};
	return RuneSkillItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/rune/RunePageSkin.exml'] = window.RunePageSkin = (function (_super) {
	__extends(RunePageSkin, _super);
	function RunePageSkin() {
		_super.call(this);
		this.skinParts = ["lvlMax","pro","zdl","roleSelect","starPro","cost","item","propList","rName","pBtn","skill_0","skill_1","skill_2","skill_3","num"];
		
		this.height = 565;
		this.width = 510;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this.lvlMax_i(),this.pro_i(),this.zdl_i(),this.roleSelect_i(),this.starPro_i(),this.cost_i(),this.item_i(),this._Group1_i(),this.rName_i(),this.pBtn_i(),this._Group2_i(),this.num_i()];
	}
	var _proto = RunePageSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 2;
		t.height = 483;
		t.horizontalCenter = -1;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.width = 506;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "res/images/bg/runeBg.png";
		t.x = 8;
		t.y = 90;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_item_bg3_png";
		t.x = 220;
		t.y = 200;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_starBar_blank_png";
		t.x = 121;
		t.y = 317;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 4;
		t.height = 87;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(23,13,115,26);
		t.source = "public_json.public_prop_rect_png";
		t.width = 494;
		return t;
	};
	_proto.lvlMax_i = function () {
		var t = new eui.Image();
		this.lvlMax = t;
		t.source = "public_json.public_lvl_max2_png";
		t.x = 178;
		t.y = 497;
		return t;
	};
	_proto.pro_i = function () {
		var t = new eui.ProgressBar();
		this.pro = t;
		t.skinName = "progressBarSkin5";
		t.slideDuration = 0;
		t.x = 119;
		t.y = 339;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new BaseCustComponent();
		this.zdl = t;
		t.anchorOffsetX = 29;
		t.anchorOffsetY = 0;
		t.className = "ZdlPrint";
		t.skinName = "ZdlPrintSkin";
		t.x = 150;
		t.y = 93;
		return t;
	};
	_proto.roleSelect_i = function () {
		var t = new BaseCustComponent();
		this.roleSelect = t;
		t.anchorOffsetY = 0;
		t.className = "RoleSelect";
		t.skinName = "RoleSelectSkin";
		t.x = 3;
		t.y = -5;
		return t;
	};
	_proto.starPro_i = function () {
		var t = new BaseCustComponent();
		this.starPro = t;
		t.className = "StarProgress";
		t.horizontalCenter = 0;
		t.skinName = "StarProgressSkin";
		t.y = 319;
		return t;
	};
	_proto.cost_i = function () {
		var t = new ItemExpend();
		this.cost = t;
		t.skinName = "ItemExpend3Skin";
		t.x = 108;
		t.y = 486;
		return t;
	};
	_proto.item_i = function () {
		var t = new BaseCustComponent();
		this.item = t;
		t.className = "ItemBase";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ItembaseSkin";
		t.x = 23;
		t.y = 480;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 99;
		t.width = 292;
		t.x = 109;
		t.y = 365;
		t.elementsContent = [this._Image6_i(),this._Image7_i(),this._Image8_i(),this.propList_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(11,12,16,15);
		t.source = "public_json.public_rect_5_png";
		t.top = 0;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 65;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.x = 10;
		t.y = 34;
		return t;
	};
	_proto.propList_i = function () {
		var t = new BaseCustComponent();
		this.propList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 11;
		t.className = "PropPart";
		t.left = 16;
		t.right = 0;
		t.skinName = "PropPartSkin";
		t.top = 11;
		return t;
	};
	_proto.rName_i = function () {
		var t = new eui.Image();
		this.rName = t;
		t.source = "rune_json.rune_name_1_png";
		t.x = 207;
		t.y = 135;
		return t;
	};
	_proto.pBtn_i = function () {
		var t = new eui.Button();
		this.pBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57;
		t.icon = "res/btn/risingBtn.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.width = 142;
		t.x = 337;
		t.y = 487;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 232;
		t.horizontalCenter = 0;
		t.touchThrough = true;
		t.y = 139;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this.skill_0_i(),this.skill_1_i(),this.skill_2_i(),this.skill_3_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalAlign = "center";
		t.horizontalGap = 324;
		t.requestedRowCount = 2;
		t.verticalAlign = "middle";
		t.verticalGap = 7;
		return t;
	};
	_proto.skill_0_i = function () {
		var t = new BaseCustComponent();
		this.skill_0 = t;
		t.className = "RuneSkillItem";
		t.skinName = "RuneSkillItemSkin";
		t.x = 60;
		t.y = 72;
		return t;
	};
	_proto.skill_1_i = function () {
		var t = new BaseCustComponent();
		this.skill_1 = t;
		t.className = "RuneSkillItem";
		t.skinName = "RuneSkillItemSkin";
		t.x = 70;
		t.y = 82;
		return t;
	};
	_proto.skill_2_i = function () {
		var t = new BaseCustComponent();
		this.skill_2 = t;
		t.className = "RuneSkillItem";
		t.skinName = "RuneSkillItemSkin";
		t.x = 80;
		t.y = 92;
		return t;
	};
	_proto.skill_3_i = function () {
		var t = new BaseCustComponent();
		this.skill_3 = t;
		t.className = "RuneSkillItem";
		t.skinName = "RuneSkillItemSkin";
		t.x = 90;
		t.y = 102;
		return t;
	};
	_proto.num_i = function () {
		var t = new NumberMC();
		this.num = t;
		t.type = "rune_json.rune_lvl_num_";
		t.x = 249;
		t.y = 292;
		return t;
	};
	return RunePageSkin;
})(eui.Skin);generateEUI.paths['resource/exml/shop/ShopBaseItemSkin.exml'] = window.ShopBaseItemSkin = (function (_super) {
	__extends(ShopBaseItemSkin, _super);
	function ShopBaseItemSkin() {
		_super.call(this);
		this.skinParts = ["imgItem0","lbNum0","imgItem1","lbNum1","lbLimit","gLimit","eBtn","icon","imgSale","lbNe"];
		
		this.elementsContent = [this._Group4_i()];
	}
	var _proto = ShopBaseItemSkin.prototype;

	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.x = 1;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this._Group1_i(),this._Group2_i(),this.gLimit_i(),this.eBtn_i(),this._Group3_i(),this.lbNe_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "shop_json.shop_img_3_png";
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 87;
		t.y = 48;
		t.elementsContent = [this._Label1_i(),this.imgItem0_i(),this.lbNum0_i(),this._Image2_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.left = 8;
		t.size = 18;
		t.text = "原价 :";
		t.textColor = 0x3e1700;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto.imgItem0_i = function () {
		var t = new eui.Image();
		this.imgItem0 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "res/images/item/14.png";
		t.touchEnabled = false;
		t.x = 56;
		t.y = 0;
		return t;
	};
	_proto.lbNum0_i = function () {
		var t = new eui.Label();
		this.lbNum0 = t;
		t.size = 18;
		t.text = "9999";
		t.textColor = 0x3e1700;
		t.touchEnabled = false;
		t.verticalCenter = 2.5;
		t.x = 88;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.height = 2;
		t.source = "shop_json.shop_img_4_png";
		t.width = 123;
		t.x = 3;
		t.y = 12;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 86;
		t.y = 70;
		t.elementsContent = [this._Label2_i(),this.imgItem1_i(),this.lbNum1_i()];
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.left = 8;
		t.size = 18;
		t.text = "价格 :";
		t.textColor = 0xFDFFD9;
		t.touchEnabled = false;
		t.verticalCenter = 0.5;
		return t;
	};
	_proto.imgItem1_i = function () {
		var t = new eui.Image();
		this.imgItem1 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "res/images/item/14.png";
		t.touchEnabled = false;
		t.x = 57;
		t.y = 0;
		return t;
	};
	_proto.lbNum1_i = function () {
		var t = new eui.Label();
		this.lbNum1 = t;
		t.size = 18;
		t.text = "9999";
		t.textColor = 0xFDFFD9;
		t.touchEnabled = false;
		t.verticalCenter = 2.5;
		t.x = 88;
		return t;
	};
	_proto.gLimit_i = function () {
		var t = new eui.Group();
		this.gLimit = t;
		t.x = 8;
		t.y = 103;
		t.elementsContent = [this._Image3_i(),this.lbLimit_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 22.85;
		t.source = "shop_json.shop_img_5_png";
		t.width = 139;
		t.x = 0;
		t.y = 1.15;
		return t;
	};
	_proto.lbLimit_i = function () {
		var t = new eui.Label();
		this.lbLimit = t;
		t.size = 16;
		t.text = "每日限购 : 0/1";
		t.textColor = 0xffc600;
		t.verticalCenter = 0;
		t.x = 6;
		return t;
	};
	_proto.eBtn_i = function () {
		var t = new eui.Button();
		this.eBtn = t;
		t.icon = "res/btn/buy3.png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.touchEnabled = true;
		t.x = 166;
		t.y = 99;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.x = 7;
		t.y = 17;
		t.elementsContent = [this.icon_i(),this.imgSale_i()];
		return t;
	};
	_proto.icon_i = function () {
		var t = new BaseCustComponent();
		this.icon = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgSale_i = function () {
		var t = new eui.Image();
		this.imgSale = t;
		t.source = "shop_json.shop_sale_1_png";
		t.touchEnabled = false;
		t.x = 1;
		t.y = 1;
		return t;
	};
	_proto.lbNe_i = function () {
		var t = new eui.Label();
		this.lbNe = t;
		t.size = 18;
		t.text = "道具名称";
		t.textColor = 0x3e1700;
		t.x = 97;
		t.y = 21;
		return t;
	};
	return ShopBaseItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/shop/ShopBasePannelSkin.exml'] = window.ShopBasePannelSkin = (function (_super) {
	__extends(ShopBasePannelSkin, _super);
	function ShopBasePannelSkin() {
		_super.call(this);
		this.skinParts = ["listLb"];
		
		this.height = 588;
		this.width = 500;
		this.elementsContent = [this._Scroller1_i(),this._Image1_i(),this._Image2_i()];
	}
	var _proto = ShopBasePannelSkin.prototype;

	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.bottom = -6;
		t.height = 500;
		t.horizontalCenter = 0;
		t.width = 500;
		t.viewport = this.listLb_i();
		return t;
	};
	_proto.listLb_i = function () {
		var t = new eui.List();
		this.listLb = t;
		t.anchorOffsetY = 0;
		t.itemRendererSkinName = ShopBaseItemSkin;
		t.x = 1;
		t.y = -14.67;
		t.layout = this._TileLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.paddingLeft = 4;
		t.requestedColumnCount = 2;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.source = "shop_json.shop_img_2_png";
		t.x = 10;
		t.y = 16;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.left = 5;
		t.source = "shop_json.shop_img_1_png";
		t.y = 21;
		return t;
	};
	return ShopBasePannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/shop/ShopTipsSkin.exml'] = window.ShopTipsSkin = (function (_super) {
	__extends(ShopTipsSkin, _super);
	function ShopTipsSkin() {
		_super.call(this);
		this.skinParts = ["bg","item","cost","desc","numSele","itemName","bBtn"];
		
		this.width = 435;
		this.elementsContent = [this.bg_i(),this._Image1_i(),this._Image2_i(),this._Image3_i(),this.item_i(),this.cost_i(),this._Group1_i(),this.numSele_i(),this.itemName_i(),this.bBtn_i()];
	}
	var _proto = ShopTipsSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 98;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "public_json.public_slice_line_png";
		t.width = 415;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 116;
		t.horizontalCenter = 0;
		t.source = "public_json.public_blank_1_png";
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "public_json.public_item_name_png";
		t.top = 165;
		return t;
	};
	_proto.item_i = function () {
		var t = new BaseCustComponent();
		this.item = t;
		t.horizontalCenter = 0;
		t.skinName = "ItembaseSkin";
		t.y = 77;
		return t;
	};
	_proto.cost_i = function () {
		var t = new ItemExpend();
		this.cost = t;
		t.bottom = 121;
		t.currentState = "single";
		t.height = 20;
		t.width = 20;
		t.x = 181;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.bottom = 201;
		t.left = 0;
		t.right = 0;
		t.top = 201;
		t.elementsContent = [this._Image4_i(),this.desc_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.height = 35;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(19,12,121,74);
		t.source = "public_json.public_rect_1_png";
		t.top = 0;
		t.width = 402;
		return t;
	};
	_proto.desc_i = function () {
		var t = new eui.Label();
		this.desc = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 14;
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "";
		t.textColor = 0x4c2f27;
		t.top = 14;
		t.width = 359;
		return t;
	};
	_proto.numSele_i = function () {
		var t = new BaseCustComponent();
		this.numSele = t;
		t.bottom = 157;
		t.currentState = "s3";
		t.horizontalCenter = 0;
		t.skinName = "NumSelectSkin";
		return t;
	};
	_proto.itemName_i = function () {
		var t = new eui.Label();
		this.itemName = t;
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "Label";
		t.top = 168;
		return t;
	};
	_proto.bBtn_i = function () {
		var t = new eui.Button();
		this.bBtn = t;
		t.bottom = 28;
		t.horizontalCenter = 0;
		t.icon = "res/btn/buy1.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		return t;
	};
	return ShopTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/sign/SignItemSkin.exml'] = window.SignItemSkin = (function (_super) {
	__extends(SignItemSkin, _super);
	function SignItemSkin() {
		_super.call(this);
		this.skinParts = ["item","canSign","finish1","finish2","indexTx"];
		
		this.elementsContent = [this._Image1_i(),this.item_i(),this.canSign_i(),this.finish1_i(),this.finish2_i(),this.indexTx_i()];
	}
	var _proto = SignItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "sign_json.sign_7_png";
		return t;
	};
	_proto.item_i = function () {
		var t = new BaseCustComponent();
		this.item = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 14;
		t.y = 15;
		return t;
	};
	_proto.canSign_i = function () {
		var t = new eui.Image();
		this.canSign = t;
		t.source = "sign_json.sign_6_png";
		t.x = 40;
		t.y = 85;
		return t;
	};
	_proto.finish1_i = function () {
		var t = new eui.Image();
		this.finish1 = t;
		t.source = "sign_json.sign_5_png";
		t.y = 0;
		return t;
	};
	_proto.finish2_i = function () {
		var t = new eui.Image();
		this.finish2 = t;
		t.source = "sign_json.sign_4_png";
		t.x = 22;
		t.y = 24;
		return t;
	};
	_proto.indexTx_i = function () {
		var t = new eui.Label();
		this.indexTx = t;
		t.horizontalCenter = -41;
		t.size = 16;
		t.text = "1";
		t.y = 2;
		return t;
	};
	return SignItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/sign/SignWinSkin.exml'] = window.SignWinSkin = (function (_super) {
	__extends(SignWinSkin, _super);
	function SignWinSkin() {
		_super.call(this);
		this.skinParts = ["dailyList","item0","item1","item2","item3","flag0","flag1","flag2","flag3","totalDay","day0","day1","day2","day3","finish0","finish1","finish2","finish3","closeBtn"];
		
		this.elementsContent = [this._Image1_i(),this._Scroller1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this._Image5_i(),this._Image6_i(),this.item0_i(),this.item1_i(),this.item2_i(),this.item3_i(),this.flag0_i(),this.flag1_i(),this.flag2_i(),this.flag3_i(),this.totalDay_i(),this.day0_i(),this.day1_i(),this.day2_i(),this.day3_i(),this.finish0_i(),this.finish1_i(),this.finish2_i(),this.finish3_i(),this.closeBtn_i()];
	}
	var _proto = SignWinSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "sign_json.sign_bg_png";
		t.y = -130;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 279;
		t.width = 562;
		t.x = 55;
		t.y = 336;
		t.viewport = this.dailyList_i();
		return t;
	};
	_proto.dailyList_i = function () {
		var t = new eui.List();
		this.dailyList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.itemRendererSkinName = SignItemSkin;
		t.width = 564;
		t.x = 55;
		t.y = -2;
		t.layout = this._TileLayout1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 8;
		t.requestedColumnCount = 5;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "sign_json.sign_1_png";
		t.x = 47;
		t.y = 638;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "sign_json.sign_3_png";
		t.x = 155;
		t.y = 642;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "sign_json.sign_3_png";
		t.x = 277;
		t.y = 642;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "sign_json.sign_3_png";
		t.x = 399;
		t.y = 642;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "sign_json.sign_3_png";
		t.x = 521;
		t.y = 642;
		return t;
	};
	_proto.item0_i = function () {
		var t = new BaseCustComponent();
		this.item0 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 163;
		t.y = 644;
		return t;
	};
	_proto.item1_i = function () {
		var t = new BaseCustComponent();
		this.item1 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 285;
		t.y = 644;
		return t;
	};
	_proto.item2_i = function () {
		var t = new BaseCustComponent();
		this.item2 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 408;
		t.y = 644;
		return t;
	};
	_proto.item3_i = function () {
		var t = new BaseCustComponent();
		this.item3 = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 529;
		t.y = 644;
		return t;
	};
	_proto.flag0_i = function () {
		var t = new eui.Image();
		this.flag0 = t;
		t.source = "sign_json.sign_2_png";
		t.x = 195;
		t.y = 637;
		return t;
	};
	_proto.flag1_i = function () {
		var t = new eui.Image();
		this.flag1 = t;
		t.source = "sign_json.sign_2_png";
		t.x = 317;
		t.y = 637;
		return t;
	};
	_proto.flag2_i = function () {
		var t = new eui.Image();
		this.flag2 = t;
		t.source = "sign_json.sign_2_png";
		t.x = 440;
		t.y = 637;
		return t;
	};
	_proto.flag3_i = function () {
		var t = new eui.Image();
		this.flag3 = t;
		t.source = "sign_json.sign_2_png";
		t.x = 561;
		t.y = 637;
		return t;
	};
	_proto.totalDay_i = function () {
		var t = new eui.Label();
		this.totalDay = t;
		t.horizontalCenter = -266.5;
		t.size = 24;
		t.text = "15";
		t.y = 696;
		return t;
	};
	_proto.day0_i = function () {
		var t = new eui.Label();
		this.day0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 20;
		t.size = 18;
		t.text = "15天";
		t.textAlign = "center";
		t.width = 73;
		t.x = 166;
		t.y = 726;
		return t;
	};
	_proto.day1_i = function () {
		var t = new eui.Label();
		this.day1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 20;
		t.size = 18;
		t.text = "15天";
		t.textAlign = "center";
		t.width = 73;
		t.x = 287;
		t.y = 726;
		return t;
	};
	_proto.day2_i = function () {
		var t = new eui.Label();
		this.day2 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 20;
		t.size = 18;
		t.text = "15天";
		t.textAlign = "center";
		t.width = 73;
		t.x = 410;
		t.y = 726;
		return t;
	};
	_proto.day3_i = function () {
		var t = new eui.Label();
		this.day3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 20;
		t.size = 18;
		t.text = "15天";
		t.textAlign = "center";
		t.width = 73;
		t.x = 532;
		t.y = 726;
		return t;
	};
	_proto.finish0_i = function () {
		var t = new eui.Image();
		this.finish0 = t;
		t.source = "public_json.luck_img2_png";
		t.x = 167;
		t.y = 673;
		return t;
	};
	_proto.finish1_i = function () {
		var t = new eui.Image();
		this.finish1 = t;
		t.source = "public_json.luck_img2_png";
		t.x = 289;
		t.y = 673;
		return t;
	};
	_proto.finish2_i = function () {
		var t = new eui.Image();
		this.finish2 = t;
		t.source = "public_json.luck_img2_png";
		t.x = 413;
		t.y = 673;
		return t;
	};
	_proto.finish3_i = function () {
		var t = new eui.Image();
		this.finish3 = t;
		t.source = "public_json.luck_img2_png";
		t.x = 532;
		t.y = 673;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.source = "win_json.win_close_btn3_png";
		t.x = 584;
		t.y = 242;
		return t;
	};
	return SignWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/skill/newSkillSkin.exml'] = window.newSkillSkin = (function (_super) {
	__extends(newSkillSkin, _super);
	function newSkillSkin() {
		_super.call(this);
		this.skinParts = ["bg"];
		
		this.elementsContent = [this._Image1_i(),this.bg_i(),this._Label1_i(),this._Label2_i(),this._Label3_i()];
	}
	var _proto = newSkillSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 182;
		t.scale9Grid = new egret.Rectangle(130,64,3,53);
		t.source = "newtips_json.newtips_bg_png";
		t.width = 566;
		t.x = 0;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.horizontalCenter = -188;
		t.source = "public_json.public_icon_bg_png";
		t.verticalCenter = -15.5;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 18;
		t.text = "获得新技能：";
		t.textColor = 0x4C2F27;
		t.x = 150;
		t.y = 26;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 51;
		t.size = 18;
		t.text = "获得新技能：";
		t.textColor = 0x4c2f27;
		t.width = 374;
		t.x = 150;
		t.y = 52;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.horizontalCenter = 22;
		t.size = 18;
		t.text = "获得新技能";
		t.textColor = 0x00a2ff;
		t.y = 26;
		return t;
	};
	return newSkillSkin;
})(eui.Skin);generateEUI.paths['resource/exml/skill/SkillDeployViewSkin.exml'] = window.SkillDeployViewSkin = (function (_super) {
	__extends(SkillDeployViewSkin, _super);
	function SkillDeployViewSkin() {
		_super.call(this);
		this.skinParts = ["listHave","roleSelect","list","imgNum","skillName","skillDsc","moveIcon"];
		
		this.height = 565;
		this.width = 510;
		this.elementsContent = [this._Image1_i(),this.listHave_i(),this.roleSelect_i(),this.list_i(),this._Group1_i(),this.moveIcon_i()];
	}
	var _proto = SkillDeployViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.height = 482;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.width = 506;
		t.y = 80;
		return t;
	};
	_proto.listHave_i = function () {
		var t = new eui.List();
		this.listHave = t;
		t.itemRendererSkinName = SkillInfoSkin;
		t.touchThrough = false;
		t.x = 30;
		t.y = 441.35;
		t.layout = this._TileLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 14;
		t.requestedColumnCount = 4;
		t.verticalGap = 5;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto.roleSelect_i = function () {
		var t = new BaseCustComponent();
		this.roleSelect = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.className = "RoleSelect";
		t.skinName = "RoleSelectSkin";
		t.x = 3;
		t.y = -5;
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = SkillInfoSkin;
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 90;
		t.y = 85;
		t.layout = this._TileLayout2_i();
		t.dataProvider = this._ArrayCollection2_i();
		return t;
	};
	_proto._TileLayout2_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 22;
		t.requestedColumnCount = 4;
		t.verticalGap = 5;
		return t;
	};
	_proto._ArrayCollection2_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object5_i(),this._Object6_i(),this._Object7_i(),this._Object8_i(),this._Object9_i(),this._Object10_i(),this._Object11_i(),this._Object12_i()];
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object9_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object10_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object11_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object12_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 330;
		t.elementsContent = [this._Image2_i(),this.imgNum_i(),this.skillName_i(),this.skillDsc_i(),this._Image3_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 105;
		t.scale9Grid = new egret.Rectangle(31,30,96,37);
		t.source = "public_json.public_rect_1_png";
		t.width = 495;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgNum_i = function () {
		var t = new NumberMC();
		this.imgNum = t;
		t.anchorOffsetY = 0;
		t.height = 14;
		t.type = "num_lv_";
		t.width = 12;
		t.x = 323;
		t.y = 11;
		return t;
	};
	_proto.skillName_i = function () {
		var t = new eui.Label();
		this.skillName = t;
		t.bold = true;
		t.horizontalCenter = 0.5;
		t.size = 20;
		t.text = "技能名称";
		t.textColor = 0x792301;
		t.y = 8;
		return t;
	};
	_proto.skillDsc_i = function () {
		var t = new eui.Label();
		this.skillDsc = t;
		t.bold = true;
		t.size = 18;
		t.text = "LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabel";
		t.textColor = 0x4C2F27;
		t.width = 419;
		t.x = 38;
		t.y = 44;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.height = 14;
		t.source = "public_json.public_rect_lv_png";
		t.x = 291.31;
		t.y = 11.35;
		return t;
	};
	_proto.moveIcon_i = function () {
		var t = new eui.Image();
		this.moveIcon = t;
		t.source = "public_json.public_add_1_png";
		t.touchEnabled = false;
		t.visible = false;
		t.x = 155;
		t.y = 68;
		return t;
	};
	return SkillDeployViewSkin;
})(eui.Skin);generateEUI.paths['resource/exml/skill/SkillExItemSkin.exml'] = window.SkillExItemSkin = (function (_super) {
	__extends(SkillExItemSkin, _super);
	function SkillExItemSkin() {
		_super.call(this);
		this.skinParts = ["select","bg","icon","imgNe"];
		
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = SkillExItemSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.y = 0;
		t.elementsContent = [this.select_i(),this._Image1_i(),this.bg_i(),this.icon_i(),this._Image2_i(),this.imgNe_i()];
		return t;
	};
	_proto.select_i = function () {
		var t = new eui.Image();
		this.select = t;
		t.horizontalCenter = 0;
		t.source = "skillEx_json.skillEx_sl_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "skillEx_json.skillEx_cicle_png";
		t.y = 13;
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.horizontalCenter = 0;
		t.source = "skillEx_json.skillEx_cicle_png";
		t.verticalCenter = -3.5;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = 0;
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.source = "res/images/skill/16.png";
		t.y = 12;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "skillEx_json.skillEx_rect_png";
		t.y = 73;
		return t;
	};
	_proto.imgNe_i = function () {
		var t = new eui.Image();
		this.imgNe = t;
		t.horizontalCenter = 0.5;
		t.source = "res/images/skillLb/22.png";
		t.y = 74;
		return t;
	};
	return SkillExItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/skill/SkillExViewSkin.exml'] = window.SkillExViewSkin = (function (_super) {
	__extends(SkillExViewSkin, _super);
	function SkillExViewSkin() {
		_super.call(this);
		this.skinParts = ["roleSelect","list","skillName","skillDsc","expend","btn","zdl","role"];
		
		this.height = 565;
		this.width = 510;
		this.elementsContent = [this.roleSelect_i(),this._Image1_i(),this._Image2_i(),this._Scroller1_i(),this._Group1_i(),this._Group2_i(),this.btn_i(),this.zdl_i(),this.role_i()];
	}
	var _proto = SkillExViewSkin.prototype;

	_proto.roleSelect_i = function () {
		var t = new BaseCustComponent();
		this.roleSelect = t;
		t.className = "RoleSelect";
		t.skinName = "RoleSelectSkin";
		t.x = 3;
		t.y = -5;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 3;
		t.height = 482;
		t.horizontalCenter = -1;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.width = 506;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "res/images/bg/skillExBg.png";
		t.y = 87;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.height = 363;
		t.x = 3;
		t.y = 92;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = SkillExItemSkin;
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 90;
		t.y = -48.650000000000006;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = -13;
		t.paddingTop = -4;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i(),this._Object8_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 112;
		t.y = 360;
		t.elementsContent = [this._Image3_i(),this.skillName_i(),this.skillDsc_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(31,30,96,37);
		t.source = "res/images/bg/skillExRect.png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.skillName_i = function () {
		var t = new eui.Label();
		this.skillName = t;
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "技能名称";
		t.textColor = 0xffd823;
		t.y = 5;
		return t;
	};
	_proto.skillDsc_i = function () {
		var t = new eui.Label();
		this.skillDsc = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0.5;
		t.size = 18;
		t.text = "LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabel";
		t.textColor = 0xffffff;
		t.width = 325;
		t.y = 44;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0.5;
		t.y = 459.58;
		t.elementsContent = [this.expend_i()];
		return t;
	};
	_proto.expend_i = function () {
		var t = new ItemExpend();
		this.expend = t;
		t.skinName = "ItemExpendSkin";
		t.verticalCenter = 0;
		t.x = 12.97;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.height = 56;
		t.horizontalCenter = 0;
		t.icon = "res/btn/up.png";
		t.label = "Button";
		t.skinName = "MainBtnDownSkin";
		t.width = 152;
		t.y = 497.72;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new BaseCustComponent();
		this.zdl = t;
		t.anchorOffsetX = 29;
		t.anchorOffsetY = 0;
		t.className = "ZdlPrint";
		t.skinName = "ZdlPrintSkin";
		t.x = 213;
		t.y = 95;
		return t;
	};
	_proto.role_i = function () {
		var t = new BaseCustComponent();
		this.role = t;
		t.className = "UIAvatar";
		t.x = 180;
		t.y = 318;
		return t;
	};
	return SkillExViewSkin;
})(eui.Skin);generateEUI.paths['resource/exml/skill/SkillInfoSkin.exml'] = window.SkillInfoSkin = (function (_super) {
	__extends(SkillInfoSkin, _super);
	function SkillInfoSkin() {
		_super.call(this);
		this.skinParts = ["bg","icon","select","lv","gLv","lbName"];
		
		this.elementsContent = [this._Group1_i(),this.gLv_i(),this._Group2_i()];
		this.states = [
			new eui.State ("info",
				[
					new eui.SetProperty("gLv","visible",false)
				])
			,
			new eui.State ("sort",
				[
					new eui.SetProperty("gLv","visible",false)
				])
		];
	}
	var _proto = SkillInfoSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.y = 0;
		t.elementsContent = [this.bg_i(),this.icon_i(),this.select_i()];
		return t;
	};
	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.horizontalCenter = 0;
		t.source = "public_json.public_icon_bg_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = 0;
		t.source = "public_json.public_add_1_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.select_i = function () {
		var t = new eui.Image();
		this.select = t;
		t.horizontalCenter = 0;
		t.source = "public_json.public_icon_sl_1_png";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.gLv_i = function () {
		var t = new eui.Group();
		this.gLv = t;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.x = 0.8;
		t.y = 69.4;
		t.elementsContent = [this._Image1_i(),this.lv_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_lv_rect_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lv_i = function () {
		var t = new eui.Label();
		this.lv = t;
		t.horizontalCenter = 0;
		t.size = 14;
		t.text = "99";
		t.textColor = 0xffc600;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.touchChildren = false;
		t.touchEnabled = false;
		t.x = 2;
		t.y = 89.6;
		t.elementsContent = [this._Image2_i(),this.lbName_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_name_rect_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbName_i = function () {
		var t = new eui.Label();
		this.lbName = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "100级解锁";
		t.textColor = 0xffffff;
		t.verticalCenter = 0;
		return t;
	};
	return SkillInfoSkin;
})(eui.Skin);generateEUI.paths['resource/exml/skill/SkillItemSkin.exml'] = window.SkillItemSkin = (function (_super) {
	__extends(SkillItemSkin, _super);
	function SkillItemSkin() {
		_super.call(this);
		this.skinParts = ["sName","des","eBtn"];
		
		this.height = 145;
		this.width = 550;
		this.elementsContent = [this._Rect1_i(),this.sName_i(),this.des_i(),this.eBtn_i()];
	}
	var _proto = SkillItemSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.fillColor = 0x1c2033;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.sName_i = function () {
		var t = new eui.Label();
		this.sName = t;
		t.left = 23;
		t.size = 20;
		t.text = "技能名称";
		t.top = 8;
		return t;
	};
	_proto.des_i = function () {
		var t = new eui.Label();
		this.des = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 68;
		t.left = 23;
		t.right = 70;
		t.size = 18;
		t.text = "描述描述描述";
		t.top = 34;
		return t;
	};
	_proto.eBtn_i = function () {
		var t = new eui.Button();
		this.eBtn = t;
		t.label = "修改配置";
		t.skinName = "Btn1Skin";
		t.x = 428;
		t.y = 87;
		return t;
	};
	return SkillItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/skill/SkillTipsSkin.exml'] = window.SkillTipsSkin = (function (_super) {
	__extends(SkillTipsSkin, _super);
	function SkillTipsSkin() {
		_super.call(this);
		this.skinParts = ["itemName","lv","desc","icon"];
		
		this.height = 250;
		this.width = 407;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.itemName_i(),this.lv_i(),this.desc_i(),this.icon_i()];
	}
	var _proto = SkillTipsSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(273,70,61,25);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "win_json.win_tips_bg2_png";
		t.top = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(1,0,13,3);
		t.source = "itemtips_json.itemtips_line_png";
		t.width = 399;
		t.x = 4;
		t.y = 114;
		return t;
	};
	_proto.itemName_i = function () {
		var t = new eui.Label();
		this.itemName = t;
		t.size = 20;
		t.text = "物品名称";
		t.textColor = 0xffd823;
		t.x = 129;
		t.y = 26;
		return t;
	};
	_proto.lv_i = function () {
		var t = new eui.Label();
		this.lv = t;
		t.size = 18;
		t.text = "物品名称";
		t.x = 129;
		t.y = 68;
		return t;
	};
	_proto.desc_i = function () {
		var t = new eui.Label();
		this.desc = t;
		t.left = 35;
		t.right = 35;
		t.size = 18;
		t.text = "物品名称";
		t.y = 137;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.source = "res/images/skill/16.png";
		t.x = 30;
		t.y = 18;
		return t;
	};
	return SkillTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/skill/SkillUpViewSkin.exml'] = window.SkillUpViewSkin = (function (_super) {
	__extends(SkillUpViewSkin, _super);
	function SkillUpViewSkin() {
		_super.call(this);
		this.skinParts = ["roleSelect","list","imgNum","skillName","skillDsc","expend","btnL","btnR"];
		
		this.height = 565;
		this.width = 510;
		this.elementsContent = [this.roleSelect_i(),this._Image1_i(),this._Scroller1_i(),this._Group1_i(),this._Group2_i(),this.btnL_i(),this.btnR_i()];
	}
	var _proto = SkillUpViewSkin.prototype;

	_proto.roleSelect_i = function () {
		var t = new BaseCustComponent();
		this.roleSelect = t;
		t.className = "RoleSelect";
		t.skinName = "RoleSelectSkin";
		t.x = 3;
		t.y = -5;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 3;
		t.height = 482;
		t.horizontalCenter = -1;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.width = 506;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.height = 240;
		t.horizontalCenter = 0;
		t.y = 85;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.horizontalCenter = 0;
		t.itemRendererSkinName = SkillInfoSkin;
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 90;
		t.y = -48.650000000000006;
		t.layout = this._TileLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 22;
		t.requestedColumnCount = 4;
		t.verticalGap = 5;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i(),this._Object8_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object8_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 105;
		t.width = 495;
		t.x = 8;
		t.y = 330;
		t.elementsContent = [this._Image2_i(),this.imgNum_i(),this.skillName_i(),this.skillDsc_i(),this._Image3_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 105;
		t.scale9Grid = new egret.Rectangle(31,30,96,37);
		t.source = "public_json.public_rect_1_png";
		t.width = 495;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgNum_i = function () {
		var t = new NumberMC();
		this.imgNum = t;
		t.height = 14;
		t.type = "num_lv_";
		t.width = 12;
		t.x = 323;
		t.y = 11;
		return t;
	};
	_proto.skillName_i = function () {
		var t = new eui.Label();
		this.skillName = t;
		t.bold = true;
		t.horizontalCenter = 0.5;
		t.size = 20;
		t.text = "技能名称";
		t.textColor = 0x792301;
		t.y = 8;
		return t;
	};
	_proto.skillDsc_i = function () {
		var t = new eui.Label();
		this.skillDsc = t;
		t.bold = true;
		t.size = 18;
		t.text = "LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabel";
		t.textColor = 0x4c2f27;
		t.width = 419;
		t.x = 38;
		t.y = 44;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_rect_lv_png";
		t.x = 291.31;
		t.y = 11.35;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 449.58;
		t.elementsContent = [this._Image4_i(),this.expend_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(15,9,94,17);
		t.source = "public_json.public_input_blank_png";
		t.verticalCenter = 0;
		t.visible = false;
		t.percentWidth = 110;
		t.x = 0;
		return t;
	};
	_proto.expend_i = function () {
		var t = new ItemExpend();
		this.expend = t;
		t.skinName = "ItemExpendSkin";
		t.verticalCenter = 0;
		t.x = 12.97;
		return t;
	};
	_proto.btnL_i = function () {
		var t = new eui.Button();
		this.btnL = t;
		t.height = 56;
		t.horizontalCenter = 0;
		t.icon = "res/btn/one_up.png";
		t.label = "Button";
		t.skinName = "MainBtnDownSkin";
		t.width = 152;
		t.y = 496.72;
		return t;
	};
	_proto.btnR_i = function () {
		var t = new eui.Button();
		this.btnR = t;
		t.height = 56;
		t.icon = "res/btn/up.png";
		t.label = "Button";
		t.right = 50;
		t.skinName = "MainBtnDownSkin";
		t.visible = false;
		t.width = 152;
		t.y = 496.72;
		return t;
	};
	return SkillUpViewSkin;
})(eui.Skin);generateEUI.paths['resource/exml/skill/SkillWinSkin.exml'] = window.SkillWinSkin = (function (_super) {
	__extends(SkillWinSkin, _super);
	function SkillWinSkin() {
		_super.call(this);
		this.skinParts = ["itemList"];
		
		this.height = 700;
		this.width = 580;
		this.elementsContent = [this._Image1_i(),this._Scroller1_i()];
	}
	var _proto = SkillWinSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(98,69,70,5);
		t.source = "public_json.public_blank_png";
		t.top = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.bottom = 23;
		t.left = 0;
		t.right = 0;
		t.top = 42;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = SkillItemSkin;
		t.layout = this._VerticalLayout1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.horizontalAlign = "center";
		return t;
	};
	return SkillWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/strength/StrengthMasterTipsSkin.exml'] = window.StrengthMasterTipsSkin = (function (_super) {
	__extends(StrengthMasterTipsSkin, _super);
	function StrengthMasterTipsSkin() {
		_super.call(this);
		this.skinParts = ["icon","num","mPro","mLvl","zdl_0","zdl_1","prop_0","prop_1"];
		
		this.currentState = "s1";
		this.height = 505;
		this.width = 377;
		this.elementsContent = [this._Group1_i()];
		this._Image3_i();
		
		this._Image6_i();
		
		this.zdl_1_i();
		
		this._Label2_i();
		
		this.prop_1_i();
		
		this.states = [
			new eui.State ("s1",
				[
					new eui.AddItems("_Image3","_Group1",2,"icon"),
					new eui.AddItems("_Image6","_Group1",2,"mPro"),
					new eui.AddItems("zdl_1","_Group1",2,"prop_0"),
					new eui.AddItems("_Label2","_Group1",2,"prop_0"),
					new eui.AddItems("prop_1","_Group1",1,"")
				])
			,
			new eui.State ("s2",
				[
					new eui.SetProperty("","height",327)
				])
		];
	}
	var _proto = StrengthMasterTipsSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		this._Group1 = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.icon_i(),this.num_i(),this._Image4_i(),this._Image5_i(),this.mPro_i(),this.mLvl_i(),this._Label1_i(),this.zdl_0_i(),this.prop_0_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(273,70,61,25);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "win_json.win_tips_bg2_png";
		t.top = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "win_json.win_slice_line_png";
		t.top = 138;
		t.width = 367;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.horizontalCenter = 0;
		t.source = "win_json.win_slice_line_png";
		t.top = 307;
		t.width = 367;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.bottom = 397;
		t.horizontalCenter = 0;
		t.source = "strength_json.strength_master_png";
		return t;
	};
	_proto.num_i = function () {
		var t = new NumberMC();
		this.num = t;
		t.type = "strength_json.strength_num_";
		t.x = 191;
		t.y = 88;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "strength_json.strength_master_lvl_blank_png";
		t.visible = false;
		t.x = 201;
		t.y = 67;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "strength_json.strength_current_plus_png";
		t.top = 149;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		this._Image6 = t;
		t.horizontalCenter = 0;
		t.source = "strength_json.strength_next_plus_png";
		t.top = 319;
		return t;
	};
	_proto.mPro_i = function () {
		var t = new eui.Label();
		this.mPro = t;
		t.horizontalCenter = 0;
		t.size = 14;
		t.stroke = 1;
		t.text = "0/30";
		t.textColor = 0x36FF00;
		t.top = 111;
		return t;
	};
	_proto.mLvl_i = function () {
		var t = new eui.Label();
		this.mLvl = t;
		t.horizontalCenter = 28;
		t.size = 14;
		t.stroke = 0.5;
		t.text = "12阶";
		t.textColor = 0xFFC600;
		t.top = 69;
		t.visible = false;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.right = 19;
		t.size = 18;
		t.text = "增加战斗力";
		t.textColor = 0xceb79d;
		t.y = 200;
		return t;
	};
	_proto.zdl_0_i = function () {
		var t = new eui.Label();
		this.zdl_0 = t;
		t.right = 19;
		t.size = 40;
		t.text = "+900";
		t.textColor = 0xffffff;
		t.y = 222;
		return t;
	};
	_proto.zdl_1_i = function () {
		var t = new eui.Label();
		this.zdl_1 = t;
		t.right = 19;
		t.size = 40;
		t.text = "+900";
		t.textColor = 0xFFFFFF;
		t.y = 386;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		this._Label2 = t;
		t.size = 18;
		t.text = "增加战斗力";
		t.textColor = 0xceb79d;
		t.x = 268;
		t.y = 363;
		return t;
	};
	_proto.prop_0_i = function () {
		var t = new BaseCustComponent();
		this.prop_0 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.className = "PropPart";
		t.height = 0;
		t.left = 23;
		t.skinName = "PropPartSkin";
		t.top = 183;
		return t;
	};
	_proto.prop_1_i = function () {
		var t = new BaseCustComponent();
		this.prop_1 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.className = "PropPart";
		t.height = 0;
		t.left = 23;
		t.skinName = "PropPartSkin";
		t.top = 356;
		return t;
	};
	return StrengthMasterTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/strength/StrengthPannelSkin.exml'] = window.StrengthPannelSkin = (function (_super) {
	__extends(StrengthPannelSkin, _super);
	function StrengthPannelSkin() {
		_super.call(this);
		this.skinParts = ["propList","roleSelect","instruction","item_0","item_1","item_2","item_3","item_4","item_5","item_6","item_7","item_8","item_9","sGroup","sBtn","cost_0","mPro","zdl","mBtn","num"];
		
		this.height = 680;
		this.width = 535;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Group1_i(),this.roleSelect_i(),this.instruction_i(),this.sGroup_i(),this.sBtn_i(),this.cost_0_i(),this.mPro_i(),this.zdl_i(),this._Image7_i(),this.mBtn_i(),this.num_i(),this._Image8_i()];
	}
	var _proto = StrengthPannelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 680;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(25,141,60,55);
		t.source = "win_json.win_bg4_png";
		t.width = 530;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 11;
		t.height = 582;
		t.scale9Grid = new egret.Rectangle(10,11,22,21);
		t.source = "win_json.win_bg_line_png";
		t.width = 507;
		t.x = 14;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 3;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "public_json.public_slice_line_png";
		t.width = 506;
		t.x = 14;
		t.y = 554;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 95;
		t.horizontalCenter = 0;
		t.width = 292;
		t.y = 449;
		t.elementsContent = [this._Image4_i(),this._Image5_i(),this._Image6_i(),this.propList_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.height = 97;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(19,14,119,27);
		t.source = "public_json.public_prop_rect_png";
		t.top = -11;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 58;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.source = "public_json.public_slice_line5_png";
		t.y = 26;
		return t;
	};
	_proto.propList_i = function () {
		var t = new BaseCustComponent();
		this.propList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 16;
		t.className = "PropPart";
		t.left = 0;
		t.right = 0;
		t.skinName = "PropPartSkin";
		t.top = 4;
		return t;
	};
	_proto.roleSelect_i = function () {
		var t = new BaseCustComponent();
		this.roleSelect = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.className = "RoleSelect";
		t.skinName = "RoleSelectSkin";
		t.width = 526;
		t.x = 6;
		t.y = 2;
		return t;
	};
	_proto.instruction_i = function () {
		var t = new BaseCustComponent();
		this.instruction = t;
		t.className = "InstructionPart";
		t.name = "1";
		t.skinName = "InstructionPartSkin";
		t.visible = false;
		t.x = 103;
		t.y = 107;
		return t;
	};
	_proto.sGroup_i = function () {
		var t = new eui.Group();
		this.sGroup = t;
		t.anchorOffsetY = 0;
		t.horizontalCenter = 0.5;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.y = 94;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this.item_0_i(),this.item_1_i(),this.item_2_i(),this.item_3_i(),this.item_4_i(),this.item_5_i(),this.item_6_i(),this.item_7_i(),this.item_8_i(),this.item_9_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 320;
		t.orientation = "rows";
		t.requestedColumnCount = 2;
		t.verticalGap = 12;
		return t;
	};
	_proto.item_0_i = function () {
		var t = new BaseCustComponent();
		this.item_0 = t;
		t.className = "EquipItem";
		t.name = "0";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = 0;
		t.y = -78;
		return t;
	};
	_proto.item_1_i = function () {
		var t = new BaseCustComponent();
		this.item_1 = t;
		t.className = "EquipItem";
		t.name = "0";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = 10;
		t.y = -68;
		return t;
	};
	_proto.item_2_i = function () {
		var t = new BaseCustComponent();
		this.item_2 = t;
		t.className = "EquipItem";
		t.name = "0";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = 20;
		t.y = -58;
		return t;
	};
	_proto.item_3_i = function () {
		var t = new BaseCustComponent();
		this.item_3 = t;
		t.className = "EquipItem";
		t.name = "0";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = 30;
		t.y = -48;
		return t;
	};
	_proto.item_4_i = function () {
		var t = new BaseCustComponent();
		this.item_4 = t;
		t.className = "EquipItem";
		t.name = "0";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = 40;
		t.y = -38;
		return t;
	};
	_proto.item_5_i = function () {
		var t = new BaseCustComponent();
		this.item_5 = t;
		t.className = "EquipItem";
		t.name = "0";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = 50;
		t.y = -28;
		return t;
	};
	_proto.item_6_i = function () {
		var t = new BaseCustComponent();
		this.item_6 = t;
		t.className = "EquipItem";
		t.name = "0";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = 60;
		t.y = -18;
		return t;
	};
	_proto.item_7_i = function () {
		var t = new BaseCustComponent();
		this.item_7 = t;
		t.className = "EquipItem";
		t.name = "0";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = 70;
		t.y = -8;
		return t;
	};
	_proto.item_8_i = function () {
		var t = new BaseCustComponent();
		this.item_8 = t;
		t.className = "EquipItem";
		t.name = "0";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = 80;
		t.y = 2;
		return t;
	};
	_proto.item_9_i = function () {
		var t = new BaseCustComponent();
		this.item_9 = t;
		t.className = "EquipItem";
		t.name = "0";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "EquipItemSkin";
		t.touchChildren = false;
		t.x = 90;
		t.y = 12;
		return t;
	};
	_proto.sBtn_i = function () {
		var t = new eui.Button();
		this.sBtn = t;
		t.anchorOffsetX = 0;
		t.height = 56;
		t.horizontalCenter = 0;
		t.icon = "strength_json.strength_btn0_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.width = 140;
		t.y = 600;
		return t;
	};
	_proto.cost_0_i = function () {
		var t = new ItemExpend();
		this.cost_0 = t;
		t.horizontalCenter = 0;
		t.y = 560;
		return t;
	};
	_proto.mPro_i = function () {
		var t = new eui.Label();
		this.mPro = t;
		t.horizontalCenter = -200.5;
		t.size = 14;
		t.stroke = 0;
		t.strokeColor = 0xff0000;
		t.text = "0/30";
		t.textColor = 0x00a2ff;
		t.y = 648;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new BaseCustComponent();
		this.zdl = t;
		t.anchorOffsetY = 0;
		t.className = "ZdlPrint";
		t.horizontalCenter = 0;
		t.skinName = "ZdlPrintSkin";
		t.y = 90;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "strength_json.strength_middle_icon_png";
		t.y = 156.04;
		return t;
	};
	_proto.mBtn_i = function () {
		var t = new eui.Image();
		this.mBtn = t;
		t.source = "strength_json.strength_master_png";
		t.x = 20;
		t.y = 567;
		return t;
	};
	_proto.num_i = function () {
		var t = new NumberMC();
		this.num = t;
		t.horizontalCenter = -193;
		t.type = "strength_json.strength_num_";
		t.y = 624;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "strength_json.strength_middle_icon1_png";
		t.y = 409.04;
		return t;
	};
	return StrengthPannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/suit/SuitItemSkin.exml'] = window.SuitItemSkin = (function (_super) {
	__extends(SuitItemSkin, _super);
	var SuitItemSkin$Skin5 = 	(function (_super) {
		__extends(SuitItemSkin$Skin5, _super);
		function SuitItemSkin$Skin5() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SuitItemSkin$Skin5.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "public_json.public_btn_yellow_1_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SuitItemSkin$Skin5;
	})(eui.Skin);

	function SuitItemSkin() {
		_super.call(this);
		this.skinParts = ["lbLv","lbNe","itemBase","eBtn","imgItem","lbNum","imgZl","imgAdd","num","gZll"];
		
		this.width = 495;
		this.elementsContent = [this._Image1_i(),this.lbLv_i(),this.lbNe_i(),this.itemBase_i(),this._Group1_i(),this.gZll_i()];
	}
	var _proto = SuitItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(24,24,27,52);
		t.source = "public_json.public_item_rect_1_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.width = 495;
		return t;
	};
	_proto.lbLv_i = function () {
		var t = new eui.Label();
		this.lbLv = t;
		t.size = 18;
		t.text = "Lv900";
		t.x = 98.33;
		t.y = 21.67;
		return t;
	};
	_proto.lbNe_i = function () {
		var t = new eui.Label();
		this.lbNe = t;
		t.size = 18;
		t.text = "技能名称";
		t.x = 150.01;
		t.y = 21.67;
		return t;
	};
	_proto.itemBase_i = function () {
		var t = new BaseCustComponent();
		this.itemBase = t;
		t.className = "ItemBaseCornerMark";
		t.skinName = "ItembaseSkin";
		t.x = 10;
		t.y = 9;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 360.33;
		t.y = 25;
		t.elementsContent = [this.eBtn_i(),this.imgItem_i(),this.lbNum_i()];
		return t;
	};
	_proto.eBtn_i = function () {
		var t = new eui.Button();
		this.eBtn = t;
		t.height = 49;
		t.label = "";
		t.right = 0;
		t.top = 0;
		t.skinName = SuitItemSkin$Skin5;
		return t;
	};
	_proto.imgItem_i = function () {
		var t = new eui.Image();
		this.imgItem = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 70;
		t.scaleX = 0.6;
		t.scaleY = 0.6;
		t.source = "res/images/item/16.png";
		t.touchEnabled = false;
		t.verticalCenter = -1.5;
		t.width = 70;
		t.x = 5.68;
		return t;
	};
	_proto.lbNum_i = function () {
		var t = new eui.Label();
		this.lbNum = t;
		t.size = 18;
		t.text = "X50";
		t.textColor = 0xfdffd9;
		t.touchEnabled = false;
		t.verticalCenter = 0.5;
		t.x = 49.67;
		return t;
	};
	_proto.gZll_i = function () {
		var t = new eui.Group();
		this.gZll = t;
		t.x = 99.99;
		t.y = 55;
		t.elementsContent = [this.imgZl_i(),this.imgAdd_i(),this.num_i()];
		return t;
	};
	_proto.imgZl_i = function () {
		var t = new eui.Image();
		this.imgZl = t;
		t.source = "public_json.public_zhanli_2_png";
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto.imgAdd_i = function () {
		var t = new eui.Image();
		this.imgAdd = t;
		t.source = "public_json.public_add_2_png";
		t.verticalCenter = 0.5;
		t.x = 45.01;
		return t;
	};
	_proto.num_i = function () {
		var t = new NumberMC();
		this.num = t;
		t.height = 11;
		t.type = "num_yellow_1_";
		t.verticalCenter = 0.5;
		t.x = 66.68;
		return t;
	};
	return SuitItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/suit/SuitPropertyItemSkin.exml'] = window.SuitPropertyItemSkin = (function (_super) {
	__extends(SuitPropertyItemSkin, _super);
	function SuitPropertyItemSkin() {
		_super.call(this);
		this.skinParts = ["lbNe","lbLv","imgZl","imgAdd","num","prop","eBtn"];
		
		this.width = 403;
		this.elementsContent = [this._Image1_i(),this.lbNe_i(),this.lbLv_i(),this._Group1_i(),this._Image2_i(),this.prop_i(),this.eBtn_i()];
	}
	var _proto = SuitPropertyItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(24,24,27,52);
		t.source = "public_json.public_item_rect_1_png";
		t.verticalCenter = 0;
		t.width = 403;
		return t;
	};
	_proto.lbNe_i = function () {
		var t = new eui.Label();
		this.lbNe = t;
		t.size = 18;
		t.text = "Lv900";
		t.textColor = 0xefb903;
		t.x = 33.33;
		t.y = 16;
		return t;
	};
	_proto.lbLv_i = function () {
		var t = new eui.Label();
		this.lbLv = t;
		t.size = 16;
		t.text = "套装等级达到10级";
		t.textColor = 0xfdffd9;
		t.x = 16;
		t.y = 40.5;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.right = 20;
		t.y = 11;
		t.elementsContent = [this.imgZl_i(),this.imgAdd_i(),this.num_i()];
		return t;
	};
	_proto.imgZl_i = function () {
		var t = new eui.Image();
		this.imgZl = t;
		t.source = "public_json.public_zhanli_2_png";
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto.imgAdd_i = function () {
		var t = new eui.Image();
		this.imgAdd = t;
		t.source = "public_json.public_add_2_png";
		t.verticalCenter = 0.5;
		t.x = 45.01;
		return t;
	};
	_proto.num_i = function () {
		var t = new NumberMC();
		this.num = t;
		t.height = 11;
		t.type = "num_yellow_1_";
		t.verticalCenter = 0.5;
		t.x = 66.68;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_rect_3_png";
		t.x = 16;
		t.y = 19;
		return t;
	};
	_proto.prop_i = function () {
		var t = new BaseCustComponent();
		this.prop = t;
		t.className = "PropPart";
		t.skinName = "PropPartSkin";
		t.x = -1;
		t.y = 67;
		return t;
	};
	_proto.eBtn_i = function () {
		var t = new eui.Image();
		this.eBtn = t;
		t.source = "res/btn/activate_1.png";
		t.x = 281;
		t.y = 39;
		return t;
	};
	return SuitPropertyItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/suit/SuitPropertyWinSkin.exml'] = window.SuitPropertyWinSkin = (function (_super) {
	__extends(SuitPropertyWinSkin, _super);
	function SuitPropertyWinSkin() {
		_super.call(this);
		this.skinParts = ["bg","imgItem","imgZl0","num","list"];
		
		this.elementsContent = [this.bg_i(),this._Group3_i()];
	}
	var _proto = SuitPropertyWinSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		t.x = 0;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.bottom = 15;
		t.height = 470;
		t.horizontalCenter = 0;
		t.top = 65;
		t.width = 415;
		t.elementsContent = [this._Group2_i(),this._Image2_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 11;
		t.y = 5;
		t.elementsContent = [this._Image1_i(),this.imgItem_i(),this._Group1_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(12,14,20,9);
		t.source = "public_json.public_rect_2_png";
		t.width = 190;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgItem_i = function () {
		var t = new eui.Image();
		this.imgItem = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 35;
		t.source = "public_json.public_fight_icon_png";
		t.verticalCenter = -4.5;
		t.width = 35.8;
		t.x = -1;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.verticalCenter = -4.5;
		t.x = 50;
		t.elementsContent = [this.imgZl0_i(),this.num_i()];
		return t;
	};
	_proto.imgZl0_i = function () {
		var t = new eui.Image();
		this.imgZl0 = t;
		t.source = "public_json.public_fight_zzl_png";
		t.verticalCenter = 0;
		t.x = -16;
		return t;
	};
	_proto.num_i = function () {
		var t = new eui.Label();
		this.num = t;
		t.size = 22;
		t.text = "9999";
		t.textColor = 0xfdffd9;
		t.verticalCenter = 0.5;
		t.x = 67;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "public_json.public_slice_line_png";
		t.width = 419;
		t.y = 45;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.height = 409;
		t.horizontalCenter = 0.5;
		t.width = 403;
		t.y = 52;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.itemRendererSkinName = SuitPropertyItemSkin;
		t.x = 114;
		t.y = -1;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	return SuitPropertyWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/suit/SuitResolveItemSkin.exml'] = window.SuitResolveItemSkin = (function (_super) {
	__extends(SuitResolveItemSkin, _super);
	var SuitResolveItemSkin$Skin6 = 	(function (_super) {
		__extends(SuitResolveItemSkin$Skin6, _super);
		function SuitResolveItemSkin$Skin6() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SuitResolveItemSkin$Skin6.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "res/btn/resolve_y_1.png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SuitResolveItemSkin$Skin6;
	})(eui.Skin);

	function SuitResolveItemSkin() {
		_super.call(this);
		this.skinParts = ["lbNe","lbAct","eBtn","itemBase","imgItem","lbNum"];
		
		this.elementsContent = [this._Image1_i(),this.lbNe_i(),this.lbAct_i(),this.eBtn_i(),this._Component1_i(),this.itemBase_i(),this._Group1_i()];
	}
	var _proto = SuitResolveItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(24,24,27,52);
		t.source = "public_json.public_item_rect_1_png";
		t.verticalCenter = 0;
		t.width = 403;
		return t;
	};
	_proto.lbNe_i = function () {
		var t = new eui.Label();
		this.lbNe = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 18;
		t.text = "小有所成";
		t.textColor = 0xefb903;
		t.x = 96;
		t.y = 15.67;
		return t;
	};
	_proto.lbAct_i = function () {
		var t = new eui.Label();
		this.lbAct = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 18;
		t.text = "分解获得";
		t.textColor = 0xEFB903;
		t.x = 96;
		t.y = 52;
		return t;
	};
	_proto.eBtn_i = function () {
		var t = new eui.Button();
		this.eBtn = t;
		t.label = "";
		t.right = 10;
		t.verticalCenter = 0;
		t.skinName = SuitResolveItemSkin$Skin6;
		return t;
	};
	_proto._Component1_i = function () {
		var t = new eui.Component();
		t.left = 10;
		t.skinName = "ItembaseSkin";
		t.verticalCenter = 0.5;
		return t;
	};
	_proto.itemBase_i = function () {
		var t = new BaseCustComponent();
		this.itemBase = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.x = 10;
		t.y = 9;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 168.68;
		t.y = 46;
		t.elementsContent = [this.imgItem_i(),this.lbNum_i()];
		return t;
	};
	_proto.imgItem_i = function () {
		var t = new eui.Image();
		this.imgItem = t;
		t.height = 32;
		t.scaleX = 1.3;
		t.scaleY = 1.3;
		t.source = "res/images/item/16.png";
		t.width = 32;
		t.x = -5;
		t.y = -8;
		return t;
	};
	_proto.lbNum_i = function () {
		var t = new eui.Label();
		this.lbNum = t;
		t.size = 18;
		t.text = "X50";
		t.textColor = 0xFDFFD9;
		t.x = 30.99;
		t.y = 6;
		return t;
	};
	return SuitResolveItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/suit/SuitResolveWinSkin.exml'] = window.SuitResolveWinSkin = (function (_super) {
	__extends(SuitResolveWinSkin, _super);
	var SuitResolveWinSkin$Skin7 = 	(function (_super) {
		__extends(SuitResolveWinSkin$Skin7, _super);
		function SuitResolveWinSkin$Skin7() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = SuitResolveWinSkin$Skin7.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "res/btn/resolve_g_2.png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return SuitResolveWinSkin$Skin7;
	})(eui.Skin);

	function SuitResolveWinSkin() {
		_super.call(this);
		this.skinParts = ["bg","list","btn"];
		
		this.elementsContent = [this.bg_i(),this._Group1_i()];
	}
	var _proto = SuitResolveWinSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		t.x = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 15;
		t.height = 405;
		t.horizontalCenter = 0;
		t.top = 65;
		t.width = 415;
		t.elementsContent = [this._Image1_i(),this._Scroller1_i(),this.btn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 75;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "public_json.public_slice_line_png";
		t.width = 419;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.height = 309;
		t.horizontalCenter = 1;
		t.top = 11;
		t.width = 403;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.itemRendererSkinName = SuitPropertyItemSkin;
		t.x = 114;
		t.y = -1;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.y = 337;
		t.skinName = SuitResolveWinSkin$Skin7;
		return t;
	};
	return SuitResolveWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/suit/SuitViewSkin.exml'] = window.SuitViewSkin = (function (_super) {
	__extends(SuitViewSkin, _super);
	function SuitViewSkin() {
		_super.call(this);
		this.skinParts = ["roleSelect","imgProperty","gProperty","imgResolve","gResolve","imgItem","lbNum","list"];
		
		this.height = 565;
		this.width = 510;
		this.elementsContent = [this._Image1_i(),this.roleSelect_i(),this.gProperty_i(),this._Group1_i(),this._Image3_i(),this._Scroller1_i()];
	}
	var _proto = SuitViewSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 2;
		t.height = 483;
		t.horizontalCenter = -1;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.width = 506;
		return t;
	};
	_proto.roleSelect_i = function () {
		var t = new BaseCustComponent();
		this.roleSelect = t;
		t.anchorOffsetX = 0;
		t.className = "RoleSelect";
		t.skinName = "RoleSelectSkin";
		t.width = 508;
		t.x = 2;
		t.y = -5;
		return t;
	};
	_proto.gProperty_i = function () {
		var t = new eui.Group();
		this.gProperty = t;
		t.anchorOffsetX = 0;
		t.width = 132;
		t.x = 4;
		t.y = 82;
		t.elementsContent = [this.imgProperty_i()];
		return t;
	};
	_proto.imgProperty_i = function () {
		var t = new eui.Image();
		this.imgProperty = t;
		t.right = 0;
		t.source = "suit_json.suit_rect_jiaceng_png";
		t.y = 10;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 312;
		t.y = 91;
		t.elementsContent = [this._Image2_i(),this.gResolve_i(),this.imgItem_i(),this.lbNum_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.scale9Grid = new egret.Rectangle(12,14,20,9);
		t.source = "public_json.public_rect_2_png";
		t.width = 190;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.gResolve_i = function () {
		var t = new eui.Group();
		this.gResolve = t;
		t.x = 119;
		t.y = 4;
		t.elementsContent = [this.imgResolve_i()];
		return t;
	};
	_proto.imgResolve_i = function () {
		var t = new eui.Image();
		this.imgResolve = t;
		t.source = "res/btn/resolve_g_1.png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgItem_i = function () {
		var t = new eui.Image();
		this.imgItem = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 70;
		t.left = -4;
		t.scaleX = 0.6;
		t.scaleY = 0.6;
		t.source = "res/images/item/016.png";
		t.width = 70;
		t.y = -2;
		return t;
	};
	_proto.lbNum_i = function () {
		var t = new eui.Label();
		this.lbNum = t;
		t.left = 35;
		t.size = 18;
		t.text = "100";
		t.textColor = 0xfdffd9;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(2,0,19,2);
		t.source = "public_json.public_slice_line_png";
		t.width = 504;
		t.y = 136;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.height = 412;
		t.horizontalCenter = 0;
		t.width = 495;
		t.y = 145;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.itemRendererSkinName = SuitItemSkin;
		t.x = 111;
		t.y = 50;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	return SuitViewSkin;
})(eui.Skin);generateEUI.paths['resource/exml/sysopen/SysOpenHintSkin.exml'] = window.SysOpenHintSkin = (function (_super) {
	__extends(SysOpenHintSkin, _super);
	function SysOpenHintSkin() {
		_super.call(this);
		this.skinParts = ["sName","g0","icon"];
		
		this.height = 300;
		this.width = 400;
		this.elementsContent = [this._Rect1_i(),this.g0_i(),this.icon_i()];
	}
	var _proto = SysOpenHintSkin.prototype;

	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.bottom = 0;
		t.fillAlpha = 0.8;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		return t;
	};
	_proto.g0_i = function () {
		var t = new eui.Group();
		this.g0 = t;
		t.x = 42;
		t.y = 35;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this.sName_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "sysOpen_json.sysOpen_texure_1_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "sysOpen_json.sysOpen_texure_0_png";
		t.y = 192;
		return t;
	};
	_proto.sName_i = function () {
		var t = new eui.Image();
		this.sName = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "";
		t.y = 155;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.source = "";
		t.x = 148;
		t.y = 94;
		return t;
	};
	return SysOpenHintSkin;
})(eui.Skin);generateEUI.paths['resource/exml/systemBroadcast/BarrageTipsSkin.exml'] = window.BarrageTipsSkin = (function (_super) {
	__extends(BarrageTipsSkin, _super);
	function BarrageTipsSkin() {
		_super.call(this);
		this.skinParts = ["content"];
		
		this.elementsContent = [this.content_i()];
	}
	var _proto = BarrageTipsSkin.prototype;

	_proto.content_i = function () {
		var t = new eui.Label();
		this.content = t;
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "Label75637453435";
		t.textColor = 0xffdf56;
		t.verticalCenter = 0;
		return t;
	};
	return BarrageTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/tabBar/TabBar1Skin.exml'] = window.TabBar1Skin = (function (_super) {
	__extends(TabBar1Skin, _super);
	function TabBar1Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","x",0),
					new eui.SetProperty("_Image1","y",0)
				])
			,
			new eui.State ("down",
				[
					new eui.SetStateProperty(this, ["hostComponent.data.icon2"],[0],this._Image1,"source")
				])
			,
			new eui.State ("disabled",
				[
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.icon"],[0],this._Image1,"source");
	}
	var _proto = TabBar1Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return TabBar1Skin;
})(eui.Skin);generateEUI.paths['resource/exml/tabBar/TabBar2Skin.exml'] = window.TabBar2Skin = (function (_super) {
	__extends(TabBar2Skin, _super);
	function TabBar2Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.height = 79;
		this.width = 64;
		this.elementsContent = [this._Image1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","scaleX",0.9),
					new eui.SetProperty("_Image1","scaleY",0.9)
				])
			,
			new eui.State ("disabled",
				[
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.icon"],[0],this._Image1,"source");
	}
	var _proto = TabBar2Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	return TabBar2Skin;
})(eui.Skin);generateEUI.paths['resource/exml/tabBar/TabBar3Skin.exml'] = window.TabBar3Skin = (function (_super) {
	__extends(TabBar3Skin, _super);
	function TabBar3Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.height = 79;
		this.width = 64;
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image2","visible",false)
				])
			,
			new eui.State ("down",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image2","visible",false)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.icon"],[0],this._Image1,"source");
	}
	var _proto = TabBar3Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.right = 3;
		t.source = "public_json.public_icon_sl_2_png";
		t.top = 28;
		return t;
	};
	return TabBar3Skin;
})(eui.Skin);generateEUI.paths['resource/exml/tabBar/TabBar4Skin.exml'] = window.TabBar4Skin = (function (_super) {
	__extends(TabBar4Skin, _super);
	function TabBar4Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image2","visible",false)
				])
			,
			new eui.State ("down",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image2","visible",false)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.icon"],[0],this._Image1,"source");
	}
	var _proto = TabBar4Skin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.bottom = 0;
		t.right = 0;
		t.source = "public_json.public_role_select_png";
		return t;
	};
	return TabBar4Skin;
})(eui.Skin);generateEUI.paths['resource/exml/tabBar/TabBar5Skin.exml'] = window.TabBar5Skin = (function (_super) {
	__extends(TabBar5Skin, _super);
	function TabBar5Skin() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.height = 79;
		this.width = 64;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image3","visible",false)
				])
			,
			new eui.State ("down",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image3","visible",false)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.line"],[0],this._Image1,"source");
		eui.Binding.$bindProperties(this, ["hostComponent.data.icon"],[0],this._Image2,"source");
	}
	var _proto = TabBar5Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.right = -3;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.right = 0;
		t.source = "public_json.public_icon_sl_2_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	return TabBar5Skin;
})(eui.Skin);generateEUI.paths['resource/exml/tabBar/TabBar6Skin.exml'] = window.TabBar6Skin = (function (_super) {
	__extends(TabBar6Skin, _super);
	function TabBar6Skin() {
		_super.call(this);
		this.skinParts = ["ico"];
		
		this.height = 92;
		this.width = 181;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.ico_i(),this._Image4_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image2","visible",false),
					new eui.SetProperty("_Image3","visible",false)
				])
			,
			new eui.State ("down",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image3","visible",false)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data.icon"],[0],this.ico,"source");
		eui.Binding.$bindProperties(this, ["hostComponent.data.icon2"],[0],this._Image4,"source");
	}
	var _proto = TabBar6Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.source = "xslb_json.xslb_tab_bg_png";
		t.touchEnabled = false;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.bottom = 5;
		t.source = "xslb_json.xslb_tab_s_1_png";
		t.touchEnabled = false;
		t.x = 4;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		this._Image3 = t;
		t.source = "xslb_json.xslb_tab_s_0_png";
		t.touchEnabled = false;
		t.x = 22;
		t.y = -31;
		return t;
	};
	_proto.ico_i = function () {
		var t = new eui.Image();
		this.ico = t;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = -9;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		this._Image4 = t;
		t.bottom = 8;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		return t;
	};
	return TabBar6Skin;
})(eui.Skin);generateEUI.paths['resource/exml/tips/SystemTextTipsSkin.exml'] = window.SystemTextTipsSkin = (function (_super) {
	__extends(SystemTextTipsSkin, _super);
	function SystemTextTipsSkin() {
		_super.call(this);
		this.skinParts = ["txt"];
		
		this.height = 28;
		this.width = 500;
		this.elementsContent = [this._Image1_i(),this.txt_i()];
	}
	var _proto = SystemTextTipsSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "win_json.win_xt_png";
		t.top = 0;
		return t;
	};
	_proto.txt_i = function () {
		var t = new eui.Label();
		this.txt = t;
		t.bottom = 5;
		t.left = 0;
		t.right = 0;
		t.size = 16;
		t.stroke = 1;
		t.strokeColor = 0x000000;
		t.text = "错误：提示一个信息";
		t.textAlign = "center";
		t.textColor = 0xffb31c;
		t.top = 7;
		return t;
	};
	return SystemTextTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/totems/TotemsItemSkin.exml'] = window.TotemsItemSkin = (function (_super) {
	__extends(TotemsItemSkin, _super);
	function TotemsItemSkin() {
		_super.call(this);
		this.skinParts = ["bg","icon","tName","lvl"];
		
		this.width = 109;
		this.elementsContent = [this.bg_i(),this.icon_i(),this.tName_i(),this.lvl_i()];
	}
	var _proto = TotemsItemSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Image();
		this.bg = t;
		t.source = "totems_json.totems_item_bg_1_png";
		t.x = -1;
		t.y = 0;
		return t;
	};
	_proto.icon_i = function () {
		var t = new eui.Image();
		this.icon = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.y = -5;
		return t;
	};
	_proto.tName_i = function () {
		var t = new eui.Image();
		this.tName = t;
		t.horizontalCenter = 0;
		t.source = "";
		t.y = 60;
		return t;
	};
	_proto.lvl_i = function () {
		var t = new eui.Label();
		this.lvl = t;
		t.horizontalCenter = 0.5;
		t.size = 14;
		t.text = "二阶";
		t.textColor = 0xffc600;
		t.y = 93;
		return t;
	};
	return TotemsItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/totems/ResonanceItemSkin.exml'] = window.ResonanceItemSkin = (function (_super) {
	__extends(ResonanceItemSkin, _super);
	function ResonanceItemSkin() {
		_super.call(this);
		this.skinParts = ["upBtn","skillName","desc","item_0","item_1","item_2","unacti"];
		
		this.height = 230;
		this.width = 462;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.upBtn_i(),this.skillName_i(),this.desc_i(),this._Group1_i(),this.unacti_i()];
	}
	var _proto = ResonanceItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(18,24,37,52);
		t.source = "public_json.public_item_rect_1_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 130;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(23,16,140,97);
		t.source = "public_json.public_rect_7_png";
		t.width = 443;
		t.y = 91;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_item_bg2_png";
		t.x = 13;
		t.y = 8.67;
		return t;
	};
	_proto.upBtn_i = function () {
		var t = new eui.Button();
		this.upBtn = t;
		t.icon = "res/btn/promote_2.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 340;
		t.y = 127;
		return t;
	};
	_proto.skillName_i = function () {
		var t = new eui.Label();
		this.skillName = t;
		t.size = 18;
		t.text = "会心一击";
		t.textColor = 0xffc600;
		t.x = 97;
		t.y = 12;
		return t;
	};
	_proto.desc_i = function () {
		var t = new eui.Label();
		this.desc = t;
		t.anchorOffsetX = 0;
		t.size = 16;
		t.text = "Label";
		t.width = 338;
		t.x = 97;
		t.y = 42;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 14;
		t.y = 96;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this.item_0_i(),this.item_1_i(),this.item_2_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.gap = 0;
		return t;
	};
	_proto.item_0_i = function () {
		var t = new BaseCustComponent();
		this.item_0 = t;
		t.className = "TotemsItem";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "TotemsItemSkin";
		t.x = -151.67000000000002;
		t.y = -24;
		return t;
	};
	_proto.item_1_i = function () {
		var t = new BaseCustComponent();
		this.item_1 = t;
		t.className = "TotemsItem";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "TotemsItemSkin";
		t.x = -141.67000000000002;
		t.y = -14;
		return t;
	};
	_proto.item_2_i = function () {
		var t = new BaseCustComponent();
		this.item_2 = t;
		t.className = "TotemsItem";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "TotemsItemSkin";
		t.x = -131.67000000000002;
		t.y = -4;
		return t;
	};
	_proto.unacti_i = function () {
		var t = new eui.Image();
		this.unacti = t;
		t.source = "public_json.public_unActive_png";
		t.x = 349;
		t.y = 110;
		return t;
	};
	return ResonanceItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/totems/ResonanceTipsSkin.exml'] = window.ResonanceTipsSkin = (function (_super) {
	__extends(ResonanceTipsSkin, _super);
	function ResonanceTipsSkin() {
		_super.call(this);
		this.skinParts = ["bg","itemList"];
		
		this.height = 710;
		this.width = 495;
		this.elementsContent = [this.bg_i(),this._Scroller1_i()];
	}
	var _proto = ResonanceTipsSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.height = 597.33;
		t.horizontalCenter = 0.5;
		t.width = 462;
		t.y = 79;
		t.viewport = this.itemList_i();
		return t;
	};
	_proto.itemList_i = function () {
		var t = new eui.List();
		this.itemList = t;
		t.itemRendererSkinName = ResonanceItemSkin;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.a = "null";
		return t;
	};
	return ResonanceTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/totems/TotemsImgItemSkin.exml'] = window.TotemsImgItemSkin = (function (_super) {
	__extends(TotemsImgItemSkin, _super);
	function TotemsImgItemSkin() {
		_super.call(this);
		this.skinParts = ["img","nImg","lNum"];
		
		this.height = 303;
		this.width = 416;
		this.elementsContent = [this._Group1_i()];
	}
	var _proto = TotemsImgItemSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.touchThrough = false;
		t.elementsContent = [this.img_i(),this.nImg_i(),this.lNum_i()];
		return t;
	};
	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "res/images/totems/icon/b1.png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.nImg_i = function () {
		var t = new eui.Image();
		this.nImg = t;
		t.horizontalCenter = 0;
		t.source = "res/images/totems/name/n1u.png";
		t.y = 202;
		return t;
	};
	_proto.lNum_i = function () {
		var t = new NumberMC();
		this.lNum = t;
		t.horizontalCenter = 0;
		t.type = "cn_0_";
		t.y = 223;
		return t;
	};
	return TotemsImgItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/totems/TotemsPageSkin.exml'] = window.TotemsPageSkin = (function (_super) {
	__extends(TotemsPageSkin, _super);
	function TotemsPageSkin() {
		_super.call(this);
		this.skinParts = ["cost","zdl","propList","item_0","item_1","item_2","item_3","item_4","item_5","iG","slider","img_0","lvlMax","pBtn","btn_0","btn_1","item"];
		
		this.height = 565;
		this.width = 510;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Image4_i(),this.cost_i(),this.zdl_i(),this._Group1_i(),this.iG_i(),this.slider_i(),this.img_0_i(),this.lvlMax_i(),this.pBtn_i(),this.btn_0_i(),this.btn_1_i(),this.item_i()];
	}
	var _proto = TotemsPageSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 0;
		t.height = 562;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.width = 506;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "res/images/bg/totemsBg.png";
		t.x = 8;
		t.y = 8;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 115;
		t.scale9Grid = new egret.Rectangle(23,13,115,26);
		t.source = "public_json.public_prop_rect_png";
		t.width = 494;
		t.x = 8;
		t.y = 443;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,0,9,2);
		t.source = "public_json.public_slice_line2_png";
		t.width = 468;
		t.y = 474;
		return t;
	};
	_proto.cost_i = function () {
		var t = new ItemExpend();
		this.cost = t;
		t.skinName = "ItemExpend3Skin";
		t.x = 108;
		t.y = 486;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new BaseCustComponent();
		this.zdl = t;
		t.anchorOffsetX = 29;
		t.anchorOffsetY = 0;
		t.className = "ZdlPrint";
		t.horizontalCenter = 0;
		t.skinName = "ZdlPrintSkin";
		t.y = 13;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 95;
		t.horizontalCenter = 0;
		t.width = 292;
		t.y = 340;
		t.elementsContent = [this._Image5_i(),this._Image6_i(),this._Image7_i(),this.propList_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(19,14,149,101);
		t.source = "public_json.public_rect_7_png";
		t.top = 0;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 62;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 30;
		return t;
	};
	_proto.propList_i = function () {
		var t = new BaseCustComponent();
		this.propList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 11;
		t.className = "PropPart";
		t.left = 0;
		t.right = 0;
		t.skinName = "PropPartSkin";
		t.top = 9;
		return t;
	};
	_proto.iG_i = function () {
		var t = new eui.Group();
		this.iG = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 298;
		t.horizontalCenter = 0;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.width = 300;
		t.y = 52;
		t.elementsContent = [this.item_0_i(),this.item_1_i(),this.item_2_i(),this.item_3_i(),this.item_4_i(),this.item_5_i()];
		return t;
	};
	_proto.item_0_i = function () {
		var t = new eui.Image();
		this.item_0 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "totems_json.totems_item_u_sele_png";
		t.x = 127;
		t.y = 15;
		return t;
	};
	_proto.item_1_i = function () {
		var t = new eui.Image();
		this.item_1 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "totems_json.totems_item_u_sele_png";
		t.x = 31;
		t.y = 73;
		return t;
	};
	_proto.item_2_i = function () {
		var t = new eui.Image();
		this.item_2 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "totems_json.totems_item_u_sele_png";
		t.x = 33;
		t.y = 186;
		return t;
	};
	_proto.item_3_i = function () {
		var t = new eui.Image();
		this.item_3 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "totems_json.totems_item_u_sele_png";
		t.x = 127;
		t.y = 241;
		return t;
	};
	_proto.item_4_i = function () {
		var t = new eui.Image();
		this.item_4 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "totems_json.totems_item_u_sele_png";
		t.x = 220;
		t.y = 186;
		return t;
	};
	_proto.item_5_i = function () {
		var t = new eui.Image();
		this.item_5 = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "totems_json.totems_item_u_sele_png";
		t.x = 223;
		t.y = 73;
		return t;
	};
	_proto.slider_i = function () {
		var t = new BaseCustComponent();
		this.slider = t;
		t.className = "SlidePart";
		t.height = 303;
		t.horizontalCenter = 0;
		t.skinName = "SlidePartSkin";
		t.top = 51;
		t.width = 416;
		return t;
	};
	_proto.img_0_i = function () {
		var t = new eui.Image();
		this.img_0 = t;
		t.horizontalCenter = 0;
		t.source = "totems_json.totems_upGrade_txt_png";
		t.y = 449;
		return t;
	};
	_proto.lvlMax_i = function () {
		var t = new eui.Image();
		this.lvlMax = t;
		t.horizontalCenter = 0;
		t.source = "totems_json.totems_max_png";
		t.y = 494;
		return t;
	};
	_proto.pBtn_i = function () {
		var t = new eui.Button();
		this.pBtn = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 57;
		t.icon = "res/btn/promote_1.png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.width = 142;
		t.x = 337;
		t.y = 487;
		return t;
	};
	_proto.btn_0_i = function () {
		var t = new eui.Button();
		this.btn_0 = t;
		t.icon = "totems_json.totems_resonance_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 408;
		t.y = 353;
		return t;
	};
	_proto.btn_1_i = function () {
		var t = new eui.Button();
		this.btn_1 = t;
		t.icon = "totems_json.totems_totalProp_png";
		t.label = "Button";
		t.skinName = "BtnIconSkin";
		t.x = 26;
		t.y = 353;
		return t;
	};
	_proto.item_i = function () {
		var t = new BaseCustComponent();
		this.item = t;
		t.className = "ItemBase";
		t.scaleX = 0.9;
		t.scaleY = 0.9;
		t.skinName = "ItembaseSkin";
		t.x = 23;
		t.y = 480;
		return t;
	};
	return TotemsPageSkin;
})(eui.Skin);generateEUI.paths['resource/exml/transfer/TransferPannelSkin.exml'] = window.TransferPannelSkin = (function (_super) {
	__extends(TransferPannelSkin, _super);
	function TransferPannelSkin() {
		_super.call(this);
		this.skinParts = ["roleSelect","imgRole","progressBar","job","step","show","iconEx","icon0","icon1","gSkill","btn","lbGo","propList","gAttr"];
		
		this.height = 680;
		this.width = 535;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.roleSelect_i(),this.imgRole_i(),this.progressBar_i(),this.job_i(),this.step_i(),this.show_i(),this.gSkill_i(),this.btn_i(),this.lbGo_i(),this.gAttr_i()];
	}
	var _proto = TransferPannelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.height = 680;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(20,168,65,17);
		t.source = "win_json.win_bg4_png";
		t.verticalCenter = 0;
		t.width = 530;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 11;
		t.height = 572;
		t.horizontalCenter = 0.5;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.width = 506;
		return t;
	};
	_proto.roleSelect_i = function () {
		var t = new BaseCustComponent();
		this.roleSelect = t;
		t.anchorOffsetX = 0;
		t.className = "RoleSelect";
		t.horizontalCenter = 0;
		t.skinName = "RoleSelectSkin";
		t.width = 508;
		t.y = 9.64;
		return t;
	};
	_proto.imgRole_i = function () {
		var t = new eui.Image();
		this.imgRole = t;
		t.source = "res/images/bg/transferRole00.png";
		t.x = 11;
		t.y = 99.32;
		return t;
	};
	_proto.progressBar_i = function () {
		var t = new eui.ProgressBar();
		this.progressBar = t;
		t.horizontalCenter = 0.5;
		t.skinName = "progressBarSkin5";
		t.slideDuration = 0;
		t.value = 100;
		t.width = 378;
		t.y = 562.33;
		return t;
	};
	_proto.job_i = function () {
		var t = new eui.Image();
		this.job = t;
		t.source = "transfer_json.transfer_role_10_png";
		t.x = 23;
		t.y = 211;
		return t;
	};
	_proto.step_i = function () {
		var t = new eui.Image();
		this.step = t;
		t.source = "transfer_json.transfer_step_1_png";
		t.x = 146;
		t.y = 192;
		return t;
	};
	_proto.show_i = function () {
		var t = new eui.Image();
		this.show = t;
		t.source = "transfer_json.transfer_3_png";
		t.x = 24;
		t.y = 107;
		return t;
	};
	_proto.gSkill_i = function () {
		var t = new eui.Group();
		this.gSkill = t;
		t.x = 57;
		t.y = 444;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this._Image5_i(),this.iconEx_i(),this.icon0_i(),this.icon1_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.height = 106;
		t.scale9Grid = new egret.Rectangle(8,9,21,21);
		t.source = "public_json.public_rect_5_png";
		t.width = 422;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "transfer_json.transfer_1_png";
		t.x = 5.99;
		t.y = 4;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "transfer_json.transfer_2_png";
		t.x = 145.36;
		t.y = 3;
		return t;
	};
	_proto.iconEx_i = function () {
		var t = new eui.Image();
		this.iconEx = t;
		t.source = "res/images/skill/16.png";
		t.x = 51;
		t.y = 12;
		return t;
	};
	_proto.icon0_i = function () {
		var t = new eui.Image();
		this.icon0 = t;
		t.source = "res/images/skill/16.png";
		t.x = 199;
		t.y = 12;
		return t;
	};
	_proto.icon1_i = function () {
		var t = new eui.Image();
		this.icon1 = t;
		t.source = "res/images/skill/16.png";
		t.x = 317;
		t.y = 12;
		return t;
	};
	_proto.btn_i = function () {
		var t = new eui.Button();
		this.btn = t;
		t.horizontalCenter = 0;
		t.icon = "res/btn/transfer.png";
		t.label = "";
		t.y = 599;
		return t;
	};
	_proto.lbGo_i = function () {
		var t = new eui.Label();
		this.lbGo = t;
		t.size = 16;
		t.text = "快速获得";
		t.textColor = 0x2aff00;
		t.x = 399;
		t.y = 618;
		return t;
	};
	_proto.gAttr_i = function () {
		var t = new eui.Group();
		this.gAttr = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 95;
		t.horizontalCenter = 0.5;
		t.visible = false;
		t.width = 292;
		t.y = 449;
		t.elementsContent = [this._Image6_i(),this._Image7_i(),this._Image8_i(),this.propList_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(19,14,119,27);
		t.source = "public_json.public_prop_rect_png";
		t.top = 0;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 62;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.right = 0;
		t.source = "public_json.public_slice_line5_png";
		t.width = 292;
		t.y = 30;
		return t;
	};
	_proto.propList_i = function () {
		var t = new BaseCustComponent();
		this.propList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.bottom = 8;
		t.className = "PropPart";
		t.left = 15;
		t.right = 15;
		t.skinName = "PropPartSkin";
		t.top = 8;
		return t;
	};
	return TransferPannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/transfer/TransferShowItemSkin.exml'] = window.TransferShowItemSkin = (function (_super) {
	__extends(TransferShowItemSkin, _super);
	function TransferShowItemSkin() {
		_super.call(this);
		this.skinParts = ["imgAccount","lbDesc"];
		
		this.width = 403;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this._Group1_i(),this.lbDesc_i()];
	}
	var _proto = TransferShowItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(24,24,27,52);
		t.source = "public_json.public_item_rect_1_png";
		t.verticalCenter = 0;
		t.width = 403;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = -0.5;
		t.scale9Grid = new egret.Rectangle(1,1,8,1);
		t.source = "role_json.role_line_fg_2_png";
		t.width = 384;
		t.y = 62;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.height = 41;
		t.horizontalCenter = 0.5;
		t.y = 12.97;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this.imgAccount_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_rect_3_png";
		t.x = 0;
		t.y = 14.4;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_rect_3_png";
		t.x = 162;
		t.y = 14.8;
		return t;
	};
	_proto.imgAccount_i = function () {
		var t = new eui.Image();
		this.imgAccount = t;
		t.horizontalCenter = 0;
		t.source = "transfer_json.transfer_name_00_png";
		t.y = 0;
		return t;
	};
	_proto.lbDesc_i = function () {
		var t = new eui.Label();
		this.lbDesc = t;
		t.horizontalCenter = 0;
		t.size = 16;
		t.text = "说明";
		t.y = 70.34;
		return t;
	};
	return TransferShowItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/transfer/TransferShowWinSkin.exml'] = window.TransferShowWinSkin = (function (_super) {
	__extends(TransferShowWinSkin, _super);
	function TransferShowWinSkin() {
		_super.call(this);
		this.skinParts = ["bg","list"];
		
		this.height = 550;
		this.elementsContent = [this.bg_i(),this._Group1_i()];
	}
	var _proto = TransferShowWinSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		t.x = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 15;
		t.height = 470;
		t.horizontalCenter = 0;
		t.top = 65;
		t.width = 415;
		t.elementsContent = [this._Scroller1_i()];
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.height = 460;
		t.horizontalCenter = 1;
		t.width = 403;
		t.y = 5;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.itemRendererSkinName = TransferShowItemSkin;
		t.x = 114;
		t.y = -1;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	return TransferShowWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/transfer/TransferUseItemSkin.exml'] = window.TransferUseItemSkin = (function (_super) {
	__extends(TransferUseItemSkin, _super);
	function TransferUseItemSkin() {
		_super.call(this);
		this.skinParts = ["lbNe","lbUse","item","lbLv","itemIcon","gPrice","eBtn","lbLeft"];
		
		this.width = 403;
		this.elementsContent = [this._Image1_i(),this.lbNe_i(),this.lbUse_i(),this.item_i(),this.gPrice_i(),this.eBtn_i(),this.lbLeft_i()];
	}
	var _proto = TransferUseItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(24,24,27,52);
		t.source = "public_json.public_item_rect_1_png";
		t.verticalCenter = 0;
		t.width = 403;
		return t;
	};
	_proto.lbNe_i = function () {
		var t = new eui.Label();
		this.lbNe = t;
		t.size = 18;
		t.text = "增加经验900";
		t.textColor = 0xefb903;
		t.x = 108.33;
		t.y = 26;
		return t;
	};
	_proto.lbUse_i = function () {
		var t = new eui.Label();
		this.lbUse = t;
		t.right = 15;
		t.size = 16;
		t.text = "今天可用20次";
		t.textColor = 0xFDFFD9;
		t.y = 15;
		return t;
	};
	_proto.item_i = function () {
		var t = new BaseCustComponent();
		this.item = t;
		t.className = "ItemBase";
		t.skinName = "ItembaseSkin";
		t.verticalCenter = 0.5;
		t.x = 12;
		return t;
	};
	_proto.gPrice_i = function () {
		var t = new eui.Group();
		this.gPrice = t;
		t.visible = false;
		t.x = 102.65;
		t.y = 50;
		t.elementsContent = [this.lbLv_i(),this.itemIcon_i()];
		return t;
	};
	_proto.lbLv_i = function () {
		var t = new eui.Label();
		this.lbLv = t;
		t.size = 16;
		t.text = "10000";
		t.textColor = 0xfdffd9;
		t.x = 27.35;
		t.y = 7;
		return t;
	};
	_proto.itemIcon_i = function () {
		var t = new eui.Image();
		this.itemIcon = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "res/images/item/14.png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.eBtn_i = function () {
		var t = new eui.Button();
		this.eBtn = t;
		t.icon = "res/btn/resolve_y_1.png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 281;
		t.y = 39;
		return t;
	};
	_proto.lbLeft_i = function () {
		var t = new eui.Label();
		this.lbLeft = t;
		t.size = 16;
		t.text = "剩余: 1000个";
		t.textColor = 0xFDFFD9;
		t.x = 111.35;
		t.y = 58;
		return t;
	};
	return TransferUseItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/transfer/TransferUseWinSkin.exml'] = window.TransferUseWinSkin = (function (_super) {
	__extends(TransferUseWinSkin, _super);
	function TransferUseWinSkin() {
		_super.call(this);
		this.skinParts = ["bg","list"];
		
		this.height = 400;
		this.elementsContent = [this.bg_i(),this._Group1_i()];
	}
	var _proto = TransferUseWinSkin.prototype;

	_proto.bg_i = function () {
		var t = new BaseWinBg();
		this.bg = t;
		t.bottom = 0;
		t.skinName = "BaseWinBg2Skin";
		t.top = 0;
		t.x = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 15;
		t.height = 470;
		t.horizontalCenter = 0;
		t.top = 65;
		t.width = 415;
		t.elementsContent = [this._Scroller1_i()];
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.height = 310;
		t.horizontalCenter = 1;
		t.width = 403;
		t.y = 7;
		t.viewport = this.list_i();
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.itemRendererSkinName = TransferUseItemSkin;
		t.x = 114;
		t.y = -1;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i(),this._Object6_i(),this._Object7_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object6_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object7_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	return TransferUseWinSkin;
})(eui.Skin);generateEUI.paths['resource/exml/vip/VipCardItemSkin.exml'] = window.VipCardItemSkin = (function (_super) {
	__extends(VipCardItemSkin, _super);
	function VipCardItemSkin() {
		_super.call(this);
		this.skinParts = ["imgPrice","imgItem0","lbNum0","imgItem1","lbNum1","gPrice","imgVip","lbMore","eBtn","eff","listLb"];
		
		this.elementsContent = [this._Image1_i(),this.imgPrice_i(),this.gPrice_i(),this.imgVip_i(),this._Group5_i()];
	}
	var _proto = VipCardItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(24,62,195,79);
		t.source = "vip_json.vip_rect_6_png";
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.imgPrice_i = function () {
		var t = new eui.Image();
		this.imgPrice = t;
		t.horizontalCenter = -125;
		t.source = "vip_json.vip_lb__png";
		t.visible = false;
		t.y = 157;
		return t;
	};
	_proto.gPrice_i = function () {
		var t = new eui.Group();
		this.gPrice = t;
		t.x = 31.01;
		t.y = 152;
		t.elementsContent = [this._Group1_i(),this._Group2_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Label1_i(),this.imgItem0_i(),this.lbNum0_i(),this._Image2_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.left = 0;
		t.size = 18;
		t.text = "价格:";
		t.textColor = 0xFDFFD9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto.imgItem0_i = function () {
		var t = new eui.Image();
		this.imgItem0 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "res/images/item/14.png";
		t.touchEnabled = false;
		t.x = 42;
		t.y = 0;
		return t;
	};
	_proto.lbNum0_i = function () {
		var t = new eui.Label();
		this.lbNum0 = t;
		t.size = 18;
		t.text = "999";
		t.textColor = 0xFDFFD9;
		t.touchEnabled = false;
		t.verticalCenter = 0.5;
		t.x = 71;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "vip_json.vip_bar_png";
		t.x = 44;
		t.y = 14;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 123;
		t.y = 0;
		t.elementsContent = [this.imgItem1_i(),this.lbNum1_i()];
		return t;
	};
	_proto.imgItem1_i = function () {
		var t = new eui.Image();
		this.imgItem1 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "res/images/item/14.png";
		t.touchEnabled = false;
		t.x = 2;
		t.y = 0;
		return t;
	};
	_proto.lbNum1_i = function () {
		var t = new eui.Label();
		this.lbNum1 = t;
		t.size = 18;
		t.text = "999";
		t.textColor = 0xFDFFD9;
		t.touchEnabled = false;
		t.x = 30.99;
		t.y = 6;
		return t;
	};
	_proto.imgVip_i = function () {
		var t = new eui.Image();
		this.imgVip = t;
		t.source = "vip_json.vip_img_1_png";
		t.x = 17;
		t.y = 5;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.right = 5;
		t.width = 251;
		t.y = 14;
		t.elementsContent = [this._Group3_i(),this._Group4_i(),this._Scroller1_i()];
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0.5;
		t.y = 80;
		t.elementsContent = [this._Image3_i(),this.lbMore_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 22.85;
		t.source = "public_json.public_item_name_png";
		t.width = 139;
		t.x = 0;
		t.y = 1.15;
		return t;
	};
	_proto.lbMore_i = function () {
		var t = new eui.Label();
		this.lbMore = t;
		t.horizontalCenter = 0.5;
		t.size = 16;
		t.text = "点击查看更多";
		t.textColor = 0x0cff00;
		t.y = 6.67;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 114;
		t.elementsContent = [this.eBtn_i(),this.eff_i()];
		return t;
	};
	_proto.eBtn_i = function () {
		var t = new eui.Button();
		this.eBtn = t;
		t.horizontalCenter = 0;
		t.icon = "res/btn/ljkt.png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.touchEnabled = true;
		t.y = 0;
		return t;
	};
	_proto.eff_i = function () {
		var t = new eui.Component();
		this.eff = t;
		t.horizontalCenter = 0;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.height = 69;
		t.left = 20;
		t.y = 6;
		t.viewport = this.listLb_i();
		return t;
	};
	_proto.listLb_i = function () {
		var t = new eui.List();
		this.listLb = t;
		t.itemRendererSkinName = VipWelfareItem2Skin;
		t.x = 31;
		t.y = 69;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 10;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	return VipCardItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/vip/VipCardPannelSkin.exml'] = window.VipCardPannelSkin = (function (_super) {
	__extends(VipCardPannelSkin, _super);
	function VipCardPannelSkin() {
		_super.call(this);
		this.skinParts = ["lbWelfareDay","listLb","btnLuck","progressBar","vipNum"];
		
		this.height = 628;
		this.width = 506;
		this.elementsContent = [this._Group1_i(),this._Scroller1_i(),this._Group3_i()];
	}
	var _proto = VipCardPannelSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 11;
		t.height = 40;
		t.horizontalCenter = 0;
		t.elementsContent = [this._Image1_i(),this._Label1_i(),this.lbWelfareDay_i(),this._Image2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "public_json.public_slice_line4_png";
		t.top = 0;
		t.width = 506;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 16;
		t.text = "特权有效期自动叠加,过期自动失效";
		t.textAlign = "center";
		t.textColor = 0x4c2f27;
		t.verticalCenter = 0;
		t.x = 37;
		return t;
	};
	_proto.lbWelfareDay_i = function () {
		var t = new eui.Label();
		this.lbWelfareDay = t;
		t.size = 16;
		t.text = "(当前有效期11天)";
		t.textAlign = "center";
		t.textColor = 0xff3700;
		t.verticalCenter = 0;
		t.x = 288;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.left = 10;
		t.source = "public_json.public_th_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.height = 469;
		t.horizontalCenter = 0;
		t.y = 102.01;
		t.viewport = this.listLb_i();
		return t;
	};
	_proto.listLb_i = function () {
		var t = new eui.List();
		this.listLb = t;
		t.anchorOffsetY = 0;
		t.itemRendererSkinName = VipCardItemSkin;
		t.x = 1;
		t.y = -14.67;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.width = 506;
		t.y = 0;
		t.elementsContent = [this.btnLuck_i(),this.progressBar_i(),this._Group2_i()];
		return t;
	};
	_proto.btnLuck_i = function () {
		var t = new eui.Button();
		this.btnLuck = t;
		t.icon = "vip_json.vip_cz_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 369.47;
		t.y = -31.3;
		return t;
	};
	_proto.progressBar_i = function () {
		var t = new eui.ProgressBar();
		this.progressBar = t;
		t.maximum = 60;
		t.skinName = "progressBarSkin7";
		t.slideDuration = 0;
		t.value = 100;
		t.x = 87.49;
		t.y = 25.82;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image3_i(),this.vipNum_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "vip_json.vip_tb_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.vipNum_i = function () {
		var t = new eui.Image();
		this.vipNum = t;
		t.horizontalCenter = 0.5;
		t.source = "vip_json.vip_15_png";
		t.y = 30;
		return t;
	};
	return VipCardPannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/vip/VipChargeItemSkin.exml'] = window.VipChargeItemSkin = (function (_super) {
	__extends(VipChargeItemSkin, _super);
	function VipChargeItemSkin() {
		_super.call(this);
		this.skinParts = ["imgIcon","imgItem0","lbNum0","imgItem1","lbNum1","imgVip","gPrice","lb3","lb2","lb1"];
		
		this.elementsContent = [this._Image1_i(),this.imgIcon_i(),this._Group1_i(),this.gPrice_i(),this.lb3_i(),this.lb2_i(),this.lb1_i()];
	}
	var _proto = VipChargeItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(24,62,195,79);
		t.source = "vip_json.vip_rect_bg_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto.imgIcon_i = function () {
		var t = new eui.Button();
		this.imgIcon = t;
		t.horizontalCenter = 0;
		t.icon = "vip_json.vip_zs_3_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 12;
		t.elementsContent = [this.imgItem0_i(),this.lbNum0_i()];
		return t;
	};
	_proto.imgItem0_i = function () {
		var t = new eui.Image();
		this.imgItem0 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "res/images/item/14.png";
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbNum0_i = function () {
		var t = new eui.Label();
		this.lbNum0 = t;
		t.size = 18;
		t.text = "999";
		t.textColor = 0xFDFFD9;
		t.touchEnabled = false;
		t.verticalCenter = 0.5;
		t.x = 29;
		return t;
	};
	_proto.gPrice_i = function () {
		var t = new eui.Group();
		this.gPrice = t;
		t.horizontalCenter = 0;
		t.y = 143;
		t.elementsContent = [this._Group3_i(),this.imgVip_i()];
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 0;
		t.elementsContent = [this._Image2_i(),this._Group2_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "vip_json.vip_rect_4_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.x = 120;
		t.y = 0;
		t.elementsContent = [this.imgItem1_i(),this.lbNum1_i()];
		return t;
	};
	_proto.imgItem1_i = function () {
		var t = new eui.Image();
		this.imgItem1 = t;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "res/images/item/14.png";
		t.touchEnabled = false;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbNum1_i = function () {
		var t = new eui.Label();
		this.lbNum1 = t;
		t.size = 18;
		t.text = "999";
		t.textColor = 0xFDFFD9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.x = 29;
		return t;
	};
	_proto.imgVip_i = function () {
		var t = new eui.Image();
		this.imgVip = t;
		t.source = "vip_json.vip_sc_png";
		t.x = -18;
		t.y = -151;
		return t;
	};
	_proto.lb3_i = function () {
		var t = new eui.Label();
		this.lb3 = t;
		t.horizontalCenter = 0.5;
		t.size = 22;
		t.text = "18元";
		t.textColor = 0x4c2f27;
		t.y = 177.9;
		return t;
	};
	_proto.lb2_i = function () {
		var t = new eui.Label();
		this.lb2 = t;
		t.horizontalCenter = 0.5;
		t.size = 16;
		t.stroke = 2;
		t.strokeColor = 0xffffff;
		t.text = "(不计入充值活动)";
		t.textColor = 0xff0000;
		t.y = 154;
		return t;
	};
	_proto.lb1_i = function () {
		var t = new eui.Label();
		this.lb1 = t;
		t.horizontalCenter = 0.5;
		t.size = 16;
		t.stroke = 2;
		t.strokeColor = 0xffffff;
		t.text = "每日100绑钻,持续7天";
		t.textColor = 0x09b800;
		t.y = 44.5;
		return t;
	};
	return VipChargeItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/vip/VipChargePannelSkin.exml'] = window.VipChargePannelSkin = (function (_super) {
	__extends(VipChargePannelSkin, _super);
	function VipChargePannelSkin() {
		_super.call(this);
		this.skinParts = ["listLb","btnLuck","progressBar","vipNum"];
		
		this.height = 628;
		this.width = 506;
		this.elementsContent = [this._Scroller1_i(),this._Group2_i()];
	}
	var _proto = VipChargePannelSkin.prototype;

	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.anchorOffsetY = 0;
		t.height = 520;
		t.horizontalCenter = 0;
		t.y = 102.01;
		t.viewport = this.listLb_i();
		return t;
	};
	_proto.listLb_i = function () {
		var t = new eui.List();
		this.listLb = t;
		t.anchorOffsetY = 0;
		t.itemRendererSkinName = VipChargeItemSkin;
		t.x = 0;
		t.y = -14.67;
		t.layout = this._TileLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i(),this._Object5_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object5_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.width = 506;
		t.y = 0;
		t.elementsContent = [this.btnLuck_i(),this.progressBar_i(),this._Group1_i()];
		return t;
	};
	_proto.btnLuck_i = function () {
		var t = new eui.Button();
		this.btnLuck = t;
		t.icon = "vip_json.vip_tq_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 384.47;
		t.y = -19.3;
		return t;
	};
	_proto.progressBar_i = function () {
		var t = new eui.ProgressBar();
		this.progressBar = t;
		t.maximum = 60;
		t.skinName = "progressBarSkin7";
		t.slideDuration = 0;
		t.value = 100;
		t.x = 87.49;
		t.y = 25.82;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this.vipNum_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "vip_json.vip_tb_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.vipNum_i = function () {
		var t = new eui.Image();
		this.vipNum = t;
		t.horizontalCenter = 0.5;
		t.source = "vip_json.vip_15_png";
		t.y = 30;
		return t;
	};
	return VipChargePannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/vip/VipTipsSkin.exml'] = window.VipTipsSkin = (function (_super) {
	__extends(VipTipsSkin, _super);
	function VipTipsSkin() {
		_super.call(this);
		this.skinParts = ["list"];
		
		this.width = 380;
		this.elementsContent = [this._Group1_i(),this._Image4_i()];
	}
	var _proto = VipTipsSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this.list_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(273,70,61,25);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "win_json.win_tips_bg2_png";
		t.top = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "win_json.win_slice_line_png";
		t.top = 63;
		t.width = 371;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "vip_json.vip_img_16_png";
		t.top = 23;
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.bottom = 40;
		t.itemRendererSkinName = VipWelfareItem3Skin;
		t.left = 22;
		t.top = 81;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		t.gap = 15;
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "";
		t.x = 218;
		t.y = 33;
		return t;
	};
	return VipTipsSkin;
})(eui.Skin);generateEUI.paths['resource/exml/vip/VipWelfareItem2Skin.exml'] = window.VipWelfareItem2Skin = (function (_super) {
	__extends(VipWelfareItem2Skin, _super);
	function VipWelfareItem2Skin() {
		_super.call(this);
		this.skinParts = ["lbDes"];
		
		this.elementsContent = [this._Image1_i(),this.lbDes_i()];
	}
	var _proto = VipWelfareItem2Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.source = "vip_json.vip_rect_1_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto.lbDes_i = function () {
		var t = new eui.Label();
		this.lbDes = t;
		t.left = 20;
		t.size = 16;
		t.text = "Lv900";
		t.textColor = 0x4c2f27;
		t.verticalCenter = 0;
		return t;
	};
	return VipWelfareItem2Skin;
})(eui.Skin);generateEUI.paths['resource/exml/vip/VipWelfareItem3Skin.exml'] = window.VipWelfareItem3Skin = (function (_super) {
	__extends(VipWelfareItem3Skin, _super);
	function VipWelfareItem3Skin() {
		_super.call(this);
		this.skinParts = ["lbDes"];
		
		this.elementsContent = [this._Image1_i(),this.lbDes_i()];
	}
	var _proto = VipWelfareItem3Skin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.source = "public_json.public_rect_3_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		return t;
	};
	_proto.lbDes_i = function () {
		var t = new eui.Label();
		this.lbDes = t;
		t.left = 20;
		t.size = 16;
		t.text = "Lv900";
		t.textColor = 0xffffff;
		t.verticalCenter = 0;
		return t;
	};
	return VipWelfareItem3Skin;
})(eui.Skin);generateEUI.paths['resource/exml/vip/VipWelfareItemSkin.exml'] = window.VipWelfareItemSkin = (function (_super) {
	__extends(VipWelfareItemSkin, _super);
	function VipWelfareItemSkin() {
		_super.call(this);
		this.skinParts = ["lbDes","imgNew"];
		
		this.width = 416;
		this.elementsContent = [this._Image1_i(),this.lbDes_i(),this.imgNew_i()];
	}
	var _proto = VipWelfareItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "vip_json.vip_rect_1_png";
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.x = 40;
		return t;
	};
	_proto.lbDes_i = function () {
		var t = new eui.Label();
		this.lbDes = t;
		t.size = 16;
		t.text = "Lv900";
		t.textColor = 0x4c2f27;
		t.verticalCenter = 0;
		t.x = 69;
		return t;
	};
	_proto.imgNew_i = function () {
		var t = new eui.Image();
		this.imgNew = t;
		t.right = 60;
		t.source = "vip_json.vip_new_png";
		t.verticalCenter = 0;
		return t;
	};
	return VipWelfareItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/vip/VipWelfarePannelSkin.exml'] = window.VipWelfarePannelSkin = (function (_super) {
	__extends(VipWelfarePannelSkin, _super);
	function VipWelfarePannelSkin() {
		_super.call(this);
		this.skinParts = ["btnLuck","progressBar","vipNum","lbTqlb","btnRw","list","slider","lbTq","imgDaily","lbAcross","lbNum","imgItem","imbGet"];
		
		this.height = 628;
		this.width = 506;
		this.elementsContent = [this._Group7_i()];
	}
	var _proto = VipWelfarePannelSkin.prototype;

	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.height = 628;
		t.width = 506;
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Group2_i(),this._Group3_i(),this.slider_i(),this._Group4_i(),this._Group6_i()];
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 90;
		t.horizontalCenter = 0;
		t.width = 506;
		t.y = 0;
		t.elementsContent = [this.btnLuck_i(),this.progressBar_i(),this._Group1_i()];
		return t;
	};
	_proto.btnLuck_i = function () {
		var t = new eui.Button();
		this.btnLuck = t;
		t.icon = "vip_json.vip_cz_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.x = 369.47;
		t.y = -31.3;
		return t;
	};
	_proto.progressBar_i = function () {
		var t = new eui.ProgressBar();
		this.progressBar = t;
		t.maximum = 60;
		t.skinName = "progressBarSkin7";
		t.slideDuration = 0;
		t.value = 100;
		t.x = 87.49;
		t.y = 26.15;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.x = 0;
		t.y = 0;
		t.elementsContent = [this._Image1_i(),this.vipNum_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "vip_json.vip_tb_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.vipNum_i = function () {
		var t = new eui.Image();
		this.vipNum = t;
		t.horizontalCenter = 0.5;
		t.source = "vip_json.vip_15_png";
		t.y = 30;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.bottom = 3;
		t.horizontalCenter = 0;
		t.elementsContent = [this._Image2_i(),this.lbTqlb_i(),this.btnRw_i(),this.list_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.height = 122;
		t.scale9Grid = new egret.Rectangle(62,33,376,3);
		t.source = "vip_json.vip_rect_2_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbTqlb_i = function () {
		var t = new eui.Label();
		this.lbTqlb = t;
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "VIP13特权";
		t.textColor = 0xFFCC00;
		t.y = 4.33;
		return t;
	};
	_proto.btnRw_i = function () {
		var t = new eui.Button();
		this.btnRw = t;
		t.icon = "res/btn/getReward.png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.width = 123;
		t.x = 365.87;
		t.y = 48.02;
		return t;
	};
	_proto.list_i = function () {
		var t = new eui.List();
		this.list = t;
		t.itemRendererSkinName = ItembaseSkin;
		t.rotation = 359.73;
		t.x = 9.03;
		t.y = 36.68;
		t.layout = this._HorizontalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i(),this._Object4_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object4_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto.slider_i = function () {
		var t = new BaseCustComponent();
		this.slider = t;
		t.className = "SlidePart";
		t.height = 340;
		t.skinName = "SlidePartSkin";
		t.width = 416;
		t.x = 45;
		t.y = 155;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.x = 38;
		t.y = 107.28;
		t.elementsContent = [this._Image3_i(),this.lbTq_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "vip_json.vip_rect_3_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.lbTq_i = function () {
		var t = new eui.Label();
		this.lbTq = t;
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "VIP13特权";
		t.textColor = 0xFFCC00;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.height = 99;
		t.width = 94;
		t.x = 383;
		t.y = 390.94;
		t.elementsContent = [this.imgDaily_i(),this.lbAcross_i(),this._Group5_i(),this.imbGet_i()];
		return t;
	};
	_proto.imgDaily_i = function () {
		var t = new eui.Button();
		this.imgDaily = t;
		t.height = 79;
		t.horizontalCenter = 0;
		t.icon = "vip_json.vip_bx_png";
		t.label = "";
		t.skinName = "BtnIconSkin";
		t.top = 0;
		t.width = 94;
		return t;
	};
	_proto.lbAcross_i = function () {
		var t = new eui.Label();
		this.lbAcross = t;
		t.horizontalCenter = 0;
		t.size = 15;
		t.text = "免费VIP礼包";
		t.textColor = 0xFFCC00;
		t.y = 60;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.horizontalCenter = 0;
		t.y = 77;
		t.elementsContent = [this._Label1_i(),this.lbNum_i(),this.imgItem_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.size = 15;
		t.text = "价值";
		t.textColor = 0x0066ff;
		t.x = 0;
		t.y = 3;
		return t;
	};
	_proto.lbNum_i = function () {
		var t = new eui.Label();
		this.lbNum = t;
		t.size = 15;
		t.text = "999";
		t.textColor = 0x0066FF;
		t.x = 52;
		t.y = 3;
		return t;
	};
	_proto.imgItem_i = function () {
		var t = new eui.Image();
		this.imgItem = t;
		t.scaleX = 0.3;
		t.scaleY = 0.3;
		t.source = "res/images/item/14.png";
		t.x = 30.99;
		t.y = 0;
		return t;
	};
	_proto.imbGet_i = function () {
		var t = new eui.Image();
		this.imbGet = t;
		t.horizontalCenter = 0;
		t.source = "public_json.luck_img2_png";
		t.top = 13;
		return t;
	};
	return VipWelfarePannelSkin;
})(eui.Skin);generateEUI.paths['resource/exml/vip/VipWelfareSlideItemSkin.exml'] = window.VipWelfareSlideItemSkin = (function (_super) {
	__extends(VipWelfareSlideItemSkin, _super);
	function VipWelfareSlideItemSkin() {
		_super.call(this);
		this.skinParts = ["listDes"];
		
		this.height = 340;
		this.width = 416;
		this.elementsContent = [this._Scroller1_i()];
	}
	var _proto = VipWelfareSlideItemSkin.prototype;

	_proto._Scroller1_i = function () {
		var t = new eui.Scroller();
		t.height = 340;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 416;
		t.viewport = this.listDes_i();
		return t;
	};
	_proto.listDes_i = function () {
		var t = new eui.List();
		this.listDes = t;
		t.itemRendererSkinName = VipWelfareItemSkin;
		t.layout = this._VerticalLayout1_i();
		t.dataProvider = this._ArrayCollection1_i();
		return t;
	};
	_proto._VerticalLayout1_i = function () {
		var t = new eui.VerticalLayout();
		return t;
	};
	_proto._ArrayCollection1_i = function () {
		var t = new eui.ArrayCollection();
		t.source = [this._Object1_i(),this._Object2_i(),this._Object3_i()];
		return t;
	};
	_proto._Object1_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object2_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	_proto._Object3_i = function () {
		var t = {};
		t.d = "null";
		return t;
	};
	return VipWelfareSlideItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/wing/component/StarItemSkin.exml'] = window.StarItemSkin = (function (_super) {
	__extends(StarItemSkin, _super);
	function StarItemSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i()];
		this.states = [
			new eui.State ("on",
				[
				])
			,
			new eui.State ("off",
				[
					new eui.SetProperty("_Image1","source","public_json.public_star_off_png")
				])
		];
	}
	var _proto = StarItemSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.horizontalCenter = 0;
		t.source = "public_json.public_star_on_png";
		t.verticalCenter = 0;
		return t;
	};
	return StarItemSkin;
})(eui.Skin);generateEUI.paths['resource/exml/wing/WingSkillIconSkin.exml'] = window.WingSkillIconSkin = (function (_super) {
	__extends(WingSkillIconSkin, _super);
	function WingSkillIconSkin() {
		_super.call(this);
		this.skinParts = ["skillIcon","condi"];
		
		this.height = 91;
		this.width = 72;
		this.elementsContent = [this.skillIcon_i(),this.condi_i()];
	}
	var _proto = WingSkillIconSkin.prototype;

	_proto.skillIcon_i = function () {
		var t = new eui.Image();
		this.skillIcon = t;
		t.source = "wing_json.wing_skill_1_png";
		t.top = 0;
		t.x = 0;
		return t;
	};
	_proto.condi_i = function () {
		var t = new eui.Label();
		this.condi = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.size = 15;
		t.text = "Label";
		t.textColor = 0x00eaff;
		return t;
	};
	return WingSkillIconSkin;
})(eui.Skin);generateEUI.paths['resource/exml/wing/WingPageSkin.exml'] = window.WingPageSkin = (function (_super) {
	__extends(WingPageSkin, _super);
	function WingPageSkin() {
		_super.call(this);
		this.skinParts = ["roleSelect","propList","pro","zdl","instruction","cBox","skill_0","skill_1","skill_2","skill_3","btn_0","btn_1","btn_2","cost_0","cost_1","count","starPro","lvlT","roleMdl"];
		
		this.height = 565;
		this.width = 510;
		this.elementsContent = [this._Image1_i(),this.roleSelect_i(),this._Image2_i(),this._Group1_i(),this.pro_i(),this.zdl_i(),this.instruction_i(),this.cBox_i(),this._Image5_i(),this._Image6_i(),this._Group2_i(),this.btn_0_i(),this.btn_1_i(),this.btn_2_i(),this.cost_0_i(),this.cost_1_i(),this.count_i(),this.starPro_i(),this.lvlT_i(),this.roleMdl_i()];
	}
	var _proto = WingPageSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.anchorOffsetY = 0;
		t.bottom = 3;
		t.height = 482;
		t.horizontalCenter = -1;
		t.scale9Grid = new egret.Rectangle(11,13,19,18);
		t.source = "win_json.win_bg_line_png";
		t.width = 506;
		return t;
	};
	_proto.roleSelect_i = function () {
		var t = new BaseCustComponent();
		this.roleSelect = t;
		t.className = "RoleSelect";
		t.skinName = "RoleSelectSkin";
		t.x = 3;
		t.y = -5;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "res/images/bg/wingBg.png";
		t.y = 86;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 72;
		t.horizontalCenter = 0;
		t.width = 292;
		t.y = 363;
		t.elementsContent = [this._Image3_i(),this._Image4_i(),this.propList_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.bottom = -2;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(11,12,16,15);
		t.source = "public_json.public_rect_5_png";
		t.top = 2;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "public_json.public_slice_line5_png";
		t.verticalCenter = 0;
		t.width = 292;
		t.x = 0;
		return t;
	};
	_proto.propList_i = function () {
		var t = new BaseCustComponent();
		this.propList = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.className = "PropPart";
		t.left = 0;
		t.right = 0;
		t.skinName = "PropPartSkin";
		t.top = 13;
		return t;
	};
	_proto.pro_i = function () {
		var t = new eui.ProgressBar();
		this.pro = t;
		t.horizontalCenter = 0;
		t.skinName = "progressBarSkin5";
		t.slideDuration = 1;
		t.y = 331;
		return t;
	};
	_proto.zdl_i = function () {
		var t = new BaseCustComponent();
		this.zdl = t;
		t.anchorOffsetX = 29;
		t.anchorOffsetY = 0;
		t.className = "ZdlPrint";
		t.horizontalCenter = 0;
		t.skinName = "ZdlPrintSkin";
		t.y = 91;
		return t;
	};
	_proto.instruction_i = function () {
		var t = new BaseCustComponent();
		this.instruction = t;
		t.className = "InstructionPart";
		t.name = "1";
		t.skinName = "InstructionPartSkin";
		t.visible = false;
		t.x = 18;
		t.y = 99;
		return t;
	};
	_proto.cBox_i = function () {
		var t = new eui.CheckBox();
		this.cBox = t;
		t.label = "自动培养";
		t.skinName = "CheckBox2Skin";
		t.visible = false;
		t.x = 13;
		t.y = 534;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "wing_json.wing_text_4_png";
		t.visible = false;
		t.x = 79;
		t.y = 334;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "wing_json.wing_text_1_png";
		t.y = 536;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.height = 195;
		t.horizontalCenter = 0;
		t.top = 138;
		t.touchChildren = true;
		t.touchEnabled = false;
		t.touchThrough = true;
		t.layout = this._TileLayout1_i();
		t.elementsContent = [this.skill_0_i(),this.skill_1_i(),this.skill_2_i(),this.skill_3_i()];
		return t;
	};
	_proto._TileLayout1_i = function () {
		var t = new eui.TileLayout();
		t.horizontalGap = 332;
		t.requestedColumnCount = 2;
		t.requestedRowCount = 2;
		return t;
	};
	_proto.skill_0_i = function () {
		var t = new BaseCustComponent();
		this.skill_0 = t;
		t.className = "WingSkillItem";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "WingSkillIconSkin";
		t.x = 23;
		t.y = 9;
		return t;
	};
	_proto.skill_1_i = function () {
		var t = new BaseCustComponent();
		this.skill_1 = t;
		t.className = "WingSkillItem";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "WingSkillIconSkin";
		t.x = 33;
		t.y = 19;
		return t;
	};
	_proto.skill_2_i = function () {
		var t = new BaseCustComponent();
		this.skill_2 = t;
		t.className = "WingSkillItem";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "WingSkillIconSkin";
		t.x = 43;
		t.y = 29;
		return t;
	};
	_proto.skill_3_i = function () {
		var t = new BaseCustComponent();
		this.skill_3 = t;
		t.className = "WingSkillItem";
		t.scaleX = 1;
		t.scaleY = 1;
		t.skinName = "WingSkillIconSkin";
		t.x = 53;
		t.y = 39;
		return t;
	};
	_proto.btn_0_i = function () {
		var t = new eui.Button();
		this.btn_0 = t;
		t.icon = "res/btn/coinCulture.png";
		t.label = "Button";
		t.name = "0";
		t.skinName = "BtnIconSkin";
		t.x = 184;
		t.y = 472;
		return t;
	};
	_proto.btn_1_i = function () {
		var t = new eui.Button();
		this.btn_1 = t;
		t.icon = "res/btn/itemCulture.png";
		t.label = "Button";
		t.name = "1";
		t.skinName = "BtnIconSkin";
		t.x = 341;
		t.y = 472;
		return t;
	};
	_proto.btn_2_i = function () {
		var t = new eui.Button();
		this.btn_2 = t;
		t.icon = "res/btn/risingBtn.png";
		t.label = "Button";
		t.name = "2";
		t.skinName = "BtnIconSkin";
		t.x = 25;
		t.y = 472;
		return t;
	};
	_proto.cost_0_i = function () {
		var t = new ItemExpend();
		this.cost_0 = t;
		t.currentState = "single";
		t.label = " ";
		t.x = 188;
		t.y = 442;
		return t;
	};
	_proto.cost_1_i = function () {
		var t = new ItemExpend();
		this.cost_1 = t;
		t.label = " ";
		t.x = 344;
		t.y = 443;
		return t;
	};
	_proto.count_i = function () {
		var t = new eui.Label();
		this.count = t;
		t.size = 16;
		t.text = "(10)";
		t.textColor = 0x00ff0c;
		t.touchEnabled = false;
		t.x = 293;
		t.y = 488;
		return t;
	};
	_proto.starPro_i = function () {
		var t = new BaseCustComponent();
		this.starPro = t;
		t.className = "StarProgress";
		t.horizontalCenter = 0;
		t.skinName = "StarProgressSkin";
		t.y = 312;
		return t;
	};
	_proto.lvlT_i = function () {
		var t = new eui.Label();
		this.lvlT = t;
		t.horizontalCenter = 0;
		t.text = "Label";
		t.y = 136;
		return t;
	};
	_proto.roleMdl_i = function () {
		var t = new eui.Component();
		this.roleMdl = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.x = 255;
		t.y = 248;
		return t;
	};
	return WingPageSkin;
})(eui.Skin);generateEUI.paths['resource/exml/wing/WingSkillTipsSkin.exml'] = window.WingSkillTipsSkin = (function (_super) {
	__extends(WingSkillTipsSkin, _super);
	function WingSkillTipsSkin() {
		_super.call(this);
		this.skinParts = ["skillIcon","skillName","t0","t1","desc","condiTxt"];
		
		this.height = 185;
		this.width = 378;
		this.elementsContent = [this._Image1_i(),this._Image2_i(),this.skillIcon_i(),this.skillName_i(),this.t0_i(),this.t1_i(),this.desc_i(),this.condiTxt_i()];
	}
	var _proto = WingSkillTipsSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(273,70,61,25);
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "win_json.win_tips_bg2_png";
		t.top = 0;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "win_json.win_slice_line_png";
		t.width = 369;
		t.y = 102;
		return t;
	};
	_proto.skillIcon_i = function () {
		var t = new eui.Image();
		this.skillIcon = t;
		t.left = 32;
		t.source = "";
		t.top = 17;
		return t;
	};
	_proto.skillName_i = function () {
		var t = new eui.Label();
		this.skillName = t;
		t.size = 20;
		t.text = "skillName";
		t.textColor = 0xffd823;
		t.x = 111;
		t.y = 42;
		return t;
	};
	_proto.t0_i = function () {
		var t = new eui.Label();
		this.t0 = t;
		t.left = 35;
		t.size = 16;
		t.text = "激活条件 : ";
		t.textColor = 0xffd823;
		t.y = 116;
		return t;
	};
	_proto.t1_i = function () {
		var t = new eui.Label();
		this.t1 = t;
		t.left = 35;
		t.size = 16;
		t.text = "技能效果 : ";
		t.textColor = 0xFFD823;
		t.y = 136;
		return t;
	};
	_proto.desc_i = function () {
		var t = new eui.Label();
		this.desc = t;
		t.left = 113;
		t.right = 34;
		t.size = 16;
		t.text = "";
		t.textColor = 0xffffff;
		t.y = 136;
		return t;
	};
	_proto.condiTxt_i = function () {
		var t = new eui.Label();
		this.condiTxt = t;
		t.left = 113;
		t.size = 16;
		t.text = "";
		t.textColor = 0xffffff;
		t.y = 116;
		return t;
	};
	return WingSkillTipsSkin;
})(eui.Skin);