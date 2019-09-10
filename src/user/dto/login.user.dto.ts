import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, MinLength, IsNotEmpty, MaxLength } from 'class-validator';

export class LoginUserDto {

    @ApiModelProperty({ description: '用户名', type: String, required: true })
    @IsEmail()
    readonly email: string;

    @ApiModelProperty({ description: '密码', type: String, required: true })
    @IsNotEmpty() 
    @MinLength(8,{ message: '密码不能小于8'})
    @MaxLength(16,{ message: '密码不能大于16位'})
    readonly password: string;
}
