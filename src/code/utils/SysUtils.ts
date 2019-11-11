class SysUtils {
	public constructor() {
	}
    /**
	 * 拷贝到系统黏贴板
	 * 
	 */
	static copyToPasteBoard(str: string): void {
		let input = document.createElement("input");
		input.value = str;
		document.body.appendChild(input);
		input.select();
		input.setSelectionRange(0, input.value.length),
		document.execCommand('Copy');
		document.body.removeChild(input);
	}
}