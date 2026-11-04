# Le Kiosque — site de l'association étudiante

Site HTML/CSS/JS d'une association étudiante qui organise des événements (hackathon, ciné-club, repas du monde, tournoi de jeux). Projet réalisé pour l'évaluation Git & GitHub, en binôme.

## Identification des membres

| Pseudonyme GitHub | Nom | Prénom | Rôle |
|---|---|---|---|
| @diellashalom-aki | AKIMANA | Diella Shalom | Étudiant 1 |
| @Kagezukii | EL HAMDANI | Donya | Étudiant 2 |

- Dépôt : https://github.com/PSEUDO/lekiosque
- GitHub Project : https://github.com/users/PSEUDO/projects/N

## Fonctionnalités et responsabilités

| Fonctionnalité | Responsable | Branche | Issue / PR |
|---|---|---|---|
| A. Présentation et navigation (accueil, association, activités, contact) | Diella | `feature/presentation-navigation` | #… / #… |
| B. Catalogue d'événements (4 événements, formulaire d'inscription) | Donya | `feature/catalogue-evenements` | #… / #… |
| Amélioration A : identité visuelle | Diella | `feature/identite-visuelle` | #… / #… |
| Amélioration B : adaptation mobile | Donya | `feature/adaptation-mobile` | #… / #… |
| Correction des cartes qui débordent | Diella | `bugfix/debordement-cartes-mobile` | #… / #… |
| Préparation de la v1.0 | Diella (PR approuvée et tag par Donya) | `release/1.0` | #… / #… |
| Hotfix du lien Événements | Donya (PR approuvée et tag par Diella) | `hotfix/lien-evenements` | #… / #… |
| Résolution du conflit | Les deux | `feature/adaptation-mobile` | #… |

Pages : `index.html`, `evenements.html`, `inscription.html`. Styles dans `css/`, scripts dans `js/`.

## Workflow Git Flow

- `main` : versions stables, chaque commit publié est tagué.
- `develop` : intégration des développements en cours.
- `feature/*` : nouvelles fonctionnalités, créées depuis `develop`.
- `bugfix/*` : correction non urgente dans `develop`.
- `release/*` : préparation d'une version, sans nouvelle fonctionnalité.
- `hotfix/*` : correction urgente créée depuis `main`, renvoyée ensuite dans `develop`.

`main` et `develop` sont protégées : Pull Request obligatoire, une approbation de l'autre membre du binôme, aucun push direct. Chaque PR mentionne son Issue (`Closes #N`) et chaque commit renvoie à l'Issue concernée (`Refs #N`).

## Étapes du développement

1. Création du dépôt, des branches `main` et `develop`, des Issues et du Project (Kanban + Roadmap).
2. Squelette partagé, puis fonctionnalités A et B en parallèle, intégrées par PR.
3. Identité visuelle et adaptation mobile en parallèle, ce qui provoque le conflit.
4. Correction du débordement des cartes (`bugfix/`).
5. Branche `release/1.0` : vérification des liens et de la validité HTML, ajout des `meta description` manquantes, mise à jour de la version. Merge dans `main`, tag `v1.0`, retour dans `develop`.
6. Incident en production, hotfix, tag `v1.0.1`, retour dans `develop`.

## Le conflit Git et sa résolution

**Origine.** Diella (identité visuelle) et Donya (adaptation mobile) sont toutes deux parties du même commit de `develop` et ont modifié, dans `css/style.css`, le bloc `:root` (variables de couleurs et de polices) et la règle `.site-header` (padding, fond). La PR d'identité a été fusionnée en premier. Git n'a pas pu décider seul laquelle des deux versions des mêmes lignes garder pour la PR mobile.

**Résolution** (menée ensemble, Diella proposant la fusion en revue, Donya l'appliquant) :
- `:root` : on garde les couleurs et polices de l'identité visuelle, et on ajoute la variable `--espace` du mobile.
- `.site-header` : on garde le fond coloré et le texte blanc de l'identité, et le `padding: 0.75rem var(--espace)`, `flex-wrap` et `position: sticky` du mobile. Le grand padding desktop `1.25rem 3rem` est abandonné au profit de la version mobile, jugée plus sûre sur petit écran.
- Résultat vérifié sur ordinateur et sur écran étroit avant de valider le commit de merge.

## Versions publiées

| Tag | Contenu |
|---|---|
| `v1.0` | Première version stable : accueil, événements, inscription, identité visuelle, mobile |
| `v1.0.1` | Hotfix : le lien « Événements » de l'accueil pointait vers `evenement.html` (faute de frappe introduite avec le menu mobile et non détectée par la recette de la v1.0) |

## Difficultés rencontrées

À compléter avec vos vraies difficultés (exemple : comprendre pourquoi le hotfix doit être fusionné aussi dans `develop`, ou limite de GitHub pour approuver sa propre PR).

## Questions de synthèse

**1. Intérêt de séparer développements en cours et versions stables ? (Diella)**
`main` contient toujours un code qui marche et qu'on peut livrer. Les travaux inachevés restent dans `develop` et les branches de fonctionnalité, donc une idée à moitié finie ne casse jamais le site publié.

**2. Pourquoi imposer une revue de code avant intégration ? (Donya)**
Un second regard repère les erreurs, comme une faute de frappe dans un lien, avant qu'elles arrivent en production. La revue aide aussi chacun à connaître tout le code et laisse une trace de la discussion.

**3. Quelles situations provoquent un conflit Git, et pourquoi la résolution n'est-elle pas toujours automatique ? (Diella)**
Un conflit apparaît quand deux branches modifient les mêmes lignes d'un fichier, ou quand l'une modifie un fichier que l'autre supprime. Git sait fusionner des zones différentes, mais il ne peut pas deviner l'intention humaine quand deux versions concurrentes existent : il faut choisir ou combiner.

**4. Différence entre correction classique et correction urgente de production ? (Donya)**
Une correction classique (`bugfix`) part de `develop` et suit le cycle normal jusqu'à la prochaine release. Une correction urgente (`hotfix`) part de `main`, ne contient que le correctif, est publiée tout de suite avec un nouveau tag, puis est répercutée dans `develop`.

**5. Pourquoi répercuter une correction de production dans les développements en cours ? (Diella)**
Sinon `develop` garde le bug, et la prochaine version le réintroduirait en production. La répercussion garantit que le correctif est présent dans toutes les versions futures.

**6. Rôle d'une branche de release ? (Donya)**
Elle sert à figer une version, la tester et corriger les derniers détails sans bloquer `develop`, où les autres développements continuent. Rien de nouveau n'y est ajouté, et elle est fusionnée dans `main` puis dans `develop`.

**7. Comment GitHub Projects et les Issues facilitent-ils organisation et traçabilité ? (Diella)**
Les Issues décrivent le travail et ses critères de réalisation, avec un responsable. Le Project (Kanban, Roadmap) montre l'avancement et l'ordre prévu. Les liens `Closes #N` relient chaque Issue à ses commits et à sa PR.

**8. Comment retrouver l'origine d'une modification dans l'historique GitHub ? (Donya)**
Avec `git blame` ou le bouton « Blame » d'un fichier, on voit le dernier commit de chaque ligne. Ce commit mène à sa Pull Request, donc à l'Issue, aux revues et à l'auteur. `git log -p -- fichier` donne l'historique complet.
