<?php

//Flikr handler class, this class takes care of all the calls too flikr 
//and flikrs callback values in various formats.
class Flickr {

    private $apiKey = '233d3164af0d4da4ac09816038a5315a';
    private $userID = '63154520%40N05';

    public function __construct() {
        
    }

    //Searches through flikr and gets latest picture relevant to the query:
    public function search($query = null) {
        $search = 'http://flickr.com/services/rest/?method=flickr.photos.search&api_key='
                . $this->apiKey
                . '&text='
                . urlencode($query)
                . '&per_page=5&format=php_serial';
        $result = file_get_contents($search);
        $result = unserialize($result);
        return $result;
    }

    //Searches for pictures with gettags based on userID (mine) in XML:
    public function searchGeo() {
        $search = 'http://api.flickr.com/services/rest/?method=flickr.photos.search'
                . '&api_key=' . $this->apiKey . '&user_id='.$this->userID
                .'&has_geo=yes&format=rest';

        $result = simplexml_load_file($search);
        return $result;
    }

    //Gets the geotag information based on photo ID in XML:
    public function getGeoTag($query = null) {

        $search = 'http://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation'
                . '&api_key=' . $this->apiKey
                . '&photo_id=' . urlencode($query) . '&format=rest';
        $result = simplexml_load_file($search);
        return $result;
    }
}

//switch statements enabling javascript GET to define which function is to be used:
switch ($_GET['func']) {
    case 'gerRest':
        flikrRestOutput();
        break;
    case 'getpics':
        getPictures();
        break;
    case 'flikrMyGeoOutput':
        flikrMyGeoOutput();
        break;
    case 'flikrGeoLocation':
        flikrGeoLocation();
        break;
    default:
}


//Declaring the functions.
function getPictures() {
    
    $Flickr = new Flickr;
    $data = $Flickr->search($_GET['param']);
    /* @var $shareData type */
    foreach ($data['photos']['photo'] as $photo) {
        // the image URL becomes somthing like 
        // http://farm{farm-id}.static.flickr.com/{server-id}/{id}_{secret}.jpg  
        echo '<img src="http://farm' . $photo["farm"] . '.static.flickr.com/'
        . $photo["server"] . '/'
        . $photo["id"] . '_'
        . $photo["secret"] . '.jpg">';
    }    
}

function servertime() {
    echo date("H:i:s");
}

//echos search results in JSON format:
function flikrRestOutput() {
    $Flickr = new Flickr;
    $data = $Flickr->search($_GET['param']);
    echo json_encode($data);
}

//echos all my photos with geotags in XML format:
function flikrMyGeoOutput() {
    $Flickr = new Flickr;
    $myGeoData = $Flickr->searchGeo();
    header("Content-type: text/xml");
    echo $myGeoData->asXML();
}

//echos geolocation data for specific photo in XML format:
function flikrGeoLocation() {
    $Flickr = new Flickr;
    $photolocation = $Flickr->getGeoTag($_GET['photoId']);
    if ($photolocation != null) {
        header("Content-type: text/xml");
        echo $photolocation->asXML();
    } else {
        echo date("faulty location XML file");
    }
}
?>
