<?php
require_once($_SERVER['DOCUMENT_ROOT'].'/include/config.inc.php');

$iCacheExpire	= 60*60*24*365;
header("Pragma: public");
header("Cache-Control: max-age=".$iCacheExpire);
header('Expires: ' . gmdate('D, d M Y H:i:s', time()+$iCacheExpire) . ' GMT');
?>
<script src="//connect.facebook.net/en_US/all.js"></script>