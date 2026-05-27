const express = require('express');
const router = express.Router();

const hints = {
  'Arrays': {
    'Easy': "Think about iterating through the array with a single loop. Can you solve this in one pass?",
    'Medium': "Consider using a hash map to store values you've seen before. What information do you need to track?",
    'Hard': "Think about using a sliding window or two-pointer technique. How can you avoid nested loops?"
  },
  'Linked List': {
    'Easy': "Think about how to traverse the list node by node. What condition stops your loop?",
    'Medium': "Consider using two pointers — a slow and fast pointer. How far apart should they be?",
    'Hard': "Think about reversing parts of the list. What happens to the next pointers when you reverse?"
  },
  'Trees': {
    'Easy': "Think about recursion — what's the base case when you reach a null node?",
    'Medium': "Consider which traversal fits best — inorder, preorder, or postorder? What property does each give you?",
    'Hard': "Think about what information you need to pass up and down the recursion tree. Can you solve it in one DFS pass?"
  },
  'Graphs': {
    'Easy': "Think about BFS or DFS. Which one is better for finding shortest paths vs exploring all nodes?",
    'Medium': "Consider marking nodes as visited. What data structure tracks the order you visit them?",
    'Hard': "Think about whether this needs Dijkstra, Union-Find, or topological sort. What's the key property of the graph?"
  },
  'Dynamic Programming': {
    'Easy': "Think about the subproblem — what smaller version of this problem leads to the answer?",
    'Medium': "Define your dp array clearly. What does dp[i] represent? What's the recurrence relation?",
    'Hard': "Think about whether you need 1D or 2D DP. What are the two changing variables in your state?"
  },
  'Sorting': {
    'Easy': "Can you use a built-in sort with a custom comparator? What property should you sort by?",
    'Medium': "Think about whether you need O(n log n) or if a counting/bucket sort would work here.",
    'Hard': "Consider if you can avoid sorting entirely using a heap or a different data structure."
  },
  'Searching': {
    'Easy': "Think about binary search — what's your search space and what condition halves it?",
    'Medium': "Consider if the answer has a monotonic property — can you binary search on the answer itself?",
    'Hard': "Think about what invariant you maintain at each step of binary search. Is your mid calculation correct?"
  },
  'Stacks': {
    'Easy': "Think about what you push and when you pop. What's the LIFO property telling you here?",
    'Medium': "Consider a monotonic stack — do you want increasing or decreasing order from bottom to top?",
    'Hard': "Think about using two stacks or a stack with extra state stored at each level."
  },
  'Queues': {
    'Easy': "Think about BFS — a queue naturally processes nodes level by level. What's one level here?",
    'Medium': "Consider a deque (double-ended queue) — when would you want to add or remove from both ends?",
    'Hard': "Think about using a priority queue. What's the priority and how does it change the order of processing?"
  },
  'Strings': {
    'Easy': "Think about iterating character by character. Can you use a frequency map?",
    'Medium': "Consider the sliding window technique for substring problems. What's your window condition?",
    'Hard': "Think about KMP or Rabin-Karp for pattern matching. What preprocessing helps avoid repeated work?"
  },
  'Math': {
    'Easy': "Think about the mathematical pattern — try small examples and see what formula emerges.",
    'Medium': "Consider modular arithmetic if numbers get large. What properties of mod can you use?",
    'Hard': "Think about number theory — GCD, prime factorization, or combinatorics might be the key."
  },
  'Other': {
    'Easy': "Break the problem into smaller steps. What's the simplest version of this problem you can solve?",
    'Medium': "Think about what data structure best fits the operations you need. What are the time complexities?",
    'Hard': "Consider if this is a known problem pattern in disguise — interval scheduling, two sum variant, or greedy choice?"
  }
};

router.post('/hint', async (req, res) => {
  const { question, topic, difficulty } = req.body;

  const topicHints = hints[topic] || hints['Other'];
  const hint = topicHints[difficulty] || topicHints['Medium'];

  // Add question context to the hint
  const fullHint = `For your ${topic} problem: ${hint} Remember — the key to ${difficulty.toLowerCase()} problems is often ${difficulty === 'Easy' ? 'simplicity and careful iteration' : difficulty === 'Medium' ? 'choosing the right data structure' : 'optimizing your approach and reducing complexity'}.`;

  res.json({ hint: fullHint });
});

module.exports = router;