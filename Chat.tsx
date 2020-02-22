import React from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import gql from "graphql-tag";

const CHAT = gql`
  query messages {
    messages {
      id
      text
    }
  }
`;

export default function Chat() {
  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 50,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      <Text>Hello</Text>
    </ScrollView>
  );
}
