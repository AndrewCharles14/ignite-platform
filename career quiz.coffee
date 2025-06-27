<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Career Interest Quiz</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        .question-container {
            transition: background-color 0.3s;
        }
        .question-container:hover {
            background-color: #f9fafb;
        }
        .result-card {
            transition: transform 0.3s, box-shadow 0.3s;
        }
        .result-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
    </style>
</head>
<body class="bg-gray-50 text-gray-800">

    <div class="container mx-auto p-4 md:p-8 max-w-4xl">
        <header class="text-center mb-8">
            <h1 class="text-4xl font-bold text-indigo-600">Career Interest Quiz</h1>
            <p class="text-lg text-gray-600 mt-2">Discover the perfect career path based on your passions.</p>
        </header>

        <main id="quiz-container" class="bg-white p-6 md:p-8 rounded-xl shadow-md">
            <div id="welcome-section">
                <h2 class="text-2xl font-bold mb-4">Welcome!</h2>
                <p class="mb-4">This quiz will help you discover career paths that match your interests. For each of the 100 questions, please rate how much you agree on a scale of 1 to 5.</p>
                <div class="flex justify-between text-sm text-gray-500 mb-4 px-2">
                    <span>1 = Strongly Disagree</span>
                    <span>3 = Neutral</span>
                    <span>5 = Strongly Agree</span>
                </div>
                <button id="start-quiz-btn" class="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors">Start Quiz</button>
            </div>

            <form id="quiz-form" class="hidden">
                <div id="questions-container" class="space-y-8">
                    <!-- Questions will be dynamically inserted here -->
                </div>
                <button type="submit" class="mt-8 w-full bg-green-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-600 transition-colors">See My Results</button>
            </form>
        </main>

        <section id="results-container" class="hidden mt-8">
             <h2 class="text-3xl font-bold text-center mb-6">Your Suggested Career Paths</h2>
             <div id="results-cards" class="grid md:grid-cols-3 gap-6">
                <!-- Results will be dynamically inserted here -->
             </div>
             <div class="text-center mt-8 text-gray-600">
                <p>Remember, this is just a guide! Explore these areas further, talk to people in these fields, and see what excites you the most.</p>
                <p class="font-semibold">Good luck with your journey in high school!</p>
             </div>
        </section>

    </div>

    <script>
        // --- DATA DEFINITIONS ---

        const CAREER_CATEGORIES = {
            "Analytical": ["analyze", "data", "solve", "logic", "research", "numbers", "patterns"],
            "Creative": ["design", "art", "music", "write", "create", "visuals", "storytelling"],
            "Social": ["help", "teach", "guide", "support", "community", "communicate", "team"],
            "Technical": ["build", "code", "engineer", "technology", "operate", "fix", "systems"],
            "Nature": ["animals", "plants", "environment", "outdoors", "conserve", "explore"],
            "Business": ["lead", "organize", "sell", "manage", "finance", "market", "persuade"]
        };

        const QUESTIONS = [
            // Analytical
            "I enjoy solving complex puzzles.", "I like finding patterns in data or numbers.", "I prefer tasks that require logical reasoning.", "I am curious about how things work.", "I enjoy conducting research to find answers.", "I like organizing information into spreadsheets.", "I am good at spotting inconsistencies or errors.", "I enjoy strategy games like chess or Sudoku.", "I like reading scientific articles or studies.", "I would enjoy forecasting future trends based on data.", "I am interested in how statistics are used.", "I like to break down big problems into smaller parts.", "I enjoy debating and forming strong arguments.", "I'm interested in economics and financial markets.", "I like to experiment to see what happens.", "I like to analyze historical events to understand their causes.",
            // Creative
            "I enjoy drawing, painting, or sculpting.", "I like to write stories, poems, or articles.", "I am passionate about music and sound.", "I enjoy photography and creating visual content.", "I would like to design websites or apps.", "I have a good sense of style and aesthetics.", "I enjoy drama, acting, or public speaking.", "I like coming up with new ideas and inventions.", "I would enjoy creating marketing campaigns.", "I like to express myself through artistic means.", "I enjoy designing clothes or fashion items.", "I would like to direct or produce a movie.", "I enjoy interior design and arranging spaces.", "I like creating animations or digital art.", "I enjoy making crafts or DIY projects.", "I am interested in culinary arts and creating new recipes.", "I enjoy composing or arranging music.",
            // Social
            "I enjoy helping others solve their problems.", "I am a good listener and people often confide in me.", "I enjoy working in a team towards a common goal.", "I like teaching or mentoring others.", "I am passionate about social justice and community issues.", "I enjoy volunteering my time for a good cause.", "I am good at understanding different perspectives.", "I like public speaking and presenting to groups.", "I enjoy organizing events or activities for others.", "I feel energized after social interactions.", "I would enjoy a career in counseling or therapy.", "I like taking care of people who are sick or in need.", "I am good at mediating conflicts between people.", "I enjoy learning about different cultures.", "I like leading and motivating a group.", "I want to work to improve society.", "I'm good at making people feel welcome and included.",
            // Technical
            "I am fascinated by new technology.", "I enjoy building things with my hands or with tools.", "I like to understand how machines and electronics work.", "I enjoy computer programming or coding.", "I am good at troubleshooting and fixing problems.", "I would enjoy designing and building robots.", "I am interested in cybersecurity and protecting data.", "I like working with software and computer applications.", "I would enjoy developing video games.", "I like the idea of working in a lab with technical equipment.", "I'm interested in engineering (civil, mechanical, electrical).", "I enjoy working with circuits and electronics.", "I would like to design and build structures like bridges or buildings.", "I am interested in how computer networks operate.", "I like learning new programming languages.", "I am interested in artificial intelligence and machine learning.",
            // Nature
            "I enjoy spending time outdoors (hiking, camping, etc.).", "I am passionate about protecting the environment.", "I enjoy gardening or working with plants.", "I am fascinated by animals and wildlife.", "I would enjoy a career working with animals (e.g., veterinarian).", "I am interested in geology and earth science.", "I enjoy studying maps and geography.", "I would like to work in conservation or forestry.", "I am interested in marine biology and ocean life.", "I enjoy learning about weather patterns and climate.", "I like to identify different types of plants and animals.", "I would enjoy conducting fieldwork outdoors.", "I am interested in sustainable agriculture and food systems.", "I care deeply about renewable energy.", "I would enjoy being a park ranger.", "I enjoy learning about different ecosystems.",
            // Business
            "I enjoy leading a team or project.", "I am interested in how businesses make money.", "I enjoy persuading others to my point of view.", "I am good at organizing projects and managing time.", "I like the idea of starting my own company.", "I enjoy negotiating to get a good deal.", "I am interested in marketing and advertising.", "I enjoy public speaking and making presentations.", "I am comfortable with taking calculated risks.", "I like tracking my money and making budgets.", "I enjoy networking and meeting new people.", "I am interested in the stock market and investing.", "I like setting goals and working to achieve them.", "I am good at selling products or ideas.", "I would enjoy managing a store or a company.", "I am interested in law and contracts.", "I like understanding legal systems.", "I like preparing presentations."
        ];

        const CAREERS = {
            "Data Scientist": { primary: "Analytical", secondary: "Technical" }, "Graphic Designer": { primary: "Creative", secondary: "Technical" }, "Social Worker": { primary: "Social", secondary: "Analytical" }, "Software Engineer": { primary: "Technical", secondary: "Analytical" }, "Environmental Scientist": { primary: "Nature", secondary: "Analytical" }, "Marketing Manager": { primary: "Business", secondary: "Creative" }, "Financial Analyst": { primary: "Analytical", secondary: "Business" }, "Architect": { primary: "Creative", secondary: "Technical" }, "Teacher": { primary: "Social", secondary: "Creative" }, "Mechanical Engineer": { primary: "Technical", secondary: "Analytical" }, "Veterinarian": { primary: "Nature", secondary: "Social" }, "Entrepreneur": { primary: "Business", secondary: "Creative" }, "Writer/Author": { primary: "Creative", secondary: "Analytical" }, "Psychologist": { primary: "Social", secondary: "Analytical" }, "Robotics Engineer": { primary: "Technical", secondary: "Creative" }, "Conservation Officer": { primary: "Nature", secondary: "Social" }, "Lawyer": { primary: "Analytical", secondary: "Social" }, "Product Manager": { primary: "Business", secondary: "Technical" }, "Urban Planner": { primary: "Analytical", secondary: "Social" }, "Video Game Designer": { primary: "Creative", secondary: "Technical" }, "Doctor/Physician": { primary: "Social", secondary: "Analytical" }, "Geologist": { primary: "Nature", secondary: "Analytical" }, "Accountant": { primary: "Business", secondary: "Analytical" }
        };

        const CHALLENGES = {
            "Data Scientist": "A city wants to reduce traffic congestion. You are given a dataset of traffic patterns, public transport schedules, and weather conditions. Your challenge: Analyze the data to identify the top 3 factors causing traffic jams and propose a data-driven solution to the city council.",
            "Graphic Designer": "A new eco-friendly coffee shop is launching. They need a complete brand identity. Your challenge: Design a logo, a color palette, and a mockup for a reusable coffee cup that communicates their commitment to sustainability and great coffee.",
            "Social Worker": "A local high school has seen an increase in student stress and anxiety. Your challenge: Develop a 3-part workshop series for students that teaches practical coping strategies, provides resources for mental health support, and creates a safe space for discussion.",
            "Software Engineer": "Many people in your community want to volunteer, but they don't know where to start. Your challenge: Outline the key features for a mobile app that connects volunteers with local non-profits based on their skills and availability. Create a simple flowchart of how a user would sign up and find an opportunity.",
            "Environmental Scientist": "A nearby river has shown signs of pollution, affecting local wildlife. Your challenge: Propose a 3-step action plan. Step 1: How would you identify the source of the pollution? Step 2: What immediate measures would you recommend? Step 3: What long-term solution would you suggest to prevent it from happening again?",
            "Marketing Manager": "A local bookstore is struggling to compete with online retailers. Your challenge: Create a 3-month marketing plan to increase foot traffic by 20%. The plan should include at least one community event, one digital campaign, and one partnership with another local business.",
            "Financial Analyst": "Your friend has saved $1,000 and wants to start investing for the long term. They know nothing about the stock market. Your challenge: Explain the difference between a stock and a bond in simple terms, and create a sample 'starter portfolio' of 3 investments that balances risk and potential growth.",
            "Architect": "A small town wants to build a new community library that is accessible, environmentally friendly, and a hub for all ages. Your challenge: Sketch a basic floor plan. It must include a children's area, a quiet study zone, a computer lab, and a community meeting room. How would you use natural light and sustainable materials?",
            "Teacher": "You need to teach a 9th-grade history class about an important historical event in a way that is engaging and memorable. Your challenge: Choose a historical event and design a 45-minute lesson plan that includes an interactive activity instead of just a lecture. How will you check if the students understood the key points?",
            "Mechanical Engineer": "A company wants to create a new, affordable prosthetic hand for children that is both functional and cool. Your challenge: Brainstorm 5 key features this prosthetic hand must have. Sketch a simple design and explain what materials you would use to make it lightweight and durable.",
            "Veterinarian": "A person brings in their dog, which has been lethargic and has not eaten for two days. Your challenge: What are the first 5 questions you would ask the owner to diagnose the problem? What are the first 3 physical checks you would perform on the dog?",
            "Entrepreneur": "You have an idea for a new business: a subscription box for hobbyists (e.g., for knitting, painting, or model rockets). Your challenge: Identify your target customer. Then, create a list of what you would include in the first month's box and determine a fair price for it.",
            "Writer/Author": "You are tasked with writing a short story for a young adult audience. The theme is 'courage.' Your challenge: Write the opening paragraph (about 150 words) that introduces the main character and hints at the central conflict they will face.",
            "Psychologist": "A client is struggling with social anxiety and finds it difficult to attend large gatherings. Your challenge: Describe three practical, step-by-step techniques or 'homework' assignments you would give them to gradually build their confidence in social situations.",
            "Robotics Engineer": "Design a small robot to help elderly people living alone. Your challenge: What are the top 3 most important tasks this robot should perform? Sketch a simple diagram of the robot and list the sensors it would need to navigate a home safely.",
            "Conservation Officer": "You discover evidence of illegal poaching in a protected wildlife area. Your challenge: Outline your plan of action. What are your first three steps? How would you collect evidence, and who would you coordinate with to address the situation?",
            "Lawyer": "Your client is a small business owner who is being sued by a customer. The customer claims they slipped and fell in the store. Your challenge: What are the first 5 pieces of evidence you would try to gather to build a defense for your client?",
            "Product Manager": "Your team has developed a new fitness-tracking app. Your challenge: You are planning the official launch. Identify the three key features you would highlight in your marketing materials to make the app stand out against competitors like Strava or Fitbit.",
            "Urban Planner": "A city neighborhood lacks green space. The city has acquired a small, empty lot and wants to turn it into a park. Your challenge: Create a design concept for the park that serves young children, teenagers, and seniors. How would you balance their different needs in a limited space?",
            "Video Game Designer": "You have an idea for a new puzzle-platformer game. Your challenge: Describe the game's core 'mechanic' (the main action the player repeats). Then, design the first level on paper, showing how you would teach the player this mechanic without using words.",
            "Doctor/Physician": "A patient comes to you with a persistent cough and fatigue. Your challenge: What is your process of differential diagnosis? List at least 4 possible causes, from most common to less common, and the initial tests you would order to investigate them.",
            "Geologist": "You are leading a school trip to a local geological site. Your challenge: Prepare a brief, exciting introduction to the site. Explain how you would demonstrate the concepts of erosion and rock layers using the features available at the site.",
            "Accountant": "A small coffee shop owner is unsure if they are making a profit. Your challenge: Explain the difference between revenue, expenses, and profit. Create a simple, one-month sample budget for the coffee shop, listing at least 5 potential expense categories."
        };

        // --- CORE LOGIC ---

        document.addEventListener('DOMContentLoaded', () => {
            const startBtn = document.getElementById('start-quiz-btn');
            const welcomeSection = document.getElementById('welcome-section');
            const quizForm = document.getElementById('quiz-form');
            const questionsContainer = document.getElementById('questions-container');
            const resultsContainer = document.getElementById('results-container');
            const quizContainer = document.getElementById('quiz-container');

            let questionToCategoryMap = {};
            let sampledQuestions = [];

            function assignQuestionCategories() {
                QUESTIONS.forEach((question, index) => {
                    let bestCat = "Analytical"; // Default category
                    let maxScore = 0;
                    for (const [cat, keywords] of Object.entries(CAREER_CATEGORIES)) {
                        const score = keywords.reduce((acc, keyword) => acc + (question.toLowerCase().includes(keyword) ? 1 : 0), 0);
                        if (score > maxScore) {
                            maxScore = score;
                            bestCat = cat;
                        }
                    }
                    questionToCategoryMap[index] = bestCat;
                });
            }

            function generateQuiz() {
                const NUM_QUESTIONS_TO_ASK = 100;
                const allIndices = Array.from(QUESTIONS.keys());
                allIndices.sort(() => 0.5 - Math.random()); // Shuffle
                const questionIndicesToAsk = allIndices.slice(0, NUM_QUESTIONS_TO_ASK);

                questionIndicesToAsk.forEach((qIndex, i) => {
                    const question = QUESTIONS[qIndex];
                    sampledQuestions.push({ index: qIndex, question });
                    const div = document.createElement('div');
                    div.className = 'question-container p-4 rounded-lg border border-gray-200';
                    div.innerHTML = `
                        <label for="q${i}" class="block text-md font-medium text-gray-700 mb-3">${i + 1}. ${question}</label>
                        <input type="range" id="q${i}" name="q${i}" min="1" max="5" value="3" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                        <div class="flex justify-between text-xs text-gray-500 mt-2 px-1">
                            <span>Disagree</span>
                            <span>Neutral</span>
                            <span>Agree</span>
                        </div>
                    `;
                    questionsContainer.appendChild(div);
                });
            }

            function analyzeResults(e) {
                e.preventDefault();
                const categoryScores = Object.keys(CAREER_CATEGORIES).reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {});
                const totalQuestionsInCategory = { ...categoryScores };

                sampledQuestions.forEach((q, i) => {
                    const answer = parseInt(document.getElementById(`q${i}`).value);
                    const category = questionToCategoryMap[q.index];
                    categoryScores[category] += answer;
                    totalQuestionsInCategory[category] += 1;
                });

                const normalizedScores = { ...categoryScores };
                for (const cat in normalizedScores) {
                    if (totalQuestionsInCategory[cat] > 0) {
                        normalizedScores[cat] /= totalQuestionsInCategory[cat];
                    }
                }

                const sortedCategories = Object.entries(normalizedScores).sort(([, a], [, b]) => b - a);
                const topCategory = sortedCategories[0][0];
                const secondCategory = sortedCategories[1][0];

                let suggestedCareers = [];
                const careerPool = { ...CAREERS };

                // Logic to find top 3 careers
                Object.entries(careerPool).forEach(([career, cats]) => {
                    if (cats.primary === topCategory && cats.secondary === secondCategory) suggestedCareers.push(career);
                });
                Object.entries(careerPool).forEach(([career, cats]) => {
                    if (suggestedCareers.length < 3 && cats.primary === topCategory && !suggestedCareers.includes(career)) suggestedCareers.push(career);
                });
                Object.entries(careerPool).forEach(([career, cats]) => {
                    if (suggestedCareers.length < 3 && cats.primary === secondCategory && !suggestedCareers.includes(career)) suggestedCareers.push(career);
                });
                 Object.entries(careerPool).forEach(([career, cats]) => {
                    if (suggestedCareers.length < 3 && cats.secondary === topCategory && !suggestedCareers.includes(career)) suggestedCareers.push(career);
                });
                 while (suggestedCareers.length < 3 && Object.keys(careerPool).length > 0) {
                    const randomCareer = Object.keys(careerPool)[Math.floor(Math.random() * Object.keys(careerPool).length)];
                    if (!suggestedCareers.includes(randomCareer)) {
                        suggestedCareers.push(randomCareer);
                    }
                    delete careerPool[randomCareer]; // Avoid duplicates
                }

                displayResults(suggestedCareers.slice(0, 3));
            }

            function displayResults(careers) {
                quizContainer.classList.add('hidden');
                resultsContainer.classList.remove('hidden');
                const resultsCards = document.getElementById('results-cards');
                resultsCards.innerHTML = '';

                careers.forEach(career => {
                    const challenge = CHALLENGES[career] || "No challenge available.";
                    const card = document.createElement('div');
                    card.className = 'result-card bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-500';
                    card.innerHTML = `
                        <h3 class="text-xl font-bold text-indigo-700">${career}</h3>
                        <p class="text-sm text-gray-500 mb-4">${CAREERS[career].primary} & ${CAREERS[career].secondary}</p>
                        <h4 class="font-semibold mt-4 mb-2">A Day-in-the-Life Challenge:</h4>
                        <p class="text-gray-700 text-sm">"${challenge}"</p>
                    `;
                    resultsCards.appendChild(card);
                });
                
                resultsContainer.scrollIntoView({ behavior: 'smooth' });
            }


            startBtn.addEventListener('click', () => {
                welcomeSection.classList.add('hidden');
                quizForm.classList.remove('hidden');
                assignQuestionCategories();
                generateQuiz();
            });

            quizForm.addEventListener('submit', analyzeResults);
        });
    </script>
</body>
</html>
