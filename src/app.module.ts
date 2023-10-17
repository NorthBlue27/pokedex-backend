import { Module } from '@nestjs/common';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './modules/seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './common/config/app.config';
import { JoiValidationSchema } from './common/config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema: JoiValidationSchema,
    }),
    MongooseModule.forRoot(process.env.MONGO_DB, {
      dbName: process.env.NAME_DB,
    }),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
})
export class AppModule {}
