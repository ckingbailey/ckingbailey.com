<?php
require '../vendor/autoload.php';
session_start();
$_SESSION['token'] = crypt($_SERVER['HTTP_USER_AGENT'], getenv('SALT'));
error_log('TEST error logging' . print_r($_SESSION, true));

readfile('./index.html');
exit;