import { Component, Input, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartTypeRegistry, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';  // Import du plugin

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
  @Input() typeColors: { [key: string]: string } = {};  // Couleurs associées aux types
  @ViewChild('chartCanvas', { static: false }) chartCanvas: ElementRef | undefined;

  private chart: any;

  ngOnInit(): void {
    // Initialisation si nécessaire
  }

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
    const colors = this.getColorsBasedOnType(this.chartLabels);

    this.chart = new Chart(this.chartCanvas?.nativeElement, {
      type: this.chartType,  // Type de graphique (pie, bar, line, etc.)
      data: {
        labels: this.chartLabels,
        datasets: [{
          data: this.chartData,
          backgroundColor: colors,  // Applique les couleurs personnalisées aux segments du graphique
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,  // Désactiver la légende pour l'espace
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
              size: 14,
            },
            // Positionner les labels à l'extérieur du graphique
            align: 'start',
            anchor: 'end',
            color: '#000000',  // Couleur des étiquettes
            formatter: (value, context) => {
              return context.chart.data?.labels?.[context.dataIndex] || '';  // Afficher le nom du label
            },
          },
          title: {
            display: true,    // Afficher le titre
            text: this.chartTitle, // Titre dynamique
            font: {
              size: 18,        // Taille du titre
              weight: 'bold',  // Poids du titre
            },
            padding: {
              top: 20,         // Espacement au-dessus du titre
              bottom: 20,      // Espacement en dessous du titre
            },
            align: 'center',  // Centrer le titre
          }
        },
        // Ajouter un effet de perspective pour un effet 3D-like
        scales: {
          x: {
            beginAtZero: true,
            grid: {
              display: false
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: '#ccc',
            },
            ticks: {
              callback: function(value) {
                return value; // Afficher les ticks (valeurs) sur l'axe y
              }
            }
          }
        },
        elements: {
          bar: {
            borderWidth: 2,  // Bordure des barres
            borderColor: '#fff',  // Couleur de la bordure des barres
            borderRadius: 5,  // Arrondir les coins des barres pour un effet de profondeur
          },
        },
      }
    });
  }

  // Retourne les couleurs basées sur le type
  private getColorsBasedOnType(labels: string[]): string[] {
    return labels.map(label => this.typeColors[label] || '#CCCCCC');  // Couleur par défaut
  }
}
