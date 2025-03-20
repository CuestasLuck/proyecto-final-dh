package com.lukcorp.BookInn.controller;

import com.lukcorp.BookInn.entity.Feature;
import com.lukcorp.BookInn.service.IFeatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/features")
@CrossOrigin(origins = "http://localhost:5173")
public class FeatureController {

    @Autowired
    private IFeatureService featureService;

    @GetMapping
    public ResponseEntity<List<Feature>> getAllFeatures() {
        List<Feature> features = featureService.listAll();
        return ResponseEntity.ok(features);
    }

    @PostMapping
    public ResponseEntity<Feature> addFeature(@RequestBody Feature feature) {
        Feature createdFeature = featureService.save(feature);
        return ResponseEntity.ok(createdFeature);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateFeature(@PathVariable Long id, @RequestBody Feature feature) {
         featureService.update(id, feature);
        return ResponseEntity.ok("Característica actualizada.");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFeature(@PathVariable Long id) {
        featureService.delete(id);
        return ResponseEntity.ok("Característica eliminada.");
    }
}