import Redis from "ioredis";    

import serverConfig from "./serverConfig";

const redisConfig = {
    port: serverConfig.redisPort,   // number
    host: serverConfig.redisHost    // string
};

const redisConnection = new Redis(redisConfig);

export default redisConnection;