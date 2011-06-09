<?php

//require_once('./flickr.php'); 
class Flickr {

    private $apiKey = '233d3164af0d4da4ac09816038a5315a';

    public function __construct() {
        
    }

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

    public function searchGeo() {
        $search = 'http://api.flickr.com/services/rest/?method=flickr.photos.getWithGeoData' .
                '&api_key=6421bdf616129e2457c8df55a3b5b819' .
                '&format=rest&auth_token=72157626916150836-fca7e1e00173913c'
                . '&api_sig=39c3aef4c4e5171a554885b146f463f0';
        $result = simplexml_load_file($search);
        return $result;
    }

    public function getGeoTag($query = null) {
        $search = 'http://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=6421bdf616129e2457c8df55a3b5b819'
        .'&photo_id='.urlencode($query).'&format=rest';
        $result = simplexml_load_file($search);
        return $result;
    }

}

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

function getPictures() {
    $Flickr = new Flickr;
    $data = $Flickr->search($_GET['param']);


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

function flikrRestOutput() {
    echo date("H:i:s");
    $data = $GLOBALS['data'];
    echo json_encode($data);
}

function flikrMyGeoOutput() {
    $Flickr = new Flickr;
    $myGeoData = $Flickr->searchGeo();
    header("Content-type: text/xml");
    echo $myGeoData->asXML();
}

function flikrGeoLocation() {
    $Flickr = new Flickr;
    $photolocation = $Flickr->getGeoTag($_GET['photoId']);
    if ($photolocation != null) {
        header("Content-type: text/xml");
        echo $photolocation->asXML();
    } else{
        echo date("H:i:s");
    }
        
}

?>
