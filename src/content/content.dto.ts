import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateContentDTO {
  @ApiProperty({ description: 'コンテンツのタイトル', example: 'Hello Title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'コンテンツのボディ', example: 'Hello Body' })
  @IsOptional()
  @IsString()
  body?: string;
}

export class UpdateContentDTO {
  @ApiProperty({ description: 'コンテンツのタイトル', example: 'Update Title' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'コンテンツのボディ', example: 'Update Body' })
  @IsOptional()
  @IsString()
  body?: string;
}
