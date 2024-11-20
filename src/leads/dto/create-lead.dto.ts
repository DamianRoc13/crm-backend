import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsEnum(['NEW', 'CONTACTED', 'QUALIFIED', 'LOST', 'CONVERTED'])
  status?: string;
}