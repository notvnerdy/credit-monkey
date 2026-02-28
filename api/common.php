<?php

declare(strict_types=1);

function send_json(int $statusCode, array $payload): void
{
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function apply_cors_headers(): void
{
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
}

function handle_options_preflight(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        apply_cors_headers();
        http_response_code(204);
        exit;
    }
}

function read_json_payload(): array
{
    $raw = file_get_contents('php://input');
    if ($raw === false || trim($raw) === '') {
        return [];
    }

    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

/**
 * @return array{status:int,body:string,error:?string}
 */
function send_http_request(string $url, string $method = 'POST', ?string $jsonBody = null): array
{
    $normalizedMethod = strtoupper(trim($method));
    if ($normalizedMethod !== 'GET' && $normalizedMethod !== 'POST') {
        $normalizedMethod = 'POST';
    }

    if (function_exists('curl_init')) {
        $curl = curl_init($url);
        if ($curl === false) {
            return ['status' => 0, 'body' => '', 'error' => 'Unable to initialize cURL'];
        }

        $headers = ['Accept: */*'];
        if ($jsonBody !== null) {
            $headers[] = 'Content-Type: application/json';
        }

        curl_setopt_array($curl, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_TIMEOUT => 12,
            CURLOPT_HTTPHEADER => $headers,
        ]);

        if ($normalizedMethod === 'GET') {
            curl_setopt($curl, CURLOPT_HTTPGET, true);
        } else {
            curl_setopt($curl, CURLOPT_POST, true);
        }

        if ($normalizedMethod === 'POST' && $jsonBody !== null) {
            curl_setopt($curl, CURLOPT_POSTFIELDS, $jsonBody);
        }

        $body = curl_exec($curl);
        $error = curl_error($curl);
        $status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);

        return [
            'status' => $status,
            'body' => is_string($body) ? $body : '',
            'error' => $error !== '' ? $error : null,
        ];
    }

    $headers = ["Accept: */*"];
    if ($jsonBody !== null) {
        $headers[] = 'Content-Type: application/json';
    }

    $context = stream_context_create([
        'http' => [
            'method' => $normalizedMethod,
            'header' => implode("\r\n", $headers),
            'content' => $normalizedMethod === 'POST' ? ($jsonBody ?? '') : '',
            'timeout' => 12,
            'max_redirects' => 0,
            'ignore_errors' => true,
        ],
    ]);

    $body = @file_get_contents($url, false, $context);
    $responseHeaders = function_exists('http_get_last_response_headers')
        ? http_get_last_response_headers()
        : [];

    $status = 0;
    if (is_array($responseHeaders) && isset($responseHeaders[0]) && preg_match('/\s(\d{3})\s/', (string) $responseHeaders[0], $matches) === 1) {
        $status = (int) $matches[1];
    }

    return [
        'status' => $status,
        'body' => is_string($body) ? $body : '',
        'error' => $body === false ? 'HTTP stream request failed' : null,
    ];
}
