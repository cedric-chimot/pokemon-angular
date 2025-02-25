# 🚀 _Projet Pokémon_
---

## 🎯 _1. Introduction_
L'objectif principal du projet est de **monter en compétence** sur **Java JEE** et **Angular**.

📌 **Hard skills** :
- 🛠️ Travail en mode projet
- 🏗️ Développement d'un projet complet

📌 **Soft skills** :
- 🎨 Valorisation des compétences
- 🚀 Montée en compétence sur des technos connues

🛠 **Technologies utilisées :**  

![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Spring](https://img.shields.io/badge/Spring-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Hibernate](https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white)
![Java JEE](https://img.shields.io/badge/Java%20JEE-007396?style=for-the-badge&logo=java&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

---

## 🔥 _2. Objectifs et Technologies_

### 🎮 _2.1 Le projet_

🔄 **Transformation d'une base de données Excel en projet dynamique**
<p align="justify">
L'objectif est de rendre dynamique un fichier Excel contenant les données du Pokédex.
Sur Excel, l'ajout de données est manuel. Ici, la <strong>base de données gère tout</strong>, avec une interface d'administration !
</p>

📷 **Fichier Excel original :**
<p align="center">
  <img src="https://github.com/user-attachments/assets/5ff97c88-17ac-44a4-9c84-e77e2cc63168" width="600px">
</p>


---

### 🎯 _2.2 L'objectif principal_

### 📌 _La page d'une Boîte Shiny_
Le premier objectif était d'afficher cette page 👇

📷 **Exemple d'une boîte contenant des Pokémon Shiny :**
| Page 1 | Page 2 |
|--------|--------|
| ![pokemon1](https://github.com/user-attachments/assets/077abf57-19b3-4376-a903-9130954a41ca) | ![pokemon2](https://github.com/user-attachments/assets/fd61a3f8-eeda-4c86-b257-3973d1421d21) |
| Page 3 | Page 4 |
| ![pokemon3](https://github.com/user-attachments/assets/625bc39c-2e3f-412d-a0da-ea5b58326d7c) | ![pokemon4](https://github.com/user-attachments/assets/71e228c0-2d83-494d-b437-ee240d06e73a) |
|--------|--------|
| Page 5 |
| ![pokemon5](https://github.com/user-attachments/assets/cdf8f57a-b669-4a71-9f7a-7580641221a2)


📌 **Fonctionnalités :**
- 🎨 **Affichage des détails** (Pokéball, dresseur, attaques)
- 🔄 **Boutons de navigation** entre les boîtes
- 📜 **Système de scroll amélioré**

📌 **Composants réutilisables** (boutons de navigation, bouton haut de page)
<p align="justify">
Il y a tous les détails concernant les pokémons, pokéball de capture, dresseur d'origine etc... Le type possède une couleur spécifique et les attaques que maitrisent chaque pokémons prennent la couleur de leur type. Les boutons en haut de la page permettent de naviguer entre les différentes boîtes de pokémons existantes. Il y a également en bas de page un bouton permettant de remonter en haut de la page pour éviter le scroll. Chacun de ces boutons est un composant Angular réutilisé sur de nombreuses pages du projet.
</p>

---

## 3 - Le rendu du projet

### 🏠 3.1 L'accueil et le Dashboard Admin

### 🎮 La page d'accueil

Ici la page d'accueil du projet. On retrouve on présentation du projet avec les objectifs ainsi que des données en provenance de la BDD. 

![pokemonAccueil](https://github.com/user-attachments/assets/6073afb3-4e88-48a2-844b-f8df004b60a3)

### 💻 Le dashboard Admin

<p align="justify">
Au niveau du tableau de bord, on retrouve des données comme le nombre de pokémon du pokédex enregistrés, le nombre de shiny etc... On affiche également deux graphiques de répartition pour exemple de statistiques. La sidebar, elle, permet de naviguer entre les différentes pages admin.
</p>

![pokemonDashboard](https://github.com/user-attachments/assets/7a6139f7-fd61-454e-936b-bbbbb3a1ce0c)

---

### 📄 3.2 Les différentes pages Admin

### 🌟 Admin Pokédex

<p align="justify">
Les pokémons du pokédex national sont rangés dans un tableau et classés par régions. On retrouve à gauche du tableau le composant de navigation pour changer de région, il y a aussi le composant de pagination afin de limiter le nombre de pokémons affichés par page (ici 10).
</p>
<p align="justify">
Les boutons d'actions permettent d'afficher les modals pour modifier ou supprimer un pokémon, le bouton ajouter en fait de même. Au niveau du formulaire modal pour ajouter un pokémon au pokédex, les listes à choix multiples sont générées dynamiquement en fonction des données de la base de données.
</p>
<p align="justify">
Pour la modification, on récupère les données actuelles et on peut ensuite modifier les données souhaitées. Le modal de confirmation avant suppression d'un pokémon offre la possibilité ou non de supprimer le pokémon.
</p>

### Accueil Admin Pokédex  

| **Aperçu**  | **Description**  |
|-------------|----------------|
| ![pokemonAdmin3](https://github.com/user-attachments/assets/1cd8a41e-4799-42e9-b364-5632483f717f) | **Accueil Admin Pokédex** : Vue principale de l'administration du Pokédex. |

### Modals et Formulaires  

| **Aperçu**  | **Description**  |
|-------------|----------------|
| ![pokemonAdmin4](https://github.com/user-attachments/assets/529af282-b4fd-415f-b4f1-12b3c996eaef) | **Formulaire d'ajout** : Modal permettant d'ajouter un Pokémon au Pokédex. |
| ![pokemonAdmin13](https://github.com/user-attachments/assets/6c47f12f-599a-4190-ae2d-6edc62a54f1a) | **Modal de modification** : Interface pour modifier les informations d'un Pokémon. |
| ![pokemonAdmin16](https://github.com/user-attachments/assets/f7da598e-1df0-48dd-b54a-8ef2f9fa8a39) | **Modal de confirmation de suppression** : Fenêtre demandant confirmation avant la suppression d'un Pokémon. |

---

### 🎮 Admin Boîte Pokédex  

<p align="justify">
La liste de boîtes pokédex dans lesquelles sont rangés les pokémons. On affiche le nombre de pokémons par genres ainsi que le nombre de niveau 100. Le formulaire modal pour ajouter une boîte pokédex existe également. Les modals de modification et de suppression (non présent ici) restent sensiblement les mêmes que pour les pokémons.
</p>

### Aperçu de l'Admin Boîte Pokédex  

| **Aperçu**  | **Description**  |
|-------------|----------------|
| ![pokemonAdmin6](https://github.com/user-attachments/assets/313c31a8-55c0-459a-b594-6dfc8b586835) | **Accueil Admin Boîtes Pokédex** : Interface principale pour gérer les boîtes de rangement des Pokémons. |

### Modal de Suppression  

| **Aperçu**  | **Description**  |
|-------------|----------------|
| ![pokemonAdmin18](https://github.com/user-attachments/assets/f104518d-ae0d-42c5-aea6-e80a28374af5) | **Modal de confirmation de suppression** : Confirme la suppression d'une boîte Pokédex. |

---

### ✨ Admin Shiny  

<p align="justify">
Les pokémons shiny sont rangés et classés de la même manière que les pokémons du pokédex national. On retrouve à gauche du tableau le même composant de navigation pour changer de région, il y a aussi le composant de pagination.
</p>
<p align="justify">
Les boutons d'actions permettent d'afficher les modals pour ajouter, supprimer ou modifier un shiny. Les listes sont également récupérées dynamiquement.
</p>
<p align="justify">
Pour la modification, on récupère les données actuelles et on peut ensuite modifier les données souhaitées. Certaines données fixes (le nom du pokémon, son/ses types par exemple) ne sont, d'un point de vue logique, pas modifiables. Au niveau des attaques, on modifie chacune d'elle indépendamment et suivant la position.
</p>
<p align="justify">
Le modal de confirmation avant suppression d'un pokémon shiny reste identique à celui pour supprimer un pokémon du pokédex.
</p>

### Aperçu de l'Admin Shiny  

| **Aperçu**  | **Description**  |
|-------------|----------------|
| ![pokemonAdmin10](https://github.com/user-attachments/assets/eef7ab44-de9d-4fa0-a852-5684779220d4) | **Accueil Admin Shiny** : Interface principale pour la gestion des Pokémons Shiny. |

### Modals et Formulaires  

| **Aperçu**  | **Description**  |
|-------------|----------------|
| ![pokemonAdmin12](https://github.com/user-attachments/assets/8bd67869-0024-40ac-91ed-242e415b84c9) | **Formulaire d'ajout** : Modal pour ajouter un Pokémon Shiny. |
| ![pokemonAdmin11](https://github.com/user-attachments/assets/01602a51-90c1-49ac-a6fd-5412bcae66e7) | **Modal de modification** : Permet d'éditer les informations d'un Pokémon Shiny. |
| ![pokemonAdmin17](https://github.com/user-attachments/assets/b71a0f45-526a-47b7-971c-8ec29a89a904) | **Modal de confirmation de suppression** : Confirme la suppression d'un Pokémon Shiny. |

---
### 💅 Admin Boîte Shiny  

<p align="justify">
La liste de boîtes dans lesquelles sont rangés les pokémons shiny. On affiche le nombre de pokémons de niveau 100. Le formulaire modal pour ajouter une boîte shiny existe également.
</p>

### Aperçu de l'Admin Boîte Shiny  

| **Aperçu**  | **Description**  |
|-------------|----------------|
| ![pokemonAdmin14](https://github.com/user-attachments/assets/a5d2c4cd-6e48-48e4-866a-5b88d5b2d8cb) | **Accueil Admin Boîtes Shiny** : Interface principale pour gérer les boîtes de rangement des Pokémons Shiny. |

### Formulaire d'Ajout  

| **Aperçu**  | **Description**  |
|-------------|----------------|
| ![pokemonAdmin19](https://github.com/user-attachments/assets/ee13da3b-c961-4189-9e4d-8f0d6d589ef1) | **Formulaire d'ajout (modal)** : Permet d'ajouter une nouvelle boîte Shiny. |

---

### ⚔️ Admin Attaques  

<p align="justify">
La liste des attaques est triée par type pour plus de clarté. Chacun des boutons affiche une liste d'attaques correspondant à un type précis.
</p>
<p align="justify">
On peut, comme pour les autres sections, ajouter, modifier ou supprimer une attaque. Le fait de modifier le type fera automatiquement changer de liste l'attaque sélectionnée.
</p>

### Aperçu de l'Admin Attaques  

| **Aperçu**  | **Description**  |
|-------------|----------------|
| ![pokemonAdmin](https://github.com/user-attachments/assets/f3f6b7c0-3ce1-4a54-8242-12cbce4bc262) | **Accueil Admin Attaques** : Interface principale pour la gestion des attaques Pokémon. |

### Formulaire d'Ajout  

| **Aperçu**  | **Description**  |
|-------------|----------------|
| ![pokemonAdmin2](https://github.com/user-attachments/assets/0b589ba2-2273-4559-8770-fbaaeff235ba) | **Formulaire d'ajout (modal)** : Permet d'ajouter une nouvelle attaque. |

### Modification d'une Attaque  

| **Aperçu**  | **Description**  |
|-------------|----------------|
| ![pokemonAdmin1](https://github.com/user-attachments/assets/9d6ebd3b-4dd0-46ea-a1e3-5bedfa8419b3) | **Modal de modification** : Modifier les détails d'une attaque existante. |

### Confirmation de Suppression  

| **Aperçu**  | **Description**  |
|-------------|----------------|
| ![pokemonAdmin23](https://github.com/user-attachments/assets/c5124931-a1a7-4d13-9895-cfff953c05ab) | **Modal de confirmation de suppression** : Vérification avant suppression d'une attaque. |

---

### 👨‍⚖️ Admin Dresseurs  

<p align="justify">
La liste des dresseurs est affichée par régions, mais pas les mêmes régions que les pokémons, elles sont ici regroupées. On retrouve les informations sur les dresseurs ainsi que le nombre de pokémons et de shiny par dresseur.
</p>
<p align="justify">
L'administration des dresseurs permet de manipuler tout ce qui les concerne. De la même manière que pour les pokémons, certaines données fixes ne sont pas modifiables.
</p>

### Aperçu de l'Admin Dresseurs  

| **Aperçu**  | **Description**  |
|-------------|----------------|
| ![pokemonAdmin5](https://github.com/user-attachments/assets/6c0921a7-054e-40f4-b996-1b9d745f1678) | **Accueil Admin Dresseurs** : Interface principale de gestion des dresseurs. |

### Formulaire d'Ajout  

| **Aperçu**  | **Description**  |
|-------------|----------------|
| ![pokemonAdmin20](https://github.com/user-attachments/assets/6504cad2-5ec8-482d-896a-de75b694a8a5) | **Formulaire d'ajout (modal)** : Permet d'ajouter un nouveau dresseur. |

### Modification d'un Dresseur  

| **Aperçu**  | **Description**  |
|-------------|----------------|
| ![pokemonAdmin24](https://github.com/user-attachments/assets/a9d69286-1ad0-4d23-9d01-49113271ffc7) | **Modal de modification** : Modifier les informations d'un dresseur existant. |

### Confirmation de Suppression  

| **Aperçu**  | **Description**  |
|-------------|----------------|
| ![pokemonAdmin21](https://github.com/user-attachments/assets/e02ca075-f1e9-4105-84df-e4f5ed051e33) | **Modal de confirmation de suppression** : Vérification avant suppression d'un dresseur. |

---

### 🎭 Admin Natures

<p align="justify">
La liste des natures avec le composant de pagination pour limiter le nombre par pages. On retrouve les nombres de pokémons et de shiny par natures.
</p>
<p align="justify">
On peut modifier ou supprimer une nature. Les natures sont une spécificité des jeux Pokémon introduite il y a quelques années et, depuis leur introduction, il n'en existe que 25 et aucune n'a été ajoutée depuis. De ce fait, l'admin ne proposera pas de formulaire d'ajout.
</p>

**Accueil Admin Natures**

![pokemonAdmin25](https://github.com/user-attachments/assets/9e48722b-aa4b-44f2-b925-04e75bff9b3f)

**Modal de modification**

![pokemonAdmin26](https://github.com/user-attachments/assets/8395eb46-0b99-459b-a65c-5fc3394de304)

**Modal de confirmation de suppression**

![pokemonAdmin27](https://github.com/user-attachments/assets/e87ef019-dd31-4eff-bc48-9c510e9c5ae2)

---

### 🌏 Admin Pokéballs

![pokemonAdmin7](https://github.com/user-attachments/assets/ca8bb9d4-fd8f-421f-a3db-5ae65773ea28)

---

### 🌆 Admin Régions

![pokemonAdmin8](https://github.com/user-attachments/assets/0d5f6866-1a17-4c8e-b8a9-bfcfbb284f3f)

---

### 🎮 Admin Genres

![pokemonAdmin9](https://github.com/user-attachments/assets/c54e30e3-003b-4518-9dfa-a684fa9ffb97)

---

### 🌟 Admin Types

![pokemonAdmin15](https://github.com/user-attachments/assets/a3045f69-9e0b-43be-a4b2-29f6c1fd9496)

--- 

### 🎮 3.3 Les différentes pages de l'application

### 🌟 Pokédex

<p align="justify">
Ici l'exemple d'une page pokédex. On retrouve une liste des pokémons du pokédex national classés par région. De la même manière que pour les boîtes shiny, on peut naviguer entre les différentes régions et les différentes pages de pokémons. Un composant barre de recherche a été ajouté pour filtrer les pokémons selon certains critères.
</p>

![pokedex1](https://github.com/user-attachments/assets/2c3efab2-564d-4355-a97e-51151b25c603)

---

### 📊 Statistiques Pokédex National

<p align="justify">
On retrouve ici, la page des stats pour le pokédex. Les boutons permettent de naviguer entre les différentes catégories disponibles. Les graphiques sont générés dynamiquement avec Chart.js en fonction des données de la base de données.
</p>

**Stats Pokédex Pokéballs (exemple)**

![pokemonStat1](https://github.com/user-attachments/assets/daad844c-cf29-4227-a329-19e55d243a1c)
![pokemonStat2](https://github.com/user-attachments/assets/c18d5d0a-b295-4b11-9c00-7a73efcc24f9)
![pokemonStat3](https://github.com/user-attachments/assets/7fede63f-5e93-4983-9788-1ecfbdeaad67)

---

### ✨ Pokédex Shiny

<p align="justify">
La page Pokédex shiny se présente comme la page Pokédex national. On retrouve une liste des pokémons shiny classés par région. La seule différence réside dans le fait que l'on a jouté une colonne supplémentaire affichant les statistiques des pokémons shiny, à savoir leurs IVs.</p>

**Accueil Pokédex Shiny**

![pokedex2](https://github.com/user-attachments/assets/ffabd222-adcf-4ea3-990e-756fed46f255)
![pokedex3](https://github.com/user-attachments/assets/a7070ee8-81c0-43e7-b86c-00a02f4e54a5)

---

### 📈 Statistiques Générales Shiny

<p align="justify">
On retrouve ici, la page des stats pour les shiny. Les mêmes boutons permettent de naviguer entre les différentes catégories disponibles comme pour le Pokédex. Les graphiques sont également générés dynamiquement avec Chart.js en fonction des données de la base de données.
</p>
          
**Stats Générales Shiny Types (exemple)**

![pokemonStat4](https://github.com/user-attachments/assets/d898f732-6cdc-4993-8635-841fa95f147b)
![pokemonStat5](https://github.com/user-attachments/assets/93bae603-b02b-4ffe-be5c-d92759b47437)
![pokemonStat6](https://github.com/user-attachments/assets/42187b76-8463-4505-8a0a-bd6ac878755c)

---

### 📦 Statistiques par Boîtes Shiny

<p align="justify">
Encore ici les statistiques pour les shiny mais cette fois-ci par boîtes. On retrouve la même chose que pour les statistiques précédentes mais cette fois-ci, les données sont regroupées par boîtes de pokémons shiny.
</p>
          
**Accueil Stats Boîtes Shiny**

![pokemonStat7](https://github.com/user-attachments/assets/ac79fd20-8b57-4340-93ec-d65e1e51930d)
![pokemonStat8](https://github.com/user-attachments/assets/1ff575ec-546b-4051-ba29-131ad18074c3)
![pokemonStat9](https://github.com/user-attachments/assets/77f74e25-b662-48ee-a59f-bc333d66fcce)

---

## 4. Conclusion générale

_à venir_

### 🔗 Liens

**[Backend Repository](https://github.com/cedric-chimot/projet-pokemon)** : Le lien vers le repository GitHub contenant le code backend.

