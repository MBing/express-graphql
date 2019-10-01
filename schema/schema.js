const graphql = require('graphql');
const axios = require('axios');
const BASE_URL = 'http://localhost:3000';

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
} = graphql;

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
    }
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString},
        firstName: { type: GraphQLString},
        age: { type: GraphQLInt},
        company: {
            type: CompanyType,
            resolve(parentValue) {
                return axios.get(`${BASE_URL}/companies/${parentValue.companyId}`)
                            .then(res => res.data);
            }
        }
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
            // Goes and grabs the real value
            resolve(parentValue, args) {
                return axios.get(`${BASE_URL}/users/${args.id}`)
                            .then(resp => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
