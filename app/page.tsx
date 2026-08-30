"use client";

import { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Brain,
  Check,
  ChevronDown,
  CircleHelp,
  Cuboid,
  Eye,
  Filter,
  Lightbulb,
  Link as LinkIcon,
  MessageCircleMore,
  MousePointerClick,
  Printer,
  RefreshCw,
  Shapes,
  Sparkles,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Scenario = {
  id: number;
  level: "Cycle 2" | "Cycle 3";
  family: "Nombres" | "Opérations" | "Fractions" | "Proportionnalité";
  title: string;
  problem: string;
  limited: string;
  risk: string;
  concrete: string;
  pictorial: string;
  abstract: string;
  answer: string;
  why: string;
  visual:
    | "make-ten"
    | "addition"
    | "compare"
    | "area"
    | "division"
    | "fraction"
    | "fraction-add"
    | "decimal"
    | "ratio"
    | "unknown";
};

const scenarios: Scenario[] = [
  {
    id: 1,
    level: "Cycle 2",
    family: "Nombres",
    title: "Faire 10 : penser en compléments",
    problem: "Mila a 7 jetons. Combien lui en manque-t-il pour en avoir 10 ?",
    limited: "Compter un à un à partir de 7, puis retenir « 3 » sans relier les trois nombres.",
    risk: "La réponse est trouvée, mais la structure 7 + 3 = 10 reste fragile et se transfère peu au calcul mental.",
    concrete: "Remplir un cadre de 10 avec 7 jetons rouges, puis compléter les trois cases vides.",
    pictorial: "Dessiner le lien partie–partie–tout : 7 et ? composent 10.",
    abstract: "7 + 3 = 10 ; 10 − 7 = 3.",
    answer: "Il manque 3 jetons.",
    why: "Le même tout est relié à deux additions et deux soustractions : l’élève construit un réseau de faits, pas une réponse isolée.",
    visual: "make-ten",
  },
  {
    id: 2,
    level: "Cycle 2",
    family: "Opérations",
    title: "38 + 27 : donner du sens à la retenue",
    problem: "Une classe collecte 38 bouchons lundi et 27 mardi. Combien en a-t-elle ?",
    limited: "Poser immédiatement l’addition et écrire une petite retenue « 1 » à appliquer par règle.",
    risk: "L’algorithme peut réussir sans compréhension de l’échange 10 unités = 1 dizaine ; les erreurs deviennent difficiles à diagnostiquer.",
    concrete: "Assembler 3 dizaines et 8 unités, puis 2 dizaines et 7 unités. Échanger 10 unités contre une dizaine.",
    pictorial: "Représenter 50 + 15, puis 60 + 5.",
    abstract: "38 + 27 = 30 + 20 + 8 + 7 = 50 + 15 = 65.",
    answer: "La classe a 65 bouchons.",
    why: "La retenue cesse d’être un signe mystérieux : elle devient un échange de valeur de position.",
    visual: "addition",
  },
  {
    id: 3,
    level: "Cycle 2",
    family: "Opérations",
    title: "Comparer : combien de plus ?",
    problem: "Léo a 52 cartes et Inès en a 37. Combien Léo en a-t-il de plus ?",
    limited: "Repérer le mot « plus » et additionner, ou appliquer 52 − 37 sans modéliser la comparaison.",
    risk: "Les mots deviennent de faux signaux opératoires ; un énoncé reformulé suffit à déstabiliser l’élève.",
    concrete: "Aligner deux trains de cubes de même origine et isoler le morceau qui dépasse.",
    pictorial: "Tracer deux barres alignées : 52 au-dessus, 37 en dessous, puis marquer l’écart inconnu.",
    abstract: "52 − 37 = 15 ; vérification : 37 + 15 = 52.",
    answer: "Léo a 15 cartes de plus.",
    why: "Le schéma encode la relation entre les quantités avant le choix de l’opération.",
    visual: "compare",
  },
  {
    id: 4,
    level: "Cycle 2",
    family: "Opérations",
    title: "Aire : comprendre 6 × 4",
    problem: "Un tapis rectangulaire mesure 6 carreaux sur 4. Combien contient-il de carreaux ?",
    limited: "Donner d’emblée la formule longueur × largeur et demander de l’appliquer.",
    risk: "L’élève peut confondre aire et périmètre ou oublier la formule faute d’avoir construit l’unité d’aire.",
    concrete: "Paver le rectangle avec 24 carrés-unités, sans trou ni chevauchement.",
    pictorial: "Organiser le pavage en 4 rangées de 6 et relier 6 + 6 + 6 + 6 à 4 × 6.",
    abstract: "A = 6 × 4 = 24 carreaux².",
    answer: "Le tapis contient 24 carreaux.",
    why: "La multiplication, le tableau rectangulaire et la mesure d’aire deviennent trois vues d’une même structure.",
    visual: "area",
  },
  {
    id: 5,
    level: "Cycle 2",
    family: "Opérations",
    title: "Division euclidienne : quotient et reste",
    problem: "On range 29 crayons dans des boîtes de 4. Combien de boîtes pleines et combien de crayons restent ?",
    limited: "Poser 29 ÷ 4 ou réciter la table de 4, sans interpréter le quotient et le reste.",
    risk: "Une réponse comme 7,25 peut être produite sans vérifier qu’un quart de boîte n’est pas une boîte pleine.",
    concrete: "Former des groupes de 4 crayons jusqu’à ce qu’il ne soit plus possible de compléter une boîte.",
    pictorial: "Dessiner 7 paquets de 4 et un point isolé.",
    abstract: "29 = 7 × 4 + 1, avec 1 < 4.",
    answer: "7 boîtes pleines et 1 crayon restant.",
    why: "Le calcul et son interprétation restent attachés au contexte ; le reste retrouve son sens.",
    visual: "division",
  },
  {
    id: 6,
    level: "Cycle 3",
    family: "Fractions",
    title: "Prendre 3/4 de 28",
    problem: "Les trois quarts des 28 élèves participent à l’atelier. Combien d’élèves cela représente-t-il ?",
    limited: "Enseigner directement « diviser par 4 puis multiplier par 3 » comme recette.",
    risk: "La procédure fonctionne ici, mais l’élève ne sait pas pourquoi 4 désigne le nombre de parts égales.",
    concrete: "Distribuer 28 jetons dans 4 groupes égaux, puis réunir 3 groupes.",
    pictorial: "Partager une barre de 28 en 4 parts de 7 et en colorier 3.",
    abstract: "28 ÷ 4 = 7 ; 7 × 3 = 21, donc 3/4 × 28 = 21.",
    answer: "21 élèves participent.",
    why: "Le dénominateur organise le partage ; le numérateur indique le nombre de parts retenues.",
    visual: "fraction",
  },
  {
    id: 7,
    level: "Cycle 3",
    family: "Fractions",
    title: "2/3 + 1/4 : voir l’unité commune",
    problem: "Quelle longueur obtient-on en réunissant 2/3 m et 1/4 m de ruban ?",
    limited: "Ajouter les numérateurs et les dénominateurs : 3/7, ou imposer le PPCM sans représentation.",
    risk: "La nécessité d’un même type de parts n’est pas comprise ; la règle paraît arbitraire.",
    concrete: "Superposer des bandes-fractions de même longueur-unité.",
    pictorial: "Partager chaque unité en 12 : 2/3 = 8/12 et 1/4 = 3/12.",
    abstract: "2/3 + 1/4 = 8/12 + 3/12 = 11/12.",
    answer: "La longueur totale est 11/12 m.",
    why: "Le dénominateur commun devient une unité de mesure commune, non une formalité technique.",
    visual: "fraction-add",
  },
  {
    id: 8,
    level: "Cycle 3",
    family: "Nombres",
    title: "Décimaux : 2,35 + 0,7",
    problem: "Un ruban de 2,35 m est prolongé de 0,7 m. Quelle est sa nouvelle longueur ?",
    limited: "Aligner les nombres par la droite comme des entiers, ou calculer 235 + 7.",
    risk: "Les chiffres sont traités comme des symboles sans valeur de position ; 0,7 n’est pas identifié à 0,70.",
    concrete: "Composer 2 unités, 3 dixièmes et 5 centièmes, puis ajouter 7 dixièmes et échanger 10 dixièmes contre 1 unité.",
    pictorial: "Placer les chiffres dans un tableau unités–dixièmes–centièmes et écrire 0,70.",
    abstract: "2,35 + 0,70 = 3,05.",
    answer: "Le ruban mesure 3,05 m.",
    why: "L’alignement de la virgule découle de l’alignement des unités de même rang.",
    visual: "decimal",
  },
  {
    id: 9,
    level: "Cycle 3",
    family: "Proportionnalité",
    title: "Ratio 3 : 5 et quantité totale",
    problem: "Dans un sac, le ratio billes rouges : billes bleues est 3 : 5. Il y a 32 billes. Combien de chaque couleur ?",
    limited: "Installer trop tôt un produit en croix ou une équation, sans identifier l’unité multiplicative.",
    risk: "Le ratio est lu comme deux quantités fixes plutôt que comme une relation de 8 parts égales.",
    concrete: "Construire des trains de cubes : 3 unités rouges et 5 unités bleues.",
    pictorial: "Tracer une barre de 8 parts égales : 32 ÷ 8 = 4 par part.",
    abstract: "Rouges : 3 × 4 = 12 ; bleues : 5 × 4 = 20.",
    answer: "12 billes rouges et 20 billes bleues.",
    why: "Le modèle unitaire rend visible ce qui varie et ce qui reste invariant dans le ratio.",
    visual: "ratio",
  },
  {
    id: 10,
    level: "Cycle 3",
    family: "Proportionnalité",
    title: "Total et différence : l’algèbre avant les lettres",
    problem: "Léo et Maya ont 74 cartes au total. Léo en a 18 de plus que Maya. Combien chacun en a-t-il ?",
    limited: "Procéder par essais successifs ou poser immédiatement un système de deux équations.",
    risk: "L’essai masque la structure ; les lettres peuvent ajouter une charge symbolique avant que la relation soit comprise.",
    concrete: "Construire deux bandes égales, puis ajouter 18 cubes à celle de Léo.",
    pictorial: "Retirer visuellement l’excédent 18 du total : les 56 cartes restantes forment deux parts égales.",
    abstract: "Maya : (74 − 18) ÷ 2 = 28. Léo : 28 + 18 = 46.",
    answer: "Maya a 28 cartes et Léo 46.",
    why: "Le schéma-barres prépare le raisonnement algébrique : même inconnue, relation visible, opérations justifiées.",
    visual: "unknown",
  },
];

const lessonSteps = [
  { phase: "Disponibilité", title: "1. Diagnostiquer sans étiqueter", text: "Réactiver un prérequis par une question courte, observer les stratégies et repérer l’obstacle précis. Le point de départ est ce que l’élève comprend déjà.", prompt: "Montre 3 façons de composer 12." },
  { phase: "Engagement", title: "2. Poser un problème fécond", text: "Introduire une situation assez simple pour être explorée, mais assez riche pour faire émerger le concept visé. Les objets servent à penser, pas à décorer.", prompt: "Comment le prouver avec les cubes ?" },
  { phase: "Engagement", title: "3. Comparer et verbaliser", text: "Faire circuler plusieurs procédures. L’enseignant stabilise un vocabulaire précis et relie les gestes aux relations mathématiques.", prompt: "Qu’est-ce qui est pareil ? Qu’est-ce qui change ?" },
  { phase: "Engagement", title: "4. Représenter", text: "Passer des objets à une image structurée : schéma-barres, tableau de numération, droite graduée, diagramme ou dessin géométrique.", prompt: "Quel dessin garde seulement l’information utile ?" },
  { phase: "Maîtrise", title: "5. Abstraire et institutionnaliser", text: "Nommer la propriété, écrire les symboles et produire une trace courte. L’écriture arrive après la construction du sens, sans renoncer à la rigueur.", prompt: "Écris une égalité qui raconte le schéma." },
  { phase: "Maîtrise", title: "6. Varier, automatiser, réfléchir", text: "Proposer des exemples proches qui font varier un seul paramètre, puis des transferts. Terminer par une justification ou une auto-évaluation.", prompt: "Cette méthode fonctionnerait-elle encore si… ?" },
];

const checklist = [
  "Un objectif conceptuel unique et explicite",
  "Les prérequis et erreurs probables anticipés",
  "Au moins deux représentations reliées entre elles",
  "Des questions de justification préparées",
  "Une variation graduée, pas une répétition mécanique",
  "Une preuve observable de la maîtrise attendue",
];

function MathVisual({ type }: { type: Scenario["visual"] }) {
  if (type === "make-ten") return <div className="ten-frame" role="img" aria-label="Cadre de dix avec sept cases rouges et trois cases turquoise">{Array.from({ length: 10 }, (_, i) => <span key={i} className={i < 7 ? "filled coral" : "filled aqua"} />)}</div>;
  if (type === "addition") return <div className="place-composition" role="img" aria-label="Cinq dizaines et quinze unités qui deviennent six dizaines et cinq unités"><div><b>5 D</b><span>+</span><b>15 U</b></div><ArrowRight aria-hidden="true" /><div><b>6 D</b><span>+</span><b>5 U</b></div></div>;
  if (type === "compare") return <div className="bar-stack" role="img" aria-label="Barre de 52 comparée à une barre de 37, avec un écart de 15"><div className="bar-row"><span>Léo</span><i className="bar coral-bar" style={{ width: "100%" }}>52</i></div><div className="bar-row"><span>Inès</span><i className="bar aqua-bar" style={{ width: "71%" }}>37</i><em>15 ?</em></div></div>;
  if (type === "area") return <div className="area-grid" role="img" aria-label="Rectangle de quatre rangées et six colonnes, soit vingt-quatre carrés">{Array.from({ length: 24 }, (_, i) => <span key={i}>{i % 6 === 0 ? <small>{i / 6 + 1}</small> : null}</span>)}</div>;
  if (type === "division") return <div className="group-visual" role="img" aria-label="Sept groupes de quatre points et un point restant">{Array.from({ length: 7 }, (_, i) => <span className="dot-group" key={i}>{Array.from({ length: 4 }, (_, j) => <i key={j} />)}</span>)}<span className="remainder"><i /> reste</span></div>;
  if (type === "fraction") return <div className="fraction-four" role="img" aria-label="Barre de vingt-huit divisée en quatre parts de sept, dont trois sont colorées">{[7, 7, 7, 7].map((n, i) => <span className={i < 3 ? "active" : ""} key={i}>{n}</span>)}</div>;
  if (type === "fraction-add") return <div className="twelfths" role="img" aria-label="Deux tiers convertis en huit douzièmes et un quart converti en trois douzièmes, total onze douzièmes"><div>{Array.from({ length: 12 }, (_, i) => <i className={i < 8 ? "coral-cell" : ""} key={i} />)}<b>8/12</b></div><span>+</span><div>{Array.from({ length: 12 }, (_, i) => <i className={i < 3 ? "aqua-cell" : ""} key={i} />)}<b>3/12</b></div></div>;
  if (type === "decimal") return <div className="decimal-table" role="img" aria-label="Addition posée de 2,35 et 0,70 dans un tableau unités dixièmes centièmes"><span>unités</span><span>dixièmes</span><span>centièmes</span><b>2</b><b>3</b><b>5</b><b>0</b><b>7</b><b>0</b><strong>3</strong><strong>0</strong><strong>5</strong></div>;
  if (type === "ratio") return <div className="ratio-bars" role="img" aria-label="Trois parts rouges et cinq parts bleues, quatre billes par part"><div>{Array.from({ length: 3 }, (_, i) => <i key={i}>4</i>)}</div><div>{Array.from({ length: 5 }, (_, i) => <i key={i}>4</i>)}</div></div>;
  return <div className="unknown-bars" role="img" aria-label="Deux barres égales de 28, celle de Léo prolongée de 18"><div><span>28</span><i>+ 18</i><b>46</b></div><div><span>28</span><b>28</b></div><em>Total : 74</em></div>;
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [level, setLevel] = useState("Tous");
  const [family, setFamily] = useState("Toutes");
  const [openScenarios, setOpenScenarios] = useState<Set<number>>(new Set([1]));
  const [checks, setChecks] = useState<Set<number>>(new Set());
  const filteredScenarios = useMemo(() => scenarios.filter((scenario) => (level === "Tous" || scenario.level === level) && (family === "Toutes" || scenario.family === family)), [level, family]);
  const toggleScenario = (id: number) => setOpenScenarios((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const randomScenario = () => { const source = filteredScenarios.length ? filteredScenarios : scenarios; const chosen = source[Math.floor(Math.random() * source.length)]; setOpenScenarios((current) => new Set(current).add(chosen.id)); window.setTimeout(() => document.getElementById(`situation-${chosen.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 20); };

  return (
    <main>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Retour en haut"><span className="brand-mark"><i /><i /><i /></span><span><b>Maths visibles</b><small>Méthode de Singapour</small></span></a>
        <nav aria-label="Navigation principale"><a href="#methode">La méthode</a><a href="#seance">Une séance</a><a href="#situations">10 situations</a><a href="#mise-en-oeuvre">Mise en œuvre</a></nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles aria-hidden="true" /> Guide interactif · Primaire</p>
          <h1>Comprendre les maths <span>avant</span> de les écrire.</h1>
          <p className="hero-intro">La méthode dite « de Singapour » fait passer l’élève de l’expérience au dessin, puis aux symboles — avec la résolution de problèmes comme fil conducteur.</p>
          <div className="hero-actions"><Button asChild size="lg" className="primary-button"><a href="#methode">Explorer la méthode <ArrowDown /></a></Button><Button asChild size="lg" variant="outline" className="outline-button"><a href="#situations">Voir les cas résolus <ArrowRight /></a></Button></div>
          <div className="hero-metrics" aria-label="Repères clés"><div><strong>1</strong><span>problème<br />au centre</span></div><div><strong>3</strong><span>registres<br />reliés</span></div><div><strong>5</strong><span>composantes<br />du cadre</span></div><div><strong>10</strong><span>situations<br />comparées</span></div></div>
        </div>

        <div className="hero-lab" aria-label="Démonstration concret imagé abstrait">
          <div className="lab-heading"><span><MousePointerClick aria-hidden="true" /> Même idée, trois langages</span><b>¾</b></div>
          <Tabs defaultValue="concret" className="representation-tabs">
            <TabsList className="representation-list" aria-label="Changer de représentation"><TabsTrigger value="concret">1. Manipuler</TabsTrigger><TabsTrigger value="image">2. Représenter</TabsTrigger><TabsTrigger value="abstrait">3. Abstraire</TabsTrigger></TabsList>
            <TabsContent value="concret" className="representation-panel"><div className="fraction-discs" role="img" aria-label="Douze jetons dont neuf colorés">{Array.from({ length: 12 }, (_, i) => <i className={i < 9 ? "selected" : ""} key={i} />)}</div><p><b>Manipuler.</b> Partager 12 jetons en 4 groupes égaux, puis en retenir 3.</p></TabsContent>
            <TabsContent value="image" className="representation-panel"><div className="hero-fraction-bar" role="img" aria-label="Barre divisée en quatre, trois parts colorées"><i /><i /><i /><i /></div><p><b>Représenter.</b> Une barre rend visibles le tout, les 4 parts égales et les 3 parts choisies.</p></TabsContent>
            <TabsContent value="abstrait" className="representation-panel"><div className="equation-card" aria-label="Trois quarts de douze égale neuf"><span>3</span><i /><span>4</span><b>× 12 = 9</b></div><p><b>Abstraire.</b> Les symboles condensent une relation déjà comprise et expliquée.</p></TabsContent>
          </Tabs>
          <p className="lab-note"><Lightbulb aria-hidden="true" /> On ne quitte pas définitivement le concret : on y revient si le sens se brouille.</p>
        </div>
      </section>

      <div id="contenu">
        <section className="definition-band" aria-label="Définition et nuance">
          <div><span>En une phrase</span><p>Une progression cohérente qui articule <b>sens, représentations, langage, pratique et réflexion</b> pour rendre l’élève capable de résoudre des problèmes nouveaux.</p></div>
          <aside><CircleHelp aria-hidden="true" /><p><b>Ce n’est pas une recette unique.</b> Le programme officiel singapourien combine activités, investigation et enseignement explicite selon les besoins. « CPA » et schémas-barres sont des outils majeurs, pas la totalité de la pédagogie.</p></aside>
        </section>

        <section className="section method-section" id="methode">
          <div className="section-heading"><p className="section-number">01 — Architecture</p><h2>Le problème au centre, cinq forces autour.</h2><p>Le cadre officiel de Singapour ne réduit pas les mathématiques au calcul. La compétence à résoudre des problèmes s’appuie sur cinq composantes qui se renforcent mutuellement.</p></div>
          <div className="framework-grid">
            <div className="framework-core"><div className="orbit orbit-one"><span>Concepts</span></div><div className="orbit orbit-two"><span>Habiletés</span></div><div className="orbit orbit-three"><span>Processus</span></div><div className="orbit orbit-four"><span>Métacognition</span></div><div className="orbit orbit-five"><span>Attitudes</span></div><div className="core-circle"><Target aria-hidden="true" /><b>Résoudre</b><span>des problèmes</span></div></div>
            <div className="component-list">
              <article><span>01</span><div><h3>Concepts</h3><p>Comprendre les propriétés, relations, opérations et grandes idées : équivalence, mesure, proportionnalité…</p></div></article>
              <article><span>02</span><div><h3>Habiletés</h3><p>Calculer avec précision, estimer, visualiser l’espace, traiter les données et utiliser les outils.</p></div></article>
              <article><span>03</span><div><h3>Processus</h3><p>Raisonner, représenter, communiquer, appliquer, modéliser et généraliser.</p></div></article>
              <article><span>04</span><div><h3>Métacognition</h3><p>Choisir une stratégie, surveiller sa démarche, changer de voie et vérifier la vraisemblance.</p></div></article>
              <article><span>05</span><div><h3>Attitudes</h3><p>Développer confiance, intérêt, persévérance et conviction que les mathématiques ont du sens.</p></div></article>
            </div>
          </div>
          <div className="pillars-heading"><p className="section-number">Les six piliers opératoires</p><p>Chaque pilier renvoie aux situations qui le rendent concret.</p></div>
          <div className="pillars-grid">
            <article className="pillar coral-card"><span className="pillar-icon"><Cuboid /></span><small>Pilier 1</small><h3>Concret → imagé → abstrait</h3><p>Un concept circule entre objets, représentations structurées et notations. Chaque passage est explicité.</p><div><LinkIcon /> <a href="#situation-1">Faire 10</a><a href="#situation-2">Retenue</a><a href="#situation-6">Fractions</a></div></article>
            <article className="pillar aqua-card"><span className="pillar-icon"><Shapes /></span><small>Pilier 2</small><h3>Modélisation par schémas</h3><p>Les schémas-barres représentent tout, parties, comparaison, transformation, ratio ou inconnue.</p><div><LinkIcon /> <a href="#situation-3">Comparaison</a><a href="#situation-9">Ratio</a><a href="#situation-10">Inconnue</a></div></article>
            <article className="pillar yellow-card"><span className="pillar-icon"><RefreshCw /></span><small>Pilier 3</small><h3>Variation intelligente</h3><p>Les exercices font varier un élément à la fois pour révéler une structure, une invariance ou un contraste.</p><div><LinkIcon /> <a href="#situation-4">Aire</a><a href="#situation-7">Équivalence</a></div></article>
            <article className="pillar violet-card"><span className="pillar-icon"><MessageCircleMore /></span><small>Pilier 4</small><h3>Langage et discussion</h3><p>L’élève décrit, compare et justifie. Le professeur reformule avec un lexique précis et des phrases mathématiques.</p><div><LinkIcon /> <a href="#seance">Questions-clés</a><a href="#situation-5">Reste</a></div></article>
            <article className="pillar green-card"><span className="pillar-icon"><Brain /></span><small>Pilier 5</small><h3>Maîtrise en profondeur</h3><p>On traite moins d’idées à la fois, mais on connecte plusieurs exemples avant de complexifier.</p><div><LinkIcon /> <a href="#situation-8">Décimaux</a><a href="#situations">Tous les cas</a></div></article>
            <article className="pillar blue-card"><span className="pillar-icon"><Eye /></span><small>Pilier 6</small><h3>Évaluation formative</h3><p>Observer les stratégies, écouter les explications et ajuster le support avant que l’erreur se fossilise.</p><div><LinkIcon /> <a href="#mise-en-oeuvre">Checklist</a><a href="#preuves">Ce que dit la recherche</a></div></article>
          </div>
        </section>

        <section className="lesson-section" id="seance"><div className="section lesson-inner">
          <div className="section-heading light-heading"><p className="section-number">02 — En classe</p><h2>Une séance est un chemin, pas une fiche à finir.</h2><p>Cliquez sur les étapes. La durée varie selon l’idée travaillée et les réponses de la classe ; le mouvement conceptuel, lui, reste lisible.</p></div>
          <div className="lesson-workbench">
            <div className="stepper" role="tablist" aria-label="Étapes d’une séance">{lessonSteps.map((step, index) => <button key={step.title} type="button" role="tab" aria-selected={activeStep === index} className={activeStep === index ? "active" : ""} onClick={() => setActiveStep(index)}><span>{index + 1}</span><i /><small>{step.phase}</small></button>)}</div>
            <div className="step-detail" role="tabpanel" aria-live="polite"><div className="step-label">Étape {activeStep + 1} · {lessonSteps[activeStep].phase}</div><h3>{lessonSteps[activeStep].title}</h3><p>{lessonSteps[activeStep].text}</p><blockquote><MessageCircleMore aria-hidden="true" /><span><small>Question possible</small>{lessonSteps[activeStep].prompt}</span></blockquote></div>
            <aside className="teacher-role"><span><Eye aria-hidden="true" /></span><h3>Le rôle décisif du professeur</h3><p>Choisir le bon exemple, anticiper les erreurs, faire comparer les démarches et décider quand retirer le support. Le matériel ne produit pas seul la compréhension.</p><ul><li><Check /> Faire expliciter le « pourquoi »</li><li><Check /> Relier les représentations</li><li><Check /> Maintenir une ambition commune</li></ul></aside>
          </div>
        </div></section>

        <section className="section scenario-section" id="situations">
          <div className="section-heading scenario-heading"><div><p className="section-number">03 — Laboratoire</p><h2>10 situations résolues, approche contre raccourci.</h2></div><p>Les approches dites « limitées » ne sont pas toujours mauvaises : elles le deviennent lorsqu’elles arrivent seules, trop tôt, ou sans retour au sens.</p></div>
          <div className="filters" aria-label="Filtrer les situations"><span><Filter aria-hidden="true" /> Filtrer</span><div className="filter-group" aria-label="Par niveau">{["Tous", "Cycle 2", "Cycle 3"].map((item) => <Button key={item} size="sm" variant={level === item ? "default" : "outline"} onClick={() => setLevel(item)}>{item}</Button>)}</div><div className="filter-group family-filter" aria-label="Par domaine">{["Toutes", "Nombres", "Opérations", "Fractions", "Proportionnalité"].map((item) => <Button key={item} size="sm" variant={family === item ? "default" : "outline"} onClick={() => setFamily(item)}>{item}</Button>)}</div><Button size="sm" variant="ghost" className="random-button" onClick={randomScenario}><RefreshCw /> Au hasard</Button></div>
          <p className="result-count" aria-live="polite">{filteredScenarios.length} situation{filteredScenarios.length > 1 ? "s" : ""} affichée{filteredScenarios.length > 1 ? "s" : ""}</p>
          <div className="scenario-list">{filteredScenarios.map((scenario) => { const isOpen = openScenarios.has(scenario.id); return <article className={`scenario-card ${isOpen ? "open" : ""}`} id={`situation-${scenario.id}`} key={scenario.id}>
            <button className="scenario-summary" type="button" aria-expanded={isOpen} aria-controls={`solution-${scenario.id}`} onClick={() => toggleScenario(scenario.id)}><span className="scenario-index">{String(scenario.id).padStart(2, "0")}</span><span className="scenario-title"><small>{scenario.level} · {scenario.family}</small><strong>{scenario.title}</strong><em>{scenario.problem}</em></span><span className="expand-label">{isOpen ? "Replier" : "Résoudre"}<ChevronDown /></span></button>
            {isOpen && <div className="scenario-body" id={`solution-${scenario.id}`}><div className="visual-stage"><span>La structure rendue visible</span><MathVisual type={scenario.visual} /></div><div className="approach singapore-approach"><div className="approach-label"><span>Approche structurée</span><b>Méthode de Singapour</b></div><ol><li><span>C</span><div><b>Concret</b><p>{scenario.concrete}</p></div></li><li><span>I</span><div><b>Imagé</b><p>{scenario.pictorial}</p></div></li><li><span>A</span><div><b>Abstrait</b><p>{scenario.abstract}</p></div></li></ol><div className="answer"><Check /> <span><small>Réponse vérifiée</small><b>{scenario.answer}</b></span></div></div><div className="approach limited-approach"><div className="approach-label"><span>Approche fréquente</span><b>Raccourci moins productif</b></div><p>{scenario.limited}</p><div className="risk"><CircleHelp /><span><small>Pourquoi cela limite l’apprentissage</small>{scenario.risk}</span></div></div><div className="transfer-note"><Brain /><p><b>Ce que l’élève pourra transférer.</b> {scenario.why}</p></div></div>}
          </article>; })}</div>
        </section>

        <section className="implementation-section" id="mise-en-oeuvre"><div className="section implementation-grid">
          <div className="implementation-copy"><p className="section-number">04 — Mise en œuvre</p><h2>Préparer une séquence qui garde le cap.</h2><p>Cette checklist ne remplace ni la progression ni la formation didactique. Elle vérifie que les conditions essentielles sont réunies avant d’entrer en classe.</p><div className="toolkit-strip"><span><Cuboid /> Cubes & matériel base 10</span><span><Shapes /> Bandes & schémas-barres</span><span><MessageCircleMore /> Phrases et preuves orales</span><span><RefreshCw /> Séries d’exemples variés</span></div></div>
          <div className="checklist-card"><div className="checklist-header"><span>Votre préparation</span><b>{checks.size}/{checklist.length}</b></div><div className="progress-track" aria-label={`${checks.size} critères cochés sur ${checklist.length}`}><i style={{ width: `${(checks.size / checklist.length) * 100}%` }} /></div><div className="check-items">{checklist.map((item, index) => { const checked = checks.has(index); return <label key={item} className={checked ? "checked" : ""}><input type="checkbox" checked={checked} onChange={() => setChecks((current) => { const next = new Set(current); if (next.has(index)) next.delete(index); else next.add(index); return next; })} /><span><Check /></span>{item}</label>; })}</div><p className="check-message">{checks.size === checklist.length ? "Votre préparation relie objectif, représentations, langage et évaluation." : "Cochez les critères au fil de votre préparation."}</p><Button variant="outline" className="print-button" onClick={() => window.print()}><Printer /> Imprimer ce guide</Button></div>
        </div></section>

        <section className="section evidence-section" id="preuves">
          <div className="section-heading"><p className="section-number">05 — Preuves et limites</p><h2>Prometteuse, exigeante, jamais magique.</h2></div>
          <div className="evidence-grid"><article className="evidence-main"><span className="evidence-stat">+2 mois</span><h3>Un résultat encourageant, pas un verdict universel</h3><p>Un essai anglais de l’approche <i>Mathematics Mastery</i>, inspirée de Singapour, a observé en moyenne deux mois de progrès supplémentaires en première année auprès de 5 108 élèves de 90 écoles, avec un niveau de preuve évalué à 3/5 par l’EEF.</p><a href="https://educationendowmentfoundation.org.uk/projects-and-evaluation/projects/mathematics-mastery-primary" target="_blank" rel="noreferrer">Lire l’évaluation indépendante <ArrowRight /></a></article><div className="evidence-notes"><article><b>Ce que cela soutient</b><p>Approfondir les concepts, utiliser objets et images, structurer le langage et placer la résolution de problèmes au premier plan.</p></article><article><b>Ce que cela ne prouve pas</b><p>Que tout manuel estampillé « Singapour » fonctionne, que le matériel suffit, ou que les classements internationaux ont une cause unique.</p></article><article><b>Condition de réussite</b><p>Une progression cohérente, un enseignement expert, du temps de préparation, des échanges entre enseignants et une évaluation formative réelle.</p></article></div></div>
          <div className="sources"><h3><BookOpen /> Sources essentielles</h3><div><a href="https://www.moe.gov.sg/media/files/primary/2021%20Primary%20Mathematics%20Syllabus%20P1%20to%20P6%20Updated%20October%202025.pdf" target="_blank" rel="noreferrer"><span>01</span><b>Ministry of Education Singapore</b><small>Primary Mathematics Syllabus, mis à jour en octobre 2025</small><ArrowRight /></a><a href="https://educationendowmentfoundation.org.uk/projects-and-evaluation/projects/mathematics-mastery-primary" target="_blank" rel="noreferrer"><span>02</span><b>Education Endowment Foundation</b><small>Évaluation indépendante d’Ark Mathematics Mastery</small><ArrowRight /></a><a href="https://www.education.gouv.fr/sites/default/files/document/T%C3%A9l%C3%A9charger%20le%20rapport%20%26quot%3B21%20mesures%20pour%20l%26%23039%3Benseignement%20des%20math%C3%A9matiques%26quot%3B-235566.pdf" target="_blank" rel="noreferrer"><span>03</span><b>Rapport Villani–Torossian</b><small>Manipulation, verbalisation, abstraction et enseignement explicite</small><ArrowRight /></a><a href="https://edubase.eduscol.education.fr/fiche/24549" target="_blank" rel="noreferrer"><span>04</span><b>Éduscol · Édubase</b><small>Ressource Cycle 3 sur les schémas en barres</small><ArrowRight /></a></div></div>
        </section>
      </div>

      <footer><div><span className="brand-mark"><i /><i /><i /></span><p><b>Maths visibles</b><small>Comprendre · représenter · raisonner</small></p></div><p>Guide pédagogique de synthèse · Les exemples sont originaux et peuvent être adaptés au niveau réel des élèves.</p><a href="#top">Revenir en haut <ArrowDown /></a></footer>
    </main>
  );
}
