import { Module } from '@nestjs/common';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://josephinfo27:josephinfo27@clusterpokemon.kerzge3.mongodb.net/?retryWrites=true&w=majority',
    ),
    PokemonModule,
  ],
})
export class AppModule {}
