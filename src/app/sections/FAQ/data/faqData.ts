export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  title: string;
  items: FAQItem[];
}

export const faqCategories: FAQCategory[] = [
  {
    title: 'General Questions',
    items: [
      {
        question: 'What is Qoves?',
        answer:
          "Qoves is the world's best platform to improve your looks and achieve a real facial transformation without surgery. We provide you, from the comfort of your home, with a personalized facial analysis and transformation plan based on over 2,000 academic studies.",
      },
      {
        question: 'Who is this for?',
        answer:
          "Qoves is designed for anyone who wants to understand and enhance their facial aesthetics through evidence-based, non-surgical approaches. Whether you're exploring subtle improvements or seeking a structured transformation plan, our platform caters to a wide audience.",
      },
      {
        question: 'What exactly will I receive?',
        answer:
          'You will receive a detailed facial analysis report along with a personalized action plan tailored to your unique facial structure, covering areas such as skincare, facial exercises, grooming, and lifestyle adjustments.',
      },
      {
        question: 'How does it work?',
        answer:
          'Simply upload your photos and our AI-powered system, backed by over 2,000 academic studies, will analyze your facial features and generate a comprehensive, personalized improvement plan.',
      },
      {
        question: 'How long will it take for me to receive my results?',
        answer:
          'Results are typically delivered within 24–48 hours after you submit your photos. Complex analyses may take slightly longer to ensure the highest quality recommendations.',
      },
      {
        question: 'Is this a one-time report or a continuous service?',
        answer:
          'We offer both options. You can start with a one-time analysis report, or subscribe to our continuous improvement plan that tracks your progress and updates your recommendations over time.',
      },
      {
        question: 'How often do I need to submit photos?',
        answer:
          'For subscribers on a continuous plan, we recommend submitting updated photos every 4–6 weeks so we can track your progress and adjust your plan accordingly.',
      },
      {
        question: 'What makes Qoves different from beauty apps or filters?',
        answer:
          'Unlike beauty apps that apply superficial filters, Qoves provides science-backed analysis rooted in academic research. Our recommendations are actionable and designed to create real, lasting improvements.',
      },
      {
        question: 'Can I really get results without surgery?',
        answer:
          'Absolutely. Our plans focus on non-surgical methods including skincare routines, facial exercises, grooming techniques, and lifestyle changes that can significantly enhance your appearance over time.',
      },
    ],
  },
  {
    title: 'About the Analysis',
    items: [
      {
        question: 'What does the facial analysis include?',
        answer:
          'The analysis covers facial symmetry, proportions, skin quality, bone structure assessment, and feature-specific recommendations based on established aesthetic research.',
      },
      {
        question: 'How accurate is the AI analysis?',
        answer:
          'Our AI model has been trained on thousands of data points from peer-reviewed studies, achieving a high level of accuracy in facial assessment and recommendation generation.',
      },
    ],
  },
  {
    title: 'About the Protocol',
    items: [
      {
        question: 'What is included in the protocol?',
        answer:
          'The protocol includes a tailored skincare regimen, facial exercises, dietary suggestions, posture corrections, and grooming recommendations — all personalized to your analysis results.',
      },
      {
        question: 'How long until I see results from the protocol?',
        answer:
          'Most users begin noticing visible improvements within 4–8 weeks of consistently following their personalized protocol.',
      },
    ],
  },
  {
    title: 'Experience & Use',
    items: [
      {
        question: 'Is the platform easy to use?',
        answer:
          'Yes, our platform is designed with simplicity in mind. Upload your photos, receive your analysis, and follow your plan — all from an intuitive dashboard.',
      },
      {
        question: 'Can I use Qoves on my phone?',
        answer:
          'Absolutely. Qoves is fully responsive and works seamlessly on mobile devices, tablets, and desktops.',
      },
    ],
  },
  {
    title: 'Pricing & Subscription',
    items: [
      {
        question: 'How much does Qoves cost?',
        answer:
          'We offer flexible pricing plans starting with a one-time analysis report. Subscription plans for continuous improvement are also available at competitive rates.',
      },
      {
        question: 'Can I cancel my subscription anytime?',
        answer:
          'Yes, you can cancel your subscription at any time with no hidden fees or penalties.',
      },
    ],
  },
  {
    title: 'Privacy & Data',
    items: [
      {
        question: 'Is my data safe?',
        answer:
          'Your privacy is our top priority. All photos and personal data are encrypted and stored securely. We never share your information with third parties.',
      },
      {
        question: 'Can I delete my data?',
        answer:
          'Yes, you can request complete deletion of your data at any time through your account settings or by contacting our support team.',
      },
    ],
  },
  {
    title: 'Mindset & Philosophy',
    items: [
      {
        question: 'Is Qoves promoting unrealistic beauty standards?',
        answer:
          'Not at all. Qoves is grounded in scientific research and focuses on helping you become the best version of yourself. We celebrate individuality and encourage healthy self-improvement.',
      },
    ],
  },
  {
    title: 'Practical Concerns',
    items: [
      {
        question: 'What kind of photos should I submit?',
        answer:
          'We recommend well-lit, front-facing photos without makeup or filters. Side-profile photos are also helpful for a more comprehensive analysis.',
      },
    ],
  },
  {
    title: 'About Support',
    items: [
      {
        question: 'How can I contact support?',
        answer:
          'You can reach our support team via the chat box in the bottom right corner of the page, or by emailing us at hello@qoves.com.',
      },
    ],
  },
];
