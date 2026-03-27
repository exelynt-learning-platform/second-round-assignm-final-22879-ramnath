import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// OpenAI API configuration
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ message, apiKey }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: message }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      return response.data.choices[0].message;
    } catch (error) {
      // Check if it's a Quota/Billing error (429)
      if (error.response?.status === 429) {
        console.warn("OpenAI Quota Exceeded. Switching to Mock Response for Demo.");
        
        // Return a simulated response after a short delay to keep the UI smooth
        await new Promise(resolve => setTimeout(resolve, 1000));
        return { 
          role: 'assistant', 
          content: `(Demo Mode): I received your message: "${message}". \n\nNote: Your OpenAI API key has exceeded its quota (Error 429), so I'm replying in Demo Mode!` 
        };
      }
      
      return rejectWithValue(
        error.response?.data?.error?.message || 'Failed to fetch AI response'
      );
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
    clearChat: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addMessage, clearError, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
