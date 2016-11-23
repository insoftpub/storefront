export function buildEmailBodyMarkup({ subject, html }) {
    return (
    `Subject: ${subject}
Accept-Language: en-US
Content-Language: en-US
Content-Type: multipart/mixed; boundary="boundary"
MIME-Version: 1.0

--boundary
Content-Type: text/html; charset="utf-8"
Content-Transfer-Encoding: base64
${new Buffer(html).toString('base64')}`
    );
}

export function buildEmailAttachmentMarkup({
    attachmentName,
    content
}) {
    return (
        `

--boundary
Content-Type: application/pdf; name="${attachmentName}"
Content-Description: ${attachmentName}
Content-Disposition: attachment; filename="${attachmentName}";
Content-Transfer-Encoding: base64
${content}
`
    );
}
