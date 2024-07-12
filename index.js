const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
