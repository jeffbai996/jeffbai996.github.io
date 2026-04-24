// Response strings and category maps for the rule-based chat classifier.
// Extracted from ChatWidget.jsx to keep component files focused on rendering.

export const edgeCaseResponses = {
  profanity: "I understand you might be frustrated, and I'm sorry if something isn't working as expected. I'm here to help you navigate government services - let's work together to solve your issue. What do you need help with?",
  unintelligible: "I'm not quite sure what you mean. Could you try rephrasing that? Here's what I can help with:\n• **Documents**: IDs, passports, birth certificates\n• **Financial**: Taxes, banking, loans\n• **Services**: Police, courts, healthcare, housing\n• **Other**: Postal, customs, cannabis licensing, transport\n\nJust tell me what you're trying to do!",
  repeated: "It looks like you're asking about the same thing. If my previous answer wasn't helpful, could you tell me more specifically what you need? I want to make sure I give you the right information.",
  tooShort: "I'd love to help, but I need a bit more detail. What service are you looking for?",
  stillConfused: "I'm still having trouble understanding. Let me try to help differently - are you looking to:\n\n1. Get a document (ID, passport, certificate)\n2. File or pay taxes\n3. Report something to police\n4. Track a package or case\n5. Something else\n\nJust type the number or describe what you need!",
  contextualHelp: "Based on our conversation, it seems like you might need help with {topic}. Is that right? If not, please tell me what you're looking for."
}

// Smart suggestions based on partial matches
export const smartSuggestions = {
  document: ["National ID", "Passport", "Birth Certificate", "Driver's License"],
  money: ["File Taxes", "Pay Taxes", "Open Bank Account", "Apply for Loan"],
  legal: ["File Police Report", "Court Case Lookup", "Legal Aid", "Police Clearance"],
  tracking: ["Track Package", "Check Case Status", "Tax Refund Status"],
  license: ["Driver's License", "Cannabis License", "Vehicle Registration"]
}
