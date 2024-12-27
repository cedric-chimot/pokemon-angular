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
  
    // Vérifier si le type de graphique est 'bar' (pour le graphique des types)
    const legendDisplay = this.chartType !== 'bar';  // Ne pas afficher la légende si le graphique est de type 'bar'
  
    // Options du graphique
    const options = {
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
          display: legendDisplay,  // Afficher ou non la légende en fonction du type de graphique
          position: 'right' as 'top' | 'left' | 'bottom' | 'right',
          labels: {
            boxWidth: 20,
            padding: 10,
            font: {
              size: 14,
              weight: 'bold',
            }
          }
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem: { label: string; raw: any; }) => {
              const label = tooltipItem.label || '';
              return `${label}: ${tooltipItem.raw}`;
            }
          }
        },
        datalabels: {
          font: {
            weight: 'bold',
            size: 14,
          },
          anchor: 'end',  // Positionner à l'extérieur
          align: 'start', // Aligner à gauche de chaque segment
          clip: false,
          color: '#ffffff',
          offset: -45,  // Décalage pour éviter chevauchement
          rotation: -90, // Rotation pour éviter chevauchement
          padding: 50,
          formatter: (value: any, context: any) => {
            // Afficher les valeurs réelles
            return value;
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
    };
  
    // Création du graphique
    this.chart = new Chart(this.chartCanvas?.nativeElement, {
      type: this.chartType,
      data: {
        labels: this.chartLabels,
        datasets: [{
          data: this.chartData,
          backgroundColor: colors,
        }]
      },
      options: options as any  // Assurez-vous que 'options' soit correctement typé
    });
  }
  
}
