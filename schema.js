const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

// Fake Database
const customers = [
  { id: "1", name: "John Doe", emai: "djoe@gmail.com", age: 35 },
  { id: "2", name: "Jane Doe", emai: "jane@gmail.com", age: 30 },
  { id: "3", name: "Joe Doe", emai: "joe@gmail.com", age: 39 },
];
// Customer Types
const CustomerType = new GraphQLObjectType({
  name: "Customer",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        for (let i = 0; i < customers.length; i++) {
          if (customers[i].id === args.id) {
            return customers[i];
          }
        }
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
});
