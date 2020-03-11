import { EggAppInfo } from 'midway'

import { DefaultConfig } from './config.modal'


export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1583639171353_2548';
  config.security = {
    csrf: {
      enable: false,
      // ignoreJSON: true,
    },
    domainWhiteList: [],
  };
  config.sequelize = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'FSG851024125',
    database: 'mall_db',
    dialect: 'mysql',
  }
  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: 'FSG851024125',
      db: 0,
    }
  }
  config.jwtConf = {
    secret: 'TEST_SECRET',
    expiresIn: 3500,
  }
  // add your config here
  config.middleware = []

  config.welcomeMsg = 'Hello midwayjs!'

  return config
}
