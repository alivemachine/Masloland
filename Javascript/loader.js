
var framselect = 1;
var gotoURL;
var watchKnob =false;


function launcher(i){	////////////CROSS FADER
	//create top frame
	if(typeof nameofitself == 'undefined'){ //if nameofitself don't exist
		nameofitself = document.title; //create a temporary one so the scritp can keep running
	}
	
	var ext = destination[i].split(".")[destination[i].split(".").length-1];
	///////Special Treatments//////////
	if(ext=="exe" || ext=="dat" || ext=="bin" || ext=="dll" || ext=="sbd" || ext=="rtf" || ext=="tlb" || ext=="ja" || ext=="chk" || ext=="sig" || ext=="pak" || ext=="DLL" || ext=="wim" || ext=="cab" || ext=="crypt" || ext=="old" || ext=="cat" || ext=="esd" || ext=="ESD" || ext=="psd" || ext=="odt" || ext=="msi" || ext=="3ds" || ext=="3DS" || ext=="tox" || ext=="toe" || ext=="stl" || ext=="eps" || ext=="zip" || ext=="rar" || ext=="docx" || ext=="fbx" || ext=="7z" || ext=="tif" || ext=="DS_Store"){ //if any of thos extension is found
		var newdest = destination[i].split("/");
		newdest.pop();
		$("#frame"+framselect).html("<iframe class='iFrameInput' allowFullScreen='true' src='"+newdest.join("/")+"/"+"' frameborder='0'></iframe>"); //then load parent folder
	}else if(ext == "png" || ext == "jpg" || ext=="gif"){
		$("#frame"+framselect).css({'background-image':"url("+destination[i]+")"});	
	}else{
		if(destination[i].indexOf("medium") >= 0 ){
			$("#frame"+framselect).html("<iframe class='iFrameInput' allowFullScreen='true' src='windows/medium.html' frameborder='0'></iframe>");
		}else if(destination[i].indexOf("github") >= 0 ){
			$("#frame"+framselect).html("<iframe class='iFrameInput' allowFullScreen='true' src='windows/github.html' frameborder='0'></iframe>");
		}else if(destination[i].indexOf("drive") >= 0 ){
			$("#frame"+framselect).html("<iframe class='iFrameInput' allowFullScreen='true' src='windows/drive.html' frameborder='0'></iframe>");
		}else if(destination[i].indexOf("instagram") >= 0 ){
			$("#frame"+framselect).html("<iframe class='iFrameInput' allowFullScreen='true' src='windows/instagram.html' frameborder='0'></iframe>");
		}else if(destination[i].indexOf("linkedin") >= 0 ){
			$("#frame"+framselect).html("<iframe class='iFrameInput' allowFullScreen='true' src='windows/linkedin.html' frameborder='0'></iframe>");
		}else if(destination[i].indexOf("twitter") >= 0 ){
			$("#frame"+framselect).html("<iframe class='iFrameInput' allowFullScreen='true' src='windows/twitter.html' frameborder='0'></iframe>");
		}else if(destination[i].indexOf("maslo.ai") >= 0 ){
			$("#frame"+framselect).html("<iframe class='iFrameInput' allowFullScreen='true' src='windows/masloai.html' frameborder='0'></iframe>");
		}else if(destination[i].indexOf("artcafe") >= 0 ){
			$("#frame"+framselect).html("<iframe class='iFrameInput' allowFullScreen='true' src='windows/artcafe.html' frameborder='0'></iframe>");
		}else{
			$("#frame"+framselect).html("<iframe class='iFrameInput' allowFullScreen='true' src='"+destination[i]+"' frameborder='0'></iframe>");
		}
	}
	/////////////////////////////////////
	$("#frame"+framselect).css({'opacity': 1, 'z-index': '1'});
	if(framselect>=2){framselect = 1;}else{framselect=framselect+1;} 
	$("#frame"+framselect).css({'z-index': '0'});
	setTimeout(function(){
		$("#frame"+framselect).css({'opacity': 0});
		$("#frame"+framselect).empty();
	},500);
	
	

	$("#experienceContainer").css({'z-index': ''});
	
};

function grabber(i){
	
	gotoURL = destination[i];
	
	launcher(i); //launch url
	$('#through').css({display: 'block'});
	//$("#through").attr("href", destination[i]);
};

function goThrough(){
	if(gotoURL == undefined){ //if door closed (no through)
			/*$('#id').append("<div id='error'>undefined</div>");
			setTimeout(function(){
				$('#error').remove();
			}, 200);*/
		window.location.href= window.location.href+"?in"; //go through door

	}else{
		$('#knob').css({transform: 'scale(2)'});
		$('#knob, #handleout, #handlein').css({opacity:0});
		$('#outerknob').css({'box-shadow':'none'});
		$('#through').css({'display':'none'});
		setTimeout(function(){ //bottom go top
			watchKnob = true;
			callbackKnob(); //bring back the knob if still on the page (in case of pushstate)
			
			if (gotoURL.indexOf("?f") >= 0){//check if it's a folder
			
			//
				loadfolder(gotoURL+"?in"); //stay here but load new knob
				
				
			}else{window.location.href= gotoURL;}
			
		}, 200);
		
		
		
	}
	
}
function callbackKnob(){
	setTimeout(function(){
		if(watchKnob == true){
			loadKnob(destination);
			watchKnob = false;
		}else{
			callbackKnob();
		}
	},100);
		
}

var jsfullyloaded = true;