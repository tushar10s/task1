import { Controller, Get, Post,Body,Header } from '@nestjs/common';
import { AppService } from './app.service';
import {city} from './entity';

export class citydto{
  cityid:number;
  cityname:string;

}


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('addcity')
  
  addCity(@Body()citydata:citydto):void{
    
     this.appService.addcitydata(citydata.cityid,citydata.cityname);
  }
 
  
  @Get('fetchweather')
    async fetchcityweather(){
      const citylist:city[]= await this.appService.fetchcities();
      // const weatherData = await citylist.map( async cityn => (await this.appService.getweather(cityn.name)));
      const response = []
      for(let i = 0; i<citylist.length; i++){
        let tempObj = await this.appService.getweather(citylist[i].name);
        console.log(tempObj);
        response.push(tempObj)
      }
      return response;
    }

  }


 
