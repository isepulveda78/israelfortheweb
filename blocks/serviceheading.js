import { ToolbarGroup, ToolbarButton } from "@wordpress/components"
import { RichText, BlockControls } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"

registerBlockType('blocktheme/serviceheading', {
    title: "Service Heading",
    attributes: {
        class: { type: "string" },
        tag: { type: "string" },
        text: { type: "string"}
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
            <ToolbarButton isPressed={props.attributes.tag === "h2"} onClick={() => props.setAttributes({ tag: "h2" })}>
              Title
            </ToolbarButton>
            <ToolbarButton isPressed={props.attributes.tag === "p"} onClick={() => props.setAttributes({ tag: "p" })}>
              Text
            </ToolbarButton>
            <ToolbarButton isPressed={props.attributes.class === "lead"} onClick={() => props.setAttributes({ class: "lead" })}>
              Lead
            </ToolbarButton>
            <ToolbarButton isPressed={props.attributes.class === ""} onClick={() => props.setAttributes({ class: "" })}>
              Take Off Lead
            </ToolbarButton>
          </ToolbarGroup>
        </BlockControls>
        <RichText 
            allowedFormats={["core/bold", "core/italic"]} 
            tagName={props.attributes.tag} 
            value={props.attributes.text} 
            onChange={handleTextChange} 
            className={props.attributes.class}
            />
      </>
    )
  }
  
  function SaveComponent(props) {
    return <RichText.Content 
        tagName={props.attributes.tag} 
        value={props.attributes.text} 
        className={props.attributes.class}
    />
  }
  