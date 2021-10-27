export class Edge {
  private from: number;
  private to: number;
  private weight: number;

  constructor(from: number, to: number, weight: number) {
    if (from < 0 || to < 0 || weight < 0) {
      console.log( 'Os paramêtros do Edge devem ser positivos');
    }
    this.from = from;
    this.to = to;
    this.weight = weight;
  }

  public getFrom(): number {
    return this.from;
  }
  public getTo(): number {
    return this.to;
  }
  public getWeight(): number {
    return this.weight;
  }
}
