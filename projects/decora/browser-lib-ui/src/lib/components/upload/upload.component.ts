import { Component, EventEmitter, Input, Output, ViewChild, ElementRef, forwardRef } from '@angular/core';
import { DecApiService } from './../../services/api/decora-api.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { UploadProgress } from './upload.models';

const UPLOAD_ENDPOINT = '/upload';

//  Return an empty function to be used as default trigger functions
const noop = () => {
};

export const DEC_UPLOAD_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DecUploadComponent),
  multi: true
};

@Component({
  selector: 'dec-upload',
  templateUrl: 'upload.component.html',
  styleUrls: ['upload.component.scss'],
  providers: [DEC_UPLOAD_CONTROL_VALUE_ACCESSOR]
})
export class DecUploadComponent implements ControlValueAccessor {

  progresses: UploadProgress[] = [];

  @Input() disabled: boolean;

  @Input() endpoint = UPLOAD_ENDPOINT;

  @Input() multiple: boolean;

  @Output() error = new EventEmitter();

  @Output() uploaded = new EventEmitter();

  @Output() progress = new EventEmitter();

  @ViewChild('inputFile') inputFile: ElementRef;


  /*
  ** ngModel propertie
  ** Used to two way data bind using [(ngModel)]
  */
  //  The internal data model
  private innerValue: any[];
  //  Placeholders for the callbacks which are later provided by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  //  Placeholders for the callbacks which are later provided by the Control Value Accessor
  private onChangeCallback: (_: any) => void = noop;

  constructor(private service: DecApiService) {}

  /*
  ** ngModel VALUE
  */
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }
  get value(): any {
    return this.innerValue;
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  onValueChanged(event: any) {
    this.value = event.toString();
  }

  writeValue(v: any[]) {
    this.value = v;
  }


  filesChanged(event) {
    for (let x = 0; x < event.target.files.length; x++) {
      this.uploadFile(event.target.files[x], x);
    }
  }

  openFileSelection() {
    this.inputFile.nativeElement.click();
  }

  getProgressbarMode(progress) {

    let mode;

    switch (progress.value) {
      case 0:
        mode = 'buffer';
        break;
      case 100:
        mode = 'indeterminate';
        break;
      default:
        mode = 'determinate';
        break;
    }

    return mode;

  }

  getProgressValueBasedOnMode(progress) {
    const mode = this.getProgressbarMode(progress);
    const value = mode === 'buffer' ? 0 : progress.value;
    return value;
  }

  private uploadFile(file, index) {
    if (file) {
      const progress: UploadProgress = {
        fileIndex: index,
        fileName: file.name,
        value: 0,
      };
      this.progresses.push(progress);
      this.service.upload(this.endpoint, [file])
      .pipe(
        catchError(error => {
        console.log('catchError', error);
          progress.error = error.message;
          this.error.emit('message.error.unexpected');
          this.detectUploadEnd();
          return throwError(error.message);
        })
      )
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((100 * event.loaded) / event.total);
          progress.value = percentDone === 100 ? percentDone : parseFloat(percentDone.toFixed(2));
        } else if (event instanceof HttpResponse) {
          progress.value = 100;
          progress.file = event.body;
          this.detectUploadEnd();
        }
        this.progress.emit(this.progresses);
      });
    }
  }

  private detectUploadEnd() {

    const stillUploading = this.progresses.filter((progress) => {
      return progress.value < 100;
    });

    if (!stillUploading.length) {
      this.emitUploadedFiles();
      this.clearInputFile();
      this.clearProgresses();
    }
  }

  private clearInputFile() {
    this.inputFile.nativeElement.value = '';
  }

  private clearProgresses() {
    this.progresses = [];
  }

  private emitUploadedFiles() {
    const files = this.progresses.map((uploadProgress: UploadProgress) => {
      return uploadProgress.file;
    });
    this.value = [...files];
    this.uploaded.emit(this.value);
  }

}
