document.addEventListener('DOMContentLoaded', function() {
  // Get form elements
  const ageInput = document.getElementById('age');
  const genderSelect = document.getElementById('gender');
  const feetInput = document.getElementById('feet');
  const inchesInput = document.getElementById('inches');
  const weightInput = document.getElementById('weight');
  const activitySelect = document.getElementById('activity');
  const calculateBtn = document.getElementById('calculate-btn');
  const resultContainer = document.getElementById('result-container');
  const resultDiv = document.getElementById('result');
  const explanationDiv = document.getElementById('explanation');
  
  // Error message elements
  const ageError = document.getElementById('age-error');
  const genderError = document.getElementById('gender-error');
  const heightError = document.getElementById('height-error');
  const weightError = document.getElementById('weight-error');
  const activityError = document.getElementById('activity-error');
  
  // Activity level multipliers
  const activityMultipliers = {
    'sedentary': 1.0,
    'light': 1.1,
    'moderate': 1.2,
    'active': 1.3,
    'very-active': 1.4
  };
  
  // Format activity level for display
  const activityLabels = {
    'sedentary': 'Sedentary',
    'light': 'Light',
    'moderate': 'Moderate',
    'active': 'Active',
    'very-active': 'Very Active'
  };
  
  // Calculate button click handler
  calculateBtn.addEventListener('click', function() {
    // Reset error messages
    resetErrors();
    
    // Validate inputs
    if (!validateInputs()) {
      return;
    }
    
    // Get input values
    const age = parseInt(ageInput.value);
    const gender = genderSelect.value;
    const weight = parseFloat(weightInput.value);
    const activityLevel = activitySelect.value;
    
    // Calculate daily protein needs
    const weightInKg = weight / 2.2;
    const activityMultiplier = activityMultipliers[activityLevel];
    const seniorMultiplier = age > 65 ? 1.1 : 1.0;
    
    const dailyProtein = (weightInKg * 0.8 * activityMultiplier) * seniorMultiplier;
    
    // Display result
    resultDiv.textContent = `${dailyProtein.toFixed(1)} grams of protein per day`;
    
    // Create explanation
    let explanation = `Based on your weight (${weight} lbs / ${weightInKg.toFixed(1)} kg), `;
    explanation += `${activityLabels[activityLevel]} activity level (${activityMultiplier}x multiplier)`;
    
    if (age > 65) {
      explanation += `, and senior age (1.1x multiplier)`;
    }
    
    explanation += `, your recommended daily protein intake is ${dailyProtein.toFixed(1)} grams.`;
    
    explanationDiv.textContent = explanation;
    resultContainer.classList.remove('hidden');
  });
  
  // Input validation function
  function validateInputs() {
    let isValid = true;
    
    // Validate age
    if (!ageInput.value) {
      ageError.textContent = 'Please enter your age';
      isValid = false;
    } else if (parseInt(ageInput.value) < 1 || parseInt(ageInput.value) > 999) {
      ageError.textContent = 'Age must be between 1 and 999';
      isValid = false;
    }
    
    // Validate gender
    if (!genderSelect.value) {
      genderError.textContent = 'Please select your gender';
      isValid = false;
    }
    
    // Validate height
    if (!feetInput.value && !inchesInput.value) {
      heightError.textContent = 'Please enter your height';
      isValid = false;
    } else if (parseInt(inchesInput.value) > 11) {
      heightError.textContent = 'Inches must be between 0 and 11';
      isValid = false;
    }
    
    // Validate weight
    if (!weightInput.value) {
      weightError.textContent = 'Please enter your weight';
      isValid = false;
    } else if (parseFloat(weightInput.value) <= 0) {
      weightError.textContent = 'Weight must be greater than 0';
      isValid = false;
    }
    
    // Validate activity level
    if (!activitySelect.value) {
      activityError.textContent = 'Please select your activity level';
      isValid = false;
    }
    
    return isValid;
  }
  
  // Reset error messages
  function resetErrors() {
    ageError.textContent = '';
    genderError.textContent = '';
    heightError.textContent = '';
    weightError.textContent = '';
    activityError.textContent = '';
  }
});
