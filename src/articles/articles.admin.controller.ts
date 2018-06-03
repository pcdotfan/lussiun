import { Controller, Get, Param, Patch } from '@nestjs/common';

@Controller('articles')
export class ArticlesController {
    @Get()
    findAll() {
        return 'This action returns all cats';
    }
    @Patch()
    update() {

    }
    @Get(':id')
    findOne(@Param('id') id) {
        return `This action returns a #${id} cat`;
    }
}