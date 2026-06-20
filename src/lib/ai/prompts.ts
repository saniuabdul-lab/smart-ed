interface PromptParams {
  classLevel: string;
  subject: string;
  curriculum: string;
  term?: string;
  topic?: string;
  textbook?: string;
}

const CURRICULUM_GUIDES: Record<string, string> = {
  nigerian: `
Follow the NERDC (Nigerian Educational Research and Development Council) curriculum structure precisely:
- Primary 1-3: English Studies, Mathematics, Nigerian Languages, Basic Science, Physical and Health Education, CRS/Islamic Studies, Nigerian History, Social and Citizenship Studies, Cultural and Creative Arts.
- Primary 4-6: adds Basic Science and Technology, Basic Digital Literacy, Pre-vocational Studies.
- JSS 1-3: English Studies, Mathematics, Basic Science and Technology, Business Studies, CRS/Islamic Studies, Culture and Creative Arts, French, History, National Values, Pre-Vocational Studies, one mandatory Trade Subject (e.g. Solar PV, Fashion Design, Livestock Farming, GSM Repairs).
- SS 1-3: 5 compulsory core subjects (English, Mathematics, Civic Education, Trade Subject, one Nigerian Language) plus specialization stream (Science, Arts, Commercial).
- Content must prepare students for BECE (JSS3) and WAEC/NECO/SSCE (SS3) and reflect authentic Nigerian classroom realities, local examples, and the National Values curriculum emphasis on entrepreneurship and practical skills.
`.trim(),
  british: `
Follow the British National Curriculum (England) structure precisely:
- Key Stage 1 (Years 1-2, ages 5-7): English, Mathematics, Science, plus foundation subjects (Art & Design, Computing, Design & Technology, Geography, History, Music, PE).
- Key Stage 2 (Years 3-6, ages 7-11): same core + foundation subjects, plus a Modern Foreign Language from Year 3.
- Key Stage 3 (Years 7-9, ages 11-14): English, Mathematics, Science as core; Art & Design, Citizenship, Computing, Design & Technology, Languages, Geography, History, Music, PE as foundation.
- Key Stage 4 (Years 10-11, ages 14-16): leads to GCSE qualifications; English, Mathematics, Science, Computing, PE, Citizenship are statutory; other subjects through entitlement areas (Arts, Design & Technology, Humanities, Modern Foreign Languages).
- Content should reflect British pedagogical style: enquiry-based learning, structured attainment targets, and progression toward SATs (KS1/KS2) or GCSE (KS4) expectations.
`.trim(),
  combined: `
Blend Nigerian NERDC curriculum content with British National Curriculum pedagogy and rigor:
- Use NERDC-mandated subject content and topic sequencing as the foundation (so the school remains compliant with Nigerian regulatory requirements and WAEC/NECO/BECE preparation).
- Layer in British-style structured learning objectives, enquiry-based activities, and the analytical depth typical of UK Key Stage teaching.
- Where both systems cover the same topic (e.g. fractions, photosynthesis, parts of speech), merge the strongest aspects of each: Nigerian real-world/local context examples + British structured progression and assessment objectives.
- This is for international and bilingual Nigerian schools offering both certifications.
`.trim(),
};

function classToLevel(classLevel: string): "early" | "primary" | "jss" | "ss" {
  const c = classLevel.toLowerCase();
  if (c.includes("nursery") || c.includes("kindergarten") || c.includes("kg")) return "early";
  if (c.includes("primary")) return "primary";
  if (c.includes("jss")) return "jss";
  return "ss";
}

