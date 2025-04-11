grammar HumanBody

entry Model:
   (defs+=Component)*;

Component:
    Organ | VitalParameter;

Organ:
    'organ' name=ID '{'
        status=STATUS','
        function=STRING
        (',' relations+=Relation (',' relations+=Relation)*)?
    '}';

Relation:
    'connectedTo' target=[Organ:ID];

VitalParameter:
    'parameter' name=ID '{'
        value=NUMBER','
        unit=STRING
    '}';

// Terminals
terminal ID: /[a-zA-Z_][a-zA-Z0-9_]*/;
terminal STRING: /"[^"]*"/;
terminal NUMBER: /[0-9]+(\.[0-9]+)?/;
hidden terminal WS: /\s+/;

type STATUS = 'ACTIVE' | 'INACTIVE' | 'CRITICAL';
STATUS returns STATUS:
    ACTIVE | INACTIVE | CRITICAL
;
ACTIVE returns string: 'ACTIVE';
INACTIVE returns string: 'INACTIVE';
CRITICAL returns string: 'CRITICAL';
