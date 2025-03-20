package com.lukcorp.BookInn.service;

import com.lukcorp.BookInn.entity.Feature;
import com.lukcorp.BookInn.entity.Hotel;

import java.util.List;
import java.util.Optional;

public interface IFeatureService {
    Feature save(Feature feature);
    Optional<Feature> findById(Long id);;
    void update(Long id, Feature feature);
    void delete(Long id);
    List<Feature> listAll();
    List<Feature> findAllById(List<Long> featureIds);
}
