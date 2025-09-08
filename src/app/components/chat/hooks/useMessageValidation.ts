import { useState, useCallback } from 'react';
import { validateMessage } from '../utils/helpers';

export const useMessageValidation = () => {
  const [validationError, setValidationError] = useState<string | null>(null);

  const validate = useCallback((text: string) => {
    const result = validateMessage(text);
    setValidationError(result.isValid ? null : result.error);
    return result.isValid;
  }, []);

  const clearError = useCallback(() => {
    setValidationError(null);
  }, []);

  return {
    validationError,
    validate,
    clearError,
    isValid: !validationError,
  };
};
