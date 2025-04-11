export const models: string[] = [
  `asset MonaLisa {
      PAINTING, 
      "Oil on wood, Renaissance period, delicate colors", 
      GOOD, 
      parameter1
    }
    asset TheLastSupper {
      PAINTING, 
      "Tempera on gesso, fragile surface, historical significance", 
      CRITICAL, 
      parameter2
    }
    parameter parameter1 {
      21.5, "°C"
    }
    parameter parameter2 {
      50, "%"
    }
    intervention Cleaning1 {
      MonaLisa, 
      "Careful dust removal and application of a protective coat"
    }
    intervention Restoration1 {
      TheLastSupper, 
      "Humidity control and surface stabilization treatment"
    }`,

  `asset David {
      SCULPTURE, 
      "Marble, 5 meters tall, Renaissance masterpiece", 
      PRISTINE, 
      parameter3
    }
    parameter parameter3 {
      19.8, "°C"
    }
    intervention Polishing {
      David, 
      "Application of a thin wax layer for preservation"
    }
    intervention StabilityCheck {
      David,
      "Micro-fracture analysis and structural assessment"
    }
    intervention Restoration {
      David,
      "Micro-fracture analysis and structural assessment"
    }`,

  `asset Colosseum {
      BUILDING, 
      "Travertine stone, iconic Roman amphitheater, partially ruined", 
      DEGRADED
    }
    asset NotreDame {
      BUILDING, 
      "Limestone, Gothic cathedral, fire-damaged structure", 
      DEGRADED, 
      parameter5,
      parameter6
    }
    parameter parameter5 {
      10.2, "ppm"
    }
    parameter parameter6 {
      12.4, "ppm"
    }
    intervention Restoration {
      Colosseum, 
      "Reinforcement of collapsed arches and cleaning of outer walls"
    }
    intervention Reconstruction {
      NotreDame, 
      "Restoration of burned wooden framework and roof stabilization"
    }`,

  `asset StarryNight {
      PAINTING, 
      "Oil on canvas, post-impressionist masterpiece, vibrant colors", 
      CRITICAL, 
      parameter7
    }
    asset Sunflowers {
      PAINTING, 
      "Oil on canvas, famous floral depiction, thick brushstrokes", 
      GOOD, 
      parameter8
    }
    parameter parameter7 {
      18, "°C"
    }
    parameter parameter8 {
      20, "°C"
    }
    intervention Cleaning2 {
      StarryNight, 
      Sunflowers, 
      "Removal of aged varnish layers and pigment analysis"
    }
    intervention Preservation {
      Sunflowers, 
      StarryNight, 
      "Light exposure control to prevent color fading"
    }`,

  `asset WingedVictory {
      SCULPTURE, 
      "Marble, ancient Greek origin, missing arms and head", 
      PRISTINE, 
      parameter9
    }
    intervention Dusting {
      "Gentle dusting and application of protective coating"
    }
    asset TheThinker {
      SCULPTURE, 
      "Bronze, famous philosophical pose, detailed musculature", 
      GOOD, 
      parameter10
    }
    parameter parameter9 {
      40, "%"
    }
    parameter parameter10 {
      41, "%"
    }
    intervention MetalPreservation {
      "Corrosion prevention through chemical treatment"
    }`,

  `asset TheScream {
      PAINTING, 
      "Oil, tempera, pastel on cardboard, expressionist style", 
      CRITICAL, 
      parameter11
    }
    parameter parameter11 {
      22, "°C"
    }
    intervention StructuralReinforcement {
      TheScream, 
      "Strengthening of fragile areas and humidity control"
    }
    intervention SurfaceCleaning {
      TheScream,
      "Careful removal of dust and pollutants from the surface"
    }
    parameter parameter12 {
      19, "°C"
    }`,

  `asset LibertyStatue {
      SCULPTURE, 
      "Copper, neoclassical design, oxidized green patina", 
      GOOD, 
      parameter13
    }
    asset MountRushmore {
      SCULPTURE, 
      "Granite, large-scale carved presidential faces", 
      GOOD, 
      parameter14
    }
    asset TheKiss {
    SCULPTURE, 
    "Marble, Rodin’s famous embrace sculpture, expressive form", 
    GOOD, 
    parameter13
   }
    parameter parameter13 {
      60, "%"
    }
    parameter parameter14 {
      50, "%"
    }
    intervention MetalOxidationControl {
      LibertyStatue, 
      TheKiss,
      "Assessment of oxidation and surface cleaning"
    }
    intervention WeatheringAnalysis {
      MountRushmore, 
      "Study of erosion patterns and preventive maintenance"
    }
    intervention SurfaceRestoration {
      LibertyStatue, 
      "Restoration of surface finish and structural integrity"
    }`,

  `asset BigBen {
      BUILDING, 
      "Gothic revival clock tower, sandstone structure", 
      DEGRADED, 
      parameter15
    }
    intervention StonePreservation {
      GreatWall, 
      "Application of erosion-resistant materials and monitoring"
    }
    asset GreatWall {
      BUILDING, 
      "Stone, brick, and tamped earth fortification, ancient Chinese origin", 
      DEGRADED, 
      parameter16
    }
    parameter parameter15 {
      8, "ppm"
    }
    parameter parameter16 {
      6, "ppm"
    }
    intervention StructuralAssessment {
      BigBen, 
      "Inspection of cracks and structural reinforcements"
    }`,

  `asset TajMahal {
    BUILDING, 
    "White marble mausoleum, Mughal architecture", 
    GOOD, 
    parameter17
  }
  parameter parameter17 {
    15.6, "°C"
  }
  intervention StructuralReinforcement {
    TajMahal, 
    "Foundation stabilization and anti-pollution coating"
  }
  intervention CorrosionControl {
    "Rust prevention and repainting for structural preservation"
  }`,

  `asset Stonehenge {
    BUILDING, 
    "Prehistoric stone circle, astronomical significance", 
    PRISTINE, 
    parameter19
  }
  asset Petra {
    BUILDING, 
    "Ancient rock-cut architecture, Nabatean heritage site", 
    DEGRADED, 
    parameter20
  }
  asset EiffelTower {
    BUILDING, 
    "Wrought iron lattice tower, Parisian landmark", 
    DEGRADED, 
    parameter18
  }
  parameter parameter18 {
    5.8, "ppm"
  }
  parameter parameter19 {
    9.5, "°C"
  }
  parameter parameter20 {
    11.2, "ppm"
  }
  intervention SurfaceProtection {
    Stonehenge, 
    EiffelTower,
    "Prevention of biological growth on stone surfaces"
  }
  intervention SandstonePreservation {
    Petra, 
    "Erosion control and reinforcement of weathered facades"
  }`,

  `asset SistineChapel {
    BUILDING, 
    "Renaissance chapel, frescoed by Michelangelo", 
    GOOD, 
    parameter21,
    lux
  }
  asset LeaningTower {
    BUILDING, 
    "White marble bell tower, world-famous tilt", 
    CRITICAL
  }
  parameter parameter21 {
    18, "°C"
  }
  parameter lux {
    50, "Lux"
  }
  intervention CeilingRestoration {
    SistineChapel, 
    "Cleaning and stabilization of Michelangelo's frescoes"
  }
  intervention FoundationCorrection {
    LeaningTower, 
    "Adjustment of tilt and soil reinforcement"
  }`,

  `asset ThePieta {
    SCULPTURE, 
    "Marble, Michelangelo's masterpiece, sorrowful depiction", 
    PRISTINE, 
    parameter23
  }
  asset EiffelTower {
    BUILDING, 
    "Wrought iron lattice tower, Parisian landmark", 
    DEGRADED
  }
  asset MoaiStatue {
    SCULPTURE, 
    "Volcanic tuff monolith, Easter Island, cultural significance", 
    DEGRADED, 
    parameter24
  }
  parameter parameter23 {
    19, "°C"
  }
  parameter parameter24 {
    55, "%"
  }
  intervention MicroFractureAnalysis {
    ThePieta, 
    "Detailed scanning for potential internal cracks"
  }
  intervention ErosionStudy {
    MoaiStatue, 
    "Assessment of environmental erosion and conservation measures"
  }`,

  `asset TheKiss {
    SCULPTURE, 
    "Marble, Rodin’s famous embrace sculpture, expressive form", 
    GOOD, 
    parameter25
  }
  parameter parameter25 {
    16, "°C"
  }
  parameter parameter26 {
    60, "%"
  }
  asset ChristRedeemer {
    SCULPTURE, 
    "Reinforced concrete, soapstone, monumental landmark", 
    GOOD, 
    parameter26
  }
  intervention StonePolishing {
    TheKiss, 
    ChristRedeemer, 
    "Surface treatment for aesthetic enhancement"
  }
  intervention WeatheringPrevention {
    ChristRedeemer, 
    "Anti-erosion coating application and lightning protection"
  }`,

  `asset TheBirthOfVenus {
    PAINTING, 
    "Tempera on canvas, Botticelli's mythological masterpiece", 
    GOOD, 
    parameter27
  }
  asset GirlWithPearlEarring {
    PAINTING, 
    "Oil on canvas, delicate chiaroscuro, Dutch Golden Age", 
    PRISTINE
  }
  parameter parameter27 {
    21, "°C"
  }
  intervention PigmentAnalysis {
    TheBirthOfVenus, 
    GirlWithPearlEarring,
    "Research on color degradation and light impact"
  }
  intervention FrameRestoration {
    GirlWithPearlEarring, 
    "Repair and reinforcement of original wooden frame"
  }`,

  `asset TheGreatWave {
    PAINTING, 
    "Woodblock print, Hokusai's iconic ocean depiction", 
    PRISTINE, 
    parameter29
  }
  parameter parameter30 {
    22, "°C"
  }
  asset TheNightWatch {
    PAINTING, 
    "Oil on canvas, large-scale Baroque masterpiece", 
    GOOD, 
    parameter30
  }
  parameter parameter29 {
    18, "°C"
  }
  intervention InkPreservation {
    TheGreatWave, 
    "UV light filtering to prevent ink fading"
  }
  intervention StructuralReinforcement {
    "Canvas tightening and varnish restoration"
  }`,

  `asset LasMeninas {
    PAINTING, 
    "Oil on canvas, complex Baroque composition, Velázquez", 
    GOOD, 
    parameter31
  }
  asset AmericanGothic {
    PAINTING, 
    "Oil on board, famous double-portrait, Regionalist style", 
    PRISTINE, 
    parameter32
  }
  parameter parameter31 {
    19, "°C"
  }
  parameter parameter32 {
    17, "°C"
  }
  intervention CrackRestoration {
    "Filling of micro-fractures and pigment stabilization"
  }
  intervention ProtectiveGlazing {
    "Installation of anti-reflective glass for UV protection"
  }`,

  `asset GizaPyramids {
    BUILDING, 
    "Limestone, ancient Egyptian tombs, monumental scale", 
    DEGRADED, 
    parameter33
  }
  asset MachuPicchu {
    BUILDING, 
    "Stone, Incan citadel, high-altitude archaeological site", 
    GOOD, 
    parameter33
  }
  parameter parameter33 {
    7.3, "ppm"
  }
  parameter parameter34 {
    9.8, "ppm"
  }
  intervention SandErosionControl {
    GizaPyramids, 
    "Prevention of wind and sand erosion on stone blocks"
  }
  intervention StructuralMonitoring {
    MachuPicchu, 
    "Seismic activity monitoring and stabilization measures"
  }`,

  `asset TheLouvre {
    BUILDING, 
    "Historic palace, world-renowned art museum", 
    GOOD
  }
  asset TheAlhambra {
    BUILDING, 
    "Moorish fortress-palace, intricate Islamic architecture", 
    PRISTINE, 
    temperature,
    humidity
  }
  parameter temperature {
    12, "°C"
  }
  parameter humidity {
    55, "%"
  }
  intervention ClimateControlUpgrade {
    TheLouvre, 
    "Optimization of humidity and temperature regulation"
  }
  intervention MuralPreservation {
    TheAlhambra, 
    "Restoration of faded wall frescoes and calligraphy"
  }
  intervention StructuralMonitoring {
    TheLouvre, 
    "Seismic activity monitoring and stabilization measures"
  }`,

  `asset TheGutenbergBible {
    PAINTING, 
    "Printed book, earliest major movable type publication", 
    GOOD, 
    parameter37
  }
  asset TheBayeuxTapestry {
    PAINTING, 
    "Embroidered cloth, medieval historical narrative", 
    DEGRADED, 
    parameter38
  }
  parameter parameter37 {
    20, "°C"
  }
  parameter parameter38 {
    55, "%"
  }
  intervention InkFadingPrevention {
    TheGutenbergBible, 
    "Reduction of UV exposure to prevent ink deterioration"
  }
  intervention TextileRestoration {
    TheBayeuxTapestry, 
    TheGutenbergBible,
    "Reinforcement of fabric threads and protection from humidity"
  }`,

  `asset TheTerracottaArmy {
    SCULPTURE, 
    "Clay soldiers, ancient Chinese funerary art", 
    DEGRADED, 
    parameter39,
    humidity
  }
  parameter parameter39 {
    11, "°C"
  }
  parameter humidity {
    55, "%"
  }
  intervention ClayPreservation {
    TheTerracottaArmy, 
    "Chemical stabilization to prevent further degradation"
  }
  intervention MarbleSurfaceCleaning {
    "Dust removal and enhancement of surface texture"
  }`,

  `asset StPetersBasilica {
    BUILDING, 
    "Largest Renaissance church, Vatican City", 
    GOOD, 
    parameter41
  }
  asset HagiaSophia {
    BUILDING, 
    "Byzantine cathedral, converted mosque, rich mosaics", 
    DEGRADED, 
    parameter42
  }
  parameter parameter41 {
    13, "°C"
  }
  parameter parameter42 {
    10, "°C"
  }
  intervention DomeInspection {
    "Assessment of structural integrity of central dome"
  }
  intervention MosaicRestoration {
    "Cleaning and conservation of ancient Byzantine mosaics"
  }`,

  `asset TheStatueOfZeus {
    SCULPTURE, 
    "Ancient Greek, gold and ivory, lost wonder of the world", 
    CRITICAL, 
    parameter43
  }
  asset MachuPicchu {
    BUILDING, 
    "Stone, Incan citadel, high-altitude archaeological site", 
    GOOD, 
    parameter43
  }
  asset TheColossusOfRhodes {
    SCULPTURE, 
    "Bronze statue, destroyed ancient wonder, large scale", 
    DEGRADED, 
    parameter44
  }
  parameter parameter43 {
    22, "°C"
  }
  parameter parameter44 {
    50, "%"
  }
  intervention StructuralReinforcement {
    TheColossusOfRhodes, 
    MachuPicchu,
    "Reconstruction of historical accounts and depictions"
  }
  intervention ArchivalResearch {
    TheStatueOfZeus, 
    "Reconstruction of historical accounts and depictions"
  }
  intervention BronzeCorrosionStudy {
    TheColossusOfRhodes, 
    "Analysis of metal corrosion and structural remnants"
  }`,

  `asset TheRosettaStone {
    SCULPTURE, 
    "Granodiorite stele, key to deciphering Egyptian hieroglyphs", 
    PRISTINE, 
    parameter45
  }
  asset TheDeadSeaScrolls {
    PAINTING, 
    "Ancient Jewish manuscripts, parchment and papyrus", 
    DEGRADED, 
    parameter46
  }
  parameter parameter45 {
    18, "°C"
  }
  parameter parameter46 {
    40, "%"
  }
  intervention EngravingProtection {
    TheRosettaStone, 
    "Shielding from physical wear and tear from exposure"
  }
  intervention HumidityControl {
    "Precise moisture regulation to prevent further deterioration"
  }`,

  `
  parameter parameter47 {
    9, "°C"
  }
  parameter centigrade48 {
    8, "ppm"
  }
  asset TheAcropolis {
    BUILDING, 
    "Ancient Greek citadel, marble structures, Parthenon", 
    DEGRADED, 
    parameter47
  }
  asset ChichenItza {
    BUILDING, 
    "Mayan pyramid, astronomical significance, stepped design", 
    GOOD, 
    centigrade48
  }
  intervention ColumnReinforcement {
    TheAcropolis, 
    "Strengthening of eroded marble columns and foundations"
  }
  intervention WeatheringAnalysis {
    ChichenItza, 
    "Study of limestone erosion and surface treatment"
  }`,

  `asset VenusDeMilo {
    SCULPTURE, 
    "Marble, ancient Greek masterpiece, missing arms", 
    GOOD, 
    parameter3
  }
  intervention Cleaning2 {
  VenusDeMilo, 
  "Surface dust removal and gentle polishing"
  }
  intervention Reconstruction1 {
    NotreDame, 
    VenusDeMilo, 
    "Structural reinforcement and restoration of fire damage"
  }
  parameter parameter3 {
    18, "°C"
  }
  parameter parameter4 {
    65, "%"
  }
  asset NotreDame {
    BUILDING, 
    "Gothic cathedral, historical landmark, fire-damaged", 
    DEGRADED, 
    parameter4
  }`,

  `asset TerracottaArmy {
  SCULPTURE, 
  "Clay statues, ancient Chinese funerary art, fragile", 
  PRISTINE, 
  parameter5
}
asset SistineChapel {
  BUILDING, 
  "Frescoed ceiling, Renaissance art, Michelangelo masterpiece", 
  GOOD, 
  parameter6
}
parameter parameter5 {
  22, "°C"
}
parameter parameter6 {
  55, "%"
}
intervention Preservation1 {
  TerracottaArmy, 
  SistineChapel, 
  "Humidity-controlled storage and periodic inspection"
}
intervention Cleaning3 {
  SistineChapel, 
  TerracottaArmy, 
  "Ceiling dust removal and light color touch-ups"
}`,

`
intervention Inspection1 {
  Guernica, 
  "Routine examination for color stability"
}
intervention Reinforcement1 {
  Colosseum, 
  "Structural reinforcement to prevent further erosion"
}
asset Guernica {
  PAINTING, 
  "Oil on canvas, Picasso, anti-war symbolism", 
  PRISTINE, 
  parameter7
}
asset Colosseum {
  BUILDING, 
  "Roman amphitheater, stone structure, erosion issues", 
  DEGRADED, 
  parameter8
}
parameter parameter7 {
  20, "°C"
}
parameter parameter8 {
  70, "%"
}`,
 
`asset StarryNight {
  PAINTING, 
  "Oil on canvas, Van Gogh, post-impressionist masterpiece", 
  GOOD, 
  parameter9
}
asset DejunerSurLHerbe {
  PAINTING, 
  "Oil on canvas, Édouard Manet, impressionist masterpiece", 
  GOOD, 
  parameter11
}
asset Petra {
  BUILDING, 
  "Ancient rock-cut architecture, Jordan, weathering issues", 
  CRITICAL, 
  parameter10
}
parameter parameter9 {
  50, "Lux"
}
parameter parameter11 {
  25, "°C"
}
parameter parameter10 {
  60, "%"
}
intervention Cleaning4 {
  StarryNight, 
  "Surface cleaning and protective varnish application"
}
intervention Conservation1 {
  Petra, 
  "Erosion control and structural reinforcement"
}`,

`asset TheThinker {
  SCULPTURE, 
  "Bronze statue, Rodin, exposed to weather", 
  DEGRADED
}
asset Alhambra {
  BUILDING, 
  "Moorish palace, intricate architecture, delicate surfaces", 
  GOOD,
  parameter11, 
  parameter12
}
parameter parameter11 {
  16, "°C"
}
parameter parameter12 {
  50, "%"
}
intervention Coating1 {
  TheThinker, 
  "Protective wax application to prevent oxidation"
}
intervention Cleaning5 {
  Alhambra, 
  "Delicate cleaning of stucco and ceramic details"
}`,

`
parameter parameter13 {
  21, "°C"
}
parameter parameter14 {
  55, "%"
}
parameter lux {
  150, "Lux"
}
asset Sunflowers {
  PAINTING, 
  "Oil on canvas, Van Gogh, vibrant colors, delicate texture", 
  PRISTINE,
  lux
}
asset MachuPicchu {
  BUILDING, 
  "Ancient Inca citadel, stonework, seismic vulnerability", 
  GOOD, 
  parameter14
}
intervention Inspection2 {
  Sunflowers, 
  "Color stability analysis and humidity control"
}
intervention Stabilization1 {
  MachuPicchu, 
  "Seismic reinforcement and erosion prevention"
}`,

`intervention Restoration1 {
  Stonehenge, 
  "Full restoration of fallen stones and site stabilization"
}
asset TheGreatWave {
  PAINTING, 
  "Woodblock print, Hokusai, iconic Japanese art", 
  GOOD, 
  parameter15
}
asset Stonehenge {
  BUILDING, 
  "Prehistoric stone circle, astronomical significance", 
  DEGRADED, 
  parameter16
}
parameter parameter15 {
  20, "°C"
}
parameter parameter16 {
  65, "%"
}
parameter parameter18 {
  65, "%"
}
intervention Preservation2 {
  TheGreatWave, 
  "UV protection and controlled display conditions"
}
intervention Support1 {
  Stonehenge, 
  "Structural support to prevent stone displacement"
}`,

`
asset TajMahal {
  BUILDING, 
  "White marble mausoleum, Mughal architecture, pollution damage", 
  CRITICAL, 
  parameter17,
  parameter18
}
parameter parameter17 {
  25, "°C"
}
parameter parameter18 {
  72, "%"
}
parameter lumen {
  200, "Lux"
}
intervention ErosionControl1 {
  "Protective measures against wind and salt erosion"
}
intervention Cleaning6 {
  TajMahal, 
  "Removal of pollution stains and marble preservation treatment"
}`
];
