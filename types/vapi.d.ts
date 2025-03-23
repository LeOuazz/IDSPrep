// VAPI Enums
enum MessageTypeEnum {
  TRANSCRIPT = "transcript",
  FUNCTION_CALL = "function-call",
  FUNCTION_CALL_RESULT = "function-call-result",
  ADD_MESSAGE = "add-message",
}

enum MessageRoleEnum {
  USER = "user",
  SYSTEM = "system",
  ASSISTANT = "assistant",
}

enum TranscriptMessageTypeEnum {
  PARTIAL = "partial",
  FINAL = "final",
}

// VAPI Base Interfaces
interface BaseMessage {
  type: MessageTypeEnum;
}

interface TranscriptMessage extends BaseMessage {
  type: MessageTypeEnum.TRANSCRIPT;
  role: MessageRoleEnum;
  transcriptType: TranscriptMessageTypeEnum;
  transcript: string;
}

interface FunctionCallMessage extends BaseMessage {
  type: MessageTypeEnum.FUNCTION_CALL;
  functionCall: {
    name: string;
    parameters: unknown;
  };
}

interface FunctionCallResultMessage extends BaseMessage {
  type: MessageTypeEnum.FUNCTION_CALL_RESULT;
  functionCallResult: {
    forwardToClientEnabled?: boolean;
    result: unknown;
    [a: string]: unknown;
  };
}

interface AddMessage extends BaseMessage {
  type: MessageTypeEnum.ADD_MESSAGE;
  message: {
    role: MessageRoleEnum;
    content: string;
  };
}

// Main Message type for VAPI
type VapiMessage =
    | TranscriptMessage
    | FunctionCallMessage
    | FunctionCallResultMessage
    | AddMessage;

// Integration with your application

// For storing VAPI responses in Firebase
interface VapiTranscript {
  messages: {
    role: string;
    content: string;
    timestamp?: string;
  }[];
  interviewId: string;
  userId: string;
}

// For generating interviews with VAPI
interface GenerateInterviewWithVapi {
  type: string;
  role: string;
  level: string;
  techstack: string;
  amount: string | number;
  userid: string;
  vapiSessionId?: string;
}

// Configuration for VAPI client
interface VapiClientConfig {
  assistantId: string;
  sessionId?: string;
  userId: string;
  initialMessages?: {
    role: MessageRoleEnum;
    content: string;
  }[];
}

// VAPI Function types for interview process
interface VapiFunctions {
  generateFeedback: (params: CreateFeedbackParams) => Promise<Feedback>;
  storeTranscript: (params: VapiTranscript) => Promise<{ success: boolean }>;
  getInterviewQuestions: (interviewId: string) => Promise<string[]>;
}

// Export all types
export {
  MessageTypeEnum,
  MessageRoleEnum,
  TranscriptMessageTypeEnum,
  type BaseMessage,
  type TranscriptMessage,
  type FunctionCallMessage,
  type FunctionCallResultMessage,
  type AddMessage,
  type VapiMessage,
  type VapiTranscript,
  type GenerateInterviewWithVapi,
  type VapiClientConfig,
  type VapiFunctions
};