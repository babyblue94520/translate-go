import * as tslib_1 from "tslib";
import { AbstractStroage } from './abstract-storage';
var SessionStorageManager = /** @class */ (function (_super) {
    tslib_1.__extends(SessionStorageManager, _super);
    function SessionStorageManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SessionStorageManager.storage = sessionStorage;
    return SessionStorageManager;
}(AbstractStroage));
export { SessionStorageManager };
//# sourceMappingURL=session-storage-manager.js.map