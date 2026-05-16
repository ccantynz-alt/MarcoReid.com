import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Marco Reid. Comment nous recueillons, utilisons, protégeons et partageons vos données en vertu de la LPRPDE, de la Loi 25 du Québec et du RGPD.",
};

const sections = [
  {
    title: "1. Qui sommes-nous",
    content:
      "Reid & Associates Ltd (« Marco Reid », « nous », « notre », « nos ») est le responsable du traitement de vos données personnelles. Nous sommes une société néo-zélandaise exploitant la plateforme Marco Reid à l'échelle mondiale. Pour toute question relative à la protection des renseignements personnels, veuillez communiquer avec notre responsable de la protection de la vie privée à l'adresse privacy@marcoreid.com ou par courrier : Responsable de la protection de la vie privée, Reid & Associates Ltd, Auckland, Nouvelle-Zélande.",
  },
  {
    title: "2. Renseignements recueillis",
    content:
      "Nous recueillons et traitons les catégories suivantes de renseignements personnels :\n\nRenseignements relatifs au compte : Nom, adresse courriel, nom du cabinet et mot de passe haché (bcrypt) lors de votre inscription. Nous ne stockons jamais les mots de passe en clair.\n\nRenseignements professionnels : Domaine de pratique, territoire de compétence et accréditations professionnelles, le cas échéant.\n\nDonnées client : Renseignements que vous téléversez au sujet de vos clients, y compris les noms, coordonnées, renseignements sur les dossiers, documents, entrées de temps, registres de comptes en fiducie et données connexes. Vous êtes le responsable du traitement de vos données client ; nous les traitons en votre nom.\n\nDonnées de recherche : Requêtes soumises à Marco, y compris la question, le domaine, le territoire de compétence, le contexte et la réponse générée par l'IA. Citations générées et leur statut de vérification. Rétroaction des utilisateurs (évaluations, commentaires) sur les résultats de recherche.\n\nDonnées vocales : Enregistrements audio soumis pour transcription via Marco Reid Voix, texte transcrit, durée, langue détectée et surface à partir de laquelle la dictée a été initiée.\n\nDonnées de paiement : Renseignements de facturation traités par Stripe. Nous ne stockons pas les numéros de carte de crédit — Stripe traite toutes les données de carte de paiement en tant que sous-traitant certifié PCI DSS niveau 1.\n\nDonnées d'utilisation : Pages consultées, fonctionnalités utilisées, temps de réponse, adresse IP, type de navigateur, type d'appareil et durée de session. Recueillies pour améliorer la performance et la fiabilité de la plateforme.\n\nDonnées de communication : Courriels, demandes d'assistance et autres communications avec nous.",
  },
  {
    title: "3. Comment nous utilisons vos renseignements",
    content:
      "Nous utilisons vos renseignements pour : (a) fournir, maintenir et améliorer la plateforme ; (b) authentifier votre identité et gérer votre compte ; (c) fournir des résultats de recherche alimentés par l'IA par l'entremise de Marco, y compris la vérification des citations ; (d) traiter la dictée vocale et retourner les transcriptions ; (e) traiter la facturation et la gestion des abonnements via Stripe ; (f) faciliter les transactions sur le marché entre professionnels via Stripe Connect ; (g) maintenir les registres de comptes en fiducie ; (h) améliorer la précision de la recherche grâce à notre système d'apprentissage en boucle (agrégation des tendances de requêtes et de la rétroaction) ; (i) communiquer les mises à jour de la plateforme, les alertes de sécurité et les avis de service ; (j) répondre aux demandes d'assistance ; (k) détecter et prévenir la fraude, les abus et les incidents de sécurité ; et (l) nous conformer aux obligations légales. Nous ne vendons jamais vos renseignements personnels à des tiers. Nous n'utilisons pas vos données à des fins publicitaires. Nous n'utilisons pas les données client ou les données vocales pour entraîner des modèles d'IA tiers.",
  },
  {
    title: "4. Bases juridiques du traitement",
    content:
      "Nous traitons vos renseignements personnels sur les bases juridiques suivantes :\n\nExécution d'un contrat : Le traitement de vos renseignements de compte et de vos données client est nécessaire à la fourniture des services de la plateforme pour lesquels vous avez contracté.\n\nIntérêts légitimes : Le traitement des données d'utilisation et des données de recherche pour améliorer la plateforme, maintenir la sécurité et développer notre système d'apprentissage en boucle. Notre intérêt légitime est de fournir et d'améliorer des outils professionnels.\n\nConsentement : Lorsque requis, nous obtenons votre consentement explicite avant le traitement — par exemple, pour les communications marketing ou le traitement de données vocales par des services tiers. Vous pouvez retirer votre consentement à tout moment.\n\nObligation légale : Nous pouvons traiter des données lorsque cela est nécessaire pour nous conformer à des obligations légales, y compris les exigences fiscales, réglementaires et d'application de la loi.",
  },
  {
    title: "5. Partage de données et services tiers",
    content:
      "Nous partageons des données avec les catégories suivantes de fournisseurs de services, chacun lié par des ententes de traitement des données :\n\nTraitement par IA : Anthropic (API Claude) — traite les requêtes de recherche pour générer des résultats. Le texte des requêtes est envoyé à Anthropic pour traitement.\n\nTraitement vocal : OpenAI (API Whisper) — traite les enregistrements audio pour transcription. Les données audio sont transmises à OpenAI.\n\nTraitement des paiements : Stripe — traite toutes les transactions de paiement, la facturation des abonnements et les paiements sur le marché. Stripe est certifié PCI DSS niveau 1.\n\nHébergement de base de données : Neon — héberge notre base de données PostgreSQL. Toutes les données sont chiffrées au repos (AES-256) et en transit (TLS 1.3).\n\nVérification des citations : CourtListener, GovInfo, IRS.gov, Cornell LII, NZLII, AustLII, USPTO — bases de données juridiques et gouvernementales publiques interrogées pour vérifier les citations. Seules les métadonnées des citations sont envoyées ; aucun renseignement personnel n'est transmis.\n\nNous ne vendons, ne louons et n'échangeons pas vos renseignements personnels. Nous pouvons divulguer des données si la loi, une ordonnance judiciaire ou une réglementation gouvernementale l'exige.",
  },
  {
    title: "6. Sécurité des données",
    content:
      "Nous mettons en œuvre des mesures de sécurité complètes pour protéger vos données :\n\nChiffrement : Toutes les données sont chiffrées en transit au moyen de TLS 1.3 et au repos au moyen du chiffrement AES-256.\n\nAuthentification : Les mots de passe sont hachés au moyen de bcrypt avec un facteur de coût de 12. Nous prenons en charge l'authentification multifacteur.\n\nContrôles d'accès : Des contrôles d'accès basés sur les rôles garantissent que les données ne sont accessibles qu'au personnel et aux systèmes autorisés.\n\nInfrastructure : Hébergée sur une infrastructure conforme à SOC 2 avec des évaluations de sécurité régulières.\n\nJournal d'audit : Des pistes d'audit complètes et immuables suivent tous les accès aux données et toutes les modifications.\n\nNotification d'atteinte : En cas d'atteinte à la protection des renseignements personnels vous concernant, nous vous aviserons ainsi que l'autorité de contrôle compétente dans les 72 heures, comme l'exige le RGPD, ou dans les meilleurs délais en vertu d'autres lois applicables, y compris la Loi 25 du Québec.",
  },
  {
    title: "7. Conservation des données",
    content:
      "Données de compte : Conservées tant que votre compte est actif et pendant 30 jours après la résiliation pour permettre l'exportation des données. Après 30 jours, supprimées de façon permanente.\n\nDonnées client : Conservées tant que votre compte est actif. Supprimées de façon permanente dans les 30 jours suivant la résiliation du compte, sauf lorsque la conservation est exigée par la loi.\n\nDonnées de recherche (requêtes et citations) : Conservées pour améliorer la précision de la recherche grâce à notre système d'apprentissage en boucle. Après la résiliation du compte, les données de recherche sont anonymisées (dépouillées des identifiants d'utilisateur) et conservées sous forme agrégée uniquement.\n\nDonnées vocales : Les fichiers audio ne sont pas stockés de façon permanente après la transcription. Le texte transcrit est conservé dans le cadre de vos données de compte et supprimé à la résiliation du compte.\n\nRegistres de paiement : Conservés pendant 7 ans conformément à la législation fiscale de la Nouvelle-Zélande et aux réglementations financières applicables.\n\nDonnées d'utilisation : Conservées sous forme agrégée et anonymisée indéfiniment pour l'amélioration de la plateforme. Les données d'utilisation permettant l'identification personnelle sont supprimées dans les 90 jours.",
  },
  {
    title: "8. Vos droits",
    content:
      "Selon votre territoire de compétence, vous disposez de tout ou partie des droits suivants :\n\nDroit d'accès : Demander une copie de tous les renseignements personnels que nous détenons à votre sujet.\n\nDroit de rectification : Demander la correction de données inexactes ou incomplètes.\n\nDroit à l'effacement : Demander la suppression de vos renseignements personnels, sous réserve des exigences légales de conservation.\n\nDroit à la portabilité des données : Recevoir vos données dans un format structuré, couramment utilisé et lisible par machine (JSON ou CSV).\n\nDroit de restreindre le traitement : Demander que nous limitions la façon dont nous traitons vos données dans certaines circonstances.\n\nDroit d'opposition : Vous opposer au traitement fondé sur des intérêts légitimes, y compris le profilage.\n\nDroit de retirer le consentement : Lorsque le traitement est fondé sur le consentement, le retirer à tout moment sans affecter la licéité du traitement antérieur.\n\nDroit de déposer une plainte : Déposer une plainte auprès de votre autorité locale de protection des données. Pour les utilisateurs du Québec : la Commission d'accès à l'information du Québec (cai.gouv.qc.ca). Pour les utilisateurs du Canada : le Commissariat à la protection de la vie privée du Canada (priv.gc.ca). Pour les utilisateurs de l'UE : votre autorité de contrôle locale.\n\nPour exercer l'un de ces droits, communiquez avec privacy@marcoreid.com. Nous répondrons dans les 30 jours (ou plus rapidement lorsque la loi l'exige). Nous pouvons vérifier votre identité avant de traiter les demandes.",
  },
  {
    title: "9. Loi sur la protection des renseignements personnels dans le secteur privé du Québec (Loi 25)",
    content:
      "En tant que fournisseur de logiciel commercial accessible au Québec, nous nous conformons à la Loi modernisant des dispositions législatives en matière de protection des renseignements personnels (Loi 25), qui modifie la Loi sur la protection des renseignements personnels dans le secteur privé (RLRQ, c. P-39.1). Conformément à cette loi :\n\nResponsable de la protection des renseignements personnels : Nous avons désigné un responsable de la protection des renseignements personnels dont les coordonnées sont publiées sur notre site Web.\n\nConsentement : Nous obtenons un consentement manifeste, libre et éclairé avant de recueillir, d'utiliser ou de communiquer vos renseignements personnels. Le consentement est demandé pour chaque fin distincte.\n\nDroit à la désindexation : Vous pouvez demander que cessent la diffusion de vos renseignements personnels ou que soit désindexé tout hyperlien rattaché à votre nom donnant accès à ces renseignements.\n\nDécisions automatisées : Nous vous informons lorsqu'une décision fondée exclusivement sur un traitement automatisé est prise à votre sujet et vous offrons la possibilité de faire valoir vos observations.\n\nÉvaluation des facteurs relatifs à la vie privée : Nous procédons à des évaluations des facteurs relatifs à la vie privée pour tout projet de système d'information ou de prestation électronique de services impliquant des renseignements personnels.\n\nIncidents de confidentialité : Nous tenons un registre des incidents de confidentialité et avisons la Commission d'accès à l'information du Québec ainsi que les personnes concernées lorsqu'un incident présente un risque sérieux de préjudice.\n\nTransfert hors Québec : Avant de communiquer des renseignements personnels à l'extérieur du Québec, nous procédons à une évaluation des facteurs relatifs à la vie privée afin de nous assurer que les renseignements bénéficieront d'une protection adéquate.",
  },
  {
    title: "10. Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE)",
    content:
      "En tant que société offrant des services au Canada, nous nous conformons à la Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE) et à ses dix principes relatifs à l'équité dans le traitement de l'information. Nous recueillons les renseignements personnels uniquement à des fins qu'une personne raisonnable estimerait appropriées dans les circonstances. Nous obtenons le consentement de la personne concernée avant de recueillir, d'utiliser ou de communiquer des renseignements personnels, sauf dans les cas prévus par la loi. Vous avez le droit d'accéder à vos renseignements personnels, de contester leur exactitude et leur intégralité, et de les faire modifier s'il y a lieu.",
  },
  {
    title: "11. Témoins de connexion (cookies) et suivi",
    content:
      "Nous utilisons uniquement des témoins de connexion essentiels :\n\nTémoins d'authentification : Maintiennent votre session de connexion. Strictement nécessaires au fonctionnement de la plateforme. Ne peuvent être désactivés.\n\nTémoins de session : Témoins temporaires qui expirent lorsque vous fermez votre navigateur.\n\nNous n'utilisons pas : de témoins publicitaires, de témoins de suivi, de témoins d'analyse de tiers, de témoins de médias sociaux, ni de suivi intersites basé sur les témoins. Conformément à la Loi 25 du Québec et à la directive ePrivacy de l'UE, les témoins strictement nécessaires ne requièrent pas de consentement. Toutefois, notre bannière de témoins vous informe de cette pratique par souci de transparence.",
  },
  {
    title: "12. Vie privée des enfants",
    content:
      "La plateforme est conçue pour un usage professionnel par des adultes. Nous ne recueillons pas sciemment de renseignements personnels de personnes de moins de 18 ans. Si nous apprenons que nous avons recueilli des renseignements personnels d'un enfant de moins de 18 ans, nous les supprimerons rapidement. Si vous croyez que nous avons recueilli par inadvertance des données d'un mineur, veuillez communiquer immédiatement avec privacy@marcoreid.com.",
  },
  {
    title: "13. Prise de décision automatisée",
    content:
      "La plateforme utilise le traitement automatisé de la façon suivante : (a) le moteur de recherche Marco utilise l'IA pour générer des résultats de recherche et vérifier les citations — il s'agit d'un outil d'assistance qui ne prend pas de décisions ayant un effet juridique sur les utilisateurs ; (b) la détection de domaine catégorise automatiquement vos requêtes de recherche (juridique, comptable, PI, interdomaines) pour les acheminer convenablement ; et (c) l'analyse des tendances de requêtes identifie les sujets de recherche courants de manière agrégée. Aucun de ces traitements n'implique une prise de décision entièrement automatisée produisant des effets juridiques ou vous affectant de manière significative. Tous les résultats de l'IA nécessitent votre examen professionnel et votre jugement avant utilisation.",
  },
  {
    title: "14. Modifications à la présente politique",
    content:
      "Nous pouvons mettre à jour la présente politique de confidentialité de temps à autre. Les modifications importantes seront communiquées aux utilisateurs inscrits par courriel au moins trente (30) jours avant leur entrée en vigueur. La date de « Dernière mise à jour » en haut de la page reflète la révision la plus récente. Nous vous encourageons à consulter cette politique périodiquement. Votre utilisation continue de la plateforme après l'entrée en vigueur des modifications constitue une acceptation de la politique mise à jour.",
  },
];

