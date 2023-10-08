import { registerBlockType } from "@wordpress/blocks"
import { InnerBlocks } from "@wordpress/block-editor"

registerBlockType("blocktheme/footer", {
    title: "Footer",
    edit: EditComponent,
    save: SaveComponent
  })

function EditComponent(){
    return (
        <>
        <section className="bg-white">
            <div className="svg-border-angled text-dark">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none" fill="currentColor"><polygon points="0,100 100,0 100,100"></polygon></svg>
            </div>
        </section>
        <div id="layoutDefault_footer">
            <footer className="bg-dark text-center text-white">
                <div className="container p-4 pb-0">
                <section className="mb-4">
                    <InnerBlocks allowedBlocks={["blocktheme/socialbuttonlink"]}/>
                </section>
                </div>
                <div className="text-center p-3 bg-dark">
                    <h6 className="text-white"> © 2020 Copyright: <a className="text-white" href="https://mdbootstrap.com/">Fullstack Fusion</a></h6>
                </div>
            </footer>
        </div>
        </>
    )
}

function SaveComponent(){
    return <InnerBlocks.Content />
}