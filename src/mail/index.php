<?php
class Mailer {
    private $from_name;
    private $phone;
    private $from_email;
    private $message;

    public function __construct(array $post = []) {
        $this->from_name = $post['name'];
        $this->phone = $post['phone'];
        $this->from_email = $post['email'];
        $this->message = $post['message'];
    }

    public function validate() {}

    public function clean() {}

    public function send() {}

    public function __toString() {
        return print_r([
            'name' => $this->from_name,
            'phone' => $this->phone,
            'email' => $this->from_email,
            'message' => $this->message
        ], true);
    }
}

if (empty($_POST)) {
    header('Location: ../index.html');
    exit;
}

