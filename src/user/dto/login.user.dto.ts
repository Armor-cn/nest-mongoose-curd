import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, MaxLength, IsString } from 'class-validator';

export class LoginUserDto {

    @ApiModelProperty({ description: '用户名', type: String, required: true })
    @IsEmail()
    readonly email: string;

    @ApiModelProperty({ description: '密码', type: String, required: true })
    @IsString() 
    @MinLength(8)
    @MaxLength(16)
    readonly password: string;
}
