import ThreadItem from '@/components/ThreadItem';
import { ThemeExtensionContext } from '@/context/theme-extension-context';
import { ThreadContext } from '@/context/thread-context';
import LottieView from 'lottie-react-native';
import React, { useContext } from 'react';
import { Platform, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export default function TabOneScreen() {
  const animationRef = React.useRef<LottieView>(null);
  const threads = useContext(ThreadContext);
  const { setThemeColor, themeColor } = useContext(ThemeExtensionContext);
  const handlePressIcon = () => {
    setThemeColor(themeColor === 'dark' ? 'light' : 'dark');
  };

  React.useEffect(() => {
    animationRef.current?.play();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{
        paddingTop: Platform.select({ android: 30 }),
        paddingHorizontal: 10,
      }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            tintColor={"transparent"}
            onRefresh={() => animationRef.current?.play()}
          />
        }
      >
        <Pressable onPress={handlePressIcon}>
          <LottieView
            ref={animationRef}
            source={require("../../lottie-animations/threads.json")}
            style={{
              width: 90,
              height: 90,
              alignSelf: "center",
            }}
            loop={false}
            onAnimationFinish={() => animationRef.current?.pause()}
          />
        </Pressable>

        {
          threads.map(thread => (
            <ThreadItem key={thread.id} thread={thread} />
          ))
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
