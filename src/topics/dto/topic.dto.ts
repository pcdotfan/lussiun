import { IsString, IsInt, MinLength } from 'class-validator';
export class TopicDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly slug: string;

    readonly description: string;
}