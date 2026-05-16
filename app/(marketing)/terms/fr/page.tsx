import type { Metadata } from "next";
import Container from "@/app/components/shared/Container";
import Reveal from "@/app/components/effects/Reveal";

export const metadata: Metadata = {
  title: "Conditions d'utilisation",
  description:
    "Conditions d'utilisation de Marco Reid. L'entente contraignante entre vous et Reid & Associates Ltd.",
};

const sections = [
  {
    title: "1. Définitions",
    content:
      "« Entente » désigne les présentes conditions d'utilisation, la politique de confidentialité, la politique d'utilisation acceptable et tout bon de commande ou addenda exécuté entre les parties. « Plateforme » désigne l'application Web Marco Reid, les API et tous les services connexes. « Utilisateur » ou « vous » désigne la personne physique ou morale qui accède à la plateforme ou l'utilise. « Nous » ou « Marco Reid » désigne Reid & Associates Ltd, une société enregistrée en Nouvelle-Zélande. « Contenu » désigne toute donnée, tout texte, fichier, document, audio ou autre matériel téléversé sur la plateforme ou généré par son entremise. « Contenu de l'utilisateur » désigne le contenu que vous téléversez ou créez. « Résultat de l'IA » désigne tout contenu, résultat de recherche, citation, résumé ou autre matériel généré par le moteur de recherche Marco ou toute autre fonctionnalité alimentée par l'IA de la plateforme. « Abonnement » désigne votre accès payant à la plateforme selon un niveau spécifique. « Professionnel » désigne un avocat, un comptable ou un autre praticien accrédité utilisant la plateforme. « Données client » désigne tout renseignement relatif à vos clients que vous stockez, traitez ou transmettez par l'entremise de la plateforme, y compris, sans s'y limiter, les détails des dossiers, les registres de comptes en fiducie, les documents et les communications.",
  },
  {
    title: "2. Acceptation et admissibilité",
    content:
      "En accédant à la plateforme ou en l'utilisant, vous confirmez que vous avez lu, compris et accepté d'être lié par la présente entente. Si vous acceptez au nom d'une société, d'un cabinet ou d'une autre entité juridique, vous déclarez avoir le pouvoir de lier cette entité. Si vous n'êtes pas d'accord, vous ne devez pas utiliser la plateforme. Vous devez être âgé d'au moins 18 ans et être juridiquement capable de conclure des contrats contraignants dans votre territoire de compétence. Si vous êtes un professionnel du droit ou de la comptabilité, vous déclarez détenir des titres de compétence valides dans votre territoire de pratique et que votre utilisation de la plateforme est conforme à vos obligations professionnelles, à vos règles de conduite et à vos devoirs déontologiques.",
  },
  {
    title: "3. Description du service",
    content:
      "Marco Reid fournit des outils de gestion de pratique alimentés par l'IA pour les professionnels du droit et de la comptabilité. La plateforme comprend : (a) la gestion des dossiers et des affaires, (b) la gestion des relations clients, (c) la gestion documentaire, (d) le suivi du temps et la facturation, (e) la gestion des comptes en fiducie (registre conforme aux normes IOLTA), (f) Marco — un moteur de recherche interdomaines alimenté par l'IA couvrant la recherche juridique, comptable, fiscale et en propriété intellectuelle avec vérification des citations, (g) Marco Reid Voix — dictée professionnelle avec vocabulaire juridique et comptable, (h) un marché professionnel permettant la collaboration interprofessionnelle et la facturation via Stripe Connect, et (i) des outils de technologie judiciaire. Les fonctionnalités peuvent varier selon le niveau d'abonnement et peuvent être modifiées, ajoutées ou retirées à notre discrétion moyennant un préavis raisonnable.",
  },
  {
    title: "4. Inscription au compte et sécurité",
    content:
      "Vous devez créer un compte pour accéder à la plateforme. Vous acceptez de fournir des renseignements d'inscription exacts, à jour et complets et de les mettre à jour au besoin. Vous êtes seul responsable du maintien de la confidentialité de vos identifiants de compte. Vous devez utiliser un mot de passe fort et unique et ne devez pas partager vos identifiants avec quiconque. Vous devez nous aviser immédiatement à security@marcoreid.com si vous prenez connaissance de toute utilisation non autorisée de votre compte ou de toute atteinte à la sécurité. Nous déclinons toute responsabilité pour toute perte ou tout dommage découlant de votre défaut de protéger vos identifiants de compte. Nous pouvons suspendre ou résilier les comptes que nous croyons raisonnablement compromis.",
  },
  {
    title: "5. Recherche par IA Marco — avertissements essentiels",
    content:
      "MARCO EST UN ASSISTANT DE RECHERCHE ALIMENTÉ PAR L'IA. IL N'EST PAS AVOCAT, COMPTABLE, CONSEILLER FISCAL NI PROFESSIONNEL AGRÉÉ D'AUCUNE SORTE. Les résultats de l'IA ne constituent pas un avis juridique, fiscal, financier, comptable ou professionnel de quelque nature que ce soit. Les résultats de l'IA ne créent pas et ne doivent pas être interprétés comme créant une relation avocat-client, comptable-client ou toute autre relation professionnel-client entre vous et Reid & Associates Ltd. Bien que nous mettions en œuvre la vérification des citations auprès de sources publiques faisant autorité (notamment CourtListener, Cornell LII, GovInfo, IRS.gov et d'autres), le contenu généré par l'IA peut contenir des erreurs, des omissions, des hallucinations, des renseignements périmés ou des caractérisations erronées du droit, de la réglementation ou de la jurisprudence. Les citations marquées « VÉRIFIÉ » signifient uniquement que nous avons trouvé un enregistrement correspondant dans une base de données publique — et non que la citation est correctement appliquée à votre question juridique ou que le droit sous-jacent est toujours en vigueur. VOUS ÊTES SEUL ET EXCLUSIVEMENT RESPONSABLE : (a) de vérifier de façon indépendante tous les résultats de l'IA avant de vous y fier, (b) de confirmer la validité et l'applicabilité actuelles de toutes les citations, affaires, lois, règlements et décisions, (c) d'exercer votre propre jugement professionnel en toute matière, (d) d'assurer la conformité aux règles de conduite professionnelle de votre territoire de compétence, et (e) de toutes les décisions prises et mesures adoptées sur la base des résultats de l'IA. Aucun résultat de l'IA ne devrait être cité dans un acte de procédure, un document juridique, une déclaration de revenus, un état financier ou une communication professionnelle sans vérification indépendante par un professionnel qualifié. Reid & Associates Ltd décline expressément toute responsabilité pour toute confiance accordée aux résultats de l'IA.",
  },
  {
    title: "6. Dictée vocale",
    content:
      "Marco Reid Voix utilise des services de transcription tiers (actuellement OpenAI Whisper) pour transcrire l'audio. Les données audio sont transmises au fournisseur tiers pour traitement et sont soumises à ses conditions et politiques de confidentialité. Nous ne garantissons pas l'exactitude de la transcription. Vous êtes responsable de la révision et de la correction de toutes les transcriptions avant utilisation. Vous ne devez pas dicter de contenu qui viole la loi applicable ou les droits de tout tiers. Vous reconnaissez que les données vocales peuvent être traitées dans des territoires de compétence autres que le vôtre.",
  },
  {
    title: "7. Marché professionnel",
    content:
      "La plateforme comprend un marché permettant aux professionnels d'offrir des services et de traiter des paiements par l'entremise de Stripe Connect. Reid & Associates Ltd agit uniquement à titre d'intermédiaire technologique et n'est partie à aucune transaction entre professionnels ou entre professionnels et leurs clients. Nous facturons des frais de plateforme (actuellement 10 %) sur les transactions du marché. Le traitement des paiements est géré par Stripe et est soumis aux conditions d'utilisation de Stripe et à l'entente de compte connecté. Nous ne sommes pas responsables de la qualité, de la légalité ou de la prestation des services offerts par l'entremise du marché. Les différends entre les participants au marché doivent être résolus directement entre les parties.",
  },
  {
    title: "8. Comptes en fiducie et conformité IOLTA",
    content:
      "La plateforme fournit une fonctionnalité de registre de comptes en fiducie pour faciliter la comptabilité IOLTA et la comptabilité fiduciaire client. Cette fonctionnalité est un outil de tenue de registres uniquement. Vous demeurez seul responsable de la conformité à toutes les règles, réglementations et obligations déontologiques en matière de comptabilité fiduciaire dans votre territoire de compétence, y compris, sans s'y limiter, la séparation appropriée des fonds clients, les dépôts en temps opportun, les décaissements autorisés et les exigences de tenue de registres. Reid & Associates Ltd ne détient, ne garde ni ne contrôle aucun fonds client. La plateforme ne remplace pas votre obligation de maintenir des comptes en fiducie conformes auprès d'institutions financières autorisées.",
  },
  {
    title: "9. Utilisation acceptable",
    content:
      "Vous acceptez de vous conformer à notre politique d'utilisation acceptable, qui est incorporée par renvoi. Sans limitation, vous ne devez pas : (a) utiliser la plateforme pour violer toute loi, réglementation ou règle de conduite professionnelle ; (b) téléverser ou transmettre tout logiciel malveillant, virus ou code nuisible ; (c) tenter d'obtenir un accès non autorisé à toute partie de la plateforme ou de son infrastructure ; (d) utiliser la plateforme pour contrefaire, s'approprier ou violer tout droit de propriété intellectuelle ; (e) effectuer de l'ingénierie inverse, décompiler ou désassembler toute partie de la plateforme ; (f) utiliser des outils automatisés pour extraire des données de la plateforme ; (g) revendre, sous-licencier ou redistribuer l'accès à la plateforme sans consentement écrit ; (h) usurper l'identité de toute personne ou entité ; (i) utiliser les résultats de l'IA pour générer des citations juridiques trompeuses ou des autorités fabriquées ; ou (j) utiliser la plateforme de toute manière qui pourrait endommager, désactiver, surcharger ou entraver son fonctionnement.",
  },
  {
    title: "10. Propriété intellectuelle",
    content:
      "La plateforme, y compris son code source, sa conception, son architecture, sa documentation, ses marques de commerce et toute sa technologie propriétaire, est la propriété exclusive de Reid & Associates Ltd et est protégée par les lois sur le droit d'auteur, les marques de commerce, le secret commercial et les autres lois sur la propriété intellectuelle de la Nouvelle-Zélande et les traités internationaux. « Marco Reid », « Marco », « The Oracle » et les logos associés sont des marques de commerce de Reid & Associates Ltd. Vous bénéficiez d'une licence limitée, non exclusive, non transférable et révocable pour accéder à la plateforme et l'utiliser uniquement à vos fins commerciales internes pendant la durée de votre abonnement actif. Vous conservez tous les droits sur votre contenu d'utilisateur. En téléversant du contenu d'utilisateur, vous nous accordez une licence limitée et non exclusive pour traiter, stocker et transmettre ce contenu uniquement dans la mesure nécessaire à la fourniture des services de la plateforme.",
  },
  {
    title: "11. Traitement des données et vie privée",
    content:
      "Votre utilisation de la plateforme est soumise à notre politique de confidentialité, qui décrit comment nous recueillons, utilisons, stockons et protégeons vos renseignements. Dans la mesure où nous traitons des renseignements personnels en votre nom à titre de sous-traitant, les conditions de notre entente de traitement des données s'appliquent. Vous êtes responsable de l'obtention de tous les consentements nécessaires de vos clients et autres personnes concernées avant de téléverser leurs renseignements personnels sur la plateforme. Vous déclarez que votre utilisation de la plateforme est conforme à toutes les lois applicables en matière de protection des données, y compris la LPRPDE, la Loi 25 du Québec, le RGPD et les autres lois applicables.",
  },
  {
    title: "12. Paiement, facturation et taxes",
    content:
      "Les abonnements payants sont facturés à l'avance sur une base mensuelle via Stripe. Tous les frais sont indiqués en dollars américains, sauf indication contraire. Vous nous autorisez à débiter votre mode de paiement désigné pour tous les frais applicables. Les prix sont affichés sur notre page de tarification et peuvent changer moyennant un préavis écrit d'au moins 30 jours. Les augmentations de frais prennent effet au prochain cycle de facturation suivant la période de préavis. Tous les frais sont hors taxes. Vous êtes responsable de toutes les taxes, droits et prélèvements applicables imposés par votre territoire de compétence, y compris la TPS et la TVQ au Québec. Les paiements en retard portent intérêt au taux de 1,5 % par mois ou au taux maximum permis par la loi, le moindre des deux étant applicable. Nous pouvons suspendre l'accès pour les comptes dont les paiements sont en retard de plus de 14 jours.",
  },
  {
    title: "13. Remboursements et annulation",
    content:
      "Vous pouvez annuler votre abonnement en tout temps à partir des paramètres de votre compte ou en communiquant avec nous. L'annulation prend effet à la fin de votre période de facturation en cours — vous conservez l'accès jusque-là. Nous offrons une période de remboursement de 14 jours à compter de la date de votre achat initial d'abonnement. Après 14 jours, les frais ne sont pas remboursables, sauf lorsque la loi applicable en matière de protection du consommateur l'exige. Conformément à la Loi sur la protection du consommateur du Québec (RLRQ, c. P-40.1), rien dans la présente section ne limite vos droits en tant que consommateur québécois, y compris votre droit de résoudre un contrat conclu à distance dans les délais prescrits.",
  },
  {
    title: "14. Exclusion de garanties",
    content:
      "LA PLATEFORME EST FOURNIE « TELLE QUELLE » ET « SELON LA DISPONIBILITÉ » SANS GARANTIE D'AUCUNE SORTE, QU'ELLE SOIT EXPRESSE, IMPLICITE, LÉGALE OU AUTRE. DANS TOUTE LA MESURE PERMISE PAR LA LOI APPLICABLE, NOUS DÉCLINONS TOUTE GARANTIE, Y COMPRIS LES GARANTIES IMPLICITES DE QUALITÉ MARCHANDE, D'ADÉQUATION À UN USAGE PARTICULIER, D'ABSENCE DE CONTREFAÇON ET D'EXACTITUDE. NOUS NE GARANTISSONS PAS QUE : (a) LA PLATEFORME SERA ININTERROMPUE, EXEMPTE D'ERREURS OU SÉCURITAIRE ; (b) LES RÉSULTATS DE L'IA SERONT EXACTS, COMPLETS OU À JOUR ; (c) LA PLATEFORME RÉPONDRA À VOS EXIGENCES SPÉCIFIQUES ; OU (d) LES DÉFAUTS SERONT CORRIGÉS DANS UN DÉLAI PARTICULIER. Certains territoires de compétence n'autorisent pas l'exclusion de certaines garanties. Dans ces territoires, les exclusions ci-dessus ne s'appliquent que dans la mesure permise par la loi. Conformément à la Loi sur la protection du consommateur du Québec, les garanties légales prévues par cette loi ne peuvent être exclues ni limitées.",
  },
  {
    title: "15. Limitation de responsabilité",
    content:
      "DANS TOUTE LA MESURE PERMISE PAR LA LOI : (a) REID & ASSOCIATES LTD, SES ADMINISTRATEURS, DIRIGEANTS, EMPLOYÉS, MANDATAIRES ET SOCIÉTÉS AFFILIÉES NE SERONT PAS RESPONSABLES DE TOUT DOMMAGE INDIRECT, ACCESSOIRE, SPÉCIAL, CONSÉCUTIF, EXEMPLAIRE OU PUNITIF, Y COMPRIS, SANS S'Y LIMITER, LA PERTE DE PROFITS, DE REVENUS, DE DONNÉES, D'OCCASIONS D'AFFAIRES, D'ACHALANDAGE OU D'ÉCONOMIES ANTICIPÉES, QUELLE QUE SOIT LA CAUSE DE L'ACTION OU LA THÉORIE DE RESPONSABILITÉ ; (b) NOTRE RESPONSABILITÉ TOTALE CUMULÉE DÉCOULANT DE LA PRÉSENTE ENTENTE OU S'Y RAPPORTANT NE DÉPASSERA PAS LE PLUS ÉLEVÉ DES MONTANTS SUIVANTS : (i) LE TOTAL DES FRAIS QUE VOUS AVEZ PAYÉS AU COURS DES DOUZE (12) MOIS PRÉCÉDANT IMMÉDIATEMENT L'ÉVÉNEMENT DONNANT LIEU À LA RÉCLAMATION, OU (ii) CENT DOLLARS NÉO-ZÉLANDAIS (100 $ NZ). Certains territoires de compétence n'autorisent pas certaines limitations de responsabilité. Dans ces territoires, les limitations ci-dessus s'appliquent dans la mesure maximale permise par la loi. Rien dans la présente entente n'exclut ni ne limite la responsabilité en cas de décès ou de blessures causés par la négligence, la fraude ou toute autre responsabilité qui ne peut être exclue par la loi.",
  },
  {
    title: "16. Indemnisation",
    content:
      "Vous acceptez d'indemniser, de défendre et de dégager de toute responsabilité Reid & Associates Ltd, ses administrateurs, dirigeants, employés, mandataires et sociétés affiliées contre toute réclamation, perte, dommage, responsabilité, coût et dépense (y compris les honoraires d'avocat raisonnables) découlant de ou liés à : (a) votre utilisation de la plateforme ; (b) votre violation de la présente entente ; (c) votre violation de toute loi, réglementation ou règle de conduite professionnelle applicable ; (d) votre contenu d'utilisateur ou vos données client ; (e) votre confiance aux résultats de l'IA sans vérification indépendante ; (f) toute réclamation d'un tiers (y compris vos clients) découlant des services que vous avez fournis en utilisant la plateforme ou en vous y fiant ; (g) votre utilisation du marché professionnel ; ou (h) votre défaut de vous conformer aux obligations fiduciaires en matière de comptabilité en fiducie ou IOLTA. La présente obligation d'indemnisation survit à la résiliation de la présente entente.",
  },
  {
    title: "17. Résolution des différends et droit applicable",
    content:
      "La présente entente est régie et interprétée conformément aux lois de la Nouvelle-Zélande, sans égard aux principes de conflit de lois. Tout différend découlant de la présente entente ou s'y rapportant qui ne peut être résolu par négociation de bonne foi dans les trente (30) jours sera soumis à l'arbitrage exécutoire administré par le New Zealand Dispute Resolution Centre selon ses règles d'arbitrage commercial. L'arbitrage se déroulera à Auckland, en Nouvelle-Zélande, en anglais ou en français selon le choix de l'utilisateur québécois, devant un arbitre unique. La décision de l'arbitre sera définitive et exécutoire. VOUS ACCEPTEZ QUE TOUTE PROCÉDURE DE RÉSOLUTION DE DIFFÉRENDS SERA MENÉE UNIQUEMENT SUR UNE BASE INDIVIDUELLE ET NON DANS LE CADRE D'UN RECOURS COLLECTIF, CONSOLIDÉ OU REPRÉSENTATIF. Nonobstant ce qui précède, chaque partie peut demander une injonction ou une mesure de redressement en équité devant tout tribunal compétent pour protéger ses droits de propriété intellectuelle ou ses renseignements confidentiels. Rien dans la présente section ne limite vos droits en vertu de la Loi sur la protection du consommateur du Québec ou de toute autre loi impérative en matière de protection du consommateur.",
  },
  {
    title: "18. Résiliation",
    content:
      "L'une ou l'autre des parties peut résilier la présente entente en tout temps en fournissant un avis écrit. Nous pouvons suspendre ou résilier votre accès immédiatement et sans préavis si : (a) vous enfreignez la présente entente ; (b) votre paiement est en retard de plus de 14 jours ; (c) nous croyons raisonnablement que votre compte a été compromis ; ou (d) nous sommes tenus de le faire par la loi. À la résiliation : (i) votre licence d'utilisation de la plateforme cesse immédiatement ; (ii) vous disposez de 30 jours pour exporter vos données au moyen de la fonctionnalité d'exportation de la plateforme ou en communiquant avec nous ; (iii) après 30 jours, nous supprimerons définitivement votre contenu d'utilisateur et vos données client, sauf lorsque la conservation est exigée par la loi ou pour des fins légitimes de tenue de registres ; et (iv) les obligations de paiement accumulées et les sections suivantes survivent à la résiliation : sections 5, 10, 14, 15, 16, 17 et 20.",
  },
  {
    title: "19. Modifications aux conditions",
    content:
      "Nous pouvons modifier les présentes conditions de temps à autre. Les modifications importantes seront communiquées aux utilisateurs inscrits par courriel au moins trente (30) jours avant leur entrée en vigueur. Les modifications non importantes (telles que les clarifications ou la mise en forme) peuvent prendre effet immédiatement après leur publication. Votre utilisation continue de la plateforme après l'entrée en vigueur des modifications constitue une acceptation des conditions modifiées. Si vous n'êtes pas d'accord avec les conditions modifiées, vous devez cesser d'utiliser la plateforme et pouvez résilier votre compte.",
  },
  {
    title: "20. Dispositions relatives à la Charte de la langue française",
    content:
      "Conformément à la Charte de la langue française du Québec (RLRQ, c. C-11), telle que modifiée par le projet de loi 96 (Loi sur la langue officielle et commune du Québec, le français), nous nous engageons à rendre la présente entente et nos principaux documents juridiques disponibles en français. Tout utilisateur résidant au Québec a le droit de recevoir les communications et les documents juridiques en français. En cas de divergence entre les versions française et anglaise des présentes conditions, la version française prévaudra pour les utilisateurs résidant au Québec, conformément aux exigences de la Charte de la langue française.",
  },
  {
    title: "21. Dispositions générales",
    content:
      "Intégralité de l'entente : La présente entente, conjointement avec la politique de confidentialité, la politique d'utilisation acceptable et tout bon de commande exécuté, constitue l'intégralité de l'entente entre vous et Reid & Associates Ltd et remplace toutes les ententes antérieures. Divisibilité : Si une disposition est jugée invalide ou inapplicable, les dispositions restantes demeurent pleinement en vigueur, et la disposition invalide sera modifiée dans la mesure minimale nécessaire pour la rendre valide et applicable. Cession : Vous ne pouvez pas céder la présente entente sans notre consentement écrit préalable. Nous pouvons céder la présente entente dans le cadre d'une fusion, d'une acquisition ou d'une vente de la totalité ou de la quasi-totalité de nos actifs. Renonciation : Notre défaut de faire valoir un droit ou une disposition ne constitue pas une renonciation à ce droit ou à cette disposition. Force majeure : Aucune des parties ne sera responsable des retards ou des défauts d'exécution résultant de causes indépendantes de sa volonté raisonnable, y compris les catastrophes naturelles, la guerre, le terrorisme, les pandémies, les actions gouvernementales ou les défaillances de l'infrastructure de tiers. Avis : Tous les avis en vertu de la présente entente doivent être formulés par écrit et transmis par courriel aux adresses associées à votre compte (pour les avis qui vous sont destinés) ou à legal@marcoreid.com (pour les avis qui nous sont destinés). Conformité aux lois sur l'exportation : Vous déclarez que vous n'êtes pas situé dans un pays faisant l'objet d'un embargo et que vous ne figurez sur aucune liste de parties sanctionnées. Titres des sections : Les titres des sections sont fournis à des fins de commodité uniquement et n'ont aucun effet juridique.",
  },
];

