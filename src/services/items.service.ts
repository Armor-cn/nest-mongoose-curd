import { Injectable } from '@nestjs/common';
import { ItemIAttribute } from '../interface/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateItemDto } from '../dto/create.item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<ItemIAttribute.Item>) { }

  async findAll(){
    return await this.itemModel.find();
  }

  async findOne(id: string){
    return await this.itemModel.findById(id).exec();
  }

  async create(item: CreateItemDto){
    return await this.itemModel(item).save();
  }

  async delete(id: string){
    return await this.itemModel.findByIdAndDelete(id);
  }

  async update(id: string, item: ItemIAttribute.Item) {
    return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
  }
}
