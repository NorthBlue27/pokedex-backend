import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateDtoPokemon } from '../dto/create-pokemon.dto';
import { PokemonMg } from '../pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(PokemonMg.name)
    private readonly pokemonModel: Model<PokemonMg>,
  ) {}
  async create(createDtoPokemon: CreateDtoPokemon) {
    createDtoPokemon.name = createDtoPokemon.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createDtoPokemon);
      return pokemon;
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException(
          `Key duplicated ${JSON.stringify(error.keyValue)}`,
        );
      else console.log(error);
      throw new InternalServerErrorException(
        `Can't created pokemon - Check server logs`,
      );
    }
  }
  findOne() {
    return '';
  }
  findAll() {
    return '';
  }
  update() {
    return '';
  }
  remove() {
    return '';
  }
}
