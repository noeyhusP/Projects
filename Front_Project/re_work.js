(()=>{
    //scrollY값 초기화
    let yOffset = 0;

    // 현재 섹션 초기화
    let currentSection = 0;

    // sectionYoffset 초기화
    let sectionYoffset = 0;

    //====================== function =========================================

    // 각 섹션 정보값
    const sectionSet =
    [
        {
            //section-0
            height : 0,
            hMultiple : 1.115,
            objs : 
            {
                container : document.querySelector("#section-0"),

            }
        },
        {
            //section-1
            height : 0,
            hMultiple : 0.85,
            objs : 
            {
                container : document.querySelector("#section-1")
            }
        },
        {
            //section-2 (definition)
            height : 0,
            hMultiple : 6.5,
            objs : {
                container : document.querySelector("#section-2"),
                // picA : document.querySelector(".scroll-section"),
                sentenceA : document.querySelector(".section2-sentence.a"),
                sentenceB : document.querySelector(".section2-sentence.b"),
                sentenceC : document.querySelector(".section2-sentence.c"),
                sentenceD : document.querySelector(".section2-sentence.d"),
                sentenceE : document.querySelector(".section2-sentence.e"),
                sentenceF : document.querySelector(".section2-sentence.f"),

                canvas : document.querySelector("#first-canvas"),
                ctx : document.querySelector("#first-canvas").getContext("2d"),
            },
            vals : {
                imageCount : 229,
                canvasImages : [],
                imageIndex : [0, 228],
                // scroll opacity 값
                picA_fade_in : [0, 1, {start:0.01, end:0.07}],
                picA_fade_out : [1, 0, {start:0.87, end:0.9}],
                picA_maintain : [1, 1],

                // text opacity 값
                sentenceA_fade_in : [0, 1, {start:0.01, end:0.07}],
                sentenceB_fade_in : [0, 1, {start:0.07, end:0.17}],
                sentenceC_fade_in : [0, 1, {start:0.17, end:0.27}],
                sentenceD_fade_in : [0, 1, {start:0.27, end:0.37}],
                sentenceE_fade_in : [0, 1, {start:0.37, end:0.47}],
                sentenceF_fade_in : [0, 1, {start:0.47, end:0.6}],
            }
        },
        {
            //section-3
            height : 0,
            hMultiple : 1,
            objs : 
            {
                container : document.querySelector("#section-3")
            }
        },
        {
            //section-4
            height : 0,
            hMultiple : 1,
            objs : 
            {
                container : document.querySelector("#section-4")
            }
        },
        {
            //section-5
            height : 0,
            hMultiple : 1,
            objs : 
            {
                container : document.querySelector("#section-5")
            }
        }
    ]

    // 레이아웃 잡는 함수
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

    // 스크롤링 중 현재 섹션 구하는 함수
    const getCurrentSection = function()
    {
        let section = 0;
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
        else if ((yOffset > segment[3]) && (yOffset <= segment[4]))
        {
            section = 4;
        }
        else if ((yOffset > segment[4]) && (yOffset <= segment[5]))
        {
            section = 5;
        }
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
    const setGlobalnavMenu = function()
    {
        if (yOffset > 30)
        {
            // yOffset이 30이상이 되면 css class 추가
            document.body.classList.add('global-nav-sticky');
        }
        else 
        {
            // 30이상이 아닐 시 추가했던 class 삭제
            document.body.classList.remove('global-nav-sticky');
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

    // 캔버스에 이미지 불러오는 함수 선언
    const setCanvas = function()
    {
        let imgElement;
        const imgCount = sectionSet[2].vals.imageCount;
        const canvasImages = sectionSet[2].vals.canvasImages;
        const ctx = sectionSet[2].objs.ctx;

        for (let i = 0; i < imgCount; i++)
        {
            imgElement = new Image();
            imgElement.src = `./image_1/smokestack_${i}.png`;
            canvasImages.push(imgElement);

        }
        imgElement.addEventListener("load",()=>
        {
            ctx.drawImage(canvasImages[0], 0, 0);

        });
    }

    // opacity ratio 구하는 함수
    const calcValue = function(values)
    {
        let result = 0; // return할 값 초기화
        let ratio = 0;

        // 현재섹션의 높이 구하기
        const cur_height = sectionSet[currentSection].height;

        let partStart = 0;
        let partEnd = 0;
        let partHeight = 0;

        // value.length에 따라 다르게 if else로 작동하게 하기
        if (values.length === 2)
        {
            // 1. 비율을 구한다
            ratio = (sectionYoffset / cur_height);

            // 2. 비율에 따른 CSS값을 구한다
            result = ((values[1] - values[0]) * ratio) + values[0];
            
        }
        else if (values.length === 3)
        {
            // 애니메이션이 시작되는 지점
            partStart  = values[2].start * cur_height;
            // 애니메이션이 끝나는 지점
            partEnd    = values[2].end * cur_height;
            // 애니메이션이 구동되는 범위(길이)
            partHeight = partEnd - partStart;

            if (sectionYoffset < partStart)
            {
                result = values[0];
            }
            else if (sectionYoffset > partEnd)
            {
                result = values[1];
            }
            else 
            {
                ratio = (sectionYoffset - partStart) / partHeight;
                result = ((values[1] - values[0]) * ratio) + values[0];
                
            }
            
        }
        else
        {
            console.error("[ERROR] calcValue(), invalid parameter")
        }

        return result;
        // 모든 경우의 result를 반환 할 수 있도록 여기에 return
    }

    // 애니메이션 가동 함수 선언
    const playAnimation = function()
    {
        let opacity = 0;
        let transValue = 0;
        let imgVal = 0;
        let scrollRate = sectionYoffset / sectionSet[currentSection].height;

        let values = sectionSet[currentSection].vals;
        let objects = sectionSet[currentSection].objs;

        switch(currentSection)
        {
            case 0:
                break;
            case 1:
                break;
            case 2:
                objects.sentenceA.style.opacity = 0;
                objects.sentenceB.style.opacity = 0;
                objects.sentenceC.style.opacity = 0;
                objects.sentenceD.style.opacity = 0;
                objects.sentenceE.style.opacity = 0;
                objects.sentenceF.style.opacity = 0;

                objects.container.style.opacity = 1;
                imgVal = calcValue(values.imageIndex);
                getImgValue = Math.floor(imgVal);
                objects.ctx.drawImage(values.canvasImages[getImgValue], 0 ,0);
                
                if ((scrollRate > 0.01) && (scrollRate <0.07))
                {
                    opacity = calcValue(values.picA_fade_in);
                    opacity = calcValue(values.sentenceA_fade_in);
                    objects.sentenceA.style.opacity = opacity;
                    objects.canvas.style.opacity = opacity;
                }
                else if ((scrollRate >= 0.07) && (scrollRate < 0.17))
                {
                    opacity = calcValue(values.sentenceB_fade_in);
                    objects.sentenceA.style.opacity = 1;
                    objects.sentenceB.style.opacity = opacity;
                }
                else if ((scrollRate >= 0.17) && (scrollRate < 0.27))
                {
                    opacity = calcValue(values.sentenceC_fade_in);
                    objects.sentenceA.style.opacity = 1;
                    objects.sentenceB.style.opacity = 1; 
                    objects.sentenceC.style.opacity = opacity; 
                }
                else if ((scrollRate >= 0.27) && (scrollRate < 0.37))
                {
                    opacity = calcValue(values.sentenceD_fade_in);
                    objects.sentenceA.style.opacity = 1;
                    objects.sentenceB.style.opacity = 1; 
                    objects.sentenceC.style.opacity = 1; 
                    objects.sentenceD.style.opacity = opacity; 
                }
                else if ((scrollRate >= 0.37) && (scrollRate < 0.47))
                {
                    opacity = calcValue(values.sentenceE_fade_in);
                    objects.sentenceA.style.opacity = 1;
                    objects.sentenceB.style.opacity = 1; 
                    objects.sentenceC.style.opacity = 1; 
                    objects.sentenceD.style.opacity = 1; 
                    objects.sentenceE.style.opacity = opacity; 
                }
                else if ((scrollRate >= 0.47) && (scrollRate < 0.6))
                {
                    opacity = calcValue(values.sentenceF_fade_in);
                    objects.sentenceA.style.opacity = 1;
                    objects.sentenceB.style.opacity = 1; 
                    objects.sentenceC.style.opacity = 1; 
                    objects.sentenceD.style.opacity = 1; 
                    objects.sentenceE.style.opacity = 1; 
                    objects.sentenceF.style.opacity = opacity; 
                }
                else if ((scrollRate >= 0.6) && (scrollRate < 0.83))
                {
                    opacity = calcValue(values.picA_maintain);
                    objects.sentenceA.style.opacity = opacity;
                    objects.sentenceB.style.opacity = opacity; 
                    objects.sentenceC.style.opacity = opacity; 
                    objects.sentenceD.style.opacity = opacity; 
                    objects.sentenceE.style.opacity = opacity; 
                    objects.sentenceF.style.opacity = opacity; 
                }
                else if ((scrollRate >= 0.83) && (scrollRate < 0.9))
                {
                    opacity = calcValue(values.picA_fade_out);
                    objects.canvas.style.opacity = opacity;
                    objects.sentenceA.style.opacity = opacity; 
                    objects.sentenceB.style.opacity = opacity; 
                    objects.sentenceC.style.opacity = opacity; 
                    objects.sentenceD.style.opacity = opacity; 
                    objects.sentenceE.style.opacity = opacity; 
                    objects.sentenceF.style.opacity = opacity; 
                }
                break;
            default:
                break;
        }
    }

    // =============== eventListener =====================================

    // 스크롤할 때 마다 이벤트 발생
    window.addEventListener('scroll', ()=>{
        // yOffset에 스크롤값 넣어줌
        yOffset = window.scrollY;

        // 현재 섹션값 가져오기
        currentSection = getCurrentSection();

        // sectionYoffset 구하기
        sectionYoffset = yOffset - getPrevSectionHeight();
        console.log(sectionYoffset)

        // CSS 변경 적용
        setBodyID(currentSection);
        // console.log(currentSection);

        // Global-nav-sticky 일정 높이 이상 적용
        setGlobalnavMenu();

        // 스크롤링 애니메이션 적용
        playAnimation();

    })

     // 페이지 로딩이 끝날 때 마다 이벤트 발생
     window.addEventListener('load', ()=>{
        // 레이아웃 잡아줌
        setLayout();

        // yOffset에 스크롤값 넣어줌
        yOffset = window.scrollY;

        // 현재 섹션값 가져오기
        currentSection = getCurrentSection();

        // 캔버스 가져오기
        setCanvas();

        // CSS 변경 적용
        setBodyID(currentSection);

        // Global-nav-sticky 일정 높이 이상 적용
        setGlobalnavMenu();

    })

    // 윈도우 사이즈가 변경될 때 마다 이벤트 발생
    window.addEventListener("resize", ()=>{
        // 레이아웃 다시 잡음
        setLayout();
    })



})();