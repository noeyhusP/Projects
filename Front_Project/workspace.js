const setCanvas = function(currentSection)
    {
        let imgElement;
        const imgCount = sectionSet[currentSection].vals.imageCount;
        const canvasImages = sectionSet[currentSection].vals.canvasImages;
        const ctx = sectionSet[currentSection].objs.ctx;

        switch(currentSection)
        {
            case 2 :
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
                break;
            case 8 :
                for (let i = 0; i < imgCount; i++)
                {
                    imgElement = new Image();
                    imgElement.src = `./image_3/nature${i}.png`;
                    canvasImages.push(imgElement);

                }
                imgElement.addEventListener("load",()=>
                {
                    ctx.drawImage(canvasImages[0], 0, 0);

                });
                break;
            default :
                break;
        }
    }

        // const setCanvas2 = function()
    // {
    //     let imgElement;
    //     const imgCount = sectionSet[6].vals.imageCount;
    //     const canvasImages = sectionSet[6].vals.canvasImages;
    //     const ctx = sectionSet[6].objs.ctx;

    //     for (let i = 0; i < imgCount; i++)
    //     {
    //         imgElement = new Image();
    //         imgElement.src = `./image_1/smokestack_${i}.png`;
    //         canvasImages.push(imgElement);

    //     }
    //     imgElement.addEventListener("load",()=>
    //     {
    //         ctx.drawImage(canvasImages[0], 0, 0);

    //     });
    // }

    // const setCanvas3 = function()
    // {
    //     let imgElement;
    //     const imgCount = sectionSet[8].vals.imageCount;
    //     const canvasImages = sectionSet[8].vals.canvasImages;
    //     const ctx = sectionSet[8].objs.ctx;

    //     for (let i = 0; i < imgCount; i++)
    //     {
    //         imgElement = new Image();
    //         imgElement.src = `./image_3/nature${i}.png`;
    //         canvasImages.push(imgElement);

    //     }
    //     imgElement.addEventListener("load",()=>
    //     {
    //         ctx.drawImage(canvasImages[0], 0, 0);

    //     });
    // }