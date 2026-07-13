'use strict';

// ============================================================
// 英検3級 Speaking Simulator v2
// 公式の二次試験フローに準拠:
//   挨拶→黙読(20秒)→音読→Q1(パッセージ)→Q2-Q3(イラスト)
//   →カード裏返し→Q4-Q5(自分のこと)→採点
// ============================================================

// ── 問題データ ──────────────────────────────────────────
const QUESTION_SETS_3 = [
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
},
{
  "id": "22",
  "title": "Chorus Contests",
  "emoji": "🎵",
  "image": "assets/22_illustration.jpg",
  "passage": "Chorus contests are often held for junior high school students. Some students want to win first prize, so they practice singing together for many days. These contests help students to learn about teamwork.",
  "passage_q": {
    "q": "Why do some students practice singing together for many days?",
    "a": "Because they want to win first prize.",
    "keywords": [
      "win",
      "first",
      "prize"
    ]
  },
  "illustration_qs": [
    {
      "q": "Now, please look at the picture. How many people are wearing school uniforms?",
      "a": "Two people are wearing school uniforms.",
      "keywords": [
        "two",
        "2",
        "uniform"
      ]
    },
    {
      "q": "Please look at the woman wearing a helmet. What is she doing?",
      "a": "She's riding a bike.",
      "keywords": [
        "riding",
        "bike",
        "bicycle"
      ]
    }
  ],
  "personal_qs": [
    {
      "q": "What do you like to have for breakfast?",
      "a": "I like to have some eggs.",
      "keywords": [
        "eggs",
        "bread",
        "rice",
        "breakfast"
      ]
    },
    {
      "q": "Do you like to visit science museums?",
      "a": "Yes, I do. / No, I don't.",
      "keywords": [
        "yes",
        "no",
        "science",
        "museum",
        "learn"
      ]
    }
  ]
},
{
  "id": "23",
  "title": "Dance Lessons",
  "emoji": "💃",
  "image": "assets/23_illustration.jpg",
  "passage": "Dancing is popular among children. Children in Japan often learn how to do traditional Japanese dances at school. Some people want to take part in dance competitions, so they take lessons at dance schools.",
  "passage_q": {
    "q": "Why do some people take lessons at dance schools?",
    "a": "Because they want to take part in dance competitions.",
    "keywords": [
      "take",
      "part",
      "dance",
      "competitions"
    ]
  },
  "illustration_qs": [
    {
      "q": "Now, please look at the picture. What is the man wearing a hat holding?",
      "a": "He's holding a cat.",
      "keywords": [
        "holding",
        "cat"
      ]
    },
    {
      "q": "Please look at the girl with long hair. What is she going to do?",
      "a": "She's going to throw the ball.",
      "keywords": [
        "throw",
        "ball"
      ]
    }
  ],
  "personal_qs": [
    {
      "q": "What are you planning to do this summer?",
      "a": "I'm planning to go to a concert.",
      "keywords": [
        "planning",
        "summer",
        "go",
        "visit",
        "concert"
      ]
    },
    {
      "q": "Have you ever been to a zoo?",
      "a": "Yes, I have. / No, I haven't.",
      "keywords": [
        "yes",
        "no",
        "zoo",
        "animals"
      ]
    }
  ]
},
{
  "id": "24",
  "title": "Swimming",
  "emoji": "🏊",
  "image": "assets/24_illustration.jpg",
  "passage": "In Japan, most children learn to swim in elementary school. Some children are very fast swimmers, so they like to take part in swimming races. Swimming is an excellent way for people to stay healthy.",
  "passage_q": {
    "q": "Why do some children like to take part in swimming races?",
    "a": "Because they are very fast swimmers.",
    "keywords": [
      "fast",
      "swimmers",
      "races"
    ]
  },
  "illustration_qs": [
    {
      "q": "Now, please look at the picture. How many people are holding umbrellas?",
      "a": "Two people are holding umbrellas.",
      "keywords": [
        "two",
        "2",
        "umbrellas"
      ]
    },
    {
      "q": "Please look at the boy wearing a cap. What is he doing?",
      "a": "He's getting on a bus.",
      "keywords": [
        "getting",
        "on",
        "bus"
      ]
    }
  ],
  "personal_qs": [
    {
      "q": "What are you going to do tomorrow?",
      "a": "I'm going to visit my uncle.",
      "keywords": [
        "tomorrow",
        "going",
        "visit",
        "do"
      ]
    },
    {
      "q": "Do you often go to a movie theater?",
      "a": "Yes, I do. / No, I don't.",
      "keywords": [
        "yes",
        "no",
        "movie",
        "theater",
        "cinema"
      ]
    }
  ]
},
{
  "id": "25",
  "title": "Vegetable Juice",
  "emoji": "🥕",
  "image": "assets/25_illustration.jpg",
  "passage": "Vegetable juice is sold in many supermarkets. It can be made with different vegetables, such as carrots. Some people like making healthy drinks at home, so they learn how to make vegetable juice.",
  "passage_q": {
    "q": "Why do some people learn how to make vegetable juice?",
    "a": "Because they like making healthy drinks at home.",
    "keywords": [
      "healthy",
      "drinks",
      "home",
      "make"
    ]
  },
  "illustration_qs": [
    {
      "q": "Now, please look at the picture. How many bags is the man holding?",
      "a": "He's holding two bags.",
      "keywords": [
        "two",
        "2",
        "bags"
      ]
    },
    {
      "q": "Please look at the girl wearing a cap. What is she going to do?",
      "a": "She's going to buy some sandwiches.",
      "keywords": [
        "buy",
        "sandwiches",
        "juice",
        "drink"
      ]
    }
  ],
  "personal_qs": [
    {
      "q": "What did you do last Sunday?",
      "a": "I went to an amusement park.",
      "keywords": [
        "sunday",
        "went",
        "park",
        "did"
      ]
    },
    {
      "q": "Do you like to go to the library?",
      "a": "Yes, I do. / No, I don't.",
      "keywords": [
        "yes",
        "no",
        "library",
        "study",
        "read",
        "books"
      ]
    }
  ]
},
{
  "id": "26",
  "title": "London",
  "emoji": "🎡",
  "image": "assets/26_illustration.jpg",
  "passage": "London is a large city in England. It is famous for its old buildings and beautiful parks. Many people are interested in art or history, so they enjoy going to museums when they visit London.",
  "passage_q": {
    "q": "Why do many people enjoy going to museums when they visit London?",
    "a": "Because they are interested in art or history.",
    "keywords": [
      "interested",
      "art",
      "history",
      "museums"
    ]
  },
  "illustration_qs": [
    {
      "q": "Now, please look at the picture. How many people are sitting on the sofa?",
      "a": "Three people are sitting on the sofa.",
      "keywords": [
        "three",
        "3",
        "sofa"
      ]
    },
    {
      "q": "Please look at the man. What is he going to do?",
      "a": "He's going to cut some bread.",
      "keywords": [
        "cut",
        "bread",
        "slice"
      ]
    }
  ],
  "personal_qs": [
    {
      "q": "What are you planning to do this spring?",
      "a": "I'm planning to see my cousins.",
      "keywords": [
        "planning",
        "spring",
        "see",
        "visit",
        "cousins"
      ]
    },
    {
      "q": "Do you like to eat at restaurants?",
      "a": "Yes, I do. / No, I don't.",
      "keywords": [
        "yes",
        "no",
        "restaurants",
        "eat",
        "food"
      ]
    }
  ]
},
{
  "id": "27",
  "title": "Baseball Caps",
  "emoji": "⚾",
  "image": "assets/27_illustration.jpg",
  "passage": "Baseball caps are popular in Japan. Baseball fans often wear them at stadiums when they watch their favorite teams. Some people worry about strong sunlight, so they wear baseball caps on hot summer days.",
  "passage_q": {
    "q": "Why do some people wear baseball caps on hot summer days?",
    "a": "Because they worry about strong sunlight.",
    "keywords": [
      "worry",
      "strong",
      "sunlight",
      "sun"
    ]
  },
  "illustration_qs": [
    {
      "q": "Now, please look at the picture. How many people are sitting under the tree?",
      "a": "Two people are sitting under the tree.",
      "keywords": [
        "two",
        "2",
        "tree",
        "sitting"
      ]
    },
    {
      "q": "Please look at the girl with long hair. What is she going to do?",
      "a": "She's going to throw the ball.",
      "keywords": [
        "throw",
        "ball"
      ]
    }
  ],
  "personal_qs": [
    {
      "q": "What time do you usually go to bed?",
      "a": "I go to bed at ten.",
      "keywords": [
        "time",
        "bed",
        "sleep",
        "ten",
        "eleven",
        "twelve"
      ]
    },
    {
      "q": "Have you ever been to a zoo?",
      "a": "Yes, I have. / No, I haven't.",
      "keywords": [
        "yes",
        "no",
        "zoo",
        "animals"
      ]
    }
  ]
},
{
  "id": "28",
  "title": "Flower Shops",
  "emoji": "🌸",
  "image": "assets/28_illustration.jpg",
  "passage": "There are many flower shops in Japan. They sell different types of colorful flowers. Many people like to keep beautiful flowers in their homes, so they go shopping for flowers each season.",
  "passage_q": {
    "q": "Why do many people go shopping for flowers each season?",
    "a": "Because they like to keep beautiful flowers in their homes.",
    "keywords": [
      "keep",
      "beautiful",
      "flowers",
      "homes"
    ]
  },
  "illustration_qs": [
    {
      "q": "Now, please look at the picture. Where is the cat?",
      "a": "It's on the chair.",
      "keywords": [
        "chair",
        "on",
        "cat"
      ]
    },
    {
      "q": "Please look at the woman with long hair. What is she going to do?",
      "a": "She's going to open a box.",
      "keywords": [
        "open",
        "box"
      ]
    }
  ],
  "personal_qs": [
    {
      "q": "What time do you usually get up on weekdays?",
      "a": "I get up at seven.",
      "keywords": [
        "time",
        "get",
        "up",
        "seven",
        "six",
        "eight"
      ]
    },
    {
      "q": "Are you a student?",
      "a": "Yes, I am. / No, I'm not.",
      "keywords": [
        "yes",
        "no",
        "student",
        "study",
        "school"
      ]
    }
  ]
},
{
  "id": "29",
  "title": "Pets",
  "emoji": "🐕",
  "image": "assets/29_illustration.jpg",
  "passage": "Many people want to have a pet dog. Playing with dogs can be relaxing. Some people don't have time to take dogs for walks, so they get pets such as hamsters or birds.",
  "passage_q": {
    "q": "Why do some people get pets such as hamsters or birds?",
    "a": "Because they don't have time to take dogs for walks.",
    "keywords": [
      "time",
      "walks",
      "dogs",
      "hamsters",
      "birds"
    ]
  },
  "illustration_qs": [
    {
      "q": "Now, please look at the picture. How many people are wearing hats?",
      "a": "Three people are wearing hats.",
      "keywords": [
        "three",
        "3",
        "hats"
      ]
    },
    {
      "q": "Please look at the man. What is he doing?",
      "a": "He's cooking.",
      "keywords": [
        "cooking",
        "grill",
        "barbecue",
        "food"
      ]
    }
  ],
  "personal_qs": [
    {
      "q": "What did you do last Sunday?",
      "a": "I played with my cousins.",
      "keywords": [
        "sunday",
        "played",
        "cousins",
        "did"
      ]
    },
    {
      "q": "Do you like shopping in your free time?",
      "a": "Yes, I do. / No, I don't.",
      "keywords": [
        "yes",
        "no",
        "shopping",
        "buy",
        "free",
        "time"
      ]
    }
  ]
},
{
  "id": "30",
  "title": "Singing",
  "emoji": "🎤",
  "image": "assets/30_illustration.jpg",
  "passage": "Singing can be a good way to relax. Some people enjoy performing in front of many people, so they join singing groups or bands. Taking singing lessons can help people to sing better.",
  "passage_q": {
    "q": "Why do some people join singing groups or bands?",
    "a": "Because they enjoy performing in front of many people.",
    "keywords": [
      "enjoy",
      "performing",
      "front",
      "people"
    ]
  },
  "illustration_qs": [
    {
      "q": "Now, please look at the picture. How many books are there on the bench?",
      "a": "There are two books on the bench.",
      "keywords": [
        "two",
        "2",
        "books",
        "bench"
      ]
    },
    {
      "q": "Please look at the boy. What is he doing?",
      "a": "He's drawing.",
      "keywords": [
        "drawing",
        "writing",
        "sketching"
      ]
    }
  ],
  "personal_qs": [
    {
      "q": "Where do you often go on weekends?",
      "a": "I go to the shopping mall.",
      "keywords": [
        "weekends",
        "go",
        "mall",
        "park",
        "library"
      ]
    },
    {
      "q": "Have you ever been to a beach?",
      "a": "Yes, I have. / No, I haven't.",
      "keywords": [
        "yes",
        "no",
        "beach",
        "sea",
        "ocean"
      ]
    }
  ]
},
{
  "id": "31",
  "title": "Umbrellas",
  "emoji": "☂️",
  "image": "assets/31_illustration.jpg",
  "passage": "Umbrellas are very useful. They help people to stay dry on rainy days. Department stores sell different kinds of colorful umbrellas, and convenience stores are good places to buy cheap and simple ones.",
  "passage_q": {
    "q": "What do department stores sell?",
    "a": "They sell different kinds of colorful umbrellas.",
    "keywords": [
      "colorful",
      "umbrellas",
      "department",
      "stores"
    ]
  },
  "illustration_qs": [
    {
      "q": "Now, please look at the picture. How many cars are there in front of the store?",
      "a": "There are two cars in front of the store.",
      "keywords": [
        "two",
        "2",
        "cars",
        "store"
      ]
    },
    {
      "q": "Please look at the girl wearing a cap. What is she doing?",
      "a": "She's running.",
      "keywords": [
        "running",
        "jogging"
      ]
    }
  ],
  "personal_qs": [
    {
      "q": "How many hours do you sleep every night?",
      "a": "I sleep about eight hours.",
      "keywords": [
        "hours",
        "sleep",
        "eight",
        "seven",
        "six",
        "night"
      ]
    },
    {
      "q": "Do you like to travel?",
      "a": "Yes, I do. / No, I don't.",
      "keywords": [
        "yes",
        "no",
        "travel",
        "trip"
      ]
    }
  ]
},
{
  "id": "32",
  "title": "Playing the Guitar",
  "emoji": "🎸",
  "image": "assets/32_illustration.jpg",
  "passage": "Playing the guitar is a popular hobby. Many people want to learn how to play their favorite songs, so they practice playing the guitar every day. Some people take lessons with a guitar teacher.",
  "passage_q": {
    "q": "Why do many people practice playing the guitar every day?",
    "a": "Because they want to learn how to play their favorite songs.",
    "keywords": [
      "learn",
      "play",
      "favorite",
      "songs"
    ]
  },
  "illustration_qs": [
    {
      "q": "Now, please look at the picture. How many children are there under the tree?",
      "a": "There are two children under the tree.",
      "keywords": [
        "two",
        "2",
        "children",
        "tree"
      ]
    },
    {
      "q": "Please look at the boy wearing a cap. What is he going to do?",
      "a": "He's going to kick the ball.",
      "keywords": [
        "kick",
        "ball"
      ]
    }
  ],
  "personal_qs": [
    {
      "q": "What did you do last weekend?",
      "a": "I went to a basketball game.",
      "keywords": [
        "weekend",
        "went",
        "basketball",
        "game",
        "did"
      ]
    },
    {
      "q": "Do you often go to a movie theater?",
      "a": "Yes, I do. / No, I don't.",
      "keywords": [
        "yes",
        "no",
        "movie",
        "theater",
        "cinema"
      ]
    }
  ]
},
{
  "id": "33",
  "title": "Handball",
  "emoji": "🤾",
  "image": "assets/33_illustration.jpg",
  "passage": "Handball is a well-known team sport. Handball players need to jump and throw the ball quickly, so they practice very hard with their teammates. Some high schools in Japan have excellent handball teams.",
  "passage_q": {
    "q": "Why do handball players practice very hard with their teammates?",
    "a": "Because they need to jump and throw the ball quickly.",
    "keywords": [
      "jump",
      "throw",
      "ball",
      "quickly"
    ]
  },
  "illustration_qs": [
    {
      "q": "Now, please look at the picture. How many boys are standing?",
      "a": "Three boys are standing.",
      "keywords": [
        "three",
        "3",
        "boys",
        "standing"
      ]
    },
    {
      "q": "Please look at the woman wearing glasses. What is she going to do?",
      "a": "She's going to open the door.",
      "keywords": [
        "open",
        "door"
      ]
    }
  ],
  "personal_qs": [
    {
      "q": "What did you do last weekend?",
      "a": "I went to a food festival.",
      "keywords": [
        "weekend",
        "went",
        "festival",
        "did"
      ]
    },
    {
      "q": "Have you ever been to a farm?",
      "a": "Yes, I have. / No, I haven't.",
      "keywords": [
        "yes",
        "no",
        "farm",
        "animals"
      ]
    }
  ]
}
];

