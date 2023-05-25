import RestaurantMapper from '../mappers/restaurant.mapper';
import { Test, TestingModule } from '@nestjs/testing';

describe('RestaurantMapper', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantMapper],
    }).compile();
  });

  it('toInputDomain -- null', async function () {
    const returnMock = {
      category: '',
    };
    const restaurant = await RestaurantMapper.toInputDomain(null);
    expect(restaurant).toBeDefined();
    expect(restaurant).toEqual(null);
  });

  it('toInputDomain', async function () {
    const returnMock = {
      category: [],
    };
    const restaurant = await RestaurantMapper.toInputDomain(returnMock);
    expect(restaurant).toBeDefined();
    expect(restaurant).toEqual({
      category: '',
    });
  });

  it('toOutputDomain -- null', async function () {
    const returnMock = {
      category: '',
    };
    const restaurant = await RestaurantMapper.toOutputDomain(null);
    expect(restaurant).toBeDefined();
    expect(restaurant).toEqual(null);
  });

  it('toOutputDomain', async function () {
    const returnMock = {
      category: '',
    };
    const restaurant = await RestaurantMapper.toOutputDomain(null);
    expect(restaurant).toBeDefined();
    expect(restaurant).toEqual(null);
  });

  it('toOutputDomainList -- null', async function () {
    const returnMock = {
      category: '',
    };
    const restaurant = RestaurantMapper.toOutputDomainList([]);
    expect(restaurant).toBeDefined();
    expect(restaurant).toEqual([]);
  });

  it('toOutputDomainList', async function () {
    const returnMock = [
      {
        category: '',
      },
    ];
    const restaurant = RestaurantMapper.toOutputDomainList(returnMock);
    expect(restaurant).toBeDefined();
    expect(restaurant).toEqual([
      {
        category: [''],
      },
    ]);
  });
});
