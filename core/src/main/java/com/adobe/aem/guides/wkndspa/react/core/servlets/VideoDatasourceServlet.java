package com.adobe.aem.guides.wkndspa.react.core.servlets;

import com.adobe.granite.ui.components.ds.DataSource;
import com.adobe.granite.ui.components.ds.SimpleDataSource;
import com.adobe.granite.ui.components.ds.ValueMapResource;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
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
                "sling.servlet.paths=/bin/myproject/video",
                "sling.servlet.methods=GET"
        }
)
public class VideoDatasourceServlet extends SlingSafeMethodsServlet {

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws IOException {
        ResourceResolver resourceResolver = request.getResourceResolver();

        // Create a list of ValueMapResource objects
        List<Resource> resources = new ArrayList<>();

        // Define the video data
        String[][] videoData = {
                {"Video1", "video1"},
                {"Video2", "video2"},
                {"Video3", "video3"},
                {"Video4", "video4"}
        };

        // Populate the resources list with ValueMapResource objects
        for (String[] video : videoData) {
            Map<String, Object> videoMap = new HashMap<>();
            videoMap.put("text", video[0]);
            videoMap.put("value", video[1]);
            resources.add(new ValueMapResource(resourceResolver, "", "", new ValueMapDecorator(videoMap)));
        }

        // Create a SimpleDataSource from the list of resources
        DataSource dataSource = new SimpleDataSource(resources.iterator());

        // Set the DataSource as a request attribute
        request.setAttribute(DataSource.class.getName(), dataSource);
    }
}
