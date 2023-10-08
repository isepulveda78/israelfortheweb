import { registerBlockType } from "@wordpress/blocks"
import { RichText } from "@wordpress/block-editor"

registerBlockType('blocktheme/navlink', {
    title: "Generic Nav Link",
    attributes: {
        text: { type: "string" }
    },
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent(props){
    function handleTextChange(){

    }
    return(
        <RichText
            value={props.attributes.text}
            onChange={handleTextChange}
            />
    )
}

function SaveComponent(props){
    return <RichText.Content 
    value={props.attributes.text}
    className="" />
}