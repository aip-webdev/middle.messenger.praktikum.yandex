import Handlebars from "handlebars";

export const Form = ({children, style}) =>
    Handlebars.compile(`<form 
        ${!!style ? `class=${style}` : ''} 
        method="post" 
        action="" 
        encType="multipart/form-data"
        novalidate="novalidate"
    >
        ${children}
    </form>`)()
