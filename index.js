import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

// limit set since we are going to allow images to be uploaded, which can be large in size
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/posts', postRoutes);

// route that user sees upon vistiing the actual deployed version of the BE:
app.get('/', (req, res) => {
    res.send('Welcome to the Memories App API!');
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    // if connection is successful, then app.listen
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(err.message));

mongoose.set('useFindAndModify', false);

// https://www.mongodb.com/cloud/atlas - note: atlas is the cloud version of mongoDB, which means they are going to host our DB on their cloud

