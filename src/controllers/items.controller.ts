import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CreateItemDto } from '../dto/create.item.dto';
import { ItemsService } from '../services/items.service';
import { ApiOperation, ApiImplicitParam, ApiBearerAuth, ApiUseTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiUseTags('案例描述')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) { }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOperation({ title: '查询所有数据' })
  findAll() {
    return this.itemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ title: '查询单条数据' })
  @ApiImplicitParam({ name: 'id', required: false })
  findOne(@Param('id') id) {
    return this.itemsService.findOne(id);
  }

  @Post()
  @ApiOperation({ title: '创建单条数据' })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Delete(':id')
  @ApiOperation({ title: '删除单条数据' })
  delete(@Param('id') id: string) {
    return this.itemsService.delete(id);
  }

  @Put(':id')
  @ApiOperation({ title: '更新单条数据' })
  update(@Body() updateItemDto: CreateItemDto, @Param('id') id) {
    return this.itemsService.update(id, updateItemDto);
  }
}
