grammar CulturalHeritage

entry Model:
    (defs+=CulturalAsset | defs+=EnvironmentalParameter | defs+=Intervention)*;

CulturalAsset:
    'asset' name=ID '{' 
   typology=TYPOLOGY',' 
   material=STRING',' 
   conservationStatus=CONSERVATION_STATUS 
   (',' parameters+=[EnvironmentalParameter:ID] (',' parameters+=[EnvironmentalParameter:ID])* )?
   '}';

EnvironmentalParameter:
    'parameter' name=ID '{' 
    value=NUMBER',' 
    unit=STRING 
    '}';

Intervention:
    'intervention' name=ID '{' 
   (assets+=[CulturalAsset:ID] (',' assets+=[CulturalAsset:ID])* ',' )?
   description=STRING
   '}';

// Terminals
terminal ID: /[_a-zA-Z][\w_]*/;
terminal STRING: /"[^"]*"/;
terminal NUMBER: /[0-9]+(\.[0-9]+)?/;
hidden terminal WS: /\s+/;

type TYPOLOGY = 'PAINTING' | 'SCULPTURE' | 'BUILDING';
TYPOLOGY returns TYPOLOGY:
    PAINTING | SCULPTURE | BUILDING
;
PAINTING returns string: 'PAINTING';
SCULPTURE returns string: 'SCULPTURE';
BUILDING returns string: 'BUILDING';

type CONSERVATION_STATUS = 'PRISTINE' | 'GOOD' | 'DEGRADED' | 'CRITICAL';
CONSERVATION_STATUS returns CONSERVATION_STATUS:
    PRISTINE | GOOD | DEGRADED | CRITICAL
;
PRISTINE returns string: 'PRISTINE';
GOOD returns string: 'GOOD';
DEGRADED returns string: 'DEGRADED';
CRITICAL returns string: 'CRITICAL';