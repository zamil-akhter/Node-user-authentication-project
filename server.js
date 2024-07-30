require('dotenv').config();
const databaseConnection = require('./databaseConnection');
const userRouter = require('./src/routes/userRouter');
const express = require('express');
const app = express();

//
(async() => {
    try {
        app.get('/',(req,res)=>{
            res.send('Welcome');
        });
        app.listen(process.env.PORT || 3000,()=>{
            console.log('Server is listening');
        });
        await databaseConnection.databaseConnection();
        app.use(express.json());
        app.use('/user', userRouter);   
        app.use('/product', userRouter);
    } catch (error) {
        throw error;
    }
})();