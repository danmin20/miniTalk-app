import React, { Suspense } from "react";
import { ApolloProvider } from "react-apollo-hooks";
import client from "./apollo";
import Chat from "./Chat";
import { View, ActivityIndicator } from "react-native";

export default function App() {
  return (
    <ApolloProvider client={client}>
        <Chat />
    </ApolloProvider>
  );
}
