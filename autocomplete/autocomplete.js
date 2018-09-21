class AutoComplete {
    constructor(option) {
        const defaultOption = {
            minLenth: 1,
            autoFocus: false,
            source: [],
        } 
        this.option = $.extend({},defaultOption,option)
        this.results = []

        this._render()
        this._bindEvents()
    }

    _bindEvents() {
        const {element} = this.option
        $(element).on('input', event => {
            this.results = this._search($(event.target).val())
            this._renderResult()
        })

        this.autocomplete.on('click','li',event => {
            $(element).val($(event.target).text()) 
            this.autocomplete.hide()
        })
    }

    _search(keyword) {
        const {source,minLenth} = this.option
        const results = [] 
        if(keyword.length < minLenth) {
            return []
        }

        $.each(source,(index,value) => {
            if(value.includes(keyword)) {
                results.push(value)
            }
        })

        return results
    }

    _renderResult() {
        if(!this.results.length) {
            this.autocomplete.hide()
            return
        }

        const resultList = $('<ul></ul>')
        $.each(this.results,(index,item) => {
            resultList.append($(`<li>${item}</li>`))
        })
        this.autocomplete.empty().append(resultList).show()
    }

    _render() {
        const {element} = this.option
        this.autocomplete = $('<div></div>')
        this.autocomplete.addClass('ui-autocomplete')
        this.list = this.autocomplete.find('ul')

        this._setPosition()

        $(element).after(this.autocomplete)

        this.autocomplete.hide()
    }

    _setPosition() {
        let {element} = this.option
        element = $(element)
        
        this.autocomplete.width(element.outerWidth() - 2)
        
        const inputOffset = element.position()
        this.autocomplete.parent().css('position','relative')
        this.autocomplete.css('left',inputOffset.left + 'px')
        this.autocomplete.css('top', inputOffset.top + element.outerHeight() + 'px')
    }
}