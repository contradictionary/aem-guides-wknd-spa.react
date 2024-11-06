package com.adobe.aem.guides.wkndspa.react.core.servlets;

import com.adobe.granite.ui.components.ds.DataSource;
import com.adobe.granite.ui.components.ds.SimpleDataSource;
import com.adobe.granite.ui.components.ds.ValueMapResource;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.wrappers.ValueMapDecorator;
import org.osgi.service.component.annotations.Component;

import javax.servlet.Servlet;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component(
        service = {Servlet.class},
        property = {
                "sling.servlet.paths=/bin/myproject/subscription",
                "sling.servlet.methods=GET"
        }
)
public class SubscriptionDatasourceServlet extends SlingSafeMethodsServlet {

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {
        ResourceResolver resourceResolver = request.getResourceResolver();

        // Create a list to hold the data
        List<Resource> resourceList = new ArrayList<>();

        // Mock data for example
        String[][] data = {
            {"Newsletter", "newsletter"},
            {"Updates", "updates"}
        };

        // Populate the resource list with ValueMapResource
        for (String[] entry : data) {
            Map<String, Object> map = new HashMap<>();
            map.put("text", entry[0]);
            map.put("value", entry[1]);
            ValueMap valueMap = new ValueMapDecorator(map);
            resourceList.add(new ValueMapResource(resourceResolver, "", "", valueMap));
        }

        // Create a DataSource from the resource list
        DataSource dataSource = new SimpleDataSource(resourceList.iterator());

        // Set the data source as a request attribute
        request.setAttribute(DataSource.class.getName(), dataSource);
    }
}
