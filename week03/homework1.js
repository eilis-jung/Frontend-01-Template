function convertNumberToString(number, x = 10) {
    let integer = Math.floor(number);
    let fraction = number - integer;
    let res = '';

    while(integer > 0){
        residual = (integer % x);
        letter = residual >= 10 ? String.fromCharCode('A'.codePointAt(0) + (residual - 10)) : residual;
        res = letter + res;
        integer =  Math.floor(integer / x);
    }

    if (fraction > 0) {
        res += ".";
        let i = 1;
        while (fraction > Number.EPSILON * Math.pow(x, i)) {
            fraction = fraction * x;

            residual = Math.floor(fraction);
            letter = residual >= 10 ? String.fromCharCode('A'.codePointAt(0) + (residual - 10)) : residual;

            res += letter;
            fraction = fraction - Math.floor(fraction);
            i ++;
        }
    }

    return res;

}


function convertStringToNumber(str) {
    let reIntDec = /^(\+|\-)?[0-9]*\.*$/;
    let reIntBin = /^0b[0-1]*$/;
    let reIntOct = /^0o[0-7]*$/;
    let reIntOct2 = /^0[1-7][0-7]*$/;
    let reIntHex = /^0x([0-9]|[A-F]|[a-f])*$/;
    let reFloatDec = /^(\+|\-)?[0-9]*\.[0-9]+(E|e)(\+|\-)?[0-9]*$/;
    let reZero = /^((0b|0o|0x)0*)|(0+)$/;

    var res = 0;


    if (reIntBin.test(str)) {
        console.log("reIntBin");
        let power = 1;
        for(let i = str.length - 1; str[i] != 'b'; i--) {
            res += (str.codePointAt(i) - '0'.codePointAt(0)) * power;
            power *= 2;
        }
        return res;
    }
    if (reIntOct.test(str)) {
        console.log("reIntOct");
        let power = 1;
        for(let i = str.length - 1; str[i] != 'o'; i--) {
            res += (str.codePointAt(i) - '0'.codePointAt(0)) * power;
            power *= 8;
        }
        return res;
    }
    if (reIntOct2.test(str)) {
        console.log("reIntOct2");
        let power = 1;
        for(let i = str.length - 1; i>0; i--) {
            res += (str.codePointAt(i) - '0'.codePointAt(0)) * power;
            power *= 8;
        }
        return res;
    }
    if (reIntHex.test(str)) {
        console.log("reIntHex");
        let power = 1;
        for(let i = str.length - 1; str[i] != 'x'; i--) {
            let r = str.codePointAt(i);
            if (r >= 61)
                r = r - 61 + 10;
            else if (r >= 41)
                r = r - 41 + 10;
            else
                r = r - '0'.codePointAt(0);

            res += r * power;
            power *= 16;
        }
        return res;
    }

    if (reIntDec.test(str)) {
        console.log("reIntDec");
        let sign = (str[0] == '-' ||str[0] == '+') ? true:false;
        let init = sign?1:0;
        let power = 1;

        for (var i = str.length - 1; i >= init; i--) {
            if (str[i] == '.') {
                continue;
            }
            res += (str.codePointAt(i) - '0'.codePointAt(0)) * power;
            power *= 10;
        }
        if (str[0] == '-') res = -res;

        return res;
    }
    if (reFloatDec.test(str)) {
        console.log("reFloatDec");
        let dot = str.search(/\./);
        let exp = str.search('E') == -1 ? str.search('e') : -1;
        let sign = (str[0] == '-' ||str[0] == '+') ? true:false;
        let init = sign?1:0;
        let power = 1;

        // integer
        let intEnd = dot == -1? exp : dot;
        for (let i = intEnd - 1; i >= init; i--) {
            res += (str.codePointAt(i) - '0'.codePointAt(0)) * power;
            power *= 10;
        }

        // fraction
        if (dot != -1 && dot + 1 != exp) {
            power = 0.1;
            for (let i = dot + 1; i < exp; i++) {
                res += (str.codePointAt(i) - '0'.codePointAt(0)) * power;
                power /= 10;
            }
        }

        // exponential
        let expInit = (str[exp + 1] == '+' || str[exp + 1] == '-') ? exp + 1 : exp;
        power = 1;
        let expRes = 0;
        for (let i = str.length - 1; i > expInit; i--) {
            expRes += (str.codePointAt(i) - '0'.codePointAt(0)) * power;
            power *= 10;
        }
        if (str[exp + 1] == '-')
            expRes = -expRes;

        res = Math.pow(res, expRes);
        if (str[0] == '-') res = -res;

        return res;
    }

    if (reZero.test(str))
        return 0;

    return NaN;
}