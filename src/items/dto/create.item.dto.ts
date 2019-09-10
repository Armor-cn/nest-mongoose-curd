import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateItemDto {
  @ApiModelProperty({ description: '姓名', type: String, required: true })
  @IsString()
  readonly name: string;
  @ApiModelProperty({ description: "描述", type: String, required: true })
  @IsString()
  readonly description: string;
  @ApiModelProperty({ description: "版本描述", type: Number, required: true })
  @IsInt()
  readonly version: number;
}
