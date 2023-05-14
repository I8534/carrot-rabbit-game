const start = document.querySelector('.start');
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;


function generateRandomValues() {
  const random_rabbit = Math.floor(Math.random() * 10);
  const random_carrot = Math.floor(Math.random() * 10);

  let rabbit = random_rabbit;
  let carrot = random_carrot;

  if (random_rabbit === 0) {
    rabbit = random_rabbit + 1;
  }

  if (random_carrot === 0) {
    carrot = random_carrot + 1;
  }

  return { rabbit, carrot };
}

const number_result_rabbit = generateRandomValues().rabbit;
const number_result_carrot = generateRandomValues().carrot;


function createRandomImageElements(tag, classname, count) {
  const elements = [];

  for (let i = 0; i < count; i++) {
    const element = document.createElement(tag);
    element.classList.add(classname);
    document.body.appendChild(element);
    elements.push(element);
  }

  return elements;
}

function applyRandomPositions(elements) {
  elements.forEach((element) => {
    const randomPosition = getRandomPosition(element);  // -> 여기서 궁금한 것 왜 const를 해도 에러가 안 뜨는지.
    element.style.left = randomPosition.x + 'px';
    element.style.top = randomPosition.y + 'px';
  });
}

function getRandomPosition(element) {
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  
  const imgHeight = element.clientHeight;
  const imgWidth = element.clientWidth;

  const randomX = Math.floor(Math.random() * (windowWidth - imgWidth));
  const randomY = Math.floor(Math.random() * (windowHeight - imgHeight));

  return { x: randomX, y: randomY };
}

function resetGame() {
  const rabbits = document.querySelectorAll('.rabbit');
  const carrots = document.querySelectorAll('.carrot');
  rabbits.forEach(rabbit => rabbit.remove());
  carrots.forEach(carrot => carrot.remove());
  start.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
  document.querySelector('.counting').textContent = '0';
}


start.addEventListener('click', () => {
  let timeRemaining = 11;
  const stop = document.querySelector('.start i');
  const timeDisplay = document.querySelector('.time');

  if (!stop.classList.contains('fa-stop')) {

    const rabbits = createRandomImageElements('img', 'rabbit', number_result_rabbit);
    const carrots = createRandomImageElements('img', 'carrot', number_result_carrot);
    applyRandomPositions(rabbits);
    applyRandomPositions(carrots);

    const timer = setInterval(() => {
      timeRemaining--;
      timeDisplay.textContent = '00:' + (timeRemaining < 10 ? '0' + timeRemaining : timeRemaining);
      
      if (timeRemaining <= 0) {
        clearInterval(timer);
        alert('졌습니다.');
        start.innerHTML = '<i class="fa-solid fa-recycle"></i>';
        start.querySelector('i').addEventListener('click', () => {
          resetGame();
        });
      }
    }, 1000);

        // 당근 클릭 이벤트 추가
    carrots.forEach(carrot => {
      carrot.addEventListener('click', () => {
        const counting = document.querySelector('.counting');
        counting.textContent = parseInt(counting.textContent) + 1;
        carrot.remove();
        const remainingCarrots = document.querySelectorAll('.carrot').length;
        if (remainingCarrots === 0) {
          clearInterval(timer);
          alert('이겼습니다!');
          start.innerHTML = '<i class="fa-solid fa-recycle"></i>';
          start.querySelector('i').addEventListener('click', () => {
            resetGame();
          });
        }  
    });
  });

  // 토끼 클릭 이벤트 추가
    rabbits.forEach(rabbit => {
      rabbit.addEventListener('click', () => {
        alert('졌습니다.');
        start.innerHTML = '<i class="fa-solid fa-recycle"></i>';
        start.querySelector('i').addEventListener('click', () => {
          resetGame();
        });
      });
  });  


  }
  start.innerHTML = '<i class="fa-solid fa-stop"></i>';
  

});