export default function TermsFrenchPage() {
  return (
    <>
      <section className="bg-navy-500 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <Container className="text-center">
          <h1 className="font-serif text-hero text-white">
            Conditions d&rsquo;utilisation
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl text-navy-200">
            L&rsquo;entente contraignante entre vous et Marco Reid.
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
                Les présentes conditions d&rsquo;utilisation
                (&laquo;&nbsp;Conditions&nbsp;&raquo; ou
                &laquo;&nbsp;Entente&nbsp;&raquo;) régissent votre accès à la
                plateforme Marco Reid et son utilisation, exploitée par Reid
                &amp; Associates Ltd, une société constituée en
                Nouvelle-Zélande. En utilisant la plateforme, vous concluez un
                contrat juridiquement contraignant avec Reid &amp; Associates
                Ltd.
              </p>
              <p className="mt-4 text-lg font-semibold text-navy-700">
                VEUILLEZ LIRE ATTENTIVEMENT LES PRÉSENTES CONDITIONS. ELLES
                CONTIENNENT UNE CLAUSE D&rsquo;ARBITRAGE EXÉCUTOIRE, UNE
                RENONCIATION AUX RECOURS COLLECTIFS ET DES LIMITATIONS DE
                RESPONSABILITÉ QUI AFFECTENT VOS DROITS JURIDIQUES.
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
                  Questions sur les présentes conditions?
                </p>
                <p className="mt-2 text-navy-400">
                  Communiquez avec nous à legal@marcoreid.com ou écrivez à Reid
                  &amp; Associates Ltd, Auckland, Nouvelle-Zélande.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
