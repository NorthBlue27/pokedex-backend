export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGO_DB,
  port: +process.env.PORT,
  defaultLimit: +process.env.DEFAULT_LIMIT,
  pokemondb: process.env.NAME_DB,
});
