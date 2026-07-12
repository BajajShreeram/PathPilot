/**
 * AI Mentor Service
 * Calls backend API for AI mentor responses
 */

interface MentorRequest {
  message: string;
  profile?: Record<string, any>;
}

interface MentorResponse {
  reply: string;
}

// Get API URL from environment variable
// For production: This will be set to your deployed backend URL (e.g., https://api.pathpilot.com)
// For development: Falls back to localhost
const getApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;
  
  if (envUrl) {
    // Remove trailing slash if present
    return envUrl.replace(/\/$/, '');
  }
  
  // Development fallback
  return 'http://localhost:8000';
};

const API_BASE_URL = getApiUrl();

/**
 * Get AI mentor response from backend
 */
export async function getAIMentorResponse(
  userMessage: string,
  profileData?: Record<string, any>
): Promise<string> {
  const requestBody: MentorRequest = {
    message: userMessage,
    profile: profileData,
  };

  const endpoint = `${API_BASE_URL}/api/mentor`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Backend API error:', {
        endpoint,
        status: response.status,
        statusText: response.statusText,
        error: errorData,
      });

      // User-friendly error messages
      if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      } else if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment and try again.');
      } else {
        throw new Error('Failed to get response from AI mentor.');
      }
    }

    const data: MentorResponse = await response.json();

    if (!data.reply) {
      throw new Error('Invalid response from server.');
    }

    return data.reply;
  } catch (error) {
    console.error('Error calling AI mentor API:', error);
    
    // Re-throw the error with a user-friendly message
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Network error. Please check your connection and try again.');
  }
}
