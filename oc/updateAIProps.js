//print(document.properties['schema:person']);
//print(document.properties['occ:people']);
//document.properties['occ:people'] = document.properties['schema:person'];
//print(document.properties['occ:people']);
document.properties['occ:hash'] = document.properties['armdup:hash'];

if (document.properties['schema:textLines'] == null) {
  var sleepDuration = 10000; 													  
  var now = new Date().getTime();
  while(new Date().getTime() < now + sleepDuration){
    if (document.properties['schema:textLines'] != null) break;  
  } 
}
var y = '';
for each (n in document.properties['schema:person'])
{
  y = y + n + ";";
}
document.properties['occ:people'] = y;
y = '';
for each (n in document.properties['schema:organization'])
{
  y = y + n + ";";
}
document.properties['occ:organizations'] = y;
y = '';
for each (n in document.properties['schema:textLines'])
{
  y = y + n + ";";
}
document.properties['occ:textlines'] = y;
y = '';
for each (n in document.properties['schema:date'])
{
  y = y + n + ";";
}
document.properties['occ:dates'] = y;

document.save();

