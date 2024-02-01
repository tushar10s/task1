import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import {citydto} from './app.controller';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {city} from './entity';
import axios from 'axios';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
 

class responsedto{
  @ApiProperty()
  city:string;
  @ApiProperty()
  temperature:number;
}

@Injectable()
export class AppService {
  
  constructor(
    
    @InjectRepository(city)
    private readonly cityRepository: Repository<city>,
  ) {}
  
   addcitydata(nameofcity:string){
    const newcity = new city();
    newcity.name = nameofcity;
    this.cityRepository.save(newcity);
    
      
    }
    
    

   
    async fetchcities(){
      var citylist:city[]=[];
     citylist=  await this.cityRepository.find();
     return citylist;

   }

   @ApiResponse({})
   async getweather(nameofcity:string)
   {
    
    let respo = new responsedto();
    
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${nameofcity}&appid=${process.env.APP_ID}&units=metric`;
   const temp =  await  axios.get(url)
  .then(response => {
    
    const temperature = response.data.main.temp;
    
    return temperature;
  })
  respo.city=nameofcity;
  respo.temperature=temp;
  return  respo;
   }

}
