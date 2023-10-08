import { link } from "@wordpress/icons"
import { ToolbarGroup, ToolbarButton, Popover, Button } from "@wordpress/components"
import { InspectorControls, BlockControls, __experimentalLinkControl as LinkControl } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import { useState, useEffect } from "@wordpress/element"
import { FaFacebook, FaGoogle, FaSquareGithub } from "react-icons/fa6"


registerBlockType("blocktheme/socialbuttonlink", {
  title: "Social Media Links",
  attributes: {
    social: { type: "string" },
    socialOutput: { type: "string", default: "" },
    linkObject: { type: "object", default: { url: "" } }
  },
  edit: EditComponent,
  save: SaveComponent
})

function EditComponent(props){
    useEffect(()=> {
        function socialLinkSwitch() {
            switch (props.attributes.social) {
              case "fa-facebook-f":
                return props.setAttributes({ socialOutput: <FaFacebook /> })
              case "fa-google":
                return props.setAttributes({ socialOutput: <FaGoogle /> })
              case "fa-google":
                return props.setAttributes({ socialOutput: <FaSquareGithub /> })
            }
          }
          socialLinkSwitch()
    },[])
    const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false)
  
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
          <ToolbarButton isPressed={props.attributes.social === 'fa-facebook-f'} onClick={() => props.setAttributes({ social: 'fa-facebook-f', socialOutput: <FaFacebook /> })}>
            <FaFacebook />
          </ToolbarButton>
          <ToolbarButton isPressed={props.attributes.social ===  'fa-google'} onClick={() => props.setAttributes({ social: 'fa-google', socialOutput: <FaGoogle /> })}>
            <FaGoogle />
          </ToolbarButton>
          <ToolbarButton isPressed={props.attributes.social === 'fa-github'} onClick={() => props.setAttributes({ social: 'fa-github', socialOutput: <FaSquareGithub /> })}>
            <FaSquareGithub />
          </ToolbarButton>
        </ToolbarGroup>
      </BlockControls>
      <InspectorControls>
      </InspectorControls>
      <a href={props.attributes.linkObject.url} className="icon-stack icon-stack-md bg-dark border border-white m-1 text-white">
        {props.attributes.socialOutput}
      </a>
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
        <a href={props.attributes.linkObject.url} className="icon-stack icon-stack-md bg-dark border border-white m-1 text-white">
            <i className={`fab ${props.attributes.social}`}></i>
        </a>
    )
}