export const Score = ({children, score}) => {
    return (
        <div>
            <h2 style='margin: 0.25rem auto;'>Q-CHAT</h2>
            <small>The Quantitative Checklist for Autism in Toddlers (Q-CHAT) is a tool that allows for autism spectrum disorder to be detected in toddlers 18-24 months of age. </small>
            <small>Your answers are evaluated with AI (Artificial Intelence) to give a score between 0 an 1.</small>
            <p>{score < 0.5 ? 
                `There's nothing to worry about. The score was:` : 
                `You should consider taking your child to a professional for a multi-disciplinary assessment. The score was:`}</p>            
            <h4>{score.toFixed(8)}</h4>
            {children}
        </div>
    )
}