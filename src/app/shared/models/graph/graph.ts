import { Edge } from '@models/edge/edge';
import { Type } from '@models/type/type.enum';

export class Graph {
  private vertices: string[] = [];
  private edges: Edge[][] = [];
  private to: number = 0;
  private stops: number = 0;
  private tripsCount: number = 0;
  private paths: string[] = [];
  private maxDistance: number = 0;
  private routesCount: number = 0;

  constructor(inputGraph: string) {
    this.initializeVertices(inputGraph);
    this.initializeGraph(inputGraph);
  }

  /**
   * Initializes the vertex, must be called before initializig the Graph
   * @param graphAsText An graph formatted like: 'AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7'
   */
  private initializeVertices(graphAsText: string): void {
    const inputAsArray: string[] = graphAsText.split(',');
    for (let node of inputAsArray) {
      node = node.trim();
      const vertex = node[0];
      if (this.vertices.indexOf(vertex) === -1) {
        this.vertices.push(vertex);
      }
    }
    this.vertices.sort();
  }

  /**
   * Initializes the passed graph;
   * @param graphAsText An graph formatted like: 'AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7'
   */
  private initializeGraph(graphAsText: string): void {
    const inputAsArray: string[] = graphAsText.split(',');
    for (let node of inputAsArray) {
      node = node.trim();

      const from = this.getVertexIndex(node[0]);
      const to = this.getVertexIndex(node[1]);
      const weight = Number(node[2]);

      const edge: Edge = new Edge(from, to, weight);
      this.addEdge(edge);
    }
  }

  /**
   *
   * @param vertex A vertex: Example: 'A'
   * @returns The indice of the found Vertex in the vertices array. Returns -1 if vertex was not found
   */
  private getVertexIndex(vertex: string): number {
    const index: number = this.vertices.indexOf(vertex);
    if (index < 0) {
      console.log(`${vertex} was not found in vertices`);
    }
    return index;
  }

  /**
   * Adds and edge into the Graph;
   * @param edge An graph Edge
   */
  private addEdge(edge: Edge): void {
    const indexFrom = edge.getFrom();
    if (!this.edges[indexFrom]) {
      this.edges[indexFrom] = [];
    }
    this.edges[indexFrom].push(edge);
  }

  /**
   *
   * @param route A route like 'AB'
   * @returns The distance of the passed route.
   */
  public getDistanceFromRoute(route: string): number {
    if (!route) {
      console.log('Deve passar uma rota para calculo da distância');
    }

    let distance: number = 0;
    let vertex: string[] = route.trim().split('');
    let from;
    let to;

    for (let index = 0; index < vertex.length - 1; ) {
      let hasPath: boolean = false;
      from = this.getVertexIndex(vertex[index++]);
      to = this.getVertexIndex(vertex[index]);

      const edgeList: Edge[] = this.edges[from];
      for (let edge of edgeList) {
        if (edge.getTo() === to) {
          distance += edge.getWeight();
          hasPath = true;
        }
      }
      if (!hasPath) {
        return -1;
      }
    }
    return distance;
  }

  /**
   *
   * @param type An enumerator to check which evaluation will be used.
   * @param defaultValue The value to be compared with.
   * @param value The other value to be compared.
   * @returns True if the evaluation is true, false otherwise.
   */
  private validateTripCount(type: Type, defaultValue: number, value: number) {
    switch (type) {
      case Type.BiggerOrEqual:
        if (value >= defaultValue) {
          return true;
        }
        return false;
      case Type.SmallerOrEqual:
        if (value <= defaultValue) {
          return true;
        }
        return false;
      case Type.Equal:
        if (value === defaultValue) {
          return true;
        }
        return false;
      case Type.Bigger:
        if (value > defaultValue) {
          return true;
        }
        return false;
      case Type.Smaller:
        if (value < defaultValue) {
          return true;
        }
        return false;
    }
  }

