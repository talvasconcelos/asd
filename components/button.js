export const Button = ({children, click, score, style}) => (
    <button class={`btn ${style}`} onClick={() => click(score)}>
        <span>{children}</span>
    </button>
)