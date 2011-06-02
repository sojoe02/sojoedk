<?php

//require_once('./flickr.php'); 
class Flickr { 
	private $apiKey = '233d3164af0d4da4ac09816038a5315a'; 
 
	public function __construct() {
	} 
 
	public function search($query = null) { 
		$search = 'http://flickr.com/services/rest/?method=flickr.photos.search&api_key=' . $this->apiKey . '&text=' . urlencode($query) . '&per_page=5&format=php_serial'; 
		$result = file_get_contents($search); 
		$result = unserialize($result); 
		return $result; 
	} 
}



$Flickr = new Flickr; 

$data = $Flickr->search($_GET['param']); 

foreach($data['photos']['photo'] as $photo) { 
	// the image URL becomes somthing like 
	// http://farm{farm-id}.static.flickr.com/{server-id}/{id}_{secret}.jpg  
	echo '<img src="http://farm' . $photo["farm"] . '.static.flickr.com/' . $photo["server"] . '/' . $photo["id"] . '_' . $photo["secret"] . '.jpg">'; 
}
?>
