<?php
use Mailgun\Mailgun;

require '../vendor/autoload.php';

function compareOriginWithHost() {
    $scheme = !empty($_SERVER['REQUEST_SCHEME'])
        ? $_SERVER['REQUEST_SCHEME']
        : ((!empty($_SERVER['HTTPS']) && strcasecmp($_SERVER['HTTPS'], 'off') !== 0)
            ? 'https'
            : 'http');
    $host = "$scheme://{$_SERVER['SERVER_NAME']}";
    if (empty($_SERVER['HTTP_ORIGIN'])) return false;
    if (strpos($_SERVER['HTTP_ORIGIN'], $host) !== 0) return false;
    return true;
}

error_log('mail route requested');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    error_log("Bad method: {$_SERVER['REQUEST_METHOD']}");
    header('Bad method', true, 405);
    exit;
}
if (empty($_POST)
    || empty($_POST['name'])
    || empty($_POST['email'])
    || empty($_POST['message'])) {
    error_log('Malformed request: ' . print_r($_POST, true));
    header('Request malformed', true, 400);
    exit;
}

if (!compareOriginWithHost()) {
    error_log("No cors: {$_SERVER['REQUEST_SCHEME']}://{$_SERVER['SERVER_NAME']} *vs* {$_SERVER['HTTP_ORIGIN']}");
    header('No cors', true, 403);
    exit;
}

// TODO: validate email
$cleanPost = filter_input_array(INPUT_POST, FILTER_SANITIZE_SPECIAL_CHARS);

$mailer = new Mailgun(getenv('MAILGUN_API_KEY'));
$domain = getenv("MAILGUN_DOMAIN");
$mailgunUser = 'postmaster@' . $domain;

$result = $mailer->sendMessage($domain, [
    'from' => 'colin@ckingbailey.com',
    'to' => 'ckingbailey@gmail.com',
    'subject' => "new message from {$cleanPost['name']}",
    'text' => "{$cleanPost['name']} [{$cleanPost['email']}] says:\r\n\r\n{$cleanPost['message']}\r\n\r\n{$cleanPost['name']}\r\n{$cleanPost['email']}\r\n{$cleanPost['phone']}"
]);
error_log(print_r($result, true));

list($status, $body) = $result
    ? [ 200, 'Message sent.' ]
    : [ 500, 'I\'m sorry, there was a problem sending your message.' ];

http_response_code($status);
if (http_response_code() === 500) {
    exit;
}
echo $body;