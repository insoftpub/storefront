import {
    GraphQLSchema as Schema,
    GraphQLObjectType as ObjectType
} from 'graphql';
import content from './queries/content';

const schema = new Schema({
    query: new ObjectType({
        name: 'Query',
        fields: {
            content
        }
    })
});

export default schema;
