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

**Accueil Admin Pokédex**

![pokemonAdmin3](https://github.com/user-attachments/assets/1cd8a41e-4799-42e9-b364-5632483f717f)

**Formulaire d'ajout (modal)**

![pokemonAdmin4](https://github.com/user-attachments/assets/529af282-b4fd-415f-b4f1-12b3c996eaef)

**Modal de modification**

![pokemonAdmin13](https://github.com/user-attachments/assets/6c47f12f-599a-4190-ae2d-6edc62a54f1a)

**Modal de confirmation de suppression**

![pokemonAdmin16](https://github.com/user-attachments/assets/f7da598e-1df0-48dd-b54a-8ef2f9fa8a39)

---

### 🎮 Admin Boîte Pokédex

<p align="justify">
La liste de boîtes pokédex dans lesquelles sont rangés les pokémons. On affiche le nombre de pokémon par genres ainsi que les nombre de niveau 100. Le formulaire modal pour ajouter une boîte pokédex existe également. Les modals de modification et de suppression (non présent ici) restent sensiblement les mêmes que pour les pokémons.
</p>

**Accueil Admin Boîtes Pokédex**

![pokemonAdmin6](https://github.com/user-attachments/assets/313c31a8-55c0-459a-b594-6dfc8b586835)

**Modal de suppression**

![pokemonAdmin18](https://github.com/user-attachments/assets/f104518d-ae0d-42c5-aea6-e80a28374af5)

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
          
**Accueil Admin Shiny**

![pokemonAdmin10](https://github.com/user-attachments/assets/eef7ab44-de9d-4fa0-a852-5684779220d4)

**Formulaire d'ajout (modal)**

![pokemonAdmin12](https://github.com/user-attachments/assets/8bd67869-0024-40ac-91ed-242e415b84c9)

**Modal de modification**

![pokemonAdmin11](https://github.com/user-attachments/assets/01602a51-90c1-49ac-a6fd-5412bcae66e7)

**Modal de suppression**

![pokemonAdmin17](https://github.com/user-attachments/assets/b71a0f45-526a-47b7-971c-8ec29a89a904)

---

### 💅 Admin Boîte Shiny

![pokemonAdmin14](https://github.com/user-attachments/assets/a5d2c4cd-6e48-48e4-866a-5b88d5b2d8cb)

**Formulaire d'ajout (modal)**

![pokemonAdmin19](https://github.com/user-attachments/assets/ee13da3b-c961-4189-9e4d-8f0d6d589ef1)

---

### ⚔️ Admin Attaques

**Accueil Admin Attaques**

![pokemonAdmin](https://github.com/user-attachments/assets/b2e6c2b8-fe69-44fe-ab36-33e99d8ea360)

Triées par type et affichées par pagination (5 par page).

**Formulaire d'ajout (modal)**

![pokemonAdmin2](https://github.com/user-attachments/assets/b63c6835-3323-4f86-b0a4-3f33732deefd)

**Modal de modification**

![pokemonAdmin1](https://github.com/user-attachments/assets/13aec9ca-2439-41e7-8b77-803b824da7f7)

---

### 🎭 Admin Dresseurs

![pokemonAdmin5](https://github.com/user-attachments/assets/6c0921a7-054e-40f4-b996-1b9d745f1678)

**Formulaire d'ajout (modal)**

![pokemonAdmin20](https://github.com/user-attachments/assets/6504cad2-5ec8-482d-896a-de75b694a8a5)

**Modal de suppression**

![pokemonAdmin21](https://github.com/user-attachments/assets/e02ca075-f1e9-4105-84df-e4f5ed051e33)

---

### 🌏 Admin Pokéballs

![pokemonAdmin7](https://github.com/user-attachments/assets/ca8bb9d4-fd8f-421f-a3db-5ae65773ea28)

---

### 🌆 Admin Régions

![pokemonAdmin8](https://github.com/user-attachments/assets/0d5f6866-1a17-4c8e-b8a9-bfcfbb284f3f)

---

### 👨‍⚖️ Admin Genres

![pokemonAdmin9](https://github.com/user-attachments/assets/c54e30e3-003b-4518-9dfa-a684fa9ffb97)

---

### 🌟 Admin Types

![pokemonAdmin15](https://github.com/user-attachments/assets/a3045f69-9e0b-43be-a4b2-29f6c1fd9496)

--- 

### 🎮 3.3 Les différentes pages de l'application

### 🌟 Une page Pokedex

![pokedex1](https://github.com/user-attachments/assets/2c3efab2-564d-4355-a97e-51151b25c603)

Les boutons permettent de naviguer entre les régions, et la barre de recherche affiche les pokémons selon certains critères.

### 📊 La page Statistiques Pokedex National

![pokemonStat4](https://github.com/user-attachments/assets/b6f8683a-09e5-4f24-a399-673282242997)
![pokemonStat5](https://github.com/user-attachments/assets/386d799c-aec3-4c66-aad9-4b4c549eacb8)
![pokemonStat6](https://github.com/user-attachments/assets/9881db3d-5ce9-4e23-aea7-0f6acd3af8d2)

Les boutons permettent de naviguer entre les catégories. Pour les dresseurs, un filtre par région est disponible afin de réduire la taille des tableaux.

### ✨ Une page Pokedex Shiny

![pokedex2](https://github.com/user-attachments/assets/ffabd222-adcf-4ea3-990e-756fed46f255)
![pokedex3](https://github.com/user-attachments/assets/a7070ee8-81c0-43e7-b86c-00a02f4e54a5)

Les mêmes boutons que sur le Pokedex National permettent de naviguer entre les régions.

### 📈 La page Statistiques Générales Shiny

![pokemonStat1](https://github.com/user-attachments/assets/daad844c-cf29-4227-a329-19e55d243a1c)
![pokemonStat2](https://github.com/user-attachments/assets/c18d5d0a-b295-4b11-9c00-7a73efcc24f9)
![pokemonStat3](https://github.com/user-attachments/assets/7fede63f-5e93-4983-9788-1ecfbdeaad67)

### 📦 La page Statistiques par Boîtes Shiny

![pokemonStat7](https://github.com/user-attachments/assets/ac79fd20-8b57-4340-93ec-d65e1e51930d)
![pokemonStat8](https://github.com/user-attachments/assets/1ff575ec-546b-4051-ba29-131ad18074c3)
![pokemonStat9](https://github.com/user-attachments/assets/77f74e25-b662-48ee-a59f-bc333d66fcce)

Affichage du nombre de shiny pour chaque catégorie et chaque boîte. Les boutons permettent de naviguer entre les boîtes.

## 4. Conclusion générale

_à venir_

### 🔗 Liens

**[Backend Repository](https://github.com/cedric-chimot/projet-pokemon)** : Le lien vers le repository GitHub contenant le code backend.

