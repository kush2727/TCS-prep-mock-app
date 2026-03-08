// ===== APTITUDE QUESTIONS DATA =====
const aptitudeQuestions = [
  {
    id: 1, category: "Numerical Ability",
    question: "A train travels 360 km in 4 hours. What is its speed in m/s?",
    options: ["25 m/s", "24 m/s", "20 m/s", "30 m/s"], answer: "A",
    explanation: "Speed = 360 km / 4 h = 90 km/h. To convert km/h to m/s, multiply by 5/18. So 90 × 5/18 = 25 m/s."
  },
  {
    id: 2, category: "Verbal Ability",
    question: "Choose the word most nearly OPPOSITE in meaning to 'CANDID':\n\nA) Frank  B) Evasive  C) Honest  D) Clear",
    options: ["Frank", "Evasive", "Honest", "Clear"], answer: "B",
    explanation: "CANDID means honest and direct. The opposite is EVASIVE — avoiding giving direct answers."
  },
  {
    id: 3, category: "Reasoning Ability",
    question: "If COMPUTER is coded as RFKNSOVJ, how would MOUSE be coded?\n(Each letter is shifted by a fixed number)",
    options: ["LRPZX", "NRXZB", "LLPVX", "NNXVB"], answer: "C",
    explanation: "C→R is shift+15. Apply +15 to each letter of MOUSE: M→L, O→L, U→P, S→V, E→X = LLPVX."
  },
  {
    id: 4, category: "Advanced Quantitative Ability",
    question: "The compound interest on ₹8,000 for 2 years at 10% per annum (compounded annually) is:",
    options: ["₹1,600", "₹1,640", "₹1,680", "₹1,720"], answer: "C",
    explanation: "A = 8000 × (1.1)² = 8000 × 1.21 = ₹9,680. CI = 9680 – 8000 = ₹1,680."
  },
  {
    id: 5, category: "Advanced Reasoning Ability",
    question: "Statements: All pens are books. Some books are copies.\nConclusions:\nI. Some pens are copies.\nII. Some copies are pens.\nWhich conclusion(s) follow?",
    options: ["Only I", "Only II", "Both I and II", "Neither I nor II"], answer: "D",
    explanation: "All pens ⊆ books. Some books ∩ copies ≠ ∅. But the copies may not be pens. Neither I nor II must follow."
  },
  {
    id: 6, category: "Numerical Ability",
    question: "What is 15% of 3/5 of 500?",
    options: ["40", "45", "50", "55"], answer: "B",
    explanation: "Step 1: 3/5 of 500 = 300. Step 2: 15% of 300 = 45."
  },
  {
    id: 7, category: "Verbal Ability",
    question: "Fill in the blank:\n'She was _____ by the complexity of the problem and decided to take a different approach.'",
    options: ["invigorated", "daunted", "elated", "amused"], answer: "B",
    explanation: "'Daunted' means to feel intimidated. She felt overwhelmed and switched approach — daunted fits perfectly."
  },
  {
    id: 8, category: "Reasoning Ability",
    question: "A is the brother of B. B is the sister of C. C is the son of D. How is A related to D?",
    options: ["Son", "Daughter", "Nephew", "Cannot be determined"], answer: "A",
    explanation: "C is D's son. B is C's sister → B is D's daughter. A is B's brother → A is D's son."
  },
  {
    id: 9, category: "Advanced Quantitative Ability",
    question: "Two pipes A and B can fill a tank in 12 and 18 hours respectively. If both opened simultaneously, how long will it take to fill the tank?",
    options: ["6 hours", "7 hours", "7.2 hours", "8 hours"], answer: "C",
    explanation: "1/12 + 1/18 = 5/36 per hour. Time = 36/5 = 7.2 hours."
  },
  {
    id: 10, category: "Advanced Reasoning Ability",
    question: "In a certain code: ORANGE = 614152 and GROAN = 21142. What is the code for ANGER?",
    options: ["14251", "12514", "51241", "42115"], answer: "A",
    explanation: "Mapping: A=4, N=1, G=5, E=2, R=1. ANGER = 4,1,5,2,1 → '14251'."
  },
  {
    id: 11, category: "Numerical Ability",
    question: "The ratio of ages of Ravi and Sita is 3:4. After 5 years, the ratio will be 4:5. What is Ravi's current age?",
    options: ["12", "15", "18", "20"], answer: "B",
    explanation: "(3x+5)/(4x+5) = 4/5 → 15x+25 = 16x+20 → x=5. Ravi = 3×5 = 15."
  },
  {
    id: 12, category: "Verbal Ability",
    question: "Select the correctly spelled word:",
    options: ["Accomodation", "Accommodation", "Acommodation", "Accomodattion"], answer: "B",
    explanation: "ACCOMMODATION — double 'c', double 'm'. Remember: ac-com-mo-da-tion."
  },
  {
    id: 13, category: "Reasoning Ability",
    question: "Number series: 2, 6, 12, 20, 30, ?\nFind the next number.",
    options: ["40", "42", "44", "48"], answer: "B",
    explanation: "Differences: 4,6,8,10,12... Pattern: +2 each time. 30+12=42. This is n(n+1): 6×7=42."
  },
  {
    id: 14, category: "Advanced Quantitative Ability",
    question: "A man sold an article at 20% profit. If he had bought it for 10% less and sold for ₹5 less, he would gain 25%. The cost price is:",
    options: ["₹100", "₹150", "₹200", "₹250"], answer: "C",
    explanation: "New SP = 1.2x–5 = 0.9x×1.25 = 1.125x → 0.075x = 5 → x = ₹200."
  },
  {
    id: 15, category: "Advanced Reasoning Ability",
    question: "If '+' means '×', '×' means '÷', '÷' means '-', '-' means '+':\nWhat is 8 + 4 × 2 ÷ 3 - 1?",
    options: ["14", "15", "16", "17"], answer: "A",
    explanation: "Replace: 8×4÷2–3+1 = 32÷2–3+1 = 16–3+1 = 14."
  },
  {
    id: 16, category: "Numerical Ability",
    question: "A cistern is filled by a tap in 4 hours and emptied by an outlet in 6 hours. If both open simultaneously, how long to fill?",
    options: ["10 hours", "12 hours", "14 hours", "16 hours"], answer: "B",
    explanation: "Net rate = 1/4 – 1/6 = 1/12 per hour. Time = 12 hours."
  },
  {
    id: 17, category: "Verbal Ability",
    question: "Identify the error:\n'Each of the students have submitted their assignments on time.'",
    options: ["Each of the students", "have submitted", "their assignments", "on time"], answer: "B",
    explanation: "'Each' is singular → 'HAS submitted', not 'have submitted'."
  },
  {
    id: 18, category: "Reasoning Ability",
    question: "In a row of 40 students, Priya is 15th from the left. What is her position from the right?",
    options: ["24th", "25th", "26th", "27th"], answer: "C",
    explanation: "Position from right = 40 – 15 + 1 = 26."
  },
  {
    id: 19, category: "Advanced Quantitative Ability",
    question: "The sum of three consecutive even numbers is 78. What is the largest number?",
    options: ["24", "26", "28", "30"], answer: "C",
    explanation: "n+(n+2)+(n+4)=78 → 3n+6=78 → n=24. Largest = 28."
  },
  {
    id: 20, category: "Advanced Reasoning Ability",
    question: "Pointing to a photograph, a man says, 'She is the only daughter of my father's wife.' How is the woman related to him?",
    options: ["Mother", "Sister", "Wife", "Daughter"], answer: "B",
    explanation: "Father's wife = his mother. Mother's only daughter = his sister."
  },
  {
    id: 21, category: "Numerical Ability",
    question: "If SI on a sum at 5% per annum for 3 years is ₹1,200, find the compound interest on the same sum for the same period.",
    options: ["₹1,261", "₹1,325", "₹1,261.50", "₹1,200"], answer: "A",
    explanation: "P = 1200×100/(5×3) = ₹8000. CI = 8000×(1.05)³ – 8000 ≈ ₹1,261."
  },
  {
    id: 22, category: "Verbal Ability",
    question: "Choose the best synonym for 'LOQUACIOUS':",
    options: ["Silent", "Talkative", "Intelligent", "Clever"], answer: "B",
    explanation: "LOQUACIOUS = extremely talkative. From Latin 'loqui' = to speak."
  },
  {
    id: 23, category: "Reasoning Ability",
    question: "Find the odd one out:\n13, 17, 19, 21, 23",
    options: ["13", "17", "21", "23"], answer: "C",
    explanation: "21 = 3×7 (not prime). All others are prime numbers."
  },
  {
    id: 24, category: "Advanced Quantitative Ability",
    question: "A boat goes 20 km upstream and 28 km downstream in 5 hours. It goes 30 km upstream and 21 km downstream in 6.5 hours. Find the speed of the stream.",
    options: ["2 km/h", "3 km/h", "4 km/h", "5 km/h"], answer: "A",
    explanation: "Solving equations: b-s=10, b+s=14 → 2s=4 → stream speed = 2 km/h."
  },
  {
    id: 25, category: "Advanced Reasoning Ability",
    question: "In a chess tournament, every player plays exactly once against every other player. With 10 players, how many matches in total?",
    options: ["40", "45", "50", "55"], answer: "B",
    explanation: "C(10,2) = 10×9/2 = 45 matches."
  }
];

