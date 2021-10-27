import { TestBed } from '@angular/core/testing';
import { Graph } from '@models/graph/graph';

import { GraphService } from './graph.service';

describe('GraphService', () => {
  let service: GraphService;

  beforeEach(() => {
    spyOn(console, 'log');
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize an Graph when initializeGraph is invoked', () => {
    service.initializeGraph('AB5, BC4');

    expect(service.graph).toEqual(new Graph('AB5, BC4'));
  });

  it('should get distance from route', () => {
    service.initializeGraph('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');

    const distance = service.getDistanceFromRoute('ABC') as number;

    expect(distance).toBe(9);
  });

  it('should validate relatory', () => {
    service.initializeGraph('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');

    expect(service.getGraphRelatory()).toEqual([
      '1. 9',
      '2. 5',
      '3. 13',
      '4. 22',
      '5. NAO EXISTE ROTA',
      '6. 2',
      '7. 3',
      '8. 9',
      '9. 9',
      '10. 7'
    ]);
  });
});
