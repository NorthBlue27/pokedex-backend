import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';
import { CreateDtoPokemon } from '../dto/create-pokemon.dto';
import { UpdateDtoPokemon } from '../dto/update-pokemon.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  @Post()
  // @HttpCode(200)
  // @HttpCode(HttpStatus.OK)
  create(@Body() createDtoPokemon: CreateDtoPokemon) {
    return this.pokemonService.create(createDtoPokemon);
  }
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term);
  }
  @Get()
  findAll() {
    this.pokemonService.findAll();
  }
  @Patch(':term')
  update(@Param('term') term: string, @Body() upadteDtoPokemon: UpdateDtoPokemon) {
    return this.pokemonService.update(term, upadteDtoPokemon);
  }
  @Delete()
  remove() {
    this.pokemonService.remove();
  }
}
