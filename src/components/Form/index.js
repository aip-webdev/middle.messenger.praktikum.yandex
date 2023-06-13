export const form = (children, formStyle, attr = 'data-form') => `
    <form 
        ${!!formStyle ? `class=${formStyle}` : ''} 
        method="post" 
        action="" 
        encType="multipart/form-data"
        novalidate="novalidate"
        ${attr}
    >
        ${children}
    </form>
`
