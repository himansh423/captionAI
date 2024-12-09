import ContactUs from "@/components/ContactUs"


const page = () => {
  return (
    <div>
      <ContactUs/>
    </div>
  )
}

export function generateMetadata() {
  return {
    title: "Contact Us - Booleanix AI Caption Generator",
    description:
      "Get in touch with us at Booleanix for any inquiries, support, or feedback. We're here to assist you!",
    keywords:
      "AI caption generator, creative captions, social media captions, marketing captions, caption writing tool, AI-powered captions, Booleanix, caption creation, social media content, automated captions.",
  };
}

export default page
