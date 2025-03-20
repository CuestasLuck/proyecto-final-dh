package com.lukcorp.BookInn.repository;

import com.lukcorp.BookInn.entity.Feature;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IFeatureRepository extends JpaRepository<Feature, Long> {
}
