/**
 * Components Directory
 *
 * This directory should contain reusable React components that make up
 * the UI of your application. Components typically:
 *
 * - Render UI elements and handle user interactions
 * - Accept props for customization and data
 * - Manage local component state
 * - Implement responsive design patterns
 * - Follow consistent styling and design systems
 *
 * Example files that should go here:
 * - Button.tsx
 * - Modal.tsx
 * - Header.tsx
 * - Footer.tsx
 * - LoadingSpinner.tsx
 * - UserProfile.tsx
 * - PricingCard.tsx
 * - DashboardLayout.tsx
 *
 * Organization suggestions:
 * - ui/ (basic UI components like buttons, inputs)
 * - layout/ (header, footer, navigation components)
 * - forms/ (form-related components)
 * - charts/ (data visualization components)
 *
 * Remove this placeholder file once you add your first component.
 */

import React from "react";

interface PlaceholderProps {
  message?: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  message = "This is a placeholder component",
}) => {
  return (
    <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center text-gray-500">
      <p>{message}</p>
      <p className="text-sm mt-2">
        Replace this component with your actual UI components
      </p>
    </div>
  );
};

export default Placeholder;
