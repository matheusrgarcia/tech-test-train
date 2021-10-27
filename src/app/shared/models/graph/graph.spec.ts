import { Type } from '@models/type/type.enum';
import { Graph } from './graph';

describe('Graph', () => {

  beforeEach(() => {
    spyOn(console, 'log');
  });

  it('should create an instance', () => {
    expect(new Graph('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7')).toBeTruthy();
  });

  it('should get the index of a vertex when getVertexIndex is invoked', () => {
    const graph: Graph = new Graph('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');
    const result = (graph as any).getVertexIndex('Z');

    expect(result).toBe(-1);
    expect(console.log).toHaveBeenCalledWith('Z was not found in vertices');
  });

  it('should get the distance from route', () => {
    const graph: Graph = new Graph('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');
    const distance = graph.getDistanceFromRoute('AB');

    expect(distance).toBe(5);
  });

  it('should get the distance from route', () => {
    const graph: Graph = new Graph('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');
    const distance = graph.getDistanceFromRoute('');

    expect(distance).toBe(0);
    expect(console.log).toHaveBeenCalledWith('Deve passar uma rota para calculo da distância');
  });

  describe('should validate trip count when getTripsCount is invoked', () => {
    it('should validate trip count when type is SmallerOrEqual', () => {
      const graph: Graph = new Graph('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');
      const tripCount: number = graph.getTripsCount('C', 'C', 3, Type.SmallerOrEqual);

      expect(tripCount).toBe(2);
    });
    it('should validate trip count when type is BiggerOrEqual', () => {
      const graph: Graph = new Graph('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');
      const tripCount: number = graph.getTripsCount('C', 'C', 3, Type.BiggerOrEqual);

      expect(tripCount).toBe(3);
    });
    it('should validate trip count when type is Bigger', () => {
      const graph: Graph = new Graph('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');
      const tripCount: number = graph.getTripsCount('A', 'E', 3, Type.Bigger);

      expect(tripCount).toBe(3);
    });
    it('should validate trip count when type is Smaller', () => {
      const graph: Graph = new Graph('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');
      const tripCount: number = graph.getTripsCount('A', 'E', 3, Type.Smaller);

      expect(tripCount).toBe(2);
    });
  });

  it('should get shortest path when getShortestPath is invoked', () => {
    const graph: Graph = new Graph('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');

    const shortestPath: number = graph.getShortestPath('A', 'C');

    expect(shortestPath).toBe(9);
  });

  it('should return 0 when getShortestPath is invoked without possible path', () => {
    const graph: Graph = new Graph('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');

    const shortestPath: number = graph.getShortestPath('A', 'F');

    expect(shortestPath).toBe(0);
  });

  it('should print error when index is incorrect in getVertexName invoke', () => {
    const graph: Graph = new Graph('AB5, BC4');

    (graph as any).getVertexName(-1);

    expect(console.log).toHaveBeenCalledWith('Indice Incorreto');
  });

  it('should get the number of routes when getRoutesCount is invoked', () => {
    const graph: Graph = new Graph('AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7');

    const routesCount: number = graph.getRoutesCount('C', 'C', 30);

    expect(routesCount).toBe(7);
  });
});
