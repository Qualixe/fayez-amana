export type Stage = {
  no: number;
  title: string;
  body: string;
};

export const stages: Stage[] = [
  {
    no: 1,
    title: "Site Setup & Permits",
    body: "A hoarding is erected around the full site boundary, with water and electricity sources provided, the site licence and project identification board prepared, and any municipality procedures, such as pavement rental, cleared to prevent violations.",
  },
  {
    no: 2,
    title: "Reaching Founding Level",
    body: "Excavation down to the founding level listed in the soil report.",
  },
  {
    no: 3,
    title: "Plate Load Test",
    body: "Load testing: the purpose is to verify the bearing capacity of the soil and the permissible settlement, and whether these are within the safe limits assumed by the design.",
  },
  {
    no: 4,
    title: "Anti-Termite Treatment",
    body: "Pesticide is sprayed in three stages, before the site blinding concrete, before casting the tie beams, and before the ground-floor blinding, to protect against termites and insects emerging from the soil.",
  },
  {
    no: 5,
    title: "Polythene Membrane",
    body: "The polythene sheet forms an insulating layer between the blinding concrete and the soil, retaining the mix water so the soil cannot absorb it.",
  },
  {
    no: 6,
    title: "Blinding Concrete",
    body: "Blinding concrete protects the main foundations from the soil beneath them, since moisture and chemicals present, such as sulphates, can attack and weaken the concrete.",
  },
  {
    no: 7,
    title: "Reinforced Raft Foundation",
    body: "The reinforced raft: the footings distribute the structure's large, concentrated loads over a greater area so the loading intensity does not exceed the safe bearing capacity of the founding soil.",
  },
  {
    no: 8,
    title: "Column Necks",
    body: "Column necks: the first part of the column cast above the reinforced footing, the element carrying the greatest structural weight and transferring it to the footing and on to the founding soil.",
  },
  {
    no: 9,
    title: "Column Necks, Execution",
    body: "Column necks: the first part of the column cast above the reinforced footing, the element carrying the greatest structural weight and transferring it to the footing and on to the founding soil.",
  },
  {
    no: 10,
    title: "Backfilling Works",
    body: "Backfilling: 1, coarse, well-graded granular soil comprising gravel and sand is preferred and considered among the best fill types; a classification test is run on the fill sample, ideally of type (a-1-a). 2, the fill is placed in 30 cm layers in accordance with the code.",
  },
  {
    no: 11,
    title: "Column Necks, Continuation",
    body: "Column necks: the first part of the column cast above the reinforced footing, the element carrying the greatest structural weight and transferring it to the footing and on to the founding soil.",
  },
  {
    no: 12,
    title: "Column Necks, Completion",
    body: "Column necks: the first part of the column cast above the reinforced footing, the element carrying the greatest structural weight and transferring it to the footing and on to the founding soil.",
  },
  {
    no: 13,
    title: "Tie Beams",
    body: "Execution of the concrete tie beams linking the footings in accordance with the structural drawing.",
  },
  {
    no: 14,
    title: "Tie Beam Waterproofing",
    body: "Tie beam insulation prevents moisture transferring into the ground-floor walls, which would otherwise cause paint peeling problems.",
  },
  {
    no: 15,
    title: "Tie Beam Backfill",
    body: "Tie beam backfilling: fill is placed in 30 cm layers in accordance with the code.",
  },
  {
    no: 16,
    title: "Compaction",
    body: "Compaction of the tie beam fill: to confirm 95% compaction is achieved for every layer, so that no settlement occurs, settlement would crack the ground-floor blinding and in turn cause the ground-floor tiling to drop.",
  },
  {
    no: 17,
    title: "Ground Floor Blinding",
    body: "Ground-floor blinding concrete provides a uniform surface for the ground-floor tiling works and prevents direct contact with the tie beam backfill soil.",
  },
  {
    no: 18,
    title: "Columns",
    body: "Columns are among the most important structural elements, receiving loads from the slab and beams and transferring them to the footings and on to the soil. Column formwork: (a) the timber formwork must be new; (b) proper strengthening using tie rods, clamps and sound bracing to prevent the formwork from coming apart during casting; (c) plumbing the columns with a plumb bob to confirm they are true on all sides before casting, and re-checking after the formwork is struck; (d) adherence to the structural drawing during execution with respect to setting-out, column dimensions and column heights.",
  },
  {
    no: 19,
    title: "Slabs & Roofs",
    body: "Slab formwork is a timber structure designed to match the required concrete shape, into which the concrete is cast until it has fully set and which holds it until it gains cohesion; new timber must be used and the structural drawing and architectural limits of the slab must be followed. Slabs are principal elements in building design, the appearance and proper function of the building are affected by how they are designed and executed. Slab steel fixing: (a) adherence to the structural drawing for the reinforcement works; (b) observance of the structural details on the drawing. Slab casting: (a) adherence to the required strength for casting the concrete element; (b) thorough wetting of the timber moulds before casting; (c) use of a vibrator during casting.",
  },
  {
    no: 20,
    title: "Blockwork",
    body: "Blockwork divides into external and internal walls. (a) External walls: the best block type is insulated volcanic block. (b) Internal walls: the best block type is vertical red block. (c) Adherence to the architectural drawing. (d) Squaring of rooms, bathrooms and kitchens per the drawing. (e) Levelling the walls both horizontally and vertically. (f) Pointing the blockwork front and back.",
  },
  {
    no: 21,
    title: "Electromechanical Works",
    body: "Electromechanical works divide as follows: 1, Sanitary extension works: carrying out the extensions in accordance with the sanitary drawings, including installation and maintenance of water systems, sewerage, and air-conditioning and heating drainage.",
  },
];

export type StageCategory = {
  key: string;
  label: string;
  from: number;
  to: number;
};

export const stageCategories: StageCategory[] = [
  { key: "pre-construction", label: "Pre-Construction", from: 1, to: 1 },
  { key: "earthworks", label: "Earthworks & Testing", from: 2, to: 3 },
  { key: "foundation-prep", label: "Foundation Preparation", from: 4, to: 6 },
  { key: "substructure", label: "Substructure", from: 7, to: 17 },
  { key: "superstructure", label: "Superstructure", from: 18, to: 19 },
  { key: "envelope-mep", label: "Blockwork & MEP", from: 20, to: 21 },
];

export function categoryForStage(no: number) {
  return stageCategories.find((c) => no >= c.from && no <= c.to);
}

export const workflowPhases = [
  {
    title: "Planning",
    body: "Site setup, permits, municipality clearances and the project identification board, stage 1 of the structural programme.",
  },
  {
    title: "Design",
    body: "Architectural and structural design, merging form with function, before a single metre is excavated.",
  },
  {
    title: "Engineering",
    body: "Soil report, founding levels, plate load testing and the reinforcement design that follows from them.",
  },
  {
    title: "Construction",
    body: "The 21-stage structural programme: excavation, raft, columns, tie beams, slabs, blockwork and mechanical, electrical and plumbing (MEP) first fix.",
  },
  {
    title: "Quality Control",
    body: "Continuous follow-up between execution and supervision teams, 95% compaction checks, plumb-bob verification, re-inspection after striking formwork.",
  },
  {
    title: "Completion",
    body: "The finishing programme, from preparatory works through to handing over the project ready for use.",
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
