import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {city} from './entity';
import { Repository } from 'typeorm'; // Import Repository from TypeORM
import { getRepositoryToken } from '@nestjs/typeorm';


describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        controllers: [AppController],
        providers: [
          AppService,
          {
            provide: getRepositoryToken(city), // Provide token for City entity
            useClass: Repository, // Use Repository class as a mock
          },
        ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('fetchcityweather', () => {
    it('should return weather data for each city', async () => {
      const cities:city[] = [{ id:1,name: 'City1' }, { id:2,name: 'City2' }];
      const weatherData = [{ city: 'City1', temperature: 20 }, { city: 'City2', temperature: 25 }];

      jest.spyOn(appService, 'fetchcities').mockResolvedValue(cities);
      jest.spyOn(appService, 'getweather').mockImplementation(async (name: string) => {
         const data =  weatherData.find(cityData => cityData.city === name);
        return {city:name,temperature:data.temperature}
      });

      const result = await appController.fetchcityweather();

      expect(result).toEqual(weatherData);
      expect(appService.fetchcities).toHaveBeenCalled();
      expect(appService.getweather).toHaveBeenCalledTimes(cities.length);
      cities.forEach(city => {
        expect(appService.getweather).toHaveBeenCalledWith(city.name);
      });
    });
  });
});
