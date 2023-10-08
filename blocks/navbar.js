import { registerBlockType } from "@wordpress/blocks"
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
import { Button, PanelBody, PanelRow } from "@wordpress/components"
import { useEffect } from "@wordpress/element"
import apiFetch from "@wordpress/api-fetch"
registerBlockType('blocktheme/navbar', {
    title: "NavBar",
    attributes: {
        logoname: { type: "string" },
        logoID: { type: "number" },
        logoURL: { type: "string", default: navbar.fallbacklogo }
    },
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent(props){
   useEffect(()=> {
        if (props.attributes.logoID) {
        async function go(){
            const response = await apiFetch({
                path: `/wp/v2/media/${props.attributes.logoID}`,
                method: "GET"
            })
            props.setAttributes({ logoURL: response.source_url })
        }
        go()
    }
       
   },[props.attributes.logoID])

    function handleTextChange(x){
       props.setAttributes({ logoname: x })
    }
    function onFileSelect(x){
        props.setAttributes({ logoID: x.id })
    }
    return (
    <>
        <InspectorControls>
        <PanelBody title="Logo Image" intitialOpen={true}>
            <MediaUploadCheck>
                <PanelRow>
                    <MediaUpload 
                    onSelect={onFileSelect}
                    value={props.attributes.logoID}
                    render={({ open }) => {
                        return <Button onClick={open}>Choose Image</Button>
                    }}
                    >
                    </MediaUpload>
                </PanelRow>
            </MediaUploadCheck>
        </PanelBody>
    </InspectorControls>
    <nav className="navbar navbar-marketing navbar-expand-lg bg-white navbar-light">
        <div className="container px-5">
            <div className="d-inline-flex">
            <img className="mb-4 mr-3" src={`${props.attributes.logoURL}`} style={{ width: '5rem' }}/>&nbsp;
                <div className="align-self-center logo">
                    <InnerBlocks 
                    allowedBlocks={["blocktheme/logoname"]}
                    value={props.attributes.logoname}
                    className="h1"
                    onChange={handleTextChange} 
                    />
                </div>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><i data-feather="menu"></i></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto me-lg-5">
                    <span className="our-placeholder-block">Menu lives here.</span>
                </ul>
            </div>
        </div>
    </nav>
    </>
    )
}

function SaveComponent(){
    return <InnerBlocks.Content />
}