"use client"

import { Jaro } from 'next/font/google'
import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

const jaro = Jaro({ subsets: ['latin'] })

const PrivacyPolicy = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null)

  const toggleSection = (index: number) => {
    setExpandedSection(expandedSection === index ? null : index)
  }

  const sections = [
    {
      title: "1. Information We Collect",
      content: `a) Information You Provide
- Account Information: Name, email address, and any other details provided during registration.
- Content Input: Video scripts or descriptions submitted to generate captions.
b) Automatically Collected Information
- Usage Data: Information about how you interact with the app, such as timestamps, features accessed, and session durations.
- Device Information: IP address, browser type, operating system, and device type.`
    },
    {
      title: "2. How We Use Your Information",
      content: `We collect and use your information for the following purposes:
- To generate captions based on your input.
- To improve the functionality and user experience of Booleanix.
- To communicate with you regarding updates, support, or promotional content (only with your consent).
- To maintain security and prevent unauthorized use of the application.`
    },
    {
      title: "3. Sharing of Information",
      content: `We respect your privacy and do not sell, rent, or share your personal information with third parties, except:
- With Service Providers: Trusted partners who help us operate and improve the application (e.g., hosting services, analytics).
- For Legal Compliance: When required by law or to protect our legal rights.`
    },
    {
      title: "4. Data Security",
      content: "We take appropriate security measures to protect your personal information, including encryption and secure server technologies. However, no system can guarantee 100% security, and we encourage users to take precautions when sharing sensitive data online."
    },
    {
      title: "5. Your Rights",
      content: `You have the following rights regarding your personal data:
- Access and Correction: Request access to or correction of your data.
- Data Deletion: Request the deletion of your data from our systems.
- Withdraw Consent: Opt out of receiving promotional emails by clicking the "Unsubscribe" link in the email.
To exercise these rights, please contact us at support@booleanix.com.`
    },
    {
      title: "6. Cookies and Tracking",
      content: "Booleanix uses cookies and similar tracking technologies to enhance your experience. You can manage your cookie preferences through your browser settings."
    },
    {
      title: "7. Data Retention",
      content: "We retain your personal information only for as long as necessary to provide our services and for legitimate business purposes, such as compliance with legal obligations."
    },
    {
      title: "8. Children's Privacy",
      content: "Booleanix is not intended for children under 13. We do not knowingly collect information from children. If you believe a child has provided us with personal information, please contact us, and we will take appropriate action to remove the data."
    },
    {
      title: "9. Changes to This Policy",
      content: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date. Continued use of Booleanix constitutes your acceptance of the revised policy."
    },
    {
      title: "10. Contact Us",
      content: `If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at:
Email: support@booleanix.com`
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className={`${jaro.className} text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8`} style={{ WebkitTextStroke: "0.5px #8E2DE2" }}>
          Privacy Policy
        </h1>
        <p className="text-gray-400 text-center mb-8">Effective Date: 7 December 2024</p>
        <p className="mb-8 text-lg">
          Welcome to Booleanix - AI Caption Generator! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our application and services. By using Booleanix, you agree to the practices outlined in this policy.
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
                  <p className="text-gray-300 whitespace-pre-wrap">{section.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-gray-400">
          By using Booleanix, you acknowledge that you have read and understood this Privacy Policy. Thank you for trusting us with your privacy!
        </p>
      </div>
    </div>
  )
}

export default PrivacyPolicy