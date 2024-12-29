import { Component, Input, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, ChartTypeRegistry, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(...registerables, ChartDataLabels);  
// Enregistrement des composants Chart.js et du plugin DataLabels

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {
  // Propriétés d'entrée passées depuis le composant parent
  @Input() chartData: any[] = [];            // Les données du graphique
  @Input() chartLabels: string[] = [];       // Les étiquettes des segments ou colonnes
  @Input() chartType: keyof ChartTypeRegistry = 'pie'; // Type de graphique (par défaut 'pie')
  @Input() chartTitle: string = '';          // Titre du graphique
  @Input() chartColors: string[] = [];       // Couleurs des segments ou colonnes
  
  // Référence au canvas HTML où le graphique sera dessiné
  @ViewChild('chartCanvas', { static: false }) chartCanvas: ElementRef | undefined;

  private chart: any; // Instance du graphique Chart.js

  constructor() {}
  
  // Méthode appelée après la création de la classe
  ngOnInit(): void {}

  // Méthode appelée après le chargement de la vue
  ngAfterViewInit(): void {
    // Utilisation de setTimeout pour attendre que les données soient disponibles
    setTimeout(() => {
      if (this.chartData.length && this.chartLabels.length) {
        this.createChart(); // Créer le graphique si les données et les étiquettes sont disponibles
      } else {
        console.error('Données ou labels manquants pour créer le graphique'); // Message d'erreur en cas de données manquantes
      }
    }, 500);  // Délai de 500ms pour éviter des problèmes de rendu
  }

  // Méthode privée pour créer le graphique
  private createChart(): void {
    const colors = this.chartColors; // Récupération des couleurs passées en entrée
    
    // Configuration pour afficher ou non la légende en fonction du type de graphique
    const legendDisplay = this.chartType !== 'bar';  

    // Options de configuration du graphique
    const options = {
      responsive: true, // Adapte le graphique à la taille de l'écran
      layout: {
        padding: { // Espacement autour du graphique
          top: 20,
          bottom: 20,
          left: 20,
          right: 20,
        },
      },
      plugins: {
        legend: {
          display: legendDisplay, // Affiche ou masque la légende
          position: 'right', // Position de la légende à droite
          labels: {
            boxWidth: 20, // Taille des carrés colorés dans la légende
            padding: 10, // Espacement entre les éléments de la légende
            font: {
              size: 14,
              weight: 'bold', // Style du texte dans la légende
            }
          }
        },
        tooltip: { // Configuration des infobulles
          callbacks: {
            label: (tooltipItem: { label: string; raw: any; }) => {
              // Affiche les données sous la forme "label: valeur"
              const label = tooltipItem.label || '';
              return `${label}: ${tooltipItem.raw}`;
            }
          }
        },
        datalabels: { // Plugin pour afficher des étiquettes directement sur le graphique
          font: {
            weight: 'bold',
            size: 16, // Taille de la police des étiquettes
          },
          anchor: 'end',  // Position de l'étiquette à l'extérieur du segment
          align: 'start', // Aligne l'étiquette sur le bord du segment
          clip: false,    // Empêche les étiquettes de se couper
          color: '#ffffff', // Couleur des étiquettes
          offset: -60, // Décalage pour éviter les chevauchements
          rotation: -45, // Rotation pour mieux disposer les étiquettes
          padding: 50, // Espacement entre les étiquettes et les segments
          formatter: (value: any, context: any) => {
            // Affiche la valeur brute des données
            return value;
          },
        },
        title: { // Configuration du titre du graphique
          display: true, // Afficher le titre
          text: this.chartTitle, // Texte du titre
          font: {
            size: 22,
            weight: 'bold', // Style de la police du titre
          },
          padding: {
            top: 20, // Espacement en haut
            bottom: 20, // Espacement en bas
          },
          align: 'center', // Alignement centré
        }
      },
    };

    // Création de l'objet Chart.js avec le type, les données et les options
    this.chart = new Chart(this.chartCanvas?.nativeElement, {
      type: this.chartType, // Type de graphique ('pie', 'bar', etc.)
      data: {
        labels: this.chartLabels, // Étiquettes pour les segments ou colonnes
        datasets: [{
          data: this.chartData, // Données pour chaque segment ou colonne
          backgroundColor: colors, // Couleurs associées aux segments
        }]
      },
      options: options as any // Conversion pour satisfaire le typage TypeScript
    });
  }
}
