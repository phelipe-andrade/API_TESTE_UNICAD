import mongoose from 'mongoose';

mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true });

import UserModel from './models/UserModel';

/* eslint-disable */
class DB {


}

export default DB;
