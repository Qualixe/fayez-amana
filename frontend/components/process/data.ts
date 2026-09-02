import type { Locale } from "@/lib/locale";

export type Stage = {
  no: number;
  title: string;
  body: string;
  titleAr: string;
  bodyAr: string;
};

export function stageTitle(stage: Stage, locale: Locale) {
  return locale === "ar" ? stage.titleAr : stage.title;
}

export function stageBody(stage: Stage, locale: Locale) {
  return locale === "ar" ? stage.bodyAr : stage.body;
}

export const stages: Stage[] = [
  {
    no: 1,
    title: "Site Setup & Permits",
    body: "A hoarding is erected around the full site boundary, with water and electricity sources provided, the site licence and project identification board prepared, and any municipality procedures, such as pavement rental, cleared to prevent violations.",
    titleAr: "تجهيز الموقع",
    bodyAr: "وضع ساتر على كامل حدود الموقع مع توفير مصدر مياه وكهرباء وتجهيز رخصة الموقع واللوحة التعريفية بالمشروع وتخليص أي إجراءات خاصة بالبلدية ك (استئجار الرصيف) منعًا للمخالفات.",
  },
  {
    no: 2,
    title: "Reaching Founding Level",
    body: "Excavation down to the founding level listed in the soil report.",
    titleAr: "الوصول لمنسوب التأسيس",
    bodyAr: "هو الوصول إلى منسوب التأسيس المدرج بتقرير التربة.",
  },
  {
    no: 3,
    title: "Plate Load Test",
    body: "Load testing: the purpose is to verify the bearing capacity of the soil and the permissible settlement, and whether these are within the safe limits assumed by the design.",
    titleAr: "اختبار التحميل",
    bodyAr: "اختبار التحميل: الغرض من الاختبار هو التأكد من قدرة تحمل التربة والهبوط المسموح به وهل هو في الحدود الآمنة وفقًا للتصميم أم لا.",
  },
  {
    no: 4,
    title: "Anti-Termite Treatment",
    body: "Pesticide is sprayed in three stages, before the site blinding concrete, before casting the tie beams, and before the ground-floor blinding, to protect against termites and insects emerging from the soil.",
    titleAr: "رش المبيد",
    bodyAr: "يتم رش المبيد على ثلاث مراحل: قبل صبة النظافة للموقع، وقبل صب الميدات، وقبل صبة النظافة للدور الأرضي، وذلك للحماية من النمل الأبيض والحشرات الخروج من التربة.",
  },
  {
    no: 5,
    title: "Polythene Membrane",
    body: "The polythene sheet forms an insulating layer between the blinding concrete and the soil, retaining the mix water so the soil cannot absorb it.",
    titleAr: "فرش النايلون",
    bodyAr: "الغرض من فرش النايلون هو عمل طبقة عازلة بين صبة النظافة والتربة حتى يتم الحفاظ على مياه الخلطة حتى لا تمتصها التربة.",
  },
  {
    no: 6,
    title: "Blinding Concrete",
    body: "Blinding concrete protects the main foundations from the soil beneath them, since moisture and chemicals present, such as sulphates, can attack and weaken the concrete.",
    titleAr: "صبة النظافة",
    bodyAr: "صبة النظافة: الغرض منها حماية الأساسات الرئيسية من التربة أدناها، حيث أن الرطوبة والمواد الكيميائية الموجودة مثل الكبريتات قد تهاجم الخرسانة ويمكن أن تضعفها.",
  },
  {
    no: 7,
    title: "Reinforced Raft Foundation",
    body: "The reinforced raft: the footings distribute the structure's large, concentrated loads over a greater area so the loading intensity does not exceed the safe bearing capacity of the founding soil.",
    titleAr: "اللبشة المسلحة",
    bodyAr: "اللبشة المسلحة: تقوم القواعد بتوزيع أحمال الهيكل الكبيرة والمركزة على مساحة أكبر بحيث لا تتجاوز شدة التحميل قدرة التحمل الآمنة لتربة التأسيس.",
  },
  {
    no: 8,
    title: "Column Necks",
    body: "Column necks: the first part of the column cast above the reinforced footing, the element carrying the greatest structural weight and transferring it to the footing and on to the founding soil.",
    titleAr: "رقاب الأعمدة",
    bodyAr: "رقاب الأعمدة: هي أول جزء يصب من العمود فوق القاعدة المسلحة وهي أكثر جزء يحمل أوزان المنشأ وينقلها إلى القاعدة ومنها إلى تربة الأساس.",
  },
  {
    no: 9,
    title: "Column Necks, Execution",
    body: "Column necks: the first part of the column cast above the reinforced footing, the element carrying the greatest structural weight and transferring it to the footing and on to the founding soil.",
    titleAr: "رقاب الأعمدة",
    bodyAr: "رقاب الأعمدة: هي أول جزء يصب من العمود فوق القاعدة المسلحة وهي أكثر جزء يحمل أوزان المنشأ وينقلها إلى القاعدة ومنها إلى تربة الأساس.",
  },
  {
    no: 10,
    title: "Backfilling Works",
    body: "Backfilling: 1, coarse, well-graded granular soil comprising gravel and sand is preferred and considered among the best fill types; a classification test is run on the fill sample, ideally of type (a-1-a). 2, the fill is placed in 30 cm layers in accordance with the code.",
    titleAr: "أعمال الردم (الدفان)",
    bodyAr: "أعمال الردم (الدفان): 1- يفضل استخدام التربة الحبيبة الخشنة المتدرجة التي تشمل كلًا من الحصى والتربة الرملية وتعد من أفضل أنواع الدفان، كما يتم عمل اختبار لتصنيف عينة الدفان المستخدم ويفضل أن تكون من نوع (a-1-a). 2- يتم الدفان على طبقات بسمك 30 سم طبقًا للكود.",
  },
  {
    no: 11,
    title: "Column Necks, Continuation",
    body: "Column necks: the first part of the column cast above the reinforced footing, the element carrying the greatest structural weight and transferring it to the footing and on to the founding soil.",
    titleAr: "رقاب الأعمدة",
    bodyAr: "رقاب الأعمدة: هي أول جزء يصب من العمود فوق القاعدة المسلحة وهي أكثر جزء يحمل أوزان المنشأ وينقلها إلى القاعدة ومنها إلى تربة الأساس.",
  },
  {
    no: 12,
    title: "Column Necks, Completion",
    body: "Column necks: the first part of the column cast above the reinforced footing, the element carrying the greatest structural weight and transferring it to the footing and on to the founding soil.",
    titleAr: "رقاب الأعمدة",
    bodyAr: "رقاب الأعمدة: هي أول جزء يصب من العمود فوق القاعدة المسلحة وهي أكثر جزء يحمل أوزان المنشأ وينقلها إلى القاعدة ومنها إلى تربة الأساس.",
  },
  {
    no: 13,
    title: "Tie Beams",
    body: "Execution of the concrete tie beams linking the footings in accordance with the structural drawing.",
    titleAr: "الميدات",
    bodyAr: "تنفيذ الميدات الخرسانية الرابطة بين القواعد طبقًا للمخطط الإنشائي.",
  },
  {
    no: 14,
    title: "Tie Beam Waterproofing",
    body: "Tie beam insulation prevents moisture transferring into the ground-floor walls, which would otherwise cause paint peeling problems.",
    titleAr: "عزل الميدات",
    bodyAr: "عزل الميدات: الغرض منها هو منع انتقال الرطوبة إلى جدران الدور الأرضي وبالتالي ينتج مشاكل تقشير الدهانات.",
  },
  {
    no: 15,
    title: "Tie Beam Backfill",
    body: "Tie beam backfilling: fill is placed in 30 cm layers in accordance with the code.",
    titleAr: "دفان الميدات",
    bodyAr: "دفان الميدات: يتم الدفان على طبقات بسمك 30 سم طبقًا للكود.",
  },
  {
    no: 16,
    title: "Compaction",
    body: "Compaction of the tie beam fill: to confirm 95% compaction is achieved for every layer, so that no settlement occurs, settlement would crack the ground-floor blinding and in turn cause the ground-floor tiling to drop.",
    titleAr: "دمك (دك) الميدات",
    bodyAr: "دمك (دك) الميدات: الغرض منه التأكد من الوصول إلى درجة الانضغاطية 95% لكل طبقة وذلك لعدم حدوث هبوط مما يؤدي إلى انكسار بصبة نظافة الدور الأرضي ومنها إلى هبوط بلاط الدور الأرضي.",
  },
  {
    no: 17,
    title: "Ground Floor Blinding",
    body: "Ground-floor blinding concrete provides a uniform surface for the ground-floor tiling works and prevents direct contact with the tie beam backfill soil.",
    titleAr: "صبة نظافة الدور الأرضي",
    bodyAr: "صبة نظافة الدور الأرضي: الغرض منها توفير سطح موحد لأعمال البلاط للدور الأرضي ومنع الاتصال المباشر مع تربة دفان الميدات.",
  },
  {
    no: 18,
    title: "Columns",
    body: "Columns are among the most important structural elements, receiving loads from the slab and beams and transferring them to the footings and on to the soil. Column formwork: (a) the timber formwork must be new; (b) proper strengthening using tie rods, clamps and sound bracing to prevent the formwork from coming apart during casting; (c) plumbing the columns with a plumb bob to confirm they are true on all sides before casting, and re-checking after the formwork is struck; (d) adherence to the structural drawing during execution with respect to setting-out, column dimensions and column heights.",
    titleAr: "الأعمدة",
    bodyAr: "تعتبر الأعمدة من أهم العناصر الإنشائية والمسئولة عن استلام الأحمال من السقف والكمرات ونقلها إلى القواعد ومنها إلى التربة. الشدة الخشبية للأعمدة: أ- لابد من مراعاة أن تكون الشدة الخشبية جديدة. ب- التقوية الجيدة باستخدام (التايروت) والقمط والمرابع الجيدة لمنع حدوث فك للشدة أثناء الصب. ج- توزين الأعمدة بميزان البلبل للتأكد من استقامة الأعمدة من كافة الجوانب قبل أعمال الصب وإعادة الاستلام مرة أخرى عقب فك الشدة الخشبية. د- الالتزام بالمخطط الإنشائي أثناء التنفيذ وذلك بالنسبة لأعمال (الحطات – أبعاد الأعمدة – ارتفاع الأعمدة).",
  },
  {
    no: 19,
    title: "Slabs & Roofs",
    body: "Slab formwork is a timber structure designed to match the required concrete shape, into which the concrete is cast until it has fully set and which holds it until it gains cohesion; new timber must be used and the structural drawing and architectural limits of the slab must be followed. Slabs are principal elements in building design, the appearance and proper function of the building are affected by how they are designed and executed. Slab steel fixing: (a) adherence to the structural drawing for the reinforcement works; (b) observance of the structural details on the drawing. Slab casting: (a) adherence to the required strength for casting the concrete element; (b) thorough wetting of the timber moulds before casting; (c) use of a vibrator during casting.",
    titleAr: "الأسقف",
    bodyAr: "الشدة الخشبية للسقف: عبارة عن هيكل خشبي يصمم بشكل معين يناسب شكل الخرسانة المطلوب تصب فيه الخرسانة حتى يكتمل تصلدها ويحافظ عليها حتى التماسك، ولابد من استخدام خشب جديد والالتزام بالمخطط الإنشائي والحدود المعمارية للسقف. تعد الأسقف من العناصر الرئيسية في تصميم المباني حيث تتأثر مظهر المبنى ووظيفته المناسبة بطريقة تصميمه وتنفيذه. أعمال حدادة السقف: أ- الالتزام بالمخطط الإنشائي بالنسبة لأعمال التسليح. ب- مراعاة التفاصيل الإنشائية بالمخطط. أعمال صب السقف: أ- الالتزام بالإجهاد المطلوب لصب العنصر الخرساني. ب- الرش الجيد للقوالب الخشبية قبل أعمال الصب. ج- استخدام الهزاز أثناء أعمال الصب.",
  },
  {
    no: 20,
    title: "Blockwork",
    body: "Blockwork divides into external and internal walls. (a) External walls: the best block type is insulated volcanic block. (b) Internal walls: the best block type is vertical red block. (c) Adherence to the architectural drawing. (d) Squaring of rooms, bathrooms and kitchens per the drawing. (e) Levelling the walls both horizontally and vertically. (f) Pointing the blockwork front and back.",
    titleAr: "أعمال المباني",
    bodyAr: "تنقسم أعمال المباني إلى مباني خارجية ومباني داخلية. أ- مباني خارجية: أفضل أنواع البلوك المستخدم البلوك البركاني المعزول. ب- مباني داخلية: أفضل أنواع البلوك المستخدم البلوك الأحمر العامودي. ج- الالتزام بالمخطط المعماري. د- الالتزام بتربيع الغرف والحمامات والمطابخ طبقًا للمخطط. هـ- توزين أفقية ورأسية الجدران. و- الالتزام بتكحيل المباني من الأمام والخلف.",
  },
  {
    no: 21,
    title: "Electromechanical Works",
    body: "Electromechanical works divide as follows: 1, Sanitary extension works: carrying out the extensions in accordance with the sanitary drawings, including installation and maintenance of water systems, sewerage, and air-conditioning and heating drainage.",
    titleAr: "الأعمال الكهروميكانيكية",
    bodyAr: "تنقسم الأعمال الكهروميكانيكية إلى الآتي: 1- أعمال التمديدات الصحية: عبارة عن عمل التمديدات طبقًا للمخططات الصحية وتشمل تركيب أنظمة المياه وصيانتها والصرف الصحي وصرف التكييف والتدفئة.",
  },
];

