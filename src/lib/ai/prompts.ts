interface PromptParams {
  classLevel: string;
  subject: string;
  curriculum: string;
  term?: string;
  topic?: string;
}

export function buildPrompt(type: string, params: PromptParams): string {
  const { classLevel, subject, curriculum, term, topic } = params;

  const curriculumLabel =
    curriculum === "nigerian"
      ? "Nigerian NERDC Curriculum"
      : curriculum === "british"
      ? "British National Curriculum"
      : "Combined Nigerian and British Curriculum";

  const termLabel =
    term === "first"
      ? "First Term"
      : term === "second"
      ? "Second Term"
      : term === "third"
      ? "Third Term"
      : "First Term";

  if (type === "curriculum") {
    return `
Generate a detailed curriculum outline for the following:
- Class Level: ${classLevel}
- Subject: ${subject}
- Curriculum Framework: ${curriculumLabel}
- Term: ${termLabel}

Return a JSON object with this exact structure:
{
  "classLevel": "${classLevel}",
  "subject": "${subject}",
  "curriculum": "${curriculumLabel}",
  "term": "${termLabel}",
  "weeks": [
    {
      "week": 1,
      "topic": "topic name here",
      "subtopics": ["subtopic 1", "subtopic 2", "subtopic 3"],
      "objectives": ["By the end of this lesson students will be able to...", "..."],
      "outcome": "Expected learning outcome for this week",
      "activities": ["Activity 1", "Activity 2"],
      "resources": ["Resource 1", "Resource 2"]
    }
  ]
}

Generate exactly 5 weeks of content. Make all content specific to Nigerian school context and appropriate for ${classLevel} students. Use the ${curriculumLabel} framework.
    `.trim();
  }

  if (type === "scheme") {
    return `
Generate a professional 13-week First Term Scheme of Work for:
- Class Level: ${classLevel}
- Subject: ${subject}
- Curriculum Framework: ${curriculumLabel}

This should follow Nigerian school standards with 13 weeks per term.

Return a JSON object with this exact structure:
{
  "classLevel": "${classLevel}",
  "subject": "${subject}",
  "curriculum": "${curriculumLabel}",
  "term": "First Term",
  "weeks": [
    {
      "week": 1,
      "topic": "topic name",
      "subtopics": ["subtopic 1", "subtopic 2"],
      "teacherObjective": "Teacher will...",
      "studentActivities": "Students will...",
      "resources": "List of materials needed",
      "evaluation": "How learning will be assessed"
    }
  ]
}

Generate all 13 weeks. Make content professional, accurate and aligned with ${curriculumLabel} for ${classLevel}.
    `.trim();
  }

  if (type === "lesson") {
    return `
Generate a detailed lesson plan using the ABCD Behavioural Objective Method for:
- Class Level: ${classLevel}
- Subject: ${subject}
- Topic: ${topic || subject}
- Curriculum Framework: ${curriculumLabel}
- Duration: 40 minutes

Return a JSON object with this exact structure:
{
  "classLevel": "${classLevel}",
  "subject": "${subject}",
  "topic": "${topic || subject}",
  "duration": "40 minutes",
  "method": "ABCD Behavioural Objective Method",
  "date": "_______________",
  "objectives": {
    "audience": "Students of ${classLevel}",
    "behaviour": "will be able to [specific observable behaviour]",
    "condition": "given [specific condition or resources]",
    "degree": "with [specific measurable degree of accuracy]"
  },
  "previousKnowledge": "What students already know about this topic",
  "instructionalMaterials": ["Material 1", "Material 2", "Material 3"],
  "teacherActivities": [
    {"step": "Introduction (5 mins)", "activity": "detailed activity description"},
    {"step": "Presentation (15 mins)", "activity": "detailed activity description"},
    {"step": "Application (12 mins)", "activity": "detailed activity description"},
    {"step": "Practice (5 mins)", "activity": "detailed activity description"},
    {"step": "Conclusion (3 mins)", "activity": "detailed activity description"}
  ],
  "studentActivities": ["Activity 1", "Activity 2", "Activity 3"],
  "evaluation": {
    "type": "Written Exercise",
    "questions": ["Question 1", "Question 2", "Question 3"]
  },
  "assignment": "Home assignment for students",
  "references": ["Textbook reference", "Other reference"]
}

Make the lesson plan professional, detailed and appropriate for ${classLevel} ${subject} students in a Nigerian school.
    `.trim();
  }

  if (type === "assessment") {
    return `
Generate a comprehensive assessment for:
- Class Level: ${classLevel}
- Subject: ${subject}
- Topic: ${topic || subject}
- Curriculum Framework: ${curriculumLabel}

Return a JSON object with this exact structure:
{
  "classLevel": "${classLevel}",
  "subject": "${subject}",
  "topic": "${topic || subject}",
  "duration": "45 minutes",
  "totalMarks": 100,
  "instructions": "Answer all questions in Section A. Answer any 3 questions in Section B.",
  "objectiveQuestions": [
    {
      "number": 1,
      "question": "question text here",
      "options": ["A. option 1", "B. option 2", "C. option 3", "D. option 4"],
      "answer": "A. option 1"
    }
  ],
  "theoryQuestions": [
    {
      "number": 1,
      "question": "detailed theory question",
      "marks": 20,
      "guideline": "marking guideline for this question"
    }
  ]
}

Generate exactly 10 objective questions worth 3 marks each and 3 theory questions worth 20 marks each. Make questions relevant to ${classLevel} ${subject} in Nigerian schools.
    `.trim();
  }

  if (type === "resource") {
    return `
Generate comprehensive instructional resource suggestions for:
- Class Level: ${classLevel}
- Subject: ${subject}
- Topic: ${topic || subject}
- Curriculum Framework: ${curriculumLabel}

Return a JSON object with this exact structure:
{
  "classLevel": "${classLevel}",
  "subject": "${subject}",
  "topic": "${topic || subject}",
  "visualAids": [
    "Detailed description of visual aid 1",
    "Detailed description of visual aid 2",
    "Detailed description of visual aid 3"
  ],
  "audioResources": [
    "Audio resource suggestion 1",
    "Audio resource suggestion 2"
  ],
  "audioVisualResources": [
    "Video or AV resource suggestion 1",
    "Video or AV resource suggestion 2"
  ],
  "handOnActivities": [
    "Hands-on activity suggestion 1",
    "Hands-on activity suggestion 2",
    "Hands-on activity suggestion 3"
  ],
  "localNigerianContext": [
    "How to relate this topic to Nigerian daily life",
    "Local examples relevant to Nigerian students"
  ],
  "digitalResources": [
    "Online resource or website suggestion 1",
    "Online resource or website suggestion 2"
  ],
  "lowCostMaterials": [
    "Low cost or free material suggestion 1",
    "Low cost or free material suggestion 2",
    "Low cost or free material suggestion 3"
  ],
  "teachingTips": [
    "Practical teaching tip 1",
    "Practical teaching tip 2"
  ]
}

Focus on resources available and relevant in Nigerian schools. Include both modern and traditional teaching aids.
    `.trim();
  }

  return `Generate a curriculum outline for ${subject} for ${classLevel} following the ${curriculumLabel}. Return valid JSON.`;
}