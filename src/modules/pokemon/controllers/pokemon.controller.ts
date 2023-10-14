import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  @Post()
  create() {
    this.pokemonService.create();
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
