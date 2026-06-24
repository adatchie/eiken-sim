'use strict';

// ============================================================
// 英検3級 Speaking Simulator v2
// 公式の二次試験フローに準拠:
//   挨拶→黙読(20秒)→音読→Q1(パッセージ)→Q2-Q3(イラスト)
//   →カード裏返し→Q4-Q5(自分のこと)→採点
// ============================================================

// ── 問題データ ──────────────────────────────────────────
const QUESTION_SETS = [
  {
    "id": "01",
    "title": "Cycling in Denmark",
    "emoji": "🚲",
    "image": "assets/01_illustration.jpg",
    "passage": "In Denmark, many people ride bicycles. Cycling is part of their daily life. There are special roads for bicycles in cities. About nine out of ten people in Copenhagen have a bicycle. They ride to work, to school, and to shops. Riding a bicycle is good for their health and the environment.",
    "passage_q": {
      "q": "How many people in Copenhagen have a bicycle?",
      "a": "About nine out of ten people have a bicycle.",
      "keywords": [
        "nine",
        "ten",
        "copenhagen"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. What is the woman doing?",
        "a": "She is riding a bicycle.",
        "keywords": [
          "riding",
          "bicycle",
          "bike"
        ]
      },
      {
        "q": "How many bicycles are there in the picture?",
        "a": "There are three bicycles.",
        "keywords": [
          "three",
          "3"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Do you have a bicycle?",
        "a": "Yes, I do. / No, I don't.",
        "keywords": [
          "yes",
          "no",
          "have"
        ]
      },
      {
        "q": "What do you usually do on weekends?",
        "a": "I usually play sports / watch TV / study.",
        "keywords": [
          "usually",
          "play",
          "watch",
          "study",
          "weekend"
        ]
      }
    ]
  },
  {
    "id": "02",
    "title": "Street Dance",
    "emoji": "💃",
    "image": "assets/02_illustration.jpg",
    "passage": "Dancing is popular in Japan. Many young people enjoy street dance. They dance in parks and on the streets. Some people join dance groups and practice together. There are dance contests for high school students. Dancing is good exercise and it is a fun way to make friends.",
    "passage_q": {
      "q": "Where do young people dance?",
      "a": "They dance in parks and on the streets.",
      "keywords": [
        "parks",
        "streets",
        "dance"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. What are the people doing?",
        "a": "They are dancing.",
        "keywords": [
          "dancing",
          "dance"
        ]
      },
      {
        "q": "How many people are in the picture?",
        "a": "There are four people.",
        "keywords": [
          "four",
          "4"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Do you like dancing?",
        "a": "Yes, I do. / No, I don't.",
        "keywords": [
          "yes",
          "no",
          "like"
        ]
      },
      {
        "q": "What is your favorite subject at school?",
        "a": "My favorite subject is math / English / science.",
        "keywords": [
          "favorite",
          "subject",
          "math",
          "english",
          "science"
        ]
      }
    ]
  },
  {
    "id": "03",
    "title": "Soccer in England",
    "emoji": "⚽",
    "image": "assets/03_illustration.jpg",
    "passage": "England has the most popular soccer league in the world. Many people go to stadiums to watch soccer games on weekends. Some fans travel a long way to see their favorite teams. People also watch games on TV at home or at sports bars. Soccer brings people together and they enjoy talking about the games.",
    "passage_q": {
      "q": "What do many people do on weekends in England?",
      "a": "They go to stadiums to watch soccer games.",
      "keywords": [
        "stadiums",
        "watch",
        "soccer",
        "games",
        "weekends"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. What is the boy doing?",
        "a": "He is kicking a soccer ball.",
        "keywords": [
          "kicking",
          "soccer",
          "ball",
          "playing"
        ]
      },
      {
        "q": "What is the boy wearing?",
        "a": "He is wearing a soccer uniform.",
        "keywords": [
          "wearing",
          "uniform",
          "shirt",
          "shoes"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Do you play any sports?",
        "a": "Yes, I play soccer / baseball / tennis.",
        "keywords": [
          "yes",
          "play",
          "soccer",
          "baseball",
          "tennis",
          "sports"
        ]
      },
      {
        "q": "What do you do after school?",
        "a": "I do my homework / play with friends / practice sports.",
        "keywords": [
          "homework",
          "play",
          "practice",
          "friends",
          "after",
          "school"
        ]
      }
    ]
  },
  {
    "id": "04",
    "title": "YouTube on Smartphones",
    "emoji": "📱",
    "image": "assets/04_illustration.jpg",
    "passage": "Today, many people watch videos on their smartphones. YouTube is one of the most popular websites. People watch music videos, cooking programs, and funny animal videos. Some people make their own videos and share them online. Many young people watch YouTube every day for fun and to learn new things.",
    "passage_q": {
      "q": "What do people watch on YouTube?",
      "a": "They watch music videos, cooking programs, and funny animal videos.",
      "keywords": [
        "music",
        "videos",
        "cooking",
        "animal",
        "watch"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. What is the girl doing?",
        "a": "She is watching a video on her smartphone.",
        "keywords": [
          "watching",
          "video",
          "smartphone",
          "phone"
        ]
      },
      {
        "q": "Where is the girl sitting?",
        "a": "She is sitting on a sofa.",
        "keywords": [
          "sofa",
          "couch",
          "sitting"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Do you use a smartphone?",
        "a": "Yes, I do. / No, I don't.",
        "keywords": [
          "yes",
          "no",
          "smartphone",
          "use"
        ]
      },
      {
        "q": "What do you do in your free time?",
        "a": "I play games / read books / watch videos.",
        "keywords": [
          "games",
          "read",
          "books",
          "watch",
          "videos",
          "free",
          "time"
        ]
      }
    ]
  },
  {
    "id": "05",
    "title": "Exercising in the Park",
    "emoji": "🏃",
    "image": "assets/05_illustration.jpg",
    "passage": "Many people exercise in the park. In the morning, you can see people jogging, walking, and doing yoga. Some parks have special equipment for exercise. Exercising outside is good because people can enjoy fresh air and sunshine. It is also a good place to meet friends and talk.",
    "passage_q": {
      "q": "What can you see people doing in the park in the morning?",
      "a": "You can see people jogging, walking, and doing yoga.",
      "keywords": [
        "jogging",
        "walking",
        "yoga",
        "morning"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. What are the people doing?",
        "a": "They are exercising / running.",
        "keywords": [
          "exercising",
          "running",
          "jogging"
        ]
      },
      {
        "q": "How many people are running?",
        "a": "There are two people running.",
        "keywords": [
          "two",
          "2",
          "running"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Do you exercise every day?",
        "a": "Yes, I do. / No, I don't.",
        "keywords": [
          "yes",
          "no",
          "exercise",
          "every",
          "day"
        ]
      },
      {
        "q": "What sport do you like?",
        "a": "I like soccer / basketball / swimming.",
        "keywords": [
          "like",
          "soccer",
          "basketball",
          "swimming",
          "sport"
        ]
      }
    ]
  },
  {
    "id": "06",
    "title": "Listening to Music",
    "emoji": "🎵",
    "image": "assets/06_illustration.jpg",
    "passage": "Some people listen to music on their smartphones. They listen to music on the train, at home, or while walking. There are many kinds of music, like pop, rock, and classical. Some students listen to music when they study. Music can help people relax and feel happy. It is a big part of daily life.",
    "passage_q": {
      "q": "Where do people listen to music?",
      "a": "They listen to music on the train, at home, or while walking.",
      "keywords": [
        "train",
        "home",
        "walking",
        "listen",
        "music"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. What is the boy doing?",
        "a": "He is listening to music.",
        "keywords": [
          "listening",
          "music",
          "earphones",
          "headphones"
        ]
      },
      {
        "q": "What is the boy wearing on his ears?",
        "a": "He is wearing headphones / earphones.",
        "keywords": [
          "headphones",
          "earphones",
          "wearing"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Do you like listening to music?",
        "a": "Yes, I do. / No, I don't.",
        "keywords": [
          "yes",
          "no",
          "like",
          "music",
          "listening"
        ]
      },
      {
        "q": "What kind of music do you like?",
        "a": "I like pop / rock / classical music.",
        "keywords": [
          "pop",
          "rock",
          "classical",
          "like",
          "kind",
          "music"
        ]
      }
    ]
  },
  {
    "id": "07",
    "title": "Camping in the Mountains",
    "emoji": "⛺",
    "image": "assets/07_illustration.jpg",
    "passage": "Many Japanese people like camping. In summer, families go to the mountains and stay in tents. They cook food outside and have barbecues. Children can play in the river and catch fish. At night, they look at the stars. Camping is a fun way to enjoy nature and spend time with family.",
    "passage_q": {
      "q": "What do families do when they go camping?",
      "a": "They cook food outside, have barbecues, and children play in the river.",
      "keywords": [
        "cook",
        "food",
        "barbecue",
        "river",
        "play",
        "tent",
        "camping"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. What can you see in the picture?",
        "a": "I can see a tent / a campfire / mountains.",
        "keywords": [
          "tent",
          "campfire",
          "fire",
          "mountains",
          "trees"
        ]
      },
      {
        "q": "How many tents are there?",
        "a": "There is one tent / two tents.",
        "keywords": [
          "one",
          "two",
          "1",
          "2",
          "tent"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Have you ever been camping?",
        "a": "Yes, I have. / No, I haven't.",
        "keywords": [
          "yes",
          "no",
          "camping",
          "been",
          "have"
        ]
      },
      {
        "q": "What do you do in summer vacation?",
        "a": "I go to the beach / visit my grandparents / study.",
        "keywords": [
          "beach",
          "visit",
          "grandparents",
          "study",
          "summer",
          "vacation",
          "go"
        ]
      }
    ]
  },
  {
    "id": "08",
    "title": "International Food",
    "emoji": "🍴",
    "image": "assets/08_illustration.jpg",
    "passage": "Tokyo has many kinds of restaurants. You can eat Italian, Indian, Chinese, and many other foods. Some people enjoy trying food from different countries. International food is popular because it is fun to taste new flavors. Food festivals are held in Tokyo every year. Many people visit them to enjoy delicious food from around the world.",
    "passage_q": {
      "q": "Why is international food popular?",
      "a": "Because it is fun to taste new flavors.",
      "keywords": [
        "fun",
        "taste",
        "new",
        "flavors",
        "popular"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. What are the people doing?",
        "a": "They are eating / having a meal.",
        "keywords": [
          "eating",
          "meal",
          "food",
          "having",
          "dinner",
          "lunch"
        ]
      },
      {
        "q": "What is on the table?",
        "a": "There are plates, food, and drinks on the table.",
        "keywords": [
          "plates",
          "food",
          "drinks",
          "table"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "What is your favorite food?",
        "a": "My favorite food is sushi / pizza / curry.",
        "keywords": [
          "favorite",
          "food",
          "sushi",
          "pizza",
          "curry"
        ]
      },
      {
        "q": "Can you cook?",
        "a": "Yes, I can. / No, I can't.",
        "keywords": [
          "yes",
          "no",
          "cook",
          "can"
        ]
      }
    ]
  },
  {
    "id": "09",
    "title": "Fun at Airports",
    "emoji": "✈️",
    "image": "assets/09_illustration.png",
    "source_url": "https://nicksenglish.com/eiken/interview/eiken_3_interview_fun_at_airports",
    "passage": "Airports are popular places to go for a day trip. Because airplanes leave every few minutes, children can enjoy watching them. Some people like to take photos. There are also shops, restaurants and play areas.",
    "passage_q": {
      "q": "Please look at the passage. What do some people like to do?",
      "a": "They like to take photos.",
      "keywords": [
        "like",
        "take",
        "photos"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. What is the girl doing?",
        "a": "She is eating ice cream.",
        "keywords": [
          "eating",
          "ice",
          "cream",
          "girl",
          "doing"
        ]
      },
      {
        "q": "Now, please look at the man with the cap. What is he carrying?",
        "a": "He is carrying a bag.",
        "keywords": [
          "carrying",
          "bag",
          "man",
          "cap"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "What kind of TV programs do you like to watch?",
        "a": "I like to watch quiz shows.",
        "keywords": [
          "like",
          "watch",
          "quiz",
          "shows",
          "kind",
          "programs"
        ]
      },
      {
        "q": "Do you like to go shopping? Yes / What do you like to buy? No / What do you like to do with your friends?",
        "a": "Yes... I like to buy books.",
        "keywords": [
          "like",
          "buy",
          "books",
          "shopping",
          "friends"
        ]
      }
    ]
  },
  {
    "id": "10",
    "title": "School Subjects",
    "emoji": "📚",
    "image": "assets/10_illustration.png",
    "source_url": "https://nicksenglish.com/eiken/interview/eiken_3_interview_school_subjects",
    "passage": "In the United States, the most popular subject in high school is History because it is interesting. Students can get a good job if they study English, Math and Science, so those subjects are also popular.",
    "passage_q": {
      "q": "Please look at the passage. What can students get if they study English, Math and Science?",
      "a": "They can get a good job.",
      "keywords": [
        "can",
        "get",
        "good",
        "job",
        "students",
        "study",
        "english",
        "math"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. How many students are there?",
        "a": "There are six students.",
        "keywords": [
          "six",
          "students"
        ]
      },
      {
        "q": "Now, please look at the girl with glasses. What is she doing?",
        "a": "She is studying.",
        "keywords": [
          "studying",
          "girl",
          "glasses",
          "doing"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Where would you like to travel?",
        "a": "I would like to go to Spain.",
        "keywords": [
          "would",
          "like",
          "spain",
          "travel"
        ]
      },
      {
        "q": "Do you like winter? Yes / Why? No / Why not?",
        "a": "Yes... I can go ice skating.",
        "keywords": [
          "can",
          "ice",
          "skating",
          "like",
          "winter",
          "not"
        ]
      }
    ]
  },
  {
    "id": "11",
    "title": "Karaoke",
    "emoji": "🎤",
    "image": "assets/11_illustration.png",
    "source_url": "https://nicksenglish.com/eiken/interview/eiken_3_interview_karaoke",
    "passage": "Going to karaoke is a popular hobby in Japan. Many people sing songs with family and friends. They read the words on a TV and sing into a microphone. People also enjoy eating and drinking there.",
    "passage_q": {
      "q": "Please look at the passage. What do many people do with family and friends?",
      "a": "They sing songs.",
      "keywords": [
        "sing",
        "songs",
        "family",
        "friends"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. What is the girl with short hair doing?",
        "a": "She is singing.",
        "keywords": [
          "singing",
          "girl",
          "short",
          "hair",
          "doing"
        ]
      },
      {
        "q": "Where are the shoes?",
        "a": "They are in the box.",
        "keywords": [
          "box",
          "shoes"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "How are you going home today?",
        "a": "I'm going home by car.",
        "keywords": [
          "going",
          "home",
          "car",
          "today"
        ]
      },
      {
        "q": "Do you like to eat at restaurants? Yes / Please tell me more. No / What do you usually do on Sundays?",
        "a": "Yes... I like to eat sushi with my family.",
        "keywords": [
          "like",
          "eat",
          "sushi",
          "family",
          "restaurants",
          "tell",
          "more",
          "usually"
        ]
      }
    ]
  },
  {
    "id": "12",
    "title": "High School Baseball",
    "emoji": "⚾",
    "image": "assets/12_illustration.png",
    "source_url": "https://nicksenglish.com/eiken/interview/eiken_3_interview_high_school_baseball",
    "passage": "One of the biggest sporting events in Japan is a high school baseball competition. Every August, teams from schools across the country play each other. Millions of people enjoy watching it on TV.",
    "passage_q": {
      "q": "Please look at the passage. When do the baseball teams play each other?",
      "a": "They play each other every August.",
      "keywords": [
        "play",
        "each",
        "other",
        "every",
        "august",
        "when",
        "baseball",
        "teams"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. How many baseball players are there?",
        "a": "There are five baseball players.",
        "keywords": [
          "five",
          "baseball",
          "players"
        ]
      },
      {
        "q": "Now, please look at the boy with the red cap. What is he doing?",
        "a": "He is throwing the ball.",
        "keywords": [
          "throwing",
          "ball",
          "boy",
          "red",
          "cap",
          "doing"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "What time do you usually go to bed?",
        "a": "I usually go to bed at 10pm.",
        "keywords": [
          "usually",
          "bed",
          "10",
          "time"
        ]
      },
      {
        "q": "Which do you like better, eating at home or at restaurants? Why?",
        "a": "Eating at home... It's cheaper than eating at restaurants.",
        "keywords": [
          "eating",
          "home",
          "cheaper",
          "than",
          "restaurants",
          "which",
          "like",
          "better"
        ]
      }
    ]
  },
  {
    "id": "13",
    "title": "Computers",
    "emoji": "💻",
    "image": "assets/13_illustration.png",
    "source_url": "https://nicksenglish.com/eiken/interview/eiken_3_interview_computers",
    "passage": "There are many kinds of computers. Some people use them to write reports, and some people use them to get information. People can also watch videos or play games, so they have fun when they use computers.",
    "passage_q": {
      "q": "Please look at the passage. Why do people have fun when they use computers?",
      "a": "Because they can watch videos or play games.",
      "keywords": [
        "because",
        "can",
        "watch",
        "videos",
        "play",
        "games",
        "have",
        "fun"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. What is the woman going to do?",
        "a": "She is going to make lunch.",
        "keywords": [
          "going",
          "make",
          "lunch",
          "woman"
        ]
      },
      {
        "q": "Now, please look at the boy in the yellow shirt. What is he doing?",
        "a": "He is playing a video game.",
        "keywords": [
          "playing",
          "video",
          "game",
          "boy",
          "yellow",
          "shirt",
          "doing"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "What sport do you like the best?",
        "a": "I like soccer the best.",
        "keywords": [
          "like",
          "soccer",
          "best",
          "sport"
        ]
      },
      {
        "q": "Do you do housework every day? Yes / Please tell me more. No / Why not?",
        "a": "Yes... I wash the dishes.",
        "keywords": [
          "wash",
          "dishes",
          "housework",
          "every",
          "day",
          "tell",
          "more",
          "not"
        ]
      }
    ]
  },
  {
    "id": "14",
    "title": "Hiking for Health",
    "emoji": "🥾",
    "image": "assets/14_illustration.png",
    "source_url": "https://nicksenglish.com/eiken/interview/eiken_3_interview_hiking_for_health",
    "passage": "In Japan, many people go hiking for exercise. There are a lot of mountains in Japan, so it is easy to find places to go hiking. After walking in the mountains, people like to relax in hot springs.",
    "passage_q": {
      "q": "Please look at the passage. Why is it easy to find places to go hiking?",
      "a": "Because there are a lot of mountains in Japan.",
      "keywords": [
        "because",
        "lot",
        "mountains",
        "japan",
        "easy",
        "find",
        "places",
        "hiking"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. What is the man with the hat doing?",
        "a": "He is looking at a map.",
        "keywords": [
          "looking",
          "map",
          "man",
          "hat",
          "doing"
        ]
      },
      {
        "q": "Where are the children?",
        "a": "They are under a tree.",
        "keywords": [
          "under",
          "tree",
          "children"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "What did you do yesterday evening?",
        "a": "I did my homework.",
        "keywords": [
          "homework",
          "yesterday",
          "evening"
        ]
      },
      {
        "q": "Do you often use the internet? Yes / Please tell me more. No / Why not?",
        "a": "Yes... I use the internet to watch videos.",
        "keywords": [
          "use",
          "internet",
          "watch",
          "videos",
          "often",
          "tell",
          "more",
          "not"
        ]
      }
    ]
  },
  {
    "id": "15",
    "title": "TV in the Morning",
    "emoji": "📺",
    "image": "assets/15_illustration.png",
    "source_url": "https://nicksenglish.com/eiken/interview/eiken_3_interview_tv_in_the_morning",
    "passage": "Watching TV is a common daily activity. There are many different kinds of TV programs. Because people are busy in the morning, they like to watch the news and weather on TV while eating breakfast.",
    "passage_q": {
      "q": "Please look at the passage. What do people like to watch on TV while eating breakfast?",
      "a": "They like to watch the news and weather.",
      "keywords": [
        "like",
        "watch",
        "news",
        "weather",
        "while",
        "eating",
        "breakfast"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. What does the man have in his hands?",
        "a": "He has a newspaper.",
        "keywords": [
          "has",
          "newspaper",
          "man",
          "have",
          "hands"
        ]
      },
      {
        "q": "Now, please look at the woman. What is she doing?",
        "a": "She is drinking coffee.",
        "keywords": [
          "drinking",
          "coffee",
          "woman",
          "doing"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "What are you going to do this evening?",
        "a": "I'm going to read comic books.",
        "keywords": [
          "going",
          "read",
          "comic",
          "books",
          "evening"
        ]
      },
      {
        "q": "Do you have any brothers or sisters? Yes / Please tell me more. No / What do you like to do in your free time?",
        "a": "Yes... I have one brother. His name is Mark.",
        "keywords": [
          "have",
          "one",
          "brother",
          "name",
          "mark",
          "any",
          "brothers",
          "sisters"
        ]
      }
    ]
  },
  {
    "id": "16",
    "title": "Languages In England",
    "emoji": "🗣️",
    "image": "assets/16_illustration.png",
    "source_url": "https://nicksenglish.com/eiken/interview/eiken_3_interview_languages_in_england",
    "passage": "Almost everybody in England speaks English. Some people speak other languages, too. Children learn French, German or Spanish in school, so those languages are popular. Some people even speak Japanese!",
    "passage_q": {
      "q": "Please look at the passage. Why are French, German and Spanish popular?",
      "a": "Because children learn them in school.",
      "keywords": [
        "because",
        "children",
        "learn",
        "them",
        "school",
        "french",
        "german",
        "spanish"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. What is the boy going to do?",
        "a": "He's going to play soccer.",
        "keywords": [
          "going",
          "play",
          "soccer",
          "boy"
        ]
      },
      {
        "q": "Now, please look at the man with glasses. What is he doing?",
        "a": "He's teaching English.",
        "keywords": [
          "teaching",
          "english",
          "man",
          "glasses",
          "doing"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "What kind of sports do you play?",
        "a": "I like to play basketball.",
        "keywords": [
          "like",
          "play",
          "basketball",
          "kind",
          "sports"
        ]
      },
      {
        "q": "Do you like to play video games? Yes / Why? No / Why not?",
        "a": "Yes... Because it's fun to play video games with my friends.",
        "keywords": [
          "because",
          "fun",
          "play",
          "video",
          "games",
          "friends",
          "like",
          "not"
        ]
      }
    ]
  },
  {
    "id": "17",
    "title": "Skiing and Snowboarding",
    "emoji": "⛷️",
    "image": "assets/17_illustration.png",
    "source_url": "https://nicksenglish.com/eiken/interview/eiken_3_interview_skiing_and_snowboarding",
    "passage": "Skiing is very popular in Japan. There are hundreds of ski resorts in the mountains. Older people enjoy skiing, but most young people like snowboarding. The best time to go skiing is between December and March.",
    "passage_q": {
      "q": "Please look at the passage. When is the best time to go skiing?",
      "a": "The best time is between December and March.",
      "keywords": [
        "best",
        "time",
        "between",
        "december",
        "march",
        "when",
        "skiing"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. How many birds are flying in the sky?",
        "a": "There are five birds.",
        "keywords": [
          "five",
          "birds",
          "flying",
          "sky"
        ]
      },
      {
        "q": "Now, please look at the girl with the pink hat. What is she doing?",
        "a": "She is skiing.",
        "keywords": [
          "skiing",
          "girl",
          "pink",
          "hat",
          "doing"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "What did you do on your summer vacation?",
        "a": "I went to the beach.",
        "keywords": [
          "went",
          "beach",
          "summer",
          "vacation"
        ]
      },
      {
        "q": "Do you often ride a bike? Yes / Please tell me more. No / Why not?",
        "a": "Yes... I ride my bike to school.",
        "keywords": [
          "ride",
          "bike",
          "school",
          "often",
          "tell",
          "more",
          "not"
        ]
      }
    ]
  },
  {
    "id": "18",
    "title": "Cooking Classes",
    "emoji": "🍳",
    "image": "assets/18_illustration.png",
    "source_url": "https://nicksenglish.com/eiken/interview/eiken_3_interview_cooking_classes",
    "passage": "Many people can't cook. They buy dinner from convenience stores or eat at fast food restaurants. Some people want to cook healthy food and save money, so they are taking cooking classes.",
    "passage_q": {
      "q": "Please look at the passage. Why are people taking cooking classes?",
      "a": "Because they want to cook healthy food and save money.",
      "keywords": [
        "because",
        "want",
        "cook",
        "healthy",
        "food",
        "save",
        "money",
        "taking"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. Where is the salad bowl?",
        "a": "It's on the table.",
        "keywords": [
          "table",
          "salad",
          "bowl"
        ]
      },
      {
        "q": "Now, please look at the woman with long hair. What is she doing?",
        "a": "She is cutting carrots.",
        "keywords": [
          "cutting",
          "carrots",
          "woman",
          "long",
          "hair",
          "doing"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "What dessert would you like to eat tonight?",
        "a": "I would like to eat chocolate cake.",
        "keywords": [
          "would",
          "like",
          "eat",
          "chocolate",
          "cake",
          "dessert",
          "tonight"
        ]
      },
      {
        "q": "Do you like to draw pictures? Yes / Please tell me more. No / What do you like to do after school?",
        "a": "Yes... I like to draw pictures of animals.",
        "keywords": [
          "like",
          "draw",
          "pictures",
          "animals",
          "tell",
          "more",
          "after",
          "school"
        ]
      }
    ]
  },
  {
    "id": "19",
    "title": "School Clubs",
    "emoji": "🏫",
    "image": "assets/19_illustration.png",
    "source_url": "https://nicksenglish.com/eiken/interview/eiken_3_interview_school_clubs",
    "passage": "School clubs are popular among Japanese students. Some students like to play baseball after school. Other students like to play musical instruments. People feel good when they enjoy club activities with friends.",
    "passage_q": {
      "q": "Please look at the passage. When do people feel good?",
      "a": "They feel good when they enjoy club activities with friends.",
      "keywords": [
        "feel",
        "good",
        "when",
        "enjoy",
        "club",
        "activities",
        "friends"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. How many people are singing?",
        "a": "Four people are singing.",
        "keywords": [
          "four",
          "singing"
        ]
      },
      {
        "q": "Now, please look at the girl carrying a black case. What is she going to do?",
        "a": "She is going to play the violin.",
        "keywords": [
          "going",
          "play",
          "violin",
          "girl",
          "carrying",
          "black",
          "case"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "What flavor ice cream do you like?",
        "a": "I like strawberry.",
        "keywords": [
          "like",
          "strawberry",
          "flavor",
          "ice",
          "cream"
        ]
      },
      {
        "q": "Which do you like better, watching TV or listening to music? Why?",
        "a": "Watching TV... I like to watch anime.",
        "keywords": [
          "watching",
          "like",
          "watch",
          "anime",
          "which",
          "better",
          "listening",
          "music"
        ]
      }
    ]
  },
  {
    "id": "20",
    "title": "The Louvre Art Museum",
    "emoji": "🖼️",
    "image": "assets/20_illustration.png",
    "source_url": "https://nicksenglish.com/eiken/interview/eiken_3_interview_the_louvre_art_museum",
    "passage": "The largest art museum in the world is the Louvre in Paris. It has thousands of paintings including the Mona Lisa. The Louvre is in the center of the city, so it is easy for people to visit.",
    "passage_q": {
      "q": "Please look at the passage. Why is the Louvre easy for people to visit?",
      "a": "Because it is in the center of the city.",
      "keywords": [
        "because",
        "center",
        "city",
        "louvre",
        "easy",
        "visit"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. What is the woman with the backpack doing?",
        "a": "She is taking a photo.",
        "keywords": [
          "taking",
          "photo",
          "woman",
          "backpack",
          "doing"
        ]
      },
      {
        "q": "Now, please look at the boy. Where is he going?",
        "a": "He is going to the toilet.",
        "keywords": [
          "going",
          "toilet",
          "boy"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "What country would you like to go to?",
        "a": "I would like to go to Italy.",
        "keywords": [
          "would",
          "like",
          "italy",
          "country"
        ]
      },
      {
        "q": "Do you like to draw pictures? Yes / Please tell me more. No / What hobbies do you have?",
        "a": "Yes... I like to draw pictures of animals.",
        "keywords": [
          "like",
          "draw",
          "pictures",
          "animals",
          "tell",
          "more",
          "hobbies",
          "have"
        ]
      }
    ]
  },
  {
    "id": "21",
    "title": "Christmas in Lapland",
    "emoji": "🎄",
    "image": "assets/21_illustration.png",
    "source_url": "https://nicksenglish.com/eiken/interview/eiken_3_interview_christmas_in_lapland",
    "passage": "Lapland is a place in Finland. Every year, people travel to Lapland to experience Christmas. There are snowmen, reindeer and Christmas trees. Because it is the home of Santa Claus, children are excited to go there.",
    "passage_q": {
      "q": "Please look at the passage. Why are children excited to go to Lapland?",
      "a": "Because it is the home of Santa Claus.",
      "keywords": [
        "because",
        "home",
        "santa",
        "claus",
        "children",
        "excited",
        "lapland"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the picture. What are the boys doing?",
        "a": "They are throwing snowballs.",
        "keywords": [
          "throwing",
          "snowballs",
          "boys",
          "doing"
        ]
      },
      {
        "q": "Now, please look at the girl. What is she going to do?",
        "a": "She is going to make a snowman.",
        "keywords": [
          "going",
          "make",
          "snowman",
          "girl"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "What do you want for Christmas?",
        "a": "I want a new video game.",
        "keywords": [
          "want",
          "new",
          "video",
          "game",
          "christmas"
        ]
      },
      {
        "q": "Which do you like better, Halloween or Christmas? Why?",
        "a": "I like Christmas because I can eat cake.",
        "keywords": [
          "like",
          "christmas",
          "because",
          "can",
          "eat",
          "cake",
          "which",
          "better"
        ]
      }
    ]
  }
];

// ── STATE ──────────────────────────────────────────────
const S = {
  setId: null, answers: [], transcript: '',
  recognition: null, isListening: false,
  timer: null, timeLeft: 0, timerActive: false,
  voices: [], voice: null, rate: 0.85,
  showQuestionText: true  // 質問文の画面表示 ON/OFF
};

// ── UTILITIES ──────────────────────────────────────────
function $(id) { return document.getElementById(id); }
function getSet() { return QUESTION_SETS.find(s => s.id === S.setId); }
function render(html) { $('app').innerHTML = html; }
function esc(s) { return String(s).replace(/'/g, "\\'"); }

// ── INIT ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadVoices();
  if (speechSynthesis) speechSynthesis.onvoiceschanged = loadVoices;
  showMenu();
});

// ── VOICES ─────────────────────────────────────────────
function loadVoices() {
  S.voices = speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
  const sel = $('voice-select');
  if (!sel) return;
  sel.innerHTML = '';
  S.voices.forEach((v, i) => {
    const o = document.createElement('option');
    o.value = i; o.textContent = v.name + ' (' + v.lang + ')';
    sel.appendChild(o);
  });
  const gi = S.voices.findIndex(v => v.name.includes('Google') && v.lang === 'en-US');
  if (gi >= 0) { sel.value = gi; S.voice = S.voices[gi]; }
  else if (S.voices.length > 0) { sel.value = 0; S.voice = S.voices[0]; }
}
function onVoiceChange() {
  const sel = $('voice-select');
  if (sel && S.voices[sel.value]) { S.voice = S.voices[sel.value]; speak('Hello.'); }
}
function onRateChange(v) {
  S.rate = parseFloat(v);
  const el = $('rate-value'); if (el) el.textContent = v;
}
function onQTextToggle(checked) {
  S.showQuestionText = checked;
  const st = $('qtext-status');
  if (st) st.textContent = checked ? 'ON（練習モード）' : 'OFF（本番モード）';
}

// ── TTS ────────────────────────────────────────────────
function speak(text, onEnd) {
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US'; u.rate = S.rate;
  if (S.voice) u.voice = S.voice;
  const fb = setTimeout(() => { if (onEnd) { onEnd(); onEnd = null; } }, 15000);
  u.onend = () => { clearTimeout(fb); if (onEnd) { onEnd(); onEnd = null; } };
  u.onerror = () => { clearTimeout(fb); if (onEnd) { onEnd(); onEnd = null; } };
  speechSynthesis.speak(u);
}

// ── MICROPHONE PERMISSION (1回だけ許可 → 以降ダイアログなし) ──
S.micStream = null;

async function ensureMicPermission() {
  if (S.micStream) return true;
  try {
    S.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch(e) {
    console.warn('Mic permission denied:', e);
    return false;
  }
}

// ── SPEECH RECOGNITION ─────────────────────────────────
// continuous=true で音読などの長時間録音に対応（停止→自動再開）
S._continuous = false;
S._finalT = '';
S._userStopped = false;

function startListening(onResult, continuous) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { showTextInput(onResult); return; }
  if (S.recognition) { try { S.recognition.stop(); } catch(e){} }

  S._continuous = !!continuous;
  S._finalT = '';
  S._userStopped = false;

  function createRec() {
    const r = new SR();
    r.lang = 'en-US'; r.continuous = S._continuous; r.interimResults = true; r.maxAlternatives = 1;

    r.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) S._finalT += t + ' '; else interim += t;
      }
      const el = $('interim-text');
      if (el) el.textContent = S._finalT + interim;
    };
    r.onerror = (e) => {
      if (e.error === 'no-speech') {
        // 連続モードでは無音は正常（無視して再開）
      } else if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        S._userStopped = true; S.isListening = false; micBtn(false);
        toast('マイクを許可してください'); showTextInput(onResult);
      }
    };
    r.onend = () => {
      // ユーザーが明示的に停止ボタンを押した → 確定
      if (S._userStopped) {
        S.isListening = false; micBtn(false);
        if (S._finalT.trim()) { S.transcript = S._finalT.trim(); onResult(S._finalT.trim()); }
        return;
      }
      // 連続モードでまだ録音中 → 自動再開（Chromeの~60秒タイムアウト対策）
      if (S._continuous && S.isListening) {
        try { r.start(); } catch(e) {
          // 再開失敗時は確定
          S.isListening = false; micBtn(false);
          if (S._finalT.trim()) { S.transcript = S._finalT.trim(); onResult(S._finalT.trim()); }
        }
      } else {
        // 通常モード: そのまま確定
        S.isListening = false; micBtn(false);
        if (S._finalT.trim()) { S.transcript = S._finalT.trim(); onResult(S._finalT.trim()); }
      }
    };
    return r;
  }

  S.recognition = createRec(); S.isListening = true; S._userStopped = false; micBtn(true);
  try { S.recognition.start(); } catch(e) { S.isListening = false; micBtn(false); }
}
function stopListening() {
  S._userStopped = true;
  if (S.recognition) { try { S.recognition.stop(); } catch(e){} }
  S.isListening = false; micBtn(false);
}
function micBtn(rec) {
  const b = $('mic-btn');
  if (!b) return;
  b.textContent = rec ? '⏹ 録音を止める' : '🎤 答える';
  b.className = rec ? 'btn-mic-rec' : 'btn-mic';
}
function showTextInput(onSubmit) {
  if ($('text-fallback')) return;
  const area = $('answer-area'); if (!area) return;
  const d = document.createElement('div');
  d.id = 'text-fallback'; d.style.marginTop = '10px';
  d.innerHTML = '<input type="text" id="text-answer" placeholder="Type in English" style="width:60%;padding:10px;font-size:18px;border-radius:8px;border:2px solid #6C7EE6;background:#1a1a2e;color:#fff">' +
    '<button onclick="submitText()" style="padding:10px 20px;margin-left:8px;background:#6C7EE6;color:#fff;border:none;border-radius:8px;cursor:pointer">送信</button>';
  area.appendChild(d);
  $('text-answer').focus();
  window._textCb = onSubmit;
}
function submitText() {
  const inp = $('text-answer');
  if (!inp || !inp.value.trim()) return;
  S.transcript = inp.value.trim();
  window._textCb(inp.value.trim());
}

// ── TIMER (guide only, no auto-advance) ────────────────
function startTimerGuide(sec) {
  stopTimer(); S.timeLeft = sec; S.timerActive = true; updateTimer();
  S.timer = setInterval(() => {
    S.timeLeft--; updateTimer();
    if (S.timeLeft <= 0) {
      stopTimer();
      // ガイドタイマー：0になったら表示を変えるだけ。強制遷移しない。
      const el = $('timer');
      if (el) { el.textContent = '⏱ 時間の目安です'; el.style.color = '#ff9800'; }
    }
  }, 1000);
}
// 黙読だけは強制遷移あり（公式通り20秒）
function startTimerStrict(sec, onEnd) {
  stopTimer(); S.timeLeft = sec; S.timerActive = true; updateTimer();
  S.timer = setInterval(() => {
    S.timeLeft--; updateTimer();
    if (S.timeLeft <= 0) { stopTimer(); if (onEnd) onEnd(); }
  }, 1000);
}
function stopTimer() { if (S.timer) { clearInterval(S.timer); S.timer = null; } S.timerActive = false; }
function updateTimer() {
  const el = $('timer');
  if (!el) return;
  el.textContent = '⏱ ' + S.timeLeft + 's';
  el.style.color = S.timeLeft <= 5 ? '#ff4444' : S.timeLeft <= 15 ? '#ff9800' : '#4CAF50';
}

// ── UI HELPERS ─────────────────────────────────────────
function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
function bar(pct) { return '<div class="bar"><div class="fill" style="width:' + pct + '%"></div></div>'; }
function illustHtml(set) {
  return '<div class="illust-box">' +
    '<img src="' + set.image + '" alt="Illustration" class="illust-img" ' +
    'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
    '<div class="illust-placeholder" style="display:none">' +
    '<span style="font-size:48px">🖼️</span>' +
    '<p>画像を配置してください</p>' +
    '<p class="path">' + set.image + '</p></div></div>';
}

// 質問文を表示するか（本番モードでは非表示、音声のみ）
function qtextHtml(q) {
  return S.showQuestionText ? '<p class="qtext">' + q.q + '</p>' : '<p class="qtext-hidden">🔊 耳をすませて問題を聞いてください</p>';
}

// ============================================================
//  SCREEN: MENU
// ============================================================
function showMenu() {
  stopTimer(); stopListening(); S.answers = [];
  let cards = '';
  QUESTION_SETS.forEach(s => {
    cards += '<div class="set-card" onclick="startTest(\'' + s.id + '\')">' +
      '<div class="set-emoji">' + s.emoji + '</div>' +
      '<div class="set-title">' + s.title + '</div>' +
      '<div class="set-info">音読 + 5 Questions</div></div>';
  });
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  render(
    '<div class="screen">' +
    '<h1>🎓 英検3級<br>Speaking Simulator</h1>' +
    '<div class="settings">' +
    '<label>🔊 Voice: <select id="voice-select" onchange="onVoiceChange()"></select></label>' +
    '<label>🐢 Speed: <input type="range" id="rate-slider" min="0.5" max="1.2" step="0.05" value="0.85" onchange="onRateChange(this.value)"> <span id="rate-value">0.85</span></label>' +
    '</div>' +
    '<div class="toggle-row">' +
    '<span class="toggle-label">📝 質問文を画面に表示</span>' +
    '<label class="switch"><input type="checkbox" id="qtext-toggle" onchange="onQTextToggle(this.checked)" checked><span class="slider"></span></label>' +
    '<span id="qtext-status" class="toggle-status">ON（練習モード）</span>' +
    '</div>' +
    (SR ? '' : '<div class="warn">⚠️ Chrome推奨。他ブラウザはテキスト入力になります。</div>') +
    '<p class="hint">問題セットをえらんでね👇</p>' +
    '<div class="grid">' + cards + '</div>' +
    '</div>'
  );
  loadVoices();
}

// ============================================================
//  STAGE 1: WARMUP (採点なし)
// ============================================================
function startTest(id) {
  S.setId = id; S.answers = [];
  // マイク許可をバックグラウンドで開始（awaitしない＝TTSのジェスチャーチェーンを維持）
  // ユーザーがウォーミングアップ音声を聞いている間に許可ダイアログが出る
  ensureMicPermission().catch(() => {});
  showWarmup();
}

function showWarmup() {
  render(
    bar(5) +
    '<div class="screen">' +
    '<div class="label">😊 ウォーミングアップ</div>' +
    '<div class="bubble" id="warmup-text"></div>' +
    '<div id="answer-area"><div id="interim-text" class="interim"></div>' +
    '<button class="btn-mic" id="mic-btn" onclick="micWarmup()">🎤 答える</button></div>' +
    '<button class="btn-go" id="next-btn" style="display:none" onclick="showGreeting()">次へ →</button></div>'
  );
  const greet = "Hello. How are you today?";
  let i = 0;
  const el = $('warmup-text');
  const typer = setInterval(() => {
    if (i < greet.length) { el.textContent += greet[i]; i++; } else clearInterval(typer);
  }, 40);
  speak(greet);
  S.warmupDone = false;
}

function micWarmup() {
  if (S.isListening) {
    stopListening();
    if (S.transcript) {
      S.answers.push({type:'warmup', q:'How are you today?', a:S.transcript});
      toast('✅ OK! リラックスしてね😊');
      $('next-btn').style.display = 'block';
    }
  } else {
    S.transcript = '';
    startListening((t) => {
      S.answers.push({type:'warmup', q:'How are you today?', a:t});
      toast('✅ OK! リラックスしてね😊');
      $('next-btn').style.display = 'block';
    });
  }
}

// ============================================================
//  STAGE 2: GREETING + SILENT READING (20秒・強制遷移)
// ============================================================
function showGreeting() {
  stopListening();
  const s = getSet();
  render(
    bar(10) +
    '<div class="screen">' +
    '<div class="big-emoji">' + s.emoji + '</div>' +
    '<h2>' + s.title + '</h2>' +
    '<div class="bubble" id="greeting-text"></div>' +
    '<button class="btn-go" id="go-btn" style="display:none" onclick="showSilentReading()">問題文を見る →</button></div>'
  );
  const msg = "Now, here is your passage. Please read it silently for twenty seconds.";
  let i = 0;
  const el = $('greeting-text');
  const typer = setInterval(() => {
    if (i < msg.length) { el.textContent += msg[i]; i++; } else clearInterval(typer);
  }, 35);
  speak(msg, () => { const b = $('go-btn'); if (b) b.style.display = 'block'; });
  setTimeout(() => { const b = $('go-btn'); if (b) b.style.display = 'block'; }, 8000);
}

function showSilentReading() {
  const s = getSet();
  render(
    bar(15) +
    '<div class="screen">' +
    '<div class="label">📖 黙読 (20秒)</div>' +
    '<div id="timer">⏱ 20s</div>' +
    '<div class="passage">' + s.passage + '</div>' +
    illustHtml(s) +
    '<p class="hint">📝 声に出さずに読んでください</p></div>'
  );
  startTimerStrict(20, () => showReadingAloud());
}

// ============================================================
//  STAGE 3: READING ALOUD (タイマーなし・ボタンで次へ)
// ============================================================
function showReadingAloud() {
  const s = getSet();
  render(
    bar(25) +
    '<div class="screen">' +
    '<div class="label">🎤 音読 — 声に出して読んで</div>' +
    '<div class="passage">' + s.passage + '</div>' +
    illustHtml(s) +
    '<div id="answer-area"><div id="interim-text" class="interim"></div>' +
    '<button class="btn-mic" id="mic-btn" onclick="micReading()">🎤 音読する</button></div>' +
    '<button class="btn-go" onclick="goQ1()">読み終わった！次へ →</button></div>'
  );
  speak('Now, please read the passage aloud.');
}

function micReading() {
  if (S.isListening) {
    stopListening();
    if (S.transcript) {
      S.answers.push({type:'reading', q:'(Reading)', a:S.transcript});
      toast('✅ 音読を記録');
    }
  } else {
    S.transcript = '';
    startListening((t) => {
      S.answers.push({type:'reading', q:'(Reading)', a:t});
      toast('✅ 音読を記録');
    }, true); // ← 連続モード: 長時間録音ON
  }
}

// ============================================================
//  STAGE 4: Q1 — Passage Question
// ============================================================
function goQ1() {
  stopListening();
  const s = getSet();
  const q = s.passage_q;
  render(
    bar(35) +
    '<div class="screen">' +
    '<div class="label">📝 質問 1 / 5 — パッセージ</div>' +
    '<div id="timer">⏱ 40s</div>' +
    '<div class="qbox">' + qtextHtml(q) +
    '<button class="btn-replay" onclick="speak(getSet().passage_q.q)">🔊 もう一度聞く</button></div>' +
    '<div id="answer-area"><div id="interim-text" class="interim"></div>' +
    '<button class="btn-mic" id="mic-btn" onclick="micQ(\'passage\',0)">🎤 答える</button></div>' +
    '<button class="btn-skip" onclick="skipQ(\'passage\',0)">スキップ →</button></div>'
  );
  speak(q.q);
  startTimerGuide(40);
}

// ============================================================
//  STAGE 5: Q2-Q3 — Illustration Questions
// ============================================================
function goQ2() {
  stopListening();
  const s = getSet();
  const q = s.illustration_qs[0];
  render(
    bar(45) +
    '<div class="screen">' +
    '<div class="label">🖼️ 質問 2 / 5 — イラスト</div>' +
    '<div id="timer">⏱ 40s</div>' +
    illustHtml(s) +
    '<div class="qbox">' + qtextHtml(q) +
    '<button class="btn-replay" onclick="speak(getSet().illustration_qs[0].q)">🔊 もう一度聞く</button></div>' +
    '<div id="answer-area"><div id="interim-text" class="interim"></div>' +
    '<button class="btn-mic" id="mic-btn" onclick="micQ(\'illust\',0)">🎤 答える</button></div>' +
    '<button class="btn-skip" onclick="skipQ(\'illust\',0)">スキップ →</button></div>'
  );
  speak(q.q);
  startTimerGuide(40);
}

function goQ3() {
  stopListening();
  const s = getSet();
  const q = s.illustration_qs[1];
  render(
    bar(55) +
    '<div class="screen">' +
    '<div class="label">🖼️ 質問 3 / 5 — イラスト</div>' +
    '<div id="timer">⏱ 40s</div>' +
    illustHtml(s) +
    '<div class="qbox">' + qtextHtml(q) +
    '<button class="btn-replay" onclick="speak(getSet().illustration_qs[1].q)">🔊 もう一度聞く</button></div>' +
    '<div id="answer-area"><div id="interim-text" class="interim"></div>' +
    '<button class="btn-mic" id="mic-btn" onclick="micQ(\'illust\',1)">🎤 答える</button></div>' +
    '<button class="btn-skip" onclick="skipQ(\'illust\',1)">スキップ →</button></div>'
  );
  speak(q.q);
  startTimerGuide(40);
}

// ============================================================
//  CARD FLIP (Q3 → Q4)
// ============================================================
function showCardFlip(afterFn) {
  stopListening(); stopTimer();
  render(
    bar(65) +
    '<div class="screen card-flip">' +
    '<div class="big-emoji">🔄</div>' +
    '<h2>問題カードを裏返してください</h2>' +
    '<div class="bubble">ここから先は問題カードを見ずに答えてください。</div>' +
    '<button class="btn-go" onclick="' + (afterFn.name || 'goQ4') + '()">次へ →</button></div>'
  );
  speak('Please turn over the card.');
}

// ============================================================
//  STAGE 6: Q4-Q5 — Personal Questions
// ============================================================
function goQ4() {
  stopListening();
  const s = getSet();
  const q = s.personal_qs[0];
  render(
    bar(75) +
    '<div class="screen">' +
    '<div class="label">🙋 質問 4 / 5 — あなたのこと</div>' +
    '<div id="timer">⏱ 40s</div>' +
    '<div class="qbox">' + qtextHtml(q) +
    '<button class="btn-replay" onclick="speak(getSet().personal_qs[0].q)">🔊 もう一度聞く</button></div>' +
    '<div id="answer-area"><div id="interim-text" class="interim"></div>' +
    '<button class="btn-mic" id="mic-btn" onclick="micQ(\'personal\',0)">🎤 答える</button></div>' +
    '<button class="btn-skip" onclick="skipQ(\'personal\',0)">スキップ →</button></div>'
  );
  speak(q.q);
  startTimerGuide(40);
}

function goQ5() {
  stopListening();
  const s = getSet();
  const q = s.personal_qs[1];
  render(
    bar(90) +
    '<div class="screen">' +
    '<div class="label">🙋 質問 5 / 5 — あなたのこと</div>' +
    '<div id="timer">⏱ 40s</div>' +
    '<div class="qbox">' + qtextHtml(q) +
    '<button class="btn-replay" onclick="speak(getSet().personal_qs[1].q)">🔊 もう一度聞く</button></div>' +
    '<div id="answer-area"><div id="interim-text" class="interim"></div>' +
    '<button class="btn-mic" id="mic-btn" onclick="micQ(\'personal\',1)">🎤 答える</button></div>' +
    '<button class="btn-skip" onclick="skipQ(\'personal\',1)">スキップ →</button></div>'
  );
  speak(q.q);
  startTimerGuide(40);
}

// ============================================================
//  MIC/SKIP — Universal Q handler
// ============================================================
function micQ(cat, idx) {
  if (S.isListening) {
    stopListening();
    if (S.transcript) submitQ(cat, idx, S.transcript);
  } else {
    S.transcript = '';
    startListening((t) => submitQ(cat, idx, t));
  }
}

function submitQ(cat, idx, text) {
  S.answers.push({type:'q', cat:cat, idx:idx, a:text});
  toast('✅ 回答記録');
  advanceQ(cat, idx);
}

function skipQ(cat, idx) {
  stopListening(); stopTimer();
  S.answers.push({type:'q', cat:cat, idx:idx, a:'(スキップ)'});
  advanceQ(cat, idx);
}

function advanceQ(cat, idx) {
  stopTimer();
  // 少し待ってから次へ
  setTimeout(() => {
    if (cat === 'passage')      goQ2();
    else if (cat === 'illust' && idx === 0) goQ3();
    else if (cat === 'illust' && idx === 1) showCardFlip(goQ4);
    else if (cat === 'personal' && idx === 0) goQ5();
    else if (cat === 'personal' && idx === 1) showResults();
  }, 700);
}

// ============================================================
//  RESULTS
// ============================================================
function score(userAns, keywords) {
  if (!userAns || userAns === '(スキップ)') return {stars:0, hit:[], miss:keywords};
  const ul = userAns.toLowerCase();
  const hit = [], miss = [];
  keywords.forEach(k => { ul.includes(k.toLowerCase()) ? hit.push(k) : miss.push(k); });
  const ks = keywords.length > 0 ? hit.length / keywords.length : 0;
  const wc = Math.min(userAns.split(/\s+/).filter(w=>w).length / 4, 1);
  const total = ks * 0.65 + wc * 0.35;
  const stars = total >= 0.6 ? 3 : total >= 0.35 ? 2 : total > 0 ? 1 : 0;
  return {stars, hit, miss};
}

function showResults() {
  const s = getSet(); stopTimer(); stopListening();
  let total = 0, max = 0, html = '';

  html += bar(100) + '<div class="screen"><h2>🏆 結果</h2>';

  // Reading (informational, not scored in stars)
  const rd = S.answers.find(a => a.type==='reading');
  const rua = rd ? rd.a : '(未記録)';
  const rwc = rua === '(未記録)' ? 0 : Math.min(rua.split(/\s+/).filter(w=>w).length, s.passage.split(/\s+/).length);
  const rPct = s.passage.split(/\s+/).length > 0 ? Math.round(rwc / s.passage.split(/\s+/).length * 100) : 0;
  html += '<div class="rsection"><h3>📖 音読</h3>' +
    '<div class="rcard ' + (rPct >= 70 ? 'good' : rPct >= 40 ? 'ok' : 'bad') + '">' +
    '<div class="rua">あなた: ' + (rua.length > 80 ? rua.substring(0,80) + '...' : rua) + '</div>' +
    '<div class="rhit">読めた単語数: ' + rwc + ' / ' + s.passage.split(/\s+/).length + ' (' + rPct + '%)</div></div></div>';

  // All 5 questions
  const allQ = [
    {label:'Q1 (パッセージ)', q:s.passage_q, cat:'passage', idx:0},
    {label:'Q2 (イラスト)', q:s.illustration_qs[0], cat:'illust', idx:0},
    {label:'Q3 (イラスト)', q:s.illustration_qs[1], cat:'illust', idx:1},
    {label:'Q4 (あなたのこと)', q:s.personal_qs[0], cat:'personal', idx:0},
    {label:'Q5 (あなたのこと)', q:s.personal_qs[1], cat:'personal', idx:1}
  ];

  html += '<div class="rsection"><h3>📝 質問への回答</h3>';
  allQ.forEach(item => {
    const ans = S.answers.find(a => a.type==='q' && a.cat===item.cat && a.idx===item.idx);
    const ua = ans ? ans.a : '(未回答)';
    const sc = score(ua, item.q.keywords);
    total += sc.stars; max += 3;
    const cls = sc.stars >= 2 ? 'good' : sc.stars >= 1 ? 'ok' : 'bad';
    html += '<div class="rcard ' + cls + '">' +
      '<div class="rq">' + item.label + '</div>' +
      '<div class="rqtext">' + item.q.q + '</div>' +
      '<div class="rstars">' + '⭐'.repeat(sc.stars) + '☆'.repeat(3-sc.stars) + '</div>' +
      '<div class="rua">あなた: ' + ua + '</div>' +
      '<div class="rma">模範: ' + item.q.a + '</div>' +
      (sc.hit.length ? '<div class="rhit">✅ ' + sc.hit.join(', ') + '</div>' : '') +
      (sc.miss.length ? '<div class="rmiss">💡 ' + sc.miss.join(', ') + '</div>' : '') +
      '</div>';
  });
  html += '</div>';

  // Total
  const pct = max > 0 ? Math.round(total / max * 100) : 0;
  const grade = pct >= 80 ? '素晴らしい！🎉' : pct >= 60 ? 'よくできました！👍' : pct >= 40 ? 'もう少し練習 💪' : 'がんばろう！📚';
  html += '<div class="total"><div class="tnum">' + total + ' / ' + max + '</div>' +
    '<div class="tpct">' + pct + '%</div><div class="tgrade">' + grade + '</div></div>' +
    '<button class="btn-go" onclick="showMenu()">メニューに戻る</button></div>';

  render(html);
}
