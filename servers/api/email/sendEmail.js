import AWS from 'aws-sdk';
import { auth, aws } from '../config';
import { isEmpty, reduce, isArray, split } from 'lodash';

const ses = new AWS.SES({
    ...auth.aws,
    region: aws.REGION
});

export function sendEmail({
    destinations = [],
    content = ''
}, cb = () => null) {
    const params = {
        Source: aws.FROM,
        Destinations: parseEmailAddresses(destinations),
        RawMessage: {
            Data: content
        }
    };

    ses.sendRawEmail(params, cb);
}

function parseEmailAddresses(destinations) {
    if (isArray(destinations)) {
        return destinations;
    } else {
        return split(destinations, ',');
    }
}
