var destination = [];var filenames = [];var entities = [];var lines; var filepaths = []; var parentpath = []; 
//var knobname; 
var nameofitself;
var dir;
var tempdir;
var apacheTxt;
var Env;
if (navigator.appVersion.indexOf("Win")!=-1) Env="Win";
if (navigator.appVersion.indexOf("Mac")!=-1) Env="Mac";
if (navigator.appVersion.indexOf("X11")!=-1) Env="X11";
if (navigator.appVersion.indexOf("Linux")!=-1) Env="Linux";


function loadfolder(d) {
	destination = [];
	
	tempdir = d;
	dir = d.replace("?f", "/").replace("?in", "");

	//alert(dir);
	var $div = $('<div>');
	$div.load(dir, function (responseTxt, statusTxt, xhr) {
		if (statusTxt == "success")

			if (responseTxt.charAt(0) == "<") { //this is on the server
				Env="Apache";


				html = $.parseHTML(responseTxt);

				var htmlextlinks = $('a', html).map(function () {
					return $(this).attr('href');
				}).get();
				apacheTxt = "300: file:///D:/G/A/m/\n200: filename content-length last-modified file-type\n";
				for (i = 0; i < htmlextlinks.length; i++) {
					if (htmlextlinks[i].charAt(0) == "/" || htmlextlinks[i].charAt(0) == "?") {} else {
						if (htmlextlinks[i].charAt(htmlextlinks[i].length - 1) == "/") {
							apacheTxt = apacheTxt + "201: " + htmlextlinks[i].slice(0, -1) + " 0 Mon,%2016%20Mar%202020%2022:41:59%20GMT DIRECTORY \n";
						} else {
							apacheTxt = apacheTxt + "201: " + htmlextlinks[i] + " 0 Mon,%2016%20Mar%202020%2022:41:59%20GMT FILE \n";	
						}
					}
				}
				lines = apacheTxt.split("\n"); //each line like "200: filename content-length last-modified file-type"
				loadlistitem(0); //load links to destination array
				//knobname = window.location.pathname.split("/")[window.location.pathname.split("/").length-2];
				



			} else { //this is on windows or Mac
				lines = responseTxt.split("\n"); //each line like "200: filename content-length last-modified file-type"
				for(i=0; i<lines.length;i++){
				}
				loadlistitem(0); //load links to destination array
				parentpath = lines[0].split(" ")[1].split("/"); //get parentpath from the location of current folder
				/*if (tempdir.indexOf("?f") >= 0) { //check if destination is a folder without knob
					knobname = dir.replace("%20", " ");
				} else {
					knobname = parentpath[parentpath.length - 2]; //get knob name by taking last folder in the parentpath
				}*/
			}



		//document.title = "◯. " + knobname; //apply knob name to title
		//$('#id').text(knobname); //apply knob name to #id
	});
}

function loadlistitem(i){
	if(i<lines.length-3){ //parse folder reading
		
		filenames[i] = lines[i+2].split(" ")[1]; //get filename
		
		if(filenames[i].indexOf("//")<0){ //if destination is relative
			filepaths[i] = dir+filenames[i];
		}else{ //if absolute
			filepaths[i] = filenames[i];
		}

		entities[i] = lines[i+2].split(" ")[4]; //get type
		nameofitself = window.location.pathname.split("/").pop();
		if(entities[i] == "DIRECTORY"){ //check if type = folder
			$.ajax({ //check if knob exist inside folder
				url:filepaths[i]+"/"+nameofitself,
				dataType:'html',
				success: function(){ //if knob exist, insert knob link
					
						destination[i] = filepaths[i]+"/"+nameofitself;
					
						loadlistitem(i=i+1); //replay function with next item
					},
				error: function(){ //if no knob, insert direct path and indicate it's a folder without knob for loader.js
					//alert(filepaths[i]+'/knob.html');
						destination[i] = filepaths[i]+"?f";
						loadlistitem(i=i+1);//replay function with next item
					}
			});
		}else{ //if type = else
			
			if (filenames[i].split(".")[filenames[i].split(".").length - 1] == "url") {//check if .url
				
				handleShortcutURL(filenames[i], i);
				
			}else if(filenames[i].split(".")[filenames[i].split(".").length - 1] == "webloc"){//check if .webloc
				handleShortcutWebloc(filenames[i], i);
			}else{//any file
				destination[i] = filepaths[i];
				loadlistitem(i=i+1);
			}
			
		}
	}else{//after everything is imported
		
		destination = jQuery.grep(destination, function(value) {//remove from the array
  			return value != "./"+nameofitself;
		});
		destination = jQuery.grep(destination, function(value) {
  			return value != "./.DS_Store";
		});
		destination = jQuery.grep(destination, function(value) {
  			return value != "./.gitignore";
		});
		destination = jQuery.grep(destination, function(value) {
  			return value != "./.htaccess";
		});
		console.log(destination);
		  
		  loadKnob(destination);}//reload knob once list is fully loaded
}
	
function handleShortcutURL(scLink, i){
	var urllink;
	
	if(Env == 'Win'){
		//alert(Env);
		destination[i] = filepaths[i];
		loadlistitem(i=i+1);
	}else if(Env == 'Apache' || Env == 'Mac'){
		//alert(Env);
		$.ajax({
		url: scLink,
		success: function (data) {
			destination[i] = data.split("\n")[4].replace("URL=", "");
			loadlistitem(i=i+1);
		},
		error: function () {}
		});
	}
	
}
function handleShortcutWebloc(scLink, i){
	var urllink;
	if(Env == 'Win'){
	}else if(Env == 'Apache' || Env == 'Mac'){
		$.ajax({
		url: scLink,
		success: function (data) {
			destination[i] = data.substring(data.lastIndexOf("<string>") + 1, data.lastIndexOf("</string>"));
			loadlistitem(i=i+1);
		},
		error: function () {}
		});
	}
	
}

//<script type="text/javascript">window.NREUM||(NREUM={});NREUM.info={"beacon":"bam.nr-data.net","errorBeacon":"bam.nr-data.net","licenseKey":"5e33925808","applicationID":"80617260","transactionName":"JVcPR0MLWApSRU1eAQVVEhxDAUcJQkUBVhBJXw1HVztRC1VSBg==","queueTime":0,"applicationTime":22,"agent":""}</script>