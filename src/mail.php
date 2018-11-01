<?php
use Mailgun\Mailgun;

// require '../config.php';
require '../vendor/autoload.php';

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

if (!$result) {
    echo "
        <div style='margin: 3rem 3rem; font-family: monospace; color: red'>
            <h1>Message send failed</h1>
            <ul>
                <li>$domain</li>
                <li>" . MAILGUN_API_KEY . "</li>
                <li>$mailgunUser</li>
            </ul>
        </div>";
} else echo "<h1 style='color: green;'>Message sent</h1>";