// ===== CODING PROBLEMS DATA =====
const codingProblems = [
  {
    id: 1,
    title: "Two Sum",
    description: "Given an array of integers and a target sum, find two numbers in the array that add up to the target. Return the indices of the two numbers. You may assume each input has exactly one solution, and you may not use the same element twice.",
    inputFormat: "First line: integer n (size of array)\nSecond line: n space-separated integers\nThird line: integer target",
    outputFormat: "Two indices (0-indexed) separated by a space, such that arr[i] + arr[j] == target. Output the smaller index first.",
    constraints: [
      "2 ≤ n ≤ 10^4",
      "-10^9 ≤ arr[i] ≤ 10^9",
      "Target is always achievable",
      "Each element may only be used once"
    ],
    exampleInput: "6\n2 7 11 15 1 8\n9",
    exampleOutput: "0 1",
    explanation: "arr[0] + arr[1] = 2 + 7 = 9 = target. Output: '0 1'. Optimal approach uses a hashmap in O(n) time.",
    starterCode: {
      python: `# Two Sum - Try to solve before viewing solution!

def two_sum(arr, target):
    # Your solution here
    # Hint: Use a dictionary to store seen numbers
    pass

n = int(input())
arr = list(map(int, input().split()))
target = int(input())

result = two_sum(arr, target)
print(result[0], result[1])`,

      java: `import java.util.*;

public class TwoSum {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        int target = sc.nextInt();
        
        // Your solution here
        // Hint: Use HashMap for O(n) time
    }
}`,

      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int target;
    cin >> target;
    
    // Your solution here
    // Hint: Use unordered_map
    
    return 0;
}`,

      c: `#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    
    // Your solution here (brute force: two loops)
    
    return 0;
}`
    },
    solution: {
      approach: `KEY INSIGHT: For every element x, we need to find (target - x) in the array.

APPROACH 1 — Brute Force (O(n²)):
  Use two nested loops. For each pair (i, j), check if arr[i] + arr[j] == target.
  Simple but slow for large inputs.

APPROACH 2 — HashMap / Dictionary (O(n)) ✅ Preferred:
  Step 1: Create an empty hashmap (key = number, value = index).
  Step 2: For each element arr[i]:
    • Compute complement = target - arr[i]
    • If complement exists in the hashmap → we found the pair! Return [map[complement], i]
    • Otherwise, store arr[i] → i in the hashmap.
  Step 3: Since we store BEFORE checking the next element, we never use the same element twice.

This is the standard optimal solution expected in TCS NQT.`,
      timeComplexity: "O(n) — HashMap",
      spaceComplexity: "O(n) — HashMap storage",
      code: {
        python: `# SOLUTION: Two Sum
# Time: O(n)  |  Space: O(n)

def two_sum(arr, target):
    seen = {}
    for i, num in enumerate(arr):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

n = int(input())
arr = list(map(int, input().split()))
target = int(input())

result = two_sum(arr, target)
print(result[0], result[1])`,

        java: `// SOLUTION: Two Sum
// Time: O(n)  |  Space: O(n)
import java.util.*;

public class TwoSum {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] arr = new int[n];
        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();
        int target = sc.nextInt();
        
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < n; i++) {
            int complement = target - arr[i];
            if (map.containsKey(complement)) {
                System.out.println(map.get(complement) + " " + i);
                return;
            }
            map.put(arr[i], i);
        }
    }
}`,

        cpp: `// SOLUTION: Two Sum
