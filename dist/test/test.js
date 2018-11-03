var ColumnField = /** @class */ (function () {
    function ColumnField(config) {
        this.config = config;
        this.message = config.message == undefined ? '' : config.message;
        this.value = config.value == undefined ? undefined : config.value;
    }
    ColumnField.prototype.valid = function () {
    };
    return ColumnField;
}());
export { ColumnField };
function Column(config) {
    return function (target, key) {
    };
}
function Form(target) {
    var original = target;
    function construct(constructor, args) {
        var c = function () {
            console.log('construct', constructor.prototype);
            return constructor.apply(this, args);
        };
        c.prototype = constructor.prototype;
        var con = new c();
        return con;
    }
    var f = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("New: " + original.name);
        return construct(original, args);
    };
    f.prototype = original.prototype;
    return f;
}
//# sourceMappingURL=test.js.map