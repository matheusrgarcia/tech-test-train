import { Edge } from './edge';

describe('Edge', () => {
  beforeEach(() => {
    spyOn(console, 'log');
  });

  it('should create an instance', () => {
    expect(new Edge(0, 2, 8)).toBeTruthy();
  });

  it('should NOT create an instance of Edge when any of its params are negative', () => {
    new Edge(-1, 0, 0);
    expect(console.log).toHaveBeenCalledWith(
      'Os paramêtros do Edge devem ser positivos'
    );
  });

  it('should validate getters', () => {
    const edge: Edge = new Edge(3, 2, 8);

    expect(edge.getFrom()).toBe(3);
    expect(edge.getTo()).toBe(2);
    expect(edge.getWeight()).toBe(8);
  });
});
