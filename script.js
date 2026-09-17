document.addEventListener('DOMContentLoaded', () => {
  // 1. Mouse Follower Effect
  const dot = document.querySelector('.cursor-dot');
  const glow = document.querySelector('.cursor-glow');

  if (dot && glow) {
    window.addEventListener('mousemove', (e) => {
      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
      
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    });
  }

  // 2. Hydration Counter Logic (PulseGym)
  const waterDisplay = document.getElementById('waterCount');
  const addBtn = document.getElementById('addGlass');
  const removeBtn = document.getElementById('removeGlass');

  if (waterDisplay && addBtn && removeBtn) {
    let count = parseInt(waterDisplay.innerText) || 0;

    addBtn.addEventListener('click', () => {
      count++;
      waterDisplay.innerText = count;
    });

    removeBtn.addEventListener('click', () => {
      if (count > 0) {
        count--;
        waterDisplay.innerText = count;
      }
    });
  }

  // 3. BMI Calculation Logic (PulseGym)
  const calcBtn = document.getElementById('calcBmiBtn');
  const weightInput = document.getElementById('bmiWeight');
  const heightInput = document.getElementById('bmiHeight');
  const bmiResult = document.getElementById('bmiResult');

  if (calcBtn && weightInput && heightInput && bmiResult) {
    calcBtn.addEventListener('click', () => {
      const w = parseFloat(weightInput.value);
      const h = parseFloat(heightInput.value) / 100;

      if (w > 0 && h > 0) {
        const bmi = (w / (h * h)).toFixed(1);
        let status = '';

        if (bmi < 18.5) status = 'Underweight';
        else if (bmi < 24.9) status = 'Normal weight';
        else if (bmi < 29.9) status = 'Overweight';
        else status = 'Obese';

        bmiResult.innerHTML = `<strong>BMI: ${bmi}</strong> (${status})`;
      } else {
        bmiResult.innerText = 'Please enter valid height and weight.';
      }
    });
  }

  // 4. Workout Tab Switcher (PulseGym)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const currentDayLabel = document.getElementById('currentDay');
  const routineList = document.getElementById('routineList');

  const routines = {
    mon: [
      { name: 'Bench Press', reps: '4 x 8' },
      { name: 'Incline Dumbbell Press', reps: '3 x 10' },
      { name: 'Tricep Pushdowns', reps: '4 x 12' }
    ],
    tue: [
      { name: 'Lat Pulldown', reps: '4 x 10' },
      { name: 'Barbell Bent Rows', reps: '3 x 10' },
      { name: 'Hammer Curls', reps: '4 x 12' }
    ],
    wed: [
      { name: 'Barbell Squats', reps: '4 x 8' },
      { name: 'Romanian Deadlifts', reps: '3 x 10' },
      { name: 'Hanging Leg Raises', reps: '3 x 15' }
    ],
    thu: [
      { name: 'Incline Treadmill Walk', reps: '30 mins' },
      { name: 'Foam Rolling & Mobility', reps: '15 mins' }
    ]
  };

  if (tabBtns.length && routineList) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const dayKey = btn.getAttribute('data-day');
        if (currentDayLabel) currentDayLabel.innerText = dayKey.toUpperCase();

        const selectedRoutine = routines[dayKey] || [];
        routineList.innerHTML = selectedRoutine.map(item => 
          `<li><span>${item.name}</span> <strong>${item.reps}</strong></li>`
        ).join('');
      });
    });
  }
});
