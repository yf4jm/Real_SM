# #reduce is used for looping through an array reduce(function(),)
# #lambda takes x,y whth x the first element and y the next element (conclusion)
# #check this https://www.geeksforgeeks.org/python-stemming-words-with-nltk/
#spello is slow
from autocorrect import Speller
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
import timeit
import random

# Initialize the spell checker and stemmer
spell = Speller(lang='en', fast=True)
ps = PorterStemmer()

def stem(word):
    return ps.stem(word)

# Generate a large list of posts with random keywords and scores
def generate_random_posts(num_posts, num_keywords):
    keywords = [f"keyword{i}" for i in range(num_keywords)]
    posts = []
    for _ in range(num_posts):
        post = {stem(random.choice(keywords)): random.randint(1, 1000) for _ in range(random.randint(1, 5))}
        posts.append([post])  # Wrap in a list to match the original format
    return posts

# Generate 100 posts with up to 20 unique keywords
posts = generate_random_posts(num_posts=100, num_keywords=20)
# posts =[]
def algo(q):
    # Step 1: Spell check and tokenize the input
    corrected_sentence = spell(q)
    keywords = word_tokenize(corrected_sentence)
    
    # Step 2: Stem the keywords from the user's query
    stemmed_keywords = [stem(k) for k in keywords]
    print("Stemmed Keywords:", stemmed_keywords)
    
    # Step 3: Calculate scores for each post
    scored_posts = []

    for post in posts:
        score = 0
        matched_keywords = 0
        for k in stemmed_keywords:
            if k in post[0]:  # Check if the stemmed keyword exists in the first dictionary of the post
                score += post[0][k]  # Add the score of the matched keyword
                matched_keywords += 1  # Count matched keywords
        
        if matched_keywords > 0:  # Only consider posts with matched keywords
            scored_posts.append((post[0], matched_keywords, score))  # (post, number of matches, total score)

    # Step 4: Sort the posts
    # First by number of matched keywords (descending), then by total score (descending)
    scored_posts.sort(key=lambda x: (-x[1], -x[2]))

    # Step 5: Prepare the final output
    sorted_results = [{k: v for k, v in post.items()} for post, _, _ in scored_posts]

    # Print the number of results
    print(f"Total results: {len(sorted_results)} out of {len(posts)} posts")
    print("Sorted Results:", sorted_results)

# Measure the execution time for the algo function with a sample query
def timed_algo(q):
    algo(q)


q = "keyword1 keyword3"
execution_time = timeit.timeit(lambda: timed_algo(q), number=1)
print(f"Execution time for '{q}': {execution_time:.6f} seconds")

q = "keyword2"
execution_time = timeit.timeit(lambda: timed_algo(q), number=1)
print(f"Execution time for '{q}': {execution_time:.6f} seconds")
