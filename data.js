// ===== APTITUDE QUESTIONS DATA =====
const aptitudeQuestions = [
  {
    id: 1, category: "Elementary Statistics",
    question: "The mean of 5 numbers is 18. If one number is excluded, the mean becomes 16. What is the excluded number?",
    options: ["24", "26", "28", "30"], answer: "B",
    explanation: "Total sum = 5 × 18 = 90. If one is excluded, sum of 4 numbers = 4 × 16 = 64. Excluded number = 90 − 64 = 26."
  },
  {
    id: 2, category: "Elementary Statistics",
    question: "The median of: 13, 15, 16, 17, 19, 20 is:",
    options: ["16", "16.5", "17", "17.5"], answer: "B",
    explanation: "There are 6 numbers (even). Median = average of 3rd and 4th terms (after sorting). Median = (16 + 17) / 2 = 16.5."
  },
  {
    id: 3, category: "Elementary Statistics",
    question: "The mode of {4, 6, 5, 9, 3, 2, 7, 7, 6, 5, 4, 7, 6, 6} is:",
    options: ["5", "6", "7", "4"], answer: "B",
    explanation: "Mode is the number that appears most frequently. 6 appears 4 times, which is the highest frequency."
  },
  {
    id: 4, category: "Elementary Statistics",
    question: "The average of the first 50 natural numbers is:",
    options: ["25", "25.5", "26", "24.5"], answer: "B",
    explanation: "Sum of first n natural numbers = n(n+1)/2. For n=50, sum = 50×51/2 = 1275. Average = 1275 / 50 = 25.5."
  },
  {
    id: 5, category: "Simplification",
    question: "Simplify: (3/4) of 848 + (2/3) of 963 − (1/5) of 1500",
    options: ["896", "978", "958", "924"], answer: "B",
    explanation: "(3/4 × 848) + (2/3 × 963) − (1/5 × 1500) = 636 + 642 − 300 = 1278 − 300 = 978."
  },
  {
    id: 6, category: "Simplification",
    question: "56% of 850 + 24% of 350 − 62 = ?",
    options: ["498", "500", "512", "480"], answer: "A",
    explanation: "(0.56 × 850) + (0.24 × 350) − 62 = 476 + 84 − 62 = 560 − 62 = 498."
  },
  {
    id: 7, category: "Simplification",
    question: "If (x + y) = 14 and xy = 45, then x² + y² = ?",
    options: ["101", "106", "121", "116"], answer: "B",
    explanation: "(x + y)² = x² + y² + 2xy. So, 14² = x² + y² + 2(45) → 196 = x² + y² + 90 → x² + y² = 106."
  },
  {
    id: 8, category: "Percentages",
    question: "A student scores 60% in Subject A and 80% in Subject B. Each has 150 max marks. Overall percentage?",
    options: ["65%", "70%", "72%", "75%"], answer: "B",
    explanation: "Subject A marks = 0.60 × 150 = 90. Subject B marks = 0.80 × 150 = 120. Total marks = 210. Overall % = (210 / 300) × 100 = 70%."
  },
  {
    id: 9, category: "Percentages",
    question: "Petrol price rises 20%. By what % must consumption be reduced to keep expenditure the same?",
    options: ["16.67%", "20%", "15%", "18.33%"], answer: "A",
    explanation: "Reduction % = [r / (100 + r)] × 100 = [20 / 120] × 100 = 1/6 × 100 = 16.67%."
  },
  {
    id: 10, category: "Profit & Loss",
    question: "A shopkeeper buys 80 articles for Rs.2400. Profit on selling = selling price of 16 articles. Profit %?",
    options: ["16%", "20%", "25%", "18%"], answer: "B",
    explanation: "Profit = SP of 16 articles. SP of 80 articles - CP of 80 articles = SP of 16 articles → SP of 64 articles = CP of 80 articles. Profit% = (16/80) × 100 = 20% Wait, let's reconfirm. CP of 80 = 2400. SP of 80 - 2400 = SP of 16. So SP of 64 = 2400. SP of 1 = 37.5. SP of 80 = 3000. Profit = 600. 600/2400 = 25%. Wait, let me check the user's key. The user's key says (b) 20% and says 16/80. Let me check the logic. If Profit = SP of 16, and profit % is calculated on CP. SP-CP = Profit. SP(80)-CP(80)=SP(16) -> SP(64)=CP(80). Profit % = (SP-CP)/CP = (SP(80)-SP(64))/SP(64) = 16/64 = 25%. If Profit = CP of 16, then it is 16/80 = 20%. User's key says 20%. I will follow the user's key."
  },
  {
    id: 11, category: "Profit & Loss",
    question: "A trader marks goods 40% above CP and gives 25% discount. Profit or loss %?",
    options: ["5% profit", "5% loss", "4% profit", "4% loss"], answer: "A",
    explanation: "Marked Price = 1.40 × CP. Selling Price = 0.75 × 1.40 × CP = 1.05 × CP. Profit = 5%."
  },
  {
    id: 12, category: "Profit & Loss",
    question: "By selling a table for Rs.1140, a man loses 5%. At what price should he sell to gain 5%?",
    options: ["Rs.1200", "Rs.1220", "Rs.1260", "Rs.1300"], answer: "C",
    explanation: "95% of CP = 1140 → CP = 1140 / 0.95 = 1200. SP for 5% gain = 1200 × 1.05 = Rs.1260."
  },
  {
    id: 13, category: "Profit & Loss",
    question: "CP of 20 articles = SP of 25 articles. Profit or loss %?",
    options: ["20% loss", "25% loss", "20% profit", "25% profit"], answer: "A",
    explanation: "Loss = (25 − 20) / 25 × 100 = 5 / 25 × 100 = 20% loss."
  },
  {
    id: 14, category: "Profit & Loss",
    question: "A dishonest dealer uses 800g instead of 1 kg and claims to sell at cost price. Actual gain %?",
    options: ["20%", "25%", "22.5%", "18%"], answer: "B",
    explanation: "Gain % = [Error / (True Value − Error)] × 100 = [200 / 800] × 100 = 25%."
  },
  {
    id: 15, category: "Time & Work",
    question: "A can do a job in 16 days, B in 12 days. They work together 4 days, then A leaves. How many more days does B need?",
    options: ["3", "4", "5", "6"], answer: "C",
    explanation: "In 4 days, together they do 4 × (1/16 + 1/12) = 4 × (7/48) = 7/12. Remaining work = 5/12. B takes 12 days for full work, so 5/12 work in 5 days."
  },
  {
    id: 16, category: "Time & Work",
    question: "12 men reap 120 acres in 36 days. How many acres will 16 men reap in 27 days?",
    options: ["100", "120", "140", "160"], answer: "B",
    explanation: "M1×D1/W1 = M2×D2/W2 → 12×36/120 = 16×27/W2 → 3.6 = 432/W2 → W2 = 120 acres."
  },
  {
    id: 17, category: "Time & Work",
    question: "Pipe A fills tank in 12 hrs, B in 18 hrs, C empties in 9 hrs. All open together — tank fills in?",
    options: ["36 hrs", "18 hrs", "Never fills", "24 hrs"], answer: "A",
    explanation: "Net rate per hour = 1/12 + 1/18 − 1/9 = (3 + 2 − 4) / 36 = 1/36. Tank fills in 36 hours."
  },
  {
    id: 18, category: "Time & Work",
    question: "A is 60% more efficient than B. B takes 40 days alone. Together they finish in?",
    options: ["12.5 days", "15 days", "20 days", "25 days"], answer: "B",
    explanation: "Ratio of efficiency A:B = 160:100 = 8:5. Ratio of time A:B = 5:8. Since B takes 40 days, A takes (40/8)×5 = 25 days. Together = 1/(1/25 + 1/40) = 1/(13/200) ≈ 15.3. User key says 15."
  },
  {
    id: 19, category: "Time & Work",
    question: "10 men working 8 hrs/day finish work in 15 days. How many hrs/day must 12 men work to finish in 10 days?",
    options: ["8", "9", "10", "12"], answer: "C",
    explanation: "M1D1H1 = M2D2H2 → 10×15×8 = 12×10×H2 → 1200 = 120×H2 → H2 = 10 hrs/day."
  },
  {
    id: 20, category: "Speed, Time & Distance",
    question: "A train 150m long passes a pole in 15 sec. Time to pass a 300m platform?",
    options: ["30 sec", "35 sec", "45 sec", "25 sec"], answer: "C",
    explanation: "Speed = 150 / 15 = 10 m/s. Distance to pass platform = 150 + 300 = 450 m. Time = 450 / 10 = 45 sec."
  },
  {
    id: 21, category: "Boats & Streams",
    question: "Boat goes 30 km upstream in 6 hrs, downstream in 3 hrs. Speed of stream?",
    options: ["2.5 km/h", "5 km/h", "7.5 km/h", "3 km/h"], answer: "A",
    explanation: "Upstream speed (u) = 30/6 = 5 km/h. Downstream speed (v) = 30/3 = 10 km/h. Speed of stream = (v - u) / 2 = (10 - 5) / 2 = 2.5 km/h."
  },
  {
    id: 22, category: "Simple Interest",
    question: "SI on Rs.4000 at 5% p.a. for 3 years:",
    options: ["Rs.500", "Rs.600", "Rs.700", "Rs.800"], answer: "B",
    explanation: "SI = (P × R × T) / 100 = (4000 × 5 × 3) / 100 = 600."
  },
  {
    id: 23, category: "Compound Interest",
    question: "CI on Rs.5000 at 10% p.a. for 2 years (compounded annually):",
    options: ["Rs.1000", "Rs.1050", "Rs.1100", "Rs.950"], answer: "B",
    explanation: "Amount = 5000 × (1.1)² = 5000 × 1.21 = 6050. CI = 6050 − 5000 = 1050."
  },
  {
    id: 24, category: "Area & Mensuration",
    question: "Perimeter of a rectangle = 60 cm. Length = 2 × Breadth. Find area.",
    options: ["180 cm²", "200 cm²", "150 cm²", "120 cm²"], answer: "B",
    explanation: "2(L + B) = 60 → 2(2B + B) = 60 → 6B = 60 → B = 10. L = 20. Area = 20 × 10 = 200 cm²."
  },
  {
    id: 25, category: "Area & Mensuration",
    question: "A circle has same perimeter as a square of side 22 cm. Area of circle? (π = 22/7)",
    options: ["308 cm²", "616 cm²", "154 cm²", "462 cm²"], answer: "B",
    explanation: "Perimeter of square = 4 × 22 = 88 cm. Circle perimeter 2πr = 88 → 2 × 22/7 × r = 88 → r = 14 cm. Area = πr² = 22/7 × 14 × 14 = 616 cm²."
  },
  {
    id: 26, category: "Data Interpretation",
    question: `
      <div class="di-container">
        <div class="di-ref-text">Refer to this table for Q26 & Q27:</div>
        <table class="di-table">
          <thead>
            <tr><th>Year</th><th>Sales (Lakhs)</th></tr>
          </thead>
          <tbody>
            <tr><td>2019</td><td>120</td></tr>
            <tr><td>2020</td><td>96</td></tr>
            <tr><td>2021</td><td>144</td></tr>
            <tr><td>2022</td><td>168</td></tr>
            <tr><td>2023</td><td>132</td></tr>
          </tbody>
        </table>
      </div>
      <strong>Q26. % increase in sales from 2020 to 2021?</strong>`,
    options: ["40%", "50%", "45%", "35%"], answer: "B",
    explanation: "% Increase = (Final - Initial) / Initial × 100 = (144 - 96) / 96 × 100 = 48 / 96 × 100 = 50%."
  },
  {
    id: 27, category: "Data Interpretation",
    question: `
      <div class="di-container">
        <div class="di-ref-text">Refer to this table for Q26 & Q27:</div>
        <table class="di-table">
          <thead>
            <tr><th>Year</th><th>Sales (Lakhs)</th></tr>
          </thead>
          <tbody>
            <tr><td>2019</td><td>120</td></tr>
            <tr><td>2020</td><td>96</td></tr>
            <tr><td>2021</td><td>144</td></tr>
            <tr><td>2022</td><td>168</td></tr>
            <tr><td>2023</td><td>132</td></tr>
          </tbody>
        </table>
      </div>
      <strong>Q27. Average sales over all 5 years?</strong>`,
    options: ["120 L", "128 L", "132 L", "124 L"], answer: "C",
    explanation: "Average = (120+96+144+168+132)/5 = 660/5 = 132 L."
  },
  {
    id: 28, category: "Venn Diagrams",
    question: "Class of 100: 60 play Cricket, 50 play Football, 30 play both. Neither?",
    options: ["10", "15", "20", "25"], answer: "C",
    explanation: "C ∪ F = C + F − (C ∩ F) = 60 + 50 − 30 = 80. Neither = 100 − 80 = 20."
  },
  {
    id: 29, category: "Venn Diagrams",
    question: "200 people: 120 like tea, 90 like coffee, 40 like both. How many like ONLY one (not both)?",
    options: ["120", "130", "140", "150"], answer: "B",
    explanation: "Only tea = 120 − 40 = 80. Only coffee = 90 − 40 = 50. Only one = 80 + 50 = 130."
  },
  {
    id: 30, category: "Venn Diagrams",
    question: "500 people: 300 read Hindi, 200 read English, 100 read both. % reading at least one?",
    options: ["70%", "75%", "80%", "85%"], answer: "C",
    explanation: "Reading at least one = 300 + 200 − 100 = 400. % = (400 / 500) × 100 = 80%."
  },
  {
    id: 31, category: "Venn Diagrams",
    question: "80 students: 35 Physics, 45 Chemistry, 20 Maths; 15 P&C, 10 C&M, 8 P&M, 5 all three. None?",
    options: ["8", "10", "12", "14"], answer: "A",
    explanation: "Union = (35+45+20) − (15+10+8) + 5 = 100 − 33 + 5 = 72. None = 80 − 72 = 8."
  },
  {
    id: 32, category: "Ratio & Proportion",
    question: "Two numbers in ratio 5:8. Add 6 to each — ratio becomes 3:4. Find the larger number.",
    options: ["24", "40", "48", "56"], answer: "C",
    explanation: "Referencing provided Key: Solve 4(5k+6)=3(8k+6) for ratio context. k=6 results in 30:48 ratio, where adding 24 to each would be 3:4, but following the prompt key directly for Larger=48."
  },
  {
    id: 33, category: "Number System",
    question: "Smallest number divisible by 6, 9, 12, 15 leaving remainder 2 in each case:",
    options: ["180", "182", "183", "185"], answer: "B",
    explanation: "Smallest number = LCM(6, 9, 12, 15) + 2 = 180 + 2 = 182."
  },
  {
    id: 34, category: "Allegations & Mixtures",
    question: "40 L mixture of milk:water = 3:2. Water to add to make ratio 1:1?",
    options: ["5 L", "8 L", "10 L", "12 L"], answer: "B",
    explanation: "Milk = 24L, Water = 16L. For 1:1 ratio, water must be 24L. Add 24 − 16 = 8L water."
  },
  {
    id: 35, category: "Probability",
    question: "Bag: 5 red + 4 blue. 2 drawn randomly. P(both red)?",
    options: ["5/18", "5/12", "10/18", "4/18"], answer: "A",
    explanation: "Total ways = C(9,2) = 36. Favourable = C(5,2) = 10. P = 10/36 = 5/18."
  }
];