export type StageCategory = {
  key: string;
  label: string;
  labelAr: string;
  from: number;
  to: number;
};

export const stageCategories: StageCategory[] = [
  { key: "pre-construction", label: "Pre-Construction", labelAr: "ما قبل التنفيذ", from: 1, to: 1 },
  { key: "earthworks", label: "Earthworks & Testing", labelAr: "أعمال الحفر والاختبارات", from: 2, to: 3 },
  { key: "foundation-prep", label: "Foundation Preparation", labelAr: "تجهيز الأساسات", from: 4, to: 6 },
  { key: "substructure", label: "Substructure", labelAr: "البنية التحتية", from: 7, to: 17 },
  { key: "superstructure", label: "Superstructure", labelAr: "البنية الفوقية", from: 18, to: 19 },
  { key: "envelope-mep", label: "Blockwork & MEP", labelAr: "أعمال المباني والكهروميكانيك", from: 20, to: 21 },
];

export function categoryLabelText(category: StageCategory, locale: Locale) {
  return locale === "ar" ? category.labelAr : category.label;
}

export function categoryForStage(no: number) {
  return stageCategories.find((c) => no >= c.from && no <= c.to);
}

export const workflowPhases = [
  {
    title: "Planning",
    body: "Site setup, permits, municipality clearances and the project identification board, stage 1 of the structural programme.",
    titleAr: "التخطيط",
    bodyAr: "تجهيز الموقع، التراخيص، إجراءات البلدية واللوحة التعريفية بالمشروع، وهي المرحلة الأولى من البرنامج الإنشائي.",
  },
  {
    title: "Design",
    body: "Architectural and structural design, merging form with function, before a single metre is excavated.",
    titleAr: "التصميم",
    bodyAr: "التصميم المعماري والإنشائي، يجمع بين الشكل والوظيفة، قبل حفر أي متر من الأرض.",
  },
  {
    title: "Engineering",
    body: "Soil report, founding levels, plate load testing and the reinforcement design that follows from them.",
    titleAr: "الهندسة",
    bodyAr: "تقرير التربة، منسوب التأسيس، اختبار التحميل، وتصميم التسليح المبني عليها.",
  },
  {
    title: "Construction",
    body: "The 21-stage structural programme: excavation, raft, columns, tie beams, slabs, blockwork and mechanical, electrical and plumbing (MEP) first fix.",
    titleAr: "التنفيذ",
    bodyAr: "البرنامج الإنشائي بمراحله الـ21: الحفر، اللبشة، الأعمدة، الميدات، الأسقف، أعمال المباني والتأسيسات الكهروميكانيكية.",
  },
  {
    title: "Quality Control",
    body: "Continuous follow-up between execution and supervision teams, 95% compaction checks, plumb-bob verification, re-inspection after striking formwork.",
    titleAr: "ضبط الجودة",
    bodyAr: "متابعة مستمرة بين فرق التنفيذ والإشراف، فحص نسبة الدمك 95%، التحقق بميزان البلبل، وإعادة الفحص بعد فك الشدة الخشبية.",
  },
  {
    title: "Completion",
    body: "The finishing programme, from preparatory works through to handing over the project ready for use.",
    titleAr: "التسليم",
    bodyAr: "برنامج التشطيب، من الأعمال التحضيرية حتى تسليم المشروع جاهزًا للاستخدام.",
  },
];

export const stageImages = [
  "/images/work-img1.avif",
  "/images/work-img2.avif",
  "/images/work-img3.avif",
  "/images/work-img4.avif",
  "/images/work-img5.avif",
  "/images/work-img6.avif",
  "/images/work-img7.avif",
  "/images/work-img8.avif",
];
