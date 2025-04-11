grammar UrbanTransportation

entry Model:
    (defs+=Bus | defs+=Route | defs+=Stop)*;

fragment NamedEntity:
    name=ID ':'
    description=STRING;

Bus:
    'Bus' name=ID ':' 'stop' atStop=[Stop:ID] (',' 'battery' batteryLevel=KWH)?;

Route:
    'Route' name=ID ':' fromStop=[Stop:ID] '=>' toStop=[Stop:ID] (',' 'consumption' consumption=KWH)?;

Stop:
    SimpleStop | ReloaderStop;

SimpleStop:
    'Stop' NamedEntity;

ReloaderStop:
    'ReloaderStop' NamedEntity ',' 'power' power=KWH;

terminal ID: /[_a-zA-Z][\w_]*/;
terminal STRING: /"(?:\\.|[^"\\])*"/;
terminal KWH: /[0-9]+(\.[0-9]+)?\s*/;

hidden terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
hidden terminal SL_COMMENT: /\/\/[^\n\r]*/;
hidden terminal WS: /\s+/;

