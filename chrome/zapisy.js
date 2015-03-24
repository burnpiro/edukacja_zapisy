var title = document.title;
var bool = false;
var wejdz = getElementsByClassName(document, 'input', 'BUTTON_ZALOGUJ');

function dtimc(y, m, d, h, min, s, kod) 
{	
	var data = new Date(y,m,d,h,min,s);
	var time = new Date();
	var kody = kod.split(',');
	if(time < data)
	{
		setTimeout("dtimc("+y+","+m+","+d+","+h+","+min+","+s+","+kod+")", 5000);
	} else {
		var xmlhttp=new XMLHttpRequest();
		xmlhttp.open("GET","http://www.akz.pwr.wroc.pl/katalog_zap.xml",false);
		xmlhttp.send();
		var xmlDoc=xmlhttp.responseXML;
		var kursy = xmlDoc.getElementsByTagName('kurs');
		for(var i=0; i<kursy.length; i++)
		{
			var grupy = kursy[i].getElementsByTagName('grupa');
			for(var j=0; j<grupy.length; j++)
			{
				for(var k=0; k<kody.length; k++)
				{
					if(grupy[j].getElementsByTagName('kod_grupy')[0].childNodes[0].nodeValue == kody[k])
					{
						if(grupy[j].getElementsByTagName('liczba_miejsc')[0].childNodes[0].nodeValue > 0)
						{
							localStorage.usun = kody[k];
							wejdz[0].click();
						}
					}
				}
			}
		}
		setTimeout("dtimc("+y+","+m+","+d+","+h+","+min+","+s+","+kod+")", 5000);
	}
}

