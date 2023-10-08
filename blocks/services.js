wp.blocks.registerBlockType("blocktheme/services", {
    title: "Services",
    edit: function () {
        return wp.element.createElement("div", {className: "our-placeholder-block" }, "Services Placeholder")
    },
    save: function(){
        return null
    }
})