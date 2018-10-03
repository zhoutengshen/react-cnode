//一个非空对象
const isNotNullObj = function (obj) {
    return obj instanceof Object;
}

/**
 * 转换规则
 */
class ChangeRuler {
    /**
     * 
     * @param {Function} resolveKey 
     */
    constructor(resolveKey) {
        this.resolveKey = resolveKey;
    }

    /**
     * 键转换
     * @param {String} key 
     * @param {ChangeRuler} op
     */
    exchangeKey(key) {
        if (typeof key !== "string") throw Error("key 必须为string");
        return this.resolveKey(key);
    }
}
/**
 * 所有的替换规则
 */
const rulers = {
    snake2camal: new ChangeRuler(function (key) {
        let newKey = key.replace(/[-_].?/g, function (val) {
            return val.toUpperCase().replace(/[-_]/, "");
        });
        return newKey;
    }),
    camal2snake: new ChangeRuler(function (key) {

        let newKey = key.replace(/[A-Z]+/g, function (val) {
            return "_" + val.charAt(0).toLowerCase().concat(val.substr(1, val.length - 1));
        });
        return newKey.charAt(0) === "_" ? newKey.substr(1, newKey.length - 1) : newKey;
    })
}
/**
 * 转换函数
 * @param {any} obj 
 * @param {ChangeRuler} op 
 */
const caseChanger = function (obj, op) {
    if (!isNotNullObj(obj)) {
        if (typeof obj == "string") {
            return op.exchangeKey(obj)
        }
        return obj
    }
    let newObj = obj.constructor();
    for (key in obj) {
        let val = obj[key];
        let newKey = op.exchangeKey(key);
        newObj[newKey] = val;
        if (isNotNullObj(newObj[newKey])) {
            newObj[newKey] = caseChanger(newObj[newKey], op);
        }
    }
    return newObj;
}
/**
 * 驼峰转换为下换线命名
 * @param {any} obj 
 */
const camal2snake = function (obj) {
    return caseChanger(obj, rulers.camal2snake);
}
/**下换线转换为驼峰命名
 * @param {any} obj
 */
const snake2camal = function (obj) {
    return caseChanger(obj, rulers.snake2camal);
}
module.exports = {
    snake2camal,
    camal2snake
}
