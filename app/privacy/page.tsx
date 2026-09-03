import Link from "next/link";

export default function Privacy() {
  return (
    <section className="inner shell legal">
      <p className="eyebrow">Last updated September 3, 2026</p>
      <h1>Privacy Policy</h1>
      <p className="lead">This Privacy Policy explains how David’s Insurance collects, uses, shares, and protects information you provide.</p>
      <div className="legal-card">
        <h2>Information we collect</h2>
        <p>We may collect your name, date of birth, phone number, email address, mailing address, insurance interests, vehicle or property information, and other information you voluntarily provide when requesting a quote or contacting us. We may also receive basic technical information, such as browser type and website usage data.</p>
        <h2>How we use information</h2>
        <p>We use your information to respond to inquiries, prepare or discuss requested insurance quotes, schedule or confirm appointments, provide application follow-ups and customer service, maintain business records, improve this website, and comply with applicable legal obligations.</p>
        <h2>SMS and mobile information</h2>
        <p>When you expressly opt in, David’s Insurance may send text messages concerning insurance inquiries, requested quotes, appointments, application follow-ups, policy-related customer service, and other information you requested. Message frequency varies. Message and data rates may apply. Consent to receive text messages is not a condition of purchase. Reply STOP to opt out at any time or HELP for assistance.</p>
        <p>Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes. Text messaging originator opt-in data and consent will not be sold, rented, or shared with any third parties or affiliates for marketing or promotional purposes. This information may be shared only with service providers that help us deliver the messaging service.</p>
        <h2>How we share information</h2>
        <p>We may share non-SMS-related information with insurance carriers, service providers, or other parties when reasonably necessary to respond to your request, prepare requested insurance options, provide requested services, operate our business, or comply with applicable law. We do not sell personal information.</p>
        <p>The sharing described above does not include text messaging originator opt-in data or consent. SMS opt-in information and consent are not shared with insurance carriers, third parties, or affiliates for marketing or promotional purposes.</p>
        <h2>SMS choices</h2>
        <p>You may opt out of text messages at any time by replying STOP. After opting out, you may receive one final message confirming your request. Reply HELP for assistance or contact us using the information below.</p>
        <h2>Security and retention</h2>
        <p>We use reasonable administrative and technical safeguards designed to protect your information. However, no method of electronic transmission or storage is completely secure. We retain information only for as long as reasonably necessary to provide services, maintain required business records, or comply with applicable law.</p>
        <h2>Your privacy choices</h2>
        <p>You may contact us to request access to, correction of, or deletion of information you provided, subject to applicable legal, contractual, and recordkeeping requirements.</p>
        <h2>Terms and SMS information</h2>
        <p>For additional information about our text messaging program, review our <Link href="/terms">Terms &amp; Conditions</Link> and <Link href="/sms">SMS Opt-In information</Link>.</p>
        <h2>Contact us</h2>
        <p>David’s Insurance<br />14445 Victory Blvd.<br />Van Nuys, CA 91401<br /><a href="tel:+18005424242">1-800-542-4242</a><br /><a href="mailto:davidscarinsurance@gmail.com">davidscarinsurance@gmail.com</a></p>
      </div>
    </section>
  );
}
