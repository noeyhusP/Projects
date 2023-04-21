(()=>{
    //scrollY값 초기화
    let yOffset = 0;

    // 현재 섹션 초기화
    let currentSection = 0;

    // sectionYoffset 초기화
    let sectionYoffset = 0;

    // function //////////////////////////////////////////////////////

    // section 정보값들 배열으로 넣어줌
    const sectionSet = 
    [
        {
            // section-0 정보
            height : 0,
            hMultiple : 1,
            objs : {
                container : document.querySelector("#section-0"),
            }
        },
        {
            // section-1 정보 (definition)
            height : 0,
            hMultiple : 1,
            objs : {
                container : document.querySelector("#section-1"),

            }
        },
        { 
            // section-2 정보 (instance1)
            height : 0,
            hMultiple : 1,
            objs : {
                container : document.querySelector("#section-2"),

            }
        },
        // {
        //     // section-3 정보 (instance2)
        //     height : 0,
        //     hMultiple : 1,
        //     objs : {
        //         container : document.querySelector("#section-3"),

        //     }
        // },
        // {
        //     // section-4 정보 (instance3)
        //     height : 0,
        //     hMultiple : 1,
        //     objs : {
        //         container : document.querySelector("#section-4"),

        //     }
        // }

    ]

    // 레이아웃 잡아주는 함수
    const setLayout = function()
    { 
        let height = 0;

        if (window.innerHeight < 500)
        {
            height = 500;
        }
        else 
        {
            height = window.innerHeight;
        }

        for (let i = 0; i < sectionSet.length; i++ )
        {
            sectionSet[i].height = height * sectionSet[i].hMultiple;
            sectionSet[i].objs.container.style.height = `${sectionSet[i].height}px`;
        }
    }

    

    // 스크롤링 중 현재 섹션을 구하는 함수

    const getCurrentSection = function()
    {
        let segment = 
        [
            sectionSet[0].height,
            sectionSet[0].height + sectionSet[1].height,
            sectionSet[0].height + sectionSet[1].height + sectionSet[2].height,
            sectionSet[0].height + sectionSet[1].height + sectionSet[2].height
            + sectionSet[3].height,
            sectionSet[0].height + sectionSet[1].height + sectionSet[2].height
            + sectionSet[3].height + sectionSet[4].height
        ];

        if (yOffset <= segment[0])
        {
            section = 0;
        }
        else if ((yOffset > segment[0]) && (yOffset <= segment[1]))
        {
            section = 1;
        }
        else if ((yOffset > segment[1]) && (yOffset <= segment[2]))
        {
            section = 2;
        }
        else if ((yOffset > segment[2]) && (yOffset <= segment[3]))
        {
            section = 3;
        }
        // else if ((yOffset > segment[3]) && (yOffset <= segment[4]))
        // {
        //     section = 4;
        // }
        else
        {
            console.error("[ERROR]getCurrentSection()");
        }
        return section;
    }

    const setBodyID = function(section)
    {
        document.body.setAttribute("id", `show-section${section}`);
    }

    // local-nav가 일정 height 이상이 되면 fixed 시키기
    const setLocalnavMenu = function()
    {
        if (yOffset > 30)
        {
            // yOffset이 30이상이 되면 css class 추가
            document.body.classList.add('local-nav-sticky');
        }
        else 
        {
            // 30이상이 아닐 시 추가했던 class 삭제
            document.body.classList.remove('local-nav-sticky');
        }
    }

    // 섹션의 높이 그 자체를 구하는 함수 (이전섹션의 높이를 구해서 빼는 원리)
    const getPrevSectionHeight = function ()
    {
        let prevHeight = 0;
        for (let i = 0; i < currentSection; i++)
        {
            prevHeight = prevHeight + sectionSet[i].height;
        }
        return prevHeight;
    }

    // eventListener /////////////////////////////////////////////////

    // 스크롤할 때 마다 이벤트 발생
    window.addEventListener('scroll', ()=>{
        // yOffset에 스크롤값 넣어줌
        yOffset = window.scrollY;

        // 현재 섹션값 가져오기
        currentSection = getCurrentSection();

        // CSS 변경 적용
        setBodyID(currentSection);

        // local-nav-sticky 일정 높이 이상 적용
        setLocalnavMenu();

         
    })

    // 페이지 로딩이 끝날 때 마다 이벤트 발생
    window.addEventListener('load', ()=>{
        // 레이아웃 잡아줌
        setLayout();

        // yOffset에 스크롤값 넣어줌
        yOffset = window.scrollY;

        // 현재 섹션값 가져오기
        currentSection = getCurrentSection();

        // sectionYoffset 구하기
        sectionYoffset = yOffset - getPrevSectionHeight();

        // CSS 변경 적용
        setBodyID(currentSection);

        // local-nav-sticky 일정 높이 이상 적용
        setLocalnavMenu();

    })

    // 윈도우 사이즈가 변경될 때 마다 이벤트 발생
    window.addEventListener("resize", ()=>{
        // 레이아웃 다시 잡음
        setLayout();
    })
    
})();