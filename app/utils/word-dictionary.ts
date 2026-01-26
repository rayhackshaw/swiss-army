export const WORD_DICTIONARY = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "it",
  "for", "not", "on", "with", "he", "as", "you", "do", "at", "this",
  "but", "his", "by", "from", "they", "we", "say", "her", "she", "or",
  "an", "will", "my", "one", "all", "would", "there", "their", "what", "so",
  "up", "out", "if", "about", "who", "get", "which", "go", "me", "when",
  "make", "can", "like", "time", "no", "just", "him", "know", "take", "people",
  "into", "year", "your", "good", "some", "could", "them", "see", "other", "than",
  "then", "now", "look", "only", "come", "its", "over", "think", "also", "back",
  "after", "use", "two", "how", "our", "work", "first", "well", "way", "even",
  "new", "want", "because", "any", "these", "give", "day", "most", "us", "is",
  "was", "are", "been", "has", "had", "were", "said", "did", "having", "may",
  "should", "could", "own", "seem", "such", "between", "through", "both", "those", "same",
  "under", "while", "where", "after", "why", "much", "before", "must", "right", "mean",
  "old", "any", "same", "tell", "does", "set", "three", "want", "air", "well",
  "also", "play", "small", "end", "put", "home", "read", "hand", "port", "large",
  "spell", "add", "even", "land", "here", "must", "big", "high", "such", "follow",
  "act", "why", "ask", "men", "change", "went", "light", "kind", "off", "need",
  "house", "picture", "try", "us", "again", "animal", "point", "mother", "world", "near",
  "build", "self", "earth", "father", "head", "stand", "own", "page", "should", "country",
  "found", "answer", "school", "grow", "study", "still", "learn", "plant", "cover", "food",
  "sun", "four", "between", "state", "keep", "eye", "never", "last", "let", "thought",
  "city", "tree", "cross", "farm", "hard", "start", "might", "story", "saw", "far",
  "sea", "draw", "left", "late", "run", "while", "press", "close", "night", "real",
  "life", "few", "north", "open", "seem", "together", "next", "white", "children", "begin",
  "got", "walk", "example", "ease", "paper", "group", "always", "music", "those", "both",
  "mark", "often", "letter", "until", "mile", "river", "car", "feet", "care", "second",
  "book", "carry", "took", "science", "eat", "room", "friend", "began", "idea", "fish",
  "mountain", "stop", "once", "base", "hear", "horse", "cut", "sure", "watch", "colour",
  "face", "wood", "main", "enough", "plain", "girl", "usual", "young", "ready", "above",
  "ever", "red", "list", "though", "feel", "talk", "bird", "soon", "body", "dog",
  "family", "direct", "pose", "leave", "song", "measure", "door", "product", "black", "short",
  "numeral", "class", "wind", "question", "happen", "complete", "ship", "area", "half", "rock",
  "order", "fire", "south", "problem", "piece", "told", "knew", "pass", "since", "top",
  "whole", "king", "space", "heard", "best", "hour", "better", "true", "during", "hundred",
  "five", "remember", "step", "early", "hold", "west", "ground", "interest", "reach", "fast",
  "verb", "sing", "listen", "six", "table", "travel", "less", "morning", "ten", "simple",
  "several", "vowel", "towards", "war", "lay", "against", "pattern", "slow", "centre", "love",
  "person", "money", "serve", "appear", "road", "map", "rain", "rule", "govern", "pull",
  "cold", "notice", "voice", "unit", "power", "town", "fine", "certain", "fly", "fall",
  "lead", "cry", "dark", "machine", "note", "wait", "plan", "figure", "star", "box",
  "noun", "field", "rest", "correct", "able", "pound", "done", "beauty", "drive", "stood",
  "contain", "front", "teach", "week", "final", "gave", "green", "quick", "develop", "ocean",
  "warm", "free", "minute", "strong", "special", "mind", "behind", "clear", "tail", "produce",
  "fact", "street", "inch", "multiply", "nothing", "course", "stay", "wheel", "full", "force",
  "blue", "object", "decide", "surface", "deep", "moon", "island", "foot", "system", "busy",
  "test", "record", "boat", "common", "gold", "possible", "plane", "stead", "dry", "wonder",
  "laugh", "thousand", "ago", "ran", "check", "game", "shape", "equate", "hot", "miss",
];

export const generateRandomWords = (count: number): string[] => {
  const words: string[] = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * WORD_DICTIONARY.length);
    words.push(WORD_DICTIONARY[randomIndex]);
  }

  return words;
};
