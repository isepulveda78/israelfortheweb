import apiFetch from "@wordpress/api-fetch"
import { Button, PanelBody, PanelRow } from "@wordpress/components"
import { InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck } from "@wordpress/block-editor"
import { registerBlockType } from "@wordpress/blocks"
import { useEffect } from "@wordpress/element"
import sanitizeHtml from 'sanitize-html'

registerBlockType("blocktheme/secondservice", {
    title: "Second Service",
    attributes: {
        imgID: { type: 'number' },
        imgURL: { type: "string", default: secondservice.fallbackserviceimage},
        allServices: { type: "array" }
    },
    edit: EditComponent,
    save: SaveComponent
})

function EditComponent(props){
    useEffect(
        function () {
          if (props.attributes.imgID) {
            async function go() {
              const response = await apiFetch({
                path: `/wp/v2/media/${props.attributes.imgID}`,
                method: "GET"
              })
              props.setAttributes({ imgURL: response.source_url })
            }
            go()
          }
        services()
        },
        [props.attributes.imgID]
      )

        const services = async () => {
             const response = await apiFetch({
                path: '/wp/v2/service',
                method: "GET"
                })
                props.setAttributes({ allServices: response })
         }
        
         const truncate = (string, limit) => {
            if(string.length <= limit){
                return string
            }
            return string.slice(0, limit) + "..."
         }

         function onFileSelect(x) {
            props.setAttributes({ imgID: x.id })
          }
        
    return (
        <>
    <InspectorControls>
        <PanelBody title="Background" initialOpen={true}>
          <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={onFileSelect}
                value={props.attributes.imgID}
                render={({ open }) => {
                  return <Button onClick={open}>Choose Image</Button>
                }}
              />
            </MediaUploadCheck>
          </PanelRow>
        </PanelBody>
      </InspectorControls>
        <section className="bg-white py-10">
                        <div className="container px-5">
                            <div className="row gx-5 align-items-center justify-content-center">
                                <div className="col-md-9 col-lg-6 order-1 order-lg-0" data-aos="fade-right">
                                    <div className="content-skewed content-skewed-right"><img className="content-skewed-item img-fluid shadow-lg rounded-3" src={`${props.attributes.imgURL}`} alt="Services" /></div>
                                </div>
                                <div className="col-lg-6 order-0 order-lg-1 mb-5 mb-lg-0" data-aos="fade-left">
                                    <div className="mb-5">
                                    <InnerBlocks allowedBlocks={["blocktheme/serviceheading" ]}/>
                                    </div>
                                    <div className="row gx-5">
                                    {props.attributes.allServices && props.attributes.allServices.map((service) => (
                                    <div className="col-md-6 mb-4">
                                        <h6>{service.title.rendered}</h6>
                                        <div className="mb-2 small" dangerouslySetInnerHTML={{ __html: sanitizeHtml(truncate(service.excerpt.rendered, 60)) }}></div>
                                        <a className="small text-arrow-icon" href={`/services/${service.slug}`}>
                                            Learn More
                                            <i data-feather="arrow-right"></i>
                                        </a>
                                    </div>
                                    ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
        </>
    )
}

function SaveComponent(){
    return <InnerBlocks.Content />
}