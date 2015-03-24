var title = document.title;


if(title.indexOf('semestrze') !== -1)
{
	
	chrome.extension.sendRequest({method: "getZapisName"}, function(response) {
		if(response.zapisname == 0)
		{
			document.write(0);
		} else {
			var zapis = response.zapisname;
			var num = response.zapisnum;
			var delay = Number(response.delay)*parseInt(Math.random()*0.5+0.5);
			button = document.getElementsByName(zapis);
			pausecomp(350+delay);
			var date = new Date(2012,9,1,15,0,0);
			document.write(date);
			//button[num].click();
			//document.write(delay);
		}
	});
} else {
	if(title.indexOf('zajęciowych') !== -1)
	{
		var select = document.getElementsByName("KryteriumFiltrowania");
		if(select[0].options[1].selected == false)
		{
			select[0].options[1].selected = true;
			select[0].onchange();
		}
		document.getElementsByName("filtrKodGrupy")[0].value= 'z02-34b';
		// document.getElementsByName("event_NoEvent")[3].click();
	} else {
		var select = document.getElementsByName("kodGrupy");
		var button = document.getElementsByName("event_ZapiszKodGrupy");
		chrome.extension.sendRequest({method: "getCodes"}, function(response) {
			select[0].value = response.codes;
			//pausecomp(10);
			button[0].click();
		});			
	}
}

function pausecomp(ms) {
ms += new Date().getTime();
while (new Date() < ms){}
} 

