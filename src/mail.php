<?php
use Mailgun\Mailgun;

// require '../config.php';
require '../vendor/autoload.php';

if (empty($_POST)) {
    header('Location: ./index.html');
    exit;
}

$mailer = new Mailgun(MAILGUN_API_KEY);
$domain = MAILGUN_DOMAIN;
$mailgunUser = 'postmaster@' . $domain;

$result = $mailer->sendMessage($domain, [
    'from' => $mailgunUser,
    'to' => 'ckingbailey@gmail.com',
    'subject' => 'hello test',
    'text' => 'This is a test of the Mailgun email service'
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