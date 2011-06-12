var demoTmp = 1;

function demo()
{    
    if (demoTmp == 1){
        document.body.style.backgroundColor = 'blanchedalmond';        
        demoTmp = 0;
    } else{
        document.body.style.backgroundColor = 'aliceblue';
        demoTmp = 1;
    }    
}

function setColors(){
    color1 = document.getElementById('color1').value;
    color2 = document.getElementById('color2').value;
    var colors  = [color1, color2];
    var table   = document.getElementById('singletablebody');
    var tr = table.getElementsByTagName("TR");
    
    for(var i=0; i<tr.length; i++){
        tr[i].style.backgroundColor = colors[i % 2];    
    }   

}
