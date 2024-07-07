const extractKeywords = (text) => {
    // console.log('ex')
    // console.log(text)

    const commonWords = new Set(["the", "and", "a", "to", "in", "of", "with", "on", "for", "as", "by", "is", "at", "it", "an", "be", "this", "from"])
    const words = text.toLowerCase().split(/\W+/)
    const keywords = words.filter(word => word.length > 3 && !commonWords.has(word))
    return Array.from(new Set(keywords)) // Remove duplicates
}

export const mockSummarizationAPI = (text, length) => {
    // console.log(text)
    const newLength = length.toLowerCase()
    const keywords = extractKeywords(text)
    const summaries = {
        short: (
            <div>
                This is a <span className="fw-bolder">short</span> summary of the text, focusing on keywords such as <span className="fw-bolder">{keywords.slice(0, 2).join(", ")}.</span>
            </div>
        ),
        medium: (
            <div>
              This is a <span className="fw-bolder">medium</span> summary of the text, focusing on keywords such as <span className="fw-bolder">{keywords.slice(0, 3).join(", ")}.</span>
            </div>
          ),
        long: (
            <div>
              This is a <span className="fw-bolder">long</span> summary of the text, focusing on keywords such as <span className="fw-bolder">{keywords.slice(0, 5).join(", ")}.</span>
            </div>
          )
    }

    return summaries[newLength]

    // if (text.length < 50) {
    //     return summaries.short
    // } else if (text.length < 150) {
    //     return summaries.medium
    // } else {
    //     return summaries.long
    // }
}

// // Example usage
// const inputText = "The latest advancements in technology have revolutionized various industries, from healthcare to finance."
// console.log(mockSummarizationAPI(inputText))
