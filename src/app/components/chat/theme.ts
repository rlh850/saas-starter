// Chat Component Theme Configuration
// Modify these values to customize the appearance of your chat components

export const chatTheme = {
  // Background Colors
  background: {
    primary: 'bg-black', // Main page background
    secondary: 'bg-black/95', // Chat container background
    card: 'bg-black', // Chat card background
  },

  // Border Colors
  border: {
    primary: 'border-[#1a1a1a]', // Main borders
    secondary: 'border-[#2a2a2a]', // Secondary borders
  },

  // Text Colors
  text: {
    primary: 'text-gray-100', // Main text color
    secondary: 'text-[#666666]', // Secondary text (timestamps, placeholders)
    muted: 'text-gray-500', // Muted text
  },

  // User Message Colors
  user: {
    background: 'bg-blue-600', // User message background
    text: 'text-white', // User message text
    avatar: 'bg-blue-600', // User avatar background
    avatarText: 'text-white', // User avatar text
  },

  // AI Message Colors
  ai: {
    background: 'bg-[#1a1a1a]', // AI message background
    text: 'text-gray-100', // AI message text
    avatar: 'bg-green-600', // AI avatar background
    avatarText: 'text-white', // AI avatar text
  },

  // Input Area Colors
  input: {
    background: 'bg-[#1a1a1a]', // Input background
    border: 'border-[#1a1a1a]', // Input border
    text: 'text-gray-100', // Input text
    placeholder: 'placeholder:text-[#666666]', // Placeholder text
    focus: {
      ring: 'focus:ring-blue-500', // Focus ring color
      border: 'focus:border-blue-500', // Focus border color
    },
  },

  // Button Colors
  button: {
    send: {
      background: 'bg-blue-600', // Send button background
      hover: 'hover:bg-blue-700', // Send button hover
      text: 'text-white', // Send button text
    },
  },

  // Loading Indicator Colors
  loading: {
    dots: 'bg-green-500', // Loading dots color
    text: 'text-[#666666]', // Loading text color
  },

  // Code Block Colors
  code: {
    background: 'bg-[#2a2a2a]', // Code block background
    text: 'text-gray-100', // Code block text
  },

  // Spacing and Sizing
  spacing: {
    container: 'p-6', // Container padding
    input: 'p-4', // Input area padding
    message: 'px-3 py-2', // Message bubble padding
    gap: 'gap-3', // Gap between elements
  },

  // Border Radius
  radius: {
    message: 'rounded-lg', // Message bubble radius
    input: 'rounded-lg', // Input radius
    button: 'rounded-lg', // Button radius
    avatar: 'rounded-full', // Avatar radius
  },

  // Shadows
  shadow: {
    container: 'shadow-2xl', // Container shadow
  },

  // Transitions
  transition: {
    default: 'transition-all duration-200', // Default transition
  },
} as const;

// Helper function to get theme values
export const getThemeValue = (path: string) => {
  const keys = path.split('.');
  let value: any = chatTheme;

  for (const key of keys) {
    value = value[key];
    if (value === undefined) {
      console.warn(`Theme path "${path}" not found`);
      return '';
    }
  }

  return value;
};

// CSS Custom Properties for dynamic theming
export const themeCSSVariables = {
  '--chat-bg-primary': '#000000',
  '--chat-bg-secondary': '#1a1a1a',
  '--chat-bg-card': '#000000',
  '--chat-border-primary': '#1a1a1a',
  '--chat-border-secondary': '#2a2a2a',
  '--chat-text-primary': '#f3f4f6',
  '--chat-text-secondary': '#666666',
  '--chat-user-bg': '#2563eb',
  '--chat-user-text': '#ffffff',
  '--chat-ai-bg': '#1a1a1a',
  '--chat-ai-text': '#f3f4f6',
  '--chat-input-bg': '#1a1a1a',
  '--chat-input-border': '#1a1a1a',
  '--chat-button-bg': '#2563eb',
  '--chat-button-hover': '#1d4ed8',
  '--chat-loading-dots': '#10b981',
} as const;