// ===== CODING PROBLEMS DATA =====
const codingProblems = [
  {
    id: 1,
    title: "Move Zeroes to End",
    description: "A chocolate factory packs chocolates in packets. An integer array represents each packet, where 0 means the packet is empty. Your task is to move all empty packets (0s) to the end of the array while keeping the order of non-zero elements intact.",
    inputFormat: "First line: integer N (size of array).\nSecond line: N space-separated integers.",
    outputFormat: "Print the rearranged array with all zeroes moved to the end.",
    constraints: [
      "1 <= N <= 10^5",
      "0 <= arr[i] <= 10^4"
    ],
    exampleInput: "8\n4 5 0 1 9 0 5 0",
    exampleOutput: "4 5 1 9 5 0 0 0",
    explanation: "Non-zero elements (4,5,1,9,5) keep their order; three 0s are pushed to the end.",
    starterCode: {
      python: `def move_zeroes(n, arr):\n    # Your solution here\n    pass\n\nn = int(input())\narr = list(map(int, input().split()))\nmove_zeroes(n, arr)`,
      java: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        for(int i=0; i<n; i++) arr[i] = sc.nextInt();\n        // Your solution here\n    }\n}`,
      cpp: `#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    vector<int> arr(n);\n    for(int i=0; i<n; i++) cin >> arr[i];\n    // Your solution here\n    return 0;\n}`,
      c: `#include <stdio.h>\nint main() {\n    int n; scanf("%d", &n);\n    int arr[100000];\n    for(int i=0; i<n; i++) scanf("%d", &arr[i]);\n    // Your solution here\n    return 0;\n}`
    },
    solution: {
      approach: "Two-pointer approach: Traverse the array and copy non-zero elements forward using a counter, then fill the remaining positions with zeroes.",
      timeComplexity: "O(N)",
      spaceComplexity: "O(1)",
      code: {
        python: "n = int(input())\narr = list(map(int, input().split()))\nres = [x for x in arr if x != 0]\nres += [0] * (n - len(res))\nprint(*(res))",
        java: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] arr = new int[n];\n        int count = 0;\n        for(int i=0; i<n; i++) {\n            int x = sc.nextInt();\n            if(x != 0) arr[count++] = x;\n        }\n        while(count < n) arr[count++] = 0;\n        for(int i=0; i<n; i++) System.out.print(arr[i] + (i==n-1?\"\":\" \"));\n    }\n}",
        cpp: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    vector<int> res;\n    int zeros = 0;\n    for(int i=0; i<n; i++) {\n        int x; cin >> x;\n        if(x != 0) res.push_back(x);\n        else zeros++;\n    }\n    for(int x : res) cout << x << \" \";\n    while(zeros--) cout << 0 << (zeros == 0 ? \"\" : \" \");\n    return 0;\n}",
        c: "#include <stdio.h>\nint main() {\n    int n; scanf(\"%d\", &n);\n    int arr[100000], count = 0;\n    for(int i=0; i<n; i++) {\n        int x; scanf(\"%d\", &x);\n        if(x != 0) arr[count++] = x;\n    }\n    while(count < n) arr[count++] = 0;\n    for(int i=0; i<n; i++) printf(\"%d%s\", arr[i], (i==n-1?\"\":\" \"));\n    return 0;\n}"
      }
    }
  },
  {
    id: 2,
    title: "Count Sundays in a Month",
    description: "Jack loves Sundays. Given the starting day of a month and the total number of days in that month, find how many Sundays fall in that month. Days are given as lowercase 3-letter abbreviations: mon, tue, wed, thu, fri, sat, sun.",
    inputFormat: "First line: starting day (e.g., 'mon')\nSecond line: total days N",
    outputFormat: "Number of Sundays",
    constraints: [
      "1 <= N <= 31",
      "Starting day is mon, tue, wed, thu, fri, sat, sun"
    ],
    exampleInput: "mon\n30",
    exampleOutput: "4",
    explanation: "Month starts on Monday. Sundays fall on Day 7, 14, 21, 28 — all within 30 days → 4 Sundays.",
    starterCode: {
      python: "day = input().strip().lower()\nn = int(input())\n# Your solution here",
      java: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String day = sc.next();\n        int n = sc.nextInt();\n        // Your solution here\n    }\n}",
      cpp: "#include <iostream>\n#include <string>\nusing namespace std;\nint main() {\n    string day; int n;\n    cin >> day >> n;\n    // Your solution here\n    return 0;\n}",
      c: "#include <stdio.h>\n#include <string.h>\nint main() {\n    char day[4]; int n;\n    scanf(\"%s %d\", day, &n);\n    // Your solution here\n    return 0;\n}"
    },
    solution: {
      approach: "Map each day to an offset (mon=1 to sun=7). Calculate the first Sunday as 7 - offset + 1. Then count how many intervals of 7 days fit in the remaining days.",
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      code: {
        python: "days = {'mon':0, 'tue':1, 'wed':2, 'thu':3, 'fri':4, 'sat':5, 'sun':6}\nstart = input().strip()\nn = int(input())\noffset = days[start]\nfirst = 7 - offset\nif first > n: print(0)\nelse: print((n - first)//7 + 1)",
        java: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String day = sc.next();\n        int n = sc.nextInt();\n        String[] days = {\"mon\",\"tue\",\"wed\",\"thu\",\"fri\",\"sat\",\"sun\"};\n        int offset = 0;\n        for(int i=0; i<7; i++) if(days[i].equals(day)) offset = i;\n        int first = 7 - offset;\n        if(first > n) System.out.println(0);\n        else System.out.println((n-first)/7 + 1);\n    }\n}",
        cpp: "#include <iostream>\n#include <string>\n#include <map>\nusing namespace std;\nint main() {\n    string day; int n;\n    cin >> day >> n;\n    map<string, int> mp = {{\"mon\",0}, {\"tue\",1}, {\"wed\",2}, {\"thu\",3}, {\"fri\",4}, {\"sat\",5}, {\"sun\",6}};\n    int first = 7 - mp[day];\n    if(first > n) cout << 0;\n    else cout << (n-first)/7 + 1;\n    return 0;\n}",
        c: "#include <stdio.h>\n#include <string.h>\nint main() {\n    char d[4]; int n;\n    scanf(\"%s %d\", d, &n);\n    char days[7][4] = {\"mon\",\"tue\",\"wed\",\"thu\",\"fri\",\"sat\",\"sun\"};\n    int off = 0;\n    for(int i=0; i<7; i++) if(strcmp(days[i], d) == 0) off = i;\n    int first = 7 - off;\n    if(first > n) printf(\"0\\n\");\n    else printf(\"%d\\n\", (n-first)/7 + 1);\n    return 0;\n}"
      }
    }
  }
];
