import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  RefreshControl,
  KeyboardAvoidingView
} from "react-native";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo-hooks";
import withSuspense from "./withSuspense";

const GET_MESSAGE = gql`
  query messages {
    messages {
      id
      text
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($text: String!) {
    sendMessage(text: $text) {
      id
      text
    }
  }
`;

function Chat() {
  const [message, setMessage] = useState("");
  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      text: message
    }
  });
  const { data, error, refetch } = useQuery(GET_MESSAGE, { suspend: true });
  const [refreshing, setRefreshing] = useState(false);
  const refresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  const onSubmit = async () => {
    if (message === "") {
      return;
    }
    try {
      await sendMessageMutation();
      setMessage("")
      refetch();
    } catch (e) {
      console.log(e);
    }
  };
  const onChangeText = text => setMessage(text);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} enabled behavior="padding">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        contentContainerStyle={{
          paddingVertical: 50,
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        {data.messages.map(m => (
          <View key={m.id} style={{ marginBottom: 10 }}>
            <Text>{m.text}</Text>
          </View>
        ))}
        <TextInput
          placeholder="Type a message"
          style={{
            marginTop: 50,
            width: "90%",
            borderRadius: 10,
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor: "#f2f2f2"
          }}
          returnKeyType="send"
          value={message}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default withSuspense(Chat);
