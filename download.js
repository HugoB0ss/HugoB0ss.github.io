var script = document.createElement('script');
script.type = 'text/javascript';
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.2.2/jszip.js';
document.head.appendChild(script);
var script1 = document.createElement('script');
script1.type = 'text/javascript';
script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.1.0/jszip-utils.js';
document.head.appendChild(script1);

var interval;
setTimeout(function(){
var scroll= 0;
interval = setInterval(function(){
 scroll += document.body.scrollHeight/30;
 window.scrollTo(0,scroll);
},200)},1000);

var zip;
var elements = document.getElementById('_imageList').getElementsByClassName('_images')
var long = elements.length;
var count = 0;
setTimeout(function(){
clearInterval(interval);
var split = window.location.href.split('/')
var name = split[5]+'_'+split[6] || 'noName'
zip = new JSZip();
for(var i =0;i<elements.length;i++){
	forceDownload(elements[i].src,name,i);
}
},7000);

function generateAndDownload(name){
setTimeout(()=>{
		
		if(long === count){ 
		zip.generateAsync({type:"blob"}).then(function (blob) {
        download(blob, name+'.zip','blob'); 
    }, function (err) {
        jQuery("#blob").text(err);
    });
		}
	},1000);}

function forceDownload(url, fileName,number){
   JSZipUtils.getBinaryContent(url, function (err, data) {
	   if(err) {
		  count++;
		  return;
	   }
	   zip.file(number+'_'+fileName+'.png', data, {binary:true});
	   count++;
	   if(count === long){
		generateAndDownload(fileName);
	   }
	});
}

function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(file, filename);
    else {
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

