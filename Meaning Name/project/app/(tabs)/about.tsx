import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Heart, Mail, Globe } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AboutScreen() {
  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('Error opening link:', err));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar style="dark" />
      
      <LinearGradient
        colors={['rgba(138, 79, 255, 0.05)', 'rgba(0, 194, 203, 0.05)']}
        style={styles.gradientBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>About</Text>
        <Text style={styles.subtitle}>Learn more about the Name Meaning app</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.sectionText}>
          Our mission is to help people discover the hidden meanings and origins behind names. 
          Names are an important part of our identity, and understanding their significance can be 
          a fascinating journey of self-discovery.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <Text style={styles.sectionText}>
          Our app uses a comprehensive database of names from cultures around the world. 
          When you search for a name, we provide you with its meaning, origin, historical 
          significance, and cultural context.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Name of the Day</Text>
        <View style={styles.nameOfDayCard}>
          <Text style={styles.nameOfDayTitle}>Muzamil</Text>
          <Text style={styles.nameOfDayMeaning}>
            "Muzamil" is an Arabic name meaning "wrapped" or "swaddled." It has its origins in the Quran, 
            where it appears as a title referring to Prophet Muhammad, meaning "the wrapped one" or "the one wrapped in garments."
            People with this name are often associated with qualities of warmth, protection, and spiritual devotion.
          </Text>
          <Text style={styles.nameOfDayOrigin}>Origin: Arabic</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Sources</Text>
        <Text style={styles.sectionText}>
          Our name database is compiled from various reliable sources including 
          historical records, etymological dictionaries, cultural studies, and 
          linguistic research. We strive to provide accurate and comprehensive 
          information about names from diverse cultures around the world.
        </Text>
      </View>

      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Connect With Us</Text>
        
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => openLink('mailto:contact@namemeaning.app')}
        >
          <Mail size={20} color="#8A4FFF" />
          <Text style={styles.contactButtonText}>Email Us</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => openLink('https://namemeaning.app')}
        >
          <Globe size={20} color="#8A4FFF" />
          <Text style={styles.contactButtonText}>Visit Our Website</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Made with </Text>
        <Heart size={14} color="#FF6B6B" />
        <Text style={styles.footerText}> © 2025 Name Meaning App</Text>
      </View>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
  },
  nameOfDayCard: {
    backgroundColor: '#F1EBFF',
    borderRadius: 16,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#8A4FFF',
  },
  nameOfDayTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 12,
  },
  nameOfDayMeaning: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 24,
    marginBottom: 12,
  },
  nameOfDayOrigin: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  contactSection: {
    marginBottom: 30,
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  contactButtonText: {
    fontSize: 16,
    color: '#334155',
    marginLeft: 12,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#64748B',
  },
});