// This is a simplified name database for the demo
// In a real app, this would be fetched from an API or a more comprehensive database
const nameDatabase = {
  'muzamil': {
    name: 'Muzamil',
    meaning: 'Muzamil is an Arabic name meaning "wrapped" or "swaddled in cloth". It has religious significance in Islam, as it refers to someone who is covered or wrapped in garments.',
    origin: 'Arabic',
    phoneticPronunciation: 'moo-zam-mil',
    history: 'The name Muzamil appears in the Quran, where it is used as a title for Prophet Muhammad in Surah Al-Muzzammil, meaning "The Wrapped One" or "The Enshrouded One". The name represents spiritual protection and guidance.',
    variants: ['Muzzammil', 'Muzammil', 'Muzzamil'],
    famousPeople: [
      'Muzzamil Desai, Indian film director',
      'Muzammil Ibrahim, Indian model and actor',
      'Muzammil Siddiqui, American Islamic scholar'
    ]
  },
  'john': {
    name: 'John',
    meaning: 'John is a name that means "God is gracious" or "Yahweh has been gracious".',
    origin: 'Hebrew',
    phoneticPronunciation: 'jon',
    history: 'The name John originated from the Hebrew name Yochanan, which was Latinized to Johannes and later shortened to John in English. It has been one of the most popular names throughout Christian history, largely due to its biblical significance.',
    variants: ['Jon', 'Jonathan', 'Johannes', 'Juan', 'Ivan', 'Sean', 'Evan'],
    famousPeople: [
      'John F. Kennedy, 35th U.S. President',
      'John Lennon, English musician and member of The Beatles',
      'John Legend, American singer and songwriter'
    ]
  },
  'sarah': {
    name: 'Sarah',
    meaning: 'Sarah means "princess" or "noblewoman".',
    origin: 'Hebrew',
    phoneticPronunciation: 'sair-uh',
    history: 'In the Bible, Sarah was the wife of Abraham and mother of Isaac. The name has been popular across cultures and throughout history for its elegant meaning and biblical significance.',
    variants: ['Sara', 'Sarai', 'Sarina', 'Sariah'],
    famousPeople: [
      'Sarah Jessica Parker, American actress',
      'Sarah Michelle Gellar, American actress',
      'Sarah Paulson, American actress'
    ]
  },
  'maria': {
    name: 'Maria',
    meaning: 'Maria means "bitter" or "beloved".',
    origin: 'Latin, derived from Hebrew',
    phoneticPronunciation: 'muh-ree-uh',
    history: 'Maria is the Latin form of Mary, which comes from the Hebrew name Miriam. It has been widely used throughout Christian countries due to its association with the Virgin Mary in the Bible.',
    variants: ['Mary', 'Miriam', 'Marie', 'Maryam', 'Mariam'],
    famousPeople: [
      'Maria Sharapova, Russian tennis player',
      'Maria Callas, Greek-American opera singer',
      'Maria Montessori, Italian physician and educator'
    ]
  },
  'david': {
    name: 'David',
    meaning: 'David means "beloved" or "friend".',
    origin: 'Hebrew',
    phoneticPronunciation: 'day-vid',
    history: 'In the Bible, David was the second king of Israel who, as a young shepherd, defeated the giant Goliath. The name has been consistently popular throughout Western history.',
    variants: ['Dave', 'Davey', 'Davi', 'Davide', 'Dawid'],
    famousPeople: [
      'David Beckham, English footballer',
      'David Bowie, English musician',
      'David Copperfield, American magician'
    ]
  },
  'sophia': {
    name: 'Sophia',
    meaning: 'Sophia means "wisdom".',
    origin: 'Greek',
    phoneticPronunciation: 'so-fee-uh',
    history: 'The name Sophia comes from the Greek word for wisdom. In Greek Orthodox and Catholic traditions, Saint Sophia was the mother of three daughters named Faith, Hope, and Love.',
    variants: ['Sofia', 'Sophie', 'Sonya', 'Sonia'],
    famousPeople: [
      'Sophia Loren, Italian actress',
      'Sofia Vergara, Colombian-American actress',
      'Sophie Turner, English actress'
    ]
  }
};

// Function to search for name meaning
export const searchNameMeaning = (name: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      const lowerName = name.toLowerCase();
      
      // Check if name exists in database
      if (nameDatabase[lowerName]) {
        resolve(nameDatabase[lowerName]);
      } else {
        // Generate a generic response for names not in the database
        const genericResponse = generateGenericResponse(name);
        resolve(genericResponse);
      }
    }, 1000);
  });
};

// Generate a generic response for names not in the database
const generateGenericResponse = (name: string) => {
  // List of possible origins for random assignment
  const possibleOrigins = ['English', 'Hebrew', 'Greek', 'Latin', 'Germanic', 'Celtic', 'Arabic', 'Sanskrit'];
  const randomOrigin = possibleOrigins[Math.floor(Math.random() * possibleOrigins.length)];
  
  // Generic meanings based on first letter (just for demonstration)
  const firstLetter = name.charAt(0).toLowerCase();
  let meaning = '';
  
  // Generate a meaning based on first letter (simplified for demo)
  switch (true) {
    case 'aeiou'.includes(firstLetter):
      meaning = `${name} is a name that likely means "strong" or "leader". Names starting with vowels often have roots in ancient languages and carry positive connotations.`;
      break;
    case 'bcdfg'.includes(firstLetter):
      meaning = `${name} possibly means "wise" or "intelligent". This name may have origins in multiple cultures, each with their own interpretation.`;
      break;
    case 'hjklm'.includes(firstLetter):
      meaning = `${name} likely means "brave" or "courageous". This name has been used across different cultures throughout history.`;
      break;
    default:
      meaning = `${name} may mean "blessed" or "fortunate". While not as common as some other names, it has a beautiful meaning and cultural significance.`;
  }
  
  return {
    name: name,
    meaning: meaning,
    origin: `Possibly ${randomOrigin}`,
    phoneticPronunciation: generatePhoneticPronunciation(name),
    history: `${name} has been used in various cultures throughout history. While not as documented as some more common names, it carries unique cultural significance and personal meaning to those who bear it.`,
    variants: [],
    famousPeople: []
  };
};

// Generate a simple phonetic pronunciation
const generatePhoneticPronunciation = (name: string) => {
  // This is a very simplified phonetic generator
  let pronunciation = '';
  const syllables = splitIntoSyllables(name);
  
  return syllables.join('-');
};

// Split name into syllables (very simplified)
const splitIntoSyllables = (name: string) => {
  const lowerName = name.toLowerCase();
  const vowels = 'aeiouy';
  let syllables = [];
  let currentSyllable = '';
  
  for (let i = 0; i < lowerName.length; i++) {
    currentSyllable += lowerName[i];
    
    // If this is a vowel and next char is a consonant or end of word
    if (
      vowels.includes(lowerName[i]) && 
      (i === lowerName.length - 1 || !vowels.includes(lowerName[i + 1]))
    ) {
      syllables.push(currentSyllable);
      currentSyllable = '';
    }
  }
  
  // Add any remaining letters
  if (currentSyllable) {
    syllables.push(currentSyllable);
  }
  
  return syllables.length ? syllables : [lowerName];
};