import { IsInt, IsLowercase, IsNotEmpty, IsPositive, IsString, Min } from "class-validator";

export class CreateDtoPokemon {
  @IsString()
  @IsNotEmpty() 
  name: String;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  @Min(1)
  no: number
}
