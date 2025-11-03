<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);
    
    // Email details
    $to = "mlamboaaron0@gmail.com";
    $email_subject = "New Contact Form: $subject";
    $email_body = "
        Name: $name\n
        Email: $email\n
        Phone: $phone\n
        Subject: $subject\n
        Message:\n$message
    ";
    $headers = "From: $email";
    
    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>