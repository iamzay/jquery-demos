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
            const menuItem = $(item)
            menuItem.addClass('ui-menu-item')

            const children = $(item).children()
            // process submenu
            // 当点击parent时需要出现subMenu
            if(children.length > 1) {

                const subMenu = children.filter(menuTag)
                this._setSubMenuPosition(menuItem,subMenu)
                subMenu.hide()

                menuItem.on('mouseenter', event => {
                    subMenu.show()
                    console.log('h')
                })
                menuItem.on('mouseleave', event => {
                    subMenu.hide()
                })

                this._processMenu(subMenu)
            }
        })

    }

    _setSubMenuPosition(parent,subMenu) {
        // 设置submenu的left值    
        const left = (parent.outerWidth() - parent.width()) / 2 + parent.width()
        subMenu.css('left',left + 'px')
        subMenu.css('top', 0)
    }

}