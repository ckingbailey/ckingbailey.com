<?php
require '../vendor/autoload.php';
session_start();
$_SESSION['token'] = crypt($_SERVER['HTTP_USER_AGENT'], getenv('SALT'));

readfile('./index.html');
exit;