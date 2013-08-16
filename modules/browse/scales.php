<?php
// Setting variables that we horribly use in browse.inc - I'm sooo sorry!
$strTitleBarColor = '#E2A30C';
$strHeadline        = $oLang->Get('browse_headline_scales');
$strType            = 'scale';

$arrURI				= explode('/', REQUEST_URI);
$strSubMode			= $arrURI[3];

require('browse.inc');
?>