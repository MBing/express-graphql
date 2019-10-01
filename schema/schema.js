const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
} = graphql;

const users = [
    {
        id: '23',
        firstName: 'Bill',
        age: 20
    },
    {
        id: '42',
        firstName: 'Emma',
        age: 25
    }
];

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString},
        firstName: { type: GraphQLString},
        age: { type: GraphQLInt},
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parentValue, args) {
                // Goes and grabs the real value
                return users.find(user => user.id === args.id);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
