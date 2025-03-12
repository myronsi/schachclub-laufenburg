<?php
/*
##############################################################################
# PLEASE DO NOT REMOVE THIS HEADER!!!
#
# COPYRIGHT NOTICE
#
# FormMail.php v8.1   updated for React integration myron 05.02.24
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
##############################################################################
*/

// Enable CORS and set headers
header("Access-Control-Allow-Origin: https://sc-laufenburg.de");
// Wenn nicht geht dann https://sc-laufenburg.de zu header("Access-Control-Allow-Origin: *"); aendern
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Set timezone
date_default_timezone_set("Europe/Berlin");

// Error reporting (disable in production)
// ini_set('display_errors', 1);
// error_reporting(E_ALL);

$response = [
    'status' => 'error',
    'message' => 'Unknown error'
];

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    // Validate required fields
    $required = ['email', 'name', 'message', 'subject'];
    foreach ($required as $field) {
        if (empty($_POST[$field])) {
            throw new Exception("Field $field is required");
        }
    }

    // Sanitize input
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
    $subject = filter_var($_POST['subject'], FILTER_SANITIZE_STRING);
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email format');
    }

    // Recipient (use test email for development)
    $to = 'info@sc-laufenburg.de';
    // $to = 'test@example.com'; // For testing

    // Email headers
    $headers = [
        'From' => $email,
        'Reply-To' => $email,
        'X-Mailer' => 'PHP/' . phpversion(),
        'Content-Type' => 'text/plain; charset=UTF-8'
    ];

    // Format headers
    $headersStr = implode("\r\n", array_map(
        fn($k, $v) => "$k: $v",
        array_keys($headers),
        $headers
    ));

    // Send email
    $mailSent = mail($to, $subject, $message, $headersStr);

    if ($mailSent) {
        $response['status'] = 'success';
        $response['message'] = 'Message sent successfully';
        http_response_code(200);
    } else {
        throw new Exception('Failed to send email');
    }
} catch (Exception $e) {
    http_response_code(400);
    $response['message'] = $e->getMessage();
} finally {
    echo json_encode($response);
    exit;
}
?>