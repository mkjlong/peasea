import express from 'express';
import router from './routes';
const app = express();

app.use(express.json());

// Mount all routes under /api
app.use('/api', router);

app.get('/api', function(req, res) {
    res.send("hi");
});

export default app;