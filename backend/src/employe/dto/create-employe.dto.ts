import { IsString, IsNumber, Min, MaxLength } from 'class-validator';

export class CreateEmployeDto {
  @IsString()
  @MaxLength(100)
  nom: string;

  @IsNumber()
  @Min(0)
  salaire: number;
}