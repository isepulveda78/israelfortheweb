import { registerBlockType } from "@wordpress/blocks"
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
import { Button, PanelBody, PanelRow } from "@wordpress/components"
import apiFetch from "@wordpress/api-fetch"
import { useEffect } from "@wordpress/element"
import { BsImage } from "react-icons/bs"

registerBlockType("blocktheme/thirdhero", {
    title: "Third Hero",
    icon: BsImage,
    attributes: {
      imgID: { type: "number" },
      imgURL: { type: "string" }
    },
    example: {
        attributes: {
            cover: hero.fallbackimage
        }
    }, 
    edit: EditComponent,
    save: SaveComponent
  })

function EditComponent(props){
    useEffect(
        function() {
            if (props.attributes.imgID) {
            async function go(){
                const response = await apiFetch({
                    path: `/wp/v2/media/${props.attributes.imgID}`,
                    method: "GET"
                })
                props.setAttributes({ imgURL: response.source_url })
            }
            go()
        }
            
        },
        [props.attributes.imgID]
    )
    function onFileSelect(x){
        props.setAttributes({ imgID: x.id })
    }

    return (
    <>

    <InspectorControls>
        <PanelBody title="Hero Image" intitialOpen={true}>
            <MediaUploadCheck>
                <PanelRow>
                    <MediaUpload 
                    onSelect={onFileSelect}
                    value={props.attributes.imgID}
                    render={({ open }) => {
                        return <Button onClick={open}>Choose Image</Button>
                    }}
                    >
                    </MediaUpload>
                </PanelRow>
            </MediaUploadCheck>
        </PanelBody>
    </InspectorControls>
        <header className={`page-header-ui page-header-ui-dark overlay overlay-primary overlay-70 z-0 ${props.attributes.imgURL ? "" : 'bg-gradient-primary-to-secondary'}`} 
        style={{ backgroundImage: `url(${props.attributes.imgURL ? props.attributes.imgURL : '' })`,  backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                        <div className="page-header-ui-content">
                            <div className="container px-5">
                                <div className="row gx-5 justify-content-center">
                                    <div className="col-xl-8 col-lg-10 text-center">
                                        <div class="z-1">
                                            <InnerBlocks allowedBlocks={["blocktheme/genericheading", "blocktheme/genericbutton"]}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="svg-border-angled text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor"><polygon points="0,100 100,0 100,100"></polygon></svg>
                        </div>
                    </header>
    </>
    )
}

function SaveComponent(){
    return <InnerBlocks.Content />
}