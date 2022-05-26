"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _remoteAPI = _interopRequireDefault(require("../controller/remoteAPI"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  updateRemoteApi
} = _remoteAPI.default;

const router = _express.default.Router();

router.put('/update_remote_api', updateRemoteApi);
var _default = router;
exports.default = _default;
//# sourceMappingURL=api.js.map