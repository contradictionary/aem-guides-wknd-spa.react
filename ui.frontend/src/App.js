import { Page, withModel } from "@adobe/aem-react-editable-components";
import React from "react";
import SubscriptionPromo from "./components/SubscriptionPromo/subscription-promo";
// This component is the application entry point

const jsonContract = {
  title: "Building better digital document workflows",
  description:
    "Discover how digital workflows and tools like e-signatures help banks keep remote work moving.",
  emailLabel: "Email",
  emailMandatoryError: "Email is required",
  emailInvalidError: "Email is Invalid",
  pdfPath: "https://pdfobject.com/pdf/sample.pdf",
  pdfThumbnail: "https://placehold.co/84x104?text=PDF%20Thumbnail",
  ctaText: "View",
};

class App extends Page {
  render() {
    return (
      <div>
        { this.childComponents }
        { this.childPages }
      </div>
    );
  }
}

export default withModel(App);
