<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://persianacarpets.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$recaptcha_secret = '6LewcuYrAAAAAHgHsFjPMmWu02xdJy80n0iqOyvq';
$token = $_POST['g-recaptcha-response'] ?? '';

if (empty($token)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing reCAPTCHA token']);
    exit;
}

// Verify reCAPTCHA with Google
$verify = file_get_contents('https://www.google.com/recaptcha/api/siteverify?' . http_build_query([
    'secret' => $recaptcha_secret,
    'response' => $token,
    'remoteip' => $_SERVER['REMOTE_ADDR'],
]));

$result = json_decode($verify, true);

if (!$result['success'] || $result['score'] < 0.3) {
    http_response_code(403);
    echo json_encode(['error' => 'reCAPTCHA verification failed']);
    exit;
}

// Forward to FormSubmit via their AJAX endpoint
$formsubmit_url = 'https://formsubmit.co/ajax/persianacarpets7@gmail.com';

$fields = [
    'name'     => $_POST['name'] ?? '',
    'email'    => $_POST['email'] ?? '',
    'phone'    => $_POST['phone'] ?? '',
    'message'  => $_POST['message'] ?? '',
    '_cc'      => $_POST['_cc'] ?? '',
    '_subject' => $_POST['_subject'] ?? 'New Enquiry — Persiana Carpets',
];

$ch = curl_init($formsubmit_url);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => http_build_query($fields),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER     => ['Accept: application/json'],
    CURLOPT_TIMEOUT        => 15,
]);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_code >= 200 && $http_code < 300) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(502);
    echo json_encode(['error' => 'Failed to forward form submission']);
}
