
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <Logo size="medium" withText={true} />
          </Link>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p>At MyHelper, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and protect your information when you use our platform.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
              <p>We collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Personal Information:</strong> Name, email address, phone number, address, identification documents, and profile photos.</li>
                <li><strong>Employment Information:</strong> For workers, we collect information about skills, experience, and qualifications.</li>
                <li><strong>Payment Information:</strong> For registration fees, we collect payment details.</li>
                <li><strong>Usage Information:</strong> How you interact with our platform, including device information, IP address, and browser type.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To verify your identity and maintain your account</li>
                <li>To facilitate matches between workers and employers</li>
                <li>To process registration fees and other payments</li>
                <li>To improve our services and user experience</li>
                <li>To communicate with you about your account and our services</li>
                <li>To comply with legal obligations and enforce our terms</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Information Sharing and Disclosure</h2>
              <p>We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Between workers and employers when a connection is made through our platform</li>
                <li>With service providers who help us operate our business</li>
                <li>To comply with legal obligations, such as court orders</li>
                <li>With your consent for specific purposes</li>
              </ul>
              <p className="mt-2">We do not sell your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate personal information</li>
                <li>Delete your personal information</li>
                <li>Object to our processing of your personal information</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Retention of Information</h2>
              <p>We retain your personal information for as long as necessary to fulfill the purposes for which we collected it, including legal, accounting, or reporting requirements.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Changes to This Privacy Policy</h2>
              <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "last updated" date.</p>
            </section>

            <div className="pt-6 text-sm text-gray-500">
              <p>Last updated: May 19, 2023</p>
              <p>If you have any questions about this Privacy Policy, please contact us at privacy@myhelper.com</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PrivacyPage;
