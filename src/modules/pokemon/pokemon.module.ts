import { Module } from '@nestjs/common';
import { PokemonController } from './controllers/pokemon.controller';
import { PokemonService } from './services/pokemon.service';
import { Pokemon } from './pokemon.provider';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService, Pokemon],
})
export class PokemonModule {}
