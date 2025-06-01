import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFavorite = async (name) => {
    try {
      const updatedFavorites = favorites.filter(item => item.name !== name);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const confirmRemove = (name) => {
    Alert.alert(
      "Remove Favorite",
      `Are you sure you want to remove "${name}" from your favorites?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Remove", style: "destructive", onPress: () => removeFavorite(name) }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.favoriteItem}
      activeOpacity={0.7}
    >
      <View style={styles.favoriteContent}>
        <Text style={styles.favoriteName}>{item.name}</Text>
        <Text style={styles.favoriteMeaning}>{item.meaning}</Text>
        <Text style={styles.favoriteOrigin}>Origin: {item.origin}</Text>
      </View>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => confirmRemove(item.name)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <X size={18} color="#94A3B8" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <LinearGradient
        colors={['rgba(138, 79, 255, 0.05)', 'rgba(0, 194, 203, 0.05)']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>Your Favorites</Text>
        <Text style={styles.subtitle}>Names you've saved for future reference</Text>
      </View>

      {isLoading ? (
        <View style={styles.centeredContent}>
          <Text style={styles.loadingText}>Loading favorites...</Text>
        </View>
      ) : favorites.length === 0 ? (
        <View style={styles.centeredContent}>
          <Text style={styles.emptyText}>You haven't saved any favorites yet.</Text>
          <Text style={styles.emptySubtext}>When you find a name you like, tap the bookmark icon to save it here.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.name}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    marginBottom: 30,
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
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    fontSize: 16,
    color: '#64748B',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
  listContent: {
    paddingBottom: 20,
  },
  favoriteItem: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  favoriteContent: {
    flex: 1,
  },
  favoriteName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  favoriteMeaning: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 8,
    lineHeight: 22,
  },
  favoriteOrigin: {
    fontSize: 12,
    color: '#64748B',
  },
  removeButton: {
    padding: 4,
  },
});