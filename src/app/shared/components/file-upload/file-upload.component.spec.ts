import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FileManagerService } from '@services/file-manager/file-manager.service';

import { FileUploadComponent } from './file-upload.component';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;
  let fileManagerServiceStub: any;
  let graphServiceStub: any;
  const blob = new Blob(
    [
      JSON.stringify({
        lastModified: 1614377250790,
        lastModifiedDate:
          'Fri Feb 26 2021 19:07:30 GMT-0300 (Horário Padrão de Brasília)',
        name: 'mockedfile.txt',
        size: 1080,
        type: 'txt',
        webkitRelativePath: '',
      }).repeat(1),
    ],
    {}
  );

  beforeEach(
    waitForAsync(() => {
      fileManagerServiceStub = jasmine.createSpyObj('FileManagerService', [
        'readUploadedFileAsText',
      ]);
      graphServiceStub = jasmine.createSpyObj('GraphService', [
        'initializeGraph',
      ]);

      fileManagerServiceStub.readUploadedFileAsText.and.returnValue(true);
      TestBed.configureTestingModule({
        declarations: [FileUploadComponent],
        providers: [
          {
            provide: FileManagerService,
            useValue: fileManagerServiceStub,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load a txt file when loadFile is invoked', async () => {
    const mockedEvent = {
      target: {
        files: [blob],
      },
    };

    await component.loadFile(mockedEvent);

    expect(
      fileManagerServiceStub.readUploadedFileAsText
    ).toHaveBeenCalledOnceWith(blob);
  });

  it('should NOT load a txt file when loadFile is invoked without a file', async () => {
    const mockedEvent = {
      target: {
        files: [],
      },
    };

    await component.loadFile(mockedEvent);

    expect(
      fileManagerServiceStub.readUploadedFileAsText
    ).not.toHaveBeenCalled();
  });

  it('should NOT initialize graph when fileManager fails to read file', async () => {
    fileManagerServiceStub.readUploadedFileAsText.and.returnValue(false);
    const mockedEvent = {
      target: {
        files: [blob],
      },
    };

    await component.loadFile(mockedEvent);

    expect(graphServiceStub.initializeGraph).not.toHaveBeenCalled();
  });
});
