import expressGraphQL from 'express-graphql';
import schema from '../../../src/data/schema';

export default expressGraphQL(req => ({
    schema,
    graphiql: true,
    rootValue: { request: req },
    pretty: process.env.NODE_ENV !== 'production'
}));
