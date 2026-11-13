# Portfolio — François Mansare

Site personnel : finance quantitative, data science et machine learning appliqué à la finance.
Élève ingénieur en double diplôme Mines Saint-Étienne × ENSIAS.

Une seule page, bilingue (FR / EN), construite en HTML, CSS et JavaScript, servie par Vite et déployée sur Vercel.

## Lancer en local

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # génère dist/
```

## Modifier le contenu

Tout le contenu est dans `index.html`. Chaque texte existe en deux versions :

```html
<span class="fr">Texte en français</span><span class="en">English text</span>
```

- **Photo** : remplacer `public/photo.jpg` (format portrait 4:5 conseillé).
- **Projets** : section `id="projets"`. Les liens « Code ↗ » et « Demo ↗ » sont dans `.plinks`.
- **Visuels des projets** : dessinés en canvas par les fonctions `viz.*` en bas de `index.html`.
- **Défilement fluide** : Lenis 1.2.3, servi depuis `public/vendor/` (désactivé si l'appareil demande moins d'animations).
