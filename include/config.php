<?php
session_start();
// Ensure the project is UTF-8
header('Content-type: text/html; charset=utf-8');
// Define project path variables

# Server root
define('SERVER_PROJECT_ROOT', $_SERVER['DOCUMENT_ROOT'].'');
define('SERVER_PROJECT_ROOT_LANG', SERVER_PROJECT_ROOT.'/include/lang/');
define('SERVER_PROJECT_ROOT_MODULES', SERVER_PROJECT_ROOT.'/modules/');
define('SERVER_PROJECT_ROOT_CLASS', SERVER_PROJECT_ROOT.'/class/');
define('SERVER_PROJECT_ROOT_CLASS_MODULE', SERVER_PROJECT_ROOT_CLASS.'/module-classes/');
define('SERVER_PROJECT_ROOT_LIBS', SERVER_PROJECT_ROOT.'/libs/');
define('SERVER_PROJECT_ROOT_INCLUDE', SERVER_PROJECT_ROOT.'/include/');

# Http root
define('HTTP_PROJECT_ROOT', '/'); // Until we have our own server we have to use entire http url to get to project root
define('HTTP_PROJECT_ROOT_IMG', HTTP_PROJECT_ROOT.'img/');
define('HTTP_PROJECT_ROOT_CSS', HTTP_PROJECT_ROOT.'css/');
define('HTTP_PROJECT_ROOT_JAVASCRIPT', HTTP_PROJECT_ROOT.'js/');
define('HTTP_PROJECT_ROOT_CLASS', HTTP_PROJECT_ROOT.'class/');
define('HTTP_PROJECT_ROOT_MODULES', HTTP_PROJECT_ROOT.'modules/');

require_once(SERVER_PROJECT_ROOT_INCLUDE.'conf.php');

# Commit Hash
$oFile	= new SplFileObject(SERVER_PROJECT_ROOT.'/.git/ORIG_HEAD');
define('GIT_COMMIT_HASH', $oFile->fgets());
$oFile	= null;

# Name some constants
define('DEFAULT_LANGUAGE', 'da-DK');

# Patterns
define('PATTERN_USERNAME', '[\wæøåÆØÅ_-]{2,16}');
define('PATTERN_FIRST_NAME', '[\wæøåÆØÅ]{0,20}');
define('PATTERN_LAST_NAME', '[\wæøåÆØÅ]{0,30}');
define('PATTERN_PASSWORD', '^(?=.*\d).{6,}$');
define('PATTERN_MAIL', '');
define('PATTERN_INT', '[0-9]{3}');

define('IS_DIALOG', strpos($_SERVER['REQUEST_URI'], '/dialog') !== false);
// Request URI should only be till the questionmark
$strRequestURI = strpos($_SERVER['REQUEST_URI'], '?') !== false ? substr($_SERVER['REQUEST_URI'], 0, strpos($_SERVER['REQUEST_URI'], '?')) : $_SERVER['REQUEST_URI'];
define('REQUEST_URI', !IS_DIALOG ? $strRequestURI : str_replace('/dialog', '', $strRequestURI));

// Connect to the database
$oMysqli = new mysqli('localhost', MYSQL_USER, MYSQL_PASS, MYSQL_DATABASE);
$oMysqli->set_charset('utf8');

// Include and create new instance of neccesary classes

# Renderpage
require_once(SERVER_PROJECT_ROOT_CLASS.'/renderpage.class.inc');
$oPageRenderer = new PageRenderer();

# Form
require_once(SERVER_PROJECT_ROOT_CLASS.'/form.class.inc');

# Mysql
require_once(SERVER_PROJECT_ROOT_CLASS.'/mysql-wrapper.class.inc');
$oSql = new MySQLWrapper($oMysqli);

# Global functions
require_once(SERVER_PROJECT_ROOT.'/include/global.functions.inc');

set_error_handler('handlePHPError');
register_shutdown_function('handleShutdown');

# User class
require_once(SERVER_PROJECT_ROOT_CLASS.'/user.class.inc');
$oUserHandler = new UserHandler($oSql);

# Template
require_once(SERVER_PROJECT_ROOT_CLASS.'/template.class.inc');
$oTemplate	= new Template($oSql);

# Language
require_once(SERVER_PROJECT_ROOT_CLASS.'/language.class.inc');
$oLang = new Language(GetCountryCode());

# Game
require_once(SERVER_PROJECT_ROOT_CLASS.'/game.class.inc');
$oIllustrations = new Illustrations($oSql);
?>
