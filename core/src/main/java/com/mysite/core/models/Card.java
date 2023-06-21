package com.mysite.core.models;


public interface Card extends com.adobe.cq.wcm.core.components.models.Teaser {
    

    default String getShortdescription(){
        throw new UnsupportedOperationException();
    }

    
}

//refer it as a model
