<?php
use Mailgun\Mailgun;

require '../vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] !== $_POST) {
    header('Bad request, naughty naughty', true, 400);
    exit;
}
if (empty($_POST)) {
    header('Location: ./index.html');
    exit;
}

$cleanPost = filter_input_array(INPUT_POST, FILTER_SANITIZE_SPECIAL_CHARS);

$mailer = new Mailgun(MAILGUN_API_KEY);
$domain = MAILGUN_DOMAIN;
$mailgunUser = 'postmaster@' . $domain;

$result = $mailer->sendMessage($domain, [
    'from' => 'colin@ckingbailey.com',
    'to' => 'ckingbailey@gmail.com',
    'subject' => "new message from {$cleanPost['name']}",
    'text' => "{$cleanPost['name']} [{$cleanPost['email']}] says:\r\n\r\n{$cleanPost['message']}\r\n\r\n{$cleanPost['name']}\r\n{$cleanPost['email']}\r\n{$cleanPost['phone']}"
]);

list($status, $body) = $result
    ? [ 200, 'Thank you for your message. You can expect to hear from me soon.' ]
    : [ 500, 'There was a problem sending your message.' ];

header("Status: $status");
echo $body;