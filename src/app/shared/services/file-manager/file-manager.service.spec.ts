import { TestBed } from '@angular/core/testing';

import { FileManagerService } from './file-manager.service';

describe('FileManagerService', () => {
  let service: FileManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return text of txt file when readUploadedFileAsText is invoked', async () => {
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

    const result = await service.readUploadedFileAsText(blob);

    expect(result).toEqual(
      '{"lastModified":1614377250790,"lastModifiedDate":"Fri Feb 26 2021 19:07:30 GMT-0300 (HorÃ¡rio PadrÃ£o de BrasÃ­lia)","name":"mockedfile.txt","size":1080,"type":"txt","webkitRelativePath":""}'
    );
  });
});
