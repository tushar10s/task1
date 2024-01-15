import { Injectable } from '@nestjs/common';
import {citydto} from './app.controller';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {city} from './entity';
import axios from 'axios';

@Injectable()
export class AppService {
  
  constructor(
    
    @InjectRepository(city)
    private readonly cityRepository: Repository<city>,
  ) {}
  
   addcitydata(numbercityid:number,nameofcity:string){
    const newcity = new city();
    newcity.id=numbercityid;
    newcity.name = nameofcity;
    
    return this.cityRepository.save(newcity);
    
    
    

   }
    async fetchcities(){
      var citylist:city[]=[];
     citylist=  await this.cityRepository.find();
     return citylist;
     
     
     
     

   }
   async getweather(nameofcity:string)
   {
    const APIkey='f8c0c1010509f9908aafe34eacfd8843';
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${nameofcity}&appid=${APIkey}&units=metric`;
   const temp =  await  axios.get(url)
  .then(response => {
    
    const temperature = response.data.main.temp;
    
    return temperature;
  })
  return {city: nameofcity, temperature: temp};
   }

}
