(()=>{

    let yOffset = 0;
    // scrollY값

    let currentSection = 0;
    // 현재 섹션
    let sectionYoffset = 0;

    ////////////////// function ///////////////////////////////////////////////

    const sectionSet = [
        // section0 정보
        {
            height : 0,
            // hMultiple : 1.117,
            hMultiple : 1.5,
            objs :
            {
                container : document.querySelector("#section-0"),
                levelA : document.querySelector(".section0-level.a"), 
                levelB : document.querySelector(".section0-level.b"),
                levelC : document.querySelector(".section0-level.c"),
                levelD : document.querySelector(".section0-level.d"),
                levelE : document.querySelector(".section0-level.e"), 
                levelF : document.querySelector(".section0-level.f"),
                levelG : document.querySelector(".section0-level.g")
            }
    
        },
        {
            height : 0,
            hMultiple : 3
        }
        ];


    const setLayout = function()
    {
        let height = 0;

        if (window.innerHeight < 500)
        {
            // 강제로 높이를 500으로 설정
            height = 500;
        }
        else{
            // height값을 window.innerHeight로 맞춰줌
            height = window.innerHeight;

        }

        for (let i = 0; i < sectionSet.length; i++)
        {
            // 위의 경우로 따온 height를 그대로 적용
            sectionSet[i].height = height * sectionSet[i].hMultiple;
            // console.log("적용된 높이 : " + sectionSet[i].height)
            sectionSet[i].objs.container.style.height = `${sectionSet[i].height}px`;
        }

    }

    // global nav를 일정 높이 이상이 되면 fixed하기
    const setGlobalnavMenu = function()
    {
        if (yOffset > 70)
        {
            // local-nav를 fixed 시키기
            document.body.classList.add('global-nav-sticky')
        }
        else
        {
            // local-nav를 원래상태로 돌리기
            document.body.classList.remove('global-nav-sticky')
        }
    }

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
                // value가 -450이 됐을 때까지 작아지다가
                // -450이 되거나 넘어가면 translateY가 그 value값에서 멈추고
                clearInterval(timerId);
                // setInterval 종료
            }
            if (opacityValue <= 1)
            {
                $h1.style.opacity = opacityValue;
                opacityValue += 0.002
            }
        },30)

    /////////////// eventlistener //////////////////////////////////////

    window.addEventListener('scroll', ()=>{
        // 스크롤값을 yOffset으로 설정
        yOffset = window.scrollY;

        // global nav 일정높이 이상 fix & blur
        setGlobalnavMenu();

    });

    window.addEventListener('load', ()=>
    {
        setLayout();
        yOffset = window.scrollY;
    });
})();