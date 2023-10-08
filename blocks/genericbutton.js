import { link } from "@wordpress/icons"
import { ToolbarGroup, ToolbarButton, Popover, Button, PanelBody, PanelRow, ColorPalette } from "@wordpress/components"
import { RichText, InspectorControls, BlockControls, __experimentalLinkControl as LinkControl, getColorObjectByColorValue } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import { useState } from "@wordpress/element"

registerBlockType("blocktheme/genericbutton", {
  title: "Generic Button",
  attributes: {
    text: { type: "string" },
    size: { type: "string", default: "large" },
    linkObject: { type: "object", default: { url: "" } }
  },
  edit: EditComponent,
  save: SaveComponent
})

function EditComponent(props) {
  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false)

  function handleTextChange(x) {
    props.setAttributes({ text: x })
  }

  function buttonHandler() {
    setIsLinkPickerVisible(prev => !prev)
  }

  function handleLinkChange(newLink) {
    props.setAttributes({ linkObject: newLink })
  }


  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton onClick={buttonHandler} icon={link} />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarButton isPressed={props.attributes.size === "primary"} onClick={() => props.setAttributes({ size: "primary" })}>
            Primary
          </ToolbarButton>
          <ToolbarButton isPressed={props.attributes.size === "secondary"} onClick={() => props.setAttributes({ size: "secondary" })}>
            Secondary
          </ToolbarButton>
        </ToolbarGroup>
      </BlockControls>
      <InspectorControls>
      </InspectorControls>
      <RichText allowedFormats={[]} tagName="a" className={`btn btn-${props.attributes.size} fw-500`} value={props.attributes.text} onChange={handleTextChange} />
      {isLinkPickerVisible && (
        <Popover position="middle center">
          <LinkControl settings={[]} value={props.attributes.linkObject} onChange={handleLinkChange} />
          <Button variant="primary" onClick={() => setIsLinkPickerVisible(false)} style={{ display: "block", width: "100%" }}>
            Confirm Link
          </Button>
        </Popover>
      )}
    </>
  )
}

function SaveComponent(props) {
  return (
    <a href={props.attributes.linkObject.url} className={`btn btn-${props.attributes.size}`}>
      {props.attributes.text}
    </a>
  )
}
