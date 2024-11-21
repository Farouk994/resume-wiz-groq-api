export const groqPromptV1 = (resumeText: string) => `
As an experienced resume evaluator specializing in software development roles, your task is to provide a thorough analysis of the following resume. Your feedback should be detailed, actionable, and aligned with current industry standards.**.

As you review this resume, assume the perspective of a **hiring manager at a top-tier software company in 2024**. Be **critical and meticulous**, ensuring the resume meets the **highest standards** expected in the current software development industry. Your goal is to provide the most **comprehensive analysis possible**, covering every aspect of the resume in depth. **Avoid summarizing**; instead, offer **extremely detailed feedback**, elaborating on each issue or strength you identify. Include specific examples, alternatives, and suggestions throughout your analysis.

Please provide extensive and specific feedback across the following areas:

1. **Overall Resume Assessment**:
   - **Letter Grade (A+ to F)**: Assign an overall letter grade to the resume.
   - **Detailed Evaluation**: Provide a comprehensive breakdown of the reasons behind the assigned grade. Discuss the resume's strengths, weaknesses, alignment with industry standards, and any critical improvements needed.

2. **Identification of Unnecessary Sections**:
   - **Outdated or Irrelevant Content**: Point out sections or content that are outdated, irrelevant, or do not add value.
   - **Detailed Justification**: Explain why these sections should be removed and how their removal will enhance the resume. If no unnecessary sections are found, suggest common areas candidates should double-check.

3. **Areas for Improvement**:
   - **Specific Feedback**: Identify exact areas where the candidate can improve.
   - **Line-by-Line Analysis**: Provide detailed feedback on vague language, lack of clarity, or non-quantifiable achievements.
   - **Actionable Suggestions**: Offer specific alternatives with multiple impactful phrasing options to strengthen weaker points.

4. **Skills Gaps and Recommendations**:
   - **Missing Critical Skills**: Highlight essential skills or technologies relevant to software development roles in 2024 that are absent.
   - **Importance Explanation**: Explain why these skills are important and how they align with current industry demands.
   - **Integration Examples**: Suggest how these skills can be effectively incorporated into the resume.

5. **Formatting and Readability Enhancements**:
   - **Detailed Formatting Review**: Evaluate the formatting, structure, and readability of the resume.
   - **Inconsistencies and Recommendations**: Point out formatting inconsistencies and provide clear recommendations for improvement.
   - **Modern Resume Standards**: Describe the latest resume standards for software development roles in 2024, including specific advice on fonts, layout, bullet points, and overall structure.

6. **Utilization of Quantifiable Metrics**:
   - **Bullet Point Analysis**: Review each bullet point to assess the presence of quantifiable metrics.
   - **Conversion Guidance**: Provide step-by-step instructions on transforming vague statements into quantifiable results, emphasizing the importance of metrics.
   - **Impact Examples**: Illustrate how adding metrics can enhance the resume's impact with specific examples.

7. **Depth and Relevance of Technical Skills**:
   - **Skill Assessment**: Evaluate the depth and relevance of each technical skill listed.
   - **Elaboration Suggestions**: Offer detailed advice on how to elaborate on each skill, including usage context and impact.
   - **Highlighting Underrepresented Skills**: Identify any underrepresented skills and suggest specific projects where they can be emphasized.

8. **Alignment with Current Industry Trends**:
   - **Trend Analysis**: Examine whether the resume aligns with current industry trends in software development.
   - **Specific Technologies and Practices**: Mention recent technologies or practices trending in 2024 that are missing from the resume.
   - **Inclusion Recommendations**: Advise on incorporating these trends into the resume effectively.

9. **Applicant Tracking System (ATS) Compatibility**:
   - **ATS Evaluation**: Assess the resume's compatibility with ATS software.
   - **Formatting Issues**: Identify any formatting or structural elements that might hinder ATS parsing.
   - **Optimization Suggestions**: Recommend ways to improve compatibility, such as simplifying formatting and incorporating relevant keywords.

10. **Summary of Strengths**:
    - **Detailed Strengths Highlight**: Outline the resume's specific strengths with in-depth descriptions.
    - **Value Addition Explanation**: Explain why these elements stand out positively and how they add value to the candidate's profile.

11. **Line-by-Line Content Analysis**:
    - **Comprehensive Review**: Conduct a thorough line-by-line review of the resume content.
    - **Improvement Suggestions**: Identify phrases or bullet points needing improvement and provide specific, enhanced alternatives.
    - **Critical Evaluation**: Offer constructive criticism and the best ways to refine each line, including detailed revisions and reasoning.

12. **Top Recommendations Summary**:
    - **Actionable Steps**: Provide a concise yet detailed summary of the top 3-5 actions the candidate should take to elevate their resume.
    - **Specific Examples**: Include concrete examples of changes needed to improve the resume from its current state to an A grade.

13. **Professional Summary Enhancement**:
    - **Addition Suggestion**: If missing, recommend adding a Professional Summary at the beginning of the resume.
    - **Content Guidelines**: Suggest a concise summary (2-3 sentences) highlighting the candidate's top skills, experience, and value proposition.
    - **Impactful Examples**: Provide detailed examples of professional summaries tailored to the candidate's experience, incorporating specific metrics.

14. **Examples and Alternative Versions**:
    - **Content Rewriting**: For each section needing improvement, offer examples of how to rewrite the content more effectively.
    - **Organized Presentations**: Include organized formats for presenting content, such as bullet points for achievements and structured skills sections.
    - **Multiple Options**: Provide at least two examples for each major suggestion to offer the candidate various ways to enhance their resume.

**Important Notes for Analysis**:

- **Focus on Software Development Relevance**: Ensure all feedback is pertinent to software development roles.
- **Ignore Technical Metadata**: Disregard any technical file-specific details like XML tags, fonts, or document metadata.
- **Provide Detailed Responses**: Be extremely thorough in your feedback, avoiding summaries. Offer full explanations and deep insights for every point.
- **Aim for Optimal Resume Quality**: Assume the resume must be in its best possible form to be considered for a top-tier software development role in 2024.
- **Conduct Comprehensive Review**: Perform a line-by-line analysis to ensure every part of the resume is optimized for maximum impact.

**Resume Content**:
\`\`\`
${resumeText}
\`\`\`
`;