export default function PrivacyFrenchPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <h1 className="font-serif text-hero text-white">
            Politique de confidentialité
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            Vos données vous appartiennent. Voici exactement comment nous les
            protégeons.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-36">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <p className="text-sm text-navy-400">
                Dernière mise à jour : avril 2026
              </p>
              <p className="mt-6 text-lg text-navy-500">
                Reid &amp; Associates Ltd (&laquo;&nbsp;Marco Reid&nbsp;&raquo;,
                &laquo;&nbsp;nous&nbsp;&raquo;, &laquo;&nbsp;notre&nbsp;&raquo;,
                &laquo;&nbsp;nos&nbsp;&raquo;) s&rsquo;engage à protéger la vie
                privée et la sécurité de vos renseignements personnels. La
                présente politique de confidentialité décrit comment nous
                recueillons, utilisons, stockons, partageons et protégeons vos
                renseignements lorsque vous utilisez la plateforme Marco Reid,
                ainsi que vos droits à cet égard.
              </p>
              <p className="mt-4 text-lg text-navy-500">
                La présente politique s&rsquo;applique à tous les utilisateurs à
                l&rsquo;échelle mondiale et répond aux exigences du Règlement
                général sur la protection des données (RGPD) de l&rsquo;UE, de
                la Loi sur la protection des renseignements personnels et les
                documents électroniques (LPRPDE) du Canada, de la Loi
                modernisant des dispositions législatives en matière de
                protection des renseignements personnels du Québec (Loi 25), du
                Privacy Act 2020 de la Nouvelle-Zélande et des autres lois
                applicables en matière de protection des données.
              </p>
            </Reveal>

            <div className="mt-16 space-y-12">
              {sections.map((section, i) => (
                <Reveal key={section.title} delay={i * 0.05}>
                  <h2 className="font-serif text-headline text-navy-800">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-navy-500 whitespace-pre-line">
                    {section.content}
                  </p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2}>
              <div className="mt-16 rounded-2xl border border-navy-100 bg-navy-50 p-8">
                <p className="font-serif text-xl text-navy-700">
                  Questions sur la confidentialité?
                </p>
                <p className="mt-2 text-navy-400">
                  Communiquez avec notre responsable de la protection de la vie
                  privée à l&rsquo;adresse privacy@marcoreid.com ou écrivez à
                  Responsable de la protection de la vie privée, Reid &amp;
                  Associates Ltd, Auckland, Nouvelle-Zélande.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
