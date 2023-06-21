package com.mysite.core.models;

import com.adobe.cq.wcm.core.components.models.Container;
import org.osgi.annotation.versioning.ConsumerType;

@ConsumerType
public interface Accordion extends Container, com.adobe.cq.wcm.core.components.models.Accordion {
    /**
     * Retrieves meta values wrapped in ComponentMeta object
     *
     * @return the component Meta object which contains information related to component qe_id and dynamic versioning
     */
    
}
