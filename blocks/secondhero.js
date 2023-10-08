import { registerBlockType } from "@wordpress/blocks"
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
import { Button, PanelBody, PanelRow } from "@wordpress/components"
import apiFetch from "@wordpress/api-fetch"
import { useEffect } from "@wordpress/element"
import { BsCardImage } from "react-icons/bs"

registerBlockType('blocktheme/secondhero', {
    title: "Second Hero",
    icon: BsCardImage,
    attributes: {
        imgID: { type: "number" },
        imgURL: { type: "string", default: secondhero.fallbackheroimage}
    },
    example: {
        attributes: {
            cover: secondhero.fallbackheroimage
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
    <header className="page-header-ui page-header-ui-dark bg-img-cover overlay overlay-80" style={{ backgroundImage: `url('${props.attributes.imgURL}')` }}>
                        <div className="page-header-ui-content py-5 position-relative">
                            <div className="container px-5">
                                <div className="row gx-5 justify-content-center">
                                    <div className="col-xl-8 col-lg-10 text-center">
                                        <div data-aos="fade-up">
                                        <InnerBlocks 
                                            allowedBlocks={["blocktheme/genericheading", "blocktheme/genericbutton"]}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="svg-border-rounded text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144.54 17.34" preserveAspectRatio="none" fill="currentColor"><path d="M144.54,17.34H0V0H144.54ZM0,0S32.36,17.34,72.27,17.34,144.54,0,144.54,0"></path></svg>
                        </div>
                    </header>
    </>
    )
}

function SaveComponent(){
    return <InnerBlocks.Content />
}
