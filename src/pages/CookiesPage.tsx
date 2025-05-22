
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import Logo from '@/components/Logo';

const CookiesPage = () => {
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
            <CardTitle className="text-3xl">Cookie Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. What Are Cookies</h2>
              <p>Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to the website owners.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. How We Use Cookies</h2>
              <p>We use cookies for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Essential cookies:</strong> These cookies are necessary for the operation of our website. They enable core functionality such as security, network management, and account access.</li>
                <li><strong>Analytical/performance cookies:</strong> These cookies allow us to recognize and count the number of visitors and see how visitors move around our website. This helps us improve the way our website works.</li>
                <li><strong>Functionality cookies:</strong> These cookies allow us to remember choices you make and provide enhanced features. They may also be used to provide services you have requested, such as watching a video or commenting on a blog.</li>
                <li><strong>Targeting cookies:</strong> These cookies record your visit to our website, the pages you have visited, and the links you have followed. We may use this information to make our website and the advertising displayed on it more relevant to your interests.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Types of Cookies We Use</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Session Cookies</h3>
                  <p>These cookies are temporary and are deleted from your device when you close your web browser. We use session cookies to keep you logged in during your visit.</p>
                </div>
                <div>
                  <h3 className="font-medium">Persistent Cookies</h3>
                  <p>These cookies remain on your device for a longer period, which depends on the cookie's purpose and settings. They are activated each time you visit our website.</p>
                </div>
                <div>
                  <h3 className="font-medium">First-Party Cookies</h3>
                  <p>These are cookies placed on your device directly by us.</p>
                </div>
                <div>
                  <h3 className="font-medium">Third-Party Cookies</h3>
                  <p>These are cookies placed on your device by our service providers and partners, such as Google Analytics, social media platforms, and advertising networks.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Managing Cookies</h2>
              <p>Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or to alert you when cookies are being sent. The methods for doing so vary from browser to browser, so please refer to your browser's help menu for instructions.</p>
              <p className="mt-2">Please note that blocking or deleting cookies may impact your experience on our website, as some features may not function properly.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Changes to Our Cookie Policy</h2>
              <p>We may update our Cookie Policy from time to time. Any changes will be posted on this page and, where appropriate, notified to you.</p>
            </section>

            <div className="pt-6 text-sm text-gray-500">
              <p>Last updated: May 19, 2023</p>
              <p>If you have any questions about our use of cookies, please contact us at support@myhelper.com</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CookiesPage;
