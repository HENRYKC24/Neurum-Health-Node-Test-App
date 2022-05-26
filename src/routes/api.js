import express from 'express';
import RemoteAPI from '../controller/remoteAPI';
const { updateRemoteApi } = RemoteAPI;

const router = express.Router();
router.put('/update_remote_api', updateRemoteApi);

export default router;
