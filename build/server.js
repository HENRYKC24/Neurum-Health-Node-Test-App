"use strict";

var _express = _interopRequireDefault(require("express"));

var _api = _interopRequireDefault(require("./routes/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.use(_express.default.json());
app.get('/api', (req, res) => {
  res.status(200).send('Welcome to Node Test Application!');
});
app.use('/api/v1/', _api.default);
app.get('/api/v1/man', (req, res) => {
  res.status(200).send('Welcome to Node Test Application*****!');
});
const PORT = 5000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at port ${PORT}`);
});
//# sourceMappingURL=server.js.map