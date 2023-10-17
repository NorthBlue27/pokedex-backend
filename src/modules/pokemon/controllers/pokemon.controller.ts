import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PokemonService } from '../services/pokemon.service';
import { CreateDtoPokemon } from '../dto/create-pokemon.dto';
import { UpdateDtoPokemon } from '../dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  @Post()
  // @HttpCode(200)
  // @HttpCode(HttpStatus.OK) // Para cuando sea exitoso, se manda el codigo seleccionado 
  create(@Body() createDtoPokemon: CreateDtoPokemon) {
    return this.pokemonService.create(createDtoPokemon);
  }
  
  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.pokemonService.findAll(paginationDto);
  }
  @Patch(':term')
  update(@Param('term') term: string, @Body() upadteDtoPokemon: UpdateDtoPokemon) {
    return this.pokemonService.update(term, upadteDtoPokemon);
  }

  @Delete(':id')
  removeOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.pokemonService.removeOne(id);
  }

}
