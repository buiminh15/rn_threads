import ReplyItem from "@/components/ReplyItem";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import ThreadItem from "../components/ThreadItem";
import { Reply, Thread } from "../types/threads";
import { createRandomFollower } from "../utils/generate-dommy-data";
import { Text } from "@/components/Themed";

export default function ThreadDetails(): JSX.Element {
  const route = useRoute();
  const [thread, setThread] = useState(route.params as Thread);
  const [replyContent, setReplyContent] = useState("");
  const currentTheme = useColorScheme();

  const styleBgTextInput = currentTheme === 'light' ? { backgroundColor: '#00000010' } : { backgroundColor: 'white' };

  function handleReply() {
    const newReply: Reply = {
      author: createRandomFollower(),
      content: replyContent,
      createdAt: new Date().toISOString(),
      id: Math.random().toString(),
      likes: 0,
    };
    setThread((prevState) => ({
      ...prevState,
      replies: [newReply, ...prevState.replies!],
      repliesCount: prevState.repliesCount + 1,
    }));
    setReplyContent("");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <ThreadItem thread={thread} />

        <View style={{ gap: 15 }}>
          {thread.replies?.map((reply) => (
            <ReplyItem key={reply.id} {...reply} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.replyContainer}>
        {/* <Image
          style={styles.image}
          placeholder={blurhash}
          contentFit="cover"
          transition={500}
        /> */}
        <TextInput
          placeholder="Add reply"
          value={replyContent}
          onChangeText={setReplyContent}
          style={[styles.input, styleBgTextInput]}
        />
        <Pressable style={styles.button} disabled={!replyContent} onPress={handleReply} >
          <Text>Reply</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    backgroundColor: "white",
    marginLeft: 10,
    padding: 10,
    height: 50,
    marginBottom: 30,
    borderRadius: 10,
  },
  replyContainer: {
    flexDirection: "row",
    padding: 15,
    gap: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  button: {
    height: 50,
    backgroundColor: '#f194ff',
    padding: 4,
    paddingHorizontal: 12,
    justifyContent: 'center',
    borderRadius: 8
  }
});
