function saveCodes()
{
	var data = document.getElementById("data_input").value;
	data = data.split("\n");
	var tab2 = new Array();
	var j=0;
	var i=0;
	for(; i<data.length; i++)
	{
		tab2[j] = data[i];
		tab2[j+1] = data[i];
		j += 2;
	}
	data = tab2;
	try {
		var tab = localStorage.codes.split(",");
		data = data.concat(tab)
	} catch (err) {}
	for(var i=0; i<data.length; i++)
	{
		if(data[i] == '')
		data.splice(i,1);
	}
	localStorage.codes = data;
	getCodes();
}

function getCodes()
{
	var str = '';
	var tab = '';
	try {
		tab = localStorage.codes.split(",");
	} catch (err) {}
	for(var i =0; i<tab.length; i++)
	{
		if(i%2 == 1)
		{
			var temp = "<span>"+tab[i]+"</span><br/>";
			str += temp;
		}
	}
	document.getElementById("codes").innerHTML = str;
}

function firstCode(index)
{
	var temp = '';
	var tab = localStorage.codes.split(",");
	temp = tab[index*2];
	if(temp === undefined)
		return 'exit';
	else
		return temp;
}

function getLoginAndPass()
{
	var arr = new Array();
	arr[0] = localStorage.login;
	arr[1] = localStorage.pass;
	arr[2] = localStorage.y;
	arr[3] = localStorage.m-1;
	arr[4] = localStorage.d;
	arr[5] = localStorage.h;
	arr[6] = localStorage.min;
	arr[7] = localStorage.s;
	return arr;
}

function pausecomp(ms) {
	ms += new Date().getTime();
	while (new Date() < ms){}
} 

function usun(index)
{
	var tab = localStorage.codes.split(",");
	for(var i=index; i<tab.length-1; i++)
	{
		tab[i] = tab[i+1];
	}
	tab.splice(tab.length-1, 1);
	localStorage.codes = '';
	getCodes();
}


function saveDelay()
{
	var delay = document.getElementById("delay").value;
	localStorage.delay = delay;
	if(delay < 0 || delay > 10000)
	{
		localStorage.delay = 100;
	}
	if(isNaN(delay))
	{
		localStorage.delay = 100;
	}
}

function getDelay()
{
	var delay = 100;
	try {
		delay = Number(localStorage.delay);
	} catch (err) {}
	if(delay == undefined)
	delay == 100;
	document.getElementById("delay").value = delay;
}

function delCode(kod)
{
	var tab = localStorage.codes.split(",");
	for(var i=0; i<tab.length; i++)
	{
		if(tab[i] == kod)
		{
			tab.splice(i,1);
		}
	}
	localStorage.codes = tab;
}

function zmienZapis()
{
	localStorage.zapis_num = document.getElementById("zapis_num").value;
}

function zmienSemestr()
{
	localStorage.semestr = document.getElementById("semestr").value;
}

function zmienKierunek()
{
	localStorage.kierunek = document.getElementById("kierunek").value;
}

function zmienGodzina()
{
	localStorage.y = document.getElementById("year").value;
	localStorage.m = document.getElementById("month").value;
	localStorage.d = document.getElementById("day").value;
	localStorage.h = document.getElementById("hour").value;
	localStorage.min = document.getElementById("min").value;
	localStorage.s = document.getElementById("sec").value;
}

function zmienLogin()
{
	localStorage.login = document.getElementById("login").value;
	localStorage.pass = document.getElementById("pass").value;
}

function zmienOgolno()
{
	if(document.getElementById("ogolno").checked == true)
	{
		localStorage.ogolno = 'true';
	} else {
		localStorage.ogolno = 'false';
	}
}

function getLogin()
{
	document.getElementById("login").value = localStorage.login;
	document.getElementById("pass").value = localStorage.pass;
}

function getSemestr()
{
	document.getElementById("semestr").value = localStorage.semestr;
}

function getOgolno()
{
	if(localStorage.ogolno == 'true')
	{
		document.getElementById("ogolno").checked = true;
	} else {
		document.getElementById("ogolno").checked = false;
	}
}

function getKierunek()
{
	document.getElementById("kierunek").value = localStorage.kierunek;
}

function getGodzina()
{
	document.getElementById("year").value = localStorage.y;
	document.getElementById("month").value = localStorage.m;
	document.getElementById("day").value = localStorage.d;
	document.getElementById("hour").value = localStorage.h;
	document.getElementById("min").value = localStorage.min;
	document.getElementById("sec").value = localStorage.s;
}

function getZapis()
{
	var name = 'event_Zapisy';
	var num = 1;
	try {
		num = localStorage.zapis_num;
	} catch (err) {}
	if(name == '' || name == undefined)
	name = 'event_Zapisy';
	if(num == undefined)
	num = 1;
	document.getElementById("zapis_num").value = localStorage.zapis_num;
}

