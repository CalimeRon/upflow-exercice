const router = require('express').Router();
import * as table from '@src/controllers/downflowTable';

router.get('/', table.getTable);

router.post('/row', table.postRow);
router.delete('/row', table.deleteRow);
router.put('/row', table.updateRow);

router.get('/totalCount', table.getCount);

router.post('/manyRows', table.postManyRows);

router.delete('/allRows', table.deleteAllRows);
export default router;
