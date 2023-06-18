import Handlebars from "handlebars";

export const Input = (style, name, type = 'text', label, attr, placeholder = '') =>
    Handlebars.compile(`
        ${!!label ? `<label for=${name}>${label}</label>` : ''}
        <input 
            ${!!style ? `class=${style}` : ''}
            name=${name}
            type=${type}
            ${!!placeholder ? `placeholder=${placeholder}` : ''}
            ${!!attr ? ` ${attr} ` : ''}
        />
    `)()