export function buildPrompt(type: string, params: PromptParams): string {
  const { classLevel, subject, curriculum, term, topic, textbook } = params;

  const curriculumLabel =
    curriculum === "nigerian" ? "Nigerian NERDC Curriculum" :
    curriculum === "british"  ? "British National Curriculum" :
    "Combined Nigerian NERDC + British National Curriculum";

  const curriculumGuide = CURRICULUM_GUIDES[curriculum] || CURRICULUM_GUIDES.nigerian;
  const level = classToLevel(classLevel);

  const termLabel =
    term === "first" ? "First Term" :
    term === "second" ? "Second Term" :
    term === "third" ? "Third Term" : "First Term";

  if (type === "curriculum") {
    return `
You are designing an authoritative, exam-ready curriculum outline.

CURRICULUM FRAMEWORK GUIDE:
${curriculumGuide}

TASK PARAMETERS:
- Class Level: ${classLevel}
- Education Stage: ${level}
- Subject: ${subject}
- Curriculum: ${curriculumLabel}
- Term: ${termLabel}

REQUIREMENTS:
1. Topics must be sequenced logically — each week builds on the previous one (do not jump between unrelated concepts).
2. Sub-topics must be specific and teachable in one week, not vague categories.
3. Learning objectives must be observable and measurable (what the learner will be able to DO, not just "understand").
4. Include real Nigerian context examples where curriculum is "nigerian" or "combined" (market scenarios, local geography, Naira currency, familiar Nigerian situations).
5. Reference where this content sits in the WAEC/NECO/BECE syllabus or GCSE specification where relevant.
6. Each week must list concrete classroom resources a typical Nigerian school actually has access to (chalkboard, charts, local materials) AND digital alternatives.

Return ONLY valid JSON, no markdown, in this exact structure:
{
  "classLevel": "${classLevel}",
  "subject": "${subject}",
  "curriculum": "${curriculumLabel}",
  "term": "${termLabel}",
  "introduction": "2-3 sentence overview of what this term covers and why it matters at this stage",
  "weeks": [
    {
      "week": 1,
      "topic": "specific topic name",
      "subtopics": ["specific sub-topic 1", "specific sub-topic 2", "specific sub-topic 3"],
      "objectives": ["By the end of this week, learners will be able to [specific observable skill]", "..."],
      "outcome": "Expected learning outcome stated as a clear competency",
      "activities": ["Specific classroom activity 1", "Specific classroom activity 2"],
      "resources": ["Concrete resource 1", "Concrete resource 2"],
      "crossCurricularLink": "How this connects to another subject (optional but valuable)"
    }
  ]
}

Generate 12 weeks of content (a realistic Nigerian school term length minus revision/exam weeks). Be specific, not generic.
    `.trim();
  }

  if (type === "scheme") {
    const textbookInstruction = textbook
      ? `
TEXTBOOK-BASED MODE ACTIVE:
The school uses the textbook: "${textbook}"
You must structure this scheme of work around the actual chapter/topic sequence typically found in this specific textbook for ${subject} at ${classLevel} level. Group related chapters logically across the term so that topics that build on each other are taught in sequence. If you are not certain of this exact textbook's table of contents, use your best knowledge of standard Nigerian textbooks for this subject and level with this title/series, and structure the scheme as closely as possible to how that textbook orders its content. State clearly in the "textbookNote" field how confident you are and any assumptions made.
`.trim()
      : `No specific textbook was provided — structure the scheme of work using the standard ${curriculumLabel} topic sequence for ${subject} at ${classLevel}.`;

    return `
You are an experienced Nigerian Head of Department creating a professional, ready-to-submit Scheme of Work for school supervisors and ministry inspection.

CURRICULUM FRAMEWORK GUIDE:
${curriculumGuide}

${textbookInstruction}

TASK PARAMETERS:
- Class Level: ${classLevel}
- Subject: ${subject}
- Curriculum: ${curriculumLabel}
- Term: ${termLabel}
- Standard Nigerian term length: 13 weeks (including 1 revision week and 1 examination week at the end)

REQUIREMENTS:
1. Topics must flow in a logical teaching sequence — simpler/foundational concepts before complex ones, with deliberate scaffolding week to week.
2. Week 12 should be "Revision" and Week 13 should be "Examination" unless the subject genuinely needs different pacing.
3. Each week's "teacherObjective" must use professional scheme-of-work language (e.g. "By the end of the lesson, students should be able to define and apply...").
4. "evaluation" must specify a genuine assessment method (oral questions, class exercise, assignment, practical demonstration) — not a generic placeholder.
5. Include specific instructional materials per week, not "textbook and chalkboard" repeated every week.
6. If this is Second or Third Term, the content must NOT repeat First Term topics — it should be the next logical phase of the syllabus.

Return ONLY valid JSON, no markdown, in this exact structure:
{
  "classLevel": "${classLevel}",
  "subject": "${subject}",
  "curriculum": "${curriculumLabel}",
  "term": "${termLabel}",
  "textbook": ${textbook ? `"${textbook}"` : "null"},
  "textbookNote": "Brief note on how the textbook informed topic sequencing, or null if no textbook given",
  "weeks": [
    {
      "week": 1,
      "topic": "specific topic name",
      "subtopics": ["specific sub-topic 1", "specific sub-topic 2"],
      "teacherObjective": "Professional, specific learning objective for the teacher to deliver",
      "instructionalMaterials": ["specific material 1", "specific material 2"],
      "evaluation": "Specific assessment method for this week"
    }
  ]
}

Generate all 13 weeks.
    `.trim();
  }

  if (type === "lesson") {
    const styleGuide =
      curriculum === "british"
        ? "Use British lesson planning style: clear Learning Objective and Success Criteria stated in student-friendly language, a Starter/Hook activity, Main Teaching with modeling, Independent Practice, Plenary for reflection, and differentiation noted for different ability groups (SEN/EAL/More Able)."
        : curriculum === "combined"
        ? "Blend Nigerian lesson note structure (Topic, Objectives, Entry Behaviour, Instructional Materials, Presentation in clear teaching steps, Evaluation, Assignment) with British pedagogical rigor (Success Criteria, differentiation for mixed-ability classrooms, a Plenary/reflection close)."
        : "Use the standard Nigerian lesson note format familiar to Nigerian teachers and inspectors: Topic, Behavioural Objectives, Entry Behaviour, Instructional Materials, Content/Presentation delivered in clear sequential teaching steps, Evaluation, and Assignment.";

    return `
You are a master Nigerian classroom teacher and teacher-trainer writing a complete, ready-to-teach lesson plan that a real teacher could walk into class with and deliver confidently — no further editing needed.

CURRICULUM FRAMEWORK GUIDE:
${curriculumGuide}

LESSON STYLE:
${styleGuide}

TASK PARAMETERS:
- Class Level: ${classLevel}
- Subject: ${subject}
- Topic: ${topic || subject}
- Curriculum: ${curriculumLabel}
- Duration: 40 minutes

CRITICAL WRITING INSTRUCTION:
Do NOT use the literal labels "Audience", "Behaviour", "Condition", "Degree" or the acronym "ABCD" anywhere in the output. Instead, write the learning objectives as natural, well-formed paragraph prose that a Nigerian or British teacher would actually write in their lesson note — for example: "By the end of the lesson, JSS2 students should be able to correctly identify and classify the four types of simple sentences, using examples drawn from everyday conversation, with at least 80% accuracy in the evaluation exercise." The ABCD principle should silently inform how you write the objective (clear audience, observable behaviour, conditions, measurable degree) but it must read as flowing, professional prose, never as labeled fields.

REQUIREMENTS:
1. The "objectivesParagraph" must be 2-4 sentences of natural prose, not bullet points or labeled fields.
2. "entryBehaviour" should be a short paragraph describing realistic prior knowledge for this class level.
3. "presentationSteps" should read like genuine teaching narration — what the teacher says and does, not just a list of headers. Each step should be a full paragraph (3-5 sentences) describing the actual teaching moment.
4. Include at least one suggested visual aid or diagram description per major step where it would help (describe what the image/diagram should show — this will be used to source or generate an actual image).
5. "evaluation" questions must directly test the stated objective.
6. Keep language warm, professional, and immediately usable — this is for a real teacher's lesson note book.

Return ONLY valid JSON, no markdown, in this exact structure:
{
  "classLevel": "${classLevel}",
  "subject": "${subject}",
  "topic": "${topic || subject}",
  "curriculum": "${curriculumLabel}",
  "duration": "40 minutes",
  "date": "_______________",
  "objectivesParagraph": "Natural flowing paragraph stating what students will achieve, how, and to what standard — written as prose, no labeled ABCD fields",
  "entryBehaviour": "Paragraph describing what students already know coming into this lesson",
  "instructionalMaterials": ["material 1", "material 2", "material 3"],
  "suggestedVisualAid": "Description of one key image, chart or diagram that should accompany this lesson, written so an image search or generator could find/create it",
  "presentationSteps": [
    {"step": "Introduction (5 mins)", "narration": "Full paragraph describing exactly what the teacher does and says to open the lesson and capture interest"},
    {"step": "Presentation (15 mins)", "narration": "Full paragraph describing how the core content is taught, with a specific worked example embedded in the prose"},
    {"step": "Application (12 mins)", "narration": "Full paragraph describing guided practice, what students do, how the teacher monitors and corrects"},
    {"step": "Independent Practice (5 mins)", "narration": "Full paragraph describing what students do on their own"},
    {"step": "Conclusion (3 mins)", "narration": "Full paragraph describing how the lesson is summarised and checked for understanding"}
  ],
  "studentActivities": ["activity 1 in plain sentence form", "activity 2"],
  "evaluation": {
    "type": "Written Exercise",
    "questions": ["question 1 testing the objective directly", "question 2", "question 3"]
  },
  "assignment": "A specific, well-described homework task connected directly to the lesson",
  "references": ["reference 1", "reference 2"]
}
    `.trim();
  }

  if (type === "assessment") {
    return `
You are a WAEC-experienced Nigerian examiner setting a rigorous, standard examination paper.

CURRICULUM FRAMEWORK GUIDE:
${curriculumGuide}

TASK PARAMETERS:
- Class Level: ${classLevel}
- Subject: ${subject}
- Topic/Coverage: ${topic || subject}
- Curriculum: ${curriculumLabel}

REQUIREMENTS — READ CAREFULLY:
1. Generate EXACTLY 50 objective (multiple choice) questions, each with 4 options (A-D) and one correct answer.
2. The 50 questions MUST be ordered by difficulty: questions 1-15 are EASY (recall/definition level), questions 16-35 are MODERATE (application/comprehension level), questions 36-50 are DIFFICULT (analysis/problem-solving level, multi-step reasoning).
3. Distractors (wrong options) must be plausible, not silly — based on common student misconceptions.
4. For at least 8 of the 50 questions, include an "imagePrompt" field describing a simple diagram, chart or illustration that would accompany that question (e.g. a labeled diagram, a graph to read, a map, a shape) — only where genuinely useful to the question, not forced.
5. Generate EXACTLY 10 theory (essay/structured) questions in Section B, ordered from easier to more demanding, covering different cognitive levels (knowledge, application, analysis, evaluation). Vary question types: some "define and explain", some "solve and show working", some "compare and contrast", some "describe a process".
6. Assign realistic marks per theory question (totaling to a sensible exam, e.g. out of 50-60 marks for Section B).
7. All content must be appropriate and achievable for ${classLevel} students — do not exceed their curriculum level.

Return ONLY valid JSON, no markdown, in this exact structure:
{
  "classLevel": "${classLevel}",
  "subject": "${subject}",
  "topic": "${topic || subject}",
  "curriculum": "${curriculumLabel}",
  "duration": "90 minutes",
  "totalMarks": 110,
  "instructions": "Answer ALL questions in Section A. Answer any 5 questions in Section B.",
  "objectiveQuestions": [
    {
      "number": 1,
      "difficulty": "easy",
      "question": "question text",
      "options": ["A. option", "B. option", "C. option", "D. option"],
      "answer": "A. option",
      "imagePrompt": "optional description of accompanying diagram, omit field entirely if not needed"
    }
  ],
  "theoryQuestions": [
    {
      "number": 1,
      "difficulty": "moderate",
      "question": "detailed theory question, multi-part where appropriate using (a) (b) (c)",
      "marks": 10,
      "guideline": "Concise marking guideline covering what a full-marks answer must include"
    }
  ]
}

Generate all 50 objective questions and all 10 theory questions in full — do not truncate or summarise.
    `.trim();
  }

  if (type === "resource") {
    return `
You are an instructional design specialist creating a resource pack for Nigerian classroom teachers with limited budgets but a desire for visually engaging teaching.

CURRICULUM FRAMEWORK GUIDE:
${curriculumGuide}

TASK PARAMETERS:
- Class Level: ${classLevel}
- Subject: ${subject}
- Topic: ${topic || subject}
- Curriculum: ${curriculumLabel}

REQUIREMENTS:
1. For "visualAids", describe each as a complete, specific, ready-to-source teaching image — detailed enough that a real image could be found or generated from the description (e.g. not "a chart about plants" but "a labeled diagram showing a flowering plant's roots, stem, leaves, and flower, each part clearly labeled with arrows, in a colourful botanical-illustration style suitable for Primary 4 students").
2. For each visual aid, also provide a short "imageSearchQuery" — a concise 3-6 word search phrase that could find or generate that exact image.
3. Cover all categories below thoroughly and specifically to this exact topic, not generically to the subject.
4. "audioResources" should suggest real types of audio content (pronunciation guides, recorded explanations, songs/mnemonics) relevant to this specific topic.
5. "audioVisualResources" should describe specific video/animation content ideas relevant to this topic (not just "watch a YouTube video" — describe what the video should show).
6. Ground "localNigerianContext" and "lowCostMaterials" in things actually available in a typical Nigerian classroom or local market.

Return ONLY valid JSON, no markdown, in this exact structure:
{
  "classLevel": "${classLevel}",
  "subject": "${subject}",
  "topic": "${topic || subject}",
  "visualAids": [
    {"description": "detailed specific visual aid description", "imageSearchQuery": "short search phrase"}
  ],
  "audioResources": ["specific audio resource idea 1", "specific audio resource idea 2"],
  "audioVisualResources": ["specific video/animation idea 1", "specific video/animation idea 2"],
  "handOnActivities": ["specific hands-on activity 1", "specific hands-on activity 2", "specific hands-on activity 3"],
  "localNigerianContext": ["specific local example 1", "specific local example 2"],
  "digitalResources": ["specific digital resource idea 1", "specific digital resource idea 2"],
  "lowCostMaterials": ["specific low-cost material 1", "specific low-cost material 2", "specific low-cost material 3"],
  "teachingTips": ["specific practical tip 1", "specific practical tip 2"]
}

Generate at least 5 items in "visualAids" and at least 3 items in every other category.
    `.trim();
  }

  return `Generate a curriculum outline for ${subject} for ${classLevel} following the ${curriculumLabel}. Return valid JSON.`;
}