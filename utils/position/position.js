const position = (function () {
    const rhorizontal = /left|right|center/
    const rvertical = /top|bottom|center/
    const roffset = /[+-]?\d+(\.\d+)?%?/

    const normalizeOption = (...alignOption) => {
        return alignOption.map(str => {
            const alignArr = str.split(' ')

            if(alignArr.length === 1) {
                if(rhorizontal.test(alignArr[0])) {
                    alignArr[1] = 'center'
                } else if (rvertical.test(alignArr[0])) {
                    alignArr[1] = alignArr[0]
                    alignArr[0] = 'center'
                }
            }

            return alignArr
        })
    }

    /**
     * 
     * @param {JQuery<HTMLElement>} element 
     */
    const getElementDimension = element => {
        const raw = element[0]
        if(raw.nodeType === 9) {
            return {
                offset: { left: 0, top: 0},
                width: element.width(),
                height: element.height()
            }
        } else if($.isWindow(raw)) {
            return {
                offset: { left: element.scrollLeft(), top: scrollTop()},
                width: element.width(),
                height: element.height()
            }
        } else if(raw.preventDefault){
            return {
                offset: { left: raw.pageX, top: raw.pageY },
                width: 0,
                height: 0
            }
        } else{
            return {
                offset: element.offset(),
                width: element.outerWidth(),
                height: element.outerHeight()
            }
        }
    } 

    const getAdditionOffset = (range, align) => {
        if(!roffset.test(align)) {
            return 0
        }
        return parseFloat(roffset.exec(align)[0]) * (align.includes('%') ? range / 100 : 1)
    }

    const getAlignPosition = (dimension, align) => {
        const basePosition = $.extend({}, dimension.offset)

        // 设置水平方向的偏移，需要考虑left/center/right以及可能的数值、百分比
        let offsetX = 0
        if(align[0].includes('center')) {
            offsetX += dimension.width / 2
        } else if(align[0].includes('right')) {
            offsetX += dimension.width
        }
        offsetX += getAdditionOffset(dimension.width, align[0])
        basePosition.left += offsetX

        // 设置垂直方向的偏移，需要考虑bottom/center/top以及可能的数值、百分比
        let offsetY = 0
        if(align[1].includes('center')) {
            offsetY += dimension.height / 2
        } else if(align[1].includes('bottom')) {
            offsetY += dimension.height
        }
        offsetY += getAdditionOffset(dimension.height, align[1])
        basePosition.top += offsetY

        return basePosition
    }

    const getResultPosition = (alignPosition, align, element) => {
        const position = $.extend({}, alignPosition)
        const width = element.outerWidth()
        const height = element.outerHeight()
        
        // 根据需对齐的位置以及align所指示的对齐方式获得最终元素的水平偏移
        let offsetX = 0
        if(align[0].includes('center')) {
            offsetX += width / 2
        } else if(align[0].includes('right')) {
            offsetX += width
        }
        offsetX += getAdditionOffset(width, align[0])
        position.left -= offsetX

        // 获得最终元素的垂直偏移
        let offsetY = 0
        if(align[1].includes('center')) {
            offsetY += height / 2
        } else if(align[1].includes('bottom')) {
            offsetY += height
        }
        offsetY += getAdditionOffset(height, align[1])
        position.top -= offsetY

        return position
    }

    // 移动elem2与elem1对齐
    function position(elem1, elem2, align1, align2) {
        const alignArr = normalizeOption(align1, align2)
        const targetDimension = getElementDimension($(elem2))

        const alignPosition = getAlignPosition(targetDimension, alignArr[1]) 
        const resultPosition = getResultPosition(alignPosition, alignArr[0], $(elem1))

        $(elem1).offset(resultPosition)
    }

    return position
})()