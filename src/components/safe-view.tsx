import type { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export function SafeView({
  children,
}: PropsWithChildren) {

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.view}>
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff'
  },
  view: {
    flex: 1,
  }
});
