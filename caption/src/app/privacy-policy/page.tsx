import PrivacyPolicy from "@/components/PrivacyPolicy"


const page = () => {
  return (
    <div>
      <PrivacyPolicy/>
    </div>
  )
}


export function generateMetadata({ params }: any) {
  return {
    title: "Privacy Policy - Booleanix AI Caption Generator",
    description:
      "Booleanix values your privacy. Our Privacy Policy explains how we collect, use, and protect your data to ensure a secure experience.",
    keywords:
      "privacy policy, data protection, user privacy, personal information, security policy, Booleanix privacy, data security, privacy protection, terms of service.",
  };
}

export default page