// Time: O(n)  |  Space: O(n)
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> arr(n);
    for (int i = 0; i < n; i++) cin >> arr[i];
    int target;
    cin >> target;
    
    unordered_map<int, int> mp;
    for (int i = 0; i < n; i++) {
        int complement = target - arr[i];
        if (mp.count(complement)) {
            cout << mp[complement] << " " << i << "\n";
            return 0;
        }
        mp[arr[i]] = i;
    }
    return 0;
}`,

        c: `/* SOLUTION: Two Sum (Brute Force O(n^2)) */
/* C doesn't have built-in hashmaps, use nested loops */
#include <stdio.h>

int main() {
    int n;
    scanf("%d", &n);
    int arr[10000];
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int target;
    scanf("%d", &target);
    
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] + arr[j] == target) {
                printf("%d %d\n", i, j);
                return 0;
            }
        }
    }
    return 0;
}`
      }
    }
  },
  {
    id: 2,
    title: "Reverse Words in a String",
    description: "Given a sentence as input, reverse the order of words in the sentence. Multiple spaces between words should be reduced to a single space in the output. Leading and trailing spaces should be removed.",
    inputFormat: "A single line containing a sentence (may have leading/trailing spaces and multiple spaces between words).",
    outputFormat: "A single line with the words in reverse order, separated by exactly one space.",
    constraints: [
      "1 ≤ length of sentence ≤ 10^4",
      "The sentence contains only printable ASCII characters",
      "There will be at least one word in the sentence"
    ],
    exampleInput: "  the sky is blue  ",
    exampleOutput: "blue is sky the",
    explanation: "Strip spaces → split into ['the','sky','is','blue'] → reverse → join with single space → 'blue is sky the'.",
    starterCode: {
      python: `# Reverse Words in a String - Try to solve!

