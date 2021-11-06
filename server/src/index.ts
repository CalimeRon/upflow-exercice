const port = process.env.PORT || 4000;
import db from '@src/models/';
import createServer from 'src/utils/server';

const app = createServer();


(async function bootstrap() {
  await db.sequelize.sync();
  app.listen(port, () => {
    console.log(`App listening on port ${port} 🚀🚀`);
  });
})();
