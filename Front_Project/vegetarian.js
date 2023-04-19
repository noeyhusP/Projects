(()=>{
    const $h1 = document.querySelector("h1");

        // 타이머를 활용해 역주행으로 올라오는 코드

        // opacity 값의 범위는 0~1 (0~100%)
        let opacityValue = 0;
        let value = 0;

        const timerId = setInterval(()=>{

            $h1.style.transform = `translateY(${value}%)`

            // translateY 범위 = 0 - 100
            value --;
            // value값을 감소하게 하면 값이 줄어들기 때문에 역주행

            if (value < -450) // 100%란 자기크기의 100%
            {
                $h1.style.transform = `translateY(${value}%)`
                // value가 -500이 됐을 때까지 작아지다가
                // -500이 되거나 넘어가면 translateY가 그 value값에서 멈추고
                clearInterval(timerId);
                // setInterval 종료
            }
            if (opacityValue <= 1)
            {
                $h1.style.opacity = opacityValue;
                opacityValue += 0.003
                // opacity는 20ms마다 0.005씩 증가 
            }
        },20)
})();