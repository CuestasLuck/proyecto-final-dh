package com.lukcorp.BookInn.repository;

import com.lukcorp.BookInn.entity.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IHotelRepository extends JpaRepository<Hotel, Long> {
    Optional<Hotel> findByName(String name);

    @Query("SELECT h FROM Hotel h WHERE h.category.id IN :categoryIds")
    List<Hotel> findByCategories(@Param("categoryIds") List<Long> categoryIds);
}
