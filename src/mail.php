<?php
use Mailgun\Mailgun;

require '../vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Bad method', true, 405);
    echo "Bad method: {$_SERVER['REQUEST_METHOD']}";
    exit;
}
if (empty($_POST)
    || empty($_POST['name'])
    || empty($_POST['email'])
    || empty($_POST['message'])) {
    header('Request malformed', true, 400);
    exit;
}

$accept_origin = [
    'dev' => 'http://ckingbailey.localhost:8888',
    'prod' => 'http://ckingbailey.com'
];

if ($_SERVER['HTTP_ORIGIN'] !== $accept_origin[($_ENV['PHP_ENV'] ?: 'prod')]) {
    header('No cors', true, 403);
    if ($_ENV['PHP_ENV'] === 'dev') echo json_encode($_SERVER);
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
echo $body;