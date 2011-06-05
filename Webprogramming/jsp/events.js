/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

window.onload = load;

function loadimage(item){
    var image = document.getElementById('mutatingImage')
    switch(item){
        case 'clicked':
            image.setAttribute('src', 'img/p6_button3.gif');
            break;
        case 'hoover':
            image.setAttribute('src', 'img/p6_button2.gif');
            break;
        case 'release':
            image.setAttribute('src', 'img/p6_button2.gif');
            break;
        case 'nonhoover':
            image.setAttribute('sec', 'img/p6_button1.gif');
        default:
            image.setAttribute('src', 'img/p6_button1.gif');
    }       
}

function load() {
        
    var image    = document.createElement('IMG');
    
    image.setAttribute('src', 'img/p6_button1.gif');
    image.id = 'mutatingImage';
    
    var el = document.getElementById("imageJS");
    el.appendChild(image);
    
    
    
    image.addEventListener("mousedown", function(){
        loadimage('clicked')
    }, false);
    image.addEventListener("mouseover", function(){
        loadimage('hoover')
    }, false);
    image.addEventListener("mouseup", function(){
        loadimage('release')
    }, false);
    image.addEventListener("mouseout", function(){
        loadimage('nonhoover')
    }, false);
} 