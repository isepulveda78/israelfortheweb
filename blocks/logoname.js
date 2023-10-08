import { RichText, BlockControls } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"

registerBlockType('blocktheme/logoname', {
    title: "Logo Name",
    attributes: {
        text: { type: "string" }
    },
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent(props) {
    function handleTextChange(x) {
      props.setAttributes({ text: x })
    }
  
    return (
      <>
        <RichText 
            allowedFormats={["core/bold", "core/italic"]} 
            tagName="h1" 
            className="navbar-brand text-dark"
            value={props.attributes.text} 
            onChange={handleTextChange} 
            />
      </>
    )
  }
  
  function SaveComponent(props) {
    return <RichText.Content 
        tagName="h1"
        value={props.attributes.text} 
        className="navbar-brand text-dark"
    />
  }
  