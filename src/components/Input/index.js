export const input = (style, name, type = 'text', label, attr, placeholder = '') => `
    ${!!label ? `<label for=${name}>${label}</label>`: ''}
    <input 
        ${!!style ? `class=${style}` : ''}
        name=${name}
        type=${type}
        ${!!placeholder ? `placeholder=${placeholder}` : ''}
        ${!!attr ? ` ${attr} `: ''}
    />
`
