(()=>{

    let yOffset = 0;
    // scrollY값

    let currentSection = 0;
    // 현재 섹션
    let sectionYoffset = 0;



    const sectionSet =[
        // section-0의 정보
        {
            height : 0,
            hMultiple : 5,

            objs : {
                container : document.querySelector("#section-0"),

                messageA : document.querySelector(".section0-message.a"), 
                messageB : document.querySelector(".section0-message.b"),
                messageC : document.querySelector(".section0-message.c"),
                messageD : document.querySelector(".section0-message.d"),
                canvas : document.querySelector("#main-canvas"),
                // 캔버스 불러오기
                ctx : document.querySelector("#main-canvas").getContext("2d"),
                // getContext 도 불러오기

            },
            vals : {
                imageCount : 570,
                canvasImages : [],
                // 이미지 집어넣을 빈 배열 만들어주기
                imageIndex : [0, 569],

                // messageA 섹션 값 (0-0.12/0.13-0.25)
                messageA_fade_in : [0, 1, {start:0.02, end:0.11}],
                messageA_fade_out : [1, 0, {start:0.12, end:0.21}],
                messageA_translate_in : [0, -20, {start:0.02, end:0.11}],
                messageA_translate_out : [-20, -40, {start:0.12, end:0.21}],

                // messageB 섹션 값 (0.25-0.37/0.38-0.5)
                messageB_fade_in : [0, 1, {start:0.25, end:0.34}],
                messageB_fade_out : [1, 0, {start:0.35, end:0.44}],
                messageB_translate_in : [0, -20, {start:0.25, end:0.34}],
                messageB_translate_out : [-20, -40, {start:0.35, end:0.44}],

                // messageC 섹션 값 (0.5-0.62/0.63-0.75)
                messageC_fade_in : [0, 1, {start:0.48, end:0.57}],
                messageC_fade_out : [1, 0, {start:0.58, end:0.67}],
                messageC_translate_in : [0, -20, {start:0.48, end:0.57}],
                messageC_translate_out : [-20, -40, {start:0.58, end:0.67}],

                // messageD 섹션 값 (0.75-0.87/0.88-1.0)
                messageD_fade_in : [0, 1, {start:0.71, end:0.80}],
                messageD_fade_out : [1, 0, {start:0.81, end:0.90}],
                messageD_translate_in : [0, -20, {start:0.71, end:0.80}],
                messageD_translate_out : [-20, -40, {start:0.81, end:0.90}],

                // 범위 전체 설정
                messageA_fade_out_All : [1, 0],

            }
        },

        // section-1의 정보
        {
            height : 0,
            hMultiple : 3,

            objs : {
                container : document.querySelector("#section-1"),

            }

        },

    ];


    // 섹션 레이아웃 설정
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

    setLayout();

    // 스크롤링 중 현재 섹션 구하는 함수
    // 방법 1
    // const getCurrentSection1 = function()
    // {
    //     // scroll값 = yOffset 
    //     let segment = [
    //         sectionSet[0].height
    //     ];
    //     // 섹션이 많아지면 섹션을 나누는 값이 많아지니까 배열이 필요해짐
    //     if (yOffset <= sectionSet[0].height)
    //     {
    //         section = 0;
    //     }
    //     else
    //     {
    //         section = 1;
    //     }

    //     return section;

    // }

    // 방법 2

    const getCurrentSection = function()
    {
        // scroll값 = yOffset 
        let segment = [
            sectionSet[0].height,
            sectionSet[0].height + sectionSet[1].height
        ];
        // 섹션이 많아지면 섹션을 나누는 값이 많아지니까 배열이 필요해짐
        if (yOffset <= segment[0])
        {
            section = 0;
        }
        else if ((yOffset > segment[0]) && (yOffset <= segment[1]))
        {
            section = 1;
        }
        else
        {
            console.error("[ERROR]getCurrentSection()");
        }
        
        return section;

    }

    // body에 show-section아이디 현재섹션값 넣어주는 함수
    const setBodyID = function(section)
    {
        document.body.setAttribute("id", `show-section${section}`)
    }
    
    // local-nav를 global-nav의 height이상이 되면 fixed로 만들기
    const setLocalnavMenu = function()
    {
        if (yOffset > 44)
        {
            // local-nav를 fixed 시키기
            document.body.classList.add('local-nav-sticky')
        }
        else
        {
            // local-nav를 원래상태로 돌리기
            document.body.classList.remove('local-nav-sticky')
        }
    }

    // 섹션의 높이를 그 자체로 구하는 함수
    const getPrevSectionHeight = function ()
    {
        let prevHeight = 0;
        // section 0 일 때는 안 돌고 1일 때는 그 section의 height만 리턴함
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
        const imgCount = sectionSet[0].vals.imageCount;
        const canvasImages = sectionSet[0].vals.canvasImages;
        const ctx = sectionSet[0].objs.ctx;

        for (let i = 0; i < imgCount; i++)
        {
            imgElement = new Image();
            imgElement.src = `./image/apple_${i}.png`;
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
        // let transValue = 0;

        // 현재섹션의 높이 구하기
        const cur_height = sectionSet[currentSection].height;

        // [0, 1, {start:0.03, end:0.12}]
        let partStart = 0;
        let partEnd = 0;
        let partHeight = 0;

        // ---------------------------------------------------------------------------------------

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

        // 스크롤 비율 구하기(0-1사이의 값)
        // 현재 yOffset값을 현재 섹션의 총 길이로 나눠주기
        let scrollRate = sectionYoffset / sectionSet[currentSection].height;
        // 공통으로 필요한 값 변수에 할당해주기
        let values = sectionSet[currentSection].vals;
        let objects = sectionSet[currentSection].objs;

        // switch문으로 비율 가져오기
        // case에 따라 calcValue함수로 opacity값 계산할 수 있도록
        switch(currentSection)
        {
            case 0:
                objects.messageA.style.opacity = 0;
                objects.messageB.style.opacity = 0;
                objects.messageC.style.opacity = 0;
                objects.messageD.style.opacity = 0;   

                // 사과돌리기

                // 1. 이미지 인덱스를 구한다
                imgVal = calcValue(values.imageIndex);
                // 이미지 값의 현재 스크롤대비 비율을 가져온다
                getImgValue = Math.floor(imgVal);
                // imgVal의 값이 소수점으로 나오므로 정수로 만들어준다

                objects.ctx.drawImage(values.canvasImages[getImgValue], 0 ,0);
                // drawImage context함수에 불러온 이미지 인덱스값을 넣어준다

                // @@ messageA
                if (scrollRate < 0.12) // messageA의 애니메이션 범위 1
                {
                    // fade-in 처리를 한다 
                    // [0, 1, {start:0.03, end:0.12}]

                    // calcValue함수로 구한 opacity의 비율을 transValue, opacity 변수에 각각 할당
                    opacity = calcValue(sectionSet[currentSection].vals.messageA_fade_in);
                    transValue = calcValue(sectionSet[currentSection].vals.messageA_translate_in);
                    // = opacity = calcValue(values.messageA_fade_in);

                    // style시트에 해당 섹션에 opacity값, transValue값 넣어주기
                    sectionSet[currentSection].objs.messageA.style.opacity = opacity;
                    sectionSet[currentSection].objs.messageA.style.transform = `translateY(${transValue}%)`;
                    // = objects.messageA.style.opacity = opacity;

                }
                else if ((scrollRate >= 0.12) && (scrollRate < 0.23))
                // messageA의 애니메이션 범위 2
                {
                    // fade-out 처리를 한다
                    // [0, 1, {start:0.13, end:0.23}]
                    opacity = calcValue(values.messageA_fade_out);
                    transValue = calcValue(values.messageA_translate_out);
                    objects.messageA.style.opacity = opacity;
                    objects.messageA.style.transform = `translateY(${transValue}%)`;
                }

                // @@ messageB
                else if ((scrollRate >= 0.23) && (scrollRate < 0.35))
                {
                    opacity = calcValue(values.messageB_fade_in);
                    transValue = calcValue(values.messageB_translate_in);
                    objects.messageB.style.opacity = opacity;
                    objects.messageB.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.35) && (scrollRate < 0.46))
                {
                    opacity = calcValue(values.messageB_fade_out);
                    transValue = calcValue(values.messageB_translate_out);
                    objects.messageB.style.opacity = opacity;
                    objects.messageB.style.transform = `translateY(${transValue}%)`;
                }

                // @@ messageC
                else if ((scrollRate >= 0.46) && (scrollRate < 0.58))
                {
                    opacity = calcValue(values.messageC_fade_in);
                    transValue = calcValue(values.messageC_translate_in);
                    objects.messageC.style.opacity = opacity;
                    objects.messageC.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.58) && (scrollRate < 0.69))
                {
                    opacity = calcValue(values.messageC_fade_out);
                    transValue = calcValue(values.messageC_translate_out);
                    objects.messageC.style.opacity = opacity;
                    objects.messageC.style.transform = `translateY(${transValue}%)`;
                }

                // @@ messageD
                else if ((scrollRate >= 0.69) && (scrollRate < 0.81))
                {
                    opacity = calcValue(values.messageD_fade_in);
                    transValue = calcValue(values.messageD_translate_in);
                    objects.messageD.style.opacity = opacity;
                    objects.messageD.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.81) && (scrollRate < 0.92))
                {
                    opacity = calcValue(values.messageD_fade_out);
                    transValue = calcValue(values.messageD_translate_out);
                    objects.messageD.style.opacity = opacity;
                    objects.messageD.style.transform = `translateY(${transValue}%)`;
                    objects.canvas.style.opacity = opacity;
                }
                break;
            case 1:
                // console.log("1번 섹션의 애니메이션이 돌고 있어요");
                break;
            default:
                console.error("[ERROR} playAnimation()");
                break;
        }
    }


    ///////////////////// 이벤트 리스너 /////////////////////////////////////////////////

    // 스크롤에 따라 걸리는 섹션을 구분해주는 이벤트리스너
    window.addEventListener('scroll', ()=>{
        // 1. 레이아웃을 다시 잡는다
        yOffset = window.scrollY;

        // 2. 현재 섹션값을 다시 가져온다
        currentSection = getCurrentSection();

        //sectionYoffset 을 구한다
        sectionYoffset = yOffset - getPrevSectionHeight();
        // yOffset - 이전섹션의 yOffset

        // CSS 변경
        setBodyID(currentSection);
        setLocalnavMenu();

        playAnimation();
    });


    // 페이지의 모든 리소스가 로딩이 됐을 때 발생하는 이벤트
    window.addEventListener('load', ()=>
    {
        // 1.레이아웃을 잡는다
        setLayout();

        // 2. 스크롤값을 설정한다
        yOffset = window.scrollY;

        // 3. 현재 섹션값을 가져온다
        currentSection = getCurrentSection();

        // 4. 캔버스에 이미지를 로딩하고 0번째 이미지를 출력하는 함수
        setCanvas();

        setBodyID(currentSection);
        setLocalnavMenu();

    });

    // 사이즈가 변경되면 setLayout함수를 다시 호출한다
    window.addEventListener('resize', ()=>
    {
        // console.log("setLayout resize called");

        // 레이아웃을 다시 잡는다
        setLayout();

        // 최상단이 바뀌지 않기 때문에 스크롤값과 현재 섹션값을 다시 설정할 필요는 X

    });

})();