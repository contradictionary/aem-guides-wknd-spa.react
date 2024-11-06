(function(document, $) {
    "use strict";

    $(document).on("dialog-ready", function() {
        var formTypeField = $("[name='./formType']");
        var assetTypeField = $("[name='./assetType']");

        function toggleTabs() {
            var formType = formTypeField.val();
			$(".subscriptionpromo coral-tablist coral-tab").eq(0).show();
            $(".subscriptionpromo coral-tablist coral-tab").eq(4).show();
            $(".subscriptionpromo coral-tablist coral-tab").eq(5).show();
            
            if (formType === "fastSubscription") {
                $(".subscriptionpromo coral-tablist coral-tab").eq(1).show();
                $(".subscriptionpromo coral-tablist coral-tab").eq(2).hide();
                $(".subscriptionpromo coral-tablist coral-tab").eq(3).hide();
            } else if (formType === "gatedContent") {
                $(".subscriptionpromo coral-tablist coral-tab").eq(1).hide();
                $(".subscriptionpromo coral-tablist coral-tab").eq(2).show();
                $(".subscriptionpromo coral-tablist coral-tab").eq(3).hide();
            } else if (formType === "eventRegistration") {
                $(".subscriptionpromo coral-tablist coral-tab").eq(1).hide();
                $(".subscriptionpromo coral-tablist coral-tab").eq(2).hide();
                $(".subscriptionpromo coral-tablist coral-tab").eq(3).show();
            }
        }

        function toggleGatedContentFields() {
            var assetType = assetTypeField.val();
            if (assetType === "PDF") {
                $("[name='./pdfPath']").closest(".coral-Form-fieldwrapper").show();
                $("[name='./videoIds']").closest(".coral-Form-fieldwrapper").hide();
            } else if (assetType === "VIDEO") {
                $("[name='./pdfPath']").closest(".coral-Form-fieldwrapper").hide();
                $("[name='./videoIds']").closest(".coral-Form-fieldwrapper").show();
            }
        }

        formTypeField.on("change", toggleTabs);
        assetTypeField.on("change", toggleGatedContentFields);

        toggleTabs();
        toggleGatedContentFields();
    });
})(document, Granite.$);