function dtim(y, m, d, h, min, s) 
{	
	var data = new Date(y,m,d,h,min,s);
	var time = new Date();
	if(time < data)
	{
		setTimeout("dtim("+y+","+m+","+d+","+h+","+min+","+s+")", 5000);
	} else {
		wejdz[0].click();
	}
}
if(document.location.href == 'https://edukacja.pwr.wroc.pl/EdukacjaWeb/logOutUser.do')
{
	window.location = 'https://edukacja.pwr.wroc.pl/EdukacjaWeb/studia.do';
}
if(document.location.href == 'https://edukacja.pwr.wroc.pl/EdukacjaWeb/studia.do')
{
	chrome.extension.sendRequest({method: "getLAP"}, function(response) {
		if(response.zapisname == 0)
		{
			document.write(0);
		} else {
			var zapis = response.login;
			var login = document.getElementsByName("login")[0];
			var pass = document.getElementsByName("password")[0];
			login.value = zapis[0];
			pass.value = zapis[1];
			if(response.ogolno == 'true')
			{
				dtimc(zapis[2], zapis[3], zapis[4], zapis[5], zapis[6], zapis[7], response.codes);
			} else {
				dtim(zapis[2], zapis[3], zapis[4], zapis[5], zapis[6], zapis[7]);
			}
			
		}
	});
	
} else if(document.location.href == 'https://edukacja.pwr.wroc.pl/EdukacjaWeb/logInUser.do')
{
	var token = getElementsByClassName(document, 'a', 'ZAKLADKA_AKT')[0];
	var temp = token.href.split('=');
	window.location = "/EdukacjaWeb/zapisy.do?clEduWebSESSIONTOKEN="+temp[1]+"==&event=WyborSluchacza"
} else if(title.indexOf('przedmiotu') !== -1)
{
	chrome.extension.sendRequest({method: "getKierunek"}, function(response) {
		var select = document.getElementsByName("ineSluId");
		if(select[0].options[response.kierunek].selected == false)
		{
			select[0].options[response.kierunek].selected = true;
		}
		var button = document.getElementsByName("event_WyborSluchaczaSubmit");
		//alert(button[0].value);
		button[0].click();
	});
} else if(title.indexOf('semestrze') !== -1)
{
	
	chrome.extension.sendRequest({method: "getZapisName"}, function(response) {
		var token = getElementsByClassName(document, 'td', 'BIALA');
		if(token[3].innerHTML.indexOf(response.semestr) != -1)
		{
			var a = token[0].innerHTML.split('=');
			var a2 = a[6].split('&');
			var link = '/EdukacjaWeb/zapisy.do?clEduWebSESSIONTOKEN='+a[2]+'==&event=wyborSemestruRow&rowId='+a2[0]+'&positionIterator=SluchaczSemestrySzczegolyROViewIterator&href=#hrefZapisySzczSlu';
			window.location = link;
		}
		var zapis = 'event_Zapisy';
		var num = response.zapisnum;
		var delay = Number(response.delay)*parseInt(Math.random()*0.5+0.5);
		button = document.getElementsByName(zapis);
		pausecomp(350+delay);
		localStorage.pierwsza = 0;
		button[num].click();
	});
} else {
	if(title.indexOf('zajęciowych') !== -1)
	{
		var select = document.getElementsByName("KryteriumFiltrowania");
		var button = document.getElementsByName("event_NoEvent");
		if(localStorage.pierwsza == undefined)
			localStorage.pierwsza = 0;
		if(localStorage.pierwsza == '')
			localStorage.pierwsza = 0;
		if(localStorage.pierwsza == 'undefined')
			localStorage.pierwsza = 0;
		if(select[0].options[1].selected == false)
		{
			select[0].options[1].selected = true;
			select[0].onchange();
		}
		select = document.getElementsByName("filtrKodGrupy");
		chrome.extension.sendRequest({method: "getCodes", index: localStorage.pierwsza}, function(response) {
			var kod = response.codes;
			select[0].value = kod;
			localStorage.pierwsza++;
				if(kod == 'exit')
				{
					if(response.ogolno == 'true')
					{
						if(document.getElementsByTagName('html')[0].innerHTML.indexOf(localStorage.usun))
						{
							chrome.extension.sendRequest({method: "delCode", kod: localStorage.usun}, function(response) {
							});	
						}
						var wyloguj = document.getElementsByName("wyloguj");
						wyloguj[0].click();
					} else {
						window.location = "http://www.google.pl";
					}
				} else {
					button[3].click();
				}			
		});	
		//document.getElementsByName("filtrKodGrupy")[0].value= 'z02-34b';
		// document.getElementsByName("event_NoEvent")[3].click();
	} else {
		var select = document.getElementsByName("kodGrupy");
		var button = document.getElementsByName("event_ZapiszKodGrupy");
		if(localStorage.pierwsza == undefined)
			localStorage.pierwsza = 0;
		if(localStorage.pierwsza == '')
			localStorage.pierwsza = 0;
		if(localStorage.pierwsza == 'undefined')
			localStorage.pierwsza = 0;
		chrome.extension.sendRequest({method: "getCodes", index: localStorage.pierwsza}, function(response) {
			var kod = response.codes;
			select[0].value = kod;
			localStorage.pierwsza++;
				if(kod == 'exit')
				{
					if(response.ogolno == 'true')
					{
						if(document.getElementsByTagName('html')[0].innerHTML.indexOf(localStorage.usun))
						{
							chrome.extension.sendRequest({method: "delCode", kod: localStorage.usun}, function(response) {
							});	
						}
						var wyloguj = document.getElementsByName("wyloguj");
						wyloguj[0].click();
					} else {
						window.location = "http://www.google.pl";
					}
				} else {
					button[0].click();
				}			
		});			
	}
}

function pausecomp(ms) {
	ms += new Date().getTime();
	while (new Date() < ms){}
} 

function getElementsByClassName(oElm, strTagName, strClassName){
  var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
	 var arrReturnElements = new Array();
	 strClassName = strClassName.replace(/\-/g, "\\-");
	 var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
	 var oElement;
	 for(var i=0; i<arrElements.length; i++){
	   oElement = arrElements[i];
	   if(oRegExp.test(oElement.className)){
	     arrReturnElements.push(oElement);
	   }
	 }
	 return (arrReturnElements)
}
