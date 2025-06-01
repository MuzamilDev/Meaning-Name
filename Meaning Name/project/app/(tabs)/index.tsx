import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Keyboard, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { searchNameMeaning } from '@/utils/nameMeaning';
import NameResult from '@/components/NameResult';
import { LinearGradient } from 'expo-linear-gradient';

export default function DiscoverScreen() {
  const [name, setName] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    if (result) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true
        })
      ]).start();
    } else {
      fadeAnim.setValue(0);
      translateY.setValue(20);
    }
  }, [result, fadeAnim, translateY]);

  const handleSearch = async () => {
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const nameData = await searchNameMeaning(name.trim());
      setResult(nameData);
    } catch (err) {
      setError('Unable to find meaning for this name');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar style="dark" />
      
      <LinearGradient
        colors={['rgba(138, 79, 255, 0.05)', 'rgba(0, 194, 203, 0.05)']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>Name Meaning</Text>
        <Text style={styles.subtitle}>Discover the origin and meaning behind names</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a name..."
          value={name}
          onChangeText={setName}
          placeholderTextColor="#94A3B8"
          autoCapitalize="words"
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={handleSearch}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Discover</Text>
        </TouchableOpacity>
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Finding meaning...</Text>
        </View>
      ) : null}

      {result && !isLoading ? (
        <Animated.View 
          style={[
            styles.resultContainer, 
            { 
              opacity: fadeAnim,
              transform: [{ translateY: translateY }] 
            }
          ]}
        >
          <NameResult nameData={result} />
        </Animated.View>
      ) : null}

      {!isKeyboardVisible && !result && (
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Did you know?</Text>
          <Text style={styles.tipsText}>Names often carry cultural significance and can influence how people perceive themselves and others.</Text>
          <Text style={styles.tipsText}>Try searching for your name or names of your loved ones to discover their meanings!</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
    minHeight: '100%',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    lineHeight: 24,
  },
  searchContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#8A4FFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#EF4444',
    marginTop: 8,
    fontSize: 14,
  },
  loadingContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  loadingText: {
    color: '#64748B',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 30,
  },
  tipsContainer: {
    marginTop: 40,
    padding: 20,
    backgroundColor: 'rgba(138, 79, 255, 0.05)',
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#8A4FFF',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  tipsText: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  }
});