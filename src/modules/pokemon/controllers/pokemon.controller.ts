import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';
import { CreateDtoPokemon } from '../dto/create-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  @Post()
  create(@Body() createDtoPokemon: CreateDtoPokemon) {
    return this.pokemonService.create(createDtoPokemon);
  }
  @Get()
  findAll() {
    this.pokemonService.findAll();
  }
  @Get()
  findOne() {
    this.pokemonService.findOne();
  }
  @Patch()
  update() {
    this.pokemonService.update();
  }
  @Delete()
  remove() {
    this.pokemonService.remove();
  }
}
