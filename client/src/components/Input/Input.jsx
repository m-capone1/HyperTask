import "./Input.scss";

function Input({ label, name, type, ...props }) {
    return (
        <div className="field">
            <label htmlFor={name} className="field__label">
                {label}
            </label>
            <input 
                type={type} 
                id={name} 
                name={name} 
                className="field__input" 
                {...props}
            />
        </div>
    );
}

export default Input;