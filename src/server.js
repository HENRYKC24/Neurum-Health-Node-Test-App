import express from 'express';
import router from './routes/api';

const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
  res.status(200).send('Welcome to Node Test Application!');
});

app.use('/api/v1/', router);

app.get('/api/v1/man', (req, res) => {
  res.status(200).send('Welcome to Node Test Application*****!');
});

const PORT = 5000;
app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at port ${PORT}`);
});
