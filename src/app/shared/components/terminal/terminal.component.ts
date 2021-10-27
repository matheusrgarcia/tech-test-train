import { Component, OnInit } from '@angular/core';

import { GraphService } from '@services/graph-service/graph.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
})
export class TerminalComponent implements OnInit {

  public originalGraph: string = '';
  public relatory: string[] = [];

  constructor(private graphService: GraphService) {}

  ngOnInit(): void {
    this.graphService.graphRelatory.subscribe((relatory) => {
      this.relatory = relatory;
    });
    this.graphService.originalGraph.subscribe((originalGraph) => {
      this.originalGraph = originalGraph;
    });
  }
}
