export const models = [
    `Bus rapidTransit: stop cityCenter, battery 78
    Route loopLine: cityCenter => grandPark, consumption 15
    Stop cityCenter: "Main City Hub"
    Stop grandPark: "Grand Park Entrance"
    Route cityLoop: cityCenter => centralStation, consumption 10
    Stop centralStation: "Central Station"`,
    
    `Bus expressX: stop northTerminal, battery 85
    Stop northTerminal: "North Terminal"
    Route morningRush: northTerminal => downtownCore, consumption 12
    ReloaderStop downtownCore: "Downtown Core Charging Point", power 500
    Route eveningRush: downtownCore => northTerminal, consumption 12
    ReloaderStop midTown: "Mid Town Charging Point", power 550`,
    
    `Bus suburbanMover: stop greenHills, battery 72
    Route suburbanExpress: greenHills => riverSide, consumption 20
    Stop greenHills: "Green Hills Residential Stop"
    ReloaderStop riverSide: "River Side Charging Station", power 550
    Route riverLoop: riverSide => greenHills, consumption 20
    ReloaderStop parkView: "Park View Charging Point", power 500`,
    
    `Bus nightShuttle: stop oldTown, battery 68
    Route eveningLoop: oldTown => harborView, consumption 10
    ReloaderStop harborView: "Harbor Charging Hub", power 600
    ReloaderStop oldTown: "Old Town", power 200
    Route nightLoop: harborView => oldTown, consumption 10
    Stop cityGate: "City Gate Entrance"`,
    
    `Bus cityLink: stop westSquare, battery 80
    Route urbanCircle: westSquare => centralPlaza, consumption 14
    Stop westSquare: "West Square Stop"
    Stop centralPlaza: "Central Plaza Station"
    Route plazaLoop: centralPlaza => westSquare, consumption 14
    Stop eastEnd: "East End Stop"
    ReloaderStop northEnd: "East End Charging Point", power 600`,
    
    `Bus commuterExpress: stop metroEast, battery 75
    Route sunriseRoute: metroEast => universityGate, consumption 16
    Stop metroEast: "Metro East Terminal"
    ReloaderStop universityGate: "University Gate Charging Dock", power 520
    Route sunsetRoute: universityGate => southPark, consumption 16
    ReloaderStop southPark: "South Park Charging Point", power 550`,
    
    `Bus ecoBus: stop techValley, battery 90
    Route fastLane: techValley => businessPark, consumption 18
    Stop techValley: "Tech Valley Stop"
    ReloaderStop businessPark: "Business Park Supercharger", power 480
    Route greenLane: businessPark => techValley, consumption 18
    Stop innovationHub: "Innovation Hub Stop"
    ReloaderStop innovationHub2: "Innovation Hub Charging Point", power 500`,
    
    `Bus hybridShuttle: stop townHall, battery 85
    Route centralExpress: townHall => stadiumGate, consumption 12
    Stop townHall: "Town Hall Bus Stop"
    ReloaderStop stadiumGate: "Stadium Charging Hub", power 490
    Route stadiumLoop: stadiumGate => townHall, consumption 12
    Stop civicCenter: "Civic Center Stop"
    ReloaderStop civicCenterNew: "Civic Center Charging Point", power 520`,
    
    `Bus localMover: stop westGate, battery 82
    Route parkRide: westGate => greenValley, consumption 17
    Stop westGate: "West Gate Transit Center"
    Stop greenValley: "Green Valley Stop"
    Route valleyLoop: greenValley => westGate, consumption 17
    Stop northSquare: "North Square Stop"
    ReloaderStop northSquare2: "North Square Charging Point", power 540`,
    
    `Stop southTerminal: "South Terminal"
    Bus airportConnector: stop southTerminal, battery 88
    Route expressLine: southTerminal => eastPlaza, consumption 19
    ReloaderStop eastPlaza: "East Plaza Fast Charger", power 530
    Route plazaExpress: eastPlaza => southTerminal, consumption 19
    Stop westEnd1: "West End Stop"
    ReloaderStop westEnd2: "West End Charging Point", power 550`,
    
    `Bus downtownRapid: stop civicCenter, battery 77
    Route dailyRoute: civicCenter => museumSquare, consumption 13
    Stop civicCenter: "Civic Center Station"
    Stop museumSquare: "Museum Square Entrance"
    Route museumLoop: museumSquare => civicCenter, consumption 13
    Stop heritagePark1: "Heritage Park Stop"
    ReloaderStop heritagePark2: "Heritage Park Charging Point", power 500`,
    
    `Bus suburbanExpress: stop oakHill, battery 79
    Route morningLine: oakHill => marketSquare, consumption 15
    Stop oakHill: "Oak Hill Residential Stop"
    ReloaderStop marketSquare: "Market Square Charging Station", power 500
    Route marketLoop: marketSquare => oakHill, consumption 15
    Stop riverFront: "River Front Stop"
    ReloaderStop riverSide: "River Side Charging Point", power 520`,
    
    `Bus silverLine: stop lakeView, battery 84
    Route commuterRush: lakeView => metroHub, consumption 21
    Stop lakeView: "Lake View Stop"
    ReloaderStop metroHub: "Metro Hub Fast Charger", power 560
    Route metroLoop: metroHub => lakeView, consumption 21
    ReloaderStop cityPark: "City Park Charging Point", power 580`,
    
    `Bus nightCommuter: stop cityGate, battery 70
    Route midnightLoop: cityGate => businessTower, consumption 18
    Stop cityGate: "City Gate Entrance"
    ReloaderStop businessTower: "Business Tower Charging Dock", power 540
    Route towerLoop: businessTower => cityGate, consumption 18
    ReloaderStop centralSquare: "Central Square Charging Point", power 560
    Route toCityGate: centralSquare => cityGate, consumption 28`,
    
    `Bus expressLoop: stop centralPark, battery 86
    Route loopExpress: centralPark => grandHotel, consumption 14
    Stop centralPark: "Central Park Transit"
    ReloaderStop grandHotel: "Grand Hotel Charging Station", power 490
    Route hotelLoop: grandHotel => centralPark, consumption 14
    ReloaderStop eastSquare: "East Square Charging Point", power 520`,
    
    `Stop financialDistrict: "Financial District"
    Bus metroLink: stop financialDistrict, battery 76
    Route skylineRoute: financialDistrict => highRiseCenter, consumption 16
    ReloaderStop highRiseCenter: "High Rise Charging Hub", power 520
    Route highRiseLoop: highRiseCenter => financialDistrict, consumption 16
    Stop westPark: "West Park Stop"`,
    
    `Bus cityExpress: stop grandTerminal, battery 90
    Route dailyExpress: grandTerminal => townPlaza, consumption 19
    Stop grandTerminal: "Grand Terminal Station"
    ReloaderStop townPlaza: "Town Plaza Fast Charger", power 600
    Route plazaLoop: townPlaza => grandTerminal, consumption 19
    Stop southPark: "South Park Stop"
    ReloaderStop southPark: "South Park Charging Point", power 620`,
    
    `Bus turboMover: stop airportGate, battery 75
    Route airportExpress: airportGate => businessCenter, consumption 10
    Stop airportGate: "Airport Bus Stop"
    ReloaderStop businessCenter: "Business Center Power Station", power 550
    Route businessLoop: businessCenter => airportGate, consumption 10
    Stop techPark: "Tech Park Stop"
    ReloaderStop techPark2: "Tech Park Charging Point", power 570`,
    
    `Bus quickRide: stop pineHills, battery 73
    Route greenRoute: pineHills => westStation, consumption 22
    Stop pineHills: "Pine Hills Transit"
    Stop westStation: "West Station Hub"
    Route stationLoop: westStation => pineHills, consumption 22
    Stop northPark: "North Park Stop"
    ReloaderStop northPark2: "North Park Charging Point", power 590`,
    
    `Bus rapidRush: stop librarySquare, battery 88
    Route scholarExpress: librarySquare => universityPark, consumption 13
    Stop librarySquare: "Library Square Bus Stop"
    ReloaderStop universityPark: "University Park Charging Hub", power 510
    Route universityLoop: universityPark => librarySquare, consumption 13
    Stop eastEnd: "East End Stop"
    ReloaderStop eastEnd2: "East End Charging Point", power 530`,
    
    `Bus shuttleX: stop silverBeach, battery 81
    Route coastalLine: silverBeach => marinaBay, consumption 17
    Stop silverBeach: "Silver Beach Entrance"
    ReloaderStop marinaBay: "Marina Bay Charging Dock", power 570
    Route marinaLoop: marinaBay => silverBeach, consumption 17
    Stop harborPoint: "Harbor Point Stop"
    ReloaderStop harborPoint2: "Harbor Point Charging Point", power 590`,
    
    `Bus transitLink: stop urbanGate, battery 74
    Route rushHourRoute: urbanGate => civicSquare, consumption 20
    Stop urbanGate: "Urban Gate Stop"
    Stop civicSquare: "Civic Square Entrance"
    Route civicLoop: civicSquare => urbanGate, consumption 20
    Stop centralPark: "Central Park Stop"
    ReloaderStop centralPark2: "Central Park Charging Point", power 610`,
    
    `ReloaderStop northernPlaza: "Northern Plaza", power 300
    Bus skylineExpress: stop northernPlaza, battery 83
    Route morningRush: northernPlaza => eastDistrict, consumption 12
    ReloaderStop eastDistrict: "East District Fast Charger", power 500
    Route districtLoop: eastDistrict => northernPlaza, consumption 12
    Stop westEnd: "West End Stop"
    ReloaderStop westEnd2: "West End Charging Point", power 520`,
    
    `Bus coastalShuttle: stop seaSide, battery 79
    Route oceanLine: seaSide => lighthousePoint, consumption 11
    Stop seaSide: "Seaside Bus Stop"
    Stop lighthousePoint: "Lighthouse Point Terminal"
    Route lighthouseLoop: lighthousePoint => seaSide, consumption 11
    Stop beachFront: "Beach Front Stop"
    ReloaderStop beachFront2: "Beach Front Charging Point", power 540`,
    
    `Bus commuterWay: stop heritagePark, battery 77
    Route heritageRoute: heritagePark => westEnd, consumption 18
    Stop heritagePark: "Heritage Park Stop"
    ReloaderStop westEnd: "West End Charging Station", power 530
    Route westLoop: westEnd => heritagePark, consumption 18
    Stop centralSquare: "Central Square Stop"
    ReloaderStop centralSquare2: "Central Square Charging Point", power 550`,
    
    `Bus superCommute: stop highlandGate, battery 82
    Route valleyExpress: highlandGate => centralStation, consumption 15
    Stop highlandGate: "Highland Gate Stop"
    Stop centralStation: "Central Station Hub"
    Route centralLoop: centralStation => highlandGate, consumption 15
    Stop eastPark: "East Park Stop"
    ReloaderStop eastPark2: "East Park Charging Point", power 570`,
    
    `Bus rapidMetro: stop industrialZone, battery 86
    Route factoryLine: industrialZone => corporatePark, consumption 19
    Stop industrialZone: "Industrial Zone Terminal"
    ReloaderStop corporatePark: "Corporate Park Charging Station", power 510
    Route corporateLoop: corporatePark => industrialZone, consumption 19
    Stop techHub: "Tech Hub Stop"
    ReloaderStop techHub2: "Tech Hub Charging Point", power 530`,
    
    `Stop midTown: "Mid Town Central"
    Bus turboLink: stop midTown, battery 78
    Route citySprawl: midTown => oldHarbor, consumption 20
    ReloaderStop oldHarbor: "Old Harbor Charging Dock", power 490
    Route harborLoop: oldHarbor => midTown, consumption 20
    Stop westSquare: "West Square Stop"
    ReloaderStop westSquare2: "West Square Charging Point", power 510`,
    
    `Bus campusShuttle: stop studentCenter, battery 85
    Route scholarLine: studentCenter => facultyAvenue, consumption 10
    Stop studentCenter: "Student Center Bus Stop"
    Stop facultyAvenue: "Faculty Avenue Entrance"
    Route facultyLoop: facultyAvenue => studentCenter, consumption 10
    Stop librarySquare: "Library Square Stop"
    ReloaderStop librarySquare2: "Library Square Charging Point", power 530`,
    
    `Bus urbanMover: stop grandPlaza, battery 80
    Route urbanRush: grandPlaza => metroSquare, consumption 16
    Stop grandPlaza: "Grand Plaza Terminal"
    ReloaderStop metroSquare: "Metro Square Charging Hub", power 500
    Route metroLoop: metroSquare => grandPlaza, consumption 16
    Stop centralPark: "Central Park Stop"
    ReloaderStop centralPark2: "Central Park Charging Point", power 520`,
    
    `Bus parkConnector: stop natureReserve, battery 83
    Route greenTrail: natureReserve => ecoCenter, consumption 14
    Stop natureReserve: "Nature Reserve Entrance"
    ReloaderStop ecoCenter: "Eco Center Charging Point", power 580
    Route ecoLoop: ecoCenter => natureReserve, consumption 14
    Stop forestGate: "Forest Gate Stop"
    ReloaderStop forestGate2: "Forest Gate Charging Point", power 600`,
    
    `Bus midnightRider: stop festivalGrounds, battery 71
    Route nightLoop: festivalGrounds => moonlightBay, consumption 12
    Stop festivalGrounds: "Festival Grounds Stop"
    ReloaderStop moonlightBay: "Moonlight Bay Charger", power 520
    Route bayLoop: moonlightBay => festivalGrounds, consumption 12
    Stop harborView: "Harbor View Stop"
    ReloaderStop harborView2: "Harbor View Charging Point", power 540`
    ];