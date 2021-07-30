const typeDefs = `
  type ImageStats {
    filename: String!
    mimetype: String!
    location: String!
  }
  type Query {
    example: Boolean
  }
  type Mutation {
    uploadImage(file: Upload!): ImageStats!
  }
`;

module.exports = typeDefs;