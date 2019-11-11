
/**
 * 数字工具类
 * @author WynnLam
 * 
 */
class NumericUtils {
    //16进制字符表
    static HexCharTable: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

    /**
     * 整数转换为16进制字符串
     * 返回格式为"FFFFFFFF"的字符串，并不带有"0x"或"H"
     * @param N
     * @return 
     * 
     */
    static IntToHex(N: number): string {
        return this.HexCharTable[(N & 0xF0000000) >> 28]
            + this.HexCharTable[(N & 0x0F000000) >> 24]
            + this.HexCharTable[(N & 0x00F00000) >> 20]
            + this.HexCharTable[(N & 0x000F0000) >> 16]
            + this.HexCharTable[(N & 0x0000F000) >> 12]
            + this.HexCharTable[(N & 0x00000F00) >> 8]
            + this.HexCharTable[(N & 0x000000F0) >> 4]
            + this.HexCharTable[N & 0x0000000F];
    }
    /**
     * 16进制字符串转换为整数 
     * @param S 格式为"FFFFFFFF"的字符串，并不带有"0x"或"H"
     * @return 
     * 
     */
    static HexToInt(S: string): number {
        var Result: number = 0;
        var i: number, c: number;
        for (i = 0; i < 8; ++i) {
            if (i >= S.length)
                break;
            Result <<= 4;
            c = S.charCodeAt(i);
            if (c >= 0x30 && c <= 0x39)
                Result |= c - 0x30;
            else if (c >= 0x41 && c <= 0x46)
                Result |= (c - 0x41) + 10;
            else if (c >= 0x61 && c <= 0x66)
                Result |= (c - 0x61) + 10;
            else break;
        }
        return Result;
    }
    /**
     * 将两个32位数据组合成一个64位数据
     * 因为AS3最大的表示范围就是Number的53位
     * 所以合并后的数值不能大于Number可以表示的范围
     * 另外，这里不能使用移位操作，因为AS3的位操作都会把
     * 数值转换成32位无符号整数
     * @param lo
     * @param hi
     * @return 
     * 
     */
    static MakeLong64(lo: number, hi: number): Number {
        return lo + hi * 0x100000000;
    }
    /**
     * 将两个16位数据组合为一个32位数据 
     * @param lo 低位
     * @param hi 高位
     * @return 
     * 
     */
    static MakeLong(lo: number, hi: number): number {
        return (lo & 0xFFFF) | ((hi << 16) & 0xFFFF0000);
    }
    /**
     * 将两个8位数据组合为一个16位数据 
     * @param lo 低位
     * @param hi 高位
     * @return 
     * 
     */
    static MakeWord(lo: number, hi: number): number {
        return (lo & 0xFF) | ((hi << 8) & 0xFF00);
    }
    /**
     * 取一个32位整数的低16位 
     * @param u
     * @return 
     * 
     */
    static LoWord(u: number): number {
        return u & 0xFFFF;
    }
    /**
     * 取一个32位整数的高16位 
     * @param u
     * @return 
     * 
     */
    static HiWord(u: number): number {
        return (u >> 16) & 0xFFFF;
    }
    /**
     * 取一个16位整数的低8位 
     * @param u
     * @return 
     * 
     */
    static LoByte(u: number): number {
        return u & 0xFF;
    }
    /**
     * 取一个16位整数的高8位 
     * @param u
     * @return 
     * 
     */
    static HiByte(u: number): number {
        return (u >> 8) & 0xFF;
    }

    static PercentToFixed(value: number, fix: number): string {
        fix = 10 ^ fix;
        value *= fix;
        value = Math.floor(value) / fix;
        return value.toString();
    }

}
