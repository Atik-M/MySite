package com.mysite.core.internal.models.v1;


import javax.annotation.PostConstruct;

// import java.util.Map;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.Via;
import lombok.experimental.Delegate;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.apache.sling.models.annotations.via.ResourceSuperType;

import com.mysite.core.models.Card;

@Model(
        adaptables = {SlingHttpServletRequest.class},
        adapters = {Card.class},
        resourceType = {CardImpl.RESOURCE_TYPE},
        defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class CardImpl implements Card {
    protected static final String RESOURCE_TYPE = "mysite/components/card";

    @Self
    private SlingHttpServletRequest request;

    protected interface Handled {}
    @Delegate(types = com.adobe.cq.wcm.core.components.models.Teaser.class, excludes = Handled.class)
    @Self
    @Via(type = ResourceSuperType.class)
    private com.adobe.cq.wcm.core.components.models.Teaser delegate;

    @ValueMapValue
    private String shortdescription;

    
    @PostConstruct
    private void initModel() {}

    @Override
    public String getShortdescription() {
        return shortdescription;
    }

    

    
}

