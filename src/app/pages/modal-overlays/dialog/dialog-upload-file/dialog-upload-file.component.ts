import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { UploadService } from 'app/@core/service/upload-file.service';
import { env } from 'process';
import { ToastrComponent } from '../../toastr/toastr.component';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'ngx-dialog-upload-file',
  templateUrl: 'dialog-upload-file.component.html',
  styleUrls: ['dialog-upload-file.component.scss'],
})
export class DialogUploadFileComponent {
  type: String;
  public progress: number;
  public message: string;
  statusProcess: string;
  filePath: any;
  alert = new ToastrComponent(this.toastrService);

  @Output() public onUploadFinished = new EventEmitter();

  constructor(protected ref: NbDialogRef<DialogUploadFileComponent>,
    private http: HttpClient,
    private uploadService: UploadService,
    private sanitizer: DomSanitizer,
    private toastrService: NbToastrService,
  ) { }

  cancel() {
    if (this.filePath !== undefined)
      this.uploadService.DeleteFile(this.filePath).subscribe();
    console.log(this.filePath);
    this.ref.close();
  }

  public uploadFile = (files) => {
    this.statusProcess = 'success';
    if (files.length === 0) {
      return;
    }
    const fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.uploadService.UploadExcel(formData, 'Plant')
      .subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload file success.';
            this.filePath = event.body;
            this.onUploadFinished.emit(event.body);
          }
        },
        error => this.alert.showToast('danger', 'Error', 'Upload file error!'),
      );
  }

  submit() {
    this.statusProcess = 'danger';
    if (this.filePath !== undefined)
      this.uploadService.SubmitUpload(this.filePath).
        subscribe(
          () => this.ref.close(this.type),
          error => this.alert.showToast('danger', 'Error', 'Submit error!'),
        );
  }

  downloadTemplate() {
    this.statusProcess = 'info';
    this.uploadService.DownloadFile123('CountryShip_Template.xlsx')
      .subscribe(
        result => this.downLoadFile(result, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      );
  }

  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }
}
