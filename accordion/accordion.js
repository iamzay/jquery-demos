class Accordion {
    constructor(option) {
        const defaultOption = {
            active: 0,
            element: document.body,
            collapsible: false,
        }
        this.option = Object.assign({},defaultOption,option)

        this._processSections()
    }

    _processSections() {
        const {element,active} = this.option
        this.accordion = $(element).addClass('ui-accordion')
        this.headers = $(element).find('>h3')

        this.contents = $(element).find('>div').hide()
        this.contents.eq(active).show()
        this.headers.eq(active).addClass('ui-state-active')
        
        // bind events
        this.accordion.on('click','>h3',this._eventHandler.bind(this))    
    }

    _eventHandler(event) {
        const {active,collapsible} = this.option
        const index = this.headers.index(event.target)
        if(index === active) {
            if (collapsible) {
                this._toggleSection(index)
                this.option.active = -1
            }
            return
        }

        this._toggleSection(index)
        if(active >= 0) {
            this._toggleSection(active)
        }

        this.option.active = index
    }

    _toggleSection(index) {
        if(index === this.option.active) {
            this.contents.eq(index).hide()
            this.headers.eq(index).removeClass('ui-state-active')
        } else {
            this.contents.eq(index).show()
            this.headers.eq(index).addClass('ui-state-active')
        }
    }
}
