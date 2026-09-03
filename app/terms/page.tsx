import Link from "next/link";

export default function Terms() {
  return (
    <section className="inner shell legal">
      <p className="eyebrow">Last updated September 3, 2026</p>
      <h1>Terms &amp; Conditions</h1>
      <p className="lead">These Terms and Conditions govern your use of the David’s Insurance website and the David’s Insurance text messaging program.</p>
      <div className="legal-card">
        <h2>Website information</h2>
        <p>This website provides general insurance information and a way to contact David’s Insurance. It does not provide legal, tax, or financial advice. Insurance availability, eligibility, pricing, and coverage are subject to carrier underwriting, policy terms, exclusions, availability, and applicable law.</p>
        <h2>No coverage created</h2>
        <p>Submitting a form, sending a message, or receiving a quote does not bind, change, issue, or renew insurance coverage. Coverage becomes effective only when confirmed in writing by an authorized insurer or representative and all required conditions and payments have been completed.</p>
        <h2>David’s Insurance SMS program</h2>
        <p>When you expressly opt in, David’s Insurance may send text messages concerning your insurance inquiry, requested quotes, appointments, application follow-ups, policy-related customer service, and other information you requested.</p>
        <p>Message frequency varies. Message and data rates may apply. Consent to receive text messages is not a condition of purchasing any property, goods, or services. Carriers are not liable for delayed or undelivered messages.</p>
        <h2>How to opt in</h2>
        <p>You may opt in by voluntarily checking the unchecked SMS consent box when submitting a quote or contact request through this website. The checkbox is optional and is not selected automatically. You may also provide express consent directly to a David’s Insurance representative after receiving information about the messaging program.</p>
        <h2>How to opt out or receive help</h2>
        <p>You may cancel SMS messages at any time by replying STOP. After replying STOP, you may receive one final message confirming that you have been unsubscribed. Reply HELP for assistance. You may also call <a href="tel:+18005424242">1-800-542-4242</a> or email <a href="mailto:davidscarinsurance@gmail.com">davidscarinsurance@gmail.com</a>.</p>
        <h2>Mobile-information privacy</h2>
        <p>Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes. Text messaging originator opt-in data and consent will not be sold, rented, or shared with third parties or affiliates for marketing or promotional purposes. SMS information may be shared only with service providers that help deliver the messaging service.</p>
        <p>Please review our <Link href="/privacy">Privacy Policy</Link> and <Link href="/sms">SMS Opt-In information</Link> for additional details.</p>
        <h2>Acceptable use</h2>
        <p>You agree not to misuse this website, interfere with its operation, attempt unauthorized access, or submit false, unlawful, misleading, or harmful content.</p>
        <h2>Third-party services</h2>
        <p>This website may rely on third-party communications, hosting, and insurance-related services. Those services may have their own terms and privacy policies. David’s Insurance is not responsible for third-party websites or services outside our control.</p>
        <h2>Limitation of liability</h2>
        <p>To the extent permitted by applicable law, David’s Insurance is not liable for indirect, incidental, special, or consequential damages resulting from use of this website or reliance on general website information.</p>
        <h2>Changes to these terms</h2>
        <p>We may update these Terms and Conditions by posting a revised version on this page. The updated date displayed above identifies the latest revision.</p>
        <h2>Contact us</h2>
        <p>David’s Insurance<br />14445 Victory Blvd.<br />Van Nuys, CA 91401<br /><a href="tel:+18005424242">1-800-542-4242</a><br /><a href="mailto:davidscarinsurance@gmail.com">davidscarinsurance@gmail.com</a></p>
      </div>
    </section>
  );
}