def reverse_words(sentence):
    # Your solution here
    pass

sentence = input()
print(reverse_words(sentence))`,

      java: `import java.util.*;

public class ReverseWords {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String sentence = sc.nextLine().trim();
        
        // Your solution here
        // Hint: split by "\\s+" to handle multiple spaces
    }
}`,

      cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    
    // Your solution here
    // Hint: use stringstream to split by whitespace
    
    return 0;
}`,

      c: `#include <stdio.h>
#include <string.h>

int main() {
    char line[10001];
    fgets(line, sizeof(line), stdin);
    
    // Your solution here
    // Hint: use strtok to tokenize, then print in reverse
    
    return 0;
}`
    },
    solution: {
      approach: `KEY INSIGHT: Split the sentence by whitespace (handles multiple spaces), reverse the word array, then join back with single spaces.

STEPS:
  Step 1: Strip leading and trailing whitespace.
  Step 2: Split by one or more spaces to get individual words.
           → Python: sentence.split() (no argument handles multiple spaces automatically)
           → Java:   sentence.split("\\s+")
           → C++:    use istringstream / stringstream
  Step 3: Reverse the list/array of words.
  Step 4: Join with exactly one space in between.

GOTCHA: Do NOT use split(" ") in Java — it doesn't handle multiple consecutive spaces.
Use split("\\s+") instead which matches one or more whitespace characters.`,
      timeComplexity: "O(n) — single pass for split & join",
      spaceComplexity: "O(n) — word storage",
      code: {
        python: `# SOLUTION: Reverse Words in a String
# Time: O(n)  |  Space: O(n)

def reverse_words(sentence):
    return ' '.join(sentence.split()[::-1])

sentence = input()
print(reverse_words(sentence))`,

        java: `// SOLUTION: Reverse Words in a String
// Time: O(n)  |  Space: O(n)
import java.util.*;

public class ReverseWords {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String sentence = sc.nextLine().trim();
        String[] words = sentence.split("\\s+");
        
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            if (i < words.length - 1) sb.append(" ");
            sb.append(words[i]);
        }
        System.out.println(sb);
    }
}`,

        cpp: `// SOLUTION: Reverse Words in a String
// Time: O(n)  |  Space: O(n)
#include <bits/stdc++.h>
using namespace std;

int main() {
    string line;
    getline(cin, line);
    istringstream iss(line);
    vector<string> words;
    string w;
    while (iss >> w) words.push_back(w);
    reverse(words.begin(), words.end());
    for (int i = 0; i < (int)words.size(); i++) {
        if (i) cout << " ";
        cout << words[i];
    }
    cout << "\n";
    return 0;
}`,

        c: `/* SOLUTION: Reverse Words in a String */
/* Time: O(n)  |  Space: O(n) */
#include <stdio.h>
#include <string.h>

int main() {
    char line[10001];
    fgets(line, sizeof(line), stdin);
    char *words[5001];
    int count = 0;
    char *tok = strtok(line, " \t\n\r");
    while (tok) { words[count++] = tok; tok = strtok(NULL, " \t\n\r"); }
    for (int i = count - 1; i >= 0; i--) {
        if (i < count - 1) printf(" ");
        printf("%s", words[i]);
    }
    printf("\n");
    return 0;
}`
      }
    }
  }
];
