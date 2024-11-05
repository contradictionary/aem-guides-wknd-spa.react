import { Page, withModel } from "@adobe/aem-react-editable-components";
import React from "react";
import SubscriptionPromo from "./components/SubscriptionPromo/subscription-promo";
// This component is the application entry point
class App extends Page {
  render() {
    return (
      <div>
        {this.childComponents}
        <SubscriptionPromo title={"Subscription Promo"} />
        {this.childPages}
      </div>
    );
  }
}

export default withModel(App);
