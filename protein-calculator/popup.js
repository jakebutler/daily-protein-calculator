document.addEventListener('DOMContentLoaded', function() {
  // Get form elements
  const ageInput = document.getElementById('age');
  const genderSelect = document.getElementById('gender');
  const heightInput = document.getElementById('height-inches');
  const weightInput = document.getElementById('weight');
  const calculateBtn = document.getElementById('calculate-btn');
  const resultContainer = document.getElementById('result-container');
  const resultDiv = document.getElementById('result');
  const explanationDiv = document.getElementById('explanation');
  
  // Error message elements
  const ageError = document.getElementById('age-error');
  const genderError = document.getElementById('gender-error');
  const heightError = document.getElementById('height-error');
  const weightError = document.getElementById('weight-error');
  
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
    const heightInches = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    
    // Calculate Ideal Body Weight (IBW)
    let ibw;
    if (gender === 'male') {
      ibw = 50 + (2.3 * Math.max(0, heightInches - 60));
    } else {
      ibw = 45.5 + (2.3 * Math.max(0, heightInches - 60));
    }
    
    // Convert weights to kg
    const weightKg = weight / 2.2;
    const ibwKg = ibw;
    
    // Calculate Adjusted Body Weight (ABW)
    const abw = ibwKg + (0.4 * (weightKg - ibwKg));
    
    // Calculate protein range (1.2-1.5 g/kg)
    const proteinLow = abw * 1.2;
    const proteinHigh = abw * 1.5;
    
    // Apply senior multiplier if age > 65
    const seniorMultiplier = age > 65 ? 1.1 : 1.0;
    const proteinLowAdjusted = Math.round(proteinLow * seniorMultiplier);
    const proteinHighAdjusted = Math.round(proteinHigh * seniorMultiplier);
    
    // Display result
    resultDiv.textContent = `${proteinLowAdjusted}-${proteinHighAdjusted} grams of protein per day`;
    
    // Create explanation
    let explanation = `Based on your weight (${weight} lbs / ${weightKg.toFixed(1)} kg), `;
    explanation += `the adjusted body weight is ${(abw * 2.2).toFixed(1)} lbs / ${abw.toFixed(1)} kg`;
    
    if (age > 65) {
      explanation += `, and a 1.1x senior multiplier has been applied.`;
    } else {
      explanation += `.`;
    }
    
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
    if (!heightInput.value) {
      heightError.textContent = 'Please enter your height in inches';
      isValid = false;
    } else if (parseFloat(heightInput.value) < 0) {
      heightError.textContent = 'Height must be a positive number';
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
    
    return isValid;
  }
  
  // Reset error messages
  function resetErrors() {
    ageError.textContent = '';
    genderError.textContent = '';
    heightError.textContent = '';
    weightError.textContent = '';
  }
});
