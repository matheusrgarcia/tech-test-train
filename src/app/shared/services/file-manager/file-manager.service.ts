import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  constructor() {}
  /**
   * Reads a Blob file, and returns its values as an readable text.
   * @param inputFile
   * @returns The file as text
   */
  public readUploadedFileAsText = (inputFile: Blob) => {
    const fileReader = new FileReader();

    return new Promise((resolve, reject) => {
      fileReader.onerror = () => {
        fileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.readAsBinaryString(inputFile);
    });
  };
}
