"use client"

import { Jaro } from 'next/font/google'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const jaro = Jaro({ subsets: ['latin'] })

const TermsAndConditions = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null)

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index)
  }

  const sections = [
    { title: "1. Acceptance of Terms", content: "By accessing or using Booleanix, you acknowledge that you have read, understood, and agree to these Terms and Conditions. If you do not agree to these terms, please refrain from using the application." },
    { title: "2. Service Overview", content: "Booleanix provides an AI-powered platform that generates captions based on user-provided video scripts or descriptions. These captions are intended for creative and informational use and may require user review for accuracy, tone, or compliance with specific requirements." },
    { title: "3. User Responsibilities", content: "Accuracy of Input: You are responsible for ensuring the accuracy, clarity, and lawfulness of the scripts or descriptions you provide. Content Ownership: By using the platform, you confirm that you own or have the necessary rights to use and upload the content. Prohibited Content: You agree not to submit content that is illegal, harmful, defamatory, infringing, or violates any third-party rights or applicable laws." },
    { title: "4. Intellectual Property", content: "Generated Captions: The captions generated by Booleanix are for your use; however, Booleanix retains the right to improve and analyze the platform's functionality based on user input. Application Features: All AI models, algorithms, and features in Booleanix are the intellectual property of the company and are protected under applicable copyright and intellectual property laws." },
    { title: "5. Limitation of Liability", content: "Booleanix is not responsible for: Errors, inaccuracies, or omissions in the captions generated. Any misuse of captions or resulting consequences from their use. Technical issues, interruptions, or application unavailability." },
    { title: "6. Privacy Policy", content: "Your privacy is important to us. For information on how we collect, use, and protect your data, please review our Privacy Policy." },
    { title: "7. Termination", content: "Booleanix reserves the right to suspend or terminate your access to the application if you violate these terms or engage in unauthorized activities." },
    { title: "8. Changes to Terms", content: "We may update these Terms and Conditions from time to time. Any changes will be effective immediately upon posting. Continued use of the application constitutes your acceptance of the updated terms." },
    { title: "9. Contact Information", content: "If you have any questions or concerns regarding these Terms and Conditions, please contact us at support@booleanix.com." },
  ]

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className={`${jaro.className} text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8`} style={{ WebkitTextStroke: "0.5px #8E2DE2" }}>
          Terms and Conditions
        </h1>
        <p className="text-gray-400 text-center mb-8">Last Updated: 7 December 2024</p>
        <p className="mb-8 text-lg">
          Welcome to Booleanix - AI Caption Generator! By using our application, you agree to abide by the following terms and conditions. Please read them carefully before using our services.
        </p>
        <div className="space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="border border-[#8E2DE2] rounded-lg overflow-hidden">
              <button
                className="w-full px-4 py-3 flex justify-between items-center bg-[#1E1E1E] hover:bg-[#2A2A2A] transition-colors duration-200"
                onClick={() => toggleSection(index)}
              >
                <h2 className={`${jaro.className} text-lg sm:text-xl font-semibold text-left`}>{section.title}</h2>
                {expandedSection === index ? <FaChevronUp className="text-[#8E2DE2]" /> : <FaChevronDown className="text-[#8E2DE2]" />}
              </button>
              {expandedSection === index && (
                <div className="px-4 py-3 bg-[#121212]">
                  <p className="text-gray-300">{section.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-gray-400">
          By using Booleanix, you agree to these Terms and Conditions and acknowledge that you have read and understood them. Thank you for choosing Booleanix - AI Caption Generator!
        </p>
      </div>
    </div>
  )
}

export default TermsAndConditions