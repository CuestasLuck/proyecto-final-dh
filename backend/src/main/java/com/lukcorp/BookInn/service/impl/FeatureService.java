package com.lukcorp.BookInn.service.impl;

import com.lukcorp.BookInn.entity.Feature;
import com.lukcorp.BookInn.repository.IFeatureRepository;
import com.lukcorp.BookInn.service.IFeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeatureService implements IFeatureService {

    @Autowired
    private IFeatureRepository featureRepository;

    @Override
    public List<Feature> listAll() {
        return featureRepository.findAll();
    }

    @Override
    public List<Feature> findAllById(List<Long> featureIds) {
        return featureRepository.findAllById(featureIds);
    }

    @Override
    public Optional<Feature> findById(Long id) {
        return featureRepository.findById(id);
    }

    @Override
    public Feature save(Feature feature) {
        return featureRepository.save(feature);
    }

    @Override
    public void update(Long id, Feature feature) {
        Feature existingFeature = featureRepository.findById(id).orElseThrow();
        existingFeature.setName(feature.getName());
        existingFeature.setIcon(feature.getIcon());
        featureRepository.save(existingFeature);
    }

    @Override
    public void delete(Long id) {
        featureRepository.deleteById(id);
    }
}