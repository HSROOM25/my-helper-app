
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const TermsPage = () => {
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
            <CardTitle className="text-3xl">Terms of Use</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using the MyHelper platform ("Service"), you agree to be bound by these Terms of Use. If you do not agree to all the terms and conditions, you must not use the Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Registration and Account</h2>
              <p>To use certain features of the Service, you must register for an account. You agree to provide accurate information and keep your information up-to-date. You are responsible for safeguarding your password and for all activity that occurs under your account.</p>
              <p className="mt-2">If you register as a worker, you agree to pay the annual registration fee and undergo background verification processes as required.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Service Description</h2>
              <p>MyHelper is a platform connecting workers with employers seeking services. We do not employ workers directly and are not responsible for the quality of work performed. The platform facilitates connections and provides verification services only.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. User Obligations</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate information during registration and profile creation</li>
                <li>Use the platform for lawful purposes only</li>
                <li>Respect the privacy and rights of other users</li>
                <li>Not misrepresent skills, qualifications, or identity</li>
                <li>Not engage in harassment or discriminatory behavior</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Fees and Payments</h2>
              <p>Workers must pay an annual registration fee of R250 to maintain an active profile. This fee is non-refundable. Payment arrangements between workers and employers are conducted outside our platform, and we are not responsible for any payment disputes.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Limitation of Liability</h2>
              <p>MyHelper is not liable for any damages or losses resulting from the use of our services, including but not limited to direct, indirect, incidental, consequential damages, or any damages resulting from lost profits, data, or business interruption.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Termination</h2>
              <p>We reserve the right to terminate or suspend your account and access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms of Use or is harmful to other users, us, or third parties, or for any other reason.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Changes to Terms</h2>
              <p>We may modify these Terms at any time. Your continued use of the Service following the posting of changes constitutes your acceptance of such changes.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Governing Law</h2>
              <p>These Terms shall be governed by the laws of South Africa without regard to its conflict of law provisions.</p>
            </section>

            <div className="pt-6 text-sm text-gray-500">
              <p>Last updated: May 19, 2023</p>
              <p>If you have any questions about these Terms, please contact us at support@myhelper.com</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default TermsPage;
