# Guide pas à pas : refaire le workflow sur GitHub

Le dossier `etapes/` contient le code de chaque commit sous forme de patch. Le workflow a été rejoué et vérifié en local (conflit réel, tags `v1.0` et `v1.0.1`). **Chacune de vous exécute ses propres étapes depuis son compte** : l'évaluation vérifie les commits, Issues, PR et revues de chacune.

Rappel : sur GitHub, Issues et PR partagent la même numérotation. Remplacez les `#N` des messages de commit par les vrais numéros.

## 0. Préparation (Diella)
1. Créer le dépôt public `lekiosque`, ajouter Donya en collaboratrice (Settings → Collaborators).
2. `git clone`, copier `README.md` dans le dépôt, commit « chore: initialisation », `git push origin main`, puis `git checkout -b develop && git push -u origin develop`.
3. Settings → Branches (ou Rules → Rulesets) : règle sur `main` **et** `develop` : *Require a pull request before merging*, *Require approvals = 1*, *Block force pushes*. Si GitHub refuse une option, respectez la règle à la main et notez la limitation dans le README.
4. Donya clone le dépôt et s'authentifie avec son propre compte.

## 1. Issues et Project (avant tout code, chacune crée les siennes)
Créer le Project (Projects → New → Table puis ajouter les vues **Board** (Kanban : Todo / In progress / Review / Done) et **Roadmap** avec des champs Start date / Target date). Ajouter le dépôt, les 2 membres.

| Issue | Créée par | Responsable | Critères de réalisation (à cocher dans l'Issue) |
|---|---|---|---|
| Squelette HTML/CSS partagé | Diella | Diella | En-tête, nav, pied de page communs |
| Fonctionnalité A : présentation et navigation | Diella | Diella | Accueil clair, présentation, 4 liens de nav fonctionnels |
| Fonctionnalité B : catalogue d'événements | Donya | Donya | ≥ 3 événements avec titre, date, lieu, description, lien d'inscription |
| Identité visuelle | Donya | Diella | Couleurs, typos, en-tête cohérentes sur toutes les pages |
| Adaptation mobile | Diella | Donya | Menu utilisable < 768 px, texte lisible |
| Bug : cartes qui débordent | Donya | Diella | Aucun scroll horizontal à 320 px |
| Release v1.0 | Donya | Diella | Liens vérifiés, HTML valide, tag v1.0 |
| Hotfix : lien Événements cassé | Diella | Donya | Lien OK en prod, tag v1.0.1, correctif dans develop |

Roadmap : A et B en parallèle, puis identité et mobile en parallèle (dépendantes de A et B), puis bugfix, release, hotfix. Notez les dépendances dans le champ de chaque Issue (« Blocked by #N »). Les Issues du bug et du hotfix peuvent être créées au moment où ils surviennent.

## 2. Développement (ordre à respecter)

Pour chaque patch : `git apply etapes/NN-xxx.patch`, `git add -A`, `git commit -m "…(Refs #N)"`, `git push -u origin <branche>`.

**Squelette** (Diella) : branche `feature/squelette` depuis `develop`, patch `00`, PR vers `develop`, **Donya relit et approuve**, merge.

**Fonctionnalités en parallèle**
- Diella : `feature/presentation-navigation` depuis `develop`, patchs `01` puis `02`, PR (`Closes #N`), Donya relit.
- Donya : `feature/catalogue-evenements` depuis `develop`, patchs `03` puis `04`, PR, Diella relit.
- Pour chaque étudiante : **au moins une revue avec un vrai commentaire** (ex. : « le bouton S'inscrire devrait avoir un texte plus explicite », « la section activités manque d'un titre accessible »). Ne mettez pas que « LGTM ». Corrigez ensuite si le commentaire est valable.
- Merge des deux PR dans `develop`, puis `git pull`.

**Conflit (améliorations parallèles)** : les deux branches partent du **même** `develop`, avant qu'aucune ne soit fusionnée.
- Diella : `feature/identite-visuelle`, patchs `05`, `06`, PR.
- Donya : `feature/adaptation-mobile`, patchs `07`, `08`, PR.
- Fusionnez d'abord la PR d'identité. La PR mobile affichera « This branch has conflicts ».
- Donya : `git checkout feature/adaptation-mobile && git merge develop` : conflit réel dans `css/style.css` (`:root` et `.site-header`).
- Résolvez **ensemble** (appel ou partage d'écran) : le fichier `resolution/style.css` montre le résultat attendu, `resolution/style.css.avec-marqueurs` ce que vous verrez. Retirez les marqueurs `<<<<<<<`, `=======`, `>>>>>>>`, ouvrez le site, puis `git add css/style.css && git commit`, `git push`.
- Diella commente la PR mobile pour valider les choix de résolution, puis approuve. Merge dans `develop`.

**Bugfix** (Diella) : le bug existe déjà dans le code (grille `minmax(340px, 1fr)`). Ouvrez `evenements.html` en mode responsive à 360 px pour le constater, puis dans l'Issue décrivez-le avec une capture d'écran. Branche `bugfix/debordement-cartes-mobile` depuis `develop`, patch `09`, PR, Donya relit, merge.

**Release v1.0**
- Diella : `release/1.0` depuis `develop`. Vérifiez : liens, validation (https://validator.w3.org), affichage mobile. Notez les vérifications dans l'Issue. Patchs `10` (version, CHANGELOG à créer à la main) puis `11` (meta description).
- PR `release/1.0` → `main`, Donya approuve et merge. Tag : `git checkout main && git pull && git tag -a v1.0 -m "Version 1.0" && git push origin v1.0`, et créez la **Release** sur GitHub (Releases → Draft).
- Deuxième PR `release/1.0` → `develop` (rapatrier les corrections de préparation). Les deux membres y participent.

**Incident et hotfix v1.0.1**
- Constat : sur `index.html`, le lien « Événements » mène à `evenement.html` (erreur 404). Diella ouvre l'Issue.
- Donya : `hotfix/lien-evenements` depuis **`main`**, patch `12`, PR vers `main`. Diella approuve et merge, puis tag `v1.0.1` + Release GitHub.
- PR du même hotfix vers `develop` pour que le correctif soit dans les versions futures.

## 3. Finalisation
- Complétez dans `README.md` : pseudos, liens, numéros d'Issues/PR, difficultés. **Sans la correspondance pseudonyme / nom / prénom, le groupe a 0/20.**
- Vérifiez que chacune a : des commits, des Issues créées, des PR ouvertes, une revue avec commentaire, une action dans le Project.
- Project public : Settings du Project → Visibility → Public.
- Supprimer les branches fusionnées est facultatif.
- Un seul mail par groupe à avaast@myges.fr, objet « Évaluation Git/GitHub — Groupe X », avec noms, prénoms, lien du dépôt et lien du Project. Pas de ZIP.
