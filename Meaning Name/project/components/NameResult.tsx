import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BookMarked, BookOpen, Volume2 } from 'lucide-react-native';

export default function NameResult({ nameData }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showPronunciation, setShowPronunciation] = useState(false);
  
  const toggleFavorite = async () => {
    try {
      // Toggle favorite state
      setIsFavorite(!isFavorite);
      
      // Get current favorites
      const storedFavorites = await AsyncStorage.getItem('favorites');
      let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
      
      if (!isFavorite) {
        // Add to favorites if not already a favorite
        const newFavorite = {
          name: nameData.name,
          meaning: nameData.meaning,
          origin: nameData.origin
        };
        
        // Check if the name is already in favorites
        const existingIndex = favorites.findIndex(fav => fav.name === nameData.name);
        if (existingIndex === -1) {
          favorites.push(newFavorite);
        }
      } else {
        // Remove from favorites
        favorites = favorites.filter(fav => fav.name !== nameData.name);
      }
      
      // Save updated favorites
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };
  
  const togglePronunciation = () => {
    setShowPronunciation(!showPronunciation);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{nameData.name}</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <BookMarked 
            size={24} 
            color={isFavorite ? '#8A4FFF' : '#94A3B8'} 
            fill={isFavorite ? '#8A4FFF' : 'transparent'}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.originContainer}>
        <BookOpen size={16} color="#8A4FFF" />
        <Text style={styles.origin}>Origin: {nameData.origin}</Text>
      </View>
      
      <View style={styles.pronunciationContainer}>
        <TouchableOpacity 
          style={styles.pronunciationButton} 
          onPress={togglePronunciation}
        >
          <Volume2 size={16} color="#8A4FFF" />
          <Text style={styles.pronunciationText}>
            Pronunciation
          </Text>
        </TouchableOpacity>
        
        {showPronunciation && (
          <View style={styles.pronunciationGuide}>
            <Text style={styles.pronunciationGuideText}>
              {nameData.pronunciation || `${nameData.name} is pronounced as "${nameData.phoneticPronunciation}"`}
            </Text>
          </View>
        )}
      </View>
      
      <Text style={styles.sectionTitle}>Meaning</Text>
      <Text style={styles.meaning}>{nameData.meaning}</Text>
      
      {nameData.history && (
        <>
          <Text style={styles.sectionTitle}>History & Background</Text>
          <Text style={styles.history}>{nameData.history}</Text>
        </>
      )}
      
      {nameData.variants && nameData.variants.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Variants</Text>
          <Text style={styles.variants}>{nameData.variants.join(', ')}</Text>
        </>
      )}
      
      {nameData.famousPeople && nameData.famousPeople.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Notable People</Text>
          <View style={styles.famousPeopleList}>
            {nameData.famousPeople.map((person, index) => (
              <Text key={index} style={styles.famousPerson}>• {person}</Text>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
  },
  favoriteButton: {
    padding: 8,
  },
  originContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  origin: {
    fontSize: 16,
    color: '#64748B',
    marginLeft: 8,
    fontWeight: '500',
  },
  pronunciationContainer: {
    marginBottom: 24,
  },
  pronunciationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(138, 79, 255, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  pronunciationText: {
    color: '#8A4FFF',
    marginLeft: 8,
    fontWeight: '500',
  },
  pronunciationGuide: {
    backgroundColor: '#F8FAFC',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  pronunciationGuideText: {
    color: '#334155',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
    marginTop: 16,
  },
  meaning: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },
  history: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
  },
  variants: {
    fontSize: 16,
    color: '#334155',
  },
  famousPeopleList: {
    marginTop: 8,
  },
  famousPerson: {
    fontSize: 16,
    color: '#334155',
    marginBottom: 4,
    lineHeight: 24,
  },
});