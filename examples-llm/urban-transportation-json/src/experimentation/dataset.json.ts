export const models = [
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "rapidTransit",
        "atStop": "cityCenter",
        "batteryLevel": 78
      },
      {
        "$type": "Route",
        "name": "loopLine",
        "fromStop": "cityCenter",
        "toStop": "grandPark",
        "consumption": 15
      },
      {
        "$type": "SimpleStop",
        "name": "cityCenter",
        "description": "Main City Hub"
      },
      {
        "$type": "SimpleStop",
        "name": "grandPark",
        "description": "Grand Park Entrance"
      },
      {
        "$type": "Route",
        "name": "cityLoop",
        "fromStop": "cityCenter",
        "toStop": "centralStation",
        "consumption": 10
      },
      {
        "$type": "SimpleStop",
        "name": "centralStation",
        "description": "Central Station"
      },
      {
        "$type": "ReloaderStop",
        "name": "centralStation",
        "description": "Central Station Charging Point",
        "power": 600
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "expressX",
        "atStop": "northTerminal",
        "batteryLevel": 85
      },
      {
        "$type": "SimpleStop",
        "name": "northTerminal",
        "description": "North Terminal"
      },
      {
        "$type": "Route",
        "name": "morningRush",
        "fromStop": "northTerminal",
        "toStop": "downtownCore",
        "consumption": 12
      },
      {
        "$type": "ReloaderStop",
        "name": "downtownCore",
        "description": "Downtown Core Charging Point",
        "power": 500
      },
      {
        "$type": "Route",
        "name": "eveningRush",
        "fromStop": "downtownCore",
        "toStop": "northTerminal",
        "consumption": 12
      },
      {
        "$type": "SimpleStop",
        "name": "midTown",
        "description": "Mid Town Central"
      },
      {
        "$type": "ReloaderStop",
        "name": "midTown",
        "description": "Mid Town Charging Point",
        "power": 550
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "suburbanMover",
        "atStop": "greenHills",
        "batteryLevel": 72
      },
      {
        "$type": "Route",
        "name": "suburbanExpress",
        "fromStop": "greenHills",
        "toStop": "riverSide",
        "consumption": 20
      },
      {
        "$type": "SimpleStop",
        "name": "greenHills",
        "description": "Green Hills Residential Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "riverSide",
        "description": "River Side Charging Station",
        "power": 550
      },
      {
        "$type": "Route",
        "name": "riverLoop",
        "fromStop": "riverSide",
        "toStop": "greenHills",
        "consumption": 20
      },
      {
        "$type": "SimpleStop",
        "name": "parkView",
        "description": "Park View Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "parkView",
        "description": "Park View Charging Point",
        "power": 500
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "nightShuttle",
        "atStop": "oldTown",
        "batteryLevel": 68
      },
      {
        "$type": "Route",
        "name": "eveningLoop",
        "fromStop": "oldTown",
        "toStop": "harborView",
        "consumption": 10
      },
      {
        "$type": "ReloaderStop",
        "name": "harborView",
        "description": "Harbor Charging Hub",
        "power": 600
      },
      {
        "$type": "ReloaderStop",
        "name": "oldTown",
        "description": "Old Town",
        "power": 200
      },
      {
        "$type": "Route",
        "name": "nightLoop",
        "fromStop": "harborView",
        "toStop": "oldTown",
        "consumption": 10
      },
      {
        "$type": "SimpleStop",
        "name": "cityGate",
        "description": "City Gate Entrance"
      },
      {
        "$type": "ReloaderStop",
        "name": "cityGate",
        "description": "City Gate Charging Point",
        "power": 550
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "cityLink",
        "atStop": "westSquare",
        "batteryLevel": 80
      },
      {
        "$type": "Route",
        "name": "urbanCircle",
        "fromStop": "westSquare",
        "toStop": "centralPlaza",
        "consumption": 14
      },
      {
        "$type": "SimpleStop",
        "name": "westSquare",
        "description": "West Square Stop"
      },
      {
        "$type": "SimpleStop",
        "name": "centralPlaza",
        "description": "Central Plaza Station"
      },
      {
        "$type": "Route",
        "name": "plazaLoop",
        "fromStop": "centralPlaza",
        "toStop": "westSquare",
        "consumption": 14
      },
      {
        "$type": "SimpleStop",
        "name": "eastEnd",
        "description": "East End Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "eastEnd",
        "description": "East End Charging Point",
        "power": 600
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "commuterExpress",
        "atStop": "metroEast",
        "batteryLevel": 75
      },
      {
        "$type": "Route",
        "name": "sunriseRoute",
        "fromStop": "metroEast",
        "toStop": "universityGate",
        "consumption": 16
      },
      {
        "$type": "SimpleStop",
        "name": "metroEast",
        "description": "Metro East Terminal"
      },
      {
        "$type": "ReloaderStop",
        "name": "universityGate",
        "description": "University Gate Charging Dock",
        "power": 520
      },
      {
        "$type": "Route",
        "name": "sunsetRoute",
        "fromStop": "universityGate",
        "toStop": "metroEast",
        "consumption": 16
      },
      {
        "$type": "SimpleStop",
        "name": "southPark",
        "description": "South Park Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "southPark",
        "description": "South Park Charging Point",
        "power": 550
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "ecoBus",
        "atStop": "techValley",
        "batteryLevel": 90
      },
      {
        "$type": "Route",
        "name": "fastLane",
        "fromStop": "techValley",
        "toStop": "businessPark",
        "consumption": 18
      },
      {
        "$type": "SimpleStop",
        "name": "techValley",
        "description": "Tech Valley Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "businessPark",
        "description": "Business Park Supercharger",
        "power": 480
      },
      {
        "$type": "Route",
        "name": "greenLane",
        "fromStop": "businessPark",
        "toStop": "techValley",
        "consumption": 18
      },
      {
        "$type": "SimpleStop",
        "name": "innovationHub",
        "description": "Innovation Hub Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "innovationHub",
        "description": "Innovation Hub Charging Point",
        "power": 500
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "hybridShuttle",
        "atStop": "townHall",
        "batteryLevel": 85
      },
      {
        "$type": "Route",
        "name": "centralExpress",
        "fromStop": "townHall",
        "toStop": "stadiumGate",
        "consumption": 12
      },
      {
        "$type": "SimpleStop",
        "name": "townHall",
        "description": "Town Hall Bus Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "stadiumGate",
        "description": "Stadium Charging Hub",
        "power": 490
      },
      {
        "$type": "Route",
        "name": "stadiumLoop",
        "fromStop": "stadiumGate",
        "toStop": "townHall",
        "consumption": 12
      },
      {
        "$type": "SimpleStop",
        "name": "civicCenter",
        "description": "Civic Center Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "civicCenter",
        "description": "Civic Center Charging Point",
        "power": 520
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "localMover",
        "atStop": "westGate",
        "batteryLevel": 82
      },
      {
        "$type": "Route",
        "name": "parkRide",
        "fromStop": "westGate",
        "toStop": "greenValley",
        "consumption": 17
      },
      {
        "$type": "SimpleStop",
        "name": "westGate",
        "description": "West Gate Transit Center"
      },
      {
        "$type": "SimpleStop",
        "name": "greenValley",
        "description": "Green Valley Stop"
      },
      {
        "$type": "Route",
        "name": "valleyLoop",
        "fromStop": "greenValley",
        "toStop": "westGate",
        "consumption": 17
      },
      {
        "$type": "SimpleStop",
        "name": "northSquare",
        "description": "North Square Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "northSquare",
        "description": "North Square Charging Point",
        "power": 540
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "SimpleStop",
        "name": "southTerminal",
        "description": "South Terminal"
      },
      {
        "$type": "Bus",
        "name": "airportConnector",
        "atStop": "southTerminal",
        "batteryLevel": 88
      },
      {
        "$type": "Route",
        "name": "expressLine",
        "fromStop": "southTerminal",
        "toStop": "eastPlaza",
        "consumption": 19
      },
      {
        "$type": "ReloaderStop",
        "name": "eastPlaza",
        "description": "East Plaza Fast Charger",
        "power": 530
      },
      {
        "$type": "Route",
        "name": "plazaExpress",
        "fromStop": "eastPlaza",
        "toStop": "southTerminal",
        "consumption": 19
      },
      {
        "$type": "SimpleStop",
        "name": "westEnd",
        "description": "West End Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "westEnd",
        "description": "West End Charging Point",
        "power": 550
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "downtownRapid",
        "atStop": "civicCenter",
        "batteryLevel": 77
      },
      {
        "$type": "Route",
        "name": "dailyRoute",
        "fromStop": "civicCenter",
        "toStop": "museumSquare",
        "consumption": 13
      },
      {
        "$type": "SimpleStop",
        "name": "civicCenter",
        "description": "Civic Center Station"
      },
      {
        "$type": "SimpleStop",
        "name": "museumSquare",
        "description": "Museum Square Entrance"
      },
      {
        "$type": "Route",
        "name": "museumLoop",
        "fromStop": "museumSquare",
        "toStop": "civicCenter",
        "consumption": 13
      },
      {
        "$type": "SimpleStop",
        "name": "heritagePark",
        "description": "Heritage Park Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "heritagePark",
        "description": "Heritage Park Charging Point",
        "power": 500
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "suburbanExpress",
        "atStop": "oakHill",
        "batteryLevel": 79
      },
      {
        "$type": "Route",
        "name": "morningLine",
        "fromStop": "oakHill",
        "toStop": "marketSquare",
        "consumption": 15
      },
      {
        "$type": "SimpleStop",
        "name": "oakHill",
        "description": "Oak Hill Residential Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "marketSquare",
        "description": "Market Square Charging Station",
        "power": 500
      },
      {
        "$type": "Route",
        "name": "marketLoop",
        "fromStop": "marketSquare",
        "toStop": "oakHill",
        "consumption": 15
      },
      {
        "$type": "SimpleStop",
        "name": "riverFront",
        "description": "River Front Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "riverFront",
        "description": "River Front Charging Point",
        "power": 520
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "silverLine",
        "atStop": "lakeView",
        "batteryLevel": 84
      },
      {
        "$type": "Route",
        "name": "commuterRush",
        "fromStop": "lakeView",
        "toStop": "metroHub",
        "consumption": 21
      },
      {
        "$type": "SimpleStop",
        "name": "lakeView",
        "description": "Lake View Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "metroHub",
        "description": "Metro Hub Fast Charger",
        "power": 560
      },
      {
        "$type": "Route",
        "name": "metroLoop",
        "fromStop": "metroHub",
        "toStop": "lakeView",
        "consumption": 21
      },
      {
        "$type": "SimpleStop",
        "name": "cityPark",
        "description": "City Park Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "cityPark",
        "description": "City Park Charging Point",
        "power": 580
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "nightCommuter",
        "atStop": "cityGate",
        "batteryLevel": 70
      },
      {
        "$type": "Route",
        "name": "midnightLoop",
        "fromStop": "cityGate",
        "toStop": "businessTower",
        "consumption": 18
      },
      {
        "$type": "SimpleStop",
        "name": "cityGate",
        "description": "City Gate Entrance"
      },
      {
        "$type": "ReloaderStop",
        "name": "businessTower",
        "description": "Business Tower Charging Dock",
        "power": 540
      },
      {
        "$type": "Route",
        "name": "towerLoop",
        "fromStop": "businessTower",
        "toStop": "cityGate",
        "consumption": 18
      },
      {
        "$type": "SimpleStop",
        "name": "centralSquare",
        "description": "Central Square Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "centralSquare",
        "description": "Central Square Charging Point",
        "power": 560
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "expressLoop",
        "atStop": "centralPark",
        "batteryLevel": 86
      },
      {
        "$type": "Route",
        "name": "loopExpress",
        "fromStop": "centralPark",
        "toStop": "grandHotel",
        "consumption": 14
      },
      {
        "$type": "SimpleStop",
        "name": "centralPark",
        "description": "Central Park Transit"
      },
      {
        "$type": "ReloaderStop",
        "name": "grandHotel",
        "description": "Grand Hotel Charging Station",
        "power": 490
      },
      {
        "$type": "Route",
        "name": "hotelLoop",
        "fromStop": "grandHotel",
        "toStop": "centralPark",
        "consumption": 14
      },
      {
        "$type": "SimpleStop",
        "name": "eastSquare",
        "description": "East Square Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "eastSquare",
        "description": "East Square Charging Point",
        "power": 520
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "SimpleStop",
        "name": "financialDistrict",
        "description": "Financial District"
      },
      {
        "$type": "Bus",
        "name": "metroLink",
        "atStop": "financialDistrict",
        "batteryLevel": 76
      },
      {
        "$type": "Route",
        "name": "skylineRoute",
        "fromStop": "financialDistrict",
        "toStop": "highRiseCenter",
        "consumption": 16
      },
      {
        "$type": "ReloaderStop",
        "name": "highRiseCenter",
        "description": "High Rise Charging Hub",
        "power": 520
      },
      {
        "$type": "Route",
        "name": "highRiseLoop",
        "fromStop": "highRiseCenter",
        "toStop": "financialDistrict",
        "consumption": 16
      },
      {
        "$type": "SimpleStop",
        "name": "westPark",
        "description": "West Park Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "westPark",
        "description": "West Park Charging Point",
        "power": 540
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "cityExpress",
        "atStop": "grandTerminal",
        "batteryLevel": 90
      },
      {
        "$type": "Route",
        "name": "dailyExpress",
        "fromStop": "grandTerminal",
        "toStop": "townPlaza",
        "consumption": 19
      },
      {
        "$type": "SimpleStop",
        "name": "grandTerminal",
        "description": "Grand Terminal Station"
      },
      {
        "$type": "ReloaderStop",
        "name": "townPlaza",
        "description": "Town Plaza Fast Charger",
        "power": 600
      },
      {
        "$type": "Route",
        "name": "plazaLoop",
        "fromStop": "townPlaza",
        "toStop": "grandTerminal",
        "consumption": 19
      },
      {
        "$type": "SimpleStop",
        "name": "southPark",
        "description": "South Park Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "southPark",
        "description": "South Park Charging Point",
        "power": 620
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "turboMover",
        "atStop": "airportGate",
        "batteryLevel": 75
      },
      {
        "$type": "Route",
        "name": "airportExpress",
        "fromStop": "airportGate",
        "toStop": "businessCenter",
        "consumption": 10
      },
      {
        "$type": "SimpleStop",
        "name": "airportGate",
        "description": "Airport Bus Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "businessCenter",
        "description": "Business Center Power Station",
        "power": 550
      },
      {
        "$type": "Route",
        "name": "businessLoop",
        "fromStop": "businessCenter",
        "toStop": "airportGate",
        "consumption": 10
      },
      {
        "$type": "SimpleStop",
        "name": "techPark",
        "description": "Tech Park Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "techPark",
        "description": "Tech Park Charging Point",
        "power": 570
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "quickRide",
        "atStop": "pineHills",
        "batteryLevel": 73
      },
      {
        "$type": "Route",
        "name": "greenRoute",
        "fromStop": "pineHills",
        "toStop": "westStation",
        "consumption": 22
      },
      {
        "$type": "SimpleStop",
        "name": "pineHills",
        "description": "Pine Hills Transit"
      },
      {
        "$type": "SimpleStop",
        "name": "westStation",
        "description": "West Station Hub"
      },
      {
        "$type": "Route",
        "name": "stationLoop",
        "fromStop": "westStation",
        "toStop": "pineHills",
        "consumption": 22
      },
      {
        "$type": "SimpleStop",
        "name": "northPark",
        "description": "North Park Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "northPark",
        "description": "North Park Charging Point",
        "power": 590
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "rapidRush",
        "atStop": "librarySquare",
        "batteryLevel": 88
      },
      {
        "$type": "Route",
        "name": "scholarExpress",
        "fromStop": "librarySquare",
        "toStop": "universityPark",
        "consumption": 13
      },
      {
        "$type": "SimpleStop",
        "name": "librarySquare",
        "description": "Library Square Bus Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "universityPark",
        "description": "University Park Charging Hub",
        "power": 510
      },
      {
        "$type": "Route",
        "name": "universityLoop",
        "fromStop": "universityPark",
        "toStop": "librarySquare",
        "consumption": 13
      },
      {
        "$type": "SimpleStop",
        "name": "eastEnd",
        "description": "East End Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "eastEnd",
        "description": "East End Charging Point",
        "power": 530
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "shuttleX",
        "atStop": "silverBeach",
        "batteryLevel": 81
      },
      {
        "$type": "Route",
        "name": "coastalLine",
        "fromStop": "silverBeach",
        "toStop": "marinaBay",
        "consumption": 17
      },
      {
        "$type": "SimpleStop",
        "name": "silverBeach",
        "description": "Silver Beach Entrance"
      },
      {
        "$type": "ReloaderStop",
        "name": "marinaBay",
        "description": "Marina Bay Charging Dock",
        "power": 570
      },
      {
        "$type": "Route",
        "name": "marinaLoop",
        "fromStop": "marinaBay",
        "toStop": "silverBeach",
        "consumption": 17
      },
      {
        "$type": "SimpleStop",
        "name": "harborPoint",
        "description": "Harbor Point Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "harborPoint",
        "description": "Harbor Point Charging Point",
        "power": 590
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "transitLink",
        "atStop": "urbanGate",
        "batteryLevel": 74
      },
      {
        "$type": "Route",
        "name": "rushHourRoute",
        "fromStop": "urbanGate",
        "toStop": "civicSquare",
        "consumption": 20
      },
      {
        "$type": "SimpleStop",
        "name": "urbanGate",
        "description": "Urban Gate Stop"
      },
      {
        "$type": "SimpleStop",
        "name": "civicSquare",
        "description": "Civic Square Entrance"
      },
      {
        "$type": "Route",
        "name": "civicLoop",
        "fromStop": "civicSquare",
        "toStop": "urbanGate",
        "consumption": 20
      },
      {
        "$type": "SimpleStop",
        "name": "centralPark",
        "description": "Central Park Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "centralPark",
        "description": "Central Park Charging Point",
        "power": 610
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "ReloaderStop",
        "name": "northernPlaza",
        "description": "Northern Plaza",
        "power": 300
      },
      {
        "$type": "Bus",
        "name": "skylineExpress",
        "atStop": "northernPlaza",
        "batteryLevel": 83
      },
      {
        "$type": "Route",
        "name": "morningRush",
        "fromStop": "northernPlaza",
        "toStop": "eastDistrict",
        "consumption": 12
      },
      {
        "$type": "ReloaderStop",
        "name": "eastDistrict",
        "description": "East District Fast Charger",
        "power": 500
      },
      {
        "$type": "Route",
        "name": "districtLoop",
        "fromStop": "eastDistrict",
        "toStop": "northernPlaza",
        "consumption": 12
      },
      {
        "$type": "SimpleStop",
        "name": "westEnd",
        "description": "West End Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "westEnd",
        "description": "West End Charging Point",
        "power": 520
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "coastalShuttle",
        "atStop": "seaSide",
        "batteryLevel": 79
      },
      {
        "$type": "Route",
        "name": "oceanLine",
        "fromStop": "seaSide",
        "toStop": "lighthousePoint",
        "consumption": 11
      },
      {
        "$type": "SimpleStop",
        "name": "seaSide",
        "description": "Seaside Bus Stop"
      },
      {
        "$type": "SimpleStop",
        "name": "lighthousePoint",
        "description": "Lighthouse Point Terminal"
      },
      {
        "$type": "Route",
        "name": "lighthouseLoop",
        "fromStop": "lighthousePoint",
        "toStop": "seaSide",
        "consumption": 11
      },
      {
        "$type": "SimpleStop",
        "name": "beachFront",
        "description": "Beach Front Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "beachFront",
        "description": "Beach Front Charging Point",
        "power": 540
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "commuterWay",
        "atStop": "heritagePark",
        "batteryLevel": 77
      },
      {
        "$type": "Route",
        "name": "heritageRoute",
        "fromStop": "heritagePark",
        "toStop": "westEnd",
        "consumption": 18
      },
      {
        "$type": "SimpleStop",
        "name": "heritagePark",
        "description": "Heritage Park Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "westEnd",
        "description": "West End Charging Station",
        "power": 530
      },
      {
        "$type": "Route",
        "name": "westLoop",
        "fromStop": "westEnd",
        "toStop": "heritagePark",
        "consumption": 18
      },
      {
        "$type": "SimpleStop",
        "name": "centralSquare",
        "description": "Central Square Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "centralSquare",
        "description": "Central Square Charging Point",
        "power": 550
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "superCommute",
        "atStop": "highlandGate",
        "batteryLevel": 82
      },
      {
        "$type": "Route",
        "name": "valleyExpress",
        "fromStop": "highlandGate",
        "toStop": "centralStation",
        "consumption": 15
      },
      {
        "$type": "SimpleStop",
        "name": "highlandGate",
        "description": "Highland Gate Stop"
      },
      {
        "$type": "SimpleStop",
        "name": "centralStation",
        "description": "Central Station Hub"
      },
      {
        "$type": "Route",
        "name": "centralLoop",
        "fromStop": "centralStation",
        "toStop": "highlandGate",
        "consumption": 15
      },
      {
        "$type": "SimpleStop",
        "name": "eastPark",
        "description": "East Park Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "eastPark",
        "description": "East Park Charging Point",
        "power": 570
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "rapidMetro",
        "atStop": "industrialZone",
        "batteryLevel": 86
      },
      {
        "$type": "Route",
        "name": "factoryLine",
        "fromStop": "industrialZone",
        "toStop": "corporatePark",
        "consumption": 19
      },
      {
        "$type": "SimpleStop",
        "name": "industrialZone",
        "description": "Industrial Zone Terminal"
      },
      {
        "$type": "ReloaderStop",
        "name": "corporatePark",
        "description": "Corporate Park Charging Station",
        "power": 510
      },
      {
        "$type": "Route",
        "name": "corporateLoop",
        "fromStop": "corporatePark",
        "toStop": "industrialZone",
        "consumption": 19
      },
      {
        "$type": "SimpleStop",
        "name": "techHub",
        "description": "Tech Hub Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "techHub",
        "description": "Tech Hub Charging Point",
        "power": 530
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "SimpleStop",
        "name": "midTown",
        "description": "Mid Town Central"
      },
      {
        "$type": "Bus",
        "name": "turboLink",
        "atStop": "midTown",
        "batteryLevel": 78
      },
      {
        "$type": "Route",
        "name": "citySprawl",
        "fromStop": "midTown",
        "toStop": "oldHarbor",
        "consumption": 20
      },
      {
        "$type": "ReloaderStop",
        "name": "oldHarbor",
        "description": "Old Harbor Charging Dock",
        "power": 490
      },
      {
        "$type": "Route",
        "name": "harborLoop",
        "fromStop": "oldHarbor",
        "toStop": "midTown",
        "consumption": 20
      },
      {
        "$type": "SimpleStop",
        "name": "westSquare",
        "description": "West Square Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "westSquare",
        "description": "West Square Charging Point",
        "power": 510
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "campusShuttle",
        "atStop": "studentCenter",
        "batteryLevel": 85
      },
      {
        "$type": "Route",
        "name": "scholarLine",
        "fromStop": "studentCenter",
        "toStop": "facultyAvenue",
        "consumption": 10
      },
      {
        "$type": "SimpleStop",
        "name": "studentCenter",
        "description": "Student Center Bus Stop"
      },
      {
        "$type": "SimpleStop",
        "name": "facultyAvenue",
        "description": "Faculty Avenue Entrance"
      },
      {
        "$type": "Route",
        "name": "facultyLoop",
        "fromStop": "facultyAvenue",
        "toStop": "studentCenter",
        "consumption": 10
      },
      {
        "$type": "SimpleStop",
        "name": "librarySquare",
        "description": "Library Square Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "librarySquare",
        "description": "Library Square Charging Point",
        "power": 530
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "urbanMover",
        "atStop": "grandPlaza",
        "batteryLevel": 80
      },
      {
        "$type": "Route",
        "name": "urbanRush",
        "fromStop": "grandPlaza",
        "toStop": "metroSquare",
        "consumption": 16
      },
      {
        "$type": "SimpleStop",
        "name": "grandPlaza",
        "description": "Grand Plaza Terminal"
      },
      {
        "$type": "ReloaderStop",
        "name": "metroSquare",
        "description": "Metro Square Charging Hub",
        "power": 500
      },
      {
        "$type": "Route",
        "name": "metroLoop",
        "fromStop": "metroSquare",
        "toStop": "grandPlaza",
        "consumption": 16
      },
      {
        "$type": "SimpleStop",
        "name": "centralPark",
        "description": "Central Park Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "centralPark",
        "description": "Central Park Charging Point",
        "power": 520
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "parkConnector",
        "atStop": "natureReserve",
        "batteryLevel": 83
      },
      {
        "$type": "Route",
        "name": "greenTrail",
        "fromStop": "natureReserve",
        "toStop": "ecoCenter",
        "consumption": 14
      },
      {
        "$type": "SimpleStop",
        "name": "natureReserve",
        "description": "Nature Reserve Entrance"
      },
      {
        "$type": "ReloaderStop",
        "name": "ecoCenter",
        "description": "Eco Center Charging Point",
        "power": 580
      },
      {
        "$type": "Route",
        "name": "ecoLoop",
        "fromStop": "ecoCenter",
        "toStop": "natureReserve",
        "consumption": 14
      },
      {
        "$type": "SimpleStop",
        "name": "forestGate",
        "description": "Forest Gate Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "forestGate",
        "description": "Forest Gate Charging Point",
        "power": 600
      }
    ]
  },
  {
    "defs": [
      {
        "$type": "Bus",
        "name": "midnightRider",
        "atStop": "festivalGrounds",
        "batteryLevel": 71
      },
      {
        "$type": "Route",
        "name": "nightLoop",
        "fromStop": "festivalGrounds",
        "toStop": "moonlightBay",
        "consumption": 12
      },
      {
        "$type": "SimpleStop",
        "name": "festivalGrounds",
        "description": "Festival Grounds Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "moonlightBay",
        "description": "Moonlight Bay Charger",
        "power": 520
      },
      {
        "$type": "Route",
        "name": "bayLoop",
        "fromStop": "moonlightBay",
        "toStop": "festivalGrounds",
        "consumption": 12
      },
      {
        "$type": "SimpleStop",
        "name": "harborView",
        "description": "Harbor View Stop"
      },
      {
        "$type": "ReloaderStop",
        "name": "harborView",
        "description": "Harbor View Charging Point",
        "power": 540
      }
    ]
  }
];