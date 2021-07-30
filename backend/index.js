const { ApolloServer } = require("apollo-server-lambda");
const typeDefs = require('./schema');
const { readFileDetails } = require('./filestream');
const dotenv = require("dotenv");
dotenv.config();

const resolvers = {
  Query: {
    example: () => true
  },
  Mutation: {
    uploadImage: async (_, { file }) => readFileDetails(file)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: {
    maxFileSize: 10000000, // 10 MB
    maxFiles: 20,
  },
  playground: true,
  introspection: true,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  })
});


exports.handler = (event, context, callback) => {
  if(Object.keys(event.headers).includes('Content-Type')){
    event.headers['content-type'] = event.headers['Content-Type'];
  }
  const requestOrigin = event.headers.origin;
  console.log(event.headers, "req")
  const callbackFilter = function(error, output) {
    output.headers['Access-Control-Allow-Origin'] = 'http://localhost:8000';
    output.headers['Access-Control-Allow-Credentials'] = 'true';
    output.headers['Access-Control-Allow-Headers'] = '*';
    output.headers['Access-Control-Allow-Methods'] = '*';
    callback(error, output);
  };
  const handler = server.createHandler({
    cors: {
      origin: true,
      credentials: true
    }
  });
  return handler(event, context, callbackFilter);
}