const QUESTION_SETS_PRE2 = [
  {
    "id": "pre2_01",
    "title": "Remote Work",
    "emoji": "💻",
    "image": "assets/pre2_01_illustration.jpg",
    "passage": "The internet has changed how some people do their jobs. For example, company employees can now work from home on a computer or tablet, so they don’t need to go into an office every day. This is called remote work. As a result, people spend less time traveling and more time at home with their families.",
    "passage_q": {
      "q": "According to the passage, why don’t company employees need to go into an office every day?",
      "a": "Because they can now work from home on a computer or tablet.",
      "keywords": [
        "because",
        "now",
        "work",
        "home",
        "computer",
        "tablet"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
        "a": "A man is using the computer. A boy is turning on the TV. A woman is vacuuming the carpet. A girl is talking on the phone. A baby is crying.",
        "keywords": [
          "man",
          "using",
          "computer",
          "boy",
          "turning",
          "woman"
        ]
      },
      {
        "q": "Now, look at the man in Picture B. Please describe the situation.",
        "a": "He can’t sit down because there are too many people on the train.",
        "keywords": [
          "sit",
          "down",
          "because",
          "too",
          "many",
          "people"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Do you think working at home is better than working in an office?",
        "a": "No. I think working in an office is better because you can talk to other people. Also, walking to the train station is good exercise.",
        "keywords": [
          "think",
          "working",
          "office",
          "better",
          "because",
          "talk"
        ]
      },
      {
        "q": "These days, a lot of people play video games. Do you play video games?",
        "a": "Yes, I play games on my computer every night. I like to play games because they help me to relax.",
        "keywords": [
          "yes",
          "play",
          "games",
          "computer",
          "every",
          "night"
        ]
      }
    ]
  },
  {
    "id": "pre2_02",
    "title": "Visit Museums from Home",
    "emoji": "🏛️",
    "image": "assets/pre2_02_illustration.jpg",
    "passage": "Recently, museums have started to make use of information technology. As a result, people are able to visit them on the internet. Visitors can ask tour guides to carry smartphones that record each tour, and in this way, they can experience a museum from home. Virtual tours will be more common in the future.",
    "passage_q": {
      "q": "According to the passage, how can visitors experience a museum from home?",
      "a": "By asking tour guides to carry smartphones that record each tour.",
      "keywords": [
        "asking",
        "tour",
        "guides",
        "carry",
        "smartphones",
        "record"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
        "a": "A man is looking at a painting. A girl is sitting on a bench. A girl is playing with a robot. Two men are shaking hands. A woman is cleaning her glasses.",
        "keywords": [
          "man",
          "looking",
          "painting",
          "girl",
          "sitting",
          "bench"
        ]
      },
      {
        "q": "Now, look at the girl in Picture B. Please describe the situation.",
        "a": "She can’t call her mother because her smartphone has no battery.",
        "keywords": [
          "call",
          "mother",
          "because",
          "smartphone",
          "battery"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Do you think more people should go to museums?",
        "a": "Yes. There are many kinds of museums, for example, art and science museums. People can learn a lot by visiting them.",
        "keywords": [
          "yes",
          "many",
          "kinds",
          "museums",
          "example",
          "art"
        ]
      },
      {
        "q": "Today, many people read the news on the internet. Do you read the news on the internet?",
        "a": "Yes, I think it is important to know what is happening in the world. Also, it’s interesting to talk about the news with other people.",
        "keywords": [
          "yes",
          "think",
          "important",
          "know",
          "what",
          "happening"
        ]
      }
    ]
  },
  {
    "id": "pre2_03",
    "title": "Sumo Wrestling in the US",
    "emoji": "🤼",
    "image": "assets/pre2_03_illustration.jpg",
    "passage": "Today, more and more cities in the US are forming sumo wrestling clubs. Sumo is one of the world’s oldest combat sports. People go to sumo events held by Japanese culture societies, and in this way, they learn more about the Japanese way of life. As a result, people have become more interested in Japan.",
    "passage_q": {
      "q": "According to the passage, how do people learn more about the Japanese way of life?",
      "a": "By going to sumo events held by Japanese culture societies.",
      "keywords": [
        "going",
        "sumo",
        "events",
        "held",
        "japanese",
        "culture"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
        "a": "A woman is carrying a tray of sandwiches. A man is reading a newspaper. A boy is playing with cards. A man is waving a flag. A woman is pouring a cup of tea.",
        "keywords": [
          "woman",
          "carrying",
          "tray",
          "sandwiches",
          "man",
          "reading"
        ]
      },
      {
        "q": "Now, look at the boy in Picture B. Please describe the situation.",
        "a": "He is thinking of going to Japan.",
        "keywords": [
          "thinking",
          "going",
          "japan"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Do you think more people should play sports?",
        "a": "Yes. Doing exercise is good for your health. Also, it’s fun to play sports with friends.",
        "keywords": [
          "yes",
          "doing",
          "exercise",
          "good",
          "health",
          "also"
        ]
      },
      {
        "q": "These days, a lot of people watch foreign TV shows? Do you like to watch foreign TV shows?",
        "a": "Yes. I enjoy watching foreign TV shows. They’re interesting and I can improve my English.",
        "keywords": [
          "yes",
          "enjoy",
          "watching",
          "foreign",
          "shows",
          "interesting"
        ]
      }
    ]
  },
  {
    "id": "pre2_04",
    "title": "Animal Hospitals",
    "emoji": "🏥",
    "image": "assets/pre2_04_illustration.jpg",
    "passage": "Recently, more people in Japan are choosing to have pets, such as cats and dogs. Many people consider pets members of the family, so they want to get the best health care for them. As a result, new animal clinics are opening across the country. These clinics will help pets live longer in the future.",
    "passage_q": {
      "q": "According to the passage, why do people want to get the best health care for their pets?",
      "a": "Because they consider pets members of the family.",
      "keywords": [
        "because",
        "consider",
        "pets",
        "members",
        "family"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
        "a": "A boy is feeding some birds. A woman is holding a dog. Two girls are playing with a cat. A woman is picking up a box. A man is opening a cage.",
        "keywords": [
          "boy",
          "feeding",
          "birds",
          "woman",
          "holding",
          "dog"
        ]
      },
      {
        "q": "Now, look at the woman in Picture B. Please describe the situation.",
        "a": "She can’t take the dog for a walk because it is raining.",
        "keywords": [
          "take",
          "dog",
          "walk",
          "because",
          "raining"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Do you think having a pet is a good idea?",
        "a": "Yes. Taking a dog for a walk is good exercise. Also, pets can stop you feeling lonely.",
        "keywords": [
          "yes",
          "taking",
          "dog",
          "walk",
          "good",
          "exercise"
        ]
      },
      {
        "q": "These days, more people are reading electronic books. Do you read electronic books?",
        "a": "Yes. Electronic books are lighter and more convenient than paper books. Also, it’s cheaper to download an electronic book.",
        "keywords": [
          "yes",
          "electronic",
          "books",
          "lighter",
          "more",
          "convenient"
        ]
      }
    ]
  },
  {
    "id": "pre2_05",
    "title": "Subscription Services",
    "emoji": "📦",
    "image": "assets/pre2_05_illustration.jpg",
    "passage": "These days, subscription services are becoming more common. For example, people can pay a monthly fee for music, movies or video games. Overseas customers can even join a subscription service for Japanese sweets and snacks, so they can get a new box of treats delivered from Japan every month.",
    "passage_q": {
      "q": "According to the passage, how can overseas customers get a new box of treats delivered from Japan every month?",
      "a": "By joining a subscription service for Japanese sweets and snacks.",
      "keywords": [
        "joining",
        "subscription",
        "service",
        "japanese",
        "sweets",
        "snacks"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
        "a": "A girl is drawing a picture. A woman is making a cake. A man is putting sweets into a box. A woman is wrapping a box. A man is riding a bicycle.",
        "keywords": [
          "girl",
          "drawing",
          "picture",
          "woman",
          "making",
          "cake"
        ]
      },
      {
        "q": "Now, look at the man in Picture B. Please describe the situation.",
        "a": "He can’t use the computer because he forgot his password.",
        "keywords": [
          "use",
          "computer",
          "because",
          "forgot",
          "password"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Do you think more people will use subscription services in the future?",
        "a": "Yes. Subscription services are usually cheap and convenient. Also, the internet will have more and more services in the future.",
        "keywords": [
          "yes",
          "subscription",
          "services",
          "usually",
          "cheap",
          "convenient"
        ]
      },
      {
        "q": "There are many campsites in Japan. Do you like to go camping?",
        "a": "No. I like nature, but it’s too hot to go camping in the summer. Also, there are too many insects in Japan.",
        "keywords": [
          "like",
          "nature",
          "too",
          "hot",
          "camping",
          "summer"
        ]
      }
    ]
  },
  {
    "id": "pre2_06",
    "title": "Face Masks for Fashion",
    "emoji": "🎭",
    "image": "assets/pre2_06_illustration.jpg",
    "passage": "People in Japan usually wear a face mask to protect their health. These days, however, some people are wearing face masks as a fashion accessory. Clothing companies want to find new customers for their products, so they make masks with interesting colors and designs. These new face masks are a popular fashion item.",
    "passage_q": {
      "q": "According to the passage, why do clothing companies make masks with interesting colors and designs?",
      "a": "Because they want to find new customers for their products.",
      "keywords": [
        "because",
        "want",
        "find",
        "new",
        "customers",
        "products"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
        "a": "A man is buying a mask. A man is pushing a cart. A woman is putting a book on a shelf. A girl is looking at a dress. A woman is carrying shopping bags.",
        "keywords": [
          "man",
          "buying",
          "mask",
          "pushing",
          "cart",
          "woman"
        ]
      },
      {
        "q": "Now, look at the man in Picture B. Please describe the situation.",
        "a": "He wants to go to the gym, but he forgot to bring his mask.",
        "keywords": [
          "wants",
          "gym",
          "forgot",
          "bring",
          "mask"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Do you think people will wear masks in the future?",
        "a": "Yes. Masks help to stop people getting sick. Also, masks keep your face warm in the winter.",
        "keywords": [
          "yes",
          "masks",
          "help",
          "stop",
          "people",
          "getting"
        ]
      },
      {
        "q": "There are many fast food restaurants in Japan. Do you like to eat fast food?",
        "a": "Yes. McDonald's is my favorite. I think it's cheap and delicious. Also, it's easier to buy dinner at a fast food restaurant than to cook at home.",
        "keywords": [
          "yes",
          "mcdonald",
          "favorite",
          "think",
          "cheap",
          "delicious"
        ]
      }
    ]
  },
  {
    "id": "pre2_07",
    "title": "Reducing Plastic Waste",
    "emoji": "♻️",
    "image": "assets/pre2_07_illustration.jpg",
    "passage": "Today, people in Japan are using fewer plastic shopping bags. They also want to use fewer plastic bottles. Some people use a smartphone app called “mymizu” to find the location of water fountains. This way, they can refill a used bottle instead of buying a new one. By using less plastic, we can help protect the environment.",
    "passage_q": {
      "q": "According to the passage, how can people refill a used bottle instead of buying a new one?",
      "a": "By using a smartphone app called “mymizu” to find the location of water fountains.",
      "keywords": [
        "using",
        "smartphone",
        "app",
        "called",
        "mymizu",
        "find"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
        "a": "A girl is flying a kite. A woman is picking up some trash. Two boys are playing soccer. A man is fixing a fence. A man is walking a dog.",
        "keywords": [
          "girl",
          "flying",
          "kite",
          "woman",
          "picking",
          "trash"
        ]
      },
      {
        "q": "Now, look at the girl in Picture B. Please describe the situation.",
        "a": "She wants to buy a drink, but she doesn’t have any money.",
        "keywords": [
          "wants",
          "buy",
          "drink",
          "doesn",
          "any",
          "money"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Do you think people throw out too much garbage?",
        "a": "Yes. Garbage is bad for the environment. People should try to recycle more.",
        "keywords": [
          "yes",
          "garbage",
          "bad",
          "environment",
          "people",
          "should"
        ]
      },
      {
        "q": "These days, many people cycle to school and work. Do you ride a bike?",
        "a": "No. I usually work from home so I don’t need a bike. Also, there’s a bus stop near my house which I can use.",
        "keywords": [
          "usually",
          "work",
          "home",
          "don",
          "need",
          "bike"
        ]
      }
    ]
  },
  {
    "id": "pre2_08",
    "title": "Protecting Farms",
    "emoji": "🌾",
    "image": "assets/pre2_08_illustration.jpg",
    "passage": "Recently, many farmers in Japan's countryside are struggling to protect their crops from wild animals. As a result, they are trying to find new ways to keep monkeys, boars and other animals away. In some villages, farmers are working together and helping their neighbors. In this way, they are able to protect their farms.",
    "passage_q": {
      "q": "According to the passage, how are farmers able to protect their farms?",
      "a": "By working together and helping their neighbors.",
      "keywords": [
        "working",
        "together",
        "helping",
        "neighbors"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
        "a": "Two men are putting up a fence. A woman is digging a hole. A man is holding a gun. A woman is picking apples. A man is planting vegetables.",
        "keywords": [
          "two",
          "men",
          "putting",
          "fence",
          "woman",
          "digging"
        ]
      },
      {
        "q": "Now, look at the man in Picture B. Please describe the situation.",
        "a": "He can't go hiking because there is a bear on the mountain.",
        "keywords": [
          "hiking",
          "because",
          "bear",
          "mountain"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Do you think more people should live in the countryside?",
        "a": "Yes. I think living in the countryside is more relaxing than living in the city. Also, you can enjoy nature.",
        "keywords": [
          "yes",
          "think",
          "living",
          "countryside",
          "more",
          "relaxing"
        ]
      },
      {
        "q": "The Olympic Games take place every four years. Do you like to watch the Olympics?",
        "a": "Yes. I like to watch the Olympics on TV. My favorite events are basketball and hockey.",
        "keywords": [
          "yes",
          "like",
          "watch",
          "olympics",
          "favorite",
          "events"
        ]
      }
    ]
  },
  {
    "id": "pre2_09",
    "title": "Traditional Japanese Crafts",
    "emoji": "🏺",
    "image": "assets/pre2_09_illustration.jpg",
    "passage": "These days, traditional Japanese crafts, like pottery, textiles and papermaking, are being taught on the Internet. The teachers are usually older people who have mastered each craft. These experienced craftspeople want to pass their knowledge and skills to young people, so they teach their craft in online lessons. These lessons are becoming more popular.",
    "passage_q": {
      "q": "According to the passage, why do experienced craftspeople teach their craft in online lessons?",
      "a": "Because they want to pass their knowledge and skills to young people.",
      "keywords": [
        "because",
        "want",
        "pass",
        "knowledge",
        "skills",
        "young"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
        "a": "A man is taking a photo. Two women are moving a table. A man is cutting some wood. A woman is taking notes. A boy is studying online.",
        "keywords": [
          "man",
          "taking",
          "photo",
          "two",
          "women",
          "moving"
        ]
      },
      {
        "q": "Now, look at the man in Picture B. Please describe the situation.",
        "a": "He is thinking of making a birdhouse.",
        "keywords": [
          "thinking",
          "making",
          "birdhouse"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Do you think it’s important to learn from older people?",
        "a": "Yes. I think older people can teach us many things. Also, we can learn from their mistakes.",
        "keywords": [
          "yes",
          "think",
          "older",
          "people",
          "teach",
          "many"
        ]
      },
      {
        "q": "Summer in Japan is very hot. Do you like summer?",
        "a": "Yes. I like summer because I can go swimming in the sea. Also, I can go to festivals and watch fireworks.",
        "keywords": [
          "yes",
          "like",
          "summer",
          "because",
          "swimming",
          "sea"
        ]
      }
    ]
  },
  {
    "id": "pre2_10",
    "title": "Cleaning in Japan",
    "emoji": "🧹",
    "image": "assets/pre2_10_illustration.jpg",
    "passage": "In Japan, cleaning is very important. People keep their houses and public places neat and tidy, and in this way, they show respect for their communities. They take off their shoes when they go inside someone's house and there are rules about keeping streets and parks clean. People also join neighborhood clean-up events.",
    "passage_q": {
      "q": "According to the passage, how do people show respect for their communities?",
      "a": "By keeping their houses and public places neat and tidy.",
      "keywords": [
        "keeping",
        "houses",
        "public",
        "places",
        "neat",
        "tidy"
      ]
    },
    "illustration_qs": [
      {
        "q": "Now, please look at the people in Picture A. They are doing different things. Tell me as much as you can about what they are doing.",
        "a": "A man is mopping the floor. Two girls are washing a dog. A woman is hanging up a towel. A woman is diving into the pool. A boy is taking a shower.",
        "keywords": [
          "man",
          "mopping",
          "floor",
          "two",
          "girls",
          "washing"
        ]
      },
      {
        "q": "Now, look at the man in Picture B. Please describe the situation.",
        "a": "He is hot because he forgot to bring his hat.",
        "keywords": [
          "hot",
          "because",
          "forgot",
          "bring",
          "hat"
        ]
      }
    ],
    "personal_qs": [
      {
        "q": "Do you think children should do more cleaning at home?",
        "a": "Yes. I think children should help their parents. Also, they can practice for the future.",
        "keywords": [
          "yes",
          "think",
          "children",
          "should",
          "help",
          "parents"
        ]
      },
      {
        "q": "These days, there are many options for healthy eating. Do you eat a lot of",
        "a": "No. I don’t like vegetables very much. I like to eat fast food because it is more delicious.",
        "keywords": [
          "don",
          "like",
          "vegetables",
          "very",
          "much",
          "eat"
        ]
      }
    ]
  }
];

let QUESTION_SETS = [];


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
  showGradeSelection();
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

// ── TTS (iOS Safari互換) ────────────────────────────────
// iOS SafariのSpeechSynthesisは以下のバグがある:
// 1. 初回呼び出しで音声が出ない → 空のutteranceで「キック」する
// 2. 15秒後に勝手に止まる → resume()を定期呼び出し
// 3. pause状態で固まる → resume()で回復
var _ttsKeepAlive = null;
function startTtsKeepAlive() {
  if (_ttsKeepAlive) return;
  _ttsKeepAlive = setInterval(() => {
    if (speechSynthesis.speaking) {
      speechSynthesis.resume();
    }
  }, 5000);
}
function stopTtsKeepAlive() {
  if (_ttsKeepAlive) { clearInterval(_ttsKeepAlive); _ttsKeepAlive = null; }
}
function speak(text, onEnd) {
  speechSynthesis.cancel();
  // iOS Safari: 空のutteranceでエンジンを起動する
  try {
    var kick = new SpeechSynthesisUtterance('');
    kick.volume = 0;
    speechSynthesis.speak(kick);
  } catch(e) {}

  var u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US'; u.rate = S.rate;
  if (S.voice) u.voice = S.voice;
  var done = false;
  var fb = setTimeout(() => { if (!done) { done = true; stopTtsKeepAlive(); if (onEnd) onEnd(); } }, 15000);
  u.onend = () => { clearTimeout(fb); done = true; stopTtsKeepAlive(); if (onEnd) onEnd(); };
  u.onerror = () => { clearTimeout(fb); done = true; stopTtsKeepAlive(); if (onEnd) onEnd(); };
  startTtsKeepAlive();
  speechSynthesis.speak(u);
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
    '<h1>🎓 英検' + (S.grade === '3' ? '3' : '準2') + '級<br>Speaking Simulator</h1>' +
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
    '<button class="btn-go" style="margin-top:30px;background:#444;box-shadow:none;border:2px solid #555" onclick="showGradeSelection()">← 級の選択に戻る</button>' +
    '</div>'
  );
  loadVoices();
}

// ============================================================
//  STAGE 1: WARMUP (採点なし)
// ============================================================
function startTest(id) {
  S.setId = id; S.answers = [];
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
    '<div class="label">📝 質問 1 / 5 — パッセージを見て答えて</div>' +
    '<div id="timer">⏱ 40s</div>' +
    '<div class="passage">' + s.passage + '</div>' +
    illustHtml(s) +
    '<div class="qbox">' + qtextHtml(q) +
    '<button class="btn-replay" onclick="speak(getSet().passage_q.q)">🔊 もう一度聞く</button></div>' +
    '<div id="answer-area"><div id="interim-text" class="interim"></div>' +
    '<button class="btn-mic" id="mic-btn" onclick="micQ(\'passage\',0)">🎤 答える</button></div>' +
    '<button class="btn-skip" onclick="skipQ(\'passage\',0)">スキップ →</button></div>'
  );
  speak('Please look at the passage. ' + q.q);
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

// ── GRADE SELECTION ────────────────────────────────────
function showGradeSelection() {
  stopTimer(); stopListening(); S.answers = [];
  render(
    '<div class="screen grade-selection">' +
    '<h1>🎓 英検<br>Speaking Simulator</h1>' +
    '<p class="hint" style="text-align:center;font-size:18px;margin-bottom:30px">挑戦する級を選んでください👇</p>' +
    '<div class="grid">' +
    '<div class="set-card grade-card" onclick="selectGrade(\'3\')" style="border: 3px solid #cd7f32; background: rgba(205,127,50,0.1)">' +
    '<div class="set-emoji">🥉</div>' +
    '<div class="set-title" style="font-size:24px;font-weight:bold;margin-top:10px">英検 3 級</div>' +
    '<div class="set-info" style="color:#aaa;margin-top:5px">33レッスン収録<br>(音読 + 5 Questions)</div></div>' +
    '<div class="set-card grade-card" onclick="selectGrade(\'pre2\')" style="border: 3px solid #c0c0c0; background: rgba(192,192,192,0.1)">' +
    '<div class="set-emoji">🥈</div>' +
    '<div class="set-title" style="font-size:24px;font-weight:bold;margin-top:10px">英検 準 2 級</div>' +
    '<div class="set-info" style="color:#aaa;margin-top:5px">10レッスン収録<br>(音読 + 5 Questions)</div></div>' +
    '</div>' +
    '</div>'
  );
}

function selectGrade(grade) {
  S.grade = grade;
  if (grade === '3') {
    QUESTION_SETS = QUESTION_SETS_3;
  } else {
    QUESTION_SETS = QUESTION_SETS_PRE2;
  }
  showMenu();
}
