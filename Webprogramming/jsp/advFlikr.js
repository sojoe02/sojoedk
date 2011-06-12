/* 
 * These scripts handle the google/flikr mashup.
 */


var images = new Array();

//This calls a php function that returns all my photos with geotags.
//and passes the data to the geoDataHandler function:
function ajaxFunctionFlikrMyGeoDataXML(){

    var func = "flikrMyGeoOutput";  
        
    jQuery.get("getFlikr.php",{
        func : func
    },
    function(data){      
        geoDataHandler(data);
    });     
}

//this calls the php function which gets a photos geoinformation in XML format.
function getPhotoLocation(photoId){

    var func = "flikrGeoLocation";  
    
    jQuery.get("getFlikr.php",{
        func : func,
        photoId : photoId
    },
    function(data){      
        drawPhotoLocation(data);
    });   
}

//Renders the photos with geodata and adds the eventlistener that enables their
//location to be rendered via google maps.
function geoDataHandler(data)
{
   
    var XMLdoc = data;
    images = XMLdoc.getElementsByTagName('photo');     
    
    for (i=0;i<images.length;i++)    {
        var item = images[i];    
        
        jQuery("<img/>").attr({
            //building the image:
            src : 'http://farm' 
            + item.getAttribute('farm') 
            + '.static.flickr.com/'
            +item.getAttribute('server') + '/'
            +item.getAttribute('id') + '_'
            +item.getAttribute('secret') + '.jpg',            
            id : item.getAttribute('id') ,
            //setting the class and title:
            'class' : 'click',
            title : 'Click to show location on map'
        })
        .appendTo("#myGeoImages");

    } 
    //when image is clicked get it's location on the map:
    jQuery('.click').click(function(){
        pos = this.id;
        getPhotoLocation(pos);
    });      
    hovereffect();   
}


//Renders the photos location on a googlemap.
function drawPhotoLocation(data) {
   
    var XMLdata = data;
    x = XMLdata.getElementsByTagName('location');
    y = XMLdata.getElementsByTagName('locality')
    
    var lat = x[0].getAttribute('latitude');
    var lng = x[0].getAttribute('longitude');   
    
    var latlng = new google.maps.LatLng(lat,lng);
                
    var myOptions = {
        zoom: 10,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"),
        myOptions);
        
    var marker = new google.maps.Marker({
        position: latlng,
        title: y[0].childNodes[0].nodeValue
    });
    marker.setMap(map); 
}

function hovereffect() {

    jQuery("#myGeoImages > img").hover(function(){
        jQuery(this).fadeTo("fast",0.6);
     
    },function(){
        jQuery(this).fadeTo("fast",1.0);
    });
 

}
