package com.mysite.core.models.impl;



import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ComponentExporter;
import com.mysite.core.models.Author;

// @Model(adaptables = Resource.class, adapters = Author.class)
@Model(adaptables = SlingHttpServletRequest.class, adapters = {Author.class, ComponentExporter.class}, resourceType = AuthorImpl.RESOURCE_TYPE)


public class AuthorImpl implements Author {

    public final static String RESOURCE_TYPE = "mysite/components/author";
    @ValueMapValue
    @Default(values = "FirstName")
    String fname;

    @ValueMapValue
    @Default(values = "LastName")
    String lname;

    @Override
    public String getFname() {
        
        return fname;
    }

    @Override
    public String getLname() {
        
        return lname;
    }
    
}


