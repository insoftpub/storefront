import service from '../../../src/services/api/index';
import { isEmpty } from 'lodash';

export function getSchemaProfile(profile, domain) {
    return service({
        path: '/accounts',
        params: {
            email: profile.email
        }
    })
        .then(data => {
            if (!isEmpty(data.results)) {
                return data.results[0];
            } else {
                return service({
                    path: '/accounts',
                    method: 'POST',
                    params: {
                        [`${domain}_id`]: profile.id,
                        email: profile.email
                    }
                });
            }
        });
}
