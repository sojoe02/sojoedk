var inputs = 0;


function addContact(){
    var table = document.getElementById('contacts');
    var tr    = document.createElement('TR');
    var td1   = document.createElement('TD');
    var td2   = document.createElement('TD');
    var td3   = document.createElement('TD');
    var inp1  = document.createElement('INPUT');
    var inp2  = document.createElement('INPUT');

    if(inputs>=0){
        var img     = document.createElement('IMG');
        img.setAttribute('src', 'img/p6_delete.gif');
        img.onclick = function(){
            removeContact(tr);
        }
        td1.appendChild(img);
    }

    inp1.setAttribute("Name", "Name" +inputs);
    inp2.setAttribute("Name", "Email"+inputs);

    table.appendChild(tr);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    td2.appendChild(inp1);
    td3.appendChild(inp2);

    inputs++;
}
function removeContact(tr){
    tr.parentNode.removeChild(tr);
}

function setColors(color1, color2){
    var colors  = [color1, color2];
    var table   = document.getElementById('singletablebody');
    var tr = table.getElementsByTagName("TR");
    //while(tr){
    //tr.style.backgroundColor =  'white';//colors[counter++ % 2];           
    //  tr = tr.nextSibling;                        
    //}
    for(var i=0; i<tr.length; i++){
        tr[i].style.backgroundColor = colors[i % 2];    
    }   
    
//alert(color1 + color2);
}

function loadXMLDoc(dname)
{
    if (window.XMLHttpRequest)
    {
        xhttp=new XMLHttpRequest();
    }
    else
    {
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",dname,false);
    xhttp.send();
    return xhttp.responseXML;
}

function writeXML(title, tag){    
    
    var parent = document.getElementById('testing');  
    var newheading = document.createElement("H4");
    newheading.innerHTML = "Printing xml nodes!"; 
    newheading.id = 'printheadline';
    
    
    if(document.getElementById('printheadline') == null){
        parent.appendChild(newheading);
    }
    var list = document.getElementById('testinglist');
    
    xmlDoc = loadXMLDoc(title);
    //for(i=0; i<5; i++){    
    x=xmlDoc.getElementsByTagName(tag);
    
    for (i=0;i<x.length;i++)
    {         
        var newitem = document.createElement("LI");
        newitem.innerHTML = x[i].childNodes[0].nodeValue;
        list.appendChild(newitem);
    }   
}

function clearList(){
    var list = document.getElementById('testinglist');
    var x = list.childNodes;
    for ( var i = 0; i < x.length; ++i )
    {        
        x[i].parentNode.removeChild(x[i]);
        i--;
    }    
    
    var heading = document.getElementById('printheadline');
    heading.parentNode.removeChild(heading);   
   
}

function ajaxFunction(){
	var ajaxRequest;  // The variable that makes Ajax possible!
	
	try{
		// Opera 8.0+, Firefox, Safari
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				// Something went wrong
				alert("Your browser broke!");
				return false;
			}
		}
	}
	// Create a function that will receive data sent from the server
	ajaxRequest.onreadystatechange = function(){
		if(ajaxRequest.readyState == 4){
			document.myForm.time.value = ajaxRequest.responseText;
		}
	}
	ajaxRequest.open("GET", "servertime.php", true);
	ajaxRequest.send(null); 
}
