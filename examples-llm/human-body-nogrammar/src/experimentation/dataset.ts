export const models: string[] = [
    `organ Heart {
        ACTIVE,
        "Pumps blood through the body",
        connectedTo Lung,
        connectedTo Kidney,
        connectedTo Liver
    }
    organ Lung {
        ACTIVE,
        "Facilitates gas exchange",
        connectedTo Heart
    }
    organ Kidney {
        ACTIVE,
        "Filters waste from the blood",
        connectedTo Heart
    }
    organ Liver {
        ACTIVE,
        "Processes nutrients and detoxifies chemicals",
        connectedTo Heart
    }
    parameter HeartRate {
        72,
        "bpm"
    }
    parameter BloodPressure {
        120.0,
        "mmHg"
    }`,

    `organ Liver {
        ACTIVE,
        "Processes nutrients and detoxifies chemicals",
        connectedTo Heart,
        connectedTo Kidney
    }
    organ Heart {
      ACTIVE,
      "Pumps blood through the body",
      connectedTo Liver,
      connectedTo Kidney
   }
    organ Kidney {
        ACTIVE,
        "Filters waste from blood",
        connectedTo Liver,
        connectedTo Bladder
    }
    organ Bladder {
        ACTIVE,
        "Stores urine"
    }
    parameter Creatinine {
        1.1,
        "mg/dL"
    }
    parameter Urea {
        30.0,
        "mg/dL"
    }`,

    `organ Stomach {
        ACTIVE,
        "Breaks down food",
        connectedTo Intestine,
        connectedTo Liver
    }
    organ Intestine {
        ACTIVE,
        "Absorbs nutrients",
        connectedTo Stomach,
        connectedTo Liver
    }
    organ Pancreas {
        ACTIVE,
        "Regulates blood sugar",
        connectedTo Liver,
        connectedTo Stomach
    }
    parameter Glucose {
        90.0,
        "mg/dL"
    }
    parameter Insulin {
        10.0,
        "µU/mL"
    }
    organ Liver {
        CRITICAL,
        "Processes nutrients and detoxifies chemicals",
        connectedTo Stomach
    }
    `,

    `organ Eye {
      ACTIVE,
      "Provides vision by converting light into neural signals",
      connectedTo Brain
  }
  organ Ear {
      ACTIVE,
      "Processes sound and maintains balance",
      connectedTo Brain
  }
  organ Tongue {
      ACTIVE,
      "Helps in taste, speech, and chewing",
      connectedTo Brain
  }
  organ Brain {
      ACTIVE,
      "Controls body functions including sensory processing and movement",
      connectedTo Eye,
      connectedTo Ear,
      connectedTo Tongue
  }
  parameter Vision {
      20,
      "20/20 vision"
  }
  parameter Hearing {
      30,
      "dB"
  }
  parameter Taste {
      5,
      "Taste sensitivity scale"
  }`,

    `organ Skin {
      ACTIVE,
      "Protects internal organs and regulates temperature",
      connectedTo Brain,
      connectedTo Heart
  }
  organ Bone {
      ACTIVE,
      "Provides structural support",
      connectedTo Muscle
  }
  organ Muscle {
      ACTIVE,
      "Facilitates movement",
      connectedTo Bone,
      connectedTo Heart
  }
  organ Brain {
      ACTIVE,
      "Controls body functions",
      connectedTo Skin
  }
  organ Heart {
      ACTIVE,
      "Pumps blood through the body",
      connectedTo Skin,
      connectedTo Muscle
  }
  parameter Temperature {
      36.6,
      "C"
  }
  parameter Calcium {
      9.5,
      "mg/dL"
  }`,

    `organ Esophagus {
        ACTIVE,
        "Transports food to stomach",
        connectedTo Stomach,
        connectedTo Throat
    }
    organ Throat {
        ACTIVE,
        "Facilitates swallowing",
        connectedTo Esophagus
    }
    organ Tongue {
        ACTIVE,
        "Assists in chewing and speech",
        connectedTo Brain
    }
    parameter pH {
        7.4,
        "pH"
    }
    parameter Saliva {
        1.5,
        "L/day"
    }
    organ Brain {
      ACTIVE,
      "Controls body functions",
      connectedTo Tongue
    } 
    organ Stomach {
        CRITICAL,
        "Breaks down food",
        connectedTo Esophagus
    }   
    `,

    `organ Gallbladder {
      ACTIVE,
      "Stores and releases bile",
      connectedTo Liver,
      connectedTo Intestine
  }
  organ Spleen {
      ACTIVE,
      "Filters blood",
      connectedTo Liver
  }
  organ Appendix {
      INACTIVE,
      "Possible immune function",
      connectedTo Intestine
  }
  organ Liver {
      ACTIVE,
      "Processes nutrients and detoxifies chemicals",
      connectedTo Gallbladder,
      connectedTo Spleen
  }
  organ Intestine {
      ACTIVE,
      "Absorbs nutrients",
      connectedTo Gallbladder,
      connectedTo Appendix
  }
  parameter BileProduction {
      500,
      "mL/day"
  }
  parameter WhiteBloodCells {
      6000,
      "cells/µL"
  }`,

    `organ Thyroid {
      ACTIVE,
      "Regulates metabolism",
      connectedTo Brain
}
  organ AdrenalGland {
      ACTIVE,
      "Produces stress hormones",
      connectedTo Kidney
}
  organ Pituitary {
      ACTIVE,
      "Regulates endocrine functions",
      connectedTo Brain,
      connectedTo Thyroid
}
  organ Brain {
      ACTIVE,
      "Controls body functions",
      connectedTo Pituitary
}
organ Kidney {
      ACTIVE,
      "Filters waste from blood",
      connectedTo AdrenalGland
}
parameter TSH {
      2.0,
      "µIU/mL"
}
parameter Cortisol {
      18.0,
      "µg/dL"
}`,

    `organ Heart {
      ACTIVE,
      "Pumps blood through the body to supply oxygen and nutrients",
      connectedTo Brain,
      connectedTo Lung,
      connectedTo Kidney
}
organ Lung {
      ACTIVE,
      "Facilitates gas exchange by inhaling oxygen and exhaling carbon dioxide",
      connectedTo Heart,
      connectedTo Brain
}
organ Brain {
      ACTIVE,
      "Controls body functions, including breathing and heart rate",
      connectedTo Heart,
      connectedTo Lung
}
organ Kidney {
      ACTIVE,
      "Filters waste from the blood and regulates fluid balance",
      connectedTo Heart
}
parameter HeartRate {
      72,
      "bpm"
}
parameter OxygenSaturation {
      95.0,
      "%"
}`,

    `organ Heart {
      ACTIVE,
      "Pumps blood through the body to supply oxygen and nutrients",
      connectedTo Brain,
      connectedTo Lung,
      connectedTo Kidney,
      connectedTo Liver
  }
  organ Brain {
      ACTIVE,
      "Controls body functions and regulates breathing and heart rate",
      connectedTo Heart,
      connectedTo Lung
  }
  organ Lung {
      ACTIVE,
      "Facilitates gas exchange by inhaling oxygen and exhaling carbon dioxide",
      connectedTo Heart,
      connectedTo Brain
  }
  organ Kidney {
      ACTIVE,
      "Filters waste from blood and regulates fluid balance",
      connectedTo Heart,
      connectedTo Liver
  }
  organ Liver {
      ACTIVE,
      "Processes nutrients absorbed from the digestive tract and detoxifies chemicals",
      connectedTo Kidney,
      connectedTo Heart
  }
  parameter HeartRate {
      72,
      "bpm"
  }
  parameter OxygenSaturation {
      95.0,
      "%"
  }`,

    `organ Stomach {
      ACTIVE,
      "Breaks down food using acids and enzymes",
      connectedTo Liver,
      connectedTo SmallIntestine
  }
  organ Liver {
      ACTIVE,
      "Processes nutrients absorbed from the digestive tract",
      connectedTo Stomach,
      connectedTo SmallIntestine,
      connectedTo Gallbladder
  }
  organ SmallIntestine {
      ACTIVE,
      "Absorbs nutrients and minerals from food",
      connectedTo Stomach,
      connectedTo Liver
  }
  organ Gallbladder {
      ACTIVE,
      "Stores and releases bile to aid in digestion",
      connectedTo Liver
  }
  parameter GastricpH {
      1.5,
      "pH"
  }
  parameter BloodSugar {
      90.0,
      "mg/dL"
  }`,
    `organ Eye {
      ACTIVE,
      "Provides vision by converting light into neural signals",
      connectedTo Brain
  }
  organ Brain {
      ACTIVE,
      "Controls body functions, including sensory inputs and responses",
      connectedTo Eye,
      connectedTo Ear,
      connectedTo Nose
  }
  organ Ear {
      ACTIVE,
      "Processes sound waves and maintains balance",
      connectedTo Brain
  }
  organ Nose {
      ACTIVE,
      "Processes smell and contributes to respiratory function",
      connectedTo Brain
  }
  parameter Vision {
      20,
      "20/20 vision"
  }
  parameter Hearing {
      25,
      "dB"
  }`,
    `organ Bone {
      ACTIVE,
      "Provides structural support to the body",
      connectedTo Muscle,
      connectedTo Brain
  }
  organ Muscle {
      ACTIVE,
      "Facilitates movement by contracting and relaxing",
      connectedTo Bone,
      connectedTo Heart
  }
  organ Heart {
      ACTIVE,
      "Pumps blood through the circulatory system",
      connectedTo Bone,
      connectedTo Muscle
  }
  parameter Calcium {
      9.5,
      "mg/dL"
  }
  parameter MuscleMass {
      45.0,
      "kg"
  }
  organ Brain {
      ACTIVE,
      "Controls body functions, including sensory inputs and responses",
      connectedTo Bone
  }`,
    `organ Spleen {
      ACTIVE,
      "Filters blood and recycles iron from red blood cells",
      connectedTo Liver,
      connectedTo Kidney
  }
  organ Liver {
      ACTIVE,
      "Detoxifies chemicals and metabolizes drugs",
      connectedTo Spleen,
      connectedTo Kidney
  }
  organ Kidney {
      ACTIVE,
      "Filters waste from blood and regulates fluid balance",
      connectedTo Liver,
      connectedTo Spleen
  }
  parameter Bilirubin {
      1.2,
      "mg/dL"
  }
  parameter Creatinine {
      1.0,
      "mg/dL"
  }`,
    `organ Skin {
      ACTIVE,
      "Protects internal organs and regulates body temperature",
      connectedTo Brain,
      connectedTo Heart
  }
  organ Brain {
      ACTIVE,
      "Controls sensory inputs and regulates the nervous system",
      connectedTo Skin,
      connectedTo Heart
  }
  organ SweatGland {
      ACTIVE,
      "Regulates body temperature by secreting sweat",
      connectedTo Skin
  }
  organ Heart {
      ACTIVE,
      "Pumps blood through the circulatory system",
      connectedTo Skin,
      connectedTo Brain
  }
  parameter Temperature {
      36.7,
      "Celsius"
  }
  parameter Hydration {
      50.0,
      "L"
  }`,
    `organ Gallbladder {
      ACTIVE,
      "Stores and releases bile to aid in digestion",
      connectedTo Liver,
      connectedTo SmallIntestine
  }
  organ SmallIntestine {
      ACTIVE,
      "Absorbs nutrients and minerals from food",
      connectedTo Gallbladder,
      connectedTo Stomach
  }
  organ Liver {
      ACTIVE,
      "Processes nutrients absorbed from the digestive tract",
      connectedTo Gallbladder,
      connectedTo SmallIntestine
  }
  organ Stomach {
      ACTIVE,
      "Breaks down food using acids and enzymes",
      connectedTo Gallbladder
  }
  parameter BileProduction {
      500,
      "mL/day"
  }
  parameter LipidLevels {
      200,
      "mg/dL"
  }`,
    `organ Pancreas {
      ACTIVE,
      "Regulates blood sugar levels and secretes digestive enzymes",
      connectedTo SmallIntestine,
      connectedTo Liver
  }
  organ Liver {
      ACTIVE,
      "Regulates metabolism and detoxifies harmful substances",
      connectedTo Pancreas,
      connectedTo SmallIntestine
  }
  organ SmallIntestine {
      ACTIVE,
      "Absorbs nutrients from food",
      connectedTo Pancreas
  }
  organ Stomach {
      ACTIVE,
      "Breaks down food",
      connectedTo Pancreas
  }
  parameter Insulin {
      15.0,
      "µU/mL"
  }
  parameter Glucose {
      90.0,
      "mg/dL"
  }`,
    `organ Heart {
      ACTIVE,
      "Pumps blood throughout the body to provide oxygen and nutrients",
      connectedTo Brain,
      connectedTo Lung
  }
  organ Lung {
      ACTIVE,
      "Facilitates gas exchange and oxygenates blood",
      connectedTo Heart,
      connectedTo Diaphragm
  }
  organ Diaphragm {
      ACTIVE,
      "Regulates breathing by contracting and relaxing",
      connectedTo Lung
  }
  organ Brain {
      ACTIVE,
      "Regulates physiological functions and processes sensory input",
      connectedTo Heart,
      connectedTo Lung
  }
  parameter BloodPressure {
      120,
      "mmHg"
  }
  parameter OxygenLevel {
      98,
      "%"
  }`,
    `organ Stomach {
      ACTIVE,
      "Digests food by using acids and enzymes",
      connectedTo Liver,
      connectedTo SmallIntestine
  }
  organ Liver {
      ACTIVE,
      "Filters toxins from the blood and metabolizes nutrients",
      connectedTo Stomach,
      connectedTo SmallIntestine
  }
  organ SmallIntestine {
      ACTIVE,
      "Absorbs nutrients from digested food",
      connectedTo Stomach,
      connectedTo Liver
  }
  organ LargeIntestine {
      ACTIVE,
      "Absorbs water and forms waste for excretion",
      connectedTo SmallIntestine
  }
  parameter GastricAcid {
      2.0,
      "pH"
  }
  parameter DigestionRate {
      4.5,
      "hours"
  }`,
    `organ Skin {
      ACTIVE,
      "Protects the body and regulates temperature",
      connectedTo Brain,
      connectedTo Muscle
  }
  organ Muscle {
      ACTIVE,
      "Facilitates movement through contraction",
      connectedTo Skin,
      connectedTo Bone
  }
  organ Bone {
      ACTIVE,
      "Provides structural support and protects internal organs",
      connectedTo Muscle
  }
  organ Brain {
      ACTIVE,
      "Processes sensory input and controls body functions",
      connectedTo Skin,
      connectedTo Muscle
  }
  parameter SkinMoisture {
      40,
      "percentage"
  }
  parameter MuscleStrength {
      75,
      "kg"
  }`,
    `organ Kidney {
      ACTIVE,
      "Filters waste products and excess fluids from the blood",
      connectedTo Heart,
      connectedTo Liver
  }
  organ Liver {
      ACTIVE,
      "Detoxifies harmful substances and regulates metabolism",
      connectedTo Kidney,
      connectedTo Stomach
  }
  organ Stomach {
      ACTIVE,
      "Breaks down food with acids and enzymes",
      connectedTo Kidney,
      connectedTo Liver
  }
  organ Bladder {
      ACTIVE,
      "Stores urine before it is excreted",
      connectedTo Kidney
  }
  parameter UrineVolume {
      1500,
      "mL/day"
  }
  parameter KidneyFunction {
      90,
      "mL/min"
  }
  organ Heart {
      ACTIVE,
      "Pumps blood",
      connectedTo Kidney
  }`,
    `organ Eye {
      ACTIVE,
      "Provides vision by detecting light",
      connectedTo Brain
  }
  organ Ear {
      ACTIVE,
      "Helps with hearing and balance",
      connectedTo Brain,
      connectedTo Heart
  }
  organ Heart {
      ACTIVE,
      "Pumps blood throughout the body",
      connectedTo Brain,
      connectedTo Ear
  }
  organ Brain {
      ACTIVE,
      "Controls cognitive functions and regulates vital processes",
      connectedTo Eye,
      connectedTo Ear,
      connectedTo Heart
  }
  parameter VisualAcuity {
      20,
      "20/20 vision"
  }
  parameter PulseRate {
      70,
      "beats per minute"
  }`,
    `organ Pancreas {
      ACTIVE,
      "Regulates blood sugar levels and secretes digestive enzymes",
      connectedTo SmallIntestine,
      connectedTo Liver
  }
  organ Liver {
      ACTIVE,
      "Metabolizes nutrients and detoxifies chemicals",
      connectedTo Pancreas,
      connectedTo SmallIntestine
  }
  organ SmallIntestine {
      ACTIVE,
      "Absorbs nutrients from food",
      connectedTo Pancreas
  }
  organ LargeIntestine {
      ACTIVE,
      "Absorbs water and forms solid waste",
      connectedTo SmallIntestine
  }
  parameter Insulin {
      15.0,
      "µU/mL"
  }
  parameter GlucoseLevel {
      90,
      "mg/dL"
  }`,
    `organ Spleen {
      ACTIVE,
      "Filters blood and removes old red blood cells",
      connectedTo Kidney,
      connectedTo Liver
  }
  organ Kidney {
      ACTIVE,
      "Filters waste from the blood and maintains fluid balance",
      connectedTo Spleen,
      connectedTo Liver
  }
  organ Liver {
      ACTIVE,
      "Processes nutrients and detoxifies harmful substances",
      connectedTo Spleen,
      connectedTo Kidney
  }
  organ Intestine {
      ACTIVE,
      "Absorbs nutrients and minerals from digested food",
      connectedTo Liver
  }
  parameter Bilirubin {
      1.2,
      "mg/dL"
  }
  parameter Creatinine {
      1.0,
      "mg/dL"
  }`,

    `organ Thyroid {
      ACTIVE,
      "Regulates metabolism by producing hormones",
      connectedTo Brain
  }
  organ Pituitary {
      ACTIVE,
      "Secretes hormones that regulate other glands",
      connectedTo Thyroid,
      connectedTo Brain
  }
  organ Brain {
      ACTIVE,
      "Regulates body functions and processes sensory input",
      connectedTo Thyroid,
      connectedTo Pituitary
  }
  organ AdrenalGland {
      ACTIVE,
      "Produces hormones like cortisol and adrenaline"
  }
  parameter TSH {
      2.0,
      "µIU/mL"
  }
  parameter CortisolLevel {
      18.0,
      "µg/dL"
  }`,

    `organ Heart {
    ACTIVE,
    "Pumps blood to all parts of the body",
    connectedTo Brain,
    connectedTo Lung
}
organ Lung {
    ACTIVE,
    "Exchanges gases in the blood, oxygenating it",
    connectedTo Heart,
    connectedTo Diaphragm
}
organ Diaphragm {
    ACTIVE,
    "Regulates breathing by contracting and relaxing",
    connectedTo Lung
}
organ Brain {
    ACTIVE,
    "Controls sensory input and regulates body functions",
    connectedTo Heart,
    connectedTo Lung
}
parameter BloodOxygen {
    98.0,
    "%"
}
parameter HeartRate {
    72,
    "beats/min"
}`,

    `organ Stomach {
    ACTIVE,
    "Breaks down food using digestive acids and enzymes",
    connectedTo Liver,
    connectedTo SmallIntestine
}
organ Liver {
    ACTIVE,
    "Detoxifies chemicals and regulates metabolism",
    connectedTo Stomach,
    connectedTo SmallIntestine
}
organ SmallIntestine {
    ACTIVE,
    "Absorbs nutrients from digested food",
    connectedTo Stomach,
    connectedTo Liver
}
organ LargeIntestine {
    ACTIVE,
    "Absorbs water and forms waste for excretion",
    connectedTo SmallIntestine
}
parameter GastricAcid {
    1.5,
    "pH"
}
parameter DigestionTime {
    4.0,
    "hours"
}`,

    `organ Skin {
    ACTIVE,
    "Protects the body from external damage and regulates temperature",
    connectedTo Brain,
    connectedTo Muscle
}
organ Muscle {
    ACTIVE,
    "Facilitates movement and provides structural support",
    connectedTo Skin,
    connectedTo Bone
}
organ Bone {
    ACTIVE,
    "Provides framework for the body and protects internal organs",
    connectedTo Muscle
}
organ Brain {
    ACTIVE,
    "Processes sensory input and controls voluntary actions",
    connectedTo Skin,
    connectedTo Muscle
}
parameter SkinTemperature {
    36.5,
    "°C"
}
parameter MuscleStrength {
    75,
    "kg"
}`,

    `organ Pancreas {
    ACTIVE,
    "Regulates blood sugar levels and secretes digestive enzymes",
    connectedTo SmallIntestine,
    connectedTo Liver
}
organ Liver {
    ACTIVE,
    "Metabolizes nutrients and detoxifies harmful substances",
    connectedTo Pancreas,
    connectedTo SmallIntestine
}
organ SmallIntestine {
    ACTIVE,
    "Absorbs nutrients from digested food",
    connectedTo Pancreas
}
organ LargeIntestine {
    ACTIVE,
    "Absorbs water and forms waste for excretion",
    connectedTo SmallIntestine
}
parameter Insulin {
    15.0,
    "µU/mL"
}
parameter Glucose {
    90.0,
    "mg/dL"
}`,

    `organ Eye {
    ACTIVE,
    "Provides vision by converting light into neural signals",
    connectedTo Brain
}
organ Ear {
    ACTIVE,
    "Processes sound and helps with balance",
    connectedTo Brain
}
organ Tongue {
    ACTIVE,
    "Helps in taste, speech, and chewing",
    connectedTo Brain
}
organ Brain {
    ACTIVE,
    "Controls body functions and processes sensory input",
    connectedTo Eye,
    connectedTo Ear,
    connectedTo Tongue
}
parameter VisualAcuity {
    20.0,
    "20/20"
}
parameter HearingThreshold {
    25.0,
    "dB"
}`,

    `organ Thyroid {
    ACTIVE,
    "Regulates metabolism by producing thyroid hormones",
    connectedTo Brain
}
organ Pituitary {
    ACTIVE,
    "Secretes hormones that regulate other glands",
    connectedTo Thyroid,
    connectedTo Brain
}
organ Brain {
    ACTIVE,
    "Controls body functions and processes sensory input",
    connectedTo Thyroid,
    connectedTo Pituitary
}
organ AdrenalGland {
    ACTIVE,
    "Produces stress hormones like cortisol",
    connectedTo Kidney
}
parameter TSH {
    2.0,
    "µIU/mL"
}
parameter Cortisol {
    18.0,
    "µg/dL"
}`,

    `organ Kidney {
    ACTIVE,
    "Filters waste and excess fluids from the blood",
    connectedTo Heart,
    connectedTo Bladder
}
organ Heart {
    ACTIVE,
    "Pumps blood to the entire body",
    connectedTo Kidney,
    connectedTo Lungs
}
organ Bladder {
    ACTIVE,
    "Stores urine before excretion",
    connectedTo Kidney
}
organ Lungs {
    ACTIVE,
    "Facilitates gas exchange and oxygenates the blood",
    connectedTo Heart
}
parameter UrineVolume {
    1500.0,
    "mL/day"
}
parameter OxygenLevel {
    98.0,
    "%"
}`
];
