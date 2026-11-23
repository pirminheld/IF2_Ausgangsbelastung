'use strict';
const $=id=>document.getElementById(id);let connected=false;
const fmt=n=>n.toLocaleString('de-DE',{minimumFractionDigits:1,maximumFractionDigits:1});
function render(){const n=Number($('inputs').value),led=Number($('led-current').value),base=n*.4,total=base+(connected?led:0),over=total>8+1e-9;
$('lamp').classList.toggle('on',connected);$('led-status').textContent=connected?'Angeschlossen · LED leuchtet':'Nicht angeschlossen';$('machine-status').textContent=$('lab').hidden?(connected?'Nach dem Umbau: Auswertung unzuverlässig':'Ohne Anzeige: funktioniert'):(over?'LOW-Pegel nicht garantiert':'LOW-Stromprüfung erfüllt');
for(const id of ['led-toggle','lab-led']){$(id).textContent=connected?'LED abklemmen':'LED anschließen';$(id).setAttribute('aria-pressed',String(connected));}
$('inputs-value').textContent=n;$('current-value').textContent=fmt(led)+' mA';$('input-total').textContent=fmt(base)+' mA';$('led-total').textContent=fmt(connected?led:0)+' mA';$('total').textContent=fmt(total)+' mA';$('led-note').textContent=connected?'angenommener LED-Strom':'LED nicht angeschlossen';$('budget-fill').style.width=total/16*100+'%';$('budget-fill').classList.toggle('over',over);$('result').classList.toggle('over',over);$('result').textContent=over?`${fmt(total)} mA Lastbedarf > 8 mA: um ${fmt(total-8)} mA überschritten. Der LOW-Pegel ist nicht mehr garantiert.`:`${fmt(total)} mA Lastbedarf ≤ 8 mA: statische LOW-Stromprüfung erfüllt. Reserve: ${fmt(8-total)} mA.`;
}
function toggle(){connected=!connected;render();}
$('led-toggle').onclick=toggle;$('lab-led').onclick=toggle;$('inputs').oninput=render;$('led-current').oninput=render;
$('reveal').onclick=()=>{$('lab').hidden=false;render();$('lab').scrollIntoView({behavior:'smooth'});};
const hints={logic:'Prüft diese Vermutung: Der Logikbaustein wurde nicht verändert. Was wurde zusätzlich angeschlossen?',load:'Das ist ein passender Ansatz: Die LED braucht zusätzlich Strom. Reicht die Belastbarkeit des Ausgangs?',wire:'Ein sinnvoller Prüfpunkt. Im vorgegebenen Fehlerfall sind Kontakte und Verdrahtung jedoch bereits geprüft.'};
document.querySelectorAll('[data-guess]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-guess]').forEach(c=>c.setAttribute('aria-pressed',String(b===c)));$('guess-feedback').textContent=hints[b.dataset.guess];});
$('preset').onclick=()=>{connected=true;$('inputs').value=14;$('led-current').value=3;render();};
$('solution-toggle').onclick=()=>{const show=$('solution').hidden;$('solution').hidden=!show;$('solution-toggle').setAttribute('aria-expanded',String(show));$('solution-toggle').textContent=show?'Lösung ausblenden':'Lösung aufdecken';};
$('projector').onclick=()=>{$('projector').setAttribute('aria-pressed',String(document.body.classList.toggle('beamer')));};$('qr-open').onclick=()=>$('qr-dialog').showModal();$('qr-close').onclick=()=>$('qr-dialog').close();
$('reset').onclick=()=>{connected=false;$('inputs').value=14;$('led-current').value=3;$('lab').hidden=true;$('solution').hidden=true;$('solution-toggle').textContent='Lösung aufdecken';$('solution-toggle').setAttribute('aria-expanded','false');document.querySelectorAll('[data-guess]').forEach(b=>b.setAttribute('aria-pressed','false'));$('guess-feedback').textContent='Sammelt erst eine Vermutung. Die Erklärung kommt danach.';render();window.scrollTo({top:0,behavior:'smooth'});};render();

