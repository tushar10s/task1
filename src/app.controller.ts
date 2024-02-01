import { Controller, Get, Post,Body,Header } from '@nestjs/common';
import { AppService } from './app.service';
import {city} from './entity';
import { ApiBasicAuth, ApiResponse, SwaggerModule } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AuthModule } from 'auth/auth.module';
import { AuthGuard} from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';




export class citydto{
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  cityname:string;


}


@Controller()

export class AppController {
  constructor(private readonly appService: AppService) {}
  @ApiResponse({})
  @UseGuards(AuthGuard('basic'))
  @ApiBasicAuth()
  @Post('addcity')
  addCity(@Body() citydata:citydto):void{
     this.appService.addcitydata(citydata.cityname);
  }
 
  
  @Get('fetchweather')
    async fetchcityweather(){
      const citylist:city[]= await this.appService.fetchcities();
      
      const response = []
      for(let i = 0; i<citylist.length; i++){
        let tempObj = await this.appService.getweather(citylist[i].name);
        
        response.push(tempObj)
      }
      return response;
    }

  }


 
