import nltk
from nltk.corpus import wordnet

# Download the WordNet corpus (if not already downloaded)
nltk.download('wordnet')

def find_synonyms(word):
    synonyms = []

    # Get the synsets for the word
    synsets = wordnet.synsets(word)

    # Iterate over each synset
    for synset in synsets:
        # Get the lemmas (synonyms) for the synset
        for lemma in synset.lemmas():
            # Add the lemma name to the list of synonyms
            synonyms.append(lemma.name())

    return synonyms

# Test the function
word = 'happy'
synonyms = find_synonyms(word)
print(synonyms)
