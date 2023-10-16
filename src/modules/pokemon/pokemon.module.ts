import { Module } from '@nestjs/common';
import { PokemonController } from './controllers/pokemon.controller';
import { PokemonService } from './services/pokemon.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonMg, PokemonSchema } from './pokemon.entity';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    MongooseModule.forFeature([
      {
        // Nombre de la clase
        name: PokemonMg.name,
        schema: PokemonSchema,
      },
    ]),
  ],
  exports: [MongooseModule]
})
export class PokemonModule {}
