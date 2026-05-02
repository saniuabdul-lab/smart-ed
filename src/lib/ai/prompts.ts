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
    curriculum === "nigerian" ? "Nigerian NERDC Curriculum" :
    curriculum === "british"  ? "British National Curriculum" :
                                "Combined Nigerian + British Curriculum";

  const prompts: Record<string, string> = {
    curriculum: `
      Generate a structured curriculum outline for:
      - Class: ${classLevel}
      - Subject: ${subject}
      - Curriculum: ${curriculumLabel}
      - Term: ${term || "First Term"}

      Return JSON with this exact structure:
      {
        "classLevel": string,
        "subject": string,
        "term": string,
        "weeks": [
          {
            "week": number,
            "topic": string,
            "subtopics": string[],
            "objectives": string[],
            "outcome": string,
            "activities": string[],
            "resources": string[]
          }
        ]
      }
      Generate 5 weeks. Make content specific to Nigerian school context.
    `,

    scheme: `
      Generate a First Term scheme of work for:
      - Class: ${classLevel}
      - Subject: ${subject}
      - Curriculum: ${curriculumLabel}

      Return JSON:
      {
        "classLevel": string,
        "subject": string,
        "term": "First Term",
        "weeks": [
          {
            "week": number,
            "topic": string,
            "subtopics": string[],
            "teacherObjective": string,
            "evaluation": string
          }
        ]
      }
      Generate 13 weeks covering a full Nigerian school term.
    `,

    lesson: `
      Generate a lesson plan using the ABCD Objective Method for:
      - Class: ${classLevel}
      - Subject: ${subject}
      - Topic: ${topic || subject}
      - Duration: 40 minutes
      - Curriculum: ${curriculumLabel}

      Return JSON:
      {
        "topic": string,
        "classLevel": string,
        "subject": string,
        "duration": "40 minutes",
        "method": "ABCD Objective Method",
        "objectives": {
          "audience": string,
          "behaviour": string,
          "condition": string,
          "degree": string
        },
        "teacherActivities": [{ "step": string, "activity": string }],
        "studentActivities": string[],
        "evaluation": { "type": string, "questions": string[] },
        "assignment": string,
        "materials": string[]
      }
    `,

    assessment: `
      Generate an assessment for:
      - Class: ${classLevel}
      - Subject: ${subject}
      - Topic: ${topic || subject}
      - Curriculum: ${curriculumLabel}

      Return JSON:
      {
        "classLevel": string,
        "subject": string,
        "topic": string,
        "duration": "45 minutes",
        "objectiveQuestions": [
          { "question": string, "options": string[], "answer": string }
        ],
        "theoryQuestions": [
          { "question": string, "marks": number }
        ]
      }
      Generate exactly 10 objective questions and 3 theory questions.
      Make all questions relevant to Nigerian school context.
    `,

    resource: `
      Generate instructional resource suggestions for:
      - Class: ${classLevel}
      - Subject: ${subject}
      - Curriculum: ${curriculumLabel}

      Return JSON:
      {
        "classLevel": string,
        "subject": string,
        "visualAids": string[],
        "handOnActivities": string[],
        "localContext": string[],
        "digitalResources": string[],
        "lowCostMaterials": string[]
      }
      Focus on resources available in Nigerian schools.
    `,
  };

  return prompts[type] || prompts.curriculum;
}