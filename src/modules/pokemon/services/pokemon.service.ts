import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Model, isValidObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { isInt, isString } from 'class-validator';

import { CreateDtoPokemon } from '../dto/create-pokemon.dto';
import { PokemonMg } from '../pokemon.entity';
import { UpdateDtoPokemon } from '../dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  private default_limit: number;

  constructor(
    @InjectModel(PokemonMg.name)
    private readonly pokemonModel: Model<PokemonMg>,
    private readonly configService: ConfigService,
  ) {
    // SI NO LO TIENE, LANZA UN ERROR
    this.default_limit = this.configService.getOrThrow<number>('defaultLimit');
  }

  async create(createDtoPokemon: CreateDtoPokemon) {
    createDtoPokemon.name = createDtoPokemon.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createDtoPokemon);
      return pokemon;
    } catch (error) {
      this.throwError(error);
    }
  }

  async findOne(term: string) {
    let pokemon: PokemonMg;

    // Id
    if (isInt(+term)) pokemon = await this.pokemonModel.findOne({ no: term });
    // MongoId
    else if (isValidObjectId(term))
      pokemon = await this.pokemonModel.findOne({ _id: term });
    // Name
    else if (isString(term))
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });

    if (!pokemon)
      throw new NotFoundException(`Pokemon doesn't exist with term: '${term}'`);

    return pokemon;
  }

  async findAll(paginatioDto: PaginationDto) {
    const { offset = 0, limit = this.default_limit } = paginatioDto;

    let pokemon: PokemonMg[];
    pokemon = await this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .select('-__v');
    return pokemon;
  }

  async update(term: string, updateDtoPokemon: UpdateDtoPokemon) {
    try {
      const pokemon = await this.findOne(term);
      if (updateDtoPokemon.name)
        updateDtoPokemon.name = updateDtoPokemon.name.toLowerCase();
      await pokemon.updateOne(updateDtoPokemon, { new: true });
      return { ...pokemon.toJSON(), ...updateDtoPokemon };
    } catch (error) {
      this.throwError(error);
    }
  }

  async removeOne(id: string) {
    // const pokemon = await this.findOne(id);
    // pokemon.deleteOne();
    // return pokemon;

    // Buscar y eliminar
    // const result = await this.pokemonModel.findByIdAndDelete(id);

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0)
      throw new BadRequestException(`Pokemon with id: ${id} not found`);

    return;
  }

  private throwError(error: any) {
    console.log(error);
    switch (error.code) {
      case 11000:
        throw new BadRequestException(
          `Key duplicated with ${JSON.stringify(error.keyValue)}`,
        );
      default:
        throw new InternalServerErrorException(
          `Can't create pokemon - Check server logs`,
        );
    }
  }
}
