import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GraphService } from '@services/graph-service/graph.service';
import { of, Subject } from 'rxjs';

import { TerminalComponent } from './terminal.component';

describe('TerminalComponent', () => {
  let component: TerminalComponent;
  let fixture: ComponentFixture<TerminalComponent>;
  let graphServiceStub: any;

  beforeEach(waitForAsync(() => {
    graphServiceStub = jasmine.createSpyObj('GraphService', [
      'graphRelatory',
      'originalGraph',
    ]);
    graphServiceStub.originalGraph = new Subject();
    graphServiceStub.graphRelatory = new Subject();

    TestBed.configureTestingModule({
      declarations: [TerminalComponent],
      providers: [
        {
          provide: GraphService,
          useValue: graphServiceStub,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle subjects', () => {
    graphServiceStub.originalGraph.next('ABC');
    graphServiceStub.graphRelatory.next(['1. Result']);

    expect(component.originalGraph).toBe('ABC');
    expect(component.relatory).toEqual(['1. Result']);
  });
});
