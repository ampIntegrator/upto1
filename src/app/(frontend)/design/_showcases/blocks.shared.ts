/* Contenus de démonstration des blocs étapes (03), comparatif (05) et témoignages (07) :
   partagés par le catalogue et les pages de démonstration. */
import type {CompareCardProps} from '@/components/CompareCard';
import type {PriceListPlan, PriceListSingle} from '@/components/PriceList';
import type {ProcessStep} from '@/components/ProcessSteps';
import type {Testimonial} from '@/components/TestimonialCard';

export const PROCESS_STEPS: ProcessStep[] = [
  {title: 'Vous décrivez', duration: '5 min', text: "Un questionnaire guidé en 18 questions. Surface, typologie, état du bâti, travaux souhaités, contraintes. L'interface adapte les questions à votre cas.", checks: ['Aucune compétence BTP requise', 'Sauvegarde automatique entre étapes', 'Téléversement de photos & plans existants']},
  {title: 'Vous recevez', duration: '15 min', asterisk: true, text: 'Notre algorithme compare votre projet à 50 000 chantiers similaires. Détail poste par poste, fourchette de prix, hypothèses techniques, alertes structure.', checks: ['Estimation poste par poste · ± 8 %', 'Préconisation IPN / HEB si mur porteur', 'Note de calcul exportable']},
  {title: 'Un expert valide', duration: '48 h', text: "Un ingénieur BTP, 15 ans d'expérience minimum, relit, ajuste, signe. Vous recevez un PDF à votre nom, prêt à être remis au client.", checks: ['Validation par expert agréé', 'PDF à votre charte graphique', 'Recours hotline pendant 30 jours']},
];

export const AVANT = {chip: {label: 'AVANT', tone: 'danger' as const}, meta: "3 semaines d'attente", quote: "« Je ne sais pas, j'attends le devis de l'artisan… »", tone: 'cross' as const, items: ["Vous appelez · l'artisan dit « Je vous rappelle »", 'Vous relancez · 4 fois', 'Le client signe ailleurs', 'Le mandat est perdu']};
export const APRES = {chip: {label: 'APRÈS', tone: 'high' as const}, meta: '20 min chrono', quote: '« Voici le détail : 67 400 € ± 8 %. Et le PDF. »', featured: true, items: ['Vous chiffrez en visite, devant le client', 'Détail par poste, validé expert BTP', 'Rapport PDF à votre nom, sous 48 h', 'Le mandat est signé']};
export const METIERS: CompareCardProps[] = [
  {chip: {label: 'COURTIERS'}, meta: 'Closing +34 %', quote: '« Je chiffre devant le client, je signe le mandat. »', items: ['Estimation en rendez-vous', 'Argumentaire chiffré, poste par poste', 'Mandat sécurisé avant le concurrent']},
  {chip: {label: 'ARCHITECTES'}, meta: 'Du métré au prix', quote: '« Mon estimatif est prêt avant la prochaine réunion. »', featured: true, items: ['Métré importé, prix calculés', 'Détail compatible CCTP', 'Note de calcul exportable']},
  {chip: {label: 'PROMOTEURS'}, meta: 'Budget fiable', quote: "« Je fiabilise mon budget dès l'esquisse. »", items: ["Chiffrage dès l'avant-projet", 'Fourchettes ± 8 % documentées', 'Suivi des coûts en temps réel']},
];

export const TESTIMONIALS: Testimonial[] = [
  {quote: "Avant, j'attendais 3 semaines le devis. Maintenant je chiffre en visite. Le client est bluffé.", name: 'Sophie M.', role: 'Courtière · Lyon', result: '+ 12 000 € / trimestre'},
  {quote: "Un vendeur hésitait entre 3 agences. J'ai sorti un chiffrage détaillé. « Vous êtes le seul à avoir pensé à ça. » Mandat signé.", name: 'Marc D.', role: 'Agent immobilier · Paris', result: '4 mandats / mois'},
  {quote: "J'ai viré l'artisan de mon process. Plus d'attente, plus de relances. Mes clients me recommandent deux fois plus.", name: 'Julie R.', role: 'Chasseuse · Bordeaux', result: '× 2 recommandations'},
  {quote: 'Mon premier chiffrage était prêt avant la fin du rendez-vous. Le client a signé sur place, sans réfléchir.', name: 'Thomas L.', role: 'Courtier · Nantes', result: 'Closing en 1 visite'},
  {quote: 'Je ne sous-traite plus aucune estimation. Marge récupérée, délais divisés par trois sur chaque dossier.', name: 'Inès B.', role: 'Agence · Toulouse', result: 'Délais ÷ 3'},
  {quote: 'Le rapport validé par un expert rassure mes clients. Mon taux de transformation a tout simplement bondi.', name: 'Karim Z.', role: 'Mandataire · Lille', result: '+ 28 % de closing'},
];

/* Tarifs (maquettes 08 et 09) */
export const GUARANTEE = {title: 'Garantie 30 jours', text: 'Pas de mandat supplémentaire en 30 jours ? Remboursé. Sans questions.'};

export const PRICE_SINGLE: PriceListSingle = {
  features: [
    {label: 'Chiffrage travaux en 20 min', end: '97 €'},
    {label: 'Rapport certifié expert BTP', end: '147 €'},
    {label: 'Note de calcul détaillée', end: '47 €'},
    {label: 'Préconisation IPN / HEB', end: '97 €'},
    {label: 'Plans et rapports complets', end: '67 €'},
    {label: 'PDF à votre nom', end: '27 €'},
    {label: 'Historique illimité', end: '47 €'},
  ],
  total: {label: 'Valeur totale', value: '529 € / mois'},
  price: {value: '79', period: 'par mois · soit 2,60 € / jour'},
  cta: {label: 'Commencer gratuitement', href: '#'},
  mention: '1er chiffrage offert · Sans CB · Sans engagement',
  guarantee: GUARANTEE,
};

export const PLANS: PriceListPlan[] = [
  {name: 'Solo', tagline: 'Pour démarrer en solo', price: {value: '49'}, cta: {label: 'Commencer', href: '#'}, features: ['Chiffrage travaux en 20 min', 'Rapport certifié expert BTP', 'Note de calcul détaillée', 'PDF à votre nom'], mention: 'Sans CB · Sans engagement', guarantee: GUARANTEE},
  {name: 'Pro', tagline: 'Le choix des courtiers actifs', price: {value: '79'}, cta: {label: 'Commencer gratuitement', href: '#'}, featured: true, inherits: 'Solo', features: ['Préconisation IPN / HEB', 'Plans et rapports complets', 'Historique illimité', 'Support prioritaire'], mention: 'Sans CB · Sans engagement', guarantee: GUARANTEE},
  {name: 'Agence', tagline: 'Pour les équipes', price: {value: '149'}, cta: {label: 'Parler à un expert', href: '#'}, inherits: 'Pro', features: ['Comptes multi-utilisateurs', 'Marque blanche complète', 'API & intégrations', 'Account manager dédié'], mention: 'Sans CB · Sans engagement', guarantee: GUARANTEE},
];