  /**
   * Calculate the trip count from a starting position till a end position
   * @param from Start position of trip
   * @param to Ending position of trip
   * @param maxStops How many stops at maximum will occur
   * @param type The type to be evaluated against the maxStops
   * @returns The trip count
   */
  public getTripsCount(
    from: string,
    to: string,
    maxStops: number,
    type: Type
  ): number {
    this.to = this.getVertexIndex(to);
    this.stops = maxStops;
    this.tripsCount = 0;
    const startIndex: number = this.getVertexIndex(from);
    this.getTripsCountHelper(startIndex, startIndex.toString(), maxStops, type);
    return this.tripsCount;
  }

  /**
   *
   * @param from Start position of path
   * @param path Current path being evaluated
   * @param maxStops How many stops at maximum will occur
   * @param type The type to be evaluated against the maxStops
   */
  private getTripsCountHelper(
    from: number,
    path: string,
    maxStops: number,
    type: Type
  ): void {
    const edgeList: Edge[] = this.edges[from];
    for (let edge of edgeList) {
      const next: string = path + edge.getTo();
      const stopCount = next.length - 1;
      if (
        this.to === edge.getTo() &&
        this.validateTripCount(type, maxStops, stopCount)
      ) {
        this.tripsCount++;
      }
      if (stopCount <= this.stops) {
        this.getTripsCountHelper(edge.getTo(), next, maxStops, type);
      }
    }
  }

  /**
   *
   * @param from Start position of path
   * @param to Ending position of path
   * @returns The shortest distance from the path
   */
  public getShortestPath(from: string, to: string): number {
    this.to = this.getVertexIndex(to);
    const startIndex: number = this.getVertexIndex(from);
    this.getShortestPathHelper(startIndex, startIndex.toString());

    let shortestDistance: number = Number.MAX_SAFE_INTEGER;
    let currentDistance = 0;

    for (let path of this.paths) {
      currentDistance = this.getDistanceFromRoute(path);
      if (shortestDistance > currentDistance) {
        shortestDistance = currentDistance;
      }
    }
    if (shortestDistance === Number.MAX_SAFE_INTEGER) {
      return 0;
    }

    return shortestDistance;
  }

  /**
   * Helper to evaluate each path and next steps.
   * @param from Start position of path
   * @param to Ending position of path
   */
  private getShortestPathHelper(from: number, path: string): void {
    const edgeList: Edge[] = this.edges[from];
    for (let edge of edgeList) {
      if (
        path.length > 1 &&
        path.substring(1).indexOf(edge.getTo().toString()) !== -1
      ) {
        continue;
      }

      const next: string = path + edge.getTo().toString();
      if (this.to === edge.getTo()) {
        this.paths.push(this.getPathName(next));
      }
      this.getShortestPathHelper(edge.getTo(), next);
    }
  }

  /**
   *
   * @param index An index of vertices array
   * @returns Returns the name of the vertex
   */
  private getVertexName(index: number): string {
    if (index < 0 || index >= this.vertices.length) {
      console.log('Indice Incorreto');
    }
    return this.vertices[index];
  }

  /**
   *
   * @param path A path
   * @returns Returns the path name based on the vertices
   */
  private getPathName(path: string): string {
    const arrayOfPath = path.trim().split('');
    let name: string = '';

    for (path of arrayOfPath) {
      name += this.getVertexName(Number(path));
    }
    return name;
  }

  /**
   *
   * @param from Start position of route
   * @param to Ending position of route
   * @param maxDistance Maximum distance to check
   * @returns The number of routes available.
   */
  public getRoutesCount(from: string, to: string, maxDistance: number): number {
    this.to = this.getVertexIndex(to);
    this.maxDistance = maxDistance;
    this.routesCount = 0;
    const startIndex = this.getVertexIndex(from);
    this.getRoutesCountHelper(startIndex, startIndex.toString());

    return this.routesCount;
  }

  /**
   * * Helper to evaluate each route and next steps.
   * @param from Start position of route
   * @param path Ending position of route
   */
  private getRoutesCountHelper(from: number, path: string): void {
    const edgeList: Edge[] = this.edges[from];
    for (let edge of edgeList) {
      const next: string = path + edge.getTo().toString();
      const distance = this.getDistanceFromRoute(this.getPathName(next));
      if (this.to === edge.getTo() && distance < this.maxDistance) {
        this.routesCount++;
      }
      if (distance < this.maxDistance) {
        this.getRoutesCountHelper(edge.getTo(), next);
      }
    }
  }
}
