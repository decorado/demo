import { DecImagewebWorkerBackEnd } from './image-web-worker-back-end';
import { Observable, BehaviorSubject } from 'rxjs';
import { skipWhile, distinctUntilChanged } from 'rxjs/operators';
import { ErrorImage } from './image.directive.constants';
import { DecUID } from './../../utilities/uid';

const blob = new Blob([DecImagewebWorkerBackEnd], { type: 'application/javascript' });

interface ProcessMap { [key: string]: BehaviorSubject<string>; }

interface ProcessesMap { [key: string]: ProcessMap; }

interface DecImageEnsureImageStream {
  id: string;
  type: 'testUrl' | 'detectUrl';
  data: any;
  error?: false;
}

export class DecImageWebWorker {

  worker: Worker = new Worker(URL.createObjectURL(blob));

  private process: ProcessesMap = {};

  constructor() {

    this.watchWorker();

  }

  detectImageUrlFromImageType(image, thumborize, size, containerWidth, fitIn, trim): Observable<string> {

    const id = DecUID();

    return this.getProcessByTypeAndId('detectUrl', id, { image, thumborize, size, containerWidth, fitIn, trim });

  }

  ensureImage(url): Observable<string> {

    return this.getProcessByTypeAndId('testUrl', url, url);

  }

  private getProcessByTypeAndId(type, id, data): BehaviorSubject<string> {

    const typeList = this.process[type];

    let process;

    if (typeList && typeList[id]) {

      process = typeList[id];

    } else {

      process = this.addProcess(type, id, data);

    }

    return process.pipe(
      skipWhile(v => v === undefined),
      distinctUntilChanged(),
    );
  }

  private addProcess(type, id, data) {

    const process = this.createProcessObservable(type, id);

    const imageStream: DecImageEnsureImageStream = { id, data, type };

    this.worker.postMessage(imageStream);

    return process;

  }

  private createProcessObservable(type, url) {

    this.process[type] = this.process[type] || {};

    this.process[type][url] = new BehaviorSubject(undefined);

    return this.process[type][url];

  }

  private watchWorker() {

    this.worker.onmessage = (e) => {

      const event: DecImageEnsureImageStream = e.data;

      const process = this.getProcessByTypeAndId(event.type, event.id, event.data);

      const data = event.error ? ErrorImage : event.data;

      process.next(data);

    };

  }

}
