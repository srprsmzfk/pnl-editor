let express = require('express');
let app = express();
app.use(express.static('./dist/pnl-app'));
app.get('/*', function (req, res) {
  res.sendFile('index.html', {root: 'dist/pnl-app/'}
  );
});
app.listen(process.env.PORT || 8080);
