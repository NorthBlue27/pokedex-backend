import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateDtoPokemon } from '../dto/create-pokemon.dto';
import { PokemonMg } from '../pokemon.entity';
import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateDtoPokemon } from '../dto/update-pokemon.dto';
import { isInt, isString } from 'class-validator';

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
      console.log(error);
      throw new InternalServerErrorException(
        `Can't created pokemon - Check server logs`,
      );
    }
  }
  async findOne(term: string) {
    let pokemon: PokemonMg;

    // Id
    if (isInt(term)) pokemon = await this.pokemonModel.findOne({ no: term });
    // MongoId
    else if (isValidObjectId(term))
    pokemon = await this.pokemonModel.findOne({ _id: term });
    // Name
    else if (isString(term))
    pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });

    if (!pokemon)
      throw new NotFoundException(`Pokemon doesn't exist with ${term}`);

    return pokemon;
  }
  findAll() {
    return '';
  }
  async update(term: string, updateDtoPokemon: UpdateDtoPokemon) {
    const pokemon = await this.findOne(term);
    if (updateDtoPokemon.name)
      updateDtoPokemon.name = updateDtoPokemon.name.toLowerCase();
    await pokemon.updateOne(updateDtoPokemon, { new: true });
    return { ...pokemon.toJSON(), ...updateDtoPokemon };
  }
  remove() {
    return '';
  }
}
