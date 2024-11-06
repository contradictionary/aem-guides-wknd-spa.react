package com.adobe.aem.guides.wkndspa.react.core.servlets;

import com.adobe.granite.ui.components.ds.DataSource;
import io.wcm.testing.mock.aem.junit5.AemContext;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.servlet.ServletException;
import java.io.IOException;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.mock;

class VideoDatasourceServletTest {

    private final AemContext context = new AemContext();
    private VideoDatasourceServlet videoDatasourceServlet;

    @BeforeEach
    void setUp() {
        videoDatasourceServlet = new VideoDatasourceServlet();
    }

    @Test
    void testDoGet() throws ServletException, IOException {
        // Arrange
        SlingHttpServletRequest request = context.request();
        SlingHttpServletResponse response = mock(SlingHttpServletResponse.class);

        // Act
        videoDatasourceServlet.doGet(request, response);

        // Assert
        DataSource dataSource = (DataSource) request.getAttribute(DataSource.class.getName());
        assertNotNull(dataSource, "DataSource should not be null");
    }
}
