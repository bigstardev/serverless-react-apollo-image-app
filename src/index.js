
import React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { createUploadLink } from "apollo-upload-client";
import App from "./components/App";

const link = createUploadLink({ 
  uri: process.env.REACT_APP_BACKEND_URL || 'https://6blchesku1.execute-api.eu-central-1.amazonaws.com/dev/upload' 
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);