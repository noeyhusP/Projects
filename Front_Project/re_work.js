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
                container : document.querySelector("#section-1"),

                canvas : document.querySelector("#first-canvas"),
                ctx : document.querySelector("#first-canvas").getContext("2d"),
            },
            vals : 
            {
                imageCount : 229,
                canvasImages : [],
                imageIndex : [0, 228],
                // scroll opacity 값
                sec1_fade_in : [0, 0.8, {start:0.5, end:1}],
            },
        },
        {
            //section-2 (definition)
            height : 0,
            hMultiple : 6.5,
            objs : 
            {
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
            vals : 
            {
                imageCount : 229,
                canvasImages : [],
                imageIndex : [0, 228],
                // scroll opacity 값
                // sec1_fade_in : [0, 0.8, {start:0.7, end:1}],
                picA_fade_in : [0.8, 1, {start:0, end:0.07}],
                picA_fade_out : [1, 0, {start:0.87, end:0.9}],
                picA_maintain : [1, 1],
                // sec1_fade_in : [0, 0.8, {start:0.5, end:1}],
                

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
                container : document.querySelector("#section-3"),

                sec3picA : document.querySelector(".instance1_pic1"),
                sec3picB : document.querySelector(".instance1_pic2"),
                sec3picC : document.querySelector("#instance1_pic3"), // 화살표
                sec3picD : document.querySelector(".instance1_pic4"),
                sec3picE : document.querySelector(".truth_1"),
                sec3text : document.querySelector(".instance1_textbg")
            },
            vals : {
                page_fade_in : [0, 1, {start:0.98, end:1}]
            }
        },
        {
            //section-4
            height : 0,
            hMultiple : 1,
            objs : 
            {
                container : document.querySelector("#section-4"),

                sec4picA : document.querySelector(".instance2_pic1"),
                sec4picB : document.querySelector(".instance2_pic2"),
                sec4picC : document.querySelector(".instance2_pic3"), // 화살표
                sec4picD : document.querySelector(".instance2_pic4"),
                sec4picE : document.querySelector(".truth_2"),
                sec4text : document.querySelector(".instance2_textbg")
            },
            vals : {
                page_fade_in : [0, 1, {start:0.97, end:1}]
            }
        },
        {
            //section-5
            height : 0,
            hMultiple : 1,
            objs : 
            {
                container : document.querySelector("#section-5"),

                sec5picA : document.querySelector(".instance3_pic1"),
                sec5picB : document.querySelector(".instance3_pic2"), // 화살표
                sec5picC : document.querySelector(".instance3_imgbox"), 
                sec5picD: document.querySelector(".truth_3"),
                sec5text : document.querySelector(".instance3_textbg")
            },
            vals : {
                page_fade_in : [0, 1, {start:0.97, end:1}]
            }
        },
        {
            //section-6
            height : 0,
            hMultiple : 1,
            objs : 
            {
                container : document.querySelector("#section-6"),
                sec6def : document.querySelector(".section6-definition2")
            }
        },
        {
            //section-7
            height : 0,
            hMultiple : 1,
            objs : 
            {
                container : document.querySelector("#section-7"),


                // canvas : document.querySelector("#third-canvas"),
                // ctx : document.querySelector("#third-canvas").getContext("2d"),
            },
            // vals : {
            //     imageCount : 295,
            //     canvasImages : [],
            //     imageIndex : [0, 294],
            //     // scroll opacity 값
            //     picA_fade_in : [0, 0.8, {start:0.7, end:1}],
            //     picA_maintain : [1, 1],
            // }
        },
        {
            //section-8
            height : 0,
            hMultiple : 15,
            objs : 
            {
                container : document.querySelector("#section-8"),
                sentenceA : document.querySelector(".section8-sentence.a"),
                sentenceB : document.querySelector(".section8-sentence.b"),
                sentenceC : document.querySelector(".section8-sentence.c"),
                sentenceD : document.querySelector(".section8-sentence.d"),
                sentenceE : document.querySelector(".section8-sentence.e"),
                sentenceF : document.querySelector(".section8-sentence.f"),
                sentenceG : document.querySelector(".section8-sentence.g"),
                sentenceH : document.querySelector(".section8-sentence.h"),
                sentenceI : document.querySelector(".section8-sentence.i"),
                sentenceJ : document.querySelector(".section8-sentence.j"),

                canvas : document.querySelector("#third-canvas"),
                ctx : document.querySelector("#third-canvas").getContext("2d"),
            },
            vals : {
                imageCount : 295,
                canvasImages : [],
                imageIndex : [0, 294],
                // scroll opacity 값
                // sec7_fade_in : [0, 0.8, {start:0.7, end:1}],
                picA_fade_in : [0.5, 1, {start:0.00, end:0.07}],
                picA_fade_out : [1, 0, {start:0.87, end:0.9}],
                picA_maintain : [1, 1],

                // text opacity 값
                // sentenceA 섹션 값 (0.02-0.06/0.07-0.11)
                sentenceA_fade_in : [0, 1, {start:0.02, end:0.07}],
                sentenceA_fade_out : [1, 0, {start:0.07, end:0.11}],
                sentenceA_translate_in : [0, -20, {start:0.02, end:0.07}],
                sentenceA_translate_out : [-20, -40, {start:0.07, end:0.11}],

                // sentenceB 섹션 값 (0.12-0.16/0.17-0.21)
                sentenceB_fade_in : [0, 1, {start:0.12, end:0.17}],
                sentenceB_fade_out : [1, 0, {start:0.17, end:0.21}],
                sentenceB_translate_in : [0, -20, {start:0.12, end:0.17}],
                sentenceB_translate_out : [-20, -40, {start:0.17, end:0.21}],

                // sentenceC 섹션 값 (0.22-0.26/0.27-0.31)
                sentenceC_fade_in : [0, 1, {start:0.22, end:0.27}],
                sentenceC_fade_out : [1, 0, {start:0.27, end:0.31}],
                sentenceC_translate_in : [0, -20, {tart:0.22, end:0.27}],
                sentenceC_translate_out : [-20, -40, {start:0.27, end:0.31}],

                // sentenceD 섹션 값 (0.32-0.36/0.37-0.41)
                sentenceD_fade_in : [0, 1, {start:0.32, end:0.37}],
                sentenceD_fade_out : [1, 0, {start:0.37, end:0.41}],
                sentenceD_translate_in : [0, -20, {start:0.32, end:0.37}],
                sentenceD_translate_out : [-20, -40, {start:0.37, end:0.41}],

                // sentenceE 섹션 값 (0.43-0.47/0.48-0.52)
                sentenceE_fade_in : [0, 1, {start:0.43, end:0.48}],
                sentenceE_fade_out : [1, 0, {start:0.48, end:0.52}],
                sentenceE_translate_in : [0, -20, {start:0.43, end:0.48}],
                sentenceE_translate_out : [-20, -40, {start:0.48, end:0.52}],

                // sentenceF 섹션 값 (0.55-0.59/0.6-0.64)
                sentenceF_fade_in : [0, 1, {start:0.55, end:0.6}],
                sentenceF_fade_out : [1, 0, {start:0.6, end:0.64}],
                sentenceF_translate_in : [0, -20, {start:0.55, end:0.6}],
                sentenceF_translate_out : [-20, -40, {start:0.6, end:0.64}],

                // sentenceG 섹션 값 (0.67-0.69/0.7-0.72)
                sentenceG_fade_in : [0, 1, {start:0.67, end:0.7}],
                sentenceG_fade_out : [1, 0, {start:0.7, end:0.72}],
                sentenceG_translate_in : [0, -20, {start:0.67, end:0.7}],
                sentenceG_translate_out : [-20, -40, {start:0.7, end:0.72}],

                // sentenceH 섹션 값 (0.73-0.76/0.77-0.8)
                sentenceH_fade_in : [0, 1, {start:0.73, end:0.77}],
                sentenceH_fade_out : [1, 0, {start:0.77, end:0.8}],
                sentenceH_translate_in : [0, -20, {start:0.73, end:0.77}],
                sentenceH_translate_out : [-20, -40, {start:0.77, end:0.8}],

                // sentenceI 섹션 값 (0.82-0.87)
                sentenceI_fade_in : [0, 1, {start:0.82, end:0.87}],
                // sentenceI_fade_out : [1, 0, {start:0.88, end:0.9}],
                sentenceI_translate_in : [0, -20, {start:0.82, end:0.87}],
                // sentenceI_translate_out : [-20, -40, {start:0.81, end:0.90}],

                // sentenceJ 섹션 값 (0.88-0.93)
                sentenceJ_fade_in : [0, 1, {start:0.88, end:0.93}],
                // sentenceJ_fade_out : [1, 0, {start:0.81, end:0.90}],
                sentenceJ_translate_in : [0, -20, {start:0.88, end:0.93}],
                // sentenceJ_translate_out : [-20, -40, {start:0.81, end:0.90}],

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
            + sectionSet[3].height + sectionSet[4].height,
            sectionSet[0].height + sectionSet[1].height + sectionSet[2].height
            + sectionSet[3].height + sectionSet[4].height + sectionSet[5].height,
            sectionSet[0].height + sectionSet[1].height + sectionSet[2].height
            + sectionSet[3].height + sectionSet[4].height + sectionSet[5].height + sectionSet[6].height,
            sectionSet[0].height + sectionSet[1].height + sectionSet[2].height + sectionSet[3].height 
            + sectionSet[4].height + sectionSet[5].height + sectionSet[6].height + sectionSet[7].height,
            sectionSet[0].height + sectionSet[1].height + sectionSet[2].height + sectionSet[3].height 
            + sectionSet[4].height + sectionSet[5].height + sectionSet[6].height + sectionSet[7].height
            + sectionSet[8].height
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
        else if ((yOffset > segment[5]) && (yOffset <= segment[6]))
        {
            section = 6;
        }
        else if ((yOffset > segment[6]) && (yOffset <= segment[7]))
        {
            section = 7;
        }
        else if ((yOffset > segment[7]) && (yOffset <= segment[8]))
        {
            section = 8;
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
        // imgElement.addEventListener("load",()=>
        // {
        //     ctx.drawImage(canvasImages[0], 0, 0);

        // })
    };

    const setCanvas2 = function()
    {
        let imgElement;
        const imgCount = sectionSet[8].vals.imageCount;
        const canvasImages1 = sectionSet[8].vals.canvasImages;
        const ctx = sectionSet[8].objs.ctx;

        for (let i = 0; i < imgCount; i++)
        {
            imgElement = new Image();
            imgElement.src = `./image_3/nature${i}.png`;
            canvasImages1.push(imgElement);

        }
        // imgElement.addEventListener("load",()=>
        // {
        //     ctx.drawImage(canvasImages1[0], 0, 0);

        // });
    };

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
        // let opacity3 = 0;
        let transValue = 0;
        let imgVal = 0;
        // let imgVal3 = 0;
        let scrollRate = sectionYoffset / sectionSet[currentSection].height;

        let values = sectionSet[currentSection].vals;
        let objects = sectionSet[currentSection].objs;

        // section[3] 애니메이션 디폴트 0
        sectionSet[3].objs.sec3picA.style.opacity = 0;
        sectionSet[3].objs.sec3picB.style.opacity = 0;
        sectionSet[3].objs.sec3picC.style.opacity = 0;
        sectionSet[3].objs.sec3picD.style.opacity = 0;
        sectionSet[3].objs.sec3picE.style.opacity = 0;
        sectionSet[3].objs.sec3text.style.opacity = 0;

        // section[4] 애니메이션 디폴트 0
        sectionSet[4].objs.sec4picA.style.opacity = 0;
        sectionSet[4].objs.sec4picB.style.opacity = 0;
        sectionSet[4].objs.sec4picC.style.opacity = 0;
        sectionSet[4].objs.sec4picD.style.opacity = 0;
        sectionSet[4].objs.sec4picE.style.opacity = 0;
        sectionSet[4].objs.sec4text.style.opacity = 0;

        // section[5] 애니메이션 디폴트 0
        sectionSet[5].objs.sec5picA.style.opacity = 0;
        sectionSet[5].objs.sec5picB.style.opacity = 0;
        sectionSet[5].objs.sec5picC.style.opacity = 0;
        sectionSet[5].objs.sec5picD.style.opacity = 0;
        sectionSet[5].objs.sec5text.style.opacity = 0;

        // section[6] 애니메이션 디폴트 0
        sectionSet[6].objs.sec6def.style.opacity = 0;

        // section2 sentences 디폴트 0
        sectionSet[2].objs.sentenceA.style.opacity = 0;
        sectionSet[2].objs.sentenceB.style.opacity = 0;
        sectionSet[2].objs.sentenceC.style.opacity = 0;
        sectionSet[2].objs.sentenceD.style.opacity = 0;
        sectionSet[2].objs.sentenceE.style.opacity = 0;
        sectionSet[2].objs.sentenceF.style.opacity = 0;
        // sectionSet[2].objs.canvas.style.opacity = 0;

        // section8 sentences 디폴트 0
        sectionSet[8].objs.sentenceA.style.opacity = 0;
        sectionSet[8].objs.sentenceB.style.opacity = 0;
        sectionSet[8].objs.sentenceC.style.opacity = 0;
        sectionSet[8].objs.sentenceD.style.opacity = 0;
        sectionSet[8].objs.sentenceE.style.opacity = 0;
        sectionSet[8].objs.sentenceF.style.opacity = 0;
        sectionSet[8].objs.sentenceG.style.opacity = 0;
        sectionSet[8].objs.sentenceH.style.opacity = 0;
        sectionSet[8].objs.sentenceI.style.opacity = 0;
        sectionSet[8].objs.sentenceJ.style.opacity = 0;

        switch(currentSection)
        {
            case 0:
                break;
            case 1:
                // values = sectionSet[1].vals;
                // objects = sectionSet[1].objs;

                // imgVal = calcValue(sectionSet[2].vals.imageIndex);
                // getImgValue = Math.floor(imgVal);
                // sectionSet[2].objs.ctx.drawImage(sectionSet[2].vals.canvasImages[getImgValue], 0 ,0);

                // if (scrollRate >= 0.5)
                // {
                //     opacity = calcValue(sectionSet[2].vals.sec1_fade_in);
                //     sectionSet[2].objs.canvas.style.opacity = opacity;
                // }
                break;
            case 2:
                // objects.sentenceA.style.opacity = 0;
                // objects.sentenceB.style.opacity = 0;
                // objects.sentenceC.style.opacity = 0;
                // objects.sentenceD.style.opacity = 0;
                // objects.sentenceE.style.opacity = 0;
                // objects.sentenceF.style.opacity = 0;

                imgVal = calcValue(values.imageIndex);
                getImgValue = Math.floor(imgVal);
                objects.ctx.drawImage(values.canvasImages[getImgValue], 0 ,0);
                
                if ((scrollRate > 0) && (scrollRate <0.07))
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
                if (scrollRate >= 0.98)
                {   
                    sectionSet[3].objs.sec3picA.style.opacity = 1;
                    sectionSet[3].objs.sec3picB.style.opacity = 1;
                    sectionSet[3].objs.sec3picC.style.opacity = 1;
                    sectionSet[3].objs.sec3picD.style.opacity = 1;
                    sectionSet[3].objs.sec3picE.style.opacity = 1;
                }
                break;
            case 3:
                if (scrollRate >= 0)
                {
                    objects.sec3text.style.opacity = 0.68;
                }
                if (scrollRate >= 0.92)
                {   
                    sectionSet[4].objs.sec4picA.style.opacity = 1;
                    sectionSet[4].objs.sec4picB.style.opacity = 1;
                    sectionSet[4].objs.sec4picC.style.opacity = 1;
                    sectionSet[4].objs.sec4picD.style.opacity = 1;
                    sectionSet[4].objs.sec4picE.style.opacity = 1;
                }
                break;
            case 4:
                if (scrollRate >= 0)
                {
                    objects.sec4text.style.opacity = 0.8;
                }
                if (scrollRate >= 0.92)
                {   
                    sectionSet[5].objs.sec5picA.style.opacity = 1;
                    sectionSet[5].objs.sec5picB.style.opacity = 1;
                    sectionSet[5].objs.sec5picC.style.opacity = 1;
                    sectionSet[5].objs.sec5picD.style.opacity = 1;
                }
                break;
            case 5:
                if (scrollRate >= 0)
                {
                    objects.sec5text.style.opacity = 0.8;
                }
                if (scrollRate >= 0.92)
                {
                    sectionSet[6].objs.sec6def.style.opacity = 0.65;
                }
                break;
            case 6:
                if ((scrollRate >= 0) && (scrollRate < 0.98))
                {
                    sectionSet[6].objs.sec6def.style.opacity = 0.65;
                }
                break;
            case 7:
                // objects = sectionSet[8].objs;
                // values = sectionSet[8].objs;

                // imgVal = calcValue(values.imageIndex);
                // getImgValue = Math.floor(imgVal);
                // objects.ctx.drawImage(values.canvasImages[getImgValue], 0 ,0);

                // if (scrollRate >= 0.7)
                // {
                //     opacity = calcValue(values.sec7_fade_in);
                //     objects.canvas.style.opacity = opacity;
                // }
                // break;
            case 8 :

                imgVal = calcValue(values.imageIndex);
                getImgValue = Math.floor(imgVal);
                objects.ctx.drawImage(values.canvasImages[getImgValue], 0 ,0);

                if ((scrollRate >= 0.02) && (scrollRate <= 0.07))
                {
                    opacity = calcValue(values.sentenceA_fade_in);
                    transValue = calcValue(values.sentenceA_translate_in);
                    objects.sentenceA.style.opacity = opacity;
                    objects.sentenceA.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.07) && (scrollRate <= 0.11))
                {
                    opacity = calcValue(values.sentenceA_fade_out);
                    transValue = calcValue(values.sentenceA_translate_out);
                    objects.sentenceA.style.opacity = opacity;
                    objects.sentenceA.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.12) && (scrollRate <= 0.17))
                {
                    opacity = calcValue(values.sentenceB_fade_in);
                    transValue = calcValue(values.sentenceB_translate_in);
                    objects.sentenceB.style.opacity = opacity;
                    objects.sentenceB.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.17) && (scrollRate <= 0.21))
                {
                    opacity = calcValue(values.sentenceB_fade_out);
                    transValue = calcValue(values.sentenceB_translate_out);
                    objects.sentenceB.style.opacity = opacity;
                    objects.sentenceB.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.22) && (scrollRate <= 0.27))
                {
                    opacity = calcValue(values.sentenceC_fade_in);
                    transValue = calcValue(values.sentenceC_translate_in);
                    objects.sentenceC.style.opacity = opacity;
                    objects.sentenceC.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.27) && (scrollRate <= 0.311))
                {
                    opacity = calcValue(values.sentenceC_fade_out);
                    transValue = calcValue(values.sentenceC_translate_out);
                    objects.sentenceC.style.opacity = opacity;
                    objects.sentenceC.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.32) && (scrollRate <= 0.37))
                {
                    opacity = calcValue(values.sentenceD_fade_in);
                    transValue = calcValue(values.sentenceD.translate_in);
                    objects.sentenceD.style.opacity = opacity;
                    objects.sentenceD.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.37) && (scrollRate <= 0.41))
                {
                    opacity = calcValue(values.sentenceD_fade_out);
                    transValue = calcValue(values.sentenceD_translate_out);
                    objects.sentenceD.style.opacity = opacity;
                    objects.sentenceD.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.43) && (scrollRate <= 0.48))
                {
                    opacity = calcValue(values.sentenceE_fade_in);
                    transValue = calcValue(values.sentenceE.translate_in);
                    objects.sentenceE.style.opacity = opacity;
                    objects.sentenceE.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.48) && (scrollRate <= 0.52))
                {
                    opacity = calcValue(values.sentenceE_fade_out);
                    transValue = calcValue(values.sentenceE_translate_out);
                    objects.sentenceE.style.opacity = opacity;
                    objects.sentenceE.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.55) && (scrollRate <= 0.6))
                {
                    opacity = calcValue(values.sentenceF_fade_in);
                    transValue = calcValue(values.sentenceF.translate_in);
                    objects.sentenceF.style.opacity = opacity;
                    objects.sentenceF.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.6) && (scrollRate <= 0.64))
                {
                    opacity = calcValue(values.sentenceF_fade_out);
                    transValue = calcValue(values.sentenceF_translate_out);
                    objects.sentenceF.style.opacity = opacity;
                    objects.sentenceF.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.67) && (scrollRate <= 0.7))
                {
                    opacity = calcValue(values.sentenceG_fade_in);
                    transValue = calcValue(values.sentenceG.translate_in);
                    objects.sentenceG.style.opacity = opacity;
                    objects.sentenceG.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.7) && (scrollRate <= 0.72))
                {
                    opacity = calcValue(values.sentenceG_fade_out);
                    transValue = calcValue(values.sentenceG_translate_out);
                    objects.sentenceG.style.opacity = opacity;
                    objects.sentenceG.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.73) && (scrollRate <= 0.77))
                {
                    opacity = calcValue(values.sentenceH_fade_in);
                    transValue = calcValue(values.sentenceH.translate_in);
                    objects.sentenceH.style.opacity = opacity;
                    objects.sentenceH.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.77) && (scrollRate <= 0.8))
                {
                    opacity = calcValue(values.sentenceH_fade_out);
                    transValue = calcValue(values.sentenceH_translate_out);
                    objects.sentenceH.style.opacity = opacity;
                    objects.sentenceH.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.82) && (scrollRate <= 0.87))
                {
                    opacity = calcValue(values.sentenceI_fade_in);
                    transValue = calcValue(values.sentenceI.translate_in);
                    objects.sentenceI.style.opacity = opacity;
                    objects.sentenceI.style.transform = `translateY(${transValue}%)`;
                }
                else if ((scrollRate >= 0.87) && (scrollRate <= 0.93))
                {
                    opacity = calcValue(values.sentenceJ_fade_in);
                    transValue = calcValue(values.sentenceJ_translate_in);
                    objects.sentenceJ.style.opacity = opacity;
                    objects.sentenceJ.style.transform = `translateY(${transValue}%)`;
                    objects.sentenceI.style.opacity = 1;
                }
                else if ((scrollRate >= 0.93) && (scrollRate <= 1))
                {
                    objects.sentenceI.style.opacity = 1;
                    objects.sentenceJ.style.opacity = 1;
                    // objects.sentenceE.style.transform = `translateY(${transValue}%)`;
                }
                break;
            default:
                break;
        }
    }

    // 클릭 이벤트 엘리먼트 가져오기
    // const $siita = document.querySelector("#siita_btn");
    // const $innisfree = document.querySelector(".innisfree_logo");
    // const $freitag = document.querySelector(".freitag_logo");
    // const $patagonia = document.querySelector(".patagonia_logo");

    // const $siita_on = document.querySelector(".sitta");

    // 각각 함수 만들어주기

    // const siita_explain = function()
    // {
    //     const $siita_on = document.querySelector(".sitta");
    //     $siita_on.style.opacity = 1;
    // }

    // const innisfree_explain = function()
    // {
    //     const $innisfree = document.querySelector(".")
    // }

    // =============== eventListener =====================================

    // section7 클릭 이벤트

    // $siita.addEventListener("click", ()=> {
    //     const $siita_on = document.querySelector(".sitta");
    //     $siita_on.style.opacity = 1;
    // })

    // 스크롤할 때 마다 이벤트 발생
    window.addEventListener('scroll', ()=>{
        // yOffset에 스크롤값 넣어줌
        yOffset = window.scrollY;

        // 현재 섹션값 가져오기
        currentSection = getCurrentSection();

        // sectionYoffset 구하기
        sectionYoffset = yOffset - getPrevSectionHeight();
        // console.log(sectionYoffset)

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
        setCanvas2();

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