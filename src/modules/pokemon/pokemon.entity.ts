import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class PokemonMg extends Document {
  @Prop({
    unique: true,
    index: true,
  })
  name: String;
  @Prop({
    unique: true,
    index: true,
  })
  no: number;
}

export const PokemonSchema = SchemaFactory.createForClass(PokemonMg);
