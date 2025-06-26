import React from 'react';

const faqData = [
  { question: 'How do I start the 30 Days 30 Books Challenge?', answer: 'Begin with a 1-month plan; track progress on your dashboard.' },
  { question: 'What if I can’t finish the challenge?', answer: 'Switch to a 6-month or 1-year plan, or continue monthly without rewards.' },
  { question: 'How do I get the 20% referral discount?', answer: 'Use a friend’s promo code at checkout.' },
  { question: 'What happens if I complete the challenge?', answer: 'Admin is notified for 11-month free extension.' },
  { question: 'How do I earn referral commissions?', answer: 'Earn 20% per new buyer, paid monthly.' },
  { question: 'Does the challenge apply to 6-month or 1-year plans?', answer: 'No, 1-month only.' },
  { question: 'What if I cancel my subscription?', answer: 'Future commissions stop; new buyers still get the discount.' },
  { question: 'Can I use my account on multiple devices?', answer: 'No, one device at a time.' },
  { question: 'What happens to my promo code if I cancel?', answer: 'It’s lost; a new subscription gets a new code.' },
  { question: 'How are commissions verified and paid?', answer: 'Linked to active subscription, paid monthly (method TBD).' },
  { question: 'What if I fail a test?', answer: 'Book marked "Completed" (no *), try another book (one attempt only).' },
  { question: 'Can I track challenge progress on 6-month or 1-year plans?', answer: 'No.' },
  { question: 'Can I switch plans?', answer: 'Yes, to larger plans only (orange active, green upgradeable).' },
  { question: 'Is there a refund policy?', answer: 'No, due to referral commissions.' },
  { question: 'Are these prices fixed?', answer: 'No, promotional; prices may increase with adjusted commissions.' },
  { question: 'What if I haven’t listened to the entire book?', answer: 'Test button inactive; warning displayed.' },
  { question: 'Can I retake a test if I fail?', answer: 'No, one attempt per book.' },
  { question: 'Will I receive updates on my challenge progress?', answer: 'Yes, daily emails with progress and motivation.' },
  { question: 'Can I complete all 30 books in one day?', answer: 'No, must span 10 distinct days, 10 tests/day limit.' }
];

const Faqs = () => {
  return (
    <div className="faq-smartlife-section py-5 container rounded-5">
      <div className="container">
        <div className="w-lg-75 mx-auto text-center mb-5">
          <h6 className="faq-smartlife-subtitle">FAQ | Frequently Asked Questions</h6>
          <h2 className="faq-smartlife-title">Have a Question?</h2>
        </div>

        <div className="accordion accordion-flush" id="faqAccordion">
          {faqData.map((item, index) => {
            const faqId = `faq${index}`;
            const headingId = `heading${index}`;
            return (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header" id={headingId}>
                  <button
                    className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${faqId}`}
                    aria-expanded={index === 0 ? 'true' : 'false'}
                    aria-controls={faqId}
                  >
                    {item.question}
                  </button>
                </h2>
                <div
                  id={faqId}
                  className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
