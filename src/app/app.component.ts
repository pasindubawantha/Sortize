import { Component, OnInit} from '@angular/core';
import { ParametersService } from './services/parameters.service';
import { IParameters } from './interfaces/parameters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'sortize';
  arraySize = 10;
  sortAlgo: string;
  readyText = 'Pick an algorthm';
  ready = false;
  readyToRun = true;
  parameters: IParameters;
  speed = 10;

  constructor(private parametersService: ParametersService) {
    this.parameters = {
      arraySize: 10,
      sortAlgo: null,
      sort: false,
      setArraySize: false,
      speed: 10
    };
  }

  ngOnInit() {
    this.parametersService.getReadySubject().subscribe({
      next: (ready: boolean) => {
        this.readyToRun = ready;
      }
    });
    this.generateArray();
  }

  selectAlog(event) {
    this.parameters.sort = false;
    this.sortAlgo = event.target.id;
    this.readyText = this.sortAlgo + ' Sort !';
    this.ready = true;

    this.parameters.sortAlgo = this.sortAlgo;
    this.parametersService.sendParameters(this.parameters);
  }

  generateArray() {
    console.log('generating array sorts');
    this.parameters.arraySize = this.arraySize;
    this.parameters.sortAlgo = this.sortAlgo;
    this.parameters.sort = false;
    this.parameters.setArraySize = true;

    this.parametersService.sendParameters(this.parameters);


  }

  setSpeed() {
    this.parameters.setArraySize = false;
    this.parameters.sort = false;
    this.parameters.speed = this.speed;
  }

  sort() {
    this.parameters.sort = true;

    this.parametersService.sendParameters(this.parameters);
  }
}
