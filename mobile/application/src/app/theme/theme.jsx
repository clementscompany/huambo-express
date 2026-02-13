function theme(mode) {

  const lightMode = {
    primary: '#0A84FF',
    secondary: '#5856D6',
    background: '#f6f6f9',
    card: '#ffff',
    card2: '#E5E5EA',
    text: '#1C1C1E',
    text2: '#3a3a3cd3',
    white: '#FFFFFF',
    error: '#FF3B30',
    success: '#34C759',
    warning: '#FF9500',
    border: '#7676762a',
    colorButton: '#FFFFFF',
  };

  const darkMode = {
    primary: '#0A84FF',
    secondary: '#06ebc5',
    background: '#000000',
    card: '#030A1A',
    card2: '#050F2C',

    text: '#F9FAFB',
    text2: '#CBD5E1',

    white: '#FFFFFF',

    error: '#EF4444',
    success: '#22C55E',
    warning: '#F59E0B',

    border: '#081631',
    colorButton: '#FFFFFF',
  };

  return {
    colors: mode === 'dark' ? darkMode : lightMode,

    fontSizes: {
      xSmall: 10,
      small: 12,
      medium: 16,
      large: 20,
      xLarge: 24,
      xxLarge: 32,
    },

    spacing: {
      xSmall: 4,
      small: 8,
      medium: 16,
      large: 24,
      xLarge: 32,
    },

    borders: {
      radius: 12,
      width: 1,
      color: mode === 'dark' ? darkMode.border : lightMode.border,
    },

    shadows: {
      card:
        mode === 'dark'
          ? '0 4px 20px rgba(0,0,0,0.7)'
          : '0 2px 8px rgba(15,23,42,0.08)',
    },
  };
}

export default theme;