function zapiszWszystko()
{
	zmienOgolno();
	zmienKierunek();
	zmienSemestr();
	zmienGodzina();
	saveDelay();
	zmienZapis();
}

function wyp_kursy()
{
	document.getElementById("info_tresc").innerHTML = 
	unescape('<b>Dodaj kody kursów</b> <br/>[Każdy kod musi znajdować się w oddzielnej linii. Uwaga na linie puste!]');
}

function wyp_delay()
{
	document.getElementById("info_tresc").innerHTML = 
	unescape('<b>Opóźnienie</b> <br/>[Określa z jaką częstotliwością "klikany" jest przycisk zapisy. Wartość mniejsza niż 300 może zwiększyć ryzyko bana.]');
}

function wyp_data()
{
	document.getElementById("info_tresc").innerHTML = 
	unescape('<b>Data, Godzina</b> <br/>[Czas, kiedy skrypt ma zalogować się do portalu i rozpocząć próbę zapisów. Najlepiej ustawić na około 30 sekund przed ich rozpoczęciem.<br/>Format daty: D-M-YYYY (np. 1-11-2011)<br/>Format godziny: H-M-S (np. 11-0-30)<br/>Nie wolno wstawić wiodącego zera (np. 01)!]');
}

function wyp_num()
{
	document.getElementById("info_tresc").innerHTML = 
	unescape('<b>Numer zapisów</b> <br/>[Pozycja zapisów na liście na Edukacji.CL. Indeksowane od 0.]<br/><img src="zapisy.png"> ');
}

function wyp_kier()
{
	document.getElementById("info_tresc").innerHTML = 
	unescape('<b>Numer kierunku</b> <br/>[Tylko dla osób które były lub są zapisane na więcej niż jeden kierunek!<br/>Pozycja kierunku dla którego chcemy dokonać zapisów na wybieralnej liście widocznej po kliknięciu na link "Zapisy" na Edukacji.CL. Indeksowane od 0.]');
}

function wyp_ogolno()
{
	document.getElementById("info_tresc").innerHTML = 
	unescape('<b>Używaj AKZ</b> <br/>[Tylko dla zapisów ogólnouczelnianych!<br/>Przed zalogowaniem się skrypt będzie sprawdzał, czy w podanych grupach są jeszcze wolne miejsca (w katalogu kursów ogólnouczelnianych).] ');
}

window.addEventListener("load", function()
{
  document.getElementById("data_submit")
          .addEventListener("click", saveCodes, false);
}, false);

window.addEventListener("load", function()
{
  document.getElementById("usun")
          .addEventListener("click", usun, false);
}, false);

window.addEventListener("load", function()
{
  document.getElementById("zmiana_login")
          .addEventListener("click", zmienLogin, false);
}, false);

window.addEventListener("load", function()
{
  document.getElementById("q_kursy")
          .addEventListener("click", wyp_kursy, false);
}, false);

window.addEventListener("load", function()
{
  document.getElementById("q_delay")
          .addEventListener("click", wyp_delay, false);
}, false);

window.addEventListener("load", function()
{
  document.getElementById("q_data")
          .addEventListener("click", wyp_data, false);
}, false);

window.addEventListener("load", function()
{
  document.getElementById("q_godz")
          .addEventListener("click", wyp_data, false);
}, false);

window.addEventListener("load", function()
{
  document.getElementById("q_num")
          .addEventListener("click", wyp_num, false);
}, false);

window.addEventListener("load", function()
{
  document.getElementById("q_kier")
          .addEventListener("click", wyp_kier, false);
}, false);

window.addEventListener("load", function()
{
  document.getElementById("q_ogolno")
          .addEventListener("click", wyp_ogolno, false);
}, false);

window.addEventListener("load", function()
{
  document.getElementById("zapisz_wszystko")
          .addEventListener("click", zapiszWszystko, false);
}, false);

window.onload=function(){
 getDelay();
 getCodes();
 getZapis();
 getGodzina();
 getLogin();
 getSemestr();
 getKierunek();
 getOgolno();
}

function resetCount()
{
	localStorage.counter = 0;
	return true;
}

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getDelay")
      sendResponse({delay: localStorage.delay});
    else if(request.method == "getLAP")
        sendResponse({login: getLoginAndPass(),
					  ogolno: localStorage.ogolno,
					  codes: localStorage.codes});
    else if(request.method == "getCodes")
      sendResponse({codes: firstCode(request.index),
					ogolno: localStorage.ogolno});
    else if(request.method == "getKierunek")
      sendResponse({kierunek: localStorage.kierunek});
    else if(request.method == "delCode")
      sendResponse({resp: delCode(request.kod)});
      else if(request.method == "resetLocalCount")
      sendResponse({reset: resetCount()});
    else if(request.method == "getZapisName")
      sendResponse({zapisname: localStorage.zapis_name,
					zapisnum: localStorage.zapis_num,
					delay: localStorage.delay,
					semestr: localStorage.semestr});
    else
      sendResponse({});
});
