import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FileManagerService } from '@services/file-manager/file-manager.service';
import { GraphService } from '@services/graph-service/graph.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileUploadComponent implements OnInit {

  @ViewChild('graphFile')
  public graphFile!: ElementRef;

  public loading: boolean = false;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private fileManager: FileManagerService,
              private graphService: GraphService){}

  ngOnInit(): void {}

  /**
   *  Loads a file and calls the graph service
   *
   * @param evt The input event
   */
   public async loadFile(evt: any): Promise<void> {
    if (evt.target.files[0]) {
      this.loading = true;
      try {
        const data = await this.fileManager.readUploadedFileAsText(evt.target.files[0]);
        if(data) {
          this.graphService.initializeGraph(data as string);
          const relatory = this.graphService.getGraphRelatory();
          this.graphService.graphRelatory.next(relatory);
        }
      } catch (err) {
        console.log('error', err);
      } finally {
        this.loading = false;
        this.resetInputFile();
        this.changeDetectorRef.markForCheck();
      }
    }
  }

  /**
   *  Resets the input file
   */
   private resetInputFile(): void {
    this.graphFile.nativeElement.value = '';
  }

}
