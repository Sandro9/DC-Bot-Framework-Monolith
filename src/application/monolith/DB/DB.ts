import DBError from '../App/Exceptions/DBError';
import { MongoClient } from "mongodb";
import MainConfig from '../Configs/MainConfig';
import mongoose from 'mongoose';

export default class DB 
{
    private static DB: DB;
    private mongoClient;
    private db;

    private constructor(){}

    public async initMongoose()
    {
        if(!MainConfig.MONGO.AUTH || MainConfig.MONGO.AUTH == "") {
            throw new DBError('Could not connect to MongoDB. Missing Mongo Auth');
        }

        await mongoose.connect(MainConfig.MONGO.AUTH);
        console.log("connected successfully to DB.")
    }

    public static create()
    {
        if(this.DB) return this.DB;
        this.DB = new DB(); 
        return this.DB;
    }
}