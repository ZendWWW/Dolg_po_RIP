import { IsString, IsUrl } from 'class-validator';

export class CreateStockDto {
  @IsUrl({}, { message: 'Ссылка на изображение должна быть валидным URL' })
  src: string;

  @IsString({ message: 'Название должно быть строкой' })
  title: string;

  @IsString({ message: 'Текст должен быть строкой' })
  text: string;
}