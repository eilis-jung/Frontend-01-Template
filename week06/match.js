function getLPS(str) {
    res = [];

    for (let x in str) {
        let prefixes = [];
        let suffixes = [];
        let substr = str.slice(0, Number(x) + 1);
        for (let y in substr) {
            let prefix = substr.slice(0, Number(y));
            let suffix = substr.slice(Number(y), substr.length);
            if (prefix.length > 0 && prefix != substr)
                prefixes.push(prefix);
            if (suffix.length > 0 && suffix != substr)
                suffixes.push(suffix);
        }

        let lps = [];

        for (let x of prefixes) {
            let isLps = suffixes.find((y)=>{
                return y == x;
            });
            if (isLps) {
                lps.push(x);
            }
        }
        res.push(lps.length);
    }
    console.log(res);
    return res;
}

function KMPsearch(str, pat, lpsArr) {
    var lpsArr = getLPS(pat);
    let ind = 0;
    let ind2 = 0;
    let res = [];
    while (ind < str.length) {
        if(str[ind] == pat[ind2]) {
            if (ind2 == pat.length - 1) {
                res.push(ind - pat.length + 1);
                ind2 = lpsArr[ind2 - 1];
            }
            ind ++;
            ind2 ++;
        } else {
            if (ind2 > 0) {
                ind2 = lpsArr[ind2 - 1];
            } else {
                ind ++;
            }
        }
    }

    return res;
}

var pat = "abaab";
var des = "abaabaab";
var res =  KMPsearch(des, pat);



// function getTFTable(pat) {
//     var res = [];
//     for (let x = 0; x <= pat.length; x++) {
//         let tempRes = {};
//         for (let y = 0; y < pat.length; y++) {
//             tempRes[pat[y]] = 0;
//         }
//         res.push(tempRes);
//     }

//     for (let x = 0; x < pat.length; x++) {
//         res[x][pat[x]] = x + 1;
//     }

//     console.log(res);
    
// }

// getTFTable(pat)