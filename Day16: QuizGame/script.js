const correctAnswers = ['A', 'B', 'A', 'B'];
const form = document.querySelector('.form');
const result = document.querySelector('.result');

form.addEventListener('submit', e => {
  e.preventDefault();
  
//   check answers
  let score = 0;
  const userAnswers = [form.q1.value, form.q2.value, form.q3.value, form.q4.value];
  userAnswers.forEach((answer, index) => {
    if (answer === correctAnswers[index]){
      score += 25;
    }
  });
  
//   slide the page up, display result block
  scrollTo(0, 0);
  result.classList.remove('d-none');
  
//   show result
  let output = 0;
  const timer = setInterval(() => {
    result.querySelector('span').textContent = `${output}%`;
    if (output === score){
      clearInterval(timer);
    } else {
      output++;
    }
  }, 10);
  
});