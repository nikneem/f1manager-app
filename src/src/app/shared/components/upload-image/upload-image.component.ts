import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AnonymousCredential, BlobServiceClient, BlockBlobClient, newPipeline, Pipeline } from '@azure/storage-blob';
import { UploadService } from '@services/upload.service';

@Component({
  selector: 'f1-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Input() public entityType: string;
  @Input() public pictureUrl?: string = '/assets/drivers/driver.jpg';
  @Output() fileUploaded = new EventEmitter<string>();

  constructor(private uploadService: UploadService) {
    this.entityType = '';
  }

  currentFile?: File;
  progress: number = 0;
  status?: string;

  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }
  prepareFilesList(files: Array<File>) {
    if (files.length === 0 || files.length > 1) {
      alert('error');
    }
    if (files.length === 1) {
      this.currentFile = files[0];
      this.upload();
    }
  }
  

  onFileChange(event: any) {
    this.currentFile = event.target.files[0];
    this.upload();
  }

  upload() {
    this.uploadService.aquireSasToken(this.entityType).subscribe(sas => {
      if (this.currentFile && sas.sasToken && sas.constainerName) {
        var sasUrl = `https://${sas.storageAccountUrl}/${sas.constainerName}/${sas.blobName}${sas.sasToken}`;
        const blobServiceClientx = new BlockBlobClient(sasUrl, new AnonymousCredential());

        blobServiceClientx.uploadData(this.currentFile, {
          onProgress: (up) => {
            if (this.currentFile) {
              this.progress = (up.loadedBytes / this.currentFile?.size) * 100;
            }
            if (this.progress === 100) {
              this.fileUploaded.emit(`https://${sas.storageAccountUrl}/images/${sas.blobName}.jpg`);
              setTimeout(() => { this.progress = 0 }, 2500);
            }
          },
        });
      }
    });
  }


  ngOnInit(): void {
  }

}
