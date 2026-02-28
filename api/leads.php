<?php

declare(strict_types=1);

require __DIR__ . '/common.php';

apply_cors_headers();
handle_options_preflight();

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    send_json(405, [
        'success' => false,
        'message' => 'Method not allowed. Use POST.',
    ]);
}

$payload = read_json_payload();

$name = trim((string) ($payload['name'] ?? ''));
$email = trim((string) ($payload['email'] ?? ''));

if ($name === '' || $email === '') {
    send_json(422, [
        'success' => false,
        'message' => 'Missing required fields: name and email.',
    ]);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_json(422, [
        'success' => false,
        'message' => 'Invalid email format.',
    ]);
}

$leadId = (string) round(microtime(true) * 1000);
$record = [
    'id' => $leadId,
    'created_at' => gmdate('c'),
    'data' => $payload,
];

$storageDir = __DIR__ . '/../storage';
$storageFile = $storageDir . '/lead_submissions.jsonl';
$stored = false;
$storageError = null;

if (!is_dir($storageDir)) {
    if (!@mkdir($storageDir, 0775, true) && !is_dir($storageDir)) {
        $storageError = 'Unable to create storage directory.';
    }
}

if ($storageError === null) {
    $line = json_encode($record, JSON_UNESCAPED_SLASHES) . PHP_EOL;
    $bytes = @file_put_contents($storageFile, $line, FILE_APPEND | LOCK_EX);
    if ($bytes === false) {
        $storageError = 'Unable to write lead submission to storage.';
    } else {
        $stored = true;
    }
}

$response = [
    'success' => true,
    'id' => $leadId,
    'stored' => $stored,
];

if ($storageError !== null) {
    $response['storage_warning'] = $storageError;
}

send_json(201, $response);
