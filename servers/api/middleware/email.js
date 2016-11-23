import templates from '../email';
import { sendEmail } from '../email/sendEmail';
import { buildEmailBodyMarkup, buildEmailAttachmentMarkup } from '../../../src/utils/email';
import { isEmpty, reduce, isArray, split } from 'lodash';

function email(req, res) {
    const
        { type, email, data, attachments = [] } = req.body,
        { template, subject } = templates[type];
    
    sendEmail({
        destinations: email,
        content: getRawEmailContent(subject, template(data), attachments)
    },(err, data) => err ? res.send(err) : res.send(data))
}

function getRawEmailContent(subject, html, attachments) {
    const body = buildEmailBodyMarkup({ subject, html });

    if (isEmpty(attachments)) {
        return body;
    } else {
        return reduce(attachments, (memo, { name, content }) => {
            memo += buildEmailAttachmentMarkup({
                attachmentName: name,
                content
            });

            return memo;
        }, body) + `

--boundary--`;
    }
}

export default email;
