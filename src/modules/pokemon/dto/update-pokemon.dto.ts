/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateDtoPokemon } from './create-pokemon.dto';

export class UpdateDtoPokemon extends PartialType(CreateDtoPokemon) {}
