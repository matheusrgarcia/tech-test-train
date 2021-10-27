import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Graph } from '@models/graph/graph';
import { Type } from '@models/type/type.enum';

@Injectable({
  providedIn: 'root',
})
export class GraphService {
  public graphRelatory: Subject<string[]> = new Subject();
  public originalGraph: Subject<string> = new Subject();

  public graph!: Graph;
  constructor() {}

  /**
   * Calls the Graph model and creates an Graph;
   * @param graphAsText An graph formatted like: 'AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7'
   */
  public initializeGraph(graphAsText: string): void {
    if (graphAsText && graphAsText.length > 0) {
      this.graph = new Graph(graphAsText);
      this.originalGraph.next(graphAsText);
    }
  }

  /**
   *
   * @param route A string of a route like 'ABC'
   * @returns The calculate distance of the route.
   */
  public getDistanceFromRoute(route: string): number | string {
    const calculatedDistance = this.graph.getDistanceFromRoute(route);
    if (calculatedDistance === -1) {
      return 'NAO EXISTE ROTA';
    }
    return calculatedDistance;
  }

  /**
   *
   * @returns An array with the results
   */
  public getGraphRelatory(): string[] {
    let relatory: string[] = [];
    if (this.graph) {
      const routes = ['ABC', 'AD', 'ADC', 'AEBCD', 'AED'];
      for (let index in routes) {
        const distance = this.getDistanceFromRoute(routes[index]).toString();
        relatory.push((Number(index) + 1).toString() + '. ' + distance);
      }
      relatory.push(
        '6. ' +
          this.graph.getTripsCount('C', 'C', 3, Type.SmallerOrEqual).toString()
      );
      relatory.push(
        '7. ' + this.graph.getTripsCount('A', 'C', 4, Type.Equal).toString()
      );
      relatory.push('8. ' + this.graph.getShortestPath('A', 'C').toString());
      relatory.push('9. ' + this.graph.getShortestPath('B', 'B').toString());
      relatory.push('10. ' + this.graph.getRoutesCount('C', 'C', 30).toString());
    }
    return relatory;
  }
}
