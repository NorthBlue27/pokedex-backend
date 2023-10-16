import { Module } from '@nestjs/common';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://josephinfo27:josephinfo27@clusterpokemon.kerzge3.mongodb.net/?retryWrites=true&w=majority',
    ),
    PokemonModule,
    CommonModule,
  ],
})
export class AppModule {}
