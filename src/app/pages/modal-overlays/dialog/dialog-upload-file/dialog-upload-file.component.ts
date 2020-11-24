import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { UploadService } from 'app/@core/service/upload-file.service';
import { env } from 'process';
@Component({
  selector: 'ngx-dialog-upload-file',
  templateUrl: 'dialog-upload-file.component.html',
  styleUrls: ['dialog-upload-file.component.scss'],
})
export class DialogUploadFileComponent {
  type: String;
  public progress: number;
  public message: string;
  filePath: any;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(protected ref: NbDialogRef<DialogUploadFileComponent>,
    private http: HttpClient,
    private uploadService: UploadService,
  ) { }

  cancel() {
    if (this.filePath !== undefined)
      this.uploadService.DeleteFile(this.filePath).subscribe();
    console.log(this.filePath);
    this.ref.close();
  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    const fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.uploadService.UploadExcel(formData, 'Plant')
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload file success.';
          this.filePath = event.body;
          this.onUploadFinished.emit(event.body);
        }
      });
  }

  submit() {
    if (this.filePath !== undefined)
      this.uploadService.SubmitUpload(this.filePath).
        subscribe(() => this.ref.close(this.type));
  }

  downloadTemplate() {
    alert(1);
  }
}
