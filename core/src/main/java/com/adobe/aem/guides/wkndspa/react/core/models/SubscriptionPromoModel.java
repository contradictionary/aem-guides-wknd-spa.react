package com.adobe.aem.guides.wkndspa.react.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.granite.asset.api.Asset;
import com.day.cq.dam.commons.util.DamUtil;

import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Model(
    adaptables = SlingHttpServletRequest.class,
    resourceType = "wknd-spa-react/components/subscriptionpromo",
    adapters = ComponentExporter.class,
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SubscriptionPromoModel implements ComponentExporter {

    private static final Logger LOGGER = LoggerFactory.getLogger(SubscriptionPromoModel.class);

    @ValueMapValue
    private String formType;

    @ValueMapValue
    private String title;

    @ValueMapValue
    private String description;

    @ValueMapValue
    private String emailLabel;

    @ValueMapValue
    private String privacyLabel;

    @ValueMapValue
    private String privacyLink;

    @ValueMapValue
    private String registerCTA;

    @ValueMapValue
    private String expFragPath;

    @ValueMapValue
    private String subscriptionName;

    @ValueMapValue
    private String assetType;

    @ValueMapValue
    private String pdfPath;

    @ValueMapValue
    private String videoIds;

    @ValueMapValue
    private String eventExpiredMsg;

    @ValueMapValue
    private String overlayTitle;

    @ValueMapValue
    private String overlayDesc;

    @ValueMapValue
    private String successCTA;

    @ValueMapValue
    private String loadingTitle;

    @ValueMapValue
    private String loadingDesc;

    @SlingObject
    private ResourceResolver resourceResolver;

    public String getFormType() {
        return formType;
    }

    public String getTitle() {
        return title != null ? title : "Default Title";
    }

    public String getDescription() {
        return description != null ? description : "Default Description";
    }

    public String getEmailLabel() {
        return emailLabel != null ? emailLabel : "Default Email Label";
    }

    public String getPrivacyLabel() {
        return privacyLabel != null ? privacyLabel : "Default Privacy Label";
    }

    public String getPrivacyLink() {
        return privacyLink != null ? privacyLink : "Default Privacy Link";
    }

    public String getRegisterCTA() {
        return registerCTA != null ? registerCTA : "Default Register CTA";
    }

    public String getExpFragPath() {
        return expFragPath != null ? expFragPath : "Default Exp Frag Path";
    }

    public String getSubscriptionName() {
        return subscriptionName != null ? subscriptionName : "Default Subscription Name";
    }

    public String getAssetType() {
        return assetType != null ? assetType : "Default Asset Type";
    }

    public String getPdfPath() {
        return pdfPath != null ? pdfPath : "Default PDF Path";
    }

    public String getVideoIds() {
        return videoIds != null ? videoIds : "Default Video IDs";
    }

    public String getOverlayTitle() {
        return overlayTitle != null ? overlayTitle : "Default Overlay Title";
    }

    public String getOverlayDesc() {
        return overlayDesc != null ? overlayDesc : "Default Overlay Description";
    }

    public String getSuccessCTA() {
        return successCTA != null ? successCTA : "Default Success CTA";
    }

    public String getEventExpiredMsg() {
        return eventExpiredMsg != null ? successCTA : "Event expired";
    }

    public String getLoadingTitle() {
        return loadingTitle != null ? loadingTitle : "Default Loading Title";
    }

    public String getLoadingDesc() {
        return loadingDesc != null ? loadingDesc : "Default Loading Description";
    }

    public String getPdfThumbnail() {
        if (StringUtils.isNotBlank(pdfPath)) {
            Resource pdfResource = resourceResolver.getResource(pdfPath);
            if (pdfResource != null && DamUtil.isAsset(pdfResource)) {
                Asset asset = pdfResource.adaptTo(Asset.class);
                if (asset != null) {
                    LOGGER.info("thumbnail path {}",Optional.ofNullable(asset.getRendition("cq5dam.thumbnail.319.319.png"))
                    .map(rendition -> rendition.getPath())
                    .orElse(StringUtils.EMPTY));
                    return Optional.ofNullable(asset.getRendition("cq5dam.thumbnail.319.319.png"))
                            .map(rendition -> rendition.getPath())
                            .orElse(StringUtils.EMPTY);
                }
            }
        }
        return StringUtils.EMPTY;
    }

    @Override
    public String getExportedType() {
        return "wknd-spa-react/components/subscriptionpromo";
    }
}
