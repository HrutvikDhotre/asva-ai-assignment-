export const generateSummary = (length) => {
    const summaries = {
        Short: 'This is a short summary.',
        Medium: 'This is a medium-length summary.',
        Long: 'This is a long summary with more details.'
    }
    return summaries[length];
}
