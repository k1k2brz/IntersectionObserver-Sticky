(() => {
  const actions = {
    birdFlies(key) {
      // 스크롤바 위로 올렸을 때 새 날아가는게 역행하면 안됨
      if (key) {
        // true면
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`;
      } else {
        // false면
        document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-150%)`;
        // 초기화
      }
      // data-index가 2인 자식 bird
    },
    birdFlies2(key) {
      if (key) {
        document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${
          -window.innerHeight * 0.7
        }px)`;
      } else {
        document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
      }
    },
  };

  const stepElems = document.querySelectorAll(".step");
  const graphicElems = document.querySelectorAll(".graphic-item");
  // 현재 활성화된(visible 클래스가 붙은) .graphic-item을 지정
  let currentItem = graphicElems[0];
  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    // console.log(entries[0].target.dataset.index);
    ioIndex = parseInt(entries[0].target.dataset.index);
    // 팁- * 1 해주면 숫자로 바뀜
    // console.log(ioIndex);
  });

  for (let i = 0; i < stepElems.length; i++) {
    // 요소가 나타나거나 사라질 때 마다 콜백함수가 실행
    io.observe(stepElems[i]);
    /** element.setAttribute( 'attributename', 'attributevalue' ) 일 때
     attributename에는 속성 이름을, attributevalue에는 속성값을 넣습니다.
     만약 이미 속성값이 존재한다면 그 값을 지우고 새 값을 적용합니다.
    */
    // stepElems[i].setAttribute('data-index', i);
    // dataset이라고 자체적으로 넣기 가능
    // HTML의 요소들 안에 dataset-index 번호순으로 넣기
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  const activate = (action) => {
    // 여기에 visible class 붙임
    currentItem.classList.add("visible");
    if (action) {
      //action에 birdflies가 들어올 시 actions[birdflies]
      actions[action](true);
      // true가 들어오면 1번
    }
  };

  const inactivate = (action) => {
    // 이미지 1개씩 나오도록
    currentItem.classList.remove("visible");
    if (action) {
      actions[action](false);
      //false는 2번
    }
  };

  window.addEventListener("scroll", () => {
    let step;
    let boundingRect;

    // for (let i = 0; i < stepElems.length; i++) {
    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      // 현재 값의 -1 현재 값의 + 1(-1부터 시작하니 +2해야 + 1) - 현재꺼의 전후, 현재값만 계산
      //  루프 횟수 줄이기
      step = stepElems[i];
      if (!step) continue;
      boundingRect = step.getBoundingClientRect();
      //getBoundingClientRect 원하는 위치값 얻기
      //   console.log(boundingRect);

      if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
        // dataset 나올 때 마다 이미지 변경
        // console.log(step.dataset.index);
        inactivate(currentItem.dataset.action);
        currentItem = graphicElems[step.dataset.index];
        activate(currentItem.dataset.action);
        // birdflies이름 가져오기
      }
    }
  });

  // 새로고침시 맨 위로
  window.addEventListener("load", () => {
    setTimeout(() => {
      scrollTo(0, 0);
    }, 100);
  });

  activate();
})();
