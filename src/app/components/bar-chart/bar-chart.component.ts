import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation, ElementRef, Input, OnChanges, ViewChild, } from '@angular/core';
import { ParametersService } from '../../services/parameters.service';
import { IParameters } from '../../interfaces/parameters';
import * as d3 from 'd3';
import { bubbleSort } from '../../algorthms/bubble-sort';
import { selectionSort } from '../../algorthms/selection-sort';
import { insertionSort } from '../../algorthms/insertion-sort';

@Component({
  selector: 'app-bar-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  @ViewChild('chart', {static: true}) chartContainer: ElementRef;
  heightPadding = 20;
  parameters: IParameters;
  legend: any;
  legendKeys: any;
  colors = {
    color1: 'blue',
    color2: 'green',
    color3: 'yellow',
    color4: 'red'
  };
  dataset = {
    key: null,
    values: null,
    color: null
  };

  constructor(private parametersService: ParametersService, private ref: ChangeDetectorRef) {
    this.parameters = {
      arraySize: 10,
      sortAlgo: null,
      sort: false,
      setArraySize: false,
      speed: 20
    };
  }


  ngOnInit() {
    this.parametersService.getParameterSubject().subscribe({
      next: (parameters: IParameters) => {
        this.parameters = parameters;
        if (parameters.sort) {
          this.sortArray();
        }
        if (parameters.sortAlgo !== undefined) {
          this.generateArray();
          this.setLegend();
        }
        if (parameters.setArraySize) {
          this.generateArray();
        }
      }
    });
    this.generateArray();
  }

  onResize(event) {
    console.log('resizeg');
    this.renderChart();
  }

  setLegend() {
    switch (this.parameters.sortAlgo) {
      case 'Insertion':
        this.legend = {
          default: 'blue',
          comparing: 'green',
          swaping: 'red',
          sorted: 'purple'
        };
        break;

      case 'Selection':
        this.legend = {
          default: 'blue',
          currenIndex: 'yellow',
          minimum: 'black',
          comparing: 'green',
          swaping: 'red',
          sorted: 'purple'
        };
        break;

      case 'Bubble':
        this.legend = {
          default: 'blue',
          currenIndex: 'yellow',
          comparing: 'green',
          swaping: 'red',
          sorted: 'purple'
        };
        break;
    }

    this.legendKeys = Object.keys(this.legend);
  }

  sortArray() {
    for (let i = 0; i < this.dataset.color.length; i++) {
      this.dataset.color[i] = this.colors.color1;
    }

    this.parametersService.setReadySubject(false);

    switch(this.parameters.sortAlgo) {
      case 'Insertion':
        insertionSort(this.dataset, this.legend, this.parameters.speed, (dataset) => {
          this.dataset = dataset;
          this.renderChart();
        }, () => {
          this.parametersService.setReadySubject(true);
        });
        break;

      case 'Selection':
        selectionSort(this.dataset, this.legend, this.parameters.speed, (dataset) => {
          this.dataset = dataset;
          this.renderChart();
        }, () => {
          this.parametersService.setReadySubject(true);
        });
        break;

      case 'Bubble':
        bubbleSort(this.dataset, this.legend, this.parameters.speed, (dataset) => {
          this.dataset = dataset;
          this.renderChart();
        }, () => {
          this.parametersService.setReadySubject(true);
        });
        break;
    }
  }

  generateArray() {
    const key = new Array(this.parameters.arraySize);
    const values = Array.from({length: this.parameters.arraySize}, () => (1 + Math.floor(Math.random() * this.parameters.arraySize / 2)));
    const color = new Array(this.parameters.arraySize);

    for (let i = 0; i < key.length; i++) {
      key[i] = i;
      color[i] = this.colors.color1;
    }

    this.dataset.key = key;
    this.dataset.values = values;
    this.dataset.color = color;
    this.renderChart();
  }

  renderChart() {
    console.log('rendering');

    const chartWidth = this.chartContainer.nativeElement.offsetWidth;
    const chartHeight = this.chartContainer.nativeElement.offsetHeight - this.heightPadding;

    const dataset = this.dataset;

    const yScale = d3
    .scaleLinear()
    .rangeRound([0, chartHeight])
    .domain([0, Number(d3.max(dataset.values))]);

    const xScale = (index) => {
      return (chartWidth / dataset.values.length) * index;
    };

    // Remove old chart
    d3.select('svg').remove();

    // Creating new chart
    const element = this.chartContainer.nativeElement;
    const svg = d3.select(element).append('svg')
    .attr('width', chartWidth)
    .attr('height', chartHeight);

    // Create bars
    svg.selectAll('rect')
    .data(dataset.values, (d: number) => d.toString())
    .enter()
    .append('rect')
    .attr('x', (d, i) => xScale(i) )
    .attr('y', (d) => 0 )
    .attr('width', xScale(1))
    .attr('height', (d) => yScale(d) )
    .attr('fill', (d, i) => dataset.color[i] );

    // Create labels
    svg.selectAll('text')
    .data(dataset.values, (d: number) => d.toString())
    .enter()
    .append('text')
    .text((d: number) => d.toString() )
    .attr('text-anchor', 'middle')
    .attr('x', (d, i) => (xScale(i) + (xScale(1) / 2)) )
    .attr('y', (d) => (yScale(d) - 14) )
    .attr('font-family', 'sans-serif')
    .attr('font-size', '11px')
    .attr('fill', 'white');
  }

}
