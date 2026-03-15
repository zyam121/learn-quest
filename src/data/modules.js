export const MODULES = [
  {
    id: 1,
    title: 'HTML5',
    desc: 'Le squelette du Web',
    icon: 'fab fa-html5',
    color: '#00f2ff',
    xpReq: 0,
    parts: [
      {
        id: 'p1',
        title: 'PARTIE 1 — FONDAMENTAUX',
        desc: 'Environnement et syntaxe de base',
        steps: [
          {
            title: 'Comprendre le Web',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">🌐 Internet vs Web</h3>
<p style="margin-bottom:14px;">Internet est le réseau physique mondial. Le Web est un service applicatif qui s'y appuie. En apprenant HTML, vous créez des pages <em>web</em>, pas "Internet".</p>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="fr"&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Ma première page&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Bonjour le Monde !&lt;/h1&gt;
    &lt;p&gt;Mon premier paragraphe.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
<p style="color:#94a3b8; font-size:.9rem;">💡 Tout document HTML doit commencer par <code>&lt;!DOCTYPE html&gt;</code> — c'est la déclaration du type de document.</p>`
          },
          {
            title: 'Syntaxe et Balises',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">🛠️ Anatomie d'une balise</h3>
<p style="margin-bottom:14px;">Chaque balise HTML a une ouvrante et une fermante. Certaines sont "auto-fermantes".</p>
<pre>&lt;!-- Balise standard --&gt;
&lt;p class="intro"&gt;Mon texte ici&lt;/p&gt;

&lt;!-- Attributs --&gt;
&lt;a href="https://google.com" target="_blank"&gt;Ouvrir Google&lt;/a&gt;

&lt;!-- Auto-fermante --&gt;
&lt;img src="photo.jpg" alt="Description" width="800"&gt;
&lt;input type="text" placeholder="Tapez ici"&gt;
&lt;br&gt; &lt;!-- Retour à la ligne --&gt;</pre>`
          },
          {
            title: 'Titres et Paragraphes',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">📝 Hiérarchie du contenu</h3>
<p style="margin-bottom:14px;">HTML dispose de 6 niveaux de titres. Il ne doit y avoir qu'un seul <code>&lt;h1&gt;</code> par page (le titre principal).</p>
<pre>&lt;h1&gt;Titre principal (1 seul par page)&lt;/h1&gt;
&lt;h2&gt;Section principale&lt;/h2&gt;
&lt;h3&gt;Sous-section&lt;/h3&gt;
&lt;h4&gt;Détail&lt;/h4&gt;

&lt;p&gt;Paragraphe normal.&lt;/p&gt;
&lt;p&gt;&lt;strong&gt;Texte important (gras)&lt;/strong&gt;&lt;/p&gt;
&lt;p&gt;&lt;em&gt;Texte mis en évidence (italique)&lt;/em&gt;&lt;/p&gt;</pre>`
          }
        ]
      },
      {
        id: 'p2',
        title: 'PARTIE 2 — STRUCTURE & MÉDIAS',
        desc: 'Sémantique HTML5 et intégration médias',
        steps: [
          {
            title: 'HTML Sémantique',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">🏛️ Balises sémantiques HTML5</h3>
<p style="margin-bottom:14px;">Les balises sémantiques expliquent aux moteurs de recherche <em>le rôle</em> de chaque section.</p>
<pre>&lt;header&gt;
  &lt;nav&gt;Menu de navigation&lt;/nav&gt;
&lt;/header&gt;

&lt;main&gt;
  &lt;article&gt;
    &lt;h2&gt;Titre de l'article&lt;/h2&gt;
    &lt;p&gt;Contenu...&lt;/p&gt;
  &lt;/article&gt;
  &lt;aside&gt;Barre latérale&lt;/aside&gt;
&lt;/main&gt;

&lt;footer&gt;Pied de page &amp;copy; 2025&lt;/footer&gt;</pre>`
          },
          {
            title: 'Listes et Tableaux',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">📋 Organiser l'information</h3>
<pre>&lt;!-- Liste non-ordonnée --&gt;
&lt;ul&gt;
  &lt;li&gt;HTML&lt;/li&gt;
  &lt;li&gt;CSS&lt;/li&gt;
  &lt;li&gt;JavaScript&lt;/li&gt;
&lt;/ul&gt;

&lt;!-- Liste ordonnée --&gt;
&lt;ol&gt;
  &lt;li&gt;Apprendre HTML&lt;/li&gt;
  &lt;li&gt;Maîtriser CSS&lt;/li&gt;
  &lt;li&gt;Coder en JS&lt;/li&gt;
&lt;/ol&gt;

&lt;!-- Tableau simple --&gt;
&lt;table&gt;
  &lt;thead&gt;
    &lt;tr&gt;&lt;th&gt;Technologie&lt;/th&gt;&lt;th&gt;Rôle&lt;/th&gt;&lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;&lt;td&gt;HTML&lt;/td&gt;&lt;td&gt;Structure&lt;/td&gt;&lt;/tr&gt;
    &lt;tr&gt;&lt;td&gt;CSS&lt;/td&gt;&lt;td&gt;Style&lt;/td&gt;&lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;</pre>`
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'CSS3',
    desc: 'Design et mise en page',
    icon: 'fab fa-css3-alt',
    color: '#7000ff',
    xpReq: 200,
    parts: [
      {
        id: 'p1',
        title: 'PARTIE 1 — STYLE DE BASE',
        desc: 'Sélecteurs, couleurs et typographie',
        steps: [
          {
            title: 'Syntaxe CSS',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">🎨 Règles CSS</h3>
<p style="margin-bottom:14px;">Une règle CSS = un sélecteur + des déclarations entre accolades.</p>
<pre>/* Cibler par balise */
h1 { color: crimson; font-size: 2rem; }

/* Cibler par classe (réutilisable) */
.card {
  background: #0a1020;
  padding: 24px;
  border-radius: 12px;
}

/* Cibler par ID (unique) */
#hero { min-height: 100vh; }

/* Cibler par état */
a:hover { color: #00f2ff; }
button:active { transform: scale(0.98); }</pre>`
          },
          {
            title: 'Couleurs et Fonds',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">🖌️ Système de couleurs CSS</h3>
<pre>/* Hexadécimal */
color: #00f2ff;

/* RGB / RGBA */
background: rgba(0, 242, 255, 0.2);

/* Variables CSS (recommandé) */
:root {
  --primary: #00f2ff;
  --bg: #050a10;
  --text: #e0e6ed;
}

body {
  background: var(--bg);
  color: var(--text);
}

/* Dégradés */
.hero {
  background: linear-gradient(135deg, #050a10, #1a0030);
}
.btn {
  background: radial-gradient(circle, #00f2ff, #0044ff);
}</pre>`
          },
          {
            title: 'Box Model',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">📦 Le Modèle de Boîte</h3>
<p style="margin-bottom:14px;">Chaque élément HTML est une boîte avec des couches : contenu → padding → border → margin.</p>
<pre>.card {
  /* Contenu */
  width: 300px;
  height: 200px;

  /* Espace intérieur */
  padding: 20px;           /* tous côtés */
  padding: 10px 20px;      /* vertical | horizontal */
  padding: 10px 20px 8px 15px; /* haut | droite | bas | gauche */

  /* Bordure */
  border: 2px solid #00f2ff;
  border-radius: 12px;

  /* Espace extérieur */
  margin: 0 auto;          /* centrage horizontal */
}

/* box-sizing évite les surprises de largeur */
*, *::before, *::after {
  box-sizing: border-box;
}</pre>`
          }
        ]
      },
      {
        id: 'p2',
        title: 'PARTIE 2 — MISE EN PAGE',
        desc: 'Flexbox, Grid et Responsive',
        steps: [
          {
            title: 'Flexbox',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">📏 Flexbox — 1 dimension</h3>
<p style="margin-bottom:14px;">Flexbox est idéal pour aligner des éléments sur une ligne ou une colonne.</p>
<pre>.container {
  display: flex;
  flex-direction: row;       /* ou column */
  justify-content: center;   /* axe principal */
  align-items: center;       /* axe croisé */
  gap: 20px;
  flex-wrap: wrap;
}

/* Enfants */
.item {
  flex: 1;           /* prend l'espace disponible */
  flex: 0 0 200px;   /* fixe à 200px, ne grandit pas */
}

/* Navbar classique */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  height: 60px;
}</pre>`
          },
          {
            title: 'CSS Grid & Responsive',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">🏁 CSS Grid — 2 dimensions</h3>
<pre>.grille {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 24px;
}

/* Zone nommées */
.layout {
  display: grid;
  grid-template-areas:
    "sidebar main"
    "sidebar main";
  grid-template-columns: 260px 1fr;
}
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }

/* ── Responsive Media Queries ── */
@media (max-width: 768px) {
  .grille {
    grid-template-columns: 1fr;
  }
  .layout {
    grid-template-areas: "main" "main";
    grid-template-columns: 1fr;
  }
}</pre>`
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'BOOTSTRAP',
    desc: 'Design responsive rapide',
    icon: 'fab fa-bootstrap',
    color: '#ff0055',
    xpReq: 500,
    parts: [
      {
        id: 'p1',
        title: 'PARTIE 1 — LA GRILLE',
        desc: 'Système de 12 colonnes et breakpoints',
        steps: [
          {
            title: 'Installation et CDN',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">📦 Intégrer Bootstrap</h3>
<pre>&lt;!-- Dans le &lt;head&gt; --&gt;
&lt;link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"&gt;

&lt;!-- Avant &lt;/body&gt; --&gt;
&lt;script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"&gt;&lt;/script&gt;</pre>
<p style="margin-top:14px; color:#94a3b8;">Ou avec npm dans un projet React/Vite :</p>
<pre>npm install bootstrap

// Dans main.jsx ou App.jsx
import 'bootstrap/dist/css/bootstrap.min.css'</pre>`
          },
          {
            title: 'Système de Grille',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">📐 Container → Row → Col</h3>
<p style="margin-bottom:14px;">Bootstrap divise la page en 12 colonnes. Les classes <code>col-*</code> définissent combien de colonnes prendre à chaque breakpoint.</p>
<pre>&lt;div class="container"&gt;    &lt;!-- max-width + centré --&gt;
  &lt;div class="row g-3"&gt;    &lt;!-- ligne + espacement --&gt;

    &lt;!-- Breakpoints: xs, sm, md, lg, xl, xxl --&gt;
    &lt;div class="col-12 col-md-6 col-xl-4"&gt;Colonne 1&lt;/div&gt;
    &lt;div class="col-12 col-md-6 col-xl-4"&gt;Colonne 2&lt;/div&gt;
    &lt;div class="col-12 col-md-12 col-xl-4"&gt;Colonne 3&lt;/div&gt;

  &lt;/div&gt;
&lt;/div&gt;

&lt;!-- Utilitaires de layout --&gt;
&lt;div class="d-flex justify-content-between align-items-center"&gt;&lt;/div&gt;
&lt;div class="d-none d-md-block"&gt;Visible seulement md+&lt;/div&gt;</pre>`
          }
        ]
      },
      {
        id: 'p2',
        title: 'PARTIE 2 — COMPOSANTS',
        desc: 'Navbar, Cards, Modals et Formulaires',
        steps: [
          {
            title: 'Navbar et Cards',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">🧩 Composants clés</h3>
<pre>&lt;!-- NAVBAR --&gt;
&lt;nav class="navbar navbar-expand-lg navbar-dark bg-dark"&gt;
  &lt;div class="container"&gt;
    &lt;a class="navbar-brand" href="#"&gt;MonSite&lt;/a&gt;
    &lt;button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav"&gt;
      &lt;span class="navbar-toggler-icon"&gt;&lt;/span&gt;
    &lt;/button&gt;
    &lt;div class="collapse navbar-collapse" id="nav"&gt;
      &lt;ul class="navbar-nav ms-auto"&gt;
        &lt;li class="nav-item"&gt;&lt;a class="nav-link active" href="#"&gt;Accueil&lt;/a&gt;&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/nav&gt;

&lt;!-- CARD --&gt;
&lt;div class="card bg-dark text-white border-secondary"&gt;
  &lt;img src="image.jpg" class="card-img-top" alt="..."&gt;
  &lt;div class="card-body"&gt;
    &lt;h5 class="card-title"&gt;Titre&lt;/h5&gt;
    &lt;p class="card-text"&gt;Description.&lt;/p&gt;
    &lt;a href="#" class="btn btn-primary"&gt;Voir plus&lt;/a&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>`
          },
          {
            title: 'Utilitaires et Personnalisation',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">⚡ Classes Utilitaires</h3>
<pre>&lt;!-- Espacements: m=margin, p=padding, t/b/s/e/x/y pour direction --&gt;
&lt;div class="mt-4 mb-2 px-3"&gt;&lt;/div&gt;   &lt;!-- 0-5, ou "auto" --&gt;

&lt;!-- Texte --&gt;
&lt;p class="text-center text-white fw-bold fs-4"&gt;&lt;/p&gt;

&lt;!-- Boutons --&gt;
&lt;button class="btn btn-primary btn-lg"&gt;Grand bouton&lt;/button&gt;
&lt;button class="btn btn-outline-danger"&gt;Contour rouge&lt;/button&gt;

&lt;!-- Surcharger avec CSS custom --&gt;
&lt;style&gt;
.btn-primary {
  background: #00f2ff !important;
  border-color: #00f2ff !important;
  color: #000 !important;
}
&lt;/style&gt;</pre>`
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'JAVASCRIPT',
    desc: 'Interactivité et logique',
    icon: 'fab fa-js',
    color: '#00ff41',
    xpReq: 1200,
    parts: [
      {
        id: 'p1',
        title: 'PARTIE 1 — LOGIQUE JS',
        desc: 'Variables, fonctions et algorithmique',
        steps: [
          {
            title: 'Variables et Types',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">💾 Stocker des données</h3>
<pre>// DÉCLARATIONS
const nom = "LearnQuest";       // Chaîne (string) — immuable
let compteur = 0;               // Nombre (number) — modifiable
const actif = true;             // Booléen (boolean)

// TABLEAUX (arrays)
const modules = ["HTML", "CSS", "JS"];
modules.push("React");          // Ajouter en fin
modules[0];                     // Accéder → "HTML"
modules.length;                 // Longueur → 4

// OBJETS (objects)
const agent = {
  prenom: "Luke",
  xp: 1200,
  getRang() {
    return this.xp >= 1200 ? "Développeur" : "Apprenti";
  }
};
agent.xp = 1400;                // Modifier
agent.getRang();                // Appeler méthode</pre>`
          },
          {
            title: 'Conditions et Boucles',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">⚡ Contrôle du flux</h3>
<pre>// IF / ELSE IF / ELSE
const xp = 1500;

if (xp >= 3000)       console.log("Architecte");
else if (xp >= 2000)  console.log("Expert");
else if (xp >= 1200)  console.log("Développeur");
else if (xp >= 500)   console.log("Apprenti");
else                  console.log("Recrue");

// TERNAIRE (version courte)
const rang = xp >= 1200 ? "Développeur" : "Apprenti";

// BOUCLES
for (let i = 0; i < 5; i++) console.log(i);

const langages = ["HTML", "CSS", "JS"];
for (const lang of langages) console.log(lang);

langages.forEach((lang, index) => {
  console.log(index, lang);
});

// FILTER / MAP / REDUCE
const completes = modules.filter(m => m.done);
const titres    = modules.map(m => m.title.toUpperCase());
const totalXp   = modules.reduce((acc, m) => acc + m.xp, 0);</pre>`
          },
          {
            title: 'Fonctions et Async',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">🔧 Fonctions Modernes</h3>
<pre>// FONCTION CLASSIQUE
function saluer(prenom) {
  return \`Bienvenue, \${prenom} !\`;
}

// ARROW FUNCTION (moderne)
const saluer = (prenom) => \`Bienvenue, \${prenom} !\`;
const doubler = n => n * 2;

// ASYNC / AWAIT (pour API)
async function chargerProfil(userId) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    console.log('Profil chargé:', data);
    return data;

  } catch (err) {
    console.error('Erreur:', err.message);
    return null;
  }
}

// Appel
const profil = await chargerProfil('abc-123');</pre>`
          }
        ]
      },
      {
        id: 'p2',
        title: 'PARTIE 2 — DOM & APIS',
        desc: 'Manipulation DOM et fetch API',
        steps: [
          {
            title: 'Manipuler le DOM',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">🔍 Interagir avec la page HTML</h3>
<pre>// SÉLECTIONNER
const titre   = document.querySelector("h1");
const boutons = document.querySelectorAll(".btn");
const menu    = document.getElementById("menu");

// MODIFIER LE CONTENU
titre.textContent = "Nouveau titre";          // texte
titre.innerHTML   = "Titre avec &lt;span&gt;couleur&lt;/span&gt;";

// MODIFIER LE STYLE
titre.style.color     = "#00f2ff";
titre.style.fontSize  = "2rem";

// CLASSES CSS
titre.classList.add("active");
titre.classList.remove("hidden");
titre.classList.toggle("dark");
titre.classList.contains("active");   // true/false

// CRÉER ET AJOUTER DES ÉLÉMENTS
const carte = document.createElement("div");
carte.className = "card";
carte.innerHTML = "&lt;h2&gt;Titre&lt;/h2&gt;&lt;p&gt;Contenu&lt;/p&gt;";
document.body.appendChild(carte);

// SUPPRIMER
carte.remove();</pre>`
          },
          {
            title: 'Événements et Fetch API',
            content: `<h3 style="color:#00f2ff; margin-bottom:16px;">🖱️ Réagir aux interactions</h3>
<pre>// ÉVÉNEMENTS
const btn = document.getElementById("btn");
btn.addEventListener("click", (event) => {
  console.log("Cliqué !", event.target);
  event.preventDefault(); // Bloque le comportement par défaut
});

// Événements courants
document.addEventListener("keydown", e => {
  if (e.key === "Escape") fermerModal();
});

window.addEventListener("scroll", () => {
  console.log("Scroll Y:", window.scrollY);
});

// ── FETCH API (appels réseau) ──
async function getLessons() {
  const res = await fetch("https://api.example.com/lessons");

  if (!res.ok) throw new Error(\`HTTP error: \${res.status}\`);

  const data = await res.json();
  return data;
}

// POST avec fetch
async function submitForm(payload) {
  const res = await fetch("/api/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}</pre>`
          }
        ]
      }
    ]
  }
]

export const XP_PER_PART = 200

export function getPartKey(moduleId, partId) {
  return `${moduleId}-${partId}`
}

export function countCompletedModules(completedSteps = []) {
  return MODULES.filter(m =>
    m.parts.every(p => completedSteps.includes(getPartKey(m.id, p.id)))
  ).length
}
