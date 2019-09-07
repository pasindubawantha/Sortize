import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IParameters } from '../interfaces/parameters';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {
  parameterSubject: Subject<IParameters>;
  readySubject: Subject<boolean>;

  constructor() {
    this.parameterSubject = new Subject<IParameters>();
    this.readySubject = new Subject<boolean>();
  }

  sendParameters(params: IParameters) {
    this.parameterSubject.next(params);
    // this.setReadySubject(false)
  }

  getParameterSubject() {
    return this.parameterSubject;
  }

  getReadySubject() {
    return this.readySubject;
  }

  setReadySubject(ready: boolean) {
    this.readySubject.next(ready);
  }
}
