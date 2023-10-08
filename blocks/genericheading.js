import { ToolbarGroup, ToolbarButton } from "@wordpress/components"
import { RichText, BlockControls } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"

registerBlockType('blocktheme/genericheading', {
    title: "Generic Heading",
    attributes: {
        text: { type: "string" },
        size: { type: "string", default: "title" }
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
        <BlockControls>
          <ToolbarGroup>
            <ToolbarButton isPressed={props.attributes.size === "title"} onClick={() => props.setAttributes({ size: "title" })}>
              Title
            </ToolbarButton>
            <ToolbarButton isPressed={props.attributes.size === "text"} onClick={() => props.setAttributes({ size: "text" })}>
              Text
            </ToolbarButton>
          </ToolbarGroup>
        </BlockControls>
        <RichText 
            allowedFormats={["core/bold", "core/italic"]} 
            tagName="h1" 
            className={`page-header-ui-${props.attributes.size}`} 
            value={props.attributes.text} 
            onChange={handleTextChange} 
            />
      </>
    )
  }
  
  function SaveComponent(props) {
    function createTagName() {
      switch (props.attributes.size) {
        case "title":
          return "h1"
        case "text":
          return "h2"
      }
    }
  
    return <RichText.Content 
        tagName={createTagName()} 
        value={props.attributes.text} 
        className={`page-header-ui-${props.attributes.size}`} 
    />
  }
  