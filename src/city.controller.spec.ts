import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { city } from './entity'; // Assuming you have a City entity defined
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('CityController', () => {
    let controller: AppController;
    let service: AppService;
    let repository: Repository<city>;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        controllers: [AppController],
        providers: [
            AppService,
          {
            provide: getRepositoryToken(city),
            useClass: Repository, 
          },
        ],
      }).compile();
  
      controller = module.get<AppController>(AppController);
      service = module.get<AppService>(AppService);
      repository = module.get<Repository<city>>(getRepositoryToken(city));
      repository.save = jest.fn().mockImplementation(async (entity) => entity);
      repository.findOne = jest.fn().mockImplementation(async (query) => {
        if (query.where.name === 'TestCity') {
          const testCity = new city(); 
          testCity.name = 'TestCity';
          return testCity;
        }
        return null;
      });
    
    
    });
  
    describe('addCity', () => {
      it('should add city data to the database', async () => {
        const cityData = { cityname: 'TestCity' };
  
        jest.spyOn(service, 'addcitydata').mockImplementation(async (nameofcity: string) => {
          const newCity = new city();
          newCity.name = nameofcity;
          return await repository.save(newCity);
        });
  
        await controller.addCity(cityData);
  
        const savedCity = await repository.findOne({ where: { name: 'TestCity' } });
        expect(savedCity).toBeDefined();
        expect(savedCity.name).toBe('TestCity');
      });
    });
  });
  