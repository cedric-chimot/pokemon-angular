import { Component, Input, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartTypeRegistry, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';  // Import du plugin
import { ColorsService } from '../../../services/colors/colors.service';

Chart.register(...registerables, ChartDataLabels);  // Enregistrement du plugin

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {
  @Input() chartData: any[] = [];
  @Input() chartLabels: string[] = [];
  @Input() chartType: keyof ChartTypeRegistry = 'pie';
  @Input() chartTitle: string = '';
  @Input() chartColors: string[] = [];
  @ViewChild('chartCanvas', { static: false }) chartCanvas: ElementRef | undefined;

  private chart: any;

  constructor(private colorsService: ColorsService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.chartData.length && this.chartLabels.length) {
        this.createChart();
      } else {
        console.error('Données ou labels manquants pour créer le graphique');
      }
    }, 500);  // Délai de 500ms
  }

  private createChart(): void {
    const colors = this.chartColors;

    this.chart = new Chart(this.chartCanvas?.nativeElement, {
      type: this.chartType,
      data: {
        labels: this.chartLabels,
        datasets: [{
          data: this.chartData,
          backgroundColor: colors,
        }]
      },
      options: {
        responsive: true,
        layout: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const label = tooltipItem.label || '';
                return `${label}: ${tooltipItem.raw}`;
              }
            }
          },
          datalabels: {
            font: {
              weight: 'bold',
              size: 12,
            },
            anchor: 'end',  
            align: 'start',  
            clip: false,  
            color: '#191973',
            offset: -25,  // Décalage plus grand pour éviter le chevauchement
            rotation: -75,  // Faire pivoter les labels pour un meilleur placement
            padding: 50,
            formatter: (value, context) => {
              return context.chart.data.labels?.[context.dataIndex];
            },
          },          
          title: {
            display: true,
            text: this.chartTitle,
            font: {
              size: 22,
              weight: 'bold',
            },
            padding: {
              top: 20,
              bottom: 20,
            },
            align: 'center',
          }
        },
      }
    });
  }
}
