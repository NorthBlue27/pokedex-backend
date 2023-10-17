import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { PokemonMg } from '../pokemon/pokemon.entity';
import { Model } from 'mongoose';
import { CreateDtoPokemon } from '../pokemon/dto/create-pokemon.dto';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(PokemonMg.name)
    private readonly pokemonModel: Model<PokemonMg>,
    private readonly http: AxiosAdapter
  ) {}
  private readonly axios: AxiosInstance = axios;

  async executeSeed(limit: number) {
    await this.pokemonModel.deleteMany();
    // Implementado el adaptador de axios (providers)
    const data = await this.http.get<PokeResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`,
    );

    // Primera forma
    // const insertPromiseArray = [];

    // Segunda forma
    const pokemonToInsert: CreateDtoPokemon[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      // Primera forma
      // insertPromiseArray.push(this.pokemonModel.create({ name, no }));

      // Segunda forma
      pokemonToInsert.push({ name, no });
    });

    // Primera forma
    // await Promise.all(insertPromiseArray);

    // Segunda forma
    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed excecuted';
  }
}
