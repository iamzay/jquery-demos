class Menu {
    constructor(option) {
        const defautlOption = {
            menuTag: 'ul',
        }
        this.option = $.extend({},defautlOption,option)

        this._processMenu(this.option.element)
    }

    _processMenu(element) {
        const {menuTag} = this.option 
        this.menu = $(element)
        this.menu.addClass('ui-menu')
        this.menu.children().each((index,item) => {
            const children = $(item).children()
            const parent = children.first()
            parent.addClass('ui-menu-item')

            // process submenu
            if(children.length > 1) {

                const subMenu = children.filter(menuTag)
                this._setSubMenuPosition(parent,subMenu)
                subMenu.hide()

                parent.on('mouseenter', event => {
                    subMenu.show()
                })
                parent.on('mouseleave', event => {
                    subMenu.hide()
                })

                this._processMenu(subMenu)
            }
        })
    }

    _setSubMenuPosition(parent,subMenu) {
        const parentOffset= parent.offset()
        const parentWidth= parent.outerWidth(true)
        subMenu.offset({
            left: parentOffset.left + parentWidth,
            top: parentOffset.top,
        })

        let lastSibling = parent
        parent.nextAll().each((index,sibling) => {
            $(sibling).offset({
                top: lastSibling.offset().top + lastSibling.outerHeight,
                left: lastSibling.offset().left,
            })
            lastSibling = $(sibling)
        })
    }

}