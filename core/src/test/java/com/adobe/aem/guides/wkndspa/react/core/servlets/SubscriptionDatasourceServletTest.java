package com.adobe.aem.guides.wkndspa.react.core.servlets;

import com.adobe.granite.ui.components.ds.DataSource;
import com.adobe.granite.ui.components.ds.SimpleDataSource;
import io.wcm.testing.mock.aem.junit5.AemContext;
import org.apache.sling.api.resource.Resource;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class SubscriptionDatasourceServletTest {

    private final AemContext context = new AemContext();
    private SubscriptionDatasourceServlet servlet;

    @BeforeEach
    void setUp() {
        servlet = new SubscriptionDatasourceServlet();
        context.registerInjectActivateService(servlet);

        // Create a mock resource for the servlet path
        Resource resource = context.create().resource("/bin/myproject/subscription");
        assertNotNull(resource, "Resource should not be null");
    }

    @Test
    void testDoGet() throws Exception {
        // Set the request path to match the servlet's resource type
        context.request().setResource(context.resourceResolver().getResource("/bin/myproject/subscription"));
        
        // Invoke the servlet
        servlet.doGet(context.request(), context.response());

        // Retrieve the DataSource from the request
        Object dataSource = context.request().getAttribute(DataSource.class.getName());
        assertNotNull(dataSource, "DataSource should not be null");

        // Verify the DataSource content
        SimpleDataSource simpleDataSource = (SimpleDataSource) dataSource;
        List<Resource> resources = new ArrayList<>();
        simpleDataSource.iterator().forEachRemaining(resources::add);

        assertEquals(2, resources.size(), "There should be two resources in the DataSource");

        Resource firstResource = resources.get(0);
        assertEquals("Newsletter", firstResource.getValueMap().get("text"));
        assertEquals("newsletter", firstResource.getValueMap().get("value"));

        Resource secondResource = resources.get(1);
        assertEquals("Updates", secondResource.getValueMap().get("text"));
        assertEquals("updates", secondResource.getValueMap().get("value"));
    }
}
