import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

// No new type definitions to avoid ESLint no-unused-vars errors

export async function POST(request: Request) {
  try {
    // Parse the request body
    const requestData = await request.json();

    // Extract values with fallbacks
    const type = requestData.type || "mixed";
    const role = requestData.role || "developer";
    const level = requestData.level || "mid-level";
    const techstack = requestData.techstack || "";
    const amount = requestData.amount || "5";
    const userid = requestData.userid;

    // Check for required userid
    if (!userid) {
      return Response.json({
        success: false,
        error: "User ID is required"
      }, { status: 400 });
    }

    // Create prompt for Gemini
    const prompt = `Prepare ${amount} questions for a job interview.
      The job role is ${role}.
      The job experience level is ${level}.
      ${techstack ? `The skills used in the job is: ${techstack}.` : ''}
      The focus between behavioural and technical questions should lean towards: ${type}.
      
      IMPORTANT: Return ONLY a valid JSON array of strings containing the questions.
      Format exactly like this without any additional text:
      ["Question 1", "Question 2", "Question 3"]
      
      Do not use special characters like "/", "*", or others that might break a voice assistant.
    `;

    // Generate questions with Gemini
    const { text: questionsText } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: prompt,
    });

    // Parse and validate the response
    let questions;
    try {
      // Clean the response text to ensure it's valid JSON
      const cleanedText = questionsText.trim().replace(/```json|```/g, '');
      questions = JSON.parse(cleanedText);

      if (!Array.isArray(questions)) {
        throw new Error("Response is not an array");
      }
    } catch (error) {
      console.error("Failed to parse questions:", error, "Raw text:", questionsText);
      return Response.json({
        success: false,
        error: "Failed to parse AI response as JSON array"
      }, { status: 500 });
    }

    // Create the interview object
    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: techstack ? techstack.split(",").map((item: string) => item.trim()) : [],
      questions: questions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    // Save to Firebase
    try {
      const docRef = await db.collection("interviews").add(interview);

      return Response.json({
        success: true,
        interviewId: docRef.id
      }, { status: 200 });
    } catch (error) {
      console.error("Firebase error:", error);
      return Response.json({
        success: false,
        error: "Failed to save to database: " + (error instanceof Error ? error.message : "Unknown error")
      }, { status: 500 });
    }
  } catch (error) {
    console.error("Unhandled error in API route:", error);
    return Response.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, message: "Interview API is running" }, { status: 200 });
}