import TermsAndConditions from "@/components/TermsAndConditions";

const page = () => {
  return (
    <div>
      <TermsAndConditions />
    </div>
  );
};

export function generateMetadata({ params }: any) {
  return {
    title: "Terms & Conditions - Booleanix AI Caption Generator",
    description:
      "Booleanix's Terms and Conditions outline the rules for using our services. By using our platform, you agree to these terms.",
    keywords:
      "terms and conditions, user agreement, platform rules, Booleanix terms, service terms, terms of use, website policies, user guidelines.",
  };
}

export default page;
