import { IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  type: string;

  @IsString()
  description: string;

  @IsDateString()
  dueDate: Date;

  @IsNumber()
  leadId: number;
}