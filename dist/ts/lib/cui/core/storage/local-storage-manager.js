import * as tslib_1 from "tslib";
import { AbstractStroage } from './abstract-storage';
var LocalStorageManager = /** @class */ (function (_super) {
    tslib_1.__extends(LocalStorageManager, _super);
    function LocalStorageManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalStorageManager.storage = localStorage;
    return LocalStorageManager;
}(AbstractStroage));
export { LocalStorageManager };
//# sourceMappingURL=local-storage-manager.js.map