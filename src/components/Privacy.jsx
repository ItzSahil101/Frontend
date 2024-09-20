import React from 'react';
import styles from './Privacy.module.css';

function Privacy() {
  return (
    <div className={styles["privacy-container"]}>
      <h1>Privacy Policy for News Boys</h1>

      <section className={styles["privacy-section"]}>
        <h2>GDPR Compliance</h2>
        <p>
          If you are located in the European Economic Area (EEA), we are committed to complying with the General Data Protection Regulation (GDPR). Under the GDPR, users have the following rights regarding their personal data:
        </p>

        <h3>1. Right to Access</h3>
        <p>
          You have the right to request access to the personal data we hold about you. You may request copies of your personal information by contacting us at sahiljogi2066@gmail.com.
        </p>

        <h3>2. Right to Rectification</h3>
        <p>
          If any of the information we have is inaccurate or incomplete, you have the right to ask us to correct or complete it.
        </p>

        <h3>3. Right to Erasure (Right to be Forgotten)</h3>
        <p>
          You have the right to request the deletion of your personal data. You can delete your account and associated data by contacting us or using the account settings on our website.
        </p>

        <h3>4. Right to Restrict Processing</h3>
        <p>
          You have the right to request that we limit the processing of your personal data under certain circumstances.
        </p>

        <h3>5. Right to Data Portability</h3>
        <p>
          You have the right to request that we transfer the personal data we hold about you to another organization, or directly to you, in a structured, commonly used, and machine-readable format.
        </p>

        <h3>6. Right to Object</h3>
        <p>
          You have the right to object to the processing of your personal data under certain circumstances, including direct marketing.
        </p>

        <h3>7. Data Retention</h3>
        <p>
          We only retain your personal data for as long as necessary to fulfill the purposes for which we collected it, including for legal or accounting purposes.
        </p>

        <h3>8. Legal Basis for Processing</h3>
        <p>
          We collect and process personal data based on your consent, the need to fulfill our contract with you, and for legitimate business purposes.
        </p>

        <p>
          If you would like to exercise any of these rights, please contact us at <a href="mailto:sahiljogi2066@gmail.com">sahiljogi2066@gmail.com</a>. You also have the right to lodge a complaint with a supervisory authority in the EU member state where you reside.
        </p>
      </section>

      <section className={styles["privacy-section"]}>
        <h2>CCPA Compliance</h2>
        <p>
          If you are a resident of California, we are committed to complying with the California Consumer Privacy Act (CCPA). Under the CCPA, California residents have the following rights regarding their personal data:
        </p>

        <h3>1. Right to Know</h3>
        <p>
          You have the right to request that we disclose the personal information we collect, use, and disclose about you over the past 12 months.
        </p>

        <h3>2. Right to Delete</h3>
        <p>
          You have the right to request the deletion of personal data we have collected about you, subject to certain exceptions.
        </p>

        <h3>3. Right to Opt-Out of Sale of Personal Information</h3>
        <p>
          We do not sell personal information. However, if that practice changes in the future, we will provide you with the ability to opt-out of the sale of your personal information.
        </p>

        <h3>4. Right to Non-Discrimination</h3>
        <p>
          We will not discriminate against you for exercising any of your rights under the CCPA. This means we will not deny you goods or services, charge you different prices, or provide a lower quality of services because you exercised your CCPA rights.
        </p>

        <h3>5. Data Collection and Sharing</h3>
        <p>
          In the preceding 12 months, we have collected the following categories of personal information: name, email, and password. This information is used solely for managing user accounts and enabling future features on our website.
        </p>

        <p>
          If you would like to exercise any of these rights, please contact us at <a href="mailto:sahiljogi2066@gmail.com">sahiljogi2066@gmail.com</a>.
        </p>
      </section>

      <section className={styles["privacy-section"]}>
        <h2>Privacy Policy for News Boys</h2>

        <h3>1. Information We Collect</h3>
        <p>
          When you register on News Boys, we collect the following personal information:
        </p>
        <ul>
          <li>Name</li>
          <li>Email Address</li>
          <li>Password</li>
        </ul>
        <p>
          This information is collected to manage user accounts, allow users to complete missions, and enable future features such as user-generated news posts.
        </p>

        <h3>2. How We Use Your Information</h3>
        <p>
          The information we collect is used to:
        </p>
        <ul>
          <li>Manage and maintain user accounts</li>
          <li>Provide personalized services and missions</li>
          <li>Allow users to post news in the future</li>
          <li>Serve relevant ads through Google AdSense</li>
        </ul>

        <h3>3. Google AdSense</h3>
        <p>
          We use Google AdSense for advertising purposes. Google may collect information to show personalized ads based on users' interactions with ads or their visits to other websites. For more information on how Google uses data, please refer to the Google Privacy & Terms page.
        </p>

        <h3>4. User Rights</h3>
        <p>
          As a registered user, you have the right to:
        </p>
        <ul>
          <li>Update or modify your personal information</li>
          <li>Delete your account at any time</li>
          <li>Log out of your account securely</li>
        </ul>

        <h3>5. Data Security</h3>
        <p>
          We prioritize the security of your data. All personal information is stored in a non-readable format (encrypted) and is kept confidential. We use industry-standard measures to protect your data against unauthorized access, disclosure, or alteration.
        </p>

        <h3>6. Cookies and Local Storage</h3>
        <p>
          We use cookies and localStorage to improve your experience on our website by storing data such as session information. All data saved in the frontend is stored in a non-readable form for added security.
        </p>

        <h3>7. Contact Information</h3>
        <p>
          If you have any questions or concerns regarding our privacy practices, feel free to contact us at <a href="mailto:sahiljogi2066@gmail.com">sahiljogi2066@gmail.com</a>.
        </p>
      </section>
    </div>
  )
}

export default Privacy